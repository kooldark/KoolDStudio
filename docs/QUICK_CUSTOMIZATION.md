# 🎨 QUICK CUSTOMIZATION GUIDE - KOOL D. STUDIO

## 🚀 Bắt Đầu Nhanh

### 1. Xem Trang Chủ
```bash
# Mở file này trong browser:
index-new.html
```

### 2. Thay Hình Ảnh Hero Chính
```html
Vị trí: dòng ~165 trong index-new.html
<img src="assets/img/hero/hero-main.webp" alt="Hero">
↓
<img src="assets/img/hero/YOUR-IMAGE.webp" alt="Hero">
```

### 3. Cập Nhật Thông Tin Liên Hệ
```html
Điện thoại: +84 379 031 662 → YOUR-NUMBER
Email: contact@koolbstudio.com → YOUR-EMAIL
Địa chỉ: 485/10 Phan Văn Trị, P.5, Gò Vấp, TP.HCM → YOUR-ADDRESS
```

---

## 🎨 Thay Đổi Màu Theme

### Bước 1: Mở file
```
assets/css/home-elegant.css
```

### Bước 2: Tìm CSS Variables (dòng ~8)
```css
:root {
  --color-primary: #d4a574;      /* Màu chính (Gold/Beige) */
  --color-primary-dark: #b8956a; /* Đậm hơn */
  --color-primary-light: #ddb892;/* Sáng hơn */
}
```

### Bước 3: Thay Color Codes
**Ví dụ:** Thay đổi từ Beige sang Rose Gold
```css
--color-primary: #c9847a;        /* Rose Gold */
--color-primary-dark: #a86d65;   /* Dark Rose */
--color-primary-light: #daa29a;  /* Light Rose */
```

### Color Ideas:
| Phong Cách | Primary | Dark | Light |
|-----------|---------|------|-------|
| Beige/Gold | #d4a574 | #b8956a | #ddb892 |
| Rose Gold | #c9847a | #a86d65 | #daa29a |
| Silver | #c0c0c0 | #a9a9a9 | #d3d3d3 |
| Bronze | #cd7f32 | #8b4513 | #daa520 |
| Blush | #fdbcb4 | #ff9a97 | #ffcccb |

---

## 🖼️ Thay Đổi Portfolio Images

### Hình ảnh Portfolio 6 bức:

```html
Vị trí: dòng ~310-380 trong index-new.html

<!-- Image 1 - Wedding -->
<img src="assets/img/portfolio/cuoi/1.webp" alt="Wedding">

<!-- Image 2 - Featured Wedding -->
<img src="assets/img/portfolio/cuoi/2.webp" alt="Featured">

<!-- Image 3 - Family -->
<img src="assets/img/portfolio/gia-dinh/1.webp" alt="Family">

<!-- Image 4 - Makeup -->
<img src="assets/img/portfolio/makeup/1.webp" alt="Makeup">

<!-- Image 5 - Portrait -->
<img src="assets/img/portfolio/pro/1.webp" alt="Portrait">

<!-- Image 6 - Documentary -->
<img src="assets/img/portfolio/phong-su/1.webp" alt="Documentary">
```

**Thay thế theo format:**
```html
<img src="assets/img/portfolio/FOLDER/NUMBER.webp" alt="Category">
```

---

## 📝 Chỉnh Sửa Text Nội Dung

### Heading Chính (Hero Title)
```html
Dòng ~177
<span class="title-main">Kool D</span>
<span class="title-accent">Studio</span>
```

### Description (Hero)
```html
Dòng ~182
<p class="hero-description">
  Lưu giữ những khoảnh khắc yêu thương nhất của bạn<br>
  Với phong cách tự nhiên, tinh tế và chuyên nghiệp
</p>
```

### Services Titles & Descriptions
```html
Dòng ~210-250
<h3>Chụp Ảnh Cưới</h3>
<p>Ghi lại những khoảnh khắc thiêng liêng...</p>
```

### Testimonials
```html
Dòng ~430-480
<p class="testimonial-text">"YOUR QUOTE HERE"</p>
<div class="testimonial-author">
  <h4>Name</h4>
  <p>Title/Relationship</p>
</div>
```

---

## 🔗 Cập Nhật Links

### Navigation Links
```html
<a href="#portfolio">Tác Phẩm</a>
<a href="#services">Dịch Vụ</a>
<a href="#about">Về Chúng Tôi</a>
<a href="#contact">Liên Hệ</a>
<a href="booking.html">Đặt Lịch</a>
```

### Social Media Links
```html
Dòng ~545
<a href="https://facebook.com/yourpage">Facebook</a>
<a href="https://instagram.com/yourprofile">Instagram</a>
<a href="https://pinterest.com/yourprofile">Pinterest</a>
<a href="https://tiktok.com/@yourprofile">TikTok</a>
```

---

## 🔤 Thay Đổi Font

### Fonts hiện tại:
```css
--font-primary: 'Playfair Display', serif;    /* Heading */
--font-secondary: 'Lora', serif;              /* Body serif */
--font-tertiary: 'Montserrat', sans-serif;    /* Body */
```

### Font Alternatives cho Elegant:
| Font | Dùng Cho | Tác Động |
|------|----------|----------|
| Bodoni Moda | Heading | Ưa thích, thanh lịch |
| Cormorant | Heading | Hiện đại, sang trọng |
| Cinzel | Heading | Cổ điển, quý phái |
| Poppins | Body | Tươi mới, Modern |
| Inter | Body | Sạch sẽ, chuyên nghiệp |

**Để thay đổi:**
1. Thêm vào Google Fonts link (dòng ~20)
2. Update CSS variables
3. Reload browser

---

## 📱 Responsive Breakpoints

```css
/* Desktop: 1200px+ */
/* Tablet: 769px - 1199px */
/* Mobile: max 768px */
```

Nếu cần fine-tune responsive, sửa trong `home-elegant.css`:

```css
@media (max-width: 768px) {
  /* Tablet & Mobile styles */
}

@media (max-width: 640px) {
  /* Mobile only styles */
}
```

---

## ✨ Thêm Animations

Trang dùng AOS (Animate On Scroll). Để add animation cho element:

```html
<div data-aos="fade-up">Content</div>

<!-- Options: -->
<!-- fade-up, fade-down, fade-left, fade-right -->
<!-- zoom-in, zoom-out -->
<!-- flip-left, flip-right -->

<!-- Delays (100ms increments): -->
<div data-aos="fade-up" data-aos-delay="100">
<div data-aos="fade-up" data-aos-delay="200">
<div data-aos="fade-up" data-aos-delay="300">
```

---

## 🚀 Performance Optimization

### Optimize Images
```bash
# Dùng tools:
# - TinyPNG (compress)
# - ImageMagick (convert to WebP)
# - Squoosh (batch convert)

# Format tốc độ tải:
WebP > JPEG > PNG
```

### Check Page Speed
- Google PageSpeed Insights
- GTmetrix
- WebPageTest

### Tips tối ưu:
1. ✅ Images < 100KB mỗi file
2. ✅ Dùng WebP format nếu có thể
3. ✅ Minify CSS/JS
4. ✅ Enable gzip compression
5. ✅ Use CDN cho static files

---

## 🐛 Troubleshooting

### Problem: Images không hiển thị
**Fix:**
- Kiểm tra path ảnh
- Đảm bảo tên file đúng (case sensitive)
- Kiểm tra file tồn tại trong thư mục

### Problem: Styling bị hỏng
**Fix:**
- Clear browser cache (Ctrl+Shift+Del)
- Hard refresh (Ctrl+F5)
- Kiểm tra CSS path trong HTML

### Problem: Mobile view xì xụi
**Fix:**
- Thêm meta viewport (đã có)
- Check responsive CSS
- Test trên Chrome DevTools

### Problem: Form không gửi được
**Fix:**
- Cần setup backend handler
- Hoặc dùng service như Formspree, EmailJS
- See: assets/js/index-new.js (dòng ~100)

---

## 📋 Customization Checklist

- [ ] Thay tất cả placeholder images
- [ ] Update business info (phone, email, address)
- [ ] Update social media links
- [ ] Review & edit services descriptions
- [ ] Update testimonials mit real reviews
- [ ] Kiểm tra links (booking, portfolio, etc)
- [ ] Test trên mobile devices
- [ ] Setup form handler (backend/service)
- [ ] Optimize images cho web
- [ ] Setup SEO (Open Graph, XML sitemap)
- [ ] Test page speed
- [ ] Deploy live server

---

## 📚 File Structure

```
index-new.html .......................... Trang chủ
├── assets/css/home-elegant.css ........ Styling chính
├── assets/js/index-new.js ............. JavaScript
│
├── assets/img/
│   ├── hero/
│   │   ├── hero-main.webp ............ Hero main image
│   │   └── hero-2.webp .............. About section image
│   │
│   ├── portfolio/
│   │   ├── cuoi/ ..................... Wedding photos
│   │   ├── gia-dinh/ ................ Family photos
│   │   ├── makeup/ .................. Makeup photos
│   │   ├── pro/ ..................... Portrait photos
│   │   └── phong-su/ ................ Documentary photos
│   │
│   └── team/
│       └── team-1.webp .............. Founder photo
│
└── docs/
    └── NEW_HOMEPAGE_GUIDE.md ........ Guide đầy đủ
```

---

## 🎯 Next Steps

1. **Preview:** Mở `index-new.html` trong browser
2. **Customize:** Chỉnh sửa images, text, colors
3. **Test:** Kiểm tra mobile, browsers
4. **Deploy:** Upload lên server
5. **Monitor:** Watch analytics, feedback

---

## 💡 Pro Tips

✨ **Naming Convention:**
- Dùng dashes: `my-image.webp` (không spaces/underscores)
- Tên meaningful: `wedding-ceremony-001.webp`

🖼️ **Images:**
- Hero: ~1920x1080 (16:9)
- Portfolio grid: 1:1 square
- Team: 400x400 minimum

📱 **Mobile Testing:**
- Chrome DevTools
- Firefox DevTools
- Real devices (test on actual phones!)

🔍 **SEO Basics:**
- Title tags, meta descriptions
- Image alt text
- Internal linking
- Mobile-friendly
- Page speed

---

**Happy Customizing!** 🎉

Nếu cần help, check browser console cho errors: F12 → Console

Good luck with your beautiful new website! 📸✨
