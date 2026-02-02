/**
 * Auto-load gallery images from event folder
 * Dynamically populates the gallery grid with images from assets/img/event/
 */

// List of images to exclude from gallery
const EXCLUDED_IMAGES = [
  'placeholder-hero.jpg',
  'hero (4).webp'
];

// Function to get all images from event folder
async function loadEventGallery() {
  try {
    // Get list of images from the event folder
    const eventImages = [
      'download (40).webp',
      'download (43).webp',
      'download (49).webp',
      'gallery-1.jpg',
      'gallery-2.jpg',
      'gallery-3.jpg',
      'gallery-4.jpg',
      'gallery-5.jpg',
      'gallery-6.jpg'
    ].filter(img => !EXCLUDED_IMAGES.includes(img));

    const galleryGrid = document.getElementById('gallery-grid');
    const galleryImageArray = [];

    // Clear existing gallery items
    galleryGrid.innerHTML = '';

    // Create gallery items dynamically
    eventImages.forEach((image, index) => {
      const imagePath = `assets/img/event/${image}`;
      galleryImageArray.push(imagePath);

      const galleryItem = document.createElement('div');
      galleryItem.className = 'gallery-item';
      galleryItem.setAttribute('data-aos', 'fade-up');
      galleryItem.setAttribute('data-aos-delay', (index * 100).toString());
      galleryItem.setAttribute('role', 'button');
      galleryItem.setAttribute('tabindex', '0');
      galleryItem.onclick = () => openLightbox(index);
      galleryItem.onkeypress = (e) => {
        if (e.key === 'Enter') openLightbox(index);
      };

      const img = document.createElement('img');
      img.src = imagePath;
      img.alt = `Khoảnh khắc gia đình ${index + 1}`;
      img.loading = 'lazy';
      img.addEventListener('load', function() {
        this.classList.add('loaded');
      });
      
      // For cached images
      if (img.complete) {
        img.classList.add('loaded');
      }

      galleryItem.appendChild(img);
      galleryGrid.appendChild(galleryItem);
    });

    // Update the global galleryImages array used by lightbox
    window.galleryImages = galleryImageArray;

    // Trigger AOS re-initialization for new elements
    if (typeof AOS !== 'undefined') {
      AOS.refresh();
    }

    console.log(`Loaded ${eventImages.length} images for event gallery`);
  } catch (error) {
    console.error('Error loading event gallery:', error);
  }
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadEventGallery);
} else {
  loadEventGallery();
}
