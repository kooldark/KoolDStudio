// assets/js/auto-gallery.js → TỰ ĐỘNG 100% KHÔNG CẦN LÀM GÌ HẾT!
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("auto-gallery");
  if (!container) return;

  let data = {};
  try {
    const res = await fetch("assets/img/portfolio/images-list.json?t=" + Date.now());
    data = await res.json();
  } catch (e) {
    container.innerHTML = "<p style='text-align:center;padding:100px;color:#999;'>Đang tải album...</p>";
    return;
  }

  const titles = {
    cuoi:      { vn: "Ảnh Cưới Hàn Quốc",      en: "Pre-Wedding" },
    makeup:    { vn: "Makeup & Bridal",        en: "Bridal" },
    "gia-dinh":{ vn: "Gia Đình",               en: "Family" },
    "phong-su":{ vn: "Phóng Sự Cưới",          en: "Wedding Day" }
  };

  let html = "";
  for (const [folder, imgs] of Object.entries(data)) {
    if (!imgs || imgs.length === 0) continue;
    const t = titles[folder] || { vn: folder, en: folder };

    html += `
      <section class="portfolio-section" data-aos="fade-up">
        <h2 class="section-title">${t.vn}</h2>
        <p class="section-subtitle">${t.en} Collection</p>
        <div class="swiper portfolio-swiper">
          <div class="swiper-wrapper">
            ${imgs.map(file => `
              <div class="swiper-slide">
                <img src="assets/img/portfolio/${folder}/${file}" alt="${t.vn}" loading="lazy">
              </div>
            `).join('')}
          </div>
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-pagination"></div>
        </div>
      </section>`;
  }

  container.innerHTML = html || "<p style='text-align:center;padding:120px;color:#999;'>Chưa có ảnh nào</p>";

  document.querySelectorAll(".portfolio-swiper").forEach(el => {
    new Swiper(el, {
      loop: true,
      autoplay: { delay: 3500, disableOnInteraction: false },
      speed: 900,
      spaceBetween: 30,
      grabCursor: true,
      pagination: { el: ".swiper-pagination", clickable: true },
      navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
      breakpoints: { 640:1, 768:2, 1024:3, 1280:4 }
    });
  });
});