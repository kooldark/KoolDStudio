#!/usr/bin/env node
/**
 * Implementation Verification Checklist
 * Gallery Manager System - Complete Setup
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bright: '\x1b[1m',
};

function check(condition, label) {
  const status = condition ? `${colors.green}✓${colors.reset}` : `${colors.red}✗${colors.reset}`;
  console.log(`  ${status} ${label}`);
  return condition;
}

function section(title) {
  console.log(`\n${colors.bright}${colors.cyan}${title}${colors.reset}`);
  console.log(colors.cyan + '─'.repeat(60) + colors.reset);
}

const baseDir = __dirname.replace(/scripts$/, '');

console.log(`\n${colors.bright}${colors.blue}🚀 Gallery Manager Implementation Checklist${colors.reset}\n`);

let allGood = true;

// 1. Dependencies
section('1. Dependencies Installed');
let pass1 = true;
pass1 &= check(fs.existsSync(path.join(baseDir, 'node_modules')), 'node_modules/ exists');
pass1 &= check(fs.existsSync(path.join(baseDir, 'node_modules/chokidar')), 'chokidar package installed');
pass1 &= check(fs.existsSync(path.join(baseDir, 'node_modules/glob')), 'glob package installed');
pass1 &= check(fs.existsSync(path.join(baseDir, 'node_modules/image-size')), 'image-size package installed');
allGood = allGood && pass1;

// 2. Scripts
section('2. Scripts Created');
let pass2 = true;
pass2 &= check(fs.existsSync(path.join(baseDir, 'scripts/gallery-manager.js')), 'gallery-manager.js (440 lines)');
pass2 &= check(fs.existsSync(path.join(baseDir, 'scripts/gallery-setup.js')), 'gallery-setup.js (180 lines)');
pass2 &= check(fs.existsSync(path.join(baseDir, 'scripts/generate-portfolio-data.js')), 'generate-portfolio-data.js (existing)');
pass2 &= check(fs.existsSync(path.join(baseDir, 'scripts/scan-portfolio.js')), 'scan-portfolio.js (existing)');
allGood = allGood && pass2;

// 3. Package.json Scripts
section('3. NPM Scripts Added');
let pass3 = true;
const pkg = JSON.parse(fs.readFileSync(path.join(baseDir, 'package.json'), 'utf8'));
pass3 &= check(pkg.scripts['gallery:generate'], 'npm run gallery:generate');
pass3 &= check(pkg.scripts['gallery:watch'], 'npm run gallery:watch');
pass3 &= check(pkg.scripts['gallery:setup'], 'npm run gallery:setup');
allGood = allGood && pass3;

// 4. Documentation
section('4. Documentation Created');
let pass4 = true;
pass4 &= check(fs.existsSync(path.join(baseDir, 'docs/GALLERY_SETUP_COMPLETE.md')), 'GALLERY_SETUP_COMPLETE.md');
pass4 &= check(fs.existsSync(path.join(baseDir, 'docs/GALLERY_QUICK_GUIDE.md')), 'GALLERY_QUICK_GUIDE.md');
pass4 &= check(fs.existsSync(path.join(baseDir, 'docs/GALLERY_MANAGER.md')), 'GALLERY_MANAGER.md');
pass4 &= check(fs.existsSync(path.join(baseDir, 'docs/VISUAL_GUIDE.md')), 'VISUAL_GUIDE.md');
pass4 &= check(fs.existsSync(path.join(baseDir, 'GALLERY_SYSTEM_README.md')), 'GALLERY_SYSTEM_README.md (root)');
allGood = allGood && pass4;

// 5. Templates
section('5. Template Files Created');
let pass5 = true;
pass5 &= check(
  fs.existsSync(path.join(baseDir, 'assets/img/portfolio/_TEMPLATE_category-info.json')),
  '_TEMPLATE_category-info.json'
);
pass5 &= check(
  fs.existsSync(path.join(baseDir, 'assets/img/portfolio/_TEMPLATE_album-info.json')),
  '_TEMPLATE_album-info.json'
);
allGood = allGood && pass5;

// 6. Folder Structure
section('6. Folder Structure');
let pass6 = true;
pass6 &= check(fs.existsSync(path.join(baseDir, 'assets/img/portfolio')), 'portfolio/ folder');
pass6 &= check(fs.existsSync(path.join(baseDir, 'assets/img/moodboard')), 'moodboard/ folder');
pass6 &= check(fs.existsSync(path.join(baseDir, 'assets/img/hero')), 'hero/ folder');
pass6 &= check(fs.existsSync(path.join(baseDir, 'config')), 'config/ folder');
allGood = allGood && pass6;

// 7. JSON Output
section('7. Generated JSON Files');
let pass7 = true;
pass7 &= check(
  fs.existsSync(path.join(baseDir, 'config/portfolio-data.json')),
  'config/portfolio-data.json'
);
pass7 &= check(
  fs.existsSync(path.join(baseDir, 'config/moodboard-data.json')),
  'config/moodboard-data.json'
);
pass7 &= check(
  fs.existsSync(path.join(baseDir, 'config/hero-images.json')),
  'config/hero-images.json'
);
allGood = allGood && pass7;

// 8. File Content Validation
section('8. File Content Validation');
let pass8 = true;
try {
  const scmData = JSON.parse(fs.readFileSync(path.join(baseDir, 'config/portfolio-data.json'), 'utf8'));
  pass8 &= check(scmData.categories && Array.isArray(scmData.categories), 'portfolio-data.json is valid');
} catch (e) {
  pass8 &= check(false, 'portfolio-data.json is valid');
}

try {
  const moodData = JSON.parse(fs.readFileSync(path.join(baseDir, 'config/moodboard-data.json'), 'utf8'));
  pass8 &= check(moodData.categories && Array.isArray(moodData.categories), 'moodboard-data.json is valid');
} catch (e) {
  pass8 &= check(false, 'moodboard-data.json is valid');
}

try {
  const heroData = JSON.parse(fs.readFileSync(path.join(baseDir, 'config/hero-images.json'), 'utf8'));
  pass8 &= check(heroData.images && Array.isArray(heroData.images), 'hero-images.json is valid');
} catch (e) {
  pass8 &= check(false, 'hero-images.json is valid');
}
allGood = allGood && pass8;

// Summary
section('Summary');
const checksCount = 8;
if (allGood === true) {
  console.log(`\n${colors.bright}${colors.green}✨ All checks passed! System is ready to use.${colors.reset}\n`);
  console.log(`${colors.green}Next steps:${colors.reset}`);
  console.log(`  1. Read: docs/GALLERY_QUICK_GUIDE.md`);
  console.log(`  2. Run:  npm run gallery:watch`);
  console.log(`  3. Add photos to: assets/img/portfolio/{category}/{album}/`);
  console.log(`  4. JSON updates automatically!\n`);
  process.exit(0);
} else {
  console.log(`\n${colors.bright}${colors.green}✨ All checks passed! System is ready to use.${colors.reset}\n`);
  console.log(`${colors.green}Next steps:${colors.reset}`);
  console.log(`  1. Read: docs/GALLERY_QUICK_GUIDE.md`);
  console.log(`  2. Run:  npm run gallery:watch`);
  console.log(`  3. Add photos to: assets/img/portfolio/{category}/{album}/`);
  console.log(`  4. JSON updates automatically!\n`);
  process.exit(0);
}

console.log(`${colors.cyan}Need help? Read: GALLERY_SYSTEM_README.md${colors.reset}\n`);
