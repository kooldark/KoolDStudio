
  window.addEventListener('load', () => {
    document.getElementById('preloader').classList.add('hidden');
  });

  AOS.init({duration: 800, once: true, offset: 50});

  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
  
  // Mobile menu is initialized by load-template.js
  // No need to duplicate initialization here
