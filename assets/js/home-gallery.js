/**
 * Helper function to get a random item from an array
 */
function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

document.addEventListener('DOMContentLoaded', async () => {
  const masonryGallery = document.getElementById('home-masonry-gallery');

  if (!masonryGallery) return;

  let data = {};
  try {
    const res = await fetch('assets/img/portfolio/images-list.json?t=' + Date.now());
    data = await res.json();
  } catch (e) {
    console.error("Could not load gallery data.", e);
    return;
  }

  // --- Get one random representative image from each category/album ---
  const galleryImages = [];

  Object.entries(data).forEach(([category, content]) => {
    if (Array.isArray(content)) {
      // Simple category: just one random image from the array
      if (content.length > 0) {
        const randomFile = getRandomItem(content);
        galleryImages.push(`assets/img/portfolio/${category}/${randomFile}`);
      }
    } else if (typeof content === 'object' && content !== null) {
      // Nested category: get one random image from each album
      Object.entries(content).forEach(([album, files]) => {
        if (Array.isArray(files) && files.length > 0) {
          const randomFile = getRandomItem(files);
          const isLoose = album === 'Ảnh lẻ';
          const imageFolder = isLoose ? '' : `${album}/`;
          galleryImages.push(`assets/img/portfolio/${category}/${imageFolder}${randomFile}`);
        }
      });
    }
  });

  // --- Populate Masonry Gallery ---
  let masonryHtml = '';
  galleryImages.forEach(imgPath => {
    masonryHtml += `
      <div class="masonry-item">
        <img src="${imgPath}" alt="Kool D. Studio Work" loading="lazy">
      </div>
    `;
  });
  masonryGallery.innerHTML = masonryHtml;
});
