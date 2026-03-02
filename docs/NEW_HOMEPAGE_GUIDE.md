# 📸 TRANG CHỦ MỚI - KOOL D. STUDIO

## Giới Thiệu

Trang chủ mới được thiết kế hoàn toàn từ đầu với **focus chính là HỈA ẢNH PORTFOLIO** - phong cách Art & Elegant, tinh tế, chuyên nghiệp dành cho studio chụp ảnh cưới, gia đình và trang điểm.

### Đặc Điểm Nổi Bật

✨ **Thiết Kế Hướng Ảnh (Image-Centric)**
- Featured Gallery có layout Masonry tuyệt đẹp
- 5 Category Galleries tách biệt: Wedding, Family, Makeup, Portrait, Documentary
- Mỗi ảnh là spotlight, tối giản text, tối đa visual impact
- Navigation tập trung vào hình ảnh thay vì services

🎨 **Tối Ưu Hóa Cho Art Direction**
- Masonry grid layout cho featured showcase
- Uniform card grid (4 items/row) cho category galleries
- Beautiful hover effects với zoom & gradient overlays
- Color palette tự nhiên không làm lấn áp hình ảnh

📱 **Fully Responsive**
- Masonry adapts to 6-column, 3-column, 2-column, 1-column layouts
- Card grids responsive: 4-3-2-1 columns based on screen size
- Optimized touch interactions cho mobile

🚀 **Performance Tốt**
- Lazy loading hình ảnh
- Optimized CSS/JS
- SVG-free hover effects

---

## Cấu Trúc File

### HTML
- **`index-new.html`** - Trang chủ hoàn chỉnh với 5 gallery sections

### CSS
- **`assets/css/home-elegant.css`** - Stylesheet với gallery styles
  - Masonry grid system
  - Category gallery card layouts
  - Responsive breakpoints

### JavaScript
- **`assets/js/index-new.js`** - Gallery interactions

---

## Các Phần Chính (Sections)

### 1. **Navigation Bar**
```
- Logo: Kool D.
- Menu items: Tác Phẩm, Ảnh Theo Chuyên Mục, Về Chúng Tôi, Liên Hệ
- CTA Button: Đặt Lịch
```

### 2. **Hero Section**
```
Giữ nguyên như bản cũ - Hero image + text + stats
```

### 3. **Featured Gallery** (NEW - Masonry Layout)
```
✨ Trọng tâm mới của trang
- Layout masonry 6 columns (desktop)
- Mixed sizes: 
  • 4 normal items (4/12 grid width)
  • 2 tall items (4/12 width, 2 rows height)
  • 1 wide item (6/12 width)
- Hover: scale, gradient overlay
- Responsive: 3-2-1 columns on tablet/mobile
```

### 4. **Wedding Gallery** (NEW)
```
Category-specific gallery
- 4 ảnh cưới mỗi dòng
- Square aspect ratio
- Light gray background
- Hover effects
```

### 5. **Family Gallery** (NEW)
```
Same layout as Wedding
- White background
```

### 6. **Makeup & Beauty Gallery** (NEW)
```
Same layout
- Light gray background
```

### 7. **Portrait Gallery** (NEW)
```
Same layout
- White background
```

### 8. **Documentary Gallery** (NEW)
```
Same layout
- Gradient background
```

### 9. **Portfolio CTA Section** (NEW)
```
Transition section
- Gradient background
- "Khám Phá Toàn Bộ Tác Phẩm" button
```

### 10. **Why Us Section** (từ trang cũ)

### 11. **Testimonials Section** (từ trang cũ)

### 12. **Process Section** (từ trang cũ)

### 13. **About Section** (từ trang cũ)

### 14. **CTA Section** (từ trang cũ)

### 15. **Contact Section** (từ trang cũ)

### 16. **Footer** (từ trang cũ)

---

## Màu Sắc (Color Palette)

```css
Primary Color: #d4a574 (Warm Gold/Beige)
Primary Dark: #b8956a (Deep Gold)
Primary Light: #ddb892 (Light Beige)
Accent Light: #e8d4c4 (Very Light Beige)

White: #ffffff
Light Cream: #faf7f2
Light Gray: #f5f3f0
Gray: #8b8680
Dark Gray: #4a4a48
Dark: #2a2a28
```

---

## Typography

```css
Heading Font: Playfair Display (serif)
Secondary Font: Lora (serif)
Body Font: Montserrat (sans-serif)
```

---

## Layout Specifics

### Masonry Grid (Featured Gallery)
```
Desktop (1200px+):
[4col] [4col] [4col tall]
[4col] [4col] [6col wide]

Tablet (768px-1024px):
[6col] [6col]
[6col] [6col]
[6col] [6col]

Mobile (< 768px):
[12col] aspect 4/3
[12col] aspect 4/3
...
```

### Category Gallery Grid
```
Desktop: repeat(auto-fill, minmax(280px, 1fr))
         → ~4 items per row

Tablet:
- 1024px+: 3 columns
- 768px: 2 columns

Mobile: 1 column
```

---

## Hướng Dẫn Chỉnh Sửa

### Thay Đổi Hình Ảnh Featured Gallery

6 hình hiện tại:
```html
<!-- 1. Tall item (Wedding) -->
<img src="assets/img/portfolio/cuoi/1.webp">

<!-- 2. Normal item (Family) -->
<img src="assets/img/portfolio/gia-dinh/1.webp">

<!-- 3. Normal item (Makeup) -->
<img src="assets/img/portfolio/makeup/1.webp">

<!-- 4. Tall item (Portrait) -->
<img src="assets/img/portfolio/pro/1.webp">

<!-- 5. Normal item (Wedding detail) -->
<img src="assets/img/portfolio/cuoi/2.webp">

<!-- 6. Wide item (Documentary) -->
<img src="assets/img/portfolio/phong-su/1.webp">
```

### Thêm Hình Ảnh Cho Category Gallery

Mỗi category có 4 hình. Để thêm/thay:

```html
<div class="gallery-card">
  <img src="assets/img/portfolio/cuoi/3.webp" alt="Wedding">
  <div class="card-overlay"></div>
</div>
```

### Thay Đổi Featured Gallery Layout

Để đổi size của items:
- `.gallery-item` → span 4 (normal)
- `.gallery-item.tall` → span 4, grid-row: span 2 (tall)
- `.gallery-item.wide` → span 6 (wide)

Sửa trong HTML class attributes.

---

## Navigation Links

Trang sử dụng hash navigation:
- `#portfolio` → Featured Gallery section
- `#galleries` → Wedding Gallery (đầu tiên)
- `#about` → About section
- `#contact` → Contact section
- `booking.html` → Booking page

---

## Mobile Optimization

Responsive breakpoints:
- **1024px**: Desktop 3-column category grids
- **768px**: Tablet 2-column category grids
- **640px**: Mobile 1-column everything

Masonry grid adapts:
- Desktop: 6 columns → 3 columns → 2 columns → 1 column

---

## Performance Tips

1. **Image Optimization**
   - Use WebP format (.webp)
   - Compression: ~100-50KB per image (depending on size)
   - Responsive images: different sizes for different devices

2. **Lazy Loading**
   - Already implemented in JavaScript
   - Images load as they come into view

3. **Gallery Performance**
   - Hover effects use CSS only (no JS)
   - Smooth animations
   - GPU accelerated transforms

---

## Customization Checklist

- [ ] Replace all 6 featured gallery images
- [ ] Add 4 images for each 5 category galleries
  - [ ] 4 Wedding images
  - [ ] 4 Family images
  - [ ] 4 Makeup images
  - [ ] 4 Portrait images
  - [ ] 4 Documentary images
- [ ] Update contact info
- [ ] Test responsive layouts (768px, 1024px, full-width)
- [ ] Optimize all images
- [ ] Test gallery hover effects
- [ ] Update social media links

---

## Image Path Reference

```
assets/img/portfolio/
├── cuoi/ (Wedding)
├── gia-dinh/ (Family)
├── makeup/ (Makeup)
├── pro/ (Portrait)
└── phong-su/ (Documentary/Story)
```

---

## Support

Nếu cần hỗ trợ:
- Check browser console (F12)
- Verify image paths exist
- Test on multiple devices
- Check CSS file is linked properly

---

**Chúc bạn thành công với trang chủ hướng ảnh mới!** 📸✨

Trang này được thiết kế để tôn lên tác phẩm ảnh của bạn - hình ảnh là ngôi sao chính! 🌟
