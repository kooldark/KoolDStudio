// assets/js/auto-gallery.js
document.addEventListener("DOMContentLoaded", async () => {
  const galleryContainer = document.getElementById("auto-gallery");
  const filtersContainer = document.getElementById("portfolio-filters");
  if (!galleryContainer || !filtersContainer) return;

  let allImages = []; // Flattened array of all image objects
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

  // 2. RENDER GALLERY AS A GRID
  const renderGallery = () => {
    let galleryHtml = '<div class="portfolio-grid">';
    allImages = []; // Reset the flat image list
    let flatIndex = 0;

    for (const folder in data) {
      if (data[folder] && data[folder].length > 0) {
        const t = titles[folder] || { vn: folder };
        data[folder].forEach(file => {
          const imagePath = `assets/img/portfolio/${folder}/${file}`;
          galleryHtml += `
            <div class="grid-item" data-category="${folder}" data-aos="fade-up">
              <img src="${imagePath}" alt="${t.vn}" loading="lazy" data-index="${flatIndex++}">
            </div>`;
          allImages.push({
            src: imagePath,
            album: folder,
            title: t.vn
          });
        });
      }
    }

    galleryHtml += '</div>';
    galleryContainer.innerHTML = galleryHtml || "<p style='text-align:center;padding:120px;color:#999;'>Chưa có ảnh nào</p>";
    
    // Re-initialize AOS and Lightbox after rendering
    AOS.refresh();
    initializeLightbox();
  };
  
  // 3. FILTER GALLERY
  const filterGallery = (filter) => {
    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
      const category = item.dataset.category;
      if (filter === 'all' || filter === category) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
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

    let currentIndex = 0;
    let visibleImages = [];

    const updateVisibleImages = () => {
        visibleImages = [];
        document.querySelectorAll('.grid-item:not(.hidden) img').forEach(img => {
            visibleImages.push(img);
        });
    };

    const showImage = (index) => {
        if (index < 0 || index >= visibleImages.length) return;
        currentIndex = index;
        lightboxImg.src = visibleImages[currentIndex].src;
    };

    const openLightbox = (clickedImg) => {
        updateVisibleImages();
        const clickedIndex = visibleImages.findIndex(img => img.src === clickedImg.src);
        if (clickedIndex === -1) return;

        lightbox.classList.add('active');
        showImage(clickedIndex);
    };
    
    const closeLightbox = () => {
      lightbox.classList.remove('active');
      lightboxImg.src = '';
    };

    const showNext = () => showImage((currentIndex + 1) % visibleImages.length);
    const showPrev = () => showImage((currentIndex - 1 + visibleImages.length) % visibleImages.length);

    document.querySelectorAll('.grid-item img').forEach(img => {
      img.addEventListener('click', (e) => openLightbox(e.target));
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', showNext);
    lightboxPrev.addEventListener('click', showPrev);
    
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'Escape') closeLightbox();
    });
  };

  // 5. ADD EVENT LISTENERS TO FILTERS
  const addFilterListeners = () => {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        const filter = e.target.dataset.filter;
        
        buttons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        filterGallery(filter);
        
        // After filtering, give a moment for the CSS transition before re-initializing lightbox
        setTimeout(() => {
            initializeLightbox();
            AOS.refresh();
        }, 300); // Should match CSS transition time
      });
    });
  };

  // --- INITIAL EXECUTION ---
  renderFilters();
  renderGallery();
  addFilterListeners();
});
