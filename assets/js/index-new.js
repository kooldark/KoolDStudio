// ========== ELEGANT HOME PAGE JAVASCRIPT ==========

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out-cubic',
    once: true,
    offset: 100
  });

  // Initialize mobile navigation
  initMobileNav();
  
  // Initialize smooth scroll
  initSmoothScroll();
  
  // Handle scroll effects
  handleScrollEffects();
  
  // Populate hero gallery
  populateHeroGallery();
});

/* ========== MOBILE NAVIGATION ==========*/
function initMobileNav() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!navToggle) return;

  navToggle.addEventListener('click', function() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

/* ========== POPULATE HERO GALLERY ==========*/
function populateHeroGallery() {
  const heroGrid = document.querySelector('.hero-grid');
  if (!heroGrid || typeof galleryData === 'undefined') return;

  // Select 6 random images from all categories
  const allImages = [
    ...galleryData.featured.map(item => item.src),
    ...galleryData.weddings,
    ...galleryData.families,
    ...galleryData.makeups,
    ...galleryData.portraits,
    ...galleryData.documentaries
  ];

  // Shuffle and get first 6 unique images
  const shuffled = allImages.sort(() => 0.5 - Math.random());
  const selectedImages = shuffled.slice(0, 6);

  // Clear existing content
  heroGrid.innerHTML = '';

  // Create image elements
  selectedImages.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = `Gallery Image ${index + 1}`;
    img.loading = 'lazy';
    img.style.animation = `fadeInGallery 0.8s ease-out ${index * 0.1}s both`;
    heroGrid.appendChild(img);
  });
}

/* ========== SMOOTH SCROLL ==========*/
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/* ========== SCROLL EFFECTS ==========*/
function handleScrollEffects() {
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 2px 16px rgba(0, 0, 0, 0.08)';
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
      navbar.style.boxShadow = 'none';
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
  });
}

/* ========== GALLERY INTERACTIONS ==========*/
// Gallery interactions are handled in gallery-data.js
// This file handles general page interactions

/* ========== UTILITY FUNCTIONS ==========*/
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/* ========== PAGE LOAD ANIMATION ==========*/
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
});

/* ========== LIVE CLOCK EFFECT (Optional) ==========*/
function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString('vi-VN');
  // You can use this for a live clock element if needed
}

setInterval(updateClock, 1000);

/* ========== HERO SCROLL TO NEXT SECTION ==========*/
document.addEventListener('DOMContentLoaded', function() {
  const heroScroll = document.querySelector('.hero-scroll');
  
  if (heroScroll) {
    heroScroll.addEventListener('click', function() {
      const nextSection = document.querySelector('.services');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});

/* ========== PRELOAD IMAGES ==========*/
function preloadImages() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    const src = img.src;
    const newImg = new Image();
    newImg.src = src;
  });
}

window.addEventListener('load', preloadImages);

/* ========== COUNTER ANIMATION ==========*/
function animateCounter(element) {
  const target = parseInt(element.textContent);
  const duration = 2000;
  const increment = target / (duration / 16);
  let current = 0;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 16);
}

// Observe stat items when they come into view
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll('.stat-item h3');
      statNumbers.forEach(num => {
        animateCounter(num);
      });
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
  observer.observe(heroStats);
}

/* ========== LAZY LOAD IMAGES ==========*/
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img').forEach(img => imageObserver.observe(img));
}

/* ========== LOG PAGE READY ==========*/
console.log('Elegant Home Page loaded successfully ✨');
