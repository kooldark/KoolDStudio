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

  // Lấy tất cả ảnh đại diện có thể có
  const allImages = getHomepageImages();

  // Xáo trộn mảng để mỗi lần tải lại trang sẽ có một bộ ảnh ngẫu nhiên khác nhau
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  shuffleArray(allImages);

  // Xác định số lượng ảnh cần hiển thị dựa trên kích thước màn hình
  const isMobile = window.innerWidth < 768;
  const maxImages = isMobile ? 6 : 12;

  // Cắt mảng để chỉ lấy số lượng ảnh mong muốn
  const galleryImages = allImages.slice(0, maxImages);

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
