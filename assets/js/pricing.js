
  window.addEventListener('load', () => {
    document.getElementById('preloader').classList.add('hidden');
  });

  AOS.init({duration: 800, once: true, offset: 50});

  const navbar = document.getElementById('navbar');
  const navLinks = document.getElementById('nav-links');
  const mobileMenu = document.getElementById('mobile-menu');
  
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
  
  mobileMenu.onclick = (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('active');
    document.body.classList.toggle('menu-open'); // Toggle overlay
  };
  
  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      document.body.classList.remove('menu-open'); // Remove overlay
    });
  });
  
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && e.target !== mobileMenu) {
      navLinks.classList.remove('active');
      document.body.classList.remove('menu-open'); // Remove overlay
    }
  });
