#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re

# Read the file
with open('d:\\GIT\\KoolDStudio\\services.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern to find and replace
old_pattern = r'<span class="option-text">Nổi Bật</span>\s+<span class="option-price">2 triệu</span>\s+<span class="option-text">Hoàn Hảo</span>\s+<span class="option-price">2-4 triệu</span>\s+<div class="summary-price"[^>]*id="makeup-price"[^>]*>1,5 triệu</div>\s+<div class="summary-description">Giá cơ bản từ 1,5 triệu; báo giá thực tế phụ thuộc vào nhu cầu & đặc điểm mỗi cô dâu\. Vui lòng liên hệ Makeup Artist để được tư vấn chính xác\.</div>'

new_text = '''<span class="option-text">Trang Điểm - Tại Tư Gia</span>
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
        <div class="summary-description">Giá cơ bản; báo giá cuối cùng phụ thuộc vào yêu cầu cụ thể & độ phức tạp makeup. Liên hệ để được tư vấn chi tiết.</div>'''

# Replace
new_content = re.sub(old_pattern, new_text, content, flags=re.DOTALL)

# Write back
with open('d:\\GIT\\KoolDStudio\\services.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print("File updated successfully")
