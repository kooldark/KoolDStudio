$content = Get-Content "d:\GIT\KoolDStudio\services.html" -Raw

# Use a simpler regex pattern
$pattern = "Nổi Bật.*?Hoàn Hảo.*?Giá cơ bản từ 1,5 triệu.*?tư vấn chính xác\."

$replacement = @"
Trang Điểm - Tại Tư Gia</span>
              <span class=""option-desc"">Makeup ngày cưới tại nhà, touch-up linh hoạt, kèm kiểm tra lại</span>
              <span class=""option-price"">2-4 triệu</span>
            </label>
          </div>
        </div>

      </div>

      <!-- SUMMARY -->
      <div class=""calculator-summary"">
        <div class=""summary-label"">Dịch Vụ Trang Điểm</div>
        <div class=""summary-price"" id=""makeup-price"">1,8 triệu</div>
        <div class=""summary-description"">Giá cơ bản; báo giá cuối cùng phụ thuộc vào yêu cầu cụ thể & độ phức tạp makeup. Liên hệ để được tư vấn chi tiết.
"@

$newContent = [regex]::Replace($content, $pattern, $replacement, [System.Text.RegularExpressions.RegexOptions]::Singleline)
$newContent | Set-Content "d:\GIT\KoolDStudio\services.html"
Write-Host "Regex replacement completed"
