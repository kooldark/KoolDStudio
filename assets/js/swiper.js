// assets/js/auto-gallery.js – Bản hoạt động 100% (không cần fetch)
document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("auto-gallery");
  if (!container) return;

  // === DANH SÁCH ẢNH – BẠN CHỈ CẦN THÊM TÊN FILE MỚI VÀO ĐÂY ===
  const albums = {
    cuoi: [
      "anhcuoi.png", "anhcuoi.webp", "codau.jpg", "phongsu.webp", 
      // ← thêm tên file mới ở đây, bao nhiêu cũng được
    ],
    makeup: [
      "makeup (1).jpg", "makeup (3).jpg",
      // thêm tiếp...
    ],
    "gia-dinh": [
      "gia dinh.jpg",
      // thêm tiếp...
    ],
    "phong-su": [
      // hiện tại bạn chưa có ảnh phóng sự → để trống cũng được
    ]
  };

  // Tên hiển thị đẹp cho từng album
  const titles = {
    cuoi:      { vn: "Ảnh Cưới Hàn Quốc",      en: "Pre-Wedding" },
    makeup:    { vn: "Makeup & Bridal",        en: "Bridal Look" },
    "gia-dinh":{ vn: "Gia Đình",               en: "Family Portrait" },
    "phong-su":{ vn: "Phóng Sự Cưới",          en: "Wedding Day" }
  };

  let html = "";

  Object.keys(albums).forEach(folder => {
    const images = albums[folder];
    if (images.length === 0) return;

    const title = titles[folder];

    html += `
      <section class="portfolio-section" data-aos="fade-up">
        <h2 class="section-title">${title.vn}</h2>
        <p class="section-subtitle">${title.en} Collection</p>

        <div class="swiper mySwiper-${folder}">
          <div class="swiper-wrapper">
            ${images.map(img => `
              <div class="swiper-slide">
                <img src="assets/img/portfolio/${folder}/${img}" 
                     alt="${title.vn}" loading="lazy">
              </div>
            `).join('')}
          </div>
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-pagination"></div>
        </div>
      </section>
    `;
  });

  container.innerHTML = html || "<p style='text-align:center;padding:120px 0;color:#999;font-size:18px;'>Đang cập nhật album mới...</p>";

  // Khởi tạo tất cả Swiper
  document.querySelectorAll(".swiper").forEach(swiperEl => {
    new Swiper(swiperEl, {
      loop: true,
      autoplay: { delay: 3500, disableOnInteraction: false },
      speed: 900,
      spaceBetween: 30,
      grabCursor: true,
      pagination: { el: ".swiper-pagination", clickable: true },
      navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
      breakpoints: {
        640:  { slidesPerView: 1 },
        768:  { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1280: { slidesPerView: 4 }
      }
    });
  });
});