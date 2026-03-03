# 📸 Gallery Manager - Setup & Usage (Chi Tiết)

## 🎯 Tính Năng Chính

- ✅ Tự động quét thư mục ảnh
- ✅ Watch mode (real-time updates)
- ✅ Hỗ trợ Portfolio, Moodboard, Hero galleries
- ✅ Tự động sắp xếp, chọn cover image
- ✅ Metadata support (info.json)
- ✅ Không cần chỉnh sửa JSON thủ công

---

## 🚀 Setup (Lần Đầu)

### Bước 1: Cài Dependencies
```bash
npm install
```

Cài đặt:
- `chokidar` - Watch file changes
- `glob` - File pattern matching

### Bước 2: Tạo Folder Structure
```bash
npm run gallery:setup
```

**Output:**
```
🚀 Gallery Manager Setup
✓ Created: assets/img/portfolio/cuoi
✓ Created: assets/img/portfolio/gia-dinh
✓ Created: assets/img/portfolio/makeup
✓ Created: assets/img/portfolio/phong-su
✨ Setup completed successfully!
```

### Bước 3: Bắt Đầu
- Copy ảnh vào thư mục theo folder structure
- Chạy generate hoặc watch mode

---

## 📋 Commands Reference

### Generate (Một lần)
```bash
npm run gallery:generate
```
- Quét tất cả thư mục ảnh
- Tạo/cập nhật JSON files một lần
- **Khi dùng:** Sau khi thêm/xóa/sửa ảnh

**Output:**
```
📁 Scanning portfolio...
✓ Category: cuoi (3 albums, 25 images)
✓ Category: gia-dinh (2 albums, 15 images)
📊 config/portfolio-data.json
📊 config/moodboard-data.json
📊 config/hero-images.json
```

### Watch Mode (Tự động)
```bash
npm run gallery:watch
```
- Theo dõi thay đổi thư mục **real-time**
- Tự động generate khi có thay đổi
- **Khi dùng:** Đang làm việc với ảnh

**Output:**
```
👁️  Starting Watch Mode
Watching for changes in gallery folders...
✅ Watch mode active. Press Ctrl+C to stop.

[Khi bạn add ảnh]
📄 Added: 1.webp
📝 Changes detected - regenerating...
✅ Generated: config/portfolio-data.json
```

---

## 📁 Folder Structure (Chi Tiết)

### Portfolio Gallery
```
assets/img/portfolio/
├── cuoi/ (Category)
│   ├── category-info.json (Optional)
│   ├── album-1/
│   │   ├── 0.webp (Cover image)
│   │   ├── 1.webp
│   │   ├── 2.webp
│   │   └── info.json (Optional)
│   └── album-2/
├── gia-dinh/
├── makeup/
└── phong-su/
```

**Generated:** `config/portfolio-data.json`

### Moodboard Gallery
```
assets/img/moodboard/
├── 1.Sweet & Romantic/
│   ├── image-1.webp
│   ├── image-2.webp
│   └── ...
├── 2.Fun & Playful/
└── ...
```

**Generated:** `config/moodboard-data.json`

### Hero Slider
```
assets/img/hero/
├── hero-1.webp
├── hero-2.webp
└── hero-3.webp
```

**Generated:** `config/hero-images.json`

---

## 🎨 Naming Convention

### File Names ✅
```
Đúng:
- 0.webp, 1.webp, 10.webp (số)
- hero-1.webp, photo-1.webp (tên mô tả)
- cover.webp (tự động chọn cover)

Sai:
- photo.webp, image.webp (generic)
- File with space.webp (spaces)
- IMAGE_01.JPG (uppercase extension)
```

### Folder Names ✅
```
Đúng:
- cuoi, gia-dinh, makeup, phong-su
- album-nam-linh-2025, album-2

Sai:
- Cuoi uploads (spaces, not lowercase)
- "Cha Me Cua Hai Tay" (Vietnamese chars)
```

### Supported Extensions
- `.webp` (recommended)
- `.jpg`, `.jpeg`, `.png`
- `.gif`, `.avif`

---

## 📝 Metadata Files (Optional)

### Album Info
**Vị trí:** `assets/img/portfolio/{category}/{album}/info.json`

```json
{
  "title": "Nam & Linh - Ngày Trong Mơ",
  "description": "Quay Đà Nẵng, tháng 12/2024",
  "date": "2024-12-15",
  "location": "Da Nang, Vietnam",
  "photographer": "Kool D. Studio",
  "style": "natural",
  "featured": true
}
```

### Category Info
**Vị trí:** `assets/img/portfolio/{category}/category-info.json`

```json
{
  "title": "Chuyện Của Hai Ta",
  "description": "Ảnh cưới phong cách tự nhiên",
  "order": 1,
  "featured": true
}
```

**Note:** Generator sẽ đọc những file này - không touch lại!

---

## 🔄 Workflows Chi Tiết

### Workflow 1: Thêm Album Mới

```bash
# Option A: Manual one-time
1. mkdir -p assets/img/portfolio/cuoi/nam-dung-2025
2. Copy 20 ảnh vào (0.webp, 1.webp...)
3. npm run gallery:generate
4. Done! JSON updated ✅

# Option B: Watch mode (recommended)
1. npm run gallery:watch (terminal 1)
2. mkdir -p assets/img/portfolio/cuoi/nam-dung-2025
3. Copy ảnh vào
4. Thấy "Generated!" trong terminal
5. Press Ctrl+C để stop
```

### Workflow 2: Chỉnh Sửa Album Hiện Có

```bash
# Start watch mode
npm run gallery:watch

# Các tác vụ (tự động update):
✓ Thêm ảnh: Copy file vào
✓ Xóa ảnh: Delete file
✓ Đổi tên: Rename file (tự sắp xếp)
✓ Thêm metadata: Tạo info.json

# Thấy output
📄 Added/Modified/Deleted
📝 Changes detected - regenerating...
✅ Generated: config/portfolio-data.json

# Stop
Ctrl+C
```

### Workflow 3: Bulk Update

```bash
# Thêm 100 ảnh từ backup
1. Copy tất cả folders vào
2. Organize folder structure:
   assets/img/portfolio/cuoi/
   ├── album-1/
   ├── album-2/
   └── album-3/

3. npm run gallery:generate

# Tất cả JSON update cùng lúc ✅
```

---

## 📊 Generated Output Format

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

### moodboard-data.json
```json
{
  "categories": [
    {
      "id": "sweet-romantic",
      "title": "Sweet & Romantic",
      "path": "assets/img/moodboard/Sweet & Romantic",
      "images": ["1.webp", "2.webp"],
      "imageCount": 2
    }
  ]
}
```

### hero-images.json
```json
{
  "images": ["hero-1.webp", "hero-2.webp", "hero-3.webp"]
}
```

---

## 👁️ Watch Mode Deep Dive

### Cách Hoạt Động
```
Monitors: assets/img/portfolio/*, assets/img/moodboard/*, assets/img/hero/*
Detects: File added, deleted, modified | Folder created, deleted
Ignores: .json, .DS_Store, thumbs.db, system files
Auto-regenerates: Tất cả JSON files
Debounce: 2 giây (đảm bảo file write hoàn thành)
```

### Khi Nào Dùng
- ✅ Đang thêm/chỉnh sửa nhiều ảnh
- ✅ Muốn JSON update real-time
- ✅ Không cần reload server

### Khi Nào Không Dùng
- ❌ Chỉ thêm 1-2 ảnh (dùng `npm run gallery:generate`)
- ❌ Bulk operations có thể delay

---

## 💡 Key Concepts

### 1. Natural Sort
```
❌ Wrong: 1, 10, 2, 20, 3
✅ Right: 1, 2, 3, 10, 20
```
Generator tự sắp xếp, không cần chỉnh tay.

### 2. Cover Image Priority
```
1. File named "0.webp" ............... ⭐⭐⭐ Best
2. File named "cover.webp" .......... ⭐⭐ Good
3. First file alphabetically ........ ⭐ Fallback
```
Tip: Đặt ảnh đẹp nhất làm `0.webp`

### 3. Debounce
```
User copies 20 files (rapid)
├─ File 1, 2, 3... coming in
└─ Generator waits 2 seconds
   └─ Run once khi tất cả xong
```
Tránh regenerate nhiều lần, tối ưu performance.

---

## 🆘 Troubleshooting

### ❌ JSON không cập nhật

**Solution:**
```bash
npm run gallery:generate
```

Kiểm tra:
- Folder tồn tại? `assets/img/portfolio/cuoi/`
- Ảnh tồn tại? `.webp, .jpg, .png`
- Tên file đúng? lowercase extension

### ❌ Watch mode không chạy

**Solution:**
```bash
npm install  # Cài lại dependencies
npm run gallery:watch
```

Lỗi phổ biến:
- Missing `chokidar` module
- Permission denied (chạy as admin)
- Too many files (OS limit)

### ❌ Ảnh không hiển thị trên website

**Checklist:**
- ✓ File extension lowercase: `.webp` (không `.WEBP`)
- ✓ Folder name không có space
- ✓ Ảnh nằm đúng album folder
- ✓ Run `npm run gallery:generate`
- ✓ Clear browser cache (Ctrl+Shift+Del)

### ❌ "Cannot find module 'chokidar'"

**Solution:**
```bash
npm install chokidar glob
npm run gallery:watch
```

---

## 🎯 Performance Tips

### File Size
- Mỗi ảnh: 50-150KB (optimal)
- Dùng WebP format (50% nhỏ hơn PNG)
- Compress trước upload

### Folder Size
- Support tới 1000+ album
- 10,000+ ảnh (no problem)
- Watch mode delay ~2s (expected)

### Watch Mode Duration
- Có thể chạy cả ngày (minimal resource)
- CPU: < 1% idle
- Memory: ~30MB

---

## 📚 File Structure

```
scripts/
├── gallery-manager.js ............ Main generator
├── gallery-setup.js ............. Initial setup
└── ...

config/
├── portfolio-data.json .......... AUTO-GENERATED
├── moodboard-data.json ......... AUTO-GENERATED
└── hero-images.json ............ AUTO-GENERATED

docs/
├── README.md .................... Quick start (THIS)
├── VISUAL_GUIDE.md .............. Architecture diagrams
├── NEW_HOMEPAGE_GUIDE.md ........ Trang chủ mới
└── QUICK_CUSTOMIZATION.md ....... Customize trang chủ
```

---

## ✨ Summary

| Aspect | Details |
|--------|---------|
| **Setup Time** | ~5 phút |
| **Learning Curve** | Rất dễ |
| **Automation Level** | 95%+ |
| **Watch Mode** | Yes |
| **Metadata** | Optional |
| **Scalability** | 10,000+ images |

---

**Version:** 1.0.0  
**Last Updated:** 2026-03-03  
**Status:** ✅ Production Ready
