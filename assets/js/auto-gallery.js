// assets/js/auto-gallery.js
document.addEventListener("DOMContentLoaded", async function () {
  const galleryContainer = document.getElementById("auto-gallery");
  if (!galleryContainer) return;

  const categories = [
    { folder: "cuoi", vietnamese: "Ảnh Cưới Hàn Quốc", english: "Pre-Wedding" },
    { folder: "makeup", vietnamese: "Makeup & Bridal", english: "Bridal" },
    { folder: "gia-dinh", vietnamese: "Gia Đình", english: "Family" },
    { folder: "phong-su", vietnamese: "Phóng Sự Cưới", english: "Wedding Day" }
  ];

  let html = "";

  for (const cat of categories) {
    const response = await fetch(`assets/img/portfolio/${cat.folder}/`);
    if (!response.ok) continue;
    
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");
    const links = Array.from(doc.querySelectorAll("a"))
      .map(a => a.getAttribute("href"))
      .filter(href => /\.(jpe?g|png|webp|gif)$/i.test(href))
      .sort();

    if (links.length === 0) continue;

    html += `
      <!-- ${cat.vietnamese} -->
      <section class="portfolio-section" data-aos="fade-up">
        <h2 class="section-title">${cat.vietnamese}</h2>
        <p class="section-subtitle">${cat.english} Collection</p>
        <div class="swiper portfolio-swiper">
          <div class="swiper-wrapper">
    `;

    links.forEach(src => {
      const fullPath = `assets/img/portfolio/${cat.folder}/${src}`;
      html += `
        <div class="swiper-slide">
          <img src="${fullPath}" alt="${cat.vietnamese} - Kool D. Studio" loading="lazy">
        </div>`;
    });

    html += `
          </div>
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-pagination"></div>
        </div>
      </section>
    `;
  }

  galleryContainer.innerHTML = html;

  // Khởi tạo tất cả Swiper sau khi HTML được chèn
  document.querySelectorAll(".portfolio-swiper").forEach(swiperEl => {
    new Swiper(swiperEl, {
      loop: true,
      speed: 800,
      spaceBetween: 20,
      grabCursor: true,
      pagination: { el: ".swiper-pagination", clickable: true },
      navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
      breakpoints: {
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1280: { slidesPerView: 4 }
      },
      autoplay: { delay: 4000, disableOnInteraction: false }
    });
  });
});