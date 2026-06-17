/**
 * Services Page Scroll Navigation & Helper Functions
 */

// Floating Scroll Navigation Handler
function initScrollNavigation() {
  const scrollNav = document.getElementById('scroll-nav');
  if (!scrollNav) return;

  const scrollTopBtn = document.getElementById('scroll-top-btn');
  const scrollBottomBtn = document.getElementById('scroll-bottom-btn');

  function updateScrollButtons() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    const scrollBottom = docHeight - scrollTop - windowHeight;

    // Show/hide top button (appears after 300px scroll)
    if (scrollTop > 300) {
      scrollTopBtn.classList.add('active');
    } else {
      scrollTopBtn.classList.remove('active');
    }

    // Show/hide bottom button (appears when not at bottom)
    if (scrollBottom > 300) {
      scrollBottomBtn.classList.add('active');
    } else {
      scrollBottomBtn.classList.remove('active');
    }
  }

  // Scroll to top
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Scroll to bottom
  if (scrollBottomBtn) {
    scrollBottomBtn.addEventListener('click', () => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    });
  }

  // Update on scroll
  window.addEventListener('scroll', updateScrollButtons);
  window.addEventListener('load', updateScrollButtons);
  window.addEventListener('resize', updateScrollButtons);
}

// FAQ Toggle Handler
function initFAQToggle() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const answer = this.nextElementSibling;
      if (answer && answer.classList.contains('faq-answer')) {
        answer.classList.toggle('active');
      }
    });
  });
}

// Initialize all on page load
document.addEventListener('DOMContentLoaded', () => {
  initScrollNavigation();
  initFAQToggle();

  // Initialize AOS if available
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50
    });
  }
});
