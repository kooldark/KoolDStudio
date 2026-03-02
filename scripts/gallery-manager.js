#!/usr/bin/env node
/**
 * Gallery Manager - Unified Image Gallery Management System
 * Auto-scans folders and updates JSON metadata
 * Supports portfolio, moodboard, and hero galleries
 */

const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

// Configuration for different gallery types
const GALLERIES = {
  portfolio: {
    dir: 'assets/img/portfolio',
    output: 'config/portfolio-data.json',
    structure: 'categories/albums', // categories > albums > images
    byWatchFile: (p) => p.match(/assets\/img\/portfolio/),
  },
  moodboard: {
    dir: 'assets/img/moodboard',
    output: 'config/moodboard-data.json',
    structure: 'categories', // direct categories > images
    byWatchFile: (p) => p.match(/assets\/img\/moodboard/),
  },
  hero: {
    dir: 'assets/img/hero',
    output: 'config/hero-images.json',
    structure: 'flat', // flat folder of images
    byWatchFile: (p) => p.match(/assets\/img\/hero/),
  }
};

const SUPPORTED_EXTENSIONS = ['.webp', '.jpg', '.jpeg', '.png', '.gif', '.avif'];
const IGNORE_FILES = ['.DS_Store', 'thumbs.db', '.json', 'category-info.json', 'info.json'];

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

function log(color, ...args) {
  console.log(`${color}${args.join(' ')}${colors.reset}`);
}

/**
 * Check if file is an image
 */
function isImage(filename) {
  return SUPPORTED_EXTENSIONS.includes(path.extname(filename).toLowerCase());
}

/**
 * Check if file should be ignored
 */
function shouldIgnore(filename) {
  return IGNORE_FILES.some(ignore => 
    filename.toLowerCase().includes(ignore.toLowerCase())
  );
}

/**
 * Natural sort (1, 2, 10 instead of 1, 10, 2)
 */
function naturalSort(arr) {
  return arr.sort((a, b) => {
    const aStr = typeof a === 'string' ? a : (a.name || a.id || '');
    const bStr = typeof b === 'string' ? b : (b.name || b.id || '');
    
    // Extract numbers for comparison
    const aNum = parseInt(aStr.match(/\d+/)?.[0] || Infinity);
    const bNum = parseInt(bStr.match(/\d+/)?.[0] || Infinity);
    
    if (aNum !== bNum) return aNum - bNum;
    return aStr.localeCompare(bStr);
  });
}

/**
 * Safe parse JSON with fallback
 */
function parseJSON(filePath, defaultValue = {}) {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(content);
    }
  } catch (err) {
    log(colors.yellow, `⚠️  Failed to parse ${filePath}`);
  }
  return defaultValue;
}

/**
 * Generate portfolio gallery data
 */
function generatePortfolioData(baseDir) {
  log(colors.cyan, '📁 Scanning portfolio...');
  
  const portfolioDir = path.join(baseDir, GALLERIES.portfolio.dir);
  const categories = [];

  if (!fs.existsSync(portfolioDir)) {
    log(colors.yellow, `⚠️  Portfolio directory not found: ${portfolioDir}`);
    return { categories: [] };
  }

  const categoryDirs = fs.readdirSync(portfolioDir)
    .filter(f => !f.startsWith('.'))
    .filter(f => fs.statSync(path.join(portfolioDir, f)).isDirectory());

  categoryDirs.forEach(categoryId => {
    const categoryPath = path.join(portfolioDir, categoryId);
    const infoPath = path.join(categoryPath, 'category-info.json');
    const categoryInfo = parseJSON(infoPath, {});

    const albums = [];
    const albumDirs = fs.readdirSync(categoryPath)
      .filter(f => !f.startsWith('.') && !f.endsWith('.json'))
      .filter(f => fs.statSync(path.join(categoryPath, f)).isDirectory());

    albumDirs.forEach(albumId => {
      const albumPath = path.join(categoryPath, albumId);
      const albumInfoPath = path.join(albumPath, 'info.json');
      const albumInfo = parseJSON(albumInfoPath, {});

      const images = fs.readdirSync(albumPath)
        .filter(f => !shouldIgnore(f) && isImage(f));

      if (images.length > 0) {
        // Find cover image (prioritize files starting with 0 or "cover")
        let coverImage = images.find(f => f.startsWith('0') || f.toLowerCase().startsWith('cover'));
        if (!coverImage) coverImage = naturalSort(images)[0];

        albums.push({
          id: albumId,
          title: albumInfo.title || albumId.replace(/-/g, ' '),
          description: albumInfo.description || '',
          path: `${categoryId}/${albumId}`,
          coverImage: coverImage,
          images: naturalSort(images),
          imageCount: images.length,
        });
        
        log(colors.green, `  ✓ Album: ${albumId} (${images.length} images)`);
      }
    });

    if (albums.length > 0 || categoryInfo.title) {
      categories.push({
        id: categoryId,
        title: categoryInfo.title || categoryId.replace(/-/g, ' '),
        description: categoryInfo.description || '',
        albums: naturalSort(albums),
        albumCount: albums.length,
      });
      
      log(colors.blue, `📂 Category: ${categoryInfo.title || categoryId} (${albums.length} albums)`);
    }
  });

  return { categories: naturalSort(categories) };
}

/**
 * Generate moodboard gallery data
 */
function generateMoodboardData(baseDir) {
  log(colors.cyan, '🎨 Scanning moodboard...');
  
  const moodboardDir = path.join(baseDir, GALLERIES.moodboard.dir);
  const categories = [];

  if (!fs.existsSync(moodboardDir)) {
    log(colors.yellow, `⚠️  Moodboard directory not found: ${moodboardDir}`);
    return { categories: [] };
  }

  const categoryDirs = fs.readdirSync(moodboardDir)
    .filter(f => !f.startsWith('.'))
    .filter(f => fs.statSync(path.join(moodboardDir, f)).isDirectory());

  categoryDirs.forEach(categoryId => {
    const categoryPath = path.join(moodboardDir, categoryId);
    
    const images = fs.readdirSync(categoryPath)
      .filter(f => !shouldIgnore(f) && isImage(f));

    if (images.length > 0) {
      categories.push({
        id: categoryId.toLowerCase().replace(/\s+/g, '-'),
        title: categoryId.replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase()),
        path: `assets/img/moodboard/${categoryId}`,
        images: naturalSort(images),
        imageCount: images.length,
      });
      
      log(colors.green, `  ✓ ${categoryId} (${images.length} images)`);
    }
  });

  return { categories: naturalSort(categories) };
}

/**
 * Generate hero gallery data
 */
function generateHeroData(baseDir) {
  log(colors.cyan, '🌅 Scanning hero images...');
  
  const heroDir = path.join(baseDir, GALLERIES.hero.dir);
  const images = [];

  if (!fs.existsSync(heroDir)) {
    log(colors.yellow, `⚠️  Hero directory not found: ${heroDir}`);
    return { images: [] };
  }

  const heroFiles = fs.readdirSync(heroDir)
    .filter(f => !shouldIgnore(f) && isImage(f));

  if (heroFiles.length > 0) {
    images.push(...naturalSort(heroFiles));
    log(colors.green, `  ✓ Found ${heroFiles.length} hero images`);
  }

  return { images };
}

/**
 * Write JSON output file
 */
function writeOutput(filePath, data, galleryName) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    log(colors.green, `✅ Generated: ${filePath}`);
    return true;
  } catch (err) {
    log(colors.red, `❌ Error writing ${galleryName}:`, err.message);
    return false;
  }
}

/**
 * Generate all galleries
 */
function generateAll(baseDir = __dirname.replace(/scripts$/, '')) {
  log(colors.bright + colors.blue, '\n🚀 Starting Gallery Generation\n');

  try {
    // Portfolio
    const portfolioData = generatePortfolioData(baseDir);
    writeOutput(
      path.join(baseDir, GALLERIES.portfolio.output),
      portfolioData,
      'Portfolio'
    );

    // Moodboard
    const moodboardData = generateMoodboardData(baseDir);
    writeOutput(
      path.join(baseDir, GALLERIES.moodboard.output),
      moodboardData,
      'Moodboard'
    );

    // Hero
    const heroData = generateHeroData(baseDir);
    writeOutput(
      path.join(baseDir, GALLERIES.hero.output),
      heroData,
      'Hero'
    );

    log(colors.bright + colors.green, '✨ All galleries generated successfully!\n');
    return true;
  } catch (err) {
    log(colors.red, '❌ Generation error:', err.message);
    return false;
  }
}

/**
 * Watch mode - monitor folder changes
 */
function startWatchMode(baseDir = __dirname.replace(/scripts$/, '')) {
  log(colors.bright + colors.yellow, '\n👁️  Starting Watch Mode\n');
  log(colors.yellow, 'Watching for changes in gallery folders...\n');

  const watchPaths = [
    path.join(baseDir, GALLERIES.portfolio.dir),
    path.join(baseDir, GALLERIES.moodboard.dir),
    path.join(baseDir, GALLERIES.hero.dir),
  ];

  let debounceTimer;

  const watcher = chokidar.watch(watchPaths, {
    ignored: /(^|[\/\\])\.|node_modules|\.json$/,
    persistent: true,
    awaitWriteFinish: { stabilityThreshold: 2000, pollInterval: 100 },
  });

  const debounceGenerate = () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      log(colors.cyan, '\n📝 Changes detected - regenerating...');
      generateAll(baseDir);
    }, 500);
  };

  watcher
    .on('add', (filePath) => {
      log(colors.blue, `📄 Added:`, path.basename(filePath));
      debounceGenerate();
    })
    .on('unlink', (filePath) => {
      log(colors.blue, `🗑️  Removed:`, path.basename(filePath));
      debounceGenerate();
    })
    .on('unlinkDir', (dirPath) => {
      log(colors.blue, `📁 Folder deleted:`, path.basename(dirPath));
      debounceGenerate();
    })
    .on('addDir', (dirPath) => {
      if (!dirPath.includes('node_modules')) {
        log(colors.blue, `📁 Folder added:`, path.basename(dirPath));
        debounceGenerate();
      }
    })
    .on('error', (error) => {
      log(colors.red, '❌ Watcher error:', error);
    });

  log(colors.green, '✅ Watch mode active. Press Ctrl+C to stop.\n');
}

/**
 * Main entry point
 */
function main() {
  const args = process.argv.slice(2);
  const baseDir = __dirname.replace(/scripts$/, '');

  if (args.includes('--watch') || args.includes('-w')) {
    generateAll(baseDir);
    startWatchMode(baseDir);
  } else {
    generateAll(baseDir);
    process.exit(0);
  }
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { generateAll, startWatchMode };
