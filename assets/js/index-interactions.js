/**
 * Kool D. Studio - Index Page Interactions
 * Header scroll effect, filter functionality, animations
 */

// ============================================
// HEADER SCROLL EFFECT
// ============================================
(function() {
  const header = document.getElementById('main-header');
  const scrollThreshold = 50;
  let lastScrollTop = 0;

  window.addEventListener('scroll', function() {
    const currentScroll = window.scrollY;
    
    // Add 'scrolled' class when past threshold
    if (currentScroll > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Hide/show header on scroll (optional - comment out if not wanted)
    // if (currentScroll > lastScrollTop && currentScroll > 200) {
    //   header.classList.add('hidden');
    // } else {
    //   header.classList.remove('hidden');
    // }
    lastScrollTop = currentScroll;
  }, { passive: true });
})();

// ============================================
// GALLERY FILTER FUNCTIONALITY
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length === 0 || galleryItems.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      // Filter gallery items with smooth animation
      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        const shouldShow = (filterValue === '*' || filterValue === 'all' || itemCategory === filterValue);
        
        if (shouldShow) {
          item.classList.remove('hidden');
          item.style.display = 'block';
          // Trigger reflow for animation
          void item.offsetWidth;
          item.classList.add('visible');
        } else {
          item.classList.remove('visible');
          item.classList.add('hidden');
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
      
      // Refresh AOS
      if (typeof AOS !== 'undefined') {
        AOS.refresh();
      }
    });
  });
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
(function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();

// ============================================
// SCROLL-TO-TOP BUTTON (optional)
// ============================================
(function() {
  const scrollTopBtn = document.getElementById('scroll-to-top');
  if (!scrollTopBtn) return;

  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ============================================
// INITIALIZE AOS (Animate On Scroll)
// ============================================
(function() {
  if (typeof AOS === 'undefined') return;
  
  AOS.init({
    duration: 800,
    easing: 'ease-in-out-cubic',
    once: false,
    mirror: true,
    offset: 100,
    disable: window.innerWidth < 768 // Disable on mobile for better performance
  });
})();
