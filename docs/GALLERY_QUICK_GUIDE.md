# 🎬 Gallery Manager - Commands & Usage

## 📋 Available Commands

### Setup (Lần đầu)
```bash
npm run gallery:setup
```
Tạo cấu trúc thư mục và template files

---

### Generate (Chạy một lần)
```bash
npm run gallery:generate
```
Quét tất cả thư mục hình ảnh và tạo JSON files:
- `config/portfolio-data.json`
- `config/moodboard-data.json`
- `config/hero-images.json`

**Khi nào dùng:**
- Sau khi thêm/xóa/sửa ảnh
- Sau khi tạo thư mục mới
- Khi muốn update một lần

---

### Watch Mode (Tự động)
```bash
npm run gallery:watch
```
Theo dõi thay đổi thư mục **tự động** và generate JSON

**Output:**
```
👁️  Starting Watch Mode
Watching for changes in gallery folders...
✅ Watch mode active. Press Ctrl+C to stop.

[Mỗi khi có thay đổi]
📄 Added: 1.webp
📝 Changes detected - regenerating...
✅ Generated: config/portfolio-data.json
```

**Khi nào dùng:**
- Khi đang làm việc với hình ảnh
- Để tự động cập nhật website
- Bạn muốn "set and forget" mode

---

## 🎯 Workflow

### Scenario 1: Thêm Album Mới

```bash
# 1. Tạo thư mục bằng Explorer
# assets/img/portfolio/cuoi/nam-linh-2025/

# 2. Copy ảnh vào (0.webp, 1.webp, 2.webp...)

# 3. Run generate
npm run gallery:generate

# 4. Done! Website tự động cập nhật
```

### Scenario 2: Sửa ảnh (Watch Mode)

```bash
# 1. Start watch mode
npm run gallery:watch

# 2. Thêm/xóa/sửa đổi ảnh bằng Explorer
#    (copy ảnh, xóa ảnh, đổi tên...)

# 3. JSON tự động cập nhật
#    (thấy messages trong terminal)

# 4. Nhấn Ctrl+C để dừng
```

### Scenario 3: Bulk Changes

```bash
# 1. Tắt watch mode (nếu chạy)
# 2. Thêm/xóa/sửa nhiều ảnh
# 3. Run generate một lần
npm run gallery:generate

# 4. Tất cả cập nhật cùng lúc
```

---

## 📁 Folder Structure Quick Reference

```
assets/img/
├── portfolio/
│   ├── cuoi/                    (Category 1)
│   │   ├── category-info.json   (tuỳ chọn - custom title)
│   │   ├── album-1/
│   │   │   ├── 0.webp          (cover image)
│   │   │   ├── 1.webp
│   │   │   └── info.json        (tuỳ chọn)
│   │   └── album-2/
│   ├── gia-dinh/                (Category 2)
│   ├── makeup/
│   └── phong-su/
├── moodboard/
│   ├── 1.Sweet & Romantic/
│   ├── 2.Fun & Playful/
│   └── ...
└── hero/
    ├── hero-1.webp
    └── hero-2.webp
```

---

## 🆘 Quick Troubleshooting

### ❌ JSON không update

**Solution:**
```bash
npm run gallery:generate
```

### ❌ Watch mode không chạy

**Solution:**
```bash
npm install
npm run gallery:watch
```

### ❌ "Cannot find module 'chokidar'"

**Solution:**
```bash
npm install
```

---

## 💡 Pro Tips

### 1️⃣ Cover Image Selection
Generator tự chọn cover theo thứ tự:
- File tên `0.webp` hoặc `cover.webp` (best)
- File đầu tiên (alphabetically)

**Tip:** Đặt ảnh đẹp nhất làm `0.webp`

### 2️⃣ Naming Conventions
✅ Đúng:
- `0.webp`, `1.webp`, `10.webp` (số thứ tự)
- `nam-linh-2025` (folder)
- `bridal-portrait` (category)

❌ Sai:
- `photo.webp`, `image copy.webp`
- `Nam Linh 2025` (space trong tên)
- `IMG_001.JPG` (uppercase extension)

### 3️⃣ Auto Sort
Ảnh tự động sắp xếp:
- Số: 1, 2, 3, 10, 20 (không 1, 10, 2)
- Chữ: alphabetically

Không cần chỉnh sửa file, nó tự làm!

---

## 📊 Output Examples

### portfolio-data.json
```json
{
  "categories": [
    {
      "id": "cuoi",
      "title": "Chuyện Của Hai Ta",
      "description": "...",
      "albums": [
        {
          "id": "nam-linh-2025",
          "title": "Nam & Linh",
          "path": "cuoi/nam-linh-2025",
          "coverImage": "0.webp",
          "images": ["0.webp", "1.webp", "2.webp"],
          "imageCount": 3
        }
      ],
      "albumCount": 1
    }
  ]
}
```

---

## 🔑 Key Features

✅ **Tự động** - Không cần chỉnh sửa JSON  
✅ **Linh hoạt** - Thêm/xóa ảnh bằng Explorer  
✅ **Thông minh** - Tự tìm cover image, tự sắp xếp  
✅ **Real-time** - Watch mode cập nhật ngay lập tức  
✅ **Metadata** - Support custom títles, descriptions  

---

## 📖 Full Guide

Chi tiết đầy đủ: [GALLERY_MANAGER.md](GALLERY_MANAGER.md)

---

**Version:** 1.0.0  
**Last Updated:** 2025-03-02
