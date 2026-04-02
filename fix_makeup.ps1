$content = Get-Content "d:\GIT\KoolDStudio\services.html" -Raw

# Fix the broken markup
$broken = "              <span class=""option-text"">Nổi Bật</span>`r`n              <span class=""option-price"">2 triệu</span>`r`n              <span class=""option-text"">Hoàn Hảo</span>`r`n              <span class=""option-price"">2-4 triệu</span>`r`n        <div class=""summary-price"" id=""makeup-price"">1,5 triệu</div>`r`n        <div class=""summary-description"">Giá cơ bản từ 1,5 triệu; báo giá thực tế phụ thuộc vào nhu cầu & đặc điểm mỗi cô dâu. Vui lòng liên hệ Makeup Artist để được tư vấn chính xác.</div>"

$fixed = "              <span class=""option-text"">Trang Điểm - Tại Tư Gia</span>`r`n              <span class=""option-desc"">Makeup ngày cưới tại nhà, touch-up linh hoạt, kèm kiểm tra lại</span>`r`n              <span class=""option-price"">2-4 triệu</span>`r`n            </label>`r`n          </div>`r`n        </div>`r`n`r`n      </div>`r`n`r`n      <!-- SUMMARY -->`r`n      <div class=""calculator-summary"">`r`n        <div class=""summary-label"">Dịch Vụ Trang Điểm</div>`r`n        <div class=""summary-price"" id=""makeup-price"">1,8 triệu</div>`r`n        <div class=""summary-description"">Giá cơ bản; báo giá cuối cùng phụ thuộc vào yêu cầu cụ thể & độ phức tạp makeup. Liên hệ để được tư vấn chi tiết.</div>"

$newContent = $content.Replace($broken, $fixed)
$newContent | Set-Content "d:\GIT\KoolDStudio\services.html"
Write-Host "Fixed successfully"
