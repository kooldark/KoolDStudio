// assets/js/auto-gallery.js
document.addEventListener("DOMContentLoaded", async () => {
  const galleryContainer = document.getElementById("auto-gallery");
  const filtersContainer = document.getElementById("portfolio-filters");
  if (!galleryContainer || !filtersContainer) return;

  let data = {};
  try {
    const res = await fetch("assets/img/portfolio/images-list.json?t=" + Date.now());
    data = await res.json();
  } catch (e) {
    galleryContainer.innerHTML = "<p style='text-align:center;padding:100px;color:#999;'>Đang tải album...</p>";
    return;
  }

  const titles = {
    cuoi:      { vn: "Ảnh Cưới",      en: "Pre-Wedding" },
    makeup:    { vn: "Makeup",        en: "Bridal" },
    "gia-dinh":{ vn: "Gia Đình",       en: "Family" },
    "phong-su":{ vn: "Phóng Sự Cưới",  en: "Wedding Day" }
  };

  // 1. RENDER FILTERS
  const renderFilters = () => {
    let filterHtml = '<button class="filter-btn active" data-filter="all">Tất cả</button>';
    for (const key in data) {
      if (data[key] && data[key].length > 0) {
        const title = titles[key] ? titles[key].vn : key;
        filterHtml += `<button class="filter-btn" data-filter="${key}">${title}</button>`;
      }
    }
    filtersContainer.innerHTML = filterHtml;
  };

  // 2. RENDER GALLERY
  const renderGallery = (filter = 'all') => {
    let galleryHtml = "";
    const itemsToRender = (filter === 'all') ? Object.entries(data) : [[filter, data[filter]]];

    for (const [folder, imgs] of itemsToRender) {
      if (!imgs || imgs.length === 0) continue;
      const t = titles[folder] || { vn: folder, en: folder };

      galleryHtml += `
        <section class="portfolio-section" data-aos="fade-up">
          <h2 class="section-title">${t.vn}</h2>
          <p class="section-subtitle">${t.en} Collection</p>
          <div class="swiper portfolio-swiper">
            <div class="swiper-wrapper">
              ${imgs.map((file, index) => `
                <div class="swiper-slide">
                  <img src="assets/img/portfolio/${folder}/${file}" alt="${t.vn}" loading="lazy" data-album="${folder}" data-index="${index}">
                </div>
              `).join('')}
            </div>
            <div class="swiper-button-next"></div>
            <div class="swiper-button-prev"></div>
            <div class="swiper-pagination"></div>
          </div>
        </section>`;
    }
    galleryContainer.innerHTML = galleryHtml || "<p style='text-align:center;padding:120px;color:#999;'>Chưa có ảnh nào</p>";
    
    // Re-initialize Swiper and Lightbox after rendering
    initializeSwiper();
    initializeLightbox();
  };

  // 3. INITIALIZE SWIPER
  const initializeSwiper = () => {
    document.querySelectorAll(".portfolio-swiper").forEach(el => {
      new Swiper(el, {
        loop: true,
        autoplay: { delay: 3500, disableOnInteraction: false },
        speed: 900,
        spaceBetween: 30,
        grabCursor: true,
        pagination: { el: ".swiper-pagination", clickable: true },
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        breakpoints: { 640:1, 768:2, 1024:3, 1280:4 }
      });
    });
  };

  // 4. INITIALIZE LIGHTBOX
  const initializeLightbox = () => {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    if (!lightbox || !lightboxImg || !lightboxClose || !lightboxPrev || !lightboxNext) return;

    let currentAlbum = '';
    let currentIndex = 0;

    const showImage = () => {
      const imagesInAlbum = data[currentAlbum];
      if (imagesInAlbum && imagesInAlbum.length > 0) {
        lightboxImg.src = `assets/img/portfolio/${currentAlbum}/${imagesInAlbum[currentIndex]}`;
      }
    };

    const openLightbox = (album, index) => {
      currentAlbum = album;
      currentIndex = parseInt(index, 10);
      lightbox.classList.add('active');
      showImage();
    };

    const closeLightbox = () => {
      lightbox.classList.remove('active');
      lightboxImg.src = '';
    };

    const showNext = () => {
      const imagesInAlbum = data[currentAlbum];
      currentIndex = (currentIndex + 1) % imagesInAlbum.length;
      showImage();
    };

    const showPrev = () => {
      const imagesInAlbum = data[currentAlbum];
      currentIndex = (currentIndex - 1 + imagesInAlbum.length) % imagesInAlbum.length;
      showImage();
    };

    document.querySelectorAll('.portfolio-swiper .swiper-slide img').forEach(img => {
      img.addEventListener('click', (e) => {
        openLightbox(e.target.dataset.album, e.target.dataset.index);
      });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', showNext);
    lightboxPrev.addEventListener('click', showPrev);
    
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  };

  // 5. ADD EVENT LISTENERS TO FILTERS
  const addFilterListeners = () => {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        const filter = e.target.dataset.filter;
        
        // Update active button
        buttons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        // Re-render gallery
        renderGallery(filter);
      });
    });
  };

  // --- INITIAL EXECUTION ---
  renderFilters();
  renderGallery('all');
  addFilterListeners();
});
