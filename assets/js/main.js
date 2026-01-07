window.addEventListener('load', () => {
  // AOS Init with better easing
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 900,
      easing: 'ease-in-out-cubic',
      once: false,
      mirror: true,
      offset: 100,
      disable: window.innerWidth < 768 // Tắt hiệu ứng trên màn hình nhỏ hơn 768px
    });
  }

  // Add sophisticated hover effects for cards
  const cards = document.querySelectorAll('.album-card, .team-member-card, .price-card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      if (window.innerWidth > 768) {
        this.style.willChange = 'transform, box-shadow';
      }
    });

    card.addEventListener('mouseleave', function() {
      if (window.innerWidth > 768) {
        this.style.willChange = 'auto';
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', async () => {
  // Home gallery initialization
  const galleryContainer = document.getElementById('home-gallery-container');
  if (galleryContainer) {
    try {
      const res = await fetch('assets/js/home-portfolio-data.json');
      if (!res.ok) throw new Error(`Failed to load home portfolio data, status: ${res.status}`);
      let galleryImages = await res.json();

      // Shuffle images for variety on each load
      for (let i = galleryImages.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [galleryImages[i], galleryImages[j]] = [galleryImages[j], galleryImages[i]];
      }
      // Limit images based on screen size, if home-portfolio-data.json has more than maxImages
      const maxImages = window.innerWidth < 768 ? 6 : 12;
      galleryImages = galleryImages.slice(0, maxImages);

      let html = '';
      galleryImages.forEach(img => {
        html += `<div class="grid-item" data-aos="fade-up"><img src="assets/img/portfolio/${img}" alt="Kool D. Studio Portfolio" loading="lazy" decoding="async"></div>`;
      });

      galleryContainer.innerHTML = html;
      if (typeof AOS !== 'undefined') AOS.refresh();
    } catch (e) {
      console.error("Could not load portfolio data.", e);
      galleryContainer.innerHTML = "<p class='error-message'>Không thể tải thư viện ảnh.</p>";
    }
  }
  // Preloader
  const preloader = document.getElementById('preloader');
  if (preloader) {
    // Use a small timeout to allow initial rendering before fading out
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 100);
  }

  // Navigation scroll effect with RequestAnimationFrame for smooth performance
  const navbar = document.getElementById('navbar');
  if (navbar) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          navbar.classList.toggle('scrolled', window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetElement = document.querySelector(this.getAttribute('href'));
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // FAQ Interactivity
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        item.classList.toggle('active');
        
        // Close other FAQ items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });
      });
    }
  });

  // Show first 2 FAQ items by default
  if (faqItems.length > 0) {
    faqItems[0].classList.add('active');
    if (faqItems.length > 1) {
      faqItems[1].classList.add('active');
    }
  }

  // Auto-hide/show contact ribbon on scroll
  const contactRibbon = document.querySelector('.contact-ribbon');
  if (contactRibbon) {
    let lastScrollTop = 0;
    let isHidden = false;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      
      // Only auto-hide after scrolling more than 100px from top
      if (currentScroll > 100) {
        if (currentScroll > lastScrollTop) {
          // Scrolling DOWN - hide ribbon
          if (!isHidden) {
            contactRibbon.classList.add('hidden');
            isHidden = true;
          }
        } else {
          // Scrolling UP - show ribbon
          if (isHidden) {
            contactRibbon.classList.remove('hidden');
            isHidden = false;
          }
        }
      } else {
        // Near top of page - always show
        if (isHidden) {
          contactRibbon.classList.remove('hidden');
          isHidden = false;
        }
      }
      
      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }, false);
  }
});
