# 🎬 Hệ Thống Quản Lý Hình Ảnh Tự Động - Complete Setup Guide

## ✨ Overview

Bạn vừa cài đặt **Gallery Manager** - một hệ thống quy lý hình ảnh **tự động hoàn toàn**:

- 🗂️ Quản lý ảnh theo **cây thư mục** 
- 🔄 Tự động cập nhật JSON **mà không cần chỉnh sửa thủ công**
- 👁️ **Watch mode** theo dõi thay đổi real-time
- 📊 Hỗ trợ **Portfolio, Moodboard, Hero galleries**

---

## 🚀 Getting Started (5 phút)

### Step 1: Cài Dependencies ✅ (Đã Xong)

```bash
npm install
```

Dependencies được cài:
- `chokidar` - Watch file changes
- `glob` - File pattern matching
- `image-size` - Get image dimensions

### Step 2: Setup Folder Structure

```bash
npm run gallery:setup
```

**Output:**
```
🚀 Gallery Manager Setup

📁 Setting up Portfolio categories...
✓ Created: assets/img/portfolio/cuoi
✓ Created: assets/img/portfolio/gia-dinh
✓ Created: assets/img/portfolio/makeup
✓ Created: assets/img/portfolio/phong-su
...
✨ Setup completed successfully!
```

### Step 3: Thêm Hình Ảnh

```
Kéo ảnh vào các thư mục:
assets/img/portfolio/
  ├── cuoi/
  │   ├── album-1/
  │   │   ├── 0.webp ← Cover image
  │   │   ├── 1.webp
  │   │   └── 2.webp
  └── gia-dinh/
      └── album-2/
          ├── 0.webp
          └── 1.webp
```

### Step 4: Generate JSON

**Option A - Một lần:**
```bash
npm run gallery:generate
```

**Option B - Tự động (Recommended):**
```bash
npm run gallery:watch
```
Giữ cửa sổ terminal mở, sẽ tự động update khi có thay đổi.

---

## 📋 Commands Reference

| Command | Mục Đích | Khi Dùng |
|---------|---------|----------|
| `npm run gallery:setup` | Setup thư mục | Lần đầu |
| `npm run gallery:generate` | Generate JSON một lần | Sau thêm/xóa ảnh |
| `npm run gallery:watch` | Auto update JSON | Đang làm việc với ảnh |

---

## 🎯 How It Works

### Before (Cách cũ) ❌

```
1. Thêm ảnh vào thư mục
2. Thủ công edit JSON:
   config/portfolio-data.json
3. Thêm id, title, path...
4. Save
5. Reload website
```
⏰ **Tốn thời gian, dễ lỗi**

### After (Cách mới) ✅

```
1. Thêm ảnh vào thư mục
2. Hoàn xong! JSON tự động cập nhật
3. Website tự động load dữ liệu mới
```
⚡ **Nhanh, không lỗi, tự động!**

---

## 📁 Folder Structure

### Portfolio (Categories > Albums > Images)

```
assets/img/portfolio/
├── cuoi/
│   ├── category-info.json          (Optional)
│   ├── album-nam-linh-2025/
│   │   ├── 0.webp                  (Cover)
│   │   ├── 1.webp
│   │   ├── 2.webp
│   │   └── info.json               (Optional)
│   └── album-2/
├── gia-dinh/
├── makeup/
└── phong-su/
```

**Generated:** `config/portfolio-data.json`

### Moodboard (Categories > Images)

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

### Hero Slider (Direct Images)

```
assets/img/hero/
├── hero-1.webp
├── hero-2.webp
└── hero-3.webp
```

**Generated:** `config/hero-images.json`

---

## 🎬 Real-World Workflows

### Workflow 1: Thêm Album Cưới Mới

```bash
# 1. Terminal - Start watch mode
npm run gallery:watch

# 2. Explorer - Tạo thư mục
mkdir "assets/img/portfolio/cuoi/nam-dung-2025"

# 3. Explorer - Copy ảnh vào (tên: 0.webp, 1.webp, 2.webp...)
# Copy 20 file ảnh vào thư mục vừa tạo

# 4. Terminal - Thấy message (tự động!)
🔄 Changes detected - regenerating...
✅ Generated: config/portfolio-data.json

# 5. Website - Album mới tự động hiển thị!
```

**Time:** ~5 phút, không code, không JSON edit

### Workflow 2: Chỉnh Sửa Album Hiện Có

```bash
# 1. Terminal - Start watch mode
npm run gallery:watch

# 2. Explorer - Vào thư mục album
assets/img/portfolio/cuoi/nam-linh-2025/

# 3. Các tác vụ hỗ trợ:
✓ Thêm ảnh: Copy ảnh mới vào
✓ Xóa ảnh: Delete các ảnh không muốn
✓ Đổi tên: Rename ảnh (0, 1, 2... tự sắp xếp)

# 4. Terminal - Tự động update (vài giây)
📄 Added: 25.webp
📝 Changes detected - regenerating...
✅ Updated: config/portfolio-data.json

# 5. Website - Cập nhật tức thì
```

### Workflow 3: Bulk Update

```bash
# 1. Copy tất cả ảnh từ backup
# 2. Organize folder structure:
#    assets/img/portfolio/cuoi/
#    ├── album-1/
#    ├── album-2/
#    └── album-3/

# 3. Run generate một lần
npm run gallery:generate

# 4. Tất cả JSON cập nhật cùng lúc ✅
```

---

## 🎓 File Naming Rules

### ✅ Supported Formats

**File Extensions:**
- `.webp` (recommended)
- `.jpg`, `.jpeg`
- `.png`
- `.gif`, `.avif`

**File Names:**
```
✓ 0.webp, 1.webp, 10.webp
✓ image-1.webp, photo-1.webp
✓ cover.webp (auto-selected as cover)

✗ File with space.webp (avoid spaces)
✗ IMAGE_01.JPG (use lowercase extension)
✗ photo (1).webp (weird characters)
```

### 📂 Folder Names

```
✓ cuoi, gia-dinh, makeup, phong-su
✓ album-nam-linh-2025, album-2
✓ 1.sweet-romantic, 2.fun-playful

✗ "Cuoi Nam Linh 2025" (spaces)
✗ Ả nh (special characters)
```

### Cover Image Selection

Generator **tự động chọn** cover image theo thứ tự:

1. **Best:** File tên `0.webp` hoặc `cover.webp` ✅
2. **Fallback:** File đầu tiên (alphabetical)

**Recommendation:** Tên ảnh đẹp nhất thành `0.webp`

---

## 📊 Generated Output Format

### portfolio-data.json Example

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
          "description": "...",
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

JSON auto-generated, không cần chỉnh sửa! 

---

## 🔧 Advanced: Custom Metadata

### Category Info File (tuỳ chọn)

**File:** `assets/img/portfolio/{category}/category-info.json`

```json
{
  "title": "Chuyện Của Hai Ta",
  "description": "Tôi dài, mô tả chi tiết...",
  "order": 1,
  "featured": true
}
```

### Album Info File (tuỳ chọn)

**File:** `assets/img/portfolio/{category}/{album}/info.json`

```json
{
  "title": "Nam & Linh - Ngày Trong Mơ",
  "description": "Quai Đà Nẵng, 15/12/2024",
  "date": "2024-12-15",
  "location": "Da Nang, Vietnam",
  "photographer": "Kool D. Studio",
  "style": "natural",
  "colors": "warm",
  "outfitChanges": 2,
  "duration": "8 hours",
  "featured": true
}
```

**Info:** Generator sẽ đọc các file này - không touch JSON config!

---

## 👁️ Watch Mode Deep Dive

### Start Watch Mode

```bash
npm run gallery:watch
```

### What It Does

```
✓ Monitors: assets/img/portfolio/*, assets/img/moodboard/*, assets/img/hero/*
✓ Detects: File added, modified, deleted, folder created/deleted
✓ Ignores: .json files, .DS_Store, thumbs.db, node_modules
✓ Auto-regenerates: config/portfolio-data.json, moodboard-data.json, hero-images.json
✓ Debounce: Waits 2s after last change (to ensure file write completes)
```

### Terminal Output

```
👁️  Starting Watch Mode

Watching for changes in gallery folders...

✅ Watch mode active. Press Ctrl+C to stop.

[When you add a file]
📄 Added: 1.webp
📝 Changes detected - regenerating...
📁 Scanning portfolio...
✓ Album: Name (25 images)
✅ Generated: config/portfolio-data.json

[When you delete a file]
🗑️  Removed: 10.webp
📝 Changes detected - regenerating...
✅ Generated: config/portfolio-data.json

[To stop]
Ctrl+C
```

### How Long to Keep It Running?

**Best Practice:**
- Start at workflow beginning
- Keep running while adding/editing images
- Run `npm run gallery:generate` at end to final update
- Press Ctrl+C to close

**Or:** Leave it running all day - it uses minimal CPU

---

## 🆘 Troubleshooting

### ❓ JSON không update
**Fix:**
```bash
npm run gallery:generate
```

### ❓ Watch mode không hoạt động
**Fix:**
```bash
npm install
npm run gallery:watch
```

### ❓ Ảnh không hiển thị trên website
**Check:**
- ✓ File extension lowercase: `.webp` not `.WEBP`
- ✓ Folder name không có space
- ✓ Ảnh nằm đúng thư mục album
- ✓ Run `npm run gallery:generate` lại

### ❓ "command not found"
**Fix:**
```bash
npm install
npm run gallery:generate
```

---

## 📞 Summary

| Aspect | Details |
|--------|---------|
| **Setup Time** | ~5 phút |
| **Learning Curve** | Rất dễ - chỉ cần kéo/thả ảnh |
| **Automation Level** | 95% - gần như tự động toàn bộ |
| **Error Prevention** | Cao - không cần edit JSON |
| **Watch Mode** | Yes - real-time updates |
| **Scalability** | Support tới ngàn album |

---

## 📚 Documentation

- **Quick Guide:** [GALLERY_QUICK_GUIDE.md](GALLERY_QUICK_GUIDE.md)
- **Full Reference:** [GALLERY_MANAGER.md](GALLERY_MANAGER.md)

---

## 🎉 You're All Set!

**Bây giờ bạn có thể:**

✅ Quản lý hình ảnh qua **cây thư mục thông thường**  
✅ Tự động generate JSON **không cần code**  
✅ Watch mode cập nhật **real-time**  
✅ Add/Delete/Rename ảnh **chỉ bằng Explorer**  
✅ Website tự động load dữ liệu **mới nhất**  

**Next:** Chạy lệnh đầu tiên:
```bash
npm run gallery:watch
```

Happy managing! 🚀

---

**Version:** 1.0.0  
**Created:** 2025-03-02
