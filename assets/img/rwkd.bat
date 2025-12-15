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
for /r "%folder%" %%F in (*.jpg *.jpeg *.png *.tif *.tiff *.jfif *.bmp) do if exist "%%F" set /a count+=1

if %count%==0 (
    echo Không tìm thấy ảnh non-WebP nào để tối ưu!
    timeout /t 3 >nul
    goto end
)

set n=0
for /r "%folder%" %%F in (*.jpg *.jpeg *.png *.tif *.tiff *.jfif *.bmp) do if exist "%%F" (
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

:: Tiếp theo: Xóa tiền tố gạch dưới (_) từ các file WebP
echo.
echo ╔══════════════════════════════════════╗
echo ║  XÓA TIỀN TỐ GẠCH DƯỚI (_) TỬ TÊN ẢNH ║
echo ╚══════════════════════════════════════╝
echo.

set rename_count=0
for /r "%folder%" %%F in (_*.webp _*.jpg _*.jpeg _*.png _*.tif _*.tiff _*.bmp) do (
    set "fullpath=%%F"
    set "filename=%%~nF"
    set "extension=%%~xF"
    set "newname=!filename:_=!"
    
    if not "!newname!"=="!filename!" (
        set /a rename_count+=1
        set "new_fullname=!newname!!extension!"
        echo   [!rename_count!] !filename!!extension! --^> !new_fullname!
        ren "!fullpath!" "!new_fullname!"
        if !errorlevel! neq 0 (
            echo   ^^^ LỖI khi đổi tên!
        )
    )
)

if %rename_count% gtr 0 (
    echo.
    echo ✓ Đã xóa tiền tố "_" khỏi !rename_count! ảnh!
) else (
    echo.
    echo ✓ Không tìm thấy ảnh nào có tiền tố "_"
)

echo.

:end
echo.
echo ╔══════════════════════════════════════╗
echo ║   Nén WebP + Xóa Tiền Tố Xong!      ║
echo ║   Chúc anh up web nhanh như chớp! ❤ ║
echo ╚══════════════════════════════════════╝
echo.
timeout /t 2 >nul
exit