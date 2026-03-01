# Hướng dẫn Sử dụng Header & Footer Template

## Giới Thiệu
Tất cả các trang HTML đã được cập nhật để sử dụng **template header và footer chung**, thay vì nhân bản code trên từng trang. Điều này giúp dễ bảo trì và cập nhật nhất quán.

## Cấu Trúc
### File Template
- **`assets/html/header.html`** - Chứa navbar, preloader, và floating contact ribbon
- **`assets/html/footer.html`** - Chứa footer và admin tools
- **`assets/js/load-template.js`** - Script JavaScript tự động load template

### Các Trang Đã Cập Nhật
✅ index.html
✅ portfolio.html
✅ pricing.html
✅ about.html
✅ bgcuoi-studio.html (Báo giá studio cưới)
✅ bggiadinh.html (Báo giá gia đình)
✅ moodboard.html
✅ watermark.html
✅ hopdong.html (Hợp đồng)
✅ booking.html (Đặt lịch)
✅ inan.html (Bảng giá in ảnh)
✅ 404.html

## Cách Sử Dụng Trên Các Trang Mới
Khi tạo trang HTML mới, chỉ cần thêm:

### 1. Trong `<body>`, ngay sau `<body>` tag:
```html
<!-- Header Template Container -->
<div id="header-container"></div>
```

### 2. Trước `</body>`:
```html
<!-- Footer Template Container -->
<div id="footer-container"></div>

<!-- Load script tự động load template -->
<script src="assets/js/load-template.js"></script>
```

### 3. Đảm bảo các script được include sau load-template.js
```html
<script src="assets/js/load-template.js"></script>
<script src="assets/js/main.js"></script>
<script src="assets/js/...trang-cu-the.js"></script>
```

## Cách Hoạt Động
1. Khi trang load, `load-template.js` sẽ tự động chạy
2. Nó fetch nội dung từ `assets/html/header.html` và `assets/html/footer.html`
3. Inject nội dung vào container (thay bằng JavaScript, không cần rebuild)
4. Mobile menu toggle tự động được khởi tạo

## Lợi Ích
✅ **DRY Principle** - Không lặp lại code
✅ **Dễ bảo trì** - Cập nhật header/footer ở một chỗ, tất cả trang cập nhật
✅ **Thống nhất** - Tất cả trang có navbar và footer giống nhau
✅ **Không cần build** - Hoạt động với static files

## Chỉnh Sửa Header/Footer
### Chỉnh sửa navbar:
→ Edit `assets/html/header.html` (dòng 1-8)

### Chỉnh sửa contact ribbon:
→ Edit `assets/html/header.html` (dòng 11-32)

### Chỉnh sửa footer:
→ Edit `assets/html/footer.html` (dòng 1-18)

### Chỉnh sửa admin tools:
→ Edit `assets/html/footer.html` (dòng 20-27)

## Ghi Chú
- Template được load **sau** khi DOM ready, nên không ảnh hưởng tới SEO (mọi thứ vẫn trong HTML)
- Mobile menu toggle được tự động init bởi script
- AOS (animate on scroll) vẫn hoạt động bình thường
- Nếu cần custom header/footer riêng trang, có thể không include script load-template.js
