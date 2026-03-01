# Kool D. Studio - Project Structure Guide

## 📁 Cấu Trúc Thư Mục

```
KoolDStudio/
├── index.html                  # Trang chủ chính
├── package.json               # Metadata dự án & dependencies
├── CNAME                       # Cấu hình domain
├── robots.txt                 # SEO robots configuration
├── sitemap.xml                # XML sitemap
│
├── pages/                     # 🔹 Các trang HTML khác
│   ├── about.html            # Trang giới thiệu
│   ├── booking.html          # Trang đặt lịch
│   ├── portfolio.html        # Danh mục ảnh
│   ├── pricing.html          # Bảng giá
│   ├── moodboard.html        # Moodboard
│   ├── event.html            # Ảnh sự kiện
│   ├── inan.html             # Ảnh gia đình đặc biệt
│   ├── hopdong.html          # Hợp đồng dịch vụ
│   ├── terms.html            # Điều khoản & điều kiện
│   ├── watermark.html        # Watermark styles
│   ├── pcuoi.html            # Chi tiết gói cưới
│   ├── pgiadinh.html         # Chi tiết gói gia đình
│   ├── card.html             # Card mẫu
│   └── 404.html              # Trang lỗi 404
│
├── config/                    # 🔹 Dữ liệu cấu hình & JSON
│   ├── categories.json              # Danh mục ảnh
│   ├── hero-images.json             # Danh sách ảnh hero
│   ├── home-portfolio-data.json     # Dữ liệu portfolio trang chủ
│   ├── moodboard-data.json          # Dữ liệu moodboard
│   ├── portfolio-data.json          # Dữ liệu portfolio chi tiết
│   ├── pricing-data.json            # Dữ liệu bảng giá
│   └── portfolio-data/              # Dữ liệu portfolio theo danh mục
│       ├── cuoi.json               # Dữ liệu ảnh cưới
│       ├── gia-dinh.json           # Dữ liệu ảnh gia đình
│       ├── makeup.json             # Dữ liệu ảnh makeup
│       └── phong-su.json           # Dữ liệu ảnh phóng sự
│
├── assets/                    # 🔹 Tài nguyên tĩnh
│   ├── css/                  # Stylesheets
│   │   ├── style.css                      # Styles cơ bản
│   │   ├── responsive.css                 # Responsive design
│   │   ├── modern-layout.css              # Modern layout styling
│   │   ├── improvements.css               # Cải tiến thêm
│   │   ├── professional-layout.css        # Professional layout
│   │   ├── bgcuoi-studio-new.css          # Styles ảnh cưới
│   │   ├── pricing-new.css                # Styles bảng giá
│   │   ├── pricing-tabs.css               # Tabs styling
│   │   ├── moodboard-custom.css           # Moodboard styles
│   │   └── watermark.css                  # Watermark styles
│   │
│   ├── js/                   # JavaScript files
│   │   ├── main.js                        # Main application logic
│   │   ├── hero-slider.js                 # Hero slider (Swiper)
│   │   ├── portfolio-gallery.js           # Portfolio gallery
│   │   ├── auto-gallery.js                # Auto gallery
│   │   ├── moodboard.js                   # Moodboard functionality
│   │   ├── booking.js                     # Booking form logic
│   │   ├── pricing.js                     # Pricing calculator
│   │   ├── modal.js                       # Modal functionality
│   │   ├── watermark.js                   # Watermark logic
│   │   ├── watermark-styles.js            # Watermark styles
│   │   ├── watermark-data.js              # Watermark data
│   │   ├── load-template.js               # Template loader
│   │   ├── pricing-calculator.js          # Pricing calculator
│   │   ├── event-gallery-auto.js          # Event gallery auto
│   │   ├── bgcuoi-studio.js               # Wedding studio script
│   │   ├── bgcuoi-studio-optimized.js     # Optimized version
│   │   ├── bggiadinh.js                   # Family script
│   │   ├── booking.js                     # Booking script
│   │   ├── aos.js                         # AOS animation library
│   │   └── portfolio-data/                # Backup data files
│   │       (Note: JSON files moved to config/)
│   │
│   ├── img/                  # Hình ảnh
│   │   ├── brand/            # Logo & hình thương hiệu
│   │   ├── hero/             # Ảnh hero
│   │   ├── event/            # Ảnh sự kiện
│   │   ├── portfolio/        # Portfolio images
│   │   │   ├── cuoi/         # Ảnh cưới
│   │   │   ├── gia-dinh/     # Ảnh gia đình
│   │   │   ├── makeup/       # Ảnh makeup
│   │   │   └── phong-su/     # Ảnh phóng sự
│   │   └── moodboard/        # Moodboard images
│   │
│   └── html/                 # HTML components
│       ├── header.html       # Header component
│       └── footer.html       # Footer component
│
├── scripts/                   # 🔹 Build & automation scripts
│   ├── generate-gallery.js                # Generate gallery data
│   ├── generate-hero-json.js              # Generate hero images JSON
│   ├── generate-moodboard-data.js         # Generate moodboard data
│   ├── generate-portfolio-data.js         # Generate portfolio data
│   ├── split-portfolio-data.js            # Split portfolio data by category
│   ├── validate-images.js                 # Validate image files
│   └── watch-hero.js                      # Watch hero images
│
├── build/                     # 🔹 Build & batch scripts
│   ├── build.bat              # Main build script
│   ├── Q_resize_webp.bat      # WebP image resizer
│   └── rwkd.bat               # Image processing script
│
├── docs/                      # 🔹 Documentation
│   ├── TEMPLATE_USAGE.md      # Template usage guide
│   ├── CONTENT_IMPROVEMENTS.md # Content improvements notes
│   └── DEBUGGING_NOTES.md     # Debugging & fix notes
│
├── workflows/                 # 🔹 GitHub Actions workflows (CI/CD)
│   ├── generate-gallery-json.yml
│   ├── generate-hero-json.yml
│   └── [other workflows]
│
└── node_modules/             # NPM dependencies (not in git)
```

---

## 📌 Mô Tả Chi Tiết

### Root Level Files
- **index.html** - Trang chủ, nơi duy nhất người dùng truy cập trực tiếp
- **package.json** - Cấu hình npm, dependencies
- **CNAME** - Custom domain configuration for GitHub Pages
- **robots.txt** - SEO configuration
- **sitemap.xml** - XML sitemap for search engines

### 📍 pages/ - Các Trang HTML
Tất cả các trang HTML phụ ngoài index.html được tổ chức ở đây.
- Để liên kết giữa pages, sử dụng `href="pricing.html"` (cùng thư mục)
- Asset paths đã cập nhật thành `../assets/...` để trỏ đúng

### 📊 config/ - Dữ Liệu Cấu Hình
Các file JSON chứa dữ liệu động cho trang web:
- `categories.json` - Danh sách danh mục ảnh
- `hero-images.json` - Danh sách ảnh cho hero slider
- `home-portfolio-data.json` - Dữ liệu portfolio cho trang chủ
- `moodboard-data.json` - Dữ liệu moodboard
- `portfolio-data.json` - Dữ liệu portfolio chi tiết
- `pricing-data.json` - Thông tin giá dịch vụ
- `portfolio-data/` - Dữ liệu portfolio theo từng danh mục

**JS fetch paths**: `config/` (e.g., `fetch('config/hero-images.json')`)

### 🎨 assets/
- **css/** - Tất cả CSS files, responsive design ở đây
- **js/** - JavaScript logic, libraries, animations
- **img/** - Tất cả hình ảnh được tổ chức theo loại
- **html/** - Reusable HTML components (header, footer)

### 🛠️ scripts/
Node.js scripts để tự động hóa:
- Tạo JSON data từ folder ảnh
- Generate portfolio data
- Validate image files
- Watch folders for changes

**Run**: `node scripts/[script-name].js`

### 🔧 build/
Batch files cho Windows automation:
- **build.bat** - Main build process
- **Q_resize_webp.bat** - Convert images to WebP
- **rwkd.bat** - Image optimization

**Run**: `cd build && build.bat`

### 📚 docs/
Tài liệu dự án:
- TEMPLATE_USAGE.md - Hướng dẫn sử dụng template
- CONTENT_IMPROVEMENTS.md - Ghi chú về cải tiến nội dung
- DEBUGGING_NOTES.md - Ghi chú debug & fixes

### ⚙️ workflows/
GitHub Actions workflows cho CI/CD automation

---

## 🚀 Cách Sử Dụng

### Thêm Trang HTML Mới
1. Tạo file `.html` trong `pages/`
2. Link assets sử dụng: `../assets/css/style.css`
3. Link pages sử dụng: `pricing.html`

### Thêm Dữ Liệu Mới
1. Tạo file `.json` trong `config/`
2. Fetch trong JS: `fetch('config/your-data.json')`
3. Reference trong scripts: `../config/your-data.json`

### Thêm Hình Ảnh Mới
1. Đặt ảnh trong `assets/img/[category]/`
2. Reference trong HTML: `../assets/img/[category]/image.jpg`
3. Update config files nếu cần

### Chạy Build Scripts
```bash
# Windows
cd build
build.bat

# Node.js scripts
node scripts/generate-portfolio-data.js
```

---

## 💡 Best Practices

✅ **DO:**
- Giữ pages trong `pages/`
- Giữ JSON configs trong `config/`
- Giữ assets trong `assets/`
- Sử dụng relative paths đúng
- Document thay đổi trong `docs/`

❌ **DON'T:**
- Đặt HTML pages ở root (ngoài index.html)
- Giữ JSON files trong `assets/js/`
- Mix configs, scripts, pages lại
- Hardcode absolute paths

---

## 📝 File Path Reference

| Type | Location | URL Path |
|------|----------|----------|
| HTML Pages | `pages/` | Relative: `pricing.html` |
| CSS | `assets/css/` | `../assets/css/style.css` |
| JS | `assets/js/` | `../assets/js/main.js` |
| Images | `assets/img/` | `../assets/img/hero/1.jpg` |
| JSON Config | `config/` | `config/pricing-data.json` |

---

## 🔄 Version Info
- **Last Updated**: March 2026
- **Project**: Kool D. Studio Photography Website
- **Structure**: Organized for maintainability & scalability

