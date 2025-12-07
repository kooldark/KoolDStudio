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

  const allImages = Object.entries(data).flatMap(([category, content]) => {
    if (Array.isArray(content)) {
      // Handle simple categories (e.g., 'makeup') which have an array of files.
      return content.map(file => `assets/img/portfolio/${category}/${file}`);
    } else if (typeof content === 'object' && content !== null) {
      // Handle nested categories (e.g., 'cuoi') which have an object of albums.
      return Object.entries(content).flatMap(([album, files]) =>
        files.map(file => `assets/img/portfolio/${category}/${album}/${file}`)
      );
    }
    return []; // Return an empty array for any unexpected data format.
  });

  // --- Populate Masonry Gallery ---
  // Get up to 8 random images for the gallery
  const galleryImages = [...allImages].sort(() => 0.5 - Math.random()).slice(0, 8);

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
