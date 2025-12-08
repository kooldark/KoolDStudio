document.addEventListener("DOMContentLoaded", () => {
  // --- DOM ELEMENTS ---
  const galleryContainer = document.getElementById("auto-gallery");
  const categoryFiltersContainer = document.getElementById("portfolio-filters");
  const backButton = document.getElementById("back-button");
  const pageSubtitle = document.querySelector('.page-subtitle');
  const lightbox = document.getElementById('lightbox');
  const lightboxClose = document.getElementById('lightbox-close');
  const preloader = document.getElementById('preloader');

  // --- STATE ---
  let galleryData = {};
  let visibleImages = [];
  let currentCategory = 'all';
  let currentAlbum = null;
  let originalSubtitle = '';
  let lightboxSwiper = null; // To hold the Swiper instance

  const titles = {
    cuoi:      { vn: "Ảnh Cưới",      en: "Pre-Wedding" },
    makeup:    { vn: "Makeup",        en: "Bridal" },
    "gia-dinh":{ vn: "Gia Đình",       en: "Family" },
    "phong-su":{ vn: "Phóng Sự",  en: "Wedding Day" }
  };

  // --- UPDATE META TAGS FOR SOCIAL SHARING ---
  function updateMetaTags(title, description, imageUrl) {
    // Update Open Graph tags
    updateOrCreateMetaTag('property', 'og:title', title);
    updateOrCreateMetaTag('property', 'og:description', description);
    updateOrCreateMetaTag('property', 'og:image', imageUrl);
    updateOrCreateMetaTag('property', 'og:url', window.location.href);
    
    // Update Twitter tags
    updateOrCreateMetaTag('name', 'twitter:title', title);
    updateOrCreateMetaTag('name', 'twitter:description', description);
    updateOrCreateMetaTag('name', 'twitter:image', imageUrl);
    
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
    const requiredElements = [galleryContainer, categoryFiltersContainer, backButton, pageSubtitle, lightbox, lightboxClose, preloader];
    if (requiredElements.some(el => !el)) {
      console.error("Gallery initialization failed: a required HTML element is missing.");
      galleryContainer.innerHTML = "<p class='error-message'>Lỗi giao diện. Vui lòng tải lại trang.</p>";
      preloader?.classList.add('hidden');
      return;
    }
    originalSubtitle = pageSubtitle.textContent;

    try {
      const res = await fetch("assets/img/portfolio/images-list.json?t=" + Date.now());
      if (!res.ok) throw new Error(`Network response was not ok, status: ${res.status}`);
      galleryData = await res.json();
      
      renderCategoryFilters();
      
      // Check if URL has shared album parameters
      const urlParams = new URLSearchParams(window.location.search);
      const sharedCategory = urlParams.get('category');
      const sharedAlbum = urlParams.get('album');
      
      if (sharedCategory && sharedAlbum) {
        currentCategory = sharedCategory;
        currentAlbum = sharedAlbum;
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
      preloader.classList.add('hidden');
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
      pageSubtitle.textContent = originalSubtitle;
      updateMetaTags(
        'Portfolio - Kool D. Studio | Ảnh Cưới Hàn Quốc & Gia Đình',
        'Portfolio ảnh cưới phong cách Hàn Quốc tinh tế, gia đình, makeup & phóng sự tại Kool D. Studio',
        'https://kooldark.github.io/KoolDStudio/assets/img/portfolio/makeup/Beauty/1.jpg'
      );
    } else if (data && typeof data === 'object' && !Array.isArray(data)) {
      if (currentAlbum) {
        const albumImages = data[currentAlbum].map(file => `assets/img/portfolio/${currentCategory}/${currentAlbum}/${file}`);
        await renderImageGrid(albumImages);
        backButton.classList.remove('hidden');
        pageSubtitle.textContent = `Album: ${currentAlbum}`;
        
        // Update meta tags for album sharing
        const firstImagePath = `https://kooldark.github.io/KoolDStudio/assets/img/portfolio/${currentCategory}/${currentAlbum}/${data[currentAlbum][0]}`;
        const categoryTitle = titles[currentCategory]?.vn || currentCategory;
        updateMetaTags(
          `${currentAlbum} - ${categoryTitle} | Kool D. Studio`,
          `Album ${currentAlbum} từ bộ sưu tập ${categoryTitle} của Kool D. Studio. Ảnh cưới & gia đình phong cách Hàn Quốc.`,
          firstImagePath
        );
      } else {
        await renderAlbumCovers(currentCategory, data);
        backButton.classList.add('hidden');
        pageSubtitle.textContent = `Chọn một album để khám phá`;
        
        const categoryTitle = titles[currentCategory]?.vn || currentCategory;
        updateMetaTags(
          `${categoryTitle} - Kool D. Studio`,
          `Khám phá bộ sưu tập ${categoryTitle} của Kool D. Studio. Ảnh cưới & gia đình phong cách Hàn Quốc.`,
          'https://kooldark.github.io/KoolDStudio/assets/img/portfolio/makeup/Beauty/1.jpg'
        );
      }
    } else if (data && Array.isArray(data)) {
      const categoryImages = data.map(file => `assets/img/portfolio/${currentCategory}/${file}`);
      await renderImageGrid(categoryImages);
      backButton.classList.add('hidden');
      pageSubtitle.textContent = originalSubtitle;
      
      const categoryTitle = titles[currentCategory]?.vn || currentCategory;
      updateMetaTags(
        `${categoryTitle} - Kool D. Studio`,
        `Khám phá bộ sưu tập ${categoryTitle} của Kool D. Studio. Ảnh cưới & gia đình phong cách Hàn Quốc.`,
        'https://kooldark.github.io/KoolDStudio/assets/img/portfolio/makeup/Beauty/1.jpg'
      );
    } else {
      await renderImageGrid([]);
      backButton.classList.add('hidden');
      updateMetaTags(
        'Portfolio - Kool D. Studio',
        'Portfolio ảnh cưới phong cách Hàn Quốc tinh tế, gia đình, makeup & phóng sự tại Kool D. Studio',
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
          <div class="grid-item" data-aos="fade-up">
            <img src="${imgPath}" alt="Kool D. Studio Portfolio" loading="lazy">
          </div>`;
      });
    } else {
      gridHtml += "<p style='text-align:center; grid-column: 1 / -1;'>Không có ảnh nào trong mục này.</p>";
    }
    gridHtml += '</div>';
    galleryContainer.innerHTML = gridHtml;
    await whenImagesLoaded(galleryContainer);
    if (typeof AOS !== 'undefined') AOS.refresh();
  }

  async function renderAlbumCovers(category, albums) {
    visibleImages = [];
    let gridHtml = '<div class="album-grid">';
    for (const albumName in albums) {
      const albumFiles = albums[albumName];
      if (albumFiles.length === 0) continue;
      const isLoose = albumName === 'Ảnh lẻ';
      const basePath = `assets/img/portfolio/${category}/`;
      const imageFolder = isLoose ? '' : `${albumName}/`;
      const coverImage = basePath + imageFolder + albumFiles[0];
      
      // Create shareable link for this album
      const albumLink = `${window.location.origin}${window.location.pathname}?category=${encodeURIComponent(category)}&album=${encodeURIComponent(albumName)}`;
      const encodedLink = encodeURIComponent(albumLink);
      
      gridHtml += `
        <div class="album-card" data-category="${category}" data-album="${albumName}" data-aos="fade-up">
          <img class="album-card-thumbnail" src="${coverImage}" alt="${albumName}" loading="lazy">
          <div class="album-card-overlay"></div>
          <h3 class="album-card-title">${albumName}</h3>
          <div class="album-card-actions">
            <button class="album-share-btn" data-link="${albumLink}" title="Sao chép link album">
              <span class="share-icon">🔗</span>
              <span class="share-text">Chia sẻ</span>
            </button>
          </div>
        </div>`;
    }
    gridHtml += '</div>';
    galleryContainer.innerHTML = gridHtml;
    await whenImagesLoaded(galleryContainer);
    if (typeof AOS !== 'undefined') AOS.refresh();
  }

  // --- HELPERS ---
  function whenImagesLoaded(container) {
    const images = Array.from(container.getElementsByTagName('img'));
    if (images.length === 0) return Promise.resolve();
    return Promise.all(images.map(img => new Promise(resolve => {
      if (img.complete) return resolve();
      img.addEventListener('load', resolve);
      img.addEventListener('error', resolve);
    })));
  }

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
    
    lightboxClose.addEventListener('click', closeLightbox);
    
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
