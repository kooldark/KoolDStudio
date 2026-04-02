#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# Read the file  
with open('d:\\GIT\\KoolDStudio\\services.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find and fix line by line
output = []
i = 0
while i < len(lines):
    if 'Nổi Bật' in lines[i]:
        # Found the problematic line, replace this section
        # Skip lines until we find the summary-price
        while i < len(lines) and 'summary-price' not in lines[i]:
            i += 1
        
        # Now i points to a line with summary-price, add corrected version
        output.append('              <span class="option-text">Trang Điểm - Tại Tư Gia</span>\n')
        output.append('              <span class="option-desc">Makeup ngày cưới tại nhà, touch-up linh hoạt, kèm kiểm tra lại</span>\n')
        output.append('              <span class="option-price">2-4 triệu</span>\n')
        output.append('            </label>\n')
        output.append('          </div>\n')
        output.append('        </div>\n')
        output.append('\n')
        output.append('      </div>\n')
        output.append('\n')
        output.append('      <!-- SUMMARY -->\n')
        output.append('      <div class="calculator-summary">\n')
        output.append('        <div class="summary-label">Dịch Vụ Trang Điểm</div>\n')
        output.append('        <div class="summary-price" id="makeup-price">1,8 triệu</div>\n')
        output.append('        <div class="summary-description">Giá cơ bản; báo giá cuối cùng phụ thuộc vào yêu cầu cụ thể & độ phức tạp makeup. Liên hệ để được tư vấn chi tiết.</div>\n')
        
        # Skip old lines until we find summary-items
        while i < len(lines) and 'summary-items' not in lines[i]:
            i += 1
        
        # Add the remaining summary lines
        for j in range(i, len(lines)):
            if '<!-- TAB 4: EVENT -->' in lines[j]:
                # We've reached the event tab, output remaining summary and break
                while i < j:
                    if 'summary-items' in lines[i] or 'calculator-cta' in lines[i] or 'href=' in lines[i] or 'btn' in lines[i]:
                        output.append(lines[i])
                    elif '</div>' in lines[i]:
                        output.append(lines[i])
                    i += 1
                # Add the event tab line
                output.append(lines[j])
                i = j + 1
                break
    else:
        output.append(lines[i])
        i += 1

# Write back
with open('d:\\GIT\\KoolDStudio\\services.html', 'w', encoding='utf-8') as f:
    f.writelines(output)

print("Fixed successfully using line-based approach")
