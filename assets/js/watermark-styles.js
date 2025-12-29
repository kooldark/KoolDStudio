// 40 Watermark Design Styles
const WATERMARK_STYLES = [
    // Style 1-5: Center Elegant
    {
        id: 1,
        name: 'Center Elegant',
        bgColor: '#000000',
        fontColor: '#FFFFFF',
        fontFamily: 'Playfair Display',
        fontSize: 72,
        opacity: 1,
        position: 'center',
        text: 'Kool D.\nSTUDIO'
    },
    {
        id: 2,
        name: 'Center Gold',
        bgColor: '#1a1a1a',
        fontColor: '#EB9500',
        fontFamily: 'Playfair Display',
        fontSize: 64,
        opacity: 0.95,
        position: 'center',
        text: 'Kool D.\nSTUDIO'
    },
    {
        id: 3,
        name: 'Center Light',
        bgColor: '#F5F5F5',
        fontColor: '#2D5A3D',
        fontFamily: 'Playfair Display',
        fontSize: 68,
        opacity: 1,
        position: 'center',
        text: 'Kool D.\nSTUDIO'
    },
    {
        id: 4,
        name: 'Center Minimal',
        bgColor: '#FFFFFF',
        fontColor: '#333333',
        fontFamily: 'Montserrat',
        fontSize: 56,
        opacity: 0.9,
        position: 'center',
        text: 'KOOL D STUDIO'
    },
    {
        id: 5,
        name: 'Center Dark Gold',
        bgColor: '#0D0D0D',
        fontColor: '#D4AF37',
        fontFamily: 'Playfair Display',
        fontSize: 70,
        opacity: 1,
        position: 'center',
        text: 'Kool D.\nSTUDIO'
    },

    // Style 6-10: Bottom Right Corner
    {
        id: 6,
        name: 'Corner Subtle',
        bgColor: '#000000',
        fontColor: '#FFFFFF',
        fontFamily: 'Montserrat',
        fontSize: 24,
        opacity: 0.8,
        position: 'bottom-right',
        text: 'Kool D. Studio'
    },
    {
        id: 7,
        name: 'Corner Gold',
        bgColor: '#1a1a1a',
        fontColor: '#EB9500',
        fontFamily: 'Playfair Display',
        fontSize: 28,
        opacity: 0.85,
        position: 'bottom-right',
        text: 'Kool D.'
    },
    {
        id: 8,
        name: 'Corner Light',
        bgColor: '#F5F5F5',
        fontColor: '#2D5A3D',
        fontFamily: 'Montserrat',
        fontSize: 20,
        opacity: 0.9,
        position: 'bottom-right',
        text: 'Kool D. Studio'
    },
    {
        id: 9,
        name: 'Corner Elegant',
        bgColor: '#FFFFFF',
        fontColor: '#333333',
        fontFamily: 'Playfair Display',
        fontSize: 32,
        opacity: 1,
        position: 'bottom-right',
        text: 'Kool D.'
    },
    {
        id: 10,
        name: 'Corner Premium',
        bgColor: '#0D0D0D',
        fontColor: '#D4AF37',
        fontFamily: 'Playfair Display',
        fontSize: 26,
        opacity: 0.95,
        position: 'bottom-right',
        text: 'Kool D. Studio'
    },

    // Style 11-15: Bottom Left Corner
    {
        id: 11,
        name: 'Left Subtle',
        bgColor: '#000000',
        fontColor: '#FFFFFF',
        fontFamily: 'Montserrat',
        fontSize: 24,
        opacity: 0.8,
        position: 'bottom-left',
        text: 'Kool D. Studio'
    },
    {
        id: 12,
        name: 'Left Gold',
        bgColor: '#1a1a1a',
        fontColor: '#EB9500',
        fontFamily: 'Playfair Display',
        fontSize: 28,
        opacity: 0.85,
        position: 'bottom-left',
        text: 'Kool D.'
    },
    {
        id: 13,
        name: 'Left Light',
        bgColor: '#F5F5F5',
        fontColor: '#2D5A3D',
        fontFamily: 'Montserrat',
        fontSize: 20,
        opacity: 0.9,
        position: 'bottom-left',
        text: 'Kool D. Studio'
    },
    {
        id: 14,
        name: 'Left Elegant',
        bgColor: '#FFFFFF',
        fontColor: '#333333',
        fontFamily: 'Playfair Display',
        fontSize: 32,
        opacity: 1,
        position: 'bottom-left',
        text: 'Kool D.'
    },
    {
        id: 15,
        name: 'Left Premium',
        bgColor: '#0D0D0D',
        fontColor: '#D4AF37',
        fontFamily: 'Playfair Display',
        fontSize: 26,
        opacity: 0.95,
        position: 'bottom-left',
        text: 'Kool D. Studio'
    },

    // Style 16-20: Top Center
    {
        id: 16,
        name: 'Top Minimal',
        bgColor: '#000000',
        fontColor: '#FFFFFF',
        fontFamily: 'Montserrat',
        fontSize: 28,
        opacity: 0.85,
        position: 'top-center',
        text: 'KOOL D STUDIO'
    },
    {
        id: 17,
        name: 'Top Classic',
        bgColor: '#1a1a1a',
        fontColor: '#FFFFFF',
        fontFamily: 'Playfair Display',
        fontSize: 36,
        opacity: 1,
        position: 'top-center',
        text: 'Kool D. Studio'
    },
    {
        id: 18,
        name: 'Top Gold',
        bgColor: '#0D0D0D',
        fontColor: '#EB9500',
        fontFamily: 'Playfair Display',
        fontSize: 32,
        opacity: 0.9,
        position: 'top-center',
        text: 'Kool D. Studio'
    },
    {
        id: 19,
        name: 'Top Light',
        bgColor: '#FFFEF5',
        fontColor: '#2D5A3D',
        fontFamily: 'Montserrat',
        fontSize: 24,
        opacity: 0.95,
        position: 'top-center',
        text: 'KOOL D STUDIO'
    },
    {
        id: 20,
        name: 'Top Premium',
        bgColor: '#1a1a1a',
        fontColor: '#D4AF37',
        fontFamily: 'Playfair Display',
        fontSize: 40,
        opacity: 1,
        position: 'top-center',
        text: 'Kool D. Studio'
    },

    // Style 21-25: Top Right
    {
        id: 21,
        name: 'TR Minimal',
        bgColor: '#000000',
        fontColor: '#FFFFFF',
        fontFamily: 'Montserrat',
        fontSize: 18,
        opacity: 0.8,
        position: 'top-right',
        text: 'Kool D. Studio'
    },
    {
        id: 22,
        name: 'TR Elegant',
        bgColor: '#1a1a1a',
        fontColor: '#FFFFFF',
        fontFamily: 'Playfair Display',
        fontSize: 22,
        opacity: 0.85,
        position: 'top-right',
        text: 'Kool D.'
    },
    {
        id: 23,
        name: 'TR Gold',
        bgColor: '#0D0D0D',
        fontColor: '#EB9500',
        fontFamily: 'Playfair Display',
        fontSize: 20,
        opacity: 0.9,
        position: 'top-right',
        text: 'Kool D. Studio'
    },
    {
        id: 24,
        name: 'TR Light',
        bgColor: '#FFFFFF',
        fontColor: '#333333',
        fontFamily: 'Montserrat',
        fontSize: 16,
        opacity: 0.95,
        position: 'top-right',
        text: 'Kool D. Studio'
    },
    {
        id: 25,
        name: 'TR Premium',
        bgColor: '#1a1a1a',
        fontColor: '#D4AF37',
        fontFamily: 'Playfair Display',
        fontSize: 24,
        opacity: 1,
        position: 'top-right',
        text: 'Kool D. Studio'
    },

    // Style 26-30: Top Left
    {
        id: 26,
        name: 'TL Minimal',
        bgColor: '#000000',
        fontColor: '#FFFFFF',
        fontFamily: 'Montserrat',
        fontSize: 18,
        opacity: 0.8,
        position: 'top-left',
        text: 'Kool D. Studio'
    },
    {
        id: 27,
        name: 'TL Elegant',
        bgColor: '#1a1a1a',
        fontColor: '#FFFFFF',
        fontFamily: 'Playfair Display',
        fontSize: 22,
        opacity: 0.85,
        position: 'top-left',
        text: 'Kool D.'
    },
    {
        id: 28,
        name: 'TL Gold',
        bgColor: '#0D0D0D',
        fontColor: '#EB9500',
        fontFamily: 'Playfair Display',
        fontSize: 20,
        opacity: 0.9,
        position: 'top-left',
        text: 'Kool D. Studio'
    },
    {
        id: 29,
        name: 'TL Light',
        bgColor: '#FFFFFF',
        fontColor: '#333333',
        fontFamily: 'Montserrat',
        fontSize: 16,
        opacity: 0.95,
        position: 'top-left',
        text: 'Kool D. Studio'
    },
    {
        id: 30,
        name: 'TL Premium',
        bgColor: '#1a1a1a',
        fontColor: '#D4AF37',
        fontFamily: 'Playfair Display',
        fontSize: 24,
        opacity: 1,
        position: 'top-left',
        text: 'Kool D. Studio'
    },

    // Style 31-35: Center Left
    {
        id: 31,
        name: 'CL Minimal',
        bgColor: '#000000',
        fontColor: '#FFFFFF',
        fontFamily: 'Montserrat',
        fontSize: 32,
        opacity: 0.85,
        position: 'center-left',
        text: 'Kool D.\nSTUDIO'
    },
    {
        id: 32,
        name: 'CL Elegant',
        bgColor: '#1a1a1a',
        fontColor: '#FFFFFF',
        fontFamily: 'Playfair Display',
        fontSize: 48,
        opacity: 0.9,
        position: 'center-left',
        text: 'Kool D.'
    },
    {
        id: 33,
        name: 'CL Gold',
        bgColor: '#0D0D0D',
        fontColor: '#EB9500',
        fontFamily: 'Playfair Display',
        fontSize: 44,
        opacity: 0.95,
        position: 'center-left',
        text: 'Kool D.\nSTUDIO'
    },
    {
        id: 34,
        name: 'CL Light',
        bgColor: '#FFFEF5',
        fontColor: '#2D5A3D',
        fontFamily: 'Montserrat',
        fontSize: 40,
        opacity: 1,
        position: 'center-left',
        text: 'KOOL D'
    },
    {
        id: 35,
        name: 'CL Premium',
        bgColor: '#1a1a1a',
        fontColor: '#D4AF37',
        fontFamily: 'Playfair Display',
        fontSize: 52,
        opacity: 1,
        position: 'center-left',
        text: 'Kool D.'
    },

    // Style 36-40: Center Right
    {
        id: 36,
        name: 'CR Minimal',
        bgColor: '#000000',
        fontColor: '#FFFFFF',
        fontFamily: 'Montserrat',
        fontSize: 32,
        opacity: 0.85,
        position: 'center-right',
        text: 'Kool D.\nSTUDIO'
    },
    {
        id: 37,
        name: 'CR Elegant',
        bgColor: '#1a1a1a',
        fontColor: '#FFFFFF',
        fontFamily: 'Playfair Display',
        fontSize: 48,
        opacity: 0.9,
        position: 'center-right',
        text: 'Kool D.'
    },
    {
        id: 38,
        name: 'CR Gold',
        bgColor: '#0D0D0D',
        fontColor: '#EB9500',
        fontFamily: 'Playfair Display',
        fontSize: 44,
        opacity: 0.95,
        position: 'center-right',
        text: 'Kool D.\nSTUDIO'
    },
    {
        id: 39,
        name: 'CR Light',
        bgColor: '#FFFEF5',
        fontColor: '#2D5A3D',
        fontFamily: 'Montserrat',
        fontSize: 40,
        opacity: 1,
        position: 'center-right',
        text: 'KOOL D'
    },
    {
        id: 40,
        name: 'CR Premium',
        bgColor: '#1a1a1a',
        fontColor: '#D4AF37',
        fontFamily: 'Playfair Display',
        fontSize: 52,
        opacity: 1,
        position: 'center-right',
        text: 'Kool D.'
    }
];

// Initialize gallery when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('stylesGallery');
    if (!gallery) return;

    WATERMARK_STYLES.forEach((style, index) => {
        const item = document.createElement('div');
        item.className = 'style-item';
        item.dataset.styleId = style.id;

        // Create preview div
        const previewDiv = document.createElement('div');
        previewDiv.className = 'style-preview';
        previewDiv.style.backgroundColor = style.bgColor;
        
        // Create text span
        const textSpan = document.createElement('span');
        textSpan.style.fontFamily = `"${style.fontFamily}", sans-serif`;
        textSpan.style.fontSize = `${Math.floor(style.fontSize * 0.22)}px`; // Adjusted for better visibility
        textSpan.style.color = style.fontColor;
        textSpan.style.opacity = style.opacity;
        textSpan.style.whiteSpace = 'pre-wrap'; // To respect newline characters
        textSpan.style.fontWeight = '600'; // Better visibility
        textSpan.textContent = style.text;

        // Apply alignment based on position
        const [yAlign, xAlign] = style.position.split('-');
        previewDiv.style.display = 'flex';
        
        switch (yAlign) {
            case 'top':
                previewDiv.style.alignItems = 'flex-start';
                textSpan.style.paddingTop = '15%';
                break;
            case 'bottom':
                previewDiv.style.alignItems = 'flex-end';
                textSpan.style.paddingBottom = '15%';
                break;
            default: // center
                previewDiv.style.alignItems = 'center';
        }
        
        switch (xAlign) {
            case 'left':
                previewDiv.style.justifyContent = 'flex-start';
                textSpan.style.paddingLeft = '15%';
                break;
            case 'right':
                previewDiv.style.justifyContent = 'flex-end';
                textSpan.style.paddingRight = '15%';
                break;
            default: // center
                previewDiv.style.justifyContent = 'center';
        }

        previewDiv.appendChild(textSpan);

        // Create item HTML
        item.innerHTML = `
            ${previewDiv.outerHTML}
            <div class="style-label">${style.name}</div>
        `;

        // Add click handler
        item.addEventListener('click', () => {
            selectStyle(style);
        });

        // Select first style by default
        if (index === 0) {
            item.classList.add('active');
        }

        gallery.appendChild(item);
    });

    // Select first style by default if not already done
    if (WATERMARK_STYLES.length > 0) {
        selectStyle(WATERMARK_STYLES[0]);
    }
});

function selectStyle(style) {
    // Update gallery selection
    document.querySelectorAll('.style-item').forEach(item => {
        item.classList.remove('active');
    });
    const activeItem = document.querySelector(`[data-style-id="${style.id}"]`);
    if (activeItem) {
        activeItem.classList.add('active');
    }

    // Apply style to watermark tool
    if (typeof applyWatermarkStyle === 'function') {
        applyWatermarkStyle(style);
    }
}

