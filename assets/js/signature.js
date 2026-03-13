let currentMainFont = 'Playfair';
let currentSubFont = 'Montserrat';
let favorites = JSON.parse(localStorage.getItem('signatureFavorites')) || [];
let currentBgImage = null;
let currentDesignType = 'watermark';
let currentDesignStyle = 'elegant';
let allSignatures = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

const signatureNames = [
    'Logo + Divider', 'Vertical Stack', 'Compact Corner', 'Circle Border', 'Bold Uppercase', 'Gradient Box', 'Sandwich Lines', 'Script with Line', 'Simple Combo', 'Leaf Pattern',
    'Dancing Script', 'Great Vibes', 'Alex Brush Star', 'Sacramento Flow', 'Tangerine Elegant', 'Allura Script', 'Caveat Handwritten', 'Indie Flower', 'Patrick Hand', 'Amatic Stars'
];

function getFontFamily(fontKey) {
    const font = fontLibrary.find(f => f.key === fontKey);
    return font ? font.family : "'Playfair Display', serif";
}

function getComplementaryColor(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${255 - r}, ${255 - g}, ${255 - b})`;
}

function setDesignStyle(style) {
    currentDesignStyle = style;
    const styleData = designStyles[style];
    if (styleData) {
        currentMainFont = styleData.fonts[0];
        currentSubFont = styleData.fonts[1];
        updateFontSelects();
    }
    
    // Update style buttons
    document.querySelectorAll('.style-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.style === style) {
            btn.classList.add('active');
        }
    });
    
    updatePreview();
}

function updateFontSelects() {
    const mainSelect = document.getElementById('fontMainSelect');
    const subSelect = document.getElementById('fontSubSelect');
    if (mainSelect) mainSelect.value = currentMainFont;
    if (subSelect) subSelect.value = currentSubFont;
}

function handleBgImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            currentBgImage = e.target.result;
            updatePreview();
        };
        reader.readAsDataURL(file);
    }
}

function clearBgImage() {
    currentBgImage = null;
    const input = document.getElementById('bgImageInput');
    if (input) input.value = '';
    updatePreview();
}

function updatePreview() {
    const styleId = document.getElementById('styleSelect')?.value || '1';
    const l1 = document.getElementById('line1Input')?.value || '';
    const l2 = document.getElementById('line2Input')?.value || '';
    const l3 = document.getElementById('line3Input')?.value || '';

    const template = signatureTemplates[styleId];
    if (!template) return;

    const preview = document.getElementById('signaturePreview');
    if (!preview) return;

    if (currentBgImage) {
        preview.style.backgroundImage = `url('${currentBgImage}')`;
        preview.style.backgroundSize = 'cover';
        preview.style.backgroundPosition = 'center';
    } else {
        preview.style.backgroundImage = 'none';
        preview.style.background = 'linear-gradient(135deg, #ffffff 0%, #fafaf8 100%)';
    }

    preview.innerHTML = template.html(l1, l2, l3, '#1a1a1a', currentMainFont, '#eb9500');
}

function randomizeAll() {
    // Random style
    const randomStyle = allSignatures[Math.floor(Math.random() * allSignatures.length)];
    const styleSelect = document.getElementById('styleSelect');
    if (styleSelect) {
        styleSelect.value = randomStyle;
    }
    
    // Random design type
    const types = ['watermark', 'signature'];
    currentDesignType = types[Math.floor(Math.random() * types.length)];
    
    // Random style
    const styles = Object.keys(designStyles);
    const randomStyleKey = styles[Math.floor(Math.random() * styles.length)];
    setDesignStyle(randomStyleKey);
    
    // Random text
    const names = ['Kool D.', 'Studio', 'Design', 'Art', 'Creative', 'Vision'];
    const subtitles = ['Photography', 'Studio', 'Design Co.', 'Art Lab', 'Creative Hub'];
    const years = ['2025', '2024', '2023', 'Est. 2020', 'Since 2020'];
    
    document.getElementById('line1Input').value = names[Math.floor(Math.random() * names.length)];
    document.getElementById('line2Input').value = subtitles[Math.floor(Math.random() * subtitles.length)];
    document.getElementById('line3Input').value = years[Math.floor(Math.random() * years.length)];
    
    // Random size and opacity
    currentSize = Math.floor(Math.random() * 101) + 50; // 50-150
    
    const sizeSlider = document.getElementById('sizeSlider');
    if (sizeSlider) sizeSlider.value = currentSize;
    
    const sizeValue = document.getElementById('sizeValue');
    if (sizeValue) sizeValue.textContent = currentSize + '%';
    
    updatePreview();
}

async function downloadSignature() {
    const styleId = document.getElementById('styleSelect')?.value || '1';
    const l1 = document.getElementById('line1Input').value || '';
    const l2 = document.getElementById('line2Input').value || '';
    const l3 = document.getElementById('line3Input').value || '';

    const template = signatureTemplates[styleId];
    if (!template) {
        console.error('Template not found for style:', styleId);
        return;
    }

    const tempContainer = document.createElement('div');
    tempContainer.style.cssText = `
        width: 600px;
        height: 600px;
        background: transparent;
        position: fixed;
        left: -9999px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 40px;
    `;
    
    tempContainer.innerHTML = template.html(l1, l2, l3, '#1a1a1a', currentMainFont, '#eb9500');
    
    const mainFontFamily = getFontFamily(currentMainFont);
    const subFontFamily = getFontFamily(currentSubFont);
    
    const allTextElements = tempContainer.querySelectorAll('div, span, p');
    allTextElements.forEach(el => {
        const text = el.textContent || '';
        if (text.includes(l1) && l1) {
            el.style.fontFamily = mainFontFamily;
        } else if ((text.includes(l2) && l2) || (text.includes(l3) && l3)) {
            el.style.fontFamily = subFontFamily;
        } else {
            el.style.fontFamily = mainFontFamily;
        }
    });

    document.body.appendChild(tempContainer);

    try {
        await new Promise(resolve => setTimeout(resolve, 300));

        const canvas = await html2canvas(tempContainer, { 
            backgroundColor: null, 
            scale: 4, 
            useCORS: true, 
            logging: false
        });
        
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png', 1.0));

        if (blob) {
            const now = new Date();
            const ts = now.toISOString().replace(/[:.]/g, '-').slice(0, -5);
            const filename = `signature-${ts}.png`;
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
            modal.error('Lỗi khi tải xuống. Vui lòng thử lại.', 'Lỗi');
        }
    } finally {
        document.body.removeChild(tempContainer);
    }
}

function copyShareableLink() {
    const config = {
        styleId: document.getElementById('styleSelect')?.value || '1',
        l1: document.getElementById('line1Input')?.value || '',
        l2: document.getElementById('line2Input')?.value || '',
        l3: document.getElementById('line3Input')?.value || '',
        mainFont: currentMainFont,
        subFont: currentSubFont,
        designType: currentDesignType,
        designStyle: currentDesignStyle
    };
    
    const encodedConfig = btoa(JSON.stringify(config));
    const shareableLink = `${window.location.origin}${window.location.pathname}?config=${encodedConfig}`;
    
    navigator.clipboard.writeText(shareableLink).then(() => {
        if (typeof modal !== 'undefined') {
            modal.info('Link chia sẻ đã được sao chép vào clipboard!', 'Thành công');
        }
    }).catch(() => {
        if (typeof modal !== 'undefined') {
            modal.error('Không thể sao chép link. Vui lòng thử lại.', 'Lỗi');
        }
    });
}


function buildGallery() {
    const container = document.getElementById('galleryContainer');
    if (!container) return;
    
    allSignatures.forEach(i => {
        const div = document.createElement('div');
        div.className = 'signature-demo';
        
        const template = signatureTemplates[i];
        const signatureHTML = template ? template.html('Kool D.', 'Studio', '2025', '#1a1a1a', 'Playfair', '#eb9500') : '';
        
        div.innerHTML = `
            <div class="demo-title">${String(i).padStart(2, '0')}. ${signatureNames[i-1] || 'Custom'}</div>
            <div class="demo-frame" onclick="document.getElementById('styleSelect').value = '${i}'; updatePreview(); document.querySelector('.editor-section').scrollIntoView({behavior:'smooth'});">
                ${signatureHTML}
            </div>
        `;
        container.appendChild(div);
    });
}

function renderFontLibrary() {
    const mainSelect = document.getElementById('fontMainSelect');
    if (!mainSelect) return;
    mainSelect.innerHTML = '';
    
    const groupedFonts = {};
    fontLibrary.forEach((font) => {
        if (!groupedFonts[font.category]) {
            groupedFonts[font.category] = [];
        }
        groupedFonts[font.category].push(font);
    });
    
    Object.keys(groupedFonts).forEach((category) => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = category;
        
        groupedFonts[category].forEach((font) => {
            const option = document.createElement('option');
            option.value = font.key;
            option.textContent = font.name;
            option.selected = font.key === currentMainFont;
            optgroup.appendChild(option);
        });
        
        mainSelect.appendChild(optgroup);
    });
    
    mainSelect.addEventListener('change', (e) => {
        currentMainFont = e.target.value;
        updatePreview();
    });

    const subSelect = document.getElementById('fontSubSelect');
    if (!subSelect) return;
    subSelect.innerHTML = '';
    
    Object.keys(groupedFonts).forEach((category) => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = category;
        
        groupedFonts[category].forEach((font) => {
            const option = document.createElement('option');
            option.value = font.key;
            option.textContent = font.name;
            option.selected = font.key === currentSubFont;
            optgroup.appendChild(option);
        });
        
        subSelect.appendChild(optgroup);
    });
    
    subSelect.addEventListener('change', (e) => {
        currentSubFont = e.target.value;
        updatePreview();
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Populate style select
    const styleSelect = document.getElementById('styleSelect');
    if (styleSelect) {
        allSignatures.forEach(i => {
            const opt = document.createElement('option');
            opt.value = i;
            opt.textContent = String(i).padStart(2, '0') + ': ' + signatureNames[i-1];
            styleSelect.appendChild(opt);
        });
    }

    // Text inputs
    ['line1Input', 'line2Input', 'line3Input'].forEach(id => {
        const input = document.getElementById(id);
        if (input) input.addEventListener('input', updatePreview);
    });
    
    // Background image
    const bgImageInput = document.getElementById('bgImageInput');
    if (bgImageInput) {
        bgImageInput.addEventListener('change', handleBgImageUpload);
    }

    // Download button
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadSignature);
    }
    
    // Share button
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', copyShareableLink);
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            if (e.key === 's') {
                e.preventDefault();
                downloadSignature();
            }
            if (e.key === 'r') {
                e.preventDefault();
                randomizeAll();
            }
        }
    });

    // Initial setup
    renderFontLibrary();
    buildGallery();
    setDesignStyle('elegant');
    updateColorSwatches();
    updatePreview();

    // Check for configuration in URL
    const urlParams = new URLSearchParams(window.location.search);
    const configParam = urlParams.get('config');
    if (configParam) {
        try {
            const decodedConfig = atob(configParam);
            const config = JSON.parse(decodedConfig);
            
            // Apply configuration
            if (config.styleId) document.getElementById('styleSelect').value = config.styleId;
            if (config.l1 !== undefined) document.getElementById('line1Input').value = config.l1;
            if (config.l2 !== undefined) document.getElementById('line2Input').value = config.l2;
            if (config.l3 !== undefined) document.getElementById('line3Input').value = config.l3;
            if (config.mainFont) currentMainFont = config.mainFont;
            if (config.subFont) currentSubFont = config.subFont;
            if (config.designType) currentDesignType = config.designType;
            if (config.designStyle) setDesignStyle(config.designStyle);
            
            updateFontSelects();
            updatePreview();
        } catch (error) {
            console.error('Failed to parse config from URL:', error);
        }
    }
});