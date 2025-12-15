@echo off
REM Build script - Auto-generate all JSON files for KoolDStudio
REM This script runs all necessary generation scripts before pushing to git

echo.
echo ====================================
echo   KoolDStudio - Auto Build System
echo ====================================
echo.

echo 🔄 Generating gallery data...
node scripts/generate-gallery.js
if %errorlevel% neq 0 (
  echo ❌ Gallery generation failed!
  pause
  exit /b 1
)
echo ✅ Gallery data generated

echo.
echo 🔄 Generating hero images...
node scripts/generate-hero-json.js
if %errorlevel% neq 0 (
  echo ❌ Hero images generation failed!
  pause
  exit /b 1
)
echo ✅ Hero images generated

echo.
echo 🔄 Generating portfolio data...
node scripts/generate-portfolio-data.js
if %errorlevel% neq 0 (
  echo ❌ Portfolio data generation failed!
  pause
  exit /b 1
)
echo ✅ Portfolio data generated

echo.
echo 🔄 Generating moodboard data...
npm run generate:moodboard
if %errorlevel% neq 0 (
  echo ❌ Moodboard generation failed!
  pause
  exit /b 1
)
echo ✅ Moodboard data generated

echo.
echo 🔍 Validating images...
node scripts/validate-images.js
if %errorlevel% neq 0 (
  echo ⚠️  Some images may have issues (see above for details)
  REM Don't exit - just warn
)
echo ✅ Image validation completed

echo.
echo ====================================
echo ✨ All files generated successfully!
echo ====================================
echo.
echo 📌 Ready to commit and push to git
echo.
pause
