document.addEventListener("DOMContentLoaded", () => {
  // --- DOM ELEMENTS ---
  const galleryContainer = document.getElementById("auto-gallery");
  const categoryFiltersContainer = document.getElementById("portfolio-filters");
  const backButton = document.getElementById("back-button");
  const pageSubtitle = document.querySelector('.page-subtitle');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');
  const preloader = document.getElementById('preloader');

  // --- STATE ---
  let galleryData = {};
  let lightboxCurrentIndex = 0;
  let visibleImages = [];
  let currentCategory = 'all';
  let currentAlbum = null;
  let originalSubtitle = '';

  const titles = {
    cuoi:      { vn: "Ảnh Cưới",      en: "Pre-Wedding" },
    makeup:    { vn: "Makeup",        en: "Bridal" },
    "gia-dinh":{ vn: "Gia Đình",       en: "Family" },
    "phong-su":{ vn: "Phóng Sự",  en: "Wedding Day" }
  };
  
  async function init() {
    // --- VALIDATE DOM ---
    const requiredElements = [galleryContainer, categoryFiltersContainer, backButton, pageSubtitle, lightbox, lightboxImg, lightboxClose, lightboxPrev, lightboxNext, preloader];
    if (requiredElements.some(el => !el)) {
      console.error("Gallery initialization failed: a required HTML element is missing.");
      galleryContainer.innerHTML = "<p class='error-message'>Lỗi giao diện. Vui lòng tải lại trang.</p>";
      preloader?.classList.add('hidden'); // Hide preloader even on error
      return;
    }
    originalSubtitle = pageSubtitle.textContent;

    try {
      const res = await fetch("assets/img/portfolio/images-list.json?t=" + Date.now());
      if (!res.ok) {
        throw new Error(`Network response was not ok, status: ${res.status}`);
      }
      galleryData = await res.json();
      
      // All data is loaded, now we can render and set up events
      renderCategoryFilters();
      await render(); // Wait for the first render (and images) to complete
      preloader.classList.add('hidden'); // NOW hide the preloader
      addEventListeners();

    } catch (e) {
      console.error("Failed to load or initialize gallery:", e);
      galleryContainer.innerHTML = "<p class='error-message'>Không thể tải album. Vui lòng thử lại sau.</p>";
      preloader.classList.add('hidden'); // Ensure preloader hides on error too
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
      // Fallback for empty or invalid category
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
    visibleImages = images;
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
    await whenImagesLoaded(galleryContainer); // Wait for images
    if (typeof AOS !== 'undefined') AOS.refresh();
  }

  async function renderAlbumCovers(category, albums) {
    visibleImages = [];
    let gridHtml = '<div class="album-grid">';
    for (const albumName in albums) {
      const albumFiles = albums[albumName];
      if (albumFiles.length === 0) continue;
      // For album covers, we need to construct the path carefully. It could be in a sub-album folder or a loose file.
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
    await whenImagesLoaded(galleryContainer); // Wait for images
    if (typeof AOS !== 'undefined') AOS.refresh();
  }

  // --- HELPERS ---
  function whenImagesLoaded(container) {
    const images = Array.from(container.getElementsByTagName('img'));
    if (images.length === 0) {
      return Promise.resolve();
    }

    const promises = images.map(img => {
      return new Promise(resolve => {
        if (img.complete) return resolve();
        img.addEventListener('load', resolve);
        img.addEventListener('error', resolve); // Resolve on error too, don't block the UI
      });
    });
    
    return Promise.all(promises);
  }

  function getAllImages() {
    let all = [];
    for (const category in galleryData) {
      const content = galleryData[category];
      if (Array.isArray(content)) {
        all.push(...content.map(file => `assets/img/portfolio/${category}/${file}`));
      } else if (typeof content === 'object' && content !== null) {
        for (const album in content) {
          const isLoose = album === 'Ảnh lẻ';
          const basePath = `assets/img/portfolio/${category}/`;
          const imageFolder = isLoose ? '' : `${album}/`;
          all.push(...content[album].map(file => basePath + imageFolder + file));
        }
      }
    }
    // Shuffle the array
    for (let i = all.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [all[i], all[j]] = [all[j], all[i]];
    }
    return all.slice(0, 20); // Show up to 20 random images on 'All'
  }
  
  // --- LIGHTBOX ---
  function showImage(index) {
    if (index < 0 || index >= visibleImages.length) return;
    lightboxCurrentIndex = index;
    lightboxImg.src = visibleImages[index];
  }

  function openLightbox(clickedImgSrc) {
    const imageInVisible = visibleImages.findIndex(src => src === clickedImgSrc);
    if (imageInVisible === -1) return;
    
    lightbox.classList.add('active');
    showImage(imageInVisible);
  }
  
  const closeLightbox = () => lightbox.classList.remove('active');
  const showNext = () => showImage((lightboxCurrentIndex + 1) % visibleImages.length);
  const showPrev = () => showImage((lightboxCurrentIndex - 1 + visibleImages.length) % visibleImages.length);

  // --- EVENT LISTENERS ---
  function addEventListeners() {
    categoryFiltersContainer.addEventListener('click', (e) => {
      if (!e.target.matches('.filter-btn')) return;
      
      categoryFiltersContainer.querySelector('.active')?.classList.remove('active');
      e.target.classList.add('active');
      
      currentCategory = e.target.dataset.filter;
      currentAlbum = null;
      render(); // This is not awaited, which is fine for subsequent clicks
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
    lightboxNext.addEventListener('click', showNext);
    lightboxPrev.addEventListener('click', showPrev);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'Escape') closeLightbox();
    });
  }

  // --- START THE APP ---
  init();
});
