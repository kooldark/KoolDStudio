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
        // Initialize mobile menu if needed
        initializeMobileMenu();
      }
    } catch (error) {
      console.warn('Header not loaded:', error);
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

  // Initialize mobile menu toggle
  function initializeMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    
    if (mobileMenu && navLinks) {
      mobileMenu.addEventListener('click', function() {
        navLinks.classList.toggle('active');
      });
      
      // Close menu when link is clicked
      navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          navLinks.classList.remove('active');
        });
      });
    }
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
