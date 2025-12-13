document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d', { alpha: true });
    const watermarkText = document.getElementById('watermarkText');
    const downloadBtn = document.getElementById('downloadBtn');

    let currentStyle = null;
    let canvasWidth = 1200;
    let canvasHeight = 800;
    let textValue = 'Kool D. Studio';

    function initCanvas() {
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        redraw();
    }

    function redraw() {
        // Clear with transparent background
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!currentStyle) return;

        const style = currentStyle;
        ctx.globalAlpha = style.opacity || 0.9;
        ctx.fillStyle = style.fontColor;
        ctx.font = `${style.fontSize}px "${style.fontFamily}"`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const lines = textValue.split('\n');
        const lineHeight = (style.fontSize || 100) * 1.2;
        const totalHeight = lines.length * lineHeight;

        let x = canvas.width / 2;
        let y = canvas.height / 2;

        // Position calculation
        const pos = style.position || 'center';
        const [vPos, hPos] = pos.split('-');

        if (vPos === 'top') y = 100 + totalHeight / 2;
        else if (vPos === 'bottom') y = canvas.height - 100 - totalHeight / 2;

        if (hPos === 'left') x = 100;
        else if (hPos === 'right') x = canvas.width - 100;

        // Draw text lines
        lines.forEach((line, idx) => {
            const lineY = y + (idx - (lines.length - 1) / 2) * lineHeight;
            ctx.fillText(line || 'Kool D. Studio', x, lineY);
        });

        ctx.globalAlpha = 1;
    }

    watermarkText.addEventListener('input', (e) => {
        textValue = e.target.value || 'Kool D. Studio';
        redraw();
    });

    downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = `watermark_${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });

    // Apply style from gallery
    window.applyWatermarkStyle = function(style) {
        currentStyle = style;
        textValue = style.text || 'Kool D. Studio';
        watermarkText.value = textValue;
        initCanvas();
    };

    // Set default canvas size
    initCanvas();

    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 200);
        });
    }
});