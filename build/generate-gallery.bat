@echo off
REM Auto Generate Gallery Data from Portfolio Folders
REM This script scans all image files in portfolio folders and generates gallery-data.js

cd /d "%~dp0"
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║   🎨 AUTO GENERATE GALLERY DATA FROM PORTFOLIO            ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if errorlevel 1 (
    echo ❌ Error: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js found
echo.
echo Scanning portfolio folders and generating gallery-data.js...
echo.

REM Run the generator script
node generate-gallery-data.js

if errorlevel 1 (
    echo.
    echo ❌ Error: Failed to generate gallery data
    pause
    exit /b 1
)

echo.
echo ✅ Gallery data updated successfully!
echo.
echo 💡 Tips:
echo    - Reload your browser to see the changes
echo    - Images are loaded from: assets/img/portfolio/
echo    - Categories detected: cuoi, gia-dinh, makeup, pro, phong-su
echo.
pause
