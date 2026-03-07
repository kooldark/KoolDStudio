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
  const heroWrapper = document.getElementById('hero-swiper-wrapper');
  if (!heroWrapper) return;

  try {
    // Load hero images from config file
    fetch('config/hero-images.json')
      .then(res => {
        if (!res.ok) throw new Error(`Failed to load hero images: ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (!data.images || data.images.length === 0) {
          console.warn('No hero images found in config');
          showGalleryFallback(heroWrapper);
          return;
        }

        // Clear existing content
        heroWrapper.innerHTML = '';

        // Create swiper slides for each image
        data.images.forEach((filename, index) => {
          const slide = document.createElement('div');
          slide.className = 'swiper-slide';
          slide.innerHTML = `<img src="assets/img/hero/${filename}" alt="Kool D Studio - Ảnh chuyên nghiệp ${index + 1}" loading="lazy" decoding="async">`;
          slide.querySelector('img').onerror = function() {
            console.warn('Failed to load image:', this.src);
            this.closest('.swiper-slide').style.display = 'none';
          };
          heroWrapper.appendChild(slide);
        });

        // Initialize Swiper carousel
        initHeroSwiper();
      })
      .catch(error => {
        console.error('Error loading hero gallery:', error);
        showGalleryFallback(heroWrapper);
      });
  } catch (error) {
    console.error('Error in populateHeroGallery:', error);
    showGalleryFallback(heroWrapper);
  }
}

/* ========== INITIALIZE HERO SWIPER ==========*/
function initHeroSwiper() {
  const heroCarousel = document.querySelector('.hero-carousel');
  if (!heroCarousel || typeof Swiper === 'undefined') {
    console.warn('Hero carousel element or Swiper not found');
    return;
  }

  try {
    const heroSwiper = new Swiper(heroCarousel, {
      slidesPerView: 2,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: heroCarousel.querySelector('.swiper-pagination'),
        clickable: true,
        dynamicBullets: true,
      },
      navigation: {
        nextEl: heroCarousel.querySelector('.swiper-button-next'),
        prevEl: heroCarousel.querySelector('.swiper-button-prev'),
      },
      // Touch & Swipe settings
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: true,
      grabCursor: true,
      freeMode: false,
      speed: 400,
      effect: 'slide',
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 10,
          centeredSlides: true,
          centeredSlidesBounds: true,
        },
        480: {
          slidesPerView: 1.3,
          spaceBetween: 12,
          centeredSlides: true,
        },
        640: {
          slidesPerView: 1.5,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 15,
          centeredSlides: false,
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 20,
          centeredSlides: false,
        },
      },
    });
    console.log('✨ Hero carousel initialized successfully');
  } catch (err) {
    console.error('Error initializing hero Swiper:', err);
  }
}

/* ========== GALLERY FALLBACK ==========*/
function showGalleryFallback(container) {
  container.innerHTML = '<div style="grid-column: 1/-1; padding: 2rem; text-align: center; color: #666;">Ảnh đang tải. Vui lòng tải lại trang.</div>';
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
    heroScroll.style.cursor = 'pointer';
    heroScroll.addEventListener('click', function() {
      const nextSection = document.querySelector('#galleries');
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

/* ========== CONTACT FORM HANDLER ==========*/
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
      name: document.getElementById('name').value,
      phone: document.getElementById('phone').value,
      email: document.getElementById('email').value || 'Không cung cấp',
      category: document.getElementById('category').value,
      message: document.getElementById('message').value,
      timestamp: new Date().toLocaleString('vi-VN')
    };

    // Log form data (in production, send to backend)
    console.log('Form submitted:', formData);
    
    // Show success message
    showFormSuccess(contactForm);
    
    // Try to send via Telegram Bot or Email service if available
    sendFormData(formData);
    
    // Reset form
    contactForm.reset();
  });

  function sendFormData(data) {
    // Option 1: Send via Telegram Bot (if configured)
    const telegramBotToken = 'YOUR_BOT_TOKEN'; // Replace with actual token
    const telegramChatId = 'YOUR_CHAT_ID'; // Replace with actual chat ID
    
    const message = `
*Yêu Cầu Liên Hệ Mới từ Kool D. Studio*

👤 *Tên:* ${data.name}
📱 *Số ĐT:* ${data.phone}
📧 *Email:* ${data.email}
💼 *Dịch Vụ:* ${data.category}
💬 *Lời Nhắn:* ${data.message}
⏰ *Thời Gian:* ${data.timestamp}
    `;

    // Alternative: Store in localStorage as backup
    try {
      let contacts = JSON.parse(localStorage.getItem('koolStudioContacts') || '[]');
      contacts.push(data);
      localStorage.setItem('koolStudioContacts', JSON.stringify(contacts));
      console.log('Contact saved to localStorage');
    } catch (error) {
      console.warn('Could not save to localStorage:', error);
    }
  }

  function showFormSuccess(form) {
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.innerText;
    const originalBg = button.style.background;
    
    button.innerText = '✓ Cảm ơn bạn! Chúng tôi sẽ liên hệ ngay';
    button.style.background = '#2d5a4a';
    button.disabled = true;
    
    setTimeout(() => {
      button.innerText = originalText;
      button.style.background = originalBg;
      button.disabled = false;
    }, 4000);
  }
});
