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

  const allImages = Object.entries(data).flatMap(([folder, files]) => 
    files.map(file => `assets/img/portfolio/${folder}/${file}`)
  );

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
