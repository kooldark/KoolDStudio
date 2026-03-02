#!/usr/bin/env node
/**
 * Scan Portfolio Folder Structure and Generate portfolio-data.json
 * Automatically reads folder hierarchy and generates JSON metadata
 */

const fs = require('fs');
const path = require('path');

// Configuration
const PORTFOLIO_DIR = path.join(__dirname, '../assets/img/portfolio');
const OUTPUT_FILE = path.join(__dirname, '../assets/js/portfolio-data.json');

// Default category descriptions
const categoryDescriptions = {
  'cuoi': {
    title: 'Chuyện Của Hai Ta',
    description: 'Hành trình yêu được kể bằng những khung hình tự nhiên và trong trẻo nhất. Kool D. Studio không chỉ chụp ảnh, mà còn lưu giữ từng ánh mắt, nụ cười và cảm xúc chân thật để câu chuyện tình yêu của bạn trở thành một thước phim lãng mạn, tinh tế và mãi mãi khắc sâu trong ký ức.'
  },
  'gia-dinh': {
    title: 'Tổ Ấm An Nhiên',
    description: 'Thời gian có thể trôi, nhưng kỷ niệm bên gia đình là vĩnh cửu. Hãy để chúng tôi giúp bạn ghi lại những khoảnh khắc sum vầy ấm áp, từ tiếng cười giòn tan của con trẻ đến vòng tay yêu thương của ông bà. Mỗi bức ảnh là một mảnh ghép quý giá tạo nên câu chuyện tổ ấm của riêng bạn.'
  },
  'makeup': {
    title: 'Nét Vẽ Thanh Xuân',
    description: 'Nghệ thuật trang điểm là cách chúng tôi tôn vinh vẻ đẹp độc bản của mỗi người. Album này là nơi những đường nét tinh tế, màu sắc thời thượng và thần thái cuốn hút được thể hiện một cách trọn vẹn, giúp bạn khám phá và toả sáng với phiên bản hoàn hảo nhất của chính mình.'
  },
  'phong-su': {
    title: 'Dòng Chảy Cảm Xúc',
    description: 'Không kịch bản, chỉ có những cảm xúc chân thật. Chúng tôi âm thầm theo chân bạn để ghi lại những khoảnh khắc tự nhiên và ý nghĩa nhất trong ngày trọng đại hoặc sự kiện của bạn. Mỗi bức ảnh là một câu chuyện sống động, giúp bạn sống lại những ký ức tuyệt vời mỗi khi xem lại.'
  },
  'art-elegent': {
    title: 'Art & Elegent',
    description: 'Những tác phẩm nghệ thuật tuyệt vời với phong cách tao nhã và tinh tế. Mỗi bức ảnh là sự kết hợp hoàn hảo giữa ánh sáng, hình ảnh và cảm xúc, tạo nên những khoảnh khắc vô cùng đẹp mắt.'
  },
  'pro': {
    title: 'Pro Collection',
    description: 'Bộ sưu tập chuyên nghiệp với những hình ảnh chất lượng cao và sáng tạo vượt trội. Nơi những ý tưởng cách tân được biến thành hiện thực qua từng khung hình.'
  }
};

/**
 * Get list of supported image extensions
 */
function isImageFile(filename) {
  const imageExts = ['.webp', '.jpg', '.jpeg', '.png', '.gif', '.avif'];
  return imageExts.includes(path.extname(filename).toLowerCase());
}

/**
 * Sort filenames naturally (1, 2, 10 instead of 1, 10, 2)
 */
function naturalSort(arr) {
  return arr.sort((a, b) => {
    const aStr = typeof a === 'string' ? a : (a.id || a.name || '');
    const bStr = typeof b === 'string' ? b : (b.id || b.name || '');
    const aNum = parseInt(aStr.replace(/\D/g, '')) || 0;
    const bNum = parseInt(bStr.replace(/\D/g, '')) || 0;
    return aNum - bNum;
  });
}

/**
 * Scan category folder and extract albums
 */
function scanCategory(categoryPath, categoryId) {
  const albums = [];

  if (!fs.existsSync(categoryPath)) {
    console.warn(`⚠️  Category folder not found: ${categoryPath}`);
    return albums;
  }

  const dirItems = fs.readdirSync(categoryPath, { withFileTypes: true });

  dirItems.forEach(item => {
    // Skip hidden items and JSON files
    if (item.name.startsWith('.') || item.name.endsWith('.json')) {
      return;
    }

    const itemPath = path.join(categoryPath, item.name);

    if (item.isDirectory()) {
      // This is an album folder
      const albumFiles = fs.readdirSync(itemPath)
        .filter(f => isImageFile(f))
        .sort();

      if (albumFiles.length > 0) {
        const album = {
          id: item.name,
          title: item.name,
          description: '',
          path: `${categoryId}/${item.name}`,
          coverImage: albumFiles[0],
          images: albumFiles
        };

        albums.push(album);
        console.log(`  ✓ Album: ${item.name} (${albumFiles.length} images)`);
      }
    } else if (isImageFile(item.name)) {
      // Loose images in category root (treat as single "Ảnh lẻ" album)
      // Skip for now, handle separately if needed
    }
  });

  return naturalSort(albums);
}

/**
 * Main function: Scan all categories and generate JSON
 */
function generatePortfolioData() {
  console.log('🔍 Scanning portfolio folder structure...\n');

  const categories = [];
  const categoryFolders = fs.readdirSync(PORTFOLIO_DIR, { withFileTypes: true })
    .filter(item => item.isDirectory() && !item.name.startsWith('.'))
    .map(item => item.name)
    .sort();

  categoryFolders.forEach(categoryId => {
    const categoryPath = path.join(PORTFOLIO_DIR, categoryId);
    const categoryInfo = categoryDescriptions[categoryId] || {
      title: categoryId,
      description: ''
    };

    console.log(`📁 Category: ${categoryInfo.title} (${categoryId})`);

    const albums = scanCategory(categoryPath, categoryId);

    if (albums.length > 0 || categoryId === 'art-elegent' || categoryId === 'pro') {
      categories.push({
        id: categoryId,
        title: categoryInfo.title,
        description: categoryInfo.description,
        albums: albums
      });
    }

    console.log('');
  });

  const portfolioData = { categories };

  // Write to file
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(portfolioData, null, 2));
  console.log(`✅ Generated: ${OUTPUT_FILE}`);
  console.log(`📊 Total Categories: ${categories.length}`);
  console.log(`📊 Total Albums: ${categories.reduce((sum, c) => sum + c.albums.length, 0)}`);
}

// Run
try {
  generatePortfolioData();
} catch (err) {
  console.error('❌ Error:', err.message);
  process.exit(1);
}
