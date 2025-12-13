// 40 Art & Elegant Watermark Styles
const WATERMARK_STYLES = [
    // Elegant Minimalist Series (1-8)
    {
        id: 1,
        name: 'Playfair Center',
        fontFamily: 'Playfair Display',
        fontSize: 120,
        fontColor: '#D4AF37',
        opacity: 0.9,
        position: 'center',
        letterSpacing: 3
    },
    {
        id: 2,
        name: 'Playfair Right',
        fontFamily: 'Playfair Display',
        fontSize: 100,
        fontColor: '#B8860B',
        opacity: 0.85,
        position: 'center-right',
        letterSpacing: 2
    },
    {
        id: 3,
        name: 'Playfair Bottom',
        fontFamily: 'Playfair Display',
        fontSize: 90,
        fontColor: '#C0A080',
        opacity: 0.8,
        position: 'bottom-right',
        letterSpacing: 2
    },
    {
        id: 4,
        name: 'Montserrat Thin',
        fontFamily: 'Montserrat',
        fontSize: 80,
        fontColor: '#E8E8E8',
        opacity: 0.7,
        position: 'center',
        fontWeight: '300',
        letterSpacing: 4
    },
    {
        id: 5,
        name: 'Cormorant Luxury',
        fontFamily: 'Cormorant Garamond',
        fontSize: 130,
        fontColor: '#D4AF37',
        opacity: 0.88,
        position: 'center',
        letterSpacing: 5
    },
    {
        id: 6,
        name: 'EB Garamond Elite',
        fontFamily: 'EB Garamond',
        fontSize: 110,
        fontColor: '#C9A961',
        opacity: 0.85,
        position: 'center',
        letterSpacing: 3
    },
    {
        id: 7,
        name: 'Lora Sophisticated',
        fontFamily: 'Lora',
        fontSize: 95,
        fontColor: '#D4AF37',
        opacity: 0.82,
        position: 'center-bottom',
        letterSpacing: 2
    },
    {
        id: 8,
        name: 'Montserrat Minimal',
        fontFamily: 'Montserrat',
        fontSize: 70,
        fontColor: '#FFFFFF',
        opacity: 0.75,
        position: 'center',
        fontWeight: '600',
        letterSpacing: 3
    },
    
    // Corner Elegant Series (9-16)
    {
        id: 9,
        name: 'Top Left Gold',
        fontFamily: 'Playfair Display',
        fontSize: 85,
        fontColor: '#D4AF37',
        opacity: 0.8,
        position: 'top-left',
        letterSpacing: 2
    },
    {
        id: 10,
        name: 'Top Right Gold',
        fontFamily: 'Playfair Display',
        fontSize: 85,
        fontColor: '#D4AF37',
        opacity: 0.8,
        position: 'top-right',
        letterSpacing: 2
    },
    {
        id: 11,
        name: 'Bottom Left Silver',
        fontFamily: 'Cormorant Garamond',
        fontSize: 90,
        fontColor: '#E8E8E8',
        opacity: 0.75,
        position: 'bottom-left',
        letterSpacing: 3
    },
    {
        id: 12,
        name: 'Bottom Right Silver',
        fontFamily: 'Cormorant Garamond',
        fontSize: 90,
        fontColor: '#E8E8E8',
        opacity: 0.75,
        position: 'bottom-right',
        letterSpacing: 3
    },
    {
        id: 13,
        name: 'Top Center Subtle',
        fontFamily: 'Montserrat',
        fontSize: 65,
        fontColor: '#C0A080',
        opacity: 0.65,
        position: 'top-center',
        letterSpacing: 3
    },
    {
        id: 14,
        name: 'Bottom Center Bold',
        fontFamily: 'Playfair Display',
        fontSize: 100,
        fontColor: '#D4AF37',
        opacity: 0.85,
        position: 'bottom-center',
        letterSpacing: 3
    },
    {
        id: 15,
        name: 'Left Side Vertical',
        fontFamily: 'EB Garamond',
        fontSize: 70,
        fontColor: '#D4AF37',
        opacity: 0.8,
        position: 'center-left',
        letterSpacing: 8
    },
    {
        id: 16,
        name: 'Right Side Vertical',
        fontFamily: 'EB Garamond',
        fontSize: 70,
        fontColor: '#D4AF37',
        opacity: 0.8,
        position: 'center-right',
        letterSpacing: 8
    },
    
    // Modern Elegant Series (17-24)
    {
        id: 17,
        name: 'White Soft Glow',
        fontFamily: 'Montserrat',
        fontSize: 85,
        fontColor: '#FFFFFF',
        opacity: 0.7,
        position: 'center',
        fontWeight: '500',
        letterSpacing: 4
    },
    {
        id: 18,
        name: 'Beige Elegant',
        fontFamily: 'Playfair Display',
        fontSize: 100,
        fontColor: '#D4C4B0',
        opacity: 0.8,
        position: 'center',
        letterSpacing: 3
    },
    {
        id: 19,
        name: 'Rose Gold Touch',
        fontFamily: 'Cormorant Garamond',
        fontSize: 105,
        fontColor: '#B76E79',
        opacity: 0.85,
        position: 'center',
        letterSpacing: 3
    },
    {
        id: 20,
        name: 'Champagne Luxury',
        fontFamily: 'EB Garamond',
        fontSize: 110,
        fontColor: '#F0E68C',
        opacity: 0.8,
        position: 'center',
        letterSpacing: 2
    },
    {
        id: 21,
        name: 'Deep Green Subtle',
        fontFamily: 'Lora',
        fontSize: 90,
        fontColor: '#5A7D6D',
        opacity: 0.75,
        position: 'center',
        letterSpacing: 2
    },
    {
        id: 22,
        name: 'Warm Bronze',
        fontFamily: 'Playfair Display',
        fontSize: 100,
        fontColor: '#CD7F32',
        opacity: 0.8,
        position: 'center',
        letterSpacing: 3
    },
    {
        id: 23,
        name: 'Pearl White Sheer',
        fontFamily: 'Montserrat',
        fontSize: 75,
        fontColor: '#FFF8F0',
        opacity: 0.6,
        position: 'center',
        fontWeight: '400',
        letterSpacing: 5
    },
    {
        id: 24,
        name: 'Silver Moonlight',
        fontFamily: 'Cormorant Garamond',
        fontSize: 95,
        fontColor: '#D3D3D3',
        opacity: 0.75,
        position: 'center',
        letterSpacing: 3
    },
    
    // Artistic Series (25-32)
    {
        id: 25,
        name: 'Diagonal Left Top',
        fontFamily: 'Playfair Display',
        fontSize: 95,
        fontColor: '#D4AF37',
        opacity: 0.8,
        position: 'top-left',
        rotation: -15
    },
    {
        id: 26,
        name: 'Diagonal Right Top',
        fontFamily: 'Playfair Display',
        fontSize: 95,
        fontColor: '#D4AF37',
        opacity: 0.8,
        position: 'top-right',
        rotation: 15
    },
    {
        id: 27,
        name: 'Diagonal Right Bottom',
        fontFamily: 'Cormorant Garamond',
        fontSize: 100,
        fontColor: '#E8E8E8',
        opacity: 0.75,
        position: 'bottom-right',
        rotation: -15
    },
    {
        id: 28,
        name: 'Diagonal Left Bottom',
        fontFamily: 'EB Garamond',
        fontSize: 95,
        fontColor: '#D4AF37',
        opacity: 0.8,
        position: 'bottom-left',
        rotation: 15
    },
    {
        id: 29,
        name: 'Centered Elegant Bold',
        fontFamily: 'Playfair Display',
        fontSize: 125,
        fontColor: '#D4AF37',
        opacity: 0.9,
        position: 'center',
        fontWeight: '700'
    },
    {
        id: 30,
        name: 'Script Style Gold',
        fontFamily: 'Cormorant Garamond',
        fontSize: 115,
        fontColor: '#D4AF37',
        opacity: 0.85,
        position: 'center',
        fontStyle: 'italic'
    },
    {
        id: 31,
        name: 'Uppercase Luxury',
        fontFamily: 'Montserrat',
        fontSize: 80,
        fontColor: '#D4AF37',
        opacity: 0.8,
        position: 'center',
        fontWeight: '700',
        textTransform: 'uppercase'
    },
    {
        id: 32,
        name: 'Lowercase Elegant',
        fontFamily: 'Lora',
        fontSize: 90,
        fontColor: '#C0A080',
        opacity: 0.75,
        position: 'center',
        textTransform: 'lowercase',
        letterSpacing: 2
    },
    
    // Premium Series (33-40)
    {
        id: 33,
        name: 'Double Line Gold',
        fontFamily: 'Playfair Display',
        fontSize: 95,
        fontColor: '#D4AF37',
        opacity: 0.85,
        position: 'center',
        lineHeight: 1.8
    },
    {
        id: 34,
        name: 'Platinum Subtle',
        fontFamily: 'EB Garamond',
        fontSize: 100,
        fontColor: '#E5E5E5',
        opacity: 0.7,
        position: 'center',
        letterSpacing: 3
    },
    {
        id: 35,
        name: 'Gold Elegance Center',
        fontFamily: 'Cormorant Garamond',
        fontSize: 120,
        fontColor: '#D4AF37',
        opacity: 0.88,
        position: 'center',
        fontWeight: '600'
    },
    {
        id: 36,
        name: 'Minimal White Right',
        fontFamily: 'Montserrat',
        fontSize: 75,
        fontColor: '#FFFFFF',
        opacity: 0.65,
        position: 'center-right',
        fontWeight: '300'
    },
    {
        id: 37,
        name: 'Cream Luxury Bottom',
        fontFamily: 'Playfair Display',
        fontSize: 105,
        fontColor: '#F5F5DC',
        opacity: 0.8,
        position: 'bottom-center',
        letterSpacing: 3
    },
    {
        id: 38,
        name: 'Champagne Centered',
        fontFamily: 'EB Garamond',
        fontSize: 115,
        fontColor: '#FFD700',
        opacity: 0.85,
        position: 'center',
        fontWeight: '500'
    },
    {
        id: 39,
        name: 'Bronze Heritage',
        fontFamily: 'Lora',
        fontSize: 100,
        fontColor: '#8B4513',
        opacity: 0.8,
        position: 'center',
        letterSpacing: 2
    },
    {
        id: 40,
        name: 'Pearl Elegance',
        fontFamily: 'Cormorant Garamond',
        fontSize: 110,
        fontColor: '#FDEEF4',
        opacity: 0.75,
        position: 'center',
        letterSpacing: 3
    }
];

// Initialize gallery
document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('stylesGallery');
    if (!gallery) return;

    WATERMARK_STYLES.forEach((style, index) => {
        const item = document.createElement('div');
        item.className = 'style-item';
        item.dataset.styleId = style.id;

        const previewDiv = document.createElement('div');
        previewDiv.className = 'style-preview';
        previewDiv.style.backgroundColor = '#000000';
        
        const textSpan = document.createElement('span');
        textSpan.style.fontFamily = `"${style.fontFamily}", sans-serif`;
        textSpan.style.fontSize = `${Math.floor(style.fontSize * 0.2)}px`;
        textSpan.style.color = style.fontColor;
        textSpan.style.opacity = style.opacity;
        textSpan.style.fontWeight = style.fontWeight || '400';
        textSpan.style.letterSpacing = style.letterSpacing ? `${style.letterSpacing * 0.15}px` : '0';
        textSpan.textContent = 'Kool D.';

        const [yAlign, xAlign] = style.position.split('-');
        previewDiv.style.display = 'flex';
        
        switch (yAlign) {
            case 'top': previewDiv.style.alignItems = 'flex-start'; break;
            case 'bottom': previewDiv.style.alignItems = 'flex-end'; break;
            default: previewDiv.style.alignItems = 'center';
        }
        
        switch (xAlign) {
            case 'left': previewDiv.style.justifyContent = 'flex-start'; break;
            case 'right': previewDiv.style.justifyContent = 'flex-end'; break;
            default: previewDiv.style.justifyContent = 'center';
        }

        previewDiv.appendChild(textSpan);
        item.appendChild(previewDiv);

        const label = document.createElement('div');
        label.className = 'style-label';
        label.textContent = style.name;
        item.appendChild(label);

        item.addEventListener('click', () => selectStyle(style));

        if (index === 0) item.classList.add('active');
        gallery.appendChild(item);
    });

    if (WATERMARK_STYLES.length > 0) {
        selectStyle(WATERMARK_STYLES[0]);
    }
});

function selectStyle(style) {
    document.querySelectorAll('.style-item').forEach(item => {
        item.classList.remove('active');
    });
    const activeItem = document.querySelector(`[data-style-id="${style.id}"]`);
    if (activeItem) activeItem.classList.add('active');
    
    if (typeof applyWatermarkStyle === 'function') {
        applyWatermarkStyle(style);
    }
}
