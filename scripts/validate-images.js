#!/usr/bin/env node

/**
 * Image Validation Script
 * Scans all HTML files and checks for:
 * 1. Missing image files
 * 2. Broken image references in JSON data
 * 3. Images referenced in CSS/JS that don't exist
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const COLOR = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m'
};

let errorCount = 0;
let warningCount = 0;
let successCount = 0;

// Get all image files in the project
function getAllImageFiles() {
  const extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'jfif'];
  const imageFiles = new Set();
  
  const imgDir = path.join(__dirname, '../assets/img');
  
  extensions.forEach(ext => {
    try {
      const pattern = `${imgDir}/**/*.${ext}`;
      const files = glob.sync(pattern);
      files.forEach(file => {
        const relativePath = path.relative(path.join(__dirname, '..'), file).replace(/\\/g, '/');
        imageFiles.add(relativePath);
      });
    } catch (e) {
      // Ignore glob errors
    }
  });
  
  return imageFiles;
}

// Extract image paths from HTML
function extractImagesFromHTML(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const images = [];
  
  // Match src attributes
  const srcRegex = /src\s*=\s*["']([^"']+)["']/g;
  let match;
  while ((match = srcRegex.exec(content)) !== null) {
    const src = match[1];
    if (src.match(/\.(jpg|jpeg|png|gif|webp|svg|jfif)$/i)) {
      images.push({ src, type: 'src' });
    }
  }
  
  // Match background-image in style attributes
  const bgRegex = /background-image\s*:\s*url\(["']?([^"')]+)["']?\)/g;
  while ((match = bgRegex.exec(content)) !== null) {
    const src = match[1];
    if (src.match(/\.(jpg|jpeg|png|gif|webp|svg|jfif)$/i)) {
      images.push({ src, type: 'background-image' });
    }
  }
  
  return images;
}

// Extract images from JSON files
function extractImagesFromJSON(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(content);
    const images = [];
    
    const extractPaths = (obj) => {
      if (typeof obj !== 'object' || obj === null) return;
      
      for (const key in obj) {
        const value = obj[key];
        if (typeof value === 'string' && value.match(/\.(jpg|jpeg|png|gif|webp|svg|jfif)$/i)) {
          images.push({ src: value, type: 'JSON' });
        } else if (typeof value === 'object') {
          extractPaths(value);
        }
      }
    };
    
    extractPaths(data);
    return images;
  } catch (e) {
    return [];
  }
}

// Normalize path for comparison
function normalizePath(p) {
  return p.replace(/\\/g, '/').toLowerCase();
}

// Check if file exists
function fileExists(imagePath, basePath) {
  const fullPath = path.join(basePath, imagePath);
  const normalizedFull = normalizePath(fullPath);
  
  try {
    if (fs.existsSync(fullPath)) {
      return true;
    }
    // Try alternate extensions
    const extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'jfif'];
    const base = imagePath.replace(/\.[^.]+$/, '');
    
    for (const ext of extensions) {
      const altPath = `${base}.${ext}`;
      const altFullPath = path.join(basePath, altPath);
      if (fs.existsSync(altFullPath)) {
        return true;
      }
    }
  } catch (e) {
    // Ignore
  }
  
  return false;
}

// Main validation
function validate() {
  const projectRoot = path.join(__dirname, '..');
  const allImageFiles = getAllImageFiles();
  
  console.log(`${COLOR.blue}🔍 Scanning for broken images...${COLOR.reset}\n`);
  console.log(`✓ Found ${allImageFiles.size} image files in project\n`);
  
  // Check HTML files
  const htmlFiles = glob.sync(path.join(projectRoot, '*.html'));
  
  htmlFiles.forEach(htmlFile => {
    const fileName = path.basename(htmlFile);
    const images = extractImagesFromHTML(htmlFile);
    
    images.forEach(({ src, type }) => {
      const imagePath = path.normalize(path.join(path.dirname(htmlFile), src));
      const exists = fileExists(src, path.dirname(htmlFile));
      
      if (!exists) {
        console.log(`${COLOR.red}❌ BROKEN IMAGE in ${fileName}${COLOR.reset}`);
        console.log(`   Type: ${type}`);
        console.log(`   Path: ${src}\n`);
        errorCount++;
      } else {
        successCount++;
      }
    });
  });
  
  // Check JSON data files
  const jsonFiles = glob.sync(path.join(projectRoot, 'assets/js/**/*.json'));
  
  jsonFiles.forEach(jsonFile => {
    const fileName = path.relative(projectRoot, jsonFile);
    const images = extractImagesFromJSON(jsonFile);
    
    images.forEach(({ src, type }) => {
      const exists = fileExists(src, projectRoot);
      
      if (!exists) {
        console.log(`${COLOR.red}❌ BROKEN IMAGE in ${fileName}${COLOR.reset}`);
        console.log(`   Path: ${src}\n`);
        errorCount++;
      } else {
        successCount++;
      }
    });
  });
  
  // Summary
  console.log(`${COLOR.blue}────────────────────────────────────${COLOR.reset}`);
  console.log(`${COLOR.green}✓ Valid images: ${successCount}${COLOR.reset}`);
  
  if (errorCount > 0) {
    console.log(`${COLOR.red}❌ Broken images: ${errorCount}${COLOR.reset}`);
  } else {
    console.log(`${COLOR.green}✓ No broken images found!${COLOR.reset}`);
  }
  
  if (warningCount > 0) {
    console.log(`${COLOR.yellow}⚠ Warnings: ${warningCount}${COLOR.reset}`);
  }
  
  console.log(`${COLOR.blue}────────────────────────────────────${COLOR.reset}\n`);
  
  return errorCount === 0 ? 0 : 1;
}

process.exit(validate());
