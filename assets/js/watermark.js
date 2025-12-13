
let currentColor = 'var(--deep-green)';
let currentMainFont = 'Playfair';
let currentSubFont = 'Montserrat';
let favorites = JSON.parse(localStorage.getItem('watermarkFavorites')) || [];
let allStyles = Array.from({length: 40}, (_, i) => i + 1);

function applyMainFont(fontKey, event) {
    currentMainFont = fontKey;
    document.querySelectorAll('.font-main-item').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    updatePreview();
}

function applySubFont(fontKey, event) {
    currentSubFont = fontKey;
    document.querySelectorAll('.font-sub-item').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    updatePreview();
}

function applyColorPalette(paletteName) {
    const palette = colorPalettes[paletteName];
    currentColor = palette.primary;

    document.documentElement.style.setProperty('--deep-green', palette.primary);
    document.documentElement.style.setProperty('--soft-gold', palette.secondary);
    document.documentElement.style.setProperty('--cream', palette.tertiary);

    // Set active palette button
    document.querySelectorAll('.color-palette-btn').forEach(b => b.classList.remove('active'));
    const activePaletteBtn = document.querySelector(`.color-palette-btn[data-palette="${paletteName}"]`);
    if (activePaletteBtn) activePaletteBtn.classList.add('active');
    
    updatePreview();
}

function setTextColor(c, event) {
    currentColor = c;
    document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
    if (event && event.target) {
        event.target.classList.add('active');
    }
    updatePreview();
}

function updatePreview() {
    const styleId = document.getElementById('styleSelect').value;
    const l1 = document.getElementById('line1Input')?.value || 'Kool D.';
    const l2 = document.getElementById('line2Input')?.value || 'Studio';
    const l3 = document.getElementById('line3Input')?.value || 'Est. 2025';
    const opacitySlider = document.getElementById('opacitySlider');
    const opacity = opacitySlider ? opacitySlider.value / 100 : 0.6;

    const template = watermarkTemplates[styleId];
    if (!template) return;

    const preview = document.getElementById('watermarkPreview');
    if (!preview) return;

    preview.innerHTML = template.html(l1, l2, l3, currentColor, currentMainFont); 
    
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

    preview.style.opacity = opacity;
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
    if (opacitySlider) opacitySlider.value = 80;
    if (opacityValue) opacityValue.textContent = '80%';
    
    currentMainFont = 'Playfair';
    currentSubFont = 'Montserrat';
    
    // Reset to sophisticate palette
    applyColorPalette('sophisticate');

    // Manually set the active buttons for fonts
    document.querySelectorAll('.font-main-item').forEach(b => {
        b.classList.remove('active');
        if (b.dataset.key === currentMainFont) b.classList.add('active');
    });
    document.querySelectorAll('.font-sub-item').forEach(b => {
        b.classList.remove('active');
        if (b.dataset.key === currentSubFont) b.classList.add('active');
    });

    updatePreview();
}

async function downloadWatermark() {
    const styleId = document.getElementById('styleSelect').value;
    const l1 = document.getElementById('line1Input').value || 'Kool D.';
    const l2 = document.getElementById('line2Input').value || 'Studio';
    const l3 = document.getElementById('line3Input').value || 'Est. 2025';

    const template = watermarkTemplates[styleId];
    if (!template) return;

    showLoading(true);

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
        opacity: ${document.getElementById('opacitySlider').value / 100};
    `;
    
    // This is a temporary fix. The templates should be refactored to not need the font parameter.
    tempContainer.innerHTML = template.html(l1, l2, l3, currentColor, currentMainFont);
    const line1El = tempContainer.querySelector('.line1');
    if (line1El) line1El.style.fontFamily = getFontFamily(currentMainFont);
    const line2El = tempContainer.querySelector('.line2');
    if (line2El) line2El.style.fontFamily = getFontFamily(currentSubFont);

    document.body.appendChild(tempContainer);

    try {
        const canvas = await html2canvas(tempContainer, { 
            backgroundColor: null, 
            scale: 3, 
            useCORS: true, 
            logging: false 
        });
        canvas.toBlob(blob => {
            const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
            saveAs(blob, `watermark-${ts}.png`);
            showLoading(false);
        });
    } catch (error) {
        alert('Lỗi: ' + error.message);
        showLoading(false);
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
    navigator.clipboard.writeText(config).then(() => alert('✅ Copied!'));
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

    // Manually set active buttons
     document.querySelectorAll('.font-main-item').forEach(b => {
        b.classList.toggle('active', b.dataset.key === currentMainFont);
    });
    document.querySelectorAll('.font-sub-item').forEach(b => {
        b.classList.toggle('active', b.dataset.key === currentSubFont);
    });

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
        'Classic', 'Modern', 'Elegant', 'Bold', 'Minimal', 'Artistic', 'Luxury', 'Fresh', 'Vintage', 'Professional',
        'Glamour', 'Soft', 'Vibrant', 'Minimalist', 'Ornate', 'Simple', 'Romantic', 'Modern Pro', 'Artistic Chic', 'Studio',
        'Serif', 'Corner', 'Bottom', 'Italic', 'Modern Gold', 'Decorative', 'Classic Frame', 'Center', 'Bold Text', 'Premium',
        'Side Accent', 'Floral', 'Oval Badge', 'Subtitle', 'Modern Plus', 'Top Badge', 'Side Text', 'Gold Mark', 'Elegant Plus', 'Heritage'
    ];
    
    allStyles.forEach(i => {
        const div = document.createElement('div');
        div.className = 'watermark-demo';
        
        let watermarkHTML = '';
        if (watermarkTemplates[i]) {
            // The 'f' parameter is unused but required by the template function signature.
            watermarkHTML = watermarkTemplates[i].html('Kool D', 'Studio', 'Est. 2025', 'var(--deep-green)', 'Playfair');
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
    const mainContainer = document.getElementById('fontMainTab');
    if (!mainContainer) return;
    mainContainer.innerHTML = '';
    fontLibrary.forEach((font) => {
        const btn = document.createElement('button');
        btn.className = `font-main-item feeling-btn ${font.key === currentMainFont ? 'active' : ''}`;
        btn.textContent = font.name.split(' ')[0]; // Compact: first word only
        btn.dataset.key = font.key;
        btn.title = font.name; // Full name in tooltip
        btn.style.fontFamily = getFontFamily(font.key);
        btn.style.fontSize = '11px';
        btn.onclick = (e) => applyMainFont(font.key, e);
        mainContainer.appendChild(btn);
    });

    const subContainer = document.getElementById('fontSubTab');
    if (!subContainer) return;
    subContainer.innerHTML = '';
    fontLibrary.forEach((font) => {
        const btn = document.createElement('button');
        btn.className = `font-sub-item feeling-btn ${font.key === currentSubFont ? 'active' : ''}`;
        btn.textContent = font.name.split(' ')[0]; // Compact: first word only
        btn.dataset.key = font.key;
        btn.title = font.name; // Full name in tooltip
        btn.style.fontFamily = getFontFamily(font.key);
        btn.style.fontSize = '11px';
        btn.onclick = (e) => applySubFont(font.key, e);
        subContainer.appendChild(btn);
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
        'Center Elegant', 'Diagonal', 'Corner', 'Circle', 'Minimal', 'Banner', 'Text', 'Divider', 'Signature', 'Geometric',
        'Premium', 'Abstract', 'Split', 'Vertical', 'Classic', 'Modern', 'Wave', 'Stripe', 'Diamond', 'Ornament',
        'Serif', 'Geo', 'Ultra', 'Flowing', 'Bold', 'Double', 'Badge', 'Vintage', 'Modern Bold', 'Display',
        'Side', 'Deco', 'Rounded', 'Artistic', 'Underline', 'Badge Top', 'Corner', 'Modern', 'Serif 2', 'Premium 2'
    ];
    allStyles.forEach(i => {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = String(i).padStart(2, '0') + ': ' + styleNames[i-1];
        styleSelect.appendChild(opt);
    });

    // Populate color palettes
    const paletteGroup = document.getElementById('paletteGroup');
    if (paletteGroup) {
        Object.keys(colorPalettes).forEach(key => {
            const btn = document.createElement('button');
            btn.className = `color-palette-btn font-btn ${key === 'classic' ? 'active' : ''}`;
            btn.textContent = colorPalettes[key].name;
            btn.dataset.palette = key;
            btn.onclick = () => applyColorPalette(key);
            paletteGroup.appendChild(btn);
        });
    }

    // Bind top-level controls
    styleSelect.addEventListener('change', updatePreview);
    
    const line1Input = document.getElementById('line1Input');
    const line2Input = document.getElementById('line2Input');
    const line3Input = document.getElementById('line3Input');
    const opacitySlider = document.getElementById('opacitySlider');
    const customColor = document.getElementById('customColor');
    const fontMainSelect = document.getElementById('fontMainSelect');
    const fontSubSelect = document.getElementById('fontSubSelect');
    
    if (line1Input) line1Input.addEventListener('input', updatePreview);
    if (line2Input) line2Input.addEventListener('input', updatePreview);
    if (line3Input) line3Input.addEventListener('input', updatePreview);
    
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

    // Font dropdown support
    if (fontMainSelect) {
        fontLibrary.forEach((font) => {
            const opt = document.createElement('option');
            opt.value = font.key;
            opt.textContent = font.name;
            fontMainSelect.appendChild(opt);
        });
        fontMainSelect.value = currentMainFont;
        fontMainSelect.addEventListener('change', (e) => {
            currentMainFont = e.target.value;
            updatePreview();
        });
    }

    if (fontSubSelect) {
        fontLibrary.forEach((font) => {
            const opt = document.createElement('option');
            opt.value = font.key;
            opt.textContent = font.name;
            fontSubSelect.appendChild(opt);
        });
        fontSubSelect.value = currentSubFont;
        fontSubSelect.addEventListener('change', (e) => {
            currentSubFont = e.target.value;
            updatePreview();
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

    // Initial setup
    renderFontLibrary();
    buildGallery();
    renderFavorites();
    applyColorPalette('sophisticate');
    updatePreview();
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

