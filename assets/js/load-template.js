/**
 * Template Loader - Load reusable header and footer
 * Hàm này tự động load header và footer từ các file template
 */

(function() {
  'use strict';

  // Load Header
  async function loadHeader() {
    try {
      const headerPath = document.currentScript?.dataset.headerPath || 'assets/html/header.html';
      const response = await fetch(headerPath);
      
      if (!response.ok) throw new Error('Failed to load header');
      
      const html = await response.text();
      const headerContainer = document.getElementById('header-container');
      
      if (headerContainer) {
        headerContainer.innerHTML = html;
        // Initialize mobile menu after header is loaded
        setTimeout(() => {
          initializeMobileMenu();
        }, 0);
      }
    } catch (error) {
      console.error('Header not loaded:', error);
    }
  }

  // Load Footer
  async function loadFooter() {
    try {
      const footerPath = document.currentScript?.dataset.footerPath || 'assets/html/footer.html';
      const response = await fetch(footerPath);
      
      if (!response.ok) throw new Error('Failed to load footer');
      
      const html = await response.text();
      const footerContainer = document.getElementById('footer-container');
      
      if (footerContainer) {
        footerContainer.innerHTML = html;
      }
    } catch (error) {
      console.warn('Footer not loaded:', error);
    }
  }

  function initializeMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!navToggle || !navMenu) {
      // console.warn('Mobile menu elements not found');
      return;
    }
    
    // Toggle menu on hamburger click
    navToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      navMenu.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
    
    // Close menu when a link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (e) => {
        e.stopPropagation();
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });

    // Close menu when clicking outside (on overlay)
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') && 
          !navMenu.contains(e.target) && 
          !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });

    // Prevent scroll on body when mobile menu is open
    const observer = new MutationObserver(() => {
      if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });

    observer.observe(navMenu, { attributes: true, attributeFilter: ['class'] });
  }

  // Load both on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      loadHeader();
      loadFooter();
    });
  } else {
    loadHeader();
    loadFooter();
  }
})();
