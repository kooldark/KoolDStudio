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
      const res = await fetch('assets/js/portfolio-data.json');
      if (!res.ok) throw new Error(`Failed to load portfolio data, status: ${res.status}`);
      const portfolioData = await res.json();

      // Get one random image from each album
      const allImages = [];
      portfolioData.categories?.forEach(category => {
        category.albums?.forEach(album => {
          if (album.images?.length > 0) {
            const randomImg = album.images[Math.floor(Math.random() * album.images.length)];
            allImages.push(`assets/img/portfolio/${album.path}/${randomImg}`);
          }
        });
      });

      // Shuffle and limit based on screen size
      for (let i = allImages.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [allImages[i], allImages[j]] = [allImages[j], allImages[i]];
      }

      const maxImages = window.innerWidth < 768 ? 6 : 12;
      const galleryImages = allImages.slice(0, maxImages);

      let html = '';
      galleryImages.forEach(img => {
        html += `<div class="grid-item" data-aos="fade-up"><img src="${img}" alt="Kool D. Studio Portfolio" loading="lazy" decoding="async"></div>`;
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
