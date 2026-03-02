#!/usr/bin/env node
/**
 * Gallery Manager Setup Script
 * Creates initial folder structure and template files
 */

const fs = require('fs');
const path = require('path');

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

const CATEGORIES = {
  portfolio: {
    cuoi: {
      title: 'Chuyện Của Hai Ta',
      description: 'Hành trình yêu được kể bằng những khung hình tự nhiên và trong trẻo nhất.'
    },
    'gia-dinh': {
      title: 'Tổ Ấm An Nhiên',
      description: 'Những khoảnh khắc sum vầy ấm áp bên gia đình.'
    },
    makeup: {
      title: 'Nét Vẽ Thanh Xuân',
      description: 'Nghệ thuật trang điểm và làm tóc tôn vinh vẻ đẹp độc bản.'
    },
    'phong-su': {
      title: 'Dòng Chảy Cảm Xúc',
      description: 'Những khoảnh khắc tự nhiên và ý nghĩa nhất.'
    },
    pro: {
      title: 'Pro Collection',
      description: 'Bộ sưu tập chuyên nghiệp với chất lượng cao.'
    }
  }
};

/**
 * Create directory if not exists
 */
function createDir(dirPath) {
  const dir = path.join(__dirname, '..', dirPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    return true;
  }
  return false;
}

/**
 * Create file from template
 */
function createFile(filePath, content) {
  const fullPath = path.join(__dirname, '..', filePath);
  const dir = path.dirname(fullPath);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  if (!fs.existsSync(fullPath)) {
    fs.writeFileSync(fullPath, content);
    return true;
  }
  return false;
}

/**
 * Setup portfolio categories
 */
function setupPortfolio() {
  log(colors.cyan, '\n📁 Setting up Portfolio categories...\n');

  for (const [categoryId, categoryInfo] of Object.entries(CATEGORIES.portfolio)) {
    const categoryPath = `assets/img/portfolio/${categoryId}`;
    
    // Create category directory
    if (createDir(categoryPath)) {
      log(colors.green, `✓ Created: ${categoryPath}`);
    }

    // Create category-info.json
    const infoPath = `${categoryPath}/category-info.json`;
    const infoContent = `{
  "title": "${categoryInfo.title}",
  "description": "${categoryInfo.description}",
  "order": 1
}
`;
    if (createFile(infoPath, infoContent)) {
      log(colors.green, `✓ Created: ${infoPath}`);
    }

    // Create sample album structure
    const albumPath = `${categoryPath}/sample-album`;
    if (createDir(albumPath)) {
      log(colors.blue, `  Created sample album folder`);
      
      const albumInfoPath = `${albumPath}/info.json`;
      const albumInfoContent = `{
  "title": "Sample Album",
  "description": "Replace with your album name and description",
  "date": "${new Date().toISOString().split('T')[0]}",
  "photographer": "Kool D. Studio"
}
`;
      if (createFile(albumInfoPath, albumInfoContent)) {
        log(colors.green, `  ✓ Created album info`);
      }
    }
  }
}

/**
 * Setup moodboard
 */
function setupMoodboard() {
  log(colors.cyan, '\n🎨 Setting up Moodboard categories...\n');

  const moodboardCategories = [
    '1.Sweet & Romantic',
    '2.Fun & Playful',
    '3. Minimal & Editorial',
    '4. Close-Up Emotions',
    '5.Hands & Details',
    '6. Bridal Portrait',
    '7. Groom Portrait',
    '8. Sitting Poses',
  ];

  for (const category of moodboardCategories) {
    const categoryPath = `assets/img/moodboard/${category}`;
    if (createDir(categoryPath)) {
      log(colors.green, `✓ Created: ${category}`);
    }
  }
}

/**
 * Setup hero images
 */
function setupHero() {
  log(colors.cyan, '\n🌅 Setting up Hero images folder...\n');

  if (createDir('assets/img/hero')) {
    log(colors.green, `✓ Created: assets/img/hero`);
  }
}

/**
 * Create .gitkeep files to preserve empty folders
 */
function createGitkeeps() {
  const foldersToGitkeep = [
    'assets/img/portfolio/cuoi',
    'assets/img/portfolio/gia-dinh',
    'assets/img/portfolio/makeup',
    'assets/img/portfolio/phong-su',
    'assets/img/moodboard',
    'assets/img/hero',
  ];

  foldersToGitkeep.forEach(folderPath => {
    const fullPath = path.join(__dirname, '..', folderPath, '.gitkeep');
    const dir = path.dirname(fullPath);
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    if (!fs.existsSync(fullPath)) {
      fs.writeFileSync(fullPath, '');
    }
  });
}

/**
 * Main setup
 */
function main() {
  log(colors.bright + colors.blue, '\n🚀 Gallery Manager Setup\n');

  try {
    setupPortfolio();
    setupMoodboard();
    setupHero();
    createGitkeeps();

    log(colors.bright + colors.green, '\n✨ Setup completed successfully!\n');
    log(colors.cyan, 'Next steps:');
    log(colors.cyan, '1. Run: npm install (to install chokidar dependency)');
    log(colors.cyan, '2. Add your images to the folders');
    log(colors.cyan, '3. Run: npm run gallery:generate');
    log(colors.cyan, '4. Or run: npm run gallery:watch (for auto-updates)\n');

  } catch (err) {
    log(colors.red, '❌ Setup error:', err.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { setupPortfolio, setupMoodboard, setupHero };
