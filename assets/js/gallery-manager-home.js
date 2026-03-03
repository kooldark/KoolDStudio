/**
 * Gallery Manager for Homepage
 * Features: Limit display + Lazy loading + "See All" buttons
 */

// Configuration
const GALLERY_CONFIG = {
  maxAlbumsPerCategory: 3,  // Show only 3 albums per category on homepage
  maxImagesPerAlbum: 3      // Show only 3 images per album
};

/**
 * Create loading skeleton
 */
function createLoadingSkeleton() {
  const div = document.createElement('div');
  div.className = 'gallery-item loading-skeleton';
  div.innerHTML = `
    <div class="gallery-image-wrapper">
      <div class="skeleton-image"></div>
    </div>
  `;
  return div;
}

/**
 * Show loading skeleton for gallery section
 */
function showLoadingState(container) {
  container.innerHTML = '';
  
  // Show 3 skeleton loaders
  for (let i = 0; i < 3; i++) {
    container.appendChild(createLoadingSkeleton());
  }
}

/**
 * Load and display portfolio galleries with limits
 */
async function loadPortfolioGalleries() {
  try {
    // Load portfolio data
    const response = await fetch('config/portfolio-data.json');
    if (!response.ok) throw new Error('Failed to load portfolio data');
    
    const portfolioData = await response.json();
    
    // Display gallery for each category
    portfolioData.categories.forEach(category => {
      displayCategoryGallery(category);
    });
    
  } catch (error) {
    console.error('Error loading portfolio galleries:', error);
  }
}

/**
 * Display category gallery section
 */
function displayCategoryGallery(category) {
  // Map category ID to section
  const sectionMap = {
    'cuoi': '.wedding-gallery .category-grid',
    'gia-dinh': '.family-gallery .category-grid',
    'makeup': '.makeup-gallery .category-grid',
    'phong-su': '.documentary-gallery .category-grid',
    'portrait': '.portrait-gallery .category-grid'
  };
  
  const selector = sectionMap[category.id];
  if (!selector) return;
  
  const container = document.querySelector(selector);
  if (!container) return;
  
  // Show loading state first
  showLoadingState(container);
  
  // Limit albums to display
  const albumsToShow = category.albums.slice(0, GALLERY_CONFIG.maxAlbumsPerCategory);
  
  // Clear and display albums after short delay (for loading effect)
  setTimeout(() => {
    container.innerHTML = '';
    
    // Display albums
    albumsToShow.forEach(album => {
      const albumElement = createAlbumElement(album, category.id);
      container.appendChild(albumElement);
    });
    
    // Add "See All" button if there are more albums
    if (category.albums.length > GALLERY_CONFIG.maxAlbumsPerCategory) {
      const seeAllButton = createSeeAllButton(category.id, category.albums.length);
      container.parentElement.appendChild(seeAllButton);
    }
    
    // Trigger lazy loading for new images
    initLazyLoading();
  }, 300);
}

/**
 * Create album card element
 */
function createAlbumElement(album, categoryId) {
  const div = document.createElement('div');
  div.className = 'gallery-item album-card';
  div.innerHTML = `
    <div class="gallery-image-wrapper">
      <img 
        data-src="${`assets/img/portfolio/${album.path}/${album.coverImage}`}" 
        alt="${album.title}"
        class="gallery-image"
        loading="lazy"
      >
      <div class="gallery-overlay">
        <div class="overlay-content">
          <h3>${album.title}</h3>
          <p>${album.imageCount} Ảnh</p>
        </div>
      </div>
    </div>
  `;
  
  // Add click handler to open portfolio
  div.addEventListener('click', () => {
    // Navigate to portfolio with category parameter
    window.location.href = `portfolio.html?category=${categoryId}`;
  });
  
  return div;
}

/**
 * Create "See All" button
 */
function createSeeAllButton(categoryId, totalAlbums) {
  const div = document.createElement('div');
  div.className = 'see-all-container';
  div.innerHTML = `
    <a href="portfolio.html?category=${categoryId}" class="btn btn-secondary see-all-btn">
      Xem Tất Cả ${totalAlbums} Album
      <i class="fas fa-arrow-right"></i>
    </a>
  `;
  return div;
}

/**
 * Load and display moodboard galleries
 */
async function loadMoodboardGalleries() {
  try {
    const response = await fetch('config/moodboard-data.json');
    if (!response.ok) throw new Error('Failed to load moodboard data');
    
    const moodboardData = await response.json();
    
    // For now, moodboard can show all categories but limit images
    // You could move this to its own section if needed
    console.log('Moodboard data loaded:', moodboardData);
    
  } catch (error) {
    console.error('Error loading moodboard galleries:', error);
  }
}

/**
 * Initialize lazy loading for images
 */
function initLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.dataset.src || img.src;
          
          // Create new image to test loading
          const tempImg = new Image();
          tempImg.onload = () => {
            img.src = src;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          };
          tempImg.onerror = () => {
            // Hide broken images instead of showing fallback
            img.style.display = 'none';
            imageObserver.unobserve(img);
          };
          tempImg.src = src;
        }
      });
    }, {
      rootMargin: '50px'  // Start loading 50px before image enters viewport
    });
    
    // Observe all images with data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for older browsers
    document.querySelectorAll('img[data-src]').forEach(img => {
      img.src = img.dataset.src;
    });
  }
}

/**
 * Load featured gallery
 */
async function loadFeaturedGallery() {
  try {
    const response = await fetch('config/portfolio-data.json');
    if (!response.ok) throw new Error('Failed to load featured gallery');
    
    const portfolioData = await response.json();
    const container = document.querySelector('.gallery-masonry');
    
    if (!container) return;
    
    // Get first 6 images from first 3 categories
    const featuredImages = [];
    
    portfolioData.categories.slice(0, 3).forEach(category => {
      category.albums.slice(0, 2).forEach(album => {
        if (album.coverImage) {
          featuredImages.push({
            src: `assets/img/portfolio/${album.path}/${album.coverImage}`,
            title: album.title,
            alt: album.title
          });
        }
      });
    });
    
    // Display featured images
    container.innerHTML = '';
    featuredImages.slice(0, 6).forEach(image => {
      const div = document.createElement('div');
      div.className = 'gallery-item featured-item';
      div.innerHTML = `
        <div class="gallery-image-wrapper">
          <img 
            data-src="${image.src}" 
            alt="${image.alt}"
            class="gallery-image"
            loading="lazy"
          >
          <div class="gallery-overlay">
            <a href="portfolio.html" class="overlay-icon">
              <i class="fas fa-expand"></i>
            </a>
          </div>
        </div>
      `;
      container.appendChild(div);
    });
    
    // Initialize lazy loading for new images
    initLazyLoading();
    
  } catch (error) {
    console.error('Error loading featured gallery:', error);
  }
}

/**
 * Initialize all galleries on page load
 */
document.addEventListener('DOMContentLoaded', function() {
  loadPortfolioGalleries();
  loadMoodboardGalleries();
  loadFeaturedGallery();
  initLazyLoading();
});

console.log('Gallery Manager loaded ✨');
