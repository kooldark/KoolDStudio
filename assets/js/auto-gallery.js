document.addEventListener("DOMContentLoaded", () => {
  // --- DOM ELEMENTS ---
  const galleryContainer = document.getElementById("auto-gallery");
  const categoryFiltersContainer = document.getElementById("portfolio-filters");
  const backButton = document.getElementById("back-button");
  const categoryShareBtn = document.getElementById("category-share-btn");
  const albumShareBtn = document.getElementById("album-share-btn");
  const pageSubtitle = document.querySelector('.page-subtitle');
  const lightbox = document.getElementById('lightbox');
  const lightboxClose = document.getElementById('lightbox-close');
  const preloader = document.getElementById('preloader');

  // --- STATE ---
  let galleryData = {};
  let visibleImages = [];
  let currentCategory = 'all';
  let currentAlbum = null;
  let currentAlbumLink = null; // Store album link for sharing
  let originalSubtitle = '';
  let lightboxSwiper = null; // To hold the Swiper instance

  const titles = {
    cuoi:      { vn: "Ảnh Cưới", en: "Fine Art Wedding" },
    makeup:    { vn: "Makeup", en: "Artistic Makeup" },
    "gia-dinh":{ vn: "Khoảnh Khắc Gia Đình", en: "Family Moments" },
    "phong-su":{ vn: "Phóng Sự",  en: "Wedding Story" }
  };

  // --- UPDATE META TAGS FOR SOCIAL SHARING ---
  function updateMetaTags(title, description, imageUrl) {
    // Ensure imageUrl is absolute
    const absoluteImageUrl = imageUrl.startsWith('http') ? imageUrl : `https://kooldark.github.io/KoolDStudio/${imageUrl}`;
    
    // Update Open Graph tags
    updateOrCreateMetaTag('property', 'og:title', title);
    updateOrCreateMetaTag('property', 'og:description', description);
    updateOrCreateMetaTag('property', 'og:image', absoluteImageUrl);
    updateOrCreateMetaTag('property', 'og:image:width', '1200');
    updateOrCreateMetaTag('property', 'og:image:height', '630');
    updateOrCreateMetaTag('property', 'og:type', 'website');
    updateOrCreateMetaTag('property', 'og:url', window.location.href);
    
    // Update Twitter tags
    updateOrCreateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateOrCreateMetaTag('name', 'twitter:title', title);
    updateOrCreateMetaTag('name', 'twitter:description', description);
    updateOrCreateMetaTag('name', 'twitter:image', absoluteImageUrl);
    
    // Update page title
    document.title = title;
  }

  function updateOrCreateMetaTag(attrName, attrValue, content) {
    let tag = document.querySelector(`meta[${attrName}="${attrValue}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attrName, attrValue);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  }

  
  async function init() {
    // --- VALIDATE DOM ---
    const requiredElements = [galleryContainer, categoryFiltersContainer, backButton, pageSubtitle, lightbox, lightboxClose, preloader, albumShareBtn];
    if (requiredElements.some(el => !el)) {
      console.error("Gallery initialization failed: a required HTML element is missing.");
      galleryContainer.innerHTML = "<p class='error-message'>Lỗi giao diện. Vui lòng tải lại trang.</p>";
      preloader?.classList.add('hidden');
      return;
    }
    originalSubtitle = pageSubtitle.textContent;

    try {
      const res = await fetch("assets/js/portfolio-data.json");
      if (!res.ok) throw new Error(`Network response was not ok, status: ${res.status}`);
      const portfolioData = await res.json();
      
      // Transform portfolio-data.json format to match old structure
      galleryData = {};
      portfolioData.categories.forEach(cat => {
        galleryData[cat.id] = {};
        cat.albums.forEach(album => {
          galleryData[cat.id][album.id] = album.images;
        });
      });
      
      renderCategoryFilters();
      
      // Check if URL has shared album parameters
      const urlParams = new URLSearchParams(window.location.search);
      const sharedCategory = urlParams.get('category');
      const sharedAlbum = urlParams.get('album');
      
      if (sharedCategory && sharedAlbum) {
        currentCategory = sharedCategory;
        currentAlbum = sharedAlbum;
        
        // Immediately set meta tags for social media crawlers
        const data = galleryData[sharedCategory];
        if (data && data[sharedAlbum]) {
          const firstFile = data[sharedAlbum][0];
          const categoryTitle = titles[sharedCategory]?.vn || sharedCategory;
          const imageUrl = `https://kooldark.github.io/KoolDStudio/assets/img/portfolio/${sharedCategory}/${sharedAlbum}/${firstFile}`;
          
          updateMetaTags(
            `${sharedAlbum} - ${categoryTitle} | Kool D. Studio`,
            `Album ${sharedAlbum} từ bộ sưu tập ${categoryTitle} của Kool D. Studio. Ảnh cưới & gia đình phong cách Hàn Quốc.`,
            imageUrl
          );
        }
        
        // Update active filter
        const filterBtns = categoryFiltersContainer.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
          if (btn.dataset.filter === sharedCategory) {
            btn.classList.add('active');
          } else {
            btn.classList.remove('active');
          }
        });
      }
      
      await render();
      // Hide preloader immediately - don't wait for images
      requestAnimationFrame(() => preloader.classList.add('hidden'));
      addEventListeners();

    } catch (e) {
      console.error("Failed to load or initialize gallery:", e);
      galleryContainer.innerHTML = "<p class='error-message'>Không thể tải album. Vui lòng thử lại sau.</p>";
      preloader.classList.add('hidden');
    }
  }

  // --- CORE RENDER LOGIC ---
  async function render() {
    const data = galleryData[currentCategory];

    if (currentCategory === 'all') {
      await renderImageGrid(getAllImages());
      backButton.classList.add('hidden');
      categoryShareBtn.classList.add('hidden');
      albumShareBtn.classList.add('hidden');
      currentAlbumLink = null;
      pageSubtitle.textContent = originalSubtitle;
      updateMetaTags(
        'Portfolio | Kool D. Studio | Dấu Ấn Khoảnh Khắc',
        'Tuyển tập những khoảnh khắc đẹp nhất được thực hiện bởi Kool D. Studio. Khám phá các câu chuyện tình yêu, gia đình và những ngày trọng đại.',
        'https://kooldark.github.io/KoolDStudio/assets/img/portfolio/makeup/Beauty/1.jpg'
      );
    } else if (data && typeof data === 'object' && !Array.isArray(data)) {
      if (currentAlbum) {
        const albumImages = data[currentAlbum].map(file => `assets/img/portfolio/${currentCategory}/${currentAlbum}/${file}`);
        await renderImageGrid(albumImages);
        backButton.classList.remove('hidden');
        categoryShareBtn.classList.add('hidden');
        albumShareBtn.classList.remove('hidden');
        currentAlbumLink = `${window.location.origin}${window.location.pathname}?category=${encodeURIComponent(currentCategory)}&album=${encodeURIComponent(currentAlbum)}`;
        pageSubtitle.textContent = `Album: ${currentAlbum}`;

        const firstImagePath = `https://kooldark.github.io/KoolDStudio/assets/img/portfolio/${currentCategory}/${currentAlbum}/${data[currentAlbum][0]}`;
        const categoryTitle = titles[currentCategory]?.vn || currentCategory;
        updateMetaTags(
          `Album "${currentAlbum}" | ${categoryTitle} | Kool D. Studio`,
          `Album "${currentAlbum}" thuộc tuyển tập ${categoryTitle} của Kool D. Studio. Lắng nghe câu chuyện được kể qua từng khuôn hình.`,
          firstImagePath
        );
      } else {
        await renderAlbumCovers(currentCategory, data);
        backButton.classList.add('hidden');
        categoryShareBtn.classList.remove('hidden');
        pageSubtitle.textContent = `Chọn một album để khám phá`;

        const categoryTitle = titles[currentCategory]?.vn || currentCategory;
        updateMetaTags(
          `${categoryTitle} | Kool D. Studio Portfolio`,
          `Khám phá tuyển tập ${categoryTitle} tại Kool D. Studio. Mỗi tác phẩm là một câu chuyện độc đáo, được ghi lại bằng cả trái tim.`,
          'https://kooldark.github.io/KoolDStudio/assets/img/portfolio/makeup/Beauty/1.jpg'
        );
      }
    } else if (data && Array.isArray(data)) {
      const categoryImages = data.map(file => `assets/img/portfolio/${currentCategory}/${file}`);
      await renderImageGrid(categoryImages);
      backButton.classList.add('hidden');
      categoryShareBtn.classList.remove('hidden');
      pageSubtitle.textContent = originalSubtitle;

      const categoryTitle = titles[currentCategory]?.vn || currentCategory;
      updateMetaTags(
        `${categoryTitle} | Kool D. Studio Portfolio`,
        `Khám phá tuyển tập ${categoryTitle} tại Kool D. Studio. Mỗi tác phẩm là một câu chuyện độc đáo, được ghi lại bằng cả trái tim.`,
        'https://kooldark.github.io/KoolDStudio/assets/img/portfolio/makeup/Beauty/1.jpg'
      );
    } else {
      await renderImageGrid([]);
      backButton.classList.add('hidden');
      categoryShareBtn.classList.add('hidden');
      updateMetaTags(
        'Portfolio | Kool D. Studio',
        'Tuyển tập những khoảnh khắc đẹp nhất được thực hiện bởi Kool D. Studio. Khám phá các câu chuyện tình yêu, gia đình và những ngày trọng đại.',
        'https://kooldark.github.io/KoolDStudio/assets/img/portfolio/makeup/Beauty/1.jpg'
      );
    }
  }
  
  function renderCategoryFilters() {
    let filterHtml = '<button class="filter-btn active" data-filter="all">Tất cả</button>';
    for (const key in galleryData) {
      const title = titles[key]?.vn || key;
      filterHtml += `<button class="filter-btn" data-filter="${key}">${title}</button>`;
    }
    categoryFiltersContainer.innerHTML = filterHtml;
  }

  // --- VIEW RENDERERS ---
  async function renderImageGrid(images) {
    visibleImages = images.map(imgPath => new URL(imgPath, window.location.origin).href);
    let gridHtml = '<div class="portfolio-grid">';
    if (images.length > 0) {
      images.forEach(imgPath => {
        gridHtml += `
          <div class="grid-item">
            <img src="${imgPath}" alt="Kool D. Studio Portfolio" loading="lazy" decoding="async">
          </div>`;
      });
    } else {
      gridHtml += "<p style='text-align:center; grid-column: 1 / -1;'>Không có ảnh nào trong mục này.</p>";
    }
    gridHtml += '</div>';
    galleryContainer.innerHTML = gridHtml;
    
    // Don't wait for images - refresh AOS immediately for faster render
    if (typeof AOS !== 'undefined') AOS.refresh();
  }

  async function renderAlbumCovers(category, albums) {
    visibleImages = [];
    let gridHtml = '<div class="album-grid">';

    // Load category description if available
    let categoryDescription = '';
    try {
      const categoryInfoRes = await fetch(`assets/img/portfolio/${category}/category-info.json`);
      if (categoryInfoRes.ok) {
        const categoryInfo = await categoryInfoRes.json();
        categoryDescription = categoryInfo.description || '';
      }
    } catch (e) {
      console.log('No category description available');
    }

    // Add category description at the top if exists
    if (categoryDescription) {
      gridHtml += `<div class="category-description">
        <p class="category-description-text">${categoryDescription}</p>
      </div>`;
    }

    // Lazy load: Limit albums shown at once
    const MAX_ALBUMS = 12;
    let albumCount = 0;
    
    for (const albumName in albums) {
      if (albumCount >= MAX_ALBUMS) break;
      
      const albumFiles = albums[albumName];
      if (albumFiles.length === 0) continue;
      albumCount++;
      
      const isLoose = albumName === 'Ảnh lẻ';
      const basePath = `assets/img/portfolio/${category}/`;
      const imageFolder = isLoose ? '' : `${albumName}/`;
      const coverImage = basePath + imageFolder + albumFiles[0];

      // Create shareable link for this album
      const albumLink = `${window.location.origin}${window.location.pathname}?category=${encodeURIComponent(category)}&album=${encodeURIComponent(albumName)}`;
      const encodedLink = encodeURIComponent(albumLink);

      // Load album description
      let albumDescription = '';
      if (!isLoose) {
        try {
          const infoRes = await fetch(`${basePath}${albumName}/info.json`);
          if (infoRes.ok) {
            const info = await infoRes.json();
            albumDescription = info.description || '';
          }
        } catch (e) {
          console.log(`No description for album: ${albumName}`);
        }
      }

      gridHtml += `
        <div class="album-card" data-category="${category}" data-album="${albumName}">
          <img class="album-card-thumbnail" src="${coverImage}" alt="${albumName}" loading="lazy" decoding="async">
          <div class="album-card-overlay"></div>
          <h3 class="album-card-title">${albumName}</h3>
          ${albumDescription ? `<p class="album-card-description">${albumDescription}</p>` : ''}
        </div>`;
    }
    gridHtml += '</div>';
    galleryContainer.innerHTML = gridHtml;

    // Don't wait for images - refresh AOS immediately for faster render
    if (typeof AOS !== 'undefined') AOS.refresh();
  }

  // --- HELPERS ---
  /**
   * Helper function to get a random item from an array
   */
  function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  /**
   * Get one random representative image from each category/album
   */
  function getAllImages() {
    let all = [];
    for (const category in galleryData) {
      const content = galleryData[category];
      if (Array.isArray(content)) {
        // Simple category: get one random image
        if (content.length > 0) {
          const randomFile = getRandomItem(content);
          all.push(`assets/img/portfolio/${category}/${randomFile}`);
        }
      } else if (typeof content === 'object' && content !== null) {
        // Nested category: get one random image from each album
        for (const album in content) {
          const albumFiles = content[album];
          if (Array.isArray(albumFiles) && albumFiles.length > 0) {
            const isLoose = album === 'Ảnh lẻ';
            const basePath = `assets/img/portfolio/${category}/`;
            const imageFolder = isLoose ? '' : `${album}/`;
            const randomFile = getRandomItem(albumFiles);
            all.push(basePath + imageFolder + randomFile);
          }
        }
      }
    }
    return all;
  }
  
  // --- LIGHTBOX with SWIPER ---
  function openLightbox(clickedImgSrc) {
    const initialSlideIndex = visibleImages.findIndex(src => src === clickedImgSrc);
    if (initialSlideIndex === -1) return;

    lightbox.style.display = 'block';

    const swiperWrapper = lightbox.querySelector('.swiper-wrapper');
    swiperWrapper.innerHTML = visibleImages.map(src => `
        <div class="swiper-slide">
            <div class="swiper-zoom-container">
                <img src="${src}" alt="Portfolio image">
            </div>
        </div>
    `).join('');

    if (lightboxSwiper) lightboxSwiper.destroy(true, true);

    // Add a small delay to ensure the lightbox is fully displayed before Swiper initializes
    setTimeout(() => {
      lightboxSwiper = new Swiper(lightbox.querySelector('.swiper-container'), {
          initialSlide: initialSlideIndex,
          loop: false,
          slidesPerView: 1,
          spaceBetween: 20,
          navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
          },
          pagination: {
              el: '.swiper-pagination',
              type: 'fraction',
          },
          keyboard: {
              enabled: true,
          },
          zoom: {
              maxRatio: 2,
              toggle: true,
          },
      });
    }, 50); // 50ms delay
  }

  // --- WATERMARK AND DOWNLOAD FUNCTION ---
  function downloadImageWithWatermark(imageSrc) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.crossOrigin = 'anonymous'; // Handle CORS
    img.onload = function() {
      // Set canvas size to match image
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the original image
      ctx.drawImage(img, 0, 0);

      // Add watermark
      ctx.save();

      // Watermark text settings - elegant serif font
      const watermarkFontSize = Math.max(28, canvas.width / 30);
      ctx.font = `${watermarkFontSize}px 'Playfair Display', serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';

      // Add watermark text at bottom center with padding
      const watermarkText = 'Kool D. Studio';
      const watermarkY = canvas.height - Math.max(30, canvas.height / 20); // 30px or proportional padding from bottom
      ctx.fillText(watermarkText, canvas.width / 2, watermarkY);

      // Add subtle line above watermark
      ctx.strokeStyle = 'rgba(235, 149, 0, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      const lineWidth = Math.max(100, canvas.width / 6);
      ctx.moveTo(canvas.width / 2 - lineWidth / 2, watermarkY - Math.max(15, watermarkFontSize / 2));
      ctx.lineTo(canvas.width / 2 + lineWidth / 2, watermarkY - Math.max(15, watermarkFontSize / 2));
      ctx.stroke();

      ctx.restore();

      // Convert to blob and download
      canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'KoolDStudio_' + Date.now() + '.jpg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 'image/jpeg', 0.95);
    };

    img.onerror = function() {
      alert('Không thể tải ảnh để tải về. Vui lòng thử lại.');
    };

    img.src = imageSrc;
  }
  
  const closeLightbox = () => {
    lightbox.style.display = 'none';
    if (lightboxSwiper) {
        lightboxSwiper.destroy(true, true);
        lightboxSwiper = null;
    }
  };

  // --- EVENT LISTENERS ---
  function addEventListeners() {
    categoryFiltersContainer.addEventListener('click', (e) => {
      if (!e.target.matches('.filter-btn')) return;

      categoryFiltersContainer.querySelector('.active')?.classList.remove('active');
      e.target.classList.add('active');

      currentCategory = e.target.dataset.filter;
      currentAlbum = null;
      render();
    });

    backButton.addEventListener('click', () => {
      currentAlbum = null;
      render();
    });

    galleryContainer.addEventListener('click', (e) => {
      const albumCard = e.target.closest('.album-card');
      const shareBtn = e.target.closest('.album-share-btn');
      const gridItem = e.target.closest('.grid-item');

      if (shareBtn) {
        // Handle share button click
        const link = shareBtn.dataset.link;
        copyToClipboard(link, shareBtn);
      } else if (albumCard) {
        currentCategory = albumCard.dataset.category;
        currentAlbum = albumCard.dataset.album;
        render();
      } else if (gridItem) {
        const img = gridItem.querySelector('img');
        if (img) openLightbox(img.src);
      }
    });

    categoryShareBtn.addEventListener('click', () => {
      const categoryLink = `${window.location.origin}${window.location.pathname}?category=${encodeURIComponent(currentCategory)}`;
      copyToClipboard(categoryLink, categoryShareBtn);
    });

    albumShareBtn.addEventListener('click', () => {
      if (currentAlbumLink) {
        copyToClipboard(currentAlbumLink, albumShareBtn);
      }
    });

    lightboxClose.addEventListener('click', closeLightbox);

    // Download button event listener
    const downloadBtn = document.getElementById('lightbox-download');
    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => {
        if (lightboxSwiper && visibleImages.length > 0) {
          const currentSlideIndex = lightboxSwiper.activeIndex;
          const currentImageSrc = visibleImages[currentSlideIndex];
          if (currentImageSrc) {
            downloadImageWithWatermark(currentImageSrc);
          }
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (lightbox.style.display !== 'block') return;
      if (e.key === 'Escape') closeLightbox();
    });
  }

  // --- SHARE LINK HANDLER ---
  function copyToClipboard(link, button) {
    // Check if Web API is available (modern browsers)
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(link).then(() => {
        showCopySuccess(button);
      }).catch(() => {
        fallbackCopyToClipboard(link, button);
      });
    } else {
      fallbackCopyToClipboard(link, button);
    }
  }

  function fallbackCopyToClipboard(link, button) {
    // Fallback for older browsers
    const textarea = document.createElement('textarea');
    textarea.value = link;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showCopySuccess(button);
    } catch (err) {
      alert('Không thể sao chép. Vui lòng thử lại!');
    } finally {
      document.body.removeChild(textarea);
    }
  }

  function showCopySuccess(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<span class="share-icon">✓</span><span class="share-text">Đã sao chép!</span>';
    button.classList.add('copied');
    setTimeout(() => {
      button.innerHTML = originalText;
      button.classList.remove('copied');
    }, 2000);
  }



  // --- START THE APP ---
  init();
});
