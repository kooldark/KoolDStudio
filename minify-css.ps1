#!/usr/bin/env powershell
# CSS Minification Script

function Minify-CSS {
    param([string]$filePath)
    
    $content = Get-Content $filePath -Raw
    
    # Remove comments (/* ... */)
    $content = $content -replace '(?s)/\*.*?\*/', ''
    
    # Remove whitespace around special characters
    $content = $content -replace '\s*([{}:;,>+~])\s*', '$1'
    
    # Collapse multiple spaces
    $content = $content -replace '\s+', ' '
    
    # Remove space before opening brace
    $content = $content -replace '\s+{', '{'
    
    # Trim
    $content = $content.Trim()
    
    return $content
}

# Files to minify
$files = @(
    'assets/css/style.css',
    'assets/css/responsive.css',
    'assets/css/improvements.css',
    'assets/css/pricing-new.css',
    'assets/css/pricing-tabs.css',
    'assets/css/watermark.css',
    'assets/css/moodboard-custom.css',
    'assets/css/bgcuoi-studio-new.css'
)

Write-Host "CSS Minification in progress..." -ForegroundColor Cyan

$totalBefore = 0
$totalAfter = 0

foreach ($file in $files) {
    $fullPath = Join-Path (Get-Location) $file
    if (Test-Path $fullPath) {
        $originalSize = (Get-Item $fullPath).Length
        $totalBefore += $originalSize
        
        $minified = Minify-CSS $fullPath
        Set-Content $fullPath -Value $minified -NoNewline -Encoding UTF8
        
        $newSize = (Get-Item $fullPath).Length
        $totalAfter += $newSize
        $reduction = [math]::Round(((($originalSize - $newSize) / $originalSize) * 100), 2)
        
        $fileName = Split-Path $file -Leaf
        $beforeSize = [math]::Round($originalSize / 1KB, 2)
        $afterSize = [math]::Round($newSize / 1KB, 2)
        Write-Host "Done: $fileName - $beforeSize KB to $afterSize KB"
    }
}

Write-Host "`n=== CSS Minification Summary ===" -ForegroundColor Cyan
$totalReduction = [math]::Round(((($totalBefore - $totalAfter) / $totalBefore) * 100), 2)
$beforeTotal = [math]::Round($totalBefore / 1KB, 2)
$afterTotal = [math]::Round($totalAfter / 1KB, 2)
$savedTotal = [math]::Round(($totalBefore - $totalAfter) / 1KB, 2)
Write-Host "Total Before: $beforeTotal KB"
Write-Host "Total After:  $afterTotal KB"
Write-Host "Saved: $savedTotal KB ($totalReduction% reduction)" -ForegroundColor Green
