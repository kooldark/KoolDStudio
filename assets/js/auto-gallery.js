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
    } else if (data && typeof data === 'object' && !Array.isArray(data)) {
      if (currentAlbum) {
        const albumImages = data[currentAlbum].map(file => `assets/img/portfolio/${currentCategory}/${currentAlbum}/${file}`);
        await renderImageGrid(albumImages);
        backButton.classList.remove('hidden');
        pageSubtitle.textContent = `Album: ${currentAlbum}`;
      } else {
        await renderAlbumCovers(currentCategory, data);
        backButton.classList.add('hidden');
        pageSubtitle.textContent = `Chọn một album để khám phá`;
      }
    } else if (data && Array.isArray(data)) {
      const categoryImages = data.map(file => `assets/img/portfolio/${currentCategory}/${file}`);
      await renderImageGrid(categoryImages);
      backButton.classList.add('hidden');
      pageSubtitle.textContent = originalSubtitle;
    } else {
      await renderImageGrid([]);
      backButton.classList.add('hidden');
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
      
      gridHtml += `
        <div class="album-card" data-category="${category}" data-album="${albumName}" data-aos="fade-up">
          <img class="album-card-thumbnail" src="${coverImage}" alt="${albumName}" loading="lazy">
          <div class="album-card-overlay"></div>
          <h3 class="album-card-title">${albumName}</h3>
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
      const gridItem = e.target.closest('.grid-item');

      if (albumCard) {
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

  // --- START THE APP ---
  init();
});
