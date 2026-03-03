# 📸 Kool D. Studio - Hướng Dẫn

## 🎬 Gallery Manager - Quản Lý Ảnh Tự Động

### ⚡ Quick Start (5 phút)

```bash
# 1. Cài dependencies
npm install

# 2. Setup folder structure
npm run gallery:setup

# 3. Start watch mode (tự động update JSON)
npm run gallery:watch
```

### 📁 Thêm Hình Ảnh

```
assets/img/portfolio/
├── cuoi/
│   └── album-name/
│       ├── 0.webp          ← Cover image
│       ├── 1.webp
│       └── 2.webp
├── gia-dinh/
├── makeup/
└── phong-su/
```

**Note:** Tên ảnh từ `0.webp, 1.webp, ...` hoặc `1, 2, 10` (tự động sắp xếp)

---

## 🔧 Commands

| Lệnh | Mục Đích | Khi Dùng |
|------|----------|----------|
| `npm run gallery:setup` | Tạo folder structure | Lần đầu |
| `npm run gallery:generate` | Generate JSON một lần | Sau thêm/xóa ảnh |
| `npm run gallery:watch` | Auto update JSON | Đang làm việc |

---

## 📊 Workflow

### Thêm Album Cưới Mới
```
1. Tạo folder: assets/img/portfolio/cuoi/nam-dung-2025/
2. Copy ảnh vào (0.webp, 1.webp, 2.webp...)
3. Terminal tự động update JSON ✅
4. Website hiển thị album mới
```

### Chỉnh Sửa Ảnh Hiện Có
```
1. Start: npm run gallery:watch
2. Edit ảnh (thêm/xóa/rename)
3. JSON tự động update ✅
4. Press Ctrl+C để stop
```

---

## 💡 Naming Convention

✅ **Đúng:**
- `0.webp, 1.webp, 10.webp` (số thứ tự)
- `nam-linh-2025` (folder, dùng dash)
- `.webp, .jpg, .png` (lowercase)

❌ **Sai:**
- `photo.webp, IMG_001.JPG`
- `Nam Linh 2025` (spaces)
- Khoảng trắng, ký tự đặc biệt

---

## 📁 Folder Structure

```
assets/img/
├── portfolio/
│   ├── cuoi/              (Wedding)
│   ├── gia-dinh/          (Family)
│   ├── makeup/            (Makeup)
│   └── phong-su/          (Documentary)
├── moodboard/
│   ├── 1.Sweet & Romantic/
│   ├── 2.Fun & Playful/
│   └── ...
└── hero/
    ├── hero-1.webp
    └── hero-2.webp
```

**Generated Files (Tự động):**
- `config/portfolio-data.json`
- `config/moodboard-data.json`
- `config/hero-images.json`

---

## ⚙️ Metadata (Optional)

### Album Info
**File:** `assets/img/portfolio/{category}/{album}/info.json`
```json
{
  "title": "Nam & Linh",
  "description": "Đám cưới tại Sài Gòn",
  "date": "2025-06-15",
  "location": "Ho Chi Minh City"
}
```

### Category Info
**File:** `assets/img/portfolio/{category}/category-info.json`
```json
{
  "title": "Chuyện Của Hai Ta",
  "description": "Ảnh cưới...",
  "order": 1
}
```

---

## 🆘 Troubleshooting

### JSON không update?
```bash
npm run gallery:generate
```

### Watch mode không chạy?
```bash
npm install
npm run gallery:watch
```

### Ảnh không hiển thị?
✓ Check tên folder, file extension (lowercase)  
✓ Run `npm run gallery:generate` lại  

---

## 📚 Tài Liệu Chi Tiết

- **[GALLERY_SETUP_AND_USAGE.md](GALLERY_SETUP_AND_USAGE.md)** - Chi tiết commands, workflows, advanced
- **[VISUAL_GUIDE.md](VISUAL_GUIDE.md)** - Architecture diagrams, system flow
- **[NEW_HOMEPAGE_GUIDE.md](NEW_HOMEPAGE_GUIDE.md)** - Trang chủ mới
- **[QUICK_CUSTOMIZATION.md](QUICK_CUSTOMIZATION.md)** - Customize trang chủ

---

## 🎨 Customize Trang Chủ

### Thay Hình Ảnh Hero
```html
<img src="assets/img/hero/YOUR-IMAGE.webp" alt="Hero">
```

### Thay Đổi Màu (Beige → Rose Gold)
```css
/* assets/css/home-elegant.css */
--color-primary: #c9847a;        /* Rose Gold */
--color-primary-dark: #a86d65;
--color-primary-light: #daa29a;
```

### Update Thông Tin
- Điện thoại: +84 379 031 662
- Email: contact@koolbstudio.com
- Địa chỉ: 485/10 Phan Văn Trị, P.5, Gò Vấp, TP.HCM

Chi tiết: [QUICK_CUSTOMIZATION.md](QUICK_CUSTOMIZATION.md)

---

## 🚀 Workflow Ví Dụ

**Thêm 20 ảnh wedding mới:**
```bash
# 1. Start watch
npm run gallery:watch

# 2. Tạo folder
mkdir -p assets/img/portfolio/cuoi/nam-dung-2025

# 3. Copy 20 ảnh (đặt tên 0.webp, 1.webp, 2.webp...)

# 4. Thấy terminal output
📄 Added: multiple files
📝 Changes detected - regenerating...
✅ Generated: config/portfolio-data.json

# 5. Website tự động cập nhật ✨
```

---

## 💡 Pro Tips

1. **Cover Image:** Generator tự chọn `0.webp` hoặc file đầu tiên
   - Tip: Đặt ảnh đẹp nhất làm `0.webp`

2. **Watch Mode:** Giữ cửa sổ terminal mở, JSON update real-time
   - Không cần reload tay

3. **Bulk Changes:** Thêm nhiều ảnh → Run `npm run gallery:generate` một lần

4. **Natural Sort:** Ảnh tự sắp xếp (1, 2, 10 không phải 1, 10, 2)

---

## 📞 Support

**Không tìm thấy gì?**
- Kiểm tra browser console (F12)
- Xem troubleshooting ở trên
- Đọc tài liệu chi tiết

**Version:** 1.0.0  
**Updated:** 2026-03-03

---

**Chúc bạn thành công!** 🎉📸
