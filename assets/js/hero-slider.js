// assets/js/hero-slider.js - Enhanced Hero Slider with Optimizations
document.addEventListener('DOMContentLoaded', async () => {
  const heroSlider = document.getElementById('hero-slider-wrapper');
  if (!heroSlider) return;

  let images = [];
  try {
    // Fetch the list of images for the hero slider
    const res = await fetch('config/hero-images.json?t=' + Date.now());
    images = await res.json();
  } catch (e) {
    console.error("Could not load hero slider images.", e);
    return;
  }

  // Check if there are any images to display
  if (images.length === 0) {
    heroSlider.innerHTML = '<div class="swiper-slide"><div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#e9e4de;color:#999;">No hero images found.</div></div>';
    return;
  }

  // Shuffle the images array for random order (but keep first image for initial load)
  for (let i = images.length - 1; i > 1; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [images[i], images[j]] = [images[j], images[i]];
  }

  // Populate the slider with images from the hero directory
  // First image is loaded eagerly, rest use lazy loading
  let heroHtml = '';
  images.forEach((imageFile, index) => {
    const loadingAttr = index === 0 ? 'eager' : 'lazy';
    heroHtml += `
      <div class="swiper-slide">
        <img 
          src="assets/img/hero/${imageFile}" 
          alt="Kool D. Studio - Khoảnh khắc ${index + 1}"
          loading="${loadingAttr}"
          decoding="async"
          width="1920"
          height="1080"
        >
      </div>
    `;
  });
  heroSlider.innerHTML = heroHtml;

  // Initialize the Hero Swiper after populating the slides
  const swiperContainer = document.querySelector('.hero-slider');
  if (!swiperContainer) return;
  
  new Swiper(swiperContainer, {
    loop: images.length > 1,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    speed: 1200,
    effect: 'fade',
    fadeEffect: {
      crossFade: true,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      type: 'bullets',
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    touchEventsTarget: 'container',
    simulateTouch: true,
    preloadImages: false,
    lazy: {
      loadPrevNext: true,
      loadPrevNextAmount: 1,
    },
    a11y: {
      enabled: true,
      prevSlideMessage: 'Slide trước',
      nextSlideMessage: 'Slide kế tiếp',
    },
    grabCursor: true,
    allowTouchMove: true,
  });
});
