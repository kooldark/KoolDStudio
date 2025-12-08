window.addEventListener('load', () => {
  // Preloader
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('hidden');
  }

  // AOS Init with better easing
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 900,
      easing: 'ease-in-out-cubic',
      once: false,
      mirror: true,
      offset: 100,
      disable: false
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

document.addEventListener('DOMContentLoaded', () => {
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

  // Mobile menu with smooth animations
  const navLinks = document.getElementById('nav-links');
  const mobileMenu = document.getElementById('mobile-menu');
  if (navLinks && mobileMenu) {
    mobileMenu.onclick = (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('active');
    };

    // Close menu when link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('active') && 
          !navLinks.contains(e.target) && 
          e.target !== mobileMenu) {
        navLinks.classList.remove('active');
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

  // Prevent scroll on body when mobile menu is open
  const observer = new MutationObserver(() => {
    if (navLinks && navLinks.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  if (navLinks) {
    observer.observe(navLinks, { attributes: true, attributeFilter: ['class'] });
  }
});
