/**
 * Helper function to get a random item from an array
 */
function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

document.addEventListener('DOMContentLoaded', async () => {
  const galleryContainer = document.getElementById('home-gallery-container');

  if (!galleryContainer) return;

  let galleryData = {};
  try {
    const res = await fetch('assets/img/portfolio/images-list.json?t=' + Date.now());
    if (!res.ok) throw new Error(`Network response was not ok, status: ${res.status}`);
    galleryData = await res.json();
  } catch (e) {
    console.error("Could not load gallery data.", e);
    galleryContainer.innerHTML = "<p class='error-message'>Không thể tải thư viện ảnh.</p>";
    return;
  }

  /**
   * Get one random representative image from each category/album
   */
  function getHomepageImages() {
    const images = [];
    for (const category in galleryData) {
      const content = galleryData[category];
      if (Array.isArray(content)) {
        // Simple category: get one random image
        if (content.length > 0) {
          const randomFile = getRandomItem(content);
          images.push(`assets/img/portfolio/${category}/${randomFile}`);
        }
      } else if (typeof content === 'object' && content !== null) {
        // Nested category: get one random image from each album
        for (const album in content) {
          const albumFiles = content[album];
          if (Array.isArray(albumFiles) && albumFiles.length > 0) {
            const isLoose = album === 'Ảnh lẻ';
            const imageFolder = isLoose ? '' : `${album}/`;
            const randomFile = getRandomItem(albumFiles);
            images.push(`assets/img/portfolio/${category}/${imageFolder}${randomFile}`);
          }
        }
      }
    }
    return images;
  }

  const galleryImages = getHomepageImages();
  let galleryHtml = '';
  galleryImages.forEach(imgPath => {
    galleryHtml += `
      <div class="grid-item" data-aos="fade-up">
        <img src="${imgPath}" alt="Kool D. Studio Work" loading="lazy" decoding="async">
      </div>
    `;
  });
  galleryContainer.innerHTML = galleryHtml;
});
