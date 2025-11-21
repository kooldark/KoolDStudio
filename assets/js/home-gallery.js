document.addEventListener('DOMContentLoaded', async () => {
  const heroSlider = document.getElementById('hero-slider');
  const masonryGallery = document.getElementById('home-masonry-gallery');

  if (!heroSlider || !masonryGallery) return;

  let data = {};
  try {
    const res = await fetch('assets/img/portfolio/images-list.json?t=' + Date.now());
    data = await res.json();
  } catch (e) {
    console.error("Could not load gallery data.", e);
    return;
  }

  const allImages = Object.entries(data).flatMap(([folder, files]) => 
    files.map(file => `assets/img/portfolio/${folder}/${file}`)
  );

  // --- 1. Populate Hero Slider ---
  // Get up to 5 random images for the slider
  const sliderImages = [...allImages].sort(() => 0.5 - Math.random()).slice(0, 5);
  
  let heroHtml = '';
  sliderImages.forEach(imgPath => {
    heroHtml += `
      <div class="swiper-slide">
        <img src="${imgPath}" alt="Kool D. Studio Showcase">
      </div>
    `;
  });
  heroSlider.innerHTML = heroHtml;

  // Initialize Hero Swiper
  new Swiper('.hero-swiper', {
    loop: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    speed: 1200,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  // --- 2. Populate Masonry Gallery ---
  // Get up to 8 random images for the gallery
  const galleryImages = [...allImages].sort(() => 0.5 - Math.random()).slice(0, 8);

  let masonryHtml = '';
  galleryImages.forEach(imgPath => {
    masonryHtml += `
      <div class="masonry-item">
        <img src="${imgPath}" alt="Kool D. Studio Work" loading="lazy">
      </div>
    `;
  });
  masonryGallery.innerHTML = masonryHtml;
});
