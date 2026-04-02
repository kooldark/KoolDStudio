#!/usr/bin/env python3
# -*- coding: utf-8 -*-

with open('d:\\GIT\\KoolDStudio\\services.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the line with "TAB 3: MAKEUP"
makeup_start = None
makeup_end = None

for i, line in enumerate(lines):
    if '<!-- TAB 3: MAKEUP -->' in line:
        makeup_start = i
    if makeup_start is not None and '<!-- TAB 4: EVENT -->' in line:
        makeup_end = i
        break

if makeup_start is not None and makeup_end is not None:
    # New makeup section
    new_section = '''  <!-- TAB 3: MAKEUP -->
  <div class="tab-content" id="makeup-content" data-aos="fade-up">
    <div class="calculator-section">
      <div class="calculator-header">
        <h2 class="calculator-title">Dịch Vụ Trang Điểm Cô Dâu</h2>
        <p class="calculator-subtitle">Trang điểm & kàn tóc chuyên nghiệp, bền vững, tỏa sáng suốt ngày trọng đại</p>
      </div>

      <div class="options-grid">
        <div class="option-group" style="grid-column: 1 / -1;">
          <div class="option-label"><i class="fas fa-wand-magic-sparkles"></i> Chọn Dịch Vụ</div>
          <div class="option-items">
            <label class="option-item">
              <input type="radio" name="makeup-service" value="studio" data-price="1800" checked>
              <span class="option-text">Trang Điểm & Kàn Tóc - Studio</span>
              <span class="option-desc">Makeup toàn diện tại studio, tư vấn tone, làm tóc chuyên nghiệp</span>
              <span class="option-price">1,8 triệu</span>
            </label>
            <label class="option-item">
              <input type="radio" name="makeup-service" value="home" data-price="3000">
              <span class="option-text">Trang Điểm - Tại Tư Gia</span>
              <span class="option-desc">Makeup ngày cưới tại nhà, touch-up linh hoạt, kèm kiểm tra lại</span>
              <span class="option-price">2-4 triệu</span>
            </label>
          </div>
        </div>
      </div>

      <!-- SUMMARY -->
      <div class="calculator-summary">
        <div class="summary-label">Dịch Vụ Trang Điểm</div>
        <div class="summary-price" id="makeup-price">1,8 triệu</div>
        <div class="summary-description">Giá cơ bản; báo giá cuối cùng phụ thuộc vào yêu cầu cụ thể & độ phức tạp makeup. Liên hệ để được tư vấn chi tiết.</div>
        <div class="summary-items" id="makeup-items"></div>
        <div class="calculator-cta">
          <a href="https://zalo.me/0379031662" class="btn btn-primary">
            <i class="fas fa-phone"></i> Liên Hệ Tư Vấn
          </a>
          <a href="booking.html?package=makeup" class="btn btn-secondary">
            <i class="fas fa-calendar"></i> Đặt Lịch
          </a>
        </div>
      </div>
    </div>
  </div>

'''
    
    # Replace the section
    new_lines = lines[:makeup_start] + [new_section] + lines[makeup_end:]
    
    with open('d:\\GIT\\KoolDStudio\\services.html', 'w', encoding='utf-8') as f:
        f.writelines(new_lines)
    
    print(f"Fixed! Replaced lines {makeup_start} to {makeup_end-1}")
else:
    print(f"ERROR: Could not find sections. makeup_start={makeup_start}, makeup_end={makeup_end}")
