
let currentColor = '#1a1a1a';
let currentSecondaryColor = '#eb9500';
let currentMainFont = 'Playfair';
let currentSubFont = 'Montserrat';
let favorites = JSON.parse(localStorage.getItem('watermarkFavorites')) || [];
let allStyles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50];

// Debug: check if required libraries are loaded
console.log('html2canvas available:', typeof html2canvas !== 'undefined');
console.log('saveAs available:', typeof saveAs !== 'undefined');

function applyMainFont(fontKey, event) {
    currentMainFont = fontKey;
    const mainSelect = document.getElementById('fontMainSelect');
    if (mainSelect) {
        mainSelect.value = fontKey;
    }
    updatePreview();
}

function applySubFont(fontKey, event) {
    currentSubFont = fontKey;
    const subSelect = document.getElementById('fontSubSelect');
    if (subSelect) {
        subSelect.value = fontKey;
    }
    updatePreview();
}



function setTextColor(c, event) {
    currentColor = c;
    
    // Auto-set complementary color when main color changes
    currentSecondaryColor = getComplementaryColor(c);
    
    document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
    if (event && event.target) {
        event.target.classList.add('active');
    }
    updateColorSwatches();
    updatePreview();
}

function updateColorSwatches() {
    const mainSwatch = document.getElementById('mainColorSwatch');
    const secondarySwatch = document.getElementById('secondaryColorSwatch');
    const mainColorCode = document.getElementById('mainColorCode');
    const secondaryColorCode = document.getElementById('secondaryColorCode');
    
    if (mainSwatch) {
        mainSwatch.style.background = currentColor;
    }
    if (secondarySwatch) {
        secondarySwatch.style.background = currentSecondaryColor;
        // Add professional animation when secondary color updates
        secondarySwatch.classList.remove('harmony-update');
        // Trigger reflow to restart animation
        void secondarySwatch.offsetWidth;
        secondarySwatch.classList.add('harmony-update');
        // Remove class after animation completes
        setTimeout(() => {
            secondarySwatch.classList.remove('harmony-update');
        }, 600);
    }
    if (mainColorCode) {
        mainColorCode.textContent = currentColor;
    }
    if (secondaryColorCode) {
        secondaryColorCode.textContent = currentSecondaryColor;
    }
}

function copyColorCode(colorHex) {
    navigator.clipboard.writeText(colorHex).then(() => {
        const notification = document.createElement('div');
        notification.textContent = `📋 Đã copy: ${colorHex}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #3a5a40;
            color: white;
            padding: 12px 16px;
            border-radius: 6px;
            font-size: 12px;
            font-weight: 600;
            z-index: 10000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }).catch(err => {
        console.error('Copy failed:', err);
    });
}

function updatePreview() {
    const styleId = document.getElementById('styleSelect').value;
    const l1 = document.getElementById('line1Input')?.value || '';
    const l2 = document.getElementById('line2Input')?.value || '';
    const l3 = document.getElementById('line3Input')?.value || '';
    const opacitySlider = document.getElementById('opacitySlider');
    const opacity = opacitySlider ? opacitySlider.value / 100 : 1;

    const template = watermarkTemplates[styleId];
    if (!template) return;

    const preview = document.getElementById('watermarkPreview');
    if (!preview) return;

    preview.innerHTML = template.html(l1, l2, l3, currentColor, currentMainFont, currentSecondaryColor); 
    
    // Apply opacity to all text elements inside preview
    const allElements = preview.querySelectorAll('*');
    allElements.forEach(el => {
        el.style.opacity = opacity;
    });
    
    // Apply fonts to all text elements - support for future .line1/.line2 classes
    const line1El = preview.querySelector('.line1');
    if (line1El) line1El.style.fontFamily = getFontFamily(currentMainFont);

    const line2El = preview.querySelector('.line2');
    if (line2El) line2El.style.fontFamily = getFontFamily(currentSubFont);

    // Also apply main font to all divs by default
    const allDivs = preview.querySelectorAll('div');
    allDivs.forEach(div => {
        if (!div.style.fontFamily) {
            div.style.fontFamily = getFontFamily(currentMainFont);
        }
    });
}

function resetPreview() {
    const line1Input = document.getElementById('line1Input');
    const line2Input = document.getElementById('line2Input');
    const line3Input = document.getElementById('line3Input');
    const opacitySlider = document.getElementById('opacitySlider');
    const opacityValue = document.getElementById('opacityValue');
    
    if (line1Input) line1Input.value = 'Kool D.';
    if (line2Input) line2Input.value = 'Studio';
    if (line3Input) line3Input.value = 'Est. 2025';
    if (opacitySlider) opacitySlider.value = 100;
    if (opacityValue) opacityValue.textContent = '100%';
    
    currentMainFont = 'Playfair';
    currentSubFont = 'Montserrat';
    
    currentColor = '#1a1a1a';
    
    // Update select dropdowns for fonts
    const mainSelect = document.getElementById('fontMainSelect');
    const subSelect = document.getElementById('fontSubSelect');
    if (mainSelect) mainSelect.value = currentMainFont;
    if (subSelect) subSelect.value = currentSubFont;

    updatePreview();
}

function randomizeAll() {
    // Random style (1-40)
    const randomStyle = allStyles[Math.floor(Math.random() * allStyles.length)];
    const styleSelect = document.getElementById('styleSelect');
    if (styleSelect) {
        styleSelect.value = randomStyle;
    }
    
    // Random main font
    const randomMainFontIndex = Math.floor(Math.random() * fontLibrary.length);
    const randomMainFont = fontLibrary[randomMainFontIndex].key;
    currentMainFont = randomMainFont;
    const mainSelect = document.getElementById('fontMainSelect');
    if (mainSelect) mainSelect.value = randomMainFont;
    
    // Random sub font
    const randomSubFontIndex = Math.floor(Math.random() * fontLibrary.length);
    const randomSubFont = fontLibrary[randomSubFontIndex].key;
    currentSubFont = randomSubFont;
    const subSelect = document.getElementById('fontSubSelect');
    if (subSelect) subSelect.value = randomSubFont;
    
    updatePreview();
}

async function downloadWatermark() {
    const styleId = document.getElementById('styleSelect').value;
    const l1 = document.getElementById('line1Input').value || '';
    const l2 = document.getElementById('line2Input').value || '';
    const l3 = document.getElementById('line3Input').value || '';

    const template = watermarkTemplates[styleId];
    if (!template) {
        console.error('Template not found for style:', styleId);
        return;
    }

    const tempContainer = document.createElement('div');
    tempContainer.style.cssText = `
        width: 400px;
        height: 400px;
        background: transparent;
        position: fixed;
        left: -9999px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 40px;
        opacity: ${(document.getElementById('opacitySlider')?.value || 100) / 100};
    `;
    
    tempContainer.innerHTML = template.html(l1, l2, l3, currentColor, currentMainFont, currentSecondaryColor);
    
    const allElements = tempContainer.querySelectorAll('*');
    allElements.forEach(el => {
        if (!el.style.fontFamily) {
            el.style.fontFamily = getFontFamily(currentMainFont);
        }
    });

    document.body.appendChild(tempContainer);

    try {
        // Wait for fonts to load before converting to canvas.
        await new Promise(resolve => setTimeout(resolve, 300));

        const canvas = await html2canvas(tempContainer, { 
            backgroundColor: null, 
            scale: 3, 
            useCORS: true, 
            logging: false
        });
        
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png', 1.0));

        if (blob) {
            const now = new Date();
            const ts = now.toISOString().replace(/[:.]/g, '-').slice(0, -5);
            const filename = `watermark-${ts}.png`;
            saveAs(blob, filename);
        } else {
            console.error('Canvas to Blob conversion failed');
            if (typeof modal !== 'undefined') {
                modal.error('Lỗi khi tạo file ảnh. Vui lòng thử lại.', 'Lỗi');
            }
        }
    } catch (error) {
        console.error('Download error:', error);
        if (typeof modal !== 'undefined') {
            modal.error('Lỗi download: ' + error.message, 'Lỗi');
        }
    } finally {
        if (document.body.contains(tempContainer)) {
            document.body.removeChild(tempContainer);
        }
    }
}

function copyWatermarkConfig() {
    const config = JSON.stringify({
        style: document.getElementById('styleSelect').value,
        line1: document.getElementById('line1Input').value,
        line2: document.getElementById('line2Input').value,
        line3: document.getElementById('line3Input').value,
        opacity: document.getElementById('opacitySlider').value,
        color: currentColor,
        mainFont: currentMainFont,
        subFont: currentSubFont,
    });
    navigator.clipboard.writeText(config).then(() => {
        if (typeof modal !== 'undefined') {
            modal.success('Đã sao chép cấu hình!', 'Thành công');
        } else {
            alert('✅ Copied!');
        }
    });
}

function copyShareableLink() {
    const opacitySlider = document.getElementById('opacitySlider');
    const copyBtn = document.getElementById('copyLinkBtn');
    const originalText = copyBtn ? copyBtn.textContent : 'Sao chép thiết kế';
    
    const config = {
        style: document.getElementById('styleSelect').value,
        line1: document.getElementById('line1Input').value,
        line2: document.getElementById('line2Input').value,
        line3: document.getElementById('line3Input').value,
        color: currentColor,
        color2: currentSecondaryColor,
        font1: currentMainFont,
        font2: currentSubFont,
        opacity: opacitySlider ? opacitySlider.value : '100',
    };

    const jsonConfig = JSON.stringify(config);
    const encodedConfig = btoa(jsonConfig);
    const url = `${window.location.origin}${window.location.pathname}?config=${encodedConfig}`;

    navigator.clipboard.writeText(url).then(() => {
        // Update button with success indicator
        if (copyBtn) {
            copyBtn.textContent = '✓ Đã sao chép';
            copyBtn.style.opacity = '0.8';
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.opacity = '1';
            }, 2000);
        }
        
        if (typeof modal !== 'undefined') {
            modal.success('Đã sao chép liên kết chia sẻ!', 'Thành công');
        } else {
            alert('✅ Link copied to clipboard!');
        }
    }).catch(err => {
        console.error('Failed to copy link: ', err);
        if (typeof modal !== 'undefined') {
            modal.error('Không thể sao chép liên kết.', 'Lỗi');
        } else {
            alert('❌ Could not copy link.');
        }
    });
}

function applyConfiguration(config) {
    if (!config) return;

    try {
        document.getElementById('styleSelect').value = config.style;
        document.getElementById('line1Input').value = config.line1;
        document.getElementById('line2Input').value = config.line2;
        document.getElementById('line3Input').value = config.line3;
        
        currentColor = config.color;
        currentSecondaryColor = config.color2;
        currentMainFont = config.font1;
        currentSubFont = config.font2;

        // Update UI elements
        const mainSelect = document.getElementById('fontMainSelect');
        const subSelect = document.getElementById('fontSubSelect');
        const colorPicker = document.getElementById('colorPicker');
        const colorInput = document.getElementById('colorInput');
        const opacitySlider = document.getElementById('opacitySlider');
        const opacityValue = document.getElementById('opacityValue');

        if (mainSelect) mainSelect.value = currentMainFont;
        if (subSelect) subSelect.value = currentSubFont;
        if (colorPicker) colorPicker.value = currentColor;
        if (colorInput) colorInput.value = currentColor;
        if (opacitySlider && config.opacity) {
            opacitySlider.value = config.opacity;
        }
        if (opacityValue && config.opacity) {
            opacityValue.textContent = config.opacity + '%';
        }

        updateColorSwatches();
        updatePreview();

    } catch (error) {
        console.error("Failed to apply configuration:", error);
        if (typeof modal !== 'undefined') {
            modal.error('Cấu hình trong liên kết bị lỗi hoặc không hợp lệ.', 'Lỗi');
        }
    }
}

function saveFavorite() {
    const fav = {
        style: document.getElementById('styleSelect').value,
        line1: document.getElementById('line1Input').value,
        line2: document.getElementById('line2Input').value,
        line3: document.getElementById('line3Input').value,
        opacity: document.getElementById('opacitySlider').value,
        color: currentColor,
        mainFont: currentMainFont,
        subFont: currentSubFont,
        id: Date.now()
    };
    favorites.unshift(fav);
    if (favorites.length > 5) favorites.pop();
    localStorage.setItem('watermarkFavorites', JSON.stringify(favorites));
    renderFavorites();
}

function renderFavorites() {
    const list = document.getElementById('favoritesList');
    const section = document.getElementById('favoritesSection');
    if (favorites.length === 0) {
        section.style.display = 'none';
        return;
    }
    section.style.display = 'block';
    list.innerHTML = favorites.map(fav => `
        <button style="padding:8px; border:1px solid #ddd; border-radius:4px; cursor:pointer; text-align:left; background:#f9f9f9; font-size:11px;" onclick="loadFavorite(${fav.id})">
            Style ${fav.style} - ${fav.line1} / ${fav.line2} <span style="float:right;cursor:pointer;" onclick="deleteFavorite(${fav.id}, event)">✕</span>
        </button>
    `).join('');
}

function loadFavorite(id) {
    const fav = favorites.find(f => f.id === id);
    if (!fav) return;
    document.getElementById('styleSelect').value = fav.style;
    document.getElementById('line1Input').value = fav.line1;
    document.getElementById('line2Input').value = fav.line2;
    document.getElementById('line3Input').value = fav.line3;
    document.getElementById('opacitySlider').value = fav.opacity;
    document.getElementById('opacityValue').textContent = fav.opacity + '%';
    currentColor = fav.color;
    currentMainFont = fav.mainFont;
    currentSubFont = fav.subFont;

    // Update select dropdowns for fonts
    const mainSelect = document.getElementById('fontMainSelect');
    const subSelect = document.getElementById('fontSubSelect');
    if (mainSelect) mainSelect.value = currentMainFont;
    if (subSelect) subSelect.value = currentSubFont;

    updatePreview();
}

function deleteFavorite(id, event) {
    event.stopPropagation();
    favorites = favorites.filter(f => f.id !== id);
    localStorage.setItem('watermarkFavorites', JSON.stringify(favorites));
    renderFavorites();
}

function showLoading(show) {
    let spinner = document.querySelector('.loading-spinner');
    if (show && !spinner) {
        spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        spinner.innerHTML = '<div class="spinner"></div>';
        document.body.appendChild(spinner);
    } else if (!show && spinner) {
        spinner.remove();
    }
}

function buildGallery() {
    const container = document.getElementById('galleryContainer');
    const styleNames = [
        'Logo + Divider', 'Rotated Diagonal', 'Corner Positioned', 'Circle Border', 'Vertical Text', 'Minimal Line', 'Lines Sandwich', 'Signature Style', 'Border Box', 'Dots Pattern',
        'Two-Part', 'Horizontal Stripes', 'Diamond Shape', 'Main + Subtitle', 'Italic Corner', 'Bold Uppercase', 'Ornament Deco', 'Text + Accent',
        'Floating Refined', 'Corner Elegant', 'Brushstroke', 'Modern Stacked', 'Vintage Border', 'Geometric Modern', 'Serif Elegance', 'Minimal Dots',
        'Gradient Fade', 'Ornate Detail', 'Monogram Style', 'Contemporary Line',
        'Gold Elegance', 'Green Serif', 'Gold Divider', 'Dark Green', 'Gold Corner Right', 'Green Corner Left', 'Gold Top', 'Green Minimal', 'Gold Corner Frame', 'Luxury Green',
        'Gold Center Art', 'Green Accent', 'Gold Green Mix', 'Accent Border', 'Gold Premium', 'Two-Tone Border', 'Side Accent', 'Minimal Gold', 'Corner Gold Green', 'Gradient Green Gold'
    ];
    
    allStyles.forEach(i => {
        const div = document.createElement('div');
        div.className = 'watermark-demo';
        
        let watermarkHTML = '';
        if (watermarkTemplates[i]) {
            // Pass complementary secondary color for gallery preview
            const secondaryColor = getComplementaryColor('var(--deep-green)');
            watermarkHTML = watermarkTemplates[i].html('Kool D', 'Studio', 'Est. 2025', 'var(--deep-green)', 'Playfair', secondaryColor);
        } else {
            watermarkHTML = `<div class="watermark-style-${i}" style="color:var(--deep-green);"><div style="font-size:14px;font-weight:600;">Style ${i}</div></div>`;
        }
        
        div.innerHTML = `
            <div class="demo-title">${String(i).padStart(2, '0')}. ${styleNames[i-1] || 'Custom'}</div>
            <div class="demo-frame" onclick="document.getElementById('styleSelect').value = '${i}'; updatePreview(); document.querySelector('.editor-section').scrollIntoView({behavior:'smooth'});">
                ${watermarkHTML}
            </div>
        `;
        container.appendChild(div);
    });
}

function renderFontLibrary() {
    const mainSelect = document.getElementById('fontMainSelect');
    if (!mainSelect) return;
    mainSelect.innerHTML = '';
    fontLibrary.forEach((font) => {
        const option = document.createElement('option');
        option.value = font.key;
        option.textContent = font.name;
        option.selected = font.key === currentMainFont;
        mainSelect.appendChild(option);
    });
    mainSelect.addEventListener('change', (e) => {
        applyMainFont(e.target.value, e);
    });

    const subSelect = document.getElementById('fontSubSelect');
    if (!subSelect) return;
    subSelect.innerHTML = '';
    fontLibrary.forEach((font) => {
        const option = document.createElement('option');
        option.value = font.key;
        option.textContent = font.name;
        option.selected = font.key === currentSubFont;
        subSelect.appendChild(option);
    });
    subSelect.addEventListener('change', (e) => {
        applySubFont(e.target.value, e);
    });
}





// --- EVENT LISTENERS ---
document.addEventListener('DOMContentLoaded', () => {
    // Populate style select
    const styleSelect = document.getElementById('styleSelect');
    if (!styleSelect) {
        console.error('styleSelect not found');
        return;
    }

    const styleNames = [
        'Logo + Divider', 'Rotated Diagonal', 'Corner Positioned', 'Circle Border', 'Vertical Text', 'Minimal Line', 'Lines Sandwich', 'Signature Style', 'Border Box', 'Dots Pattern',
        'Two-Part', 'Horizontal Stripes', 'Diamond Shape', 'Main + Subtitle', 'Italic Corner', 'Bold Uppercase', 'Ornament Deco', 'Text + Accent',
        'Floating Refined', 'Corner Elegant', 'Brushstroke', 'Modern Stacked', 'Vintage Border', 'Geometric Modern', 'Serif Elegance', 'Minimal Dots',
        'Gradient Fade', 'Ornate Detail', 'Monogram Style', 'Contemporary Line'
    ];
    allStyles.forEach(i => {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = String(i).padStart(2, '0') + ': ' + styleNames[i-1];
        styleSelect.appendChild(opt);
    });

    // Color picker controls - IMPORTANT: Move this BEFORE other listeners
    const colorPicker = document.getElementById('colorPicker');
    const colorInput = document.getElementById('colorInput');
    
    if (colorPicker && colorInput) {
        const handleColorChange = (newColor) => {
            currentColor = newColor;
            currentSecondaryColor = getComplementaryColor(newColor);
            colorPicker.value = newColor;
            colorInput.value = newColor;
            updateColorSwatches();
            updatePreview();
        };
        
        colorPicker.addEventListener('change', (e) => {
            handleColorChange(e.target.value);
        });
        colorPicker.addEventListener('input', (e) => {
            handleColorChange(e.target.value);
        });
        
        colorInput.addEventListener('input', (e) => {
            let colorValue = e.target.value.trim();
            if (colorValue === '') return;
            if (!colorValue.startsWith('#')) {
                colorValue = '#' + colorValue;
            }
            if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(colorValue)) {
                handleColorChange(colorValue);
            }
        });
        
        colorInput.addEventListener('blur', (e) => {
            let colorValue = e.target.value.trim();
            if (!colorValue.startsWith('#')) {
                colorValue = '#' + colorValue;
            }
            if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(colorValue)) {
                handleColorChange(colorValue);
            } else {
                colorInput.value = currentColor;
            }
        });
    }

    // Bind top-level controls
    styleSelect.addEventListener('change', updatePreview);
    
    const line1Input = document.getElementById('line1Input');
    const line2Input = document.getElementById('line2Input');
    const line3Input = document.getElementById('line3Input');
    const opacitySlider = document.getElementById('opacitySlider');
    const customColor = document.getElementById('customColor');

    
    if (line1Input) line1Input.addEventListener('input', updatePreview);
    if (line2Input) line2Input.addEventListener('input', updatePreview);
    if (line3Input) line3Input.addEventListener('input', updatePreview);
    
    // Fallback: add event listeners with delayed check
    setTimeout(() => {
        const delayedLine1 = document.getElementById('line1Input');
        const delayedLine2 = document.getElementById('line2Input');
        const delayedLine3 = document.getElementById('line3Input');
        
        if (delayedLine1 && !delayedLine1.hasListener) {
            delayedLine1.addEventListener('input', updatePreview);
            delayedLine1.hasListener = true;
        }
        if (delayedLine2 && !delayedLine2.hasListener) {
            delayedLine2.addEventListener('input', updatePreview);
            delayedLine2.hasListener = true;
        }
        if (delayedLine3 && !delayedLine3.hasListener) {
            delayedLine3.addEventListener('input', updatePreview);
            delayedLine3.hasListener = true;
        }
    }, 100);
    
    if (opacitySlider) {
        opacitySlider.addEventListener('input', (e) => {
            const opacityValue = document.getElementById('opacityValue');
            if (opacityValue) opacityValue.textContent = e.target.value + '%';
            updatePreview();
        });
    }
    
    if (customColor) {
        customColor.addEventListener('change', (e) => {
            setTextColor(e.target.value, e);
        });
    }



    // Bind buttons
    const btnPrimary = document.querySelector('.btn-primary');
    const btnSecondary = document.querySelector('.btn-secondary');
    const btnCopy = document.querySelector('.btn-copy');
    const btnStar = document.querySelector('.btn-star');
    
    if (btnPrimary) btnPrimary.addEventListener('click', downloadWatermark);
    if (btnSecondary) btnSecondary.addEventListener('click', resetPreview);
    if (btnCopy) btnCopy.addEventListener('click', copyWatermarkConfig);
    if (btnStar) btnStar.addEventListener('click', saveFavorite);



    // Check for configuration in URL
    const urlParams = new URLSearchParams(window.location.search);
    const configParam = urlParams.get('config');
    if (configParam) {
        try {
            const decodedConfig = atob(configParam);
            const config = JSON.parse(decodedConfig);
            applyConfiguration(config);
        } catch (error) {
            console.error('Failed to parse config from URL:', error);
            if (typeof modal !== 'undefined') {
                modal.error('Cấu hình trong URL không hợp lệ.', 'Lỗi');
            }
        }
    }


    // Initial setup
    renderFontLibrary();
    buildGallery();
    renderFavorites();
    currentColor = '#1a1a1a';
    currentSecondaryColor = getComplementaryColor(currentColor);
    
    // Set default opacity to 100%
    const initialOpacitySlider = document.getElementById('opacitySlider');
    const initialOpacityValue = document.getElementById('opacityValue');
    if (initialOpacitySlider) {
        initialOpacitySlider.value = 100;
    }
    if (initialOpacityValue) {
        initialOpacityValue.textContent = '100%';
    }
    
    updateColorSwatches();
    updatePreview();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            if (e.key === 's') {
                e.preventDefault();
                downloadWatermark();
            }
            if (e.key === 'r') {
                e.preventDefault();
                resetPreview();
            }
        }
    });
});

// Accordion toggle function
function toggleAccordion(header) {
    const content = header.nextElementSibling;
    const isActive = content.classList.contains('active');
    
    // Close all other accordions
    document.querySelectorAll('.accordion-content.active').forEach(c => {
        c.classList.remove('active');
        c.previousElementSibling.classList.remove('active');
    });
    
    // Toggle current
    if (!isActive) {
        content.classList.add('active');
        header.classList.add('active');
    }
}

