@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
title Nén WebP Liên Tục - Studio Pro (Phiên Bản Tối Ưu)

:: Tự động dùng magick hoặc convert
set "cmd=magick"
where magick >nul 2>&1 || set "cmd=convert"

:loop
cls
echo.
echo ╔══════════════════════════════════════════════════╗
echo ║       NÉN WEBP SIÊU NHẸ - DÙNG LIÊN TỤC          ║
echo ║     Cạnh dài 2048px │ Dung lượng ~300-600KB      ║
echo ║   Duyệt thư mục con, tối ưu non-WebP, xóa gốc    ║
echo ╚══════════════════════════════════════════════════╝
echo.

:: Sử dụng thư mục hiện tại của file BAT làm mặc định
set "folder=%~dp0"
set "folder=!folder:~0,-1!"  :: Xóa dấu gạch chéo cuối nếu có

:: Kiểm tra tồn tại
if not exist "%folder%\" (
    echo.
    echo LỖI: Thư mục không tồn tại! Thử lại nhé...
    timeout /t 3 >nul
    goto end
)

echo.
echo Đang nén toàn bộ ảnh trong thư mục hiện tại và các thư mục con:
echo   %folder%
echo.

:: Tìm tất cả ảnh non-WebP trong thư mục và thư mục con
set count=0
for /r "%folder%" %%F in (*.jpg *.jpeg *.png *.tif *.tiff *.bmp) do if exist "%%F" set /a count+=1

if %count%==0 (
    echo Không tìm thấy ảnh non-WebP nào để tối ưu!
    timeout /t 3 >nul
    goto end
)

set n=0
for /r "%folder%" %%F in (*.jpg *.jpeg *.png *.tif *.tiff *.bmp) do if exist "%%F" (
    set /a n+=1
    set "fullpath=%%F"
    set "dir=%%~dpF"
    set "name=%%~nF"
    set "ext=%%~xF"

    :: Tạo file WebP mới trong cùng thư mục
    %cmd% "%%F" -strip -resize 2048x2048^> -unsharp 0.25x0.25+0.8+0.02 -quality 82 -define webp:method=6 "!dir!!name!.webp" >nul 2>&1

    if exist "!dir!!name!.webp" (
        echo   [%n%/%count%] Đã xong → !name!.webp (tại !dir!)
        :: Xóa file gốc sau khi thành công
        del "%%F" >nul 2>&1
    ) else (
        echo   [LỖI] !name!!ext! (tại !dir!)
    )
)

echo.
echo ╔══════════════════════════════════════╗
echo ║      HOÀN THÀNH THƯ MỤC NÀY!         ║
echo ║   Tất cả ảnh non-WebP đã được tối ưu ║
echo ║   và file gốc đã được xóa.           ║
echo ╚══════════════════════════════════════╝
echo.

:end
echo.
echo Cảm ơn anh đã dùng tool! Chúc up web nhanh như chớp! ❤
timeout /t 2 >nul
exit