// assets/js/hero-slider.js
document.addEventListener('DOMContentLoaded', async () => {
  const heroSlider = document.getElementById('hero-slider');
  if (!heroSlider) return;

  let images = [];
  try {
    // Fetch the list of images for the hero slider
    const res = await fetch('assets/js/hero-images.json?t=' + Date.now());
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

  // Shuffle the images array for random order
  for (let i = images.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [images[i], images[j]] = [images[j], images[i]];
  }

  // Populate the slider with images from the hero directory
  let heroHtml = '';
  images.forEach(imageFile => {
    heroHtml += `
      <div class="swiper-slide">
        <img src="assets/img/hero/${imageFile}" alt="Kool D. Studio Hero Image">
      </div>
    `;
  });
  heroSlider.innerHTML = heroHtml;

  // Initialize the Hero Swiper after populating the slides
  new Swiper('.hero-swiper', {
    loop: images.length > 1, // Loop only if there is more than one image
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    speed: 1200,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
});
