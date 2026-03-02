# 📸 Gallery Manager - Quản Lý Hình Ảnh Tự Động

Một hệ thống quản lý hình ảnh dựa trên cây thư mục, tự động cập nhật JSON metadata khi thêm/xóa/sửa ảnh.

## 🎯 Tính Năng

- ✅ **Tự động quét thư mục** - Không cần chỉnh sửa JSON thủ công
- ✅ **Watch mode** - Theo dõi thay đổi real-time
- ✅ **Hỗ trợ nhiều kiểu gallery** - Portfolio, Moodboard, Hero
- ✅ **Cấu trúc linh hoạt** - Categories > Albums > Images
- ✅ **Metadata tự động** - Tự động sắp xếp ảnh, tìm cover image

## 📁 Cấu Trúc Thư Mục

```
assets/img/
├── portfolio/              # Portfolio galleries
│   ├── cuoi/              # Category 1
│   │   ├── album-1/       # Album folder
│   │   │   ├── 1.webp
│   │   │   ├── 2.webp
│   │   │   └── info.json  # Album metadata (optional)
│   │   ├── album-2/
│   │   └── category-info.json  # Category metadata (optional)
│   ├── gia-dinh/
│   ├── makeup/
│   └── ...
│
├── moodboard/             # Moodboard galleries
│   ├── 1.Sweet & Romantic/
│   │   ├── image-1.webp
│   │   └── image-2.webp
│   ├── 2.Fun & Playful/
│   └── ...
│
└── hero/                  # Hero slider images
    ├── hero-1.webp
    ├── hero-2.webp
    └── ...
```

## 🚀 Quick Start

### 1. **Cài đặt Dependencies**

```bash
npm install
```

### 2. **Khởi tạo Cấu Trúc Thư Mục**

```bash
npm run gallery:setup
```

Sẽ tạo:
- ✓ Các thư mục categories
- ✓ Sample album structure
- ✓ Template info.json files

### 3. **Thêm Hình Ảnh**

Đặt hình ảnh vào các thư mục:

```
assets/img/portfolio/cuoi/
├── cuoi-nam-linh/
│   ├── 0.webp              # Cover image (prioritized)
│   ├── 1.webp
│   ├── 2.webp
│   └── info.json
```

### 4. **Tạo JSON Metadata**

```bash
# Cách 1: Chạy một lần
npm run gallery:generate

# Cách 2: Watch mode (tự động update)
npm run gallery:watch
```

Sẽ tạo các file:
- `config/portfolio-data.json`
- `config/moodboard-data.json`
- `config/hero-images.json`

## 📝 Metadata Files

### Category Info (tuỳ chọn)

**File:** `assets/img/portfolio/{category}/category-info.json`

```json
{
  "title": "Chuyện Của Hai Ta",
  "description": "Ảnh cưới với phong cách tự nhiên",
  "order": 1
}
```

### Album Info (tuỳ chọn)

**File:** `assets/img/portfolio/{category}/{album}/info.json`

```json
{
  "title": "Album Name",
  "description": "Album description",
  "date": "2025-12-01",
  "photographer": "Kool D. Studio",
  "location": "Ho Chi Minh City"
}
```

## 🔄 Workflow

### Thêm Album Mới

```
1. Tạo thư mục: assets/img/portfolio/cuoi/album-2025/
2. Đặt ảnh: 0.webp, 1.webp, 2.webp...
3. (Tuỳ chọn) Tạo info.json
4. Chạy: npm run gallery:generate
```

### Đổi Tên Ảnh

```
1. Đổi tên file trong explorer (0.webp → 1.webp)
2. Chạy: npm run gallery:generate
3. JSON tự động cập nhật thứ tự ảnh
```

### Xóa Ảnh

```
1. Xóa file trong explorer
2. Chạy: npm run gallery:generate
3. JSON tự động cập nhật
```

### Xóa Album

```
1. Xóa thư mục album
2. Chạy: npm run gallery:generate
3. Album biến mất khỏi JSON
```

## 🎬 Watch Mode

Watch mode tự động theo dõi thay đổi:

```bash
npm run gallery:watch
```

**Output:**
```
👁️  Starting Watch Mode

Watching for changes in gallery folders...

✅ Watch mode active. Press Ctrl+C to stop.

📄 Added: new-album
📝 Changes detected - regenerating...
✅ Generated: config/portfolio-data.json
```

**Thế nào để dùng:**
1. Chạy `npm run gallery:watch` trong terminal
2. Để cửa sổ terminal mở
3. Mỗi khi thêm/xóa ảnh, JSON tự động cập nhật
4. Nhấn Ctrl+C để dừng

## 📊 Output Format

### Portfolio Data

```json
{
  "categories": [
    {
      "id": "cuoi",
      "title": "Chuyện Của Hai Ta",
      "description": "...",
      "albums": [
        {
          "id": "Nam-Linh-2025",
          "title": "Nam & Linh",
          "description": "...",
          "path": "cuoi/Nam-Linh-2025",
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

### Moodboard Data

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

### Hero Data

```json
{
  "images": ["hero-1.webp", "hero-2.webp", "hero-3.webp"]
}
```

## 🎯 Naming Convention

Để tối ưu tốt nhất, tuân theo:

### File Names
- Dùng **số thứ tự** hoặc **tên mô tả**: `0.webp`, `1.webp` hoặc `hero-1.webp`
- Tránh khoảng trắng, dùng dấu gạch `-` thay vì khoảng trắng
- Hỗ trợ: `.webp`, `.jpg`, `.png`, `.gif`, `.avif`

### Folder Names
- Tránh khoảng trắng, dùng dấu gạch `-` thay vì khoảng trắng
- Ví dụ: `nam-linh-2025` (không `Nam Linh 2025`)
- Danh mục có thể có `category-info.json` để override tên hiển thị

### Cover Image
Generator tự động chọn cover image theo thứ tự:
1. File bắt đầu với `0` hoặc `cover`: `0.webp` ✓
2. File đầu tiên trong danh sách (alphabetical sort)

💡 **Tip:** Đặt `0.webp` hoặc `cover.webp` làm cover image đẹp nhất

## 🔧 Advanced Usage

### Tạo Thư Mục Mới Secara Manual

Nếu không chạy setup, có thể tạo thủ công:

```bash
mkdir -p assets/img/portfolio/cuoi/album-moi
echo "{}" > assets/img/portfolio/cuoi/album-moi/info.json
```

### Regenerate Từ CLI

```bash
# Generate tất cả
node scripts/gallery-manager.js

# Generate với watch mode
node scripts/gallery-manager.js --watch
```

### Check Configuration

Mở file để xem cấu hình hiện tại:
- `config/portfolio-data.json` - Portfolio categories & albums
- `config/moodboard-data.json` - Moodboard categories
- `config/hero-images.json` - Hero images

## ⚠️ Notes

- **Ignore Files:** Tự động bỏ qua `.DS_Store`, `thumbs.db`, JSON files
- **Empty Folders:** Admin folders trống sẽ bị skip
- **Natural Sort:** Ảnh được sắp xếp tự động (1, 2, 10 thay vì 1, 10, 2)
- **Real-time Sync:** Watch mode có delay ~2s để đảm bảo file write hoàn thành

## 🎓 Ví Dụ Thực Tế

### Thêm album cưới mới

```bash
# 1. Tạo thư mục
mkdir -p assets/img/portfolio/cuoi/nam-dung-2025

# 2. Copy ảnh vào (đã xếp tên từ 0.webp, 1.webp...)
# 3. Tạo info.json
cat > assets/img/portfolio/cuoi/nam-dung-2025/info.json << 'EOF'
{
  "title": "Nam & Dung",
  "description": "Đám cưới tại Sài Gòn",
  "date": "2025-06-15",
  "location": "Ho Chi Minh City"
}
EOF

# 4. Generate JSON
npm run gallery:generate

# Xong! Website tự động hiển thị album mới
```

### Chỉnh sửa album hiện có

```bash
# 1. Đổi tên ảnh, thêm/xóa ảnh
# Edit: assets/img/portfolio/cuoi/nam-linh-2025/

# 2. Run generate (hoặc để watch mode tự làm)
npm run gallery:generate

# 3. Website cập nhật tự động
```

## ❓ Troubleshooting

### JSON không cập nhật

```bash
# Chạy lại generate
npm run gallery:generate

# Hoặc start watch mode
npm run gallery:watch
```

### Ảnh không hiển thị

✓ Check file extension: `.webp`, `.jpg`, `.png` (lowercase)
✓ Check tên folder không có space: `cuoi` ✓ (không `cuoi uploads`)
✓ Check ảnh trong đúng thư mục album

### Watch mode không hoạt động

```bash
# Cài lại dependencies
npm install

# Chạy lại watch mode
npm run gallery:watch
```

## 📞 Support

- Gallery Manager CLI: `node scripts/gallery-manager.js`
- Setup: `node scripts/gallery-setup.js`
- Watch Mode: `npm run gallery:watch`

---

**Version:** 1.0.0  
**Last Updated:** 2025-03-02
