// Scroll Navigation - Scroll to Top/Bottom Button
(function() {
  const scrollNav = document.getElementById('scroll-nav');
  
  // Exit if scroll-nav element doesn't exist
  if (!scrollNav) return;
  
  const scrollTopBtn = document.getElementById('scroll-top-btn');
  const scrollBottomBtn = document.getElementById('scroll-bottom-btn');

  // Show/hide scroll nav based on scroll position
  function updateScrollNav() {
    const scrolled = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Show nav when scrolled more than 300px
    if (scrolled > 300) {
      scrollNav.classList.add('active');
    } else {
      scrollNav.classList.remove('active');
    }

    // Hide top button if at top
    if (scrolled < 100) {
      scrollTopBtn.classList.add('hidden');
    } else {
      scrollTopBtn.classList.remove('hidden');
    }

    // Hide bottom button if at bottom
    if (scrolled + windowHeight >= documentHeight - 100) {
      scrollBottomBtn.classList.add('hidden');
    } else {
      scrollBottomBtn.classList.remove('hidden');
    }
  }

  // Scroll to top
  function scrollToTop() {
    // Use smooth scroll behavior
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Scroll to bottom
  function scrollToBottom() {
    const documentHeight = document.documentElement.scrollHeight;
    window.scrollTo({
      top: documentHeight,
      behavior: 'smooth'
    });
  }

  // Event listeners
  scrollTopBtn.addEventListener('click', scrollToTop);
  scrollBottomBtn.addEventListener('click', scrollToBottom);

  // Update on scroll
  window.addEventListener('scroll', updateScrollNav);

  // Update on load and resize
  window.addEventListener('load', updateScrollNav);
  window.addEventListener('resize', updateScrollNav);

  // Initial check
  updateScrollNav();
})();
