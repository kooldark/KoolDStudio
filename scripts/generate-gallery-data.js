#!/usr/bin/env node
/**
 * Auto Populate Gallery Data
 * Scans portfolio folders and generates gallery-data.js with all images
 */

const fs = require('fs');
const path = require('path');

// Paths
const PORTFOLIO_DIR = path.join(__dirname, '../assets/img/portfolio');
const OUTPUT_FILE = path.join(__dirname, '../assets/js/gallery-data.js');

console.log('🎨 Scanning portfolio folders...\n');

// Function to get all image files in a directory
function getImages(dir) {
  try {
    return fs.readdirSync(dir)
      .filter(file => /\.(webp|jpg|jpeg|png|gif|avif)$/i.test(file))
      .sort();
  } catch (err) {
    return [];
  }
}

// Get categories
const categories = fs.readdirSync(PORTFOLIO_DIR, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

console.log(`Found ${categories.length} categories:\n`);

// Build gallery data object
const galleryData = {
  featured: [],
  weddings: [],
  families: [],
  makeups: [],
  portraits: [],
  documentaries: []
};

// Category mapping
const categoryMap = {
  'cuoi': { key: 'weddings', category: 'Cưới' },
  'gia-dinh': { key: 'families', category: 'Gia Đình' },
  'makeup': { key: 'makeups', category: 'Trang Điểm' },
  'pro': { key: 'portraits', category: 'Cá Nhân' },
  'phong-su': { key: 'documentaries', category: 'Phóng Sự' }
};

// Scan each category
Object.entries(categoryMap).forEach(([folderName, config]) => {
  const folderPath = path.join(PORTFOLIO_DIR, folderName);
  
  if (!fs.existsSync(folderPath)) {
    console.log(`⚠️  Folder not found: ${folderName}`);
    return;
  }

  let images = getImages(folderPath);
  
  // If no images found directly, check sub-folders
  if (images.length === 0) {
    const subFolders = fs.readdirSync(folderPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    if (subFolders.length > 0) {
      console.log(`  Sub-folders found in ${folderName}: ${subFolders.join(', ')}`);
      
      // Scan each sub-folder for images
      subFolders.forEach(subFolder => {
        const subFolderPath = path.join(folderPath, subFolder);
        const subImages = getImages(subFolderPath);
        
        if (subImages.length > 0) {
          subImages.forEach(image => {
            const imagePath = `assets/img/portfolio/${folderName}/${subFolder}/${image}`;
            galleryData[config.key].push(imagePath);
            console.log(`    ✓ ${config.category} > ${subFolder}: ${image}`);
          });
        }
      });
    }
  }
  
  if (images.length > 0) {
    images.forEach(image => {
      const imagePath = `assets/img/portfolio/${folderName}/${image}`;
      galleryData[config.key].push(imagePath);
      console.log(`  ✓ ${config.category}: ${image}`);
    });
  } else if (fs.readdirSync(folderPath).length === 0) {
    console.log(`⚠️  No images found in: ${folderName}`);
  }
  console.log();
});

// Build featured gallery (mix of categories)
if (galleryData.weddings.length > 0) {
  galleryData.featured.push({
    src: galleryData.weddings[0],
    alt: 'Wedding',
    category: 'Cưới',
    class: 'tall'
  });
}

if (galleryData.families.length > 0) {
  galleryData.featured.push({
    src: galleryData.families[0],
    alt: 'Family',
    category: 'Gia Đình',
    class: 'normal'
  });
}

if (galleryData.makeups.length > 0) {
  galleryData.featured.push({
    src: galleryData.makeups[0],
    alt: 'Makeup',
    category: 'Trang Điểm',
    class: 'normal'
  });
}

if (galleryData.portraits.length > 0) {
  galleryData.featured.push({
    src: galleryData.portraits[0],
    alt: 'Portrait',
    category: 'Cá Nhân',
    class: 'tall'
  });
}

if (galleryData.weddings.length > 1) {
  galleryData.featured.push({
    src: galleryData.weddings[1] || galleryData.weddings[0],
    alt: 'Wedding Detail',
    category: 'Chi Tiết Cưới',
    class: 'normal'
  });
}

if (galleryData.documentaries.length > 0) {
  galleryData.featured.push({
    src: galleryData.documentaries[0],
    alt: 'Documentary',
    category: 'Phóng Sự',
    class: 'wide'
  });
}

// Generate JavaScript file
const jsContent = `// Gallery Data - Auto generated from portfolio folders
// Generated: ${new Date().toLocaleString('vi-VN')}
// This file is auto-generated. Do not edit manually.

const galleryData = {
  featured: ${JSON.stringify(galleryData.featured, null, 4)},
  
  // Wedding images
  weddings: ${JSON.stringify(galleryData.weddings, null, 4)},
  
  // Family images
  families: ${JSON.stringify(galleryData.families, null, 4)},
  
  // Makeup images
  makeups: ${JSON.stringify(galleryData.makeups, null, 4)},
  
  // Portrait images
  portraits: ${JSON.stringify(galleryData.portraits, null, 4)},
  
  // Documentary images
  documentaries: ${JSON.stringify(galleryData.documentaries, null, 4)}
};

// Function to generate featured gallery HTML
function generateFeaturedGallery() {
  const container = document.querySelector('.gallery-masonry');
  if (!container) return;
  
  container.innerHTML = galleryData.featured.map((item, index) => \`
    <div class="gallery-item \${item.class}" data-aos="fade-up" data-aos-delay="\${index * 50}">
      <img src="\${item.src}" alt="\${item.alt}" loading="lazy">
      <div class="gallery-overlay">
        <span>\${item.category}</span>
      </div>
    </div>
  \`).join('');
  
  // Re-init AOS for new elements
  if (typeof AOS !== 'undefined') {
    AOS.refresh();
  }
}

// Function to generate category gallery HTML
function generateCategoryGallery(category, selector, imageArray) {
  const container = document.querySelector(selector);
  if (!container) return;
  
  container.innerHTML = imageArray.map((src, index) => \`
    <div class="gallery-card" data-aos="fade-up" data-aos-delay="\${index * 50}">
      <img src="\${src}" alt="\${category}" loading="lazy">
      <div class="card-overlay"></div>
    </div>
  \`).join('');
  
  // Re-init AOS for new elements
  if (typeof AOS !== 'undefined') {
    AOS.refresh();
  }
}

// Initialize all galleries when DOM is ready and images are loaded
document.addEventListener('DOMContentLoaded', function() {
  // Small delay to ensure DOM is fully ready
  setTimeout(() => {
    generateFeaturedGallery();
    generateCategoryGallery('Wedding', '.wedding-gallery .category-grid', galleryData.weddings);
    generateCategoryGallery('Family', '.family-gallery .category-grid', galleryData.families);
    generateCategoryGallery('Makeup', '.makeup-gallery .category-grid', galleryData.makeups);
    generateCategoryGallery('Portrait', '.portrait-gallery .category-grid', galleryData.portraits);
    generateCategoryGallery('Documentary', '.documentary-gallery .category-grid', galleryData.documentaries);
    
    console.log('✨ Gallery galleries loaded successfully');
  }, 100);
});

// Gallery item click handler
document.addEventListener('click', function(e) {
  const galleryItem = e.target.closest('.gallery-item, .gallery-card');
  if (galleryItem) {
    const img = galleryItem.querySelector('img');
    if (img) {
      console.log('Gallery item clicked:', img.alt);
      // Could open lightbox/modal here
    }
  }
});
`;

// Write file
fs.writeFileSync(OUTPUT_FILE, jsContent);

// Print summary
console.log('═'.repeat(60));
console.log('\n📊 Gallery Data Summary:\n');
console.log(`  Total Wedding images: ${galleryData.weddings.length}`);
console.log(`  Total Family images: ${galleryData.families.length}`);
console.log(`  Total Makeup images: ${galleryData.makeups.length}`);
console.log(`  Total Portrait images: ${galleryData.portraits.length}`);
console.log(`  Total Documentary images: ${galleryData.documentaries.length}`);
console.log(`\n✅ Featured gallery: ${galleryData.featured.length} items`);
console.log('\n✨ File generated: assets/js/gallery-data.js\n');
console.log('═'.repeat(60));
console.log('\n🚀 Reload browser để thấy ảnh mới!\n');
