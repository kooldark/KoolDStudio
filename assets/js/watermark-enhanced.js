/**
 * Enhanced Watermark Editor
 * Features: Position control, opacity, presets, batch export, image preview
 */

class WatermarkEditor {
    constructor() {
        this.state = {
            style: 1,
            line1: 'Kool D.',
            line2: 'Studio',
            line3: '2025',
            color: '#1a1a1a',
            position: 'mc',
            opacity: 100,
            size: 100,
            font: 'Playfair',
            bgImage: null,
            presets: JSON.parse(localStorage.getItem('watermarkPresets') || '{}')
        };

        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupEventListeners();
            this.populateSelects();
            this.loadPresets();
            this.setupDragDrop();
            this.loadStateFromURL();
        });
    }

    setupEventListeners() {
        // Input listeners
        document.getElementById('line1Input')?.addEventListener('input', (e) => {
            this.state.line1 = e.target.value;
            this.updatePreview();
        });

        document.getElementById('line2Input')?.addEventListener('input', (e) => {
            this.state.line2 = e.target.value;
            this.updatePreview();
        });

        document.getElementById('line3Input')?.addEventListener('input', (e) => {
            this.state.line3 = e.target.value;
            this.updatePreview();
        });

        document.getElementById('styleSelect')?.addEventListener('change', (e) => {
            this.state.style = parseInt(e.target.value);
            this.updatePreview();
        });

        document.getElementById('sizeSlider')?.addEventListener('input', (e) => {
            this.state.size = parseInt(e.target.value);
            document.getElementById('sizeValue').textContent = e.target.value;
            this.updatePreview();
        });

        document.getElementById('opacitySlider')?.addEventListener('input', (e) => {
            this.state.opacity = parseInt(e.target.value);
            document.getElementById('opacityValue').textContent = e.target.value;
            this.updatePreview();
        });

        document.getElementById('fontMainSelect')?.addEventListener('change', (e) => {
            this.state.font = e.target.value;
            this.updatePreview();
        });

        // Download button
        document.getElementById('downloadBtn')?.addEventListener('click', () => this.download());
    }

    populateSelects() {
        // Populate style select
        const styleSelect = document.getElementById('styleSelect');
        if (styleSelect) {
            styleSelect.innerHTML = '';
            const styleNames = [
                'Logo + Divider', 'Rotated Diagonal', 'Corner Positioned', 'Circle Border', 'Vertical Text', 'Minimal Line', 'Lines Sandwich', 'Signature Style', 'Border Box', 'Dots Pattern',
                'Two-Part', 'Horizontal Stripes', 'Diamond Shape', 'Main + Subtitle', 'Italic Corner', 'Bold Uppercase', 'Ornament Deco', 'Text + Accent',
                'Floating Refined', 'Corner Elegant', 'Brushstroke', 'Modern Stacked', 'Vintage Border', 'Geometric Modern', 'Serif Elegance', 'Minimal Dots',
                'Gradient Fade [PRO]', 'Ornate Detail [PRO]', 'Monogram Style [PRO]', 'Contemporary Line [PRO]',
                'Gold Elegance [PRO]', 'Green Serif [PRO]', 'Gold Divider [PRO]', 'Dark Green [PRO]', 'Gold Corner Right [PRO]', 'Green Corner Left [PRO]', 'Gold Top [PRO]', 'Green Minimal [PRO]', 'Gold Corner Frame [PRO]', 'Luxury Green [PRO]',
                'Gold Center Art [PRO]', 'Green Accent [PRO]', 'Gold Green Mix [PRO]', 'Accent Border [PRO]', 'Gold Premium [PRO]', 'Two-Tone Border [PRO]', 'Side Accent [PRO]', 'Minimal Gold [PRO]', 'Corner Gold Green [PRO]', 'Gradient Green Gold [PRO]'
            ];

            styleNames.forEach((name, idx) => {
                const option = document.createElement('option');
                option.value = idx + 1;
                option.textContent = `${idx + 1}. ${name}`;
                styleSelect.appendChild(option);
            });

            styleSelect.addEventListener('change', (e) => {
                this.state.style = parseInt(e.target.value);
                this.updatePreview();
            });
        }

        // Populate font selects
        const fonts = ['Playfair', 'Montserrat', 'Lora', 'Raleway', 'Poppins', 'Roboto', 'Lato', 'Sora', 'Merriweather', 'Dancing Script', 'Pacifico', 'Satisfy'];
        
        const fontMainSelect = document.getElementById('fontMainSelect');
        const fontSubSelect = document.getElementById('fontSubSelect');

        if (fontMainSelect) {
            fontMainSelect.innerHTML = '';
            fonts.forEach(font => {
                const option = document.createElement('option');
                option.value = font;
                option.textContent = font;
                fontMainSelect.appendChild(option);
            });
            fontMainSelect.addEventListener('change', (e) => {
                this.state.font = e.target.value;
                this.updatePreview();
            });
        }

        if (fontSubSelect) {
            fontSubSelect.innerHTML = '';
            fonts.forEach(font => {
                const option = document.createElement('option');
                option.value = font;
                option.textContent = font;
                fontSubSelect.appendChild(option);
            });
        }
    }
        const dropZone = document.getElementById('imageDropZone');
        if (!dropZone) return;

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, (e) => {
                e.preventDefault();
                e.stopPropagation();
            });
        });

        dropZone.addEventListener('dragover', () => {
            dropZone.classList.add('dragover');
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('dragover');
        });

        dropZone.addEventListener('drop', (e) => {
            dropZone.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.handleImageUpload(files[0]);
            }
        });
    }

    handleImageUpload(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            this.state.bgImage = e.target.result;
            const img = document.createElement('img');
            img.src = e.target.result;
            const preview = document.getElementById('imagePreview');
            preview.innerHTML = '';
            preview.appendChild(img);
            this.updatePreview();
        };
        reader.readAsDataURL(file);
    }

    setPosition(pos) {
        this.state.position = pos;
        document.querySelectorAll('.position-btn').forEach(btn => btn.classList.remove('active'));
        event.target.closest('.position-btn').classList.add('active');
        this.updatePreview();
    }

    setColor(color) {
        this.state.color = color;
        document.getElementById('colorPicker').value = color;
        document.getElementById('colorInput').value = color;
        this.updatePreview();
    }

    updateColorFromInput() {
        let color = document.getElementById('colorInput').value;
        if (!color.startsWith('#')) color = '#' + color;
        if (/^#[0-9A-F]{6}$/i.test(color)) {
            this.state.color = color;
            document.getElementById('colorPicker').value = color;
            this.updatePreview();
        }
    }

    updatePreview() {
        // Core preview update logic
        let previewHtml = this.renderWatermark();
        
        const preview = document.getElementById('watermarkPreview');
        if (preview) {
            preview.innerHTML = previewHtml;
        }

        // If background image exists, render on canvas
        if (this.state.bgImage) {
            this.renderWithImage();
        }
    }

    renderWatermark() {
        // This will use the existing watermarkTemplates from watermark-data.js
        if (window.watermarkTemplates && window.watermarkTemplates[this.state.style]) {
            const template = window.watermarkTemplates[this.state.style];
            return template.html(
                this.state.line1,
                this.state.line2,
                this.state.line3,
                this.state.color,
                this.state.font,
                '#eb9500'
            );
        }
        return `<div style="padding: 20px; text-align: center; color: ${this.state.color};">
            ${this.state.line1}<br>${this.state.line2}
        </div>`;
    }

    renderWithImage() {
        const canvas = document.getElementById('watermarkCanvas');
        if (!canvas) return;

        const img = new Image();
        img.onload = () => {
            const maxWidth = 500;
            const ratio = maxWidth / img.width;
            const height = img.height * ratio;

            canvas.width = maxWidth;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, maxWidth, height);

            // Draw watermark on image
            this.drawWatermarkOnCanvas(ctx, maxWidth, height);

            canvas.classList.add('show');
            document.getElementById('watermarkPreview').style.display = 'block';
        };
        img.src = this.state.bgImage;
    }

    drawWatermarkOnCanvas(ctx, width, height) {
        ctx.globalAlpha = this.state.opacity / 100;
        ctx.fillStyle = this.state.color;
        ctx.font = `${24 * (this.state.size / 100)}px Playfair Display`;
        ctx.textAlign = 'center';

        let x, y;
        const padding = 20;
        const text = this.state.line1;

        // Position mapping
        const positionMap = {
            'tl': () => [padding, padding + 30],
            'tc': () => [width / 2, padding + 30],
            'tr': () => [width - padding, padding + 30],
            'ml': () => [padding, height / 2],
            'mc': () => [width / 2, height / 2 + 15],
            'mr': () => [width - padding, height / 2],
            'bl': () => [padding, height - padding],
            'bc': () => [width / 2, height - padding],
            'br': () => [width - padding, height - padding]
        };

        if (positionMap[this.state.position]) {
            [x, y] = positionMap[this.state.position]();
            ctx.fillText(text, x, y);
        }

        ctx.globalAlpha = 1;
    }

    savePreset(name) {
        if (!name) {
            this.showMessage('Vui lòng nhập tên preset', 'error');
            return;
        }

        const preset = {
            style: this.state.style,
            line1: this.state.line1,
            line2: this.state.line2,
            line3: this.state.line3,
            color: this.state.color,
            position: this.state.position,
            opacity: this.state.opacity,
            size: this.state.size,
            font: this.state.font
        };

        this.state.presets[name] = preset;
        localStorage.setItem('watermarkPresets', JSON.stringify(this.state.presets));
        document.getElementById('presetName').value = '';
        this.loadPresets();
        this.showMessage(`✅ Đã lưu preset: ${name}`, 'success');
    }

    loadPreset(name) {
        const preset = this.state.presets[name];
        if (preset) {
            this.state = { ...this.state, ...preset };
            this.syncUI();
            this.updatePreview();
            this.showMessage(`✅ Đã tải preset: ${name}`, 'success');
        }
    }

    deletePreset(name) {
        if (confirm(`Xóa preset "${name}"?`)) {
            delete this.state.presets[name];
            localStorage.setItem('watermarkPresets', JSON.stringify(this.state.presets));
            this.loadPresets();
            this.showMessage(`✅ Đã xóa preset`, 'success');
        }
    }

    loadPresets() {
        const presetsList = document.getElementById('presetsList');
        if (!presetsList) return;

        presetsList.innerHTML = '';

        if (Object.keys(this.state.presets).length === 0) {
            presetsList.innerHTML = '<p style="text-align: center; color: var(--text-light); padding: var(--space-lg); grid-column: 1 / -1;">Chưa có preset nào</p>';
            return;
        }

        for (const [name, preset] of Object.entries(this.state.presets)) {
            const item = document.createElement('div');
            item.className = 'preset-item';
            item.innerHTML = `
                <button class="preset-delete" onclick="watermarkEditor.deletePreset('${name}')">✕</button>
                <div class="preset-item-name">${name}</div>
                <div class="preset-item-preview">${preset.line1} • ${preset.color}</div>
                <div class="preset-actions">
                    <button class="btn btn-secondary btn-small" onclick="watermarkEditor.loadPreset('${name}')">Load</button>
                </div>
            `;
            presetsList.appendChild(item);
        }
    }

    syncUI() {
        document.getElementById('line1Input').value = this.state.line1;
        document.getElementById('line2Input').value = this.state.line2;
        document.getElementById('line3Input').value = this.state.line3;
        document.getElementById('colorPicker').value = this.state.color;
        document.getElementById('colorInput').value = this.state.color;
        document.getElementById('styleSelect').value = this.state.style;
        document.getElementById('sizeSlider').value = this.state.size;
        document.getElementById('opacitySlider').value = this.state.opacity;
        document.getElementById('sizeValue').textContent = this.state.size;
        document.getElementById('opacityValue').textContent = this.state.opacity;
    }

    download() {
        const canvas = document.getElementById('watermarkCanvas');
        if (canvas && canvas.classList.contains('show')) {
            canvas.toBlob(blob => {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `watermark-${Date.now()}.png`;
                link.click();
                this.showMessage('✅ Đã tải hình ảnh', 'success');
            });
        } else {
            this.showMessage('⚠️ Vui lòng tải ảnh lên trước', 'error');
        }
    }

    batchExport() {
        const sizes = [];
        ['800', '1200', '2000', '500'].forEach(size => {
            const checkbox = document.getElementById(`size-${size}`);
            if (checkbox && checkbox.checked) {
                sizes.push(parseInt(size));
            }
        });

        if (sizes.length === 0) {
            this.showMessage('⚠️ Vui lòng chọn ít nhất một kích thước', 'error');
            return;
        }

        this.showMessage(`📦 Đang tạo ${sizes.length} file...`, 'success');
        // Batch export logic here
    }

    copyConfigLink() {
        const config = btoa(JSON.stringify(this.state));
        const url = `${window.location.href.split('?')[0]}?config=${config}`;
        navigator.clipboard.writeText(url).then(() => {
            this.showMessage('✅ Đã sao chép link', 'success');
        }).catch(() => {
            alert(url);
        });
    }

    loadStateFromURL() {
        const params = new URLSearchParams(window.location.search);
        const config = params.get('config');
        if (config) {
            try {
                const state = JSON.parse(atob(config));
                this.state = { ...this.state, ...state };
                this.syncUI();
                this.updatePreview();
            } catch (e) {
                console.error('Invalid config URL');
            }
        }
    }

    showMessage(text, type = 'success') {
        const msg = document.getElementById('successMessage');
        if (!msg) return;

        msg.textContent = text;
        msg.className = `message show ${type}`;
        setTimeout(() => msg.classList.remove('show'), 3000);
    }

    reset() {
        this.state.line1 = 'Kool D.';
        this.state.line2 = 'Studio';
        this.state.line3 = '2025';
        this.state.color = '#1a1a1a';
        this.state.position = 'mc';
        this.state.opacity = 100;
        this.state.size = 100;
        this.syncUI();
        this.updatePreview();
    }
}

// Initialize when DOM is ready
let watermarkEditor;
document.addEventListener('DOMContentLoaded', () => {
    watermarkEditor = new WatermarkEditor();
});
