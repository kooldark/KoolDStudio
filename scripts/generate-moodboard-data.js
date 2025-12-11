#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const moodboardDir = path.join(__dirname, '../assets/img/moodboard');

if (!fs.existsSync(moodboardDir)) {
  fs.mkdirSync(moodboardDir, { recursive: true });
  console.log('Created moodboard directory');
}

const categories = [];
const folders = fs.readdirSync(moodboardDir).filter(f => {
  const fullPath = path.join(moodboardDir, f);
  return fs.statSync(fullPath).isDirectory();
});

folders.forEach(folder => {
  const folderPath = path.join(moodboardDir, folder);
  const images = fs.readdirSync(folderPath).filter(f => 
    /\.(jpg|jpeg|png|webp)$/i.test(f)
  );

  const categoryName = folder
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  categories.push({
    id: folder.toLowerCase().replace(/\s+/g, '-'),
    title: categoryName,
    path: `assets/img/moodboard/${folder}`,
    images: images
  });
});

const output = {
  categories: categories
};

const outputPath = path.join(__dirname, '../assets/js/moodboard-data.json');
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));

console.log(`✓ Generated moodboard-data.json with ${categories.length} categories`);
categories.forEach(cat => {
  console.log(`  - ${cat.title}: ${cat.images.length} images`);
});
