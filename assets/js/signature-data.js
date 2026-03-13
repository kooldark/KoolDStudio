const signatureTemplates = {
    // Watermark styles (1-10)
    1: { type: 'watermark', html: (l1, l2, l3, c, f, sc) => `<div class="signature-style-1" style="color:${c}; font-family:${getFontFamily(f)}"><div class="logo-text">${l1}</div><div class="divider" style="background:${sc}"></div><div class="studio-name">${l2}</div><div class="year-text">${l3}</div></div>` },
    2: { type: 'watermark', html: (l1, l2, l3, c, f, sc) => `<div class="signature-style-2" style="color:${c}; font-family:${getFontFamily(f)}"><div class="text-top">${l1}</div><div class="text" style="opacity:0.85">${l2}</div><div class="text-bottom" style="font-size:0.8em; opacity:0.7">${l3}</div></div>` },
    3: { type: 'watermark', html: (l1, l2, l3, c, f, sc) => `<div class="signature-style-3" style="color:${c}; font-family:${getFontFamily(f)}"><div class="mark"><div class="name">${l1}</div><div class="subtitle">${l2}</div><div class="year" style="font-size:0.75em; opacity:0.8; margin-top:3px">${l3}</div></div></div>` },
    4: { type: 'watermark', html: (l1, l2, l3, c, f, sc) => `<div class="signature-style-4"><div class="signature-circle" style="color:${c}; font-family:${getFontFamily(f)}; border: 2px solid #4a7c59; background: rgba(74, 124, 89, 0.05);"><div class="studio-text">${l1}</div><div class="studio-subtitle">${l2}</div><div class="studio-year">${l3}</div></div></div>` },
    5: { type: 'watermark', html: (l1, l2, l3, c, f, sc) => `<div class="signature-style-5" style="color:${c}; font-family:${getFontFamily(f)}"><div class="text">${l1.toUpperCase()}</div><div class="text-sub" style="font-size:0.7em; opacity:0.8">${l2}</div><div class="text-year" style="font-size:0.65em; opacity:0.7; margin-top:3px">${l3}</div></div>` },
    6: { type: 'watermark', html: (l1, l2, l3, c, f, sc) => `<div class="signature-style-6" style="color:${c}; font-family:${getFontFamily(f)};padding:10px;border-radius:4px;background:linear-gradient(135deg, rgba(244, 241, 222, 0.3), rgba(74, 124, 89, 0.1)); border: 1px solid rgba(74, 124, 89, 0.2);"><div class="text1" style="font-weight:600;font-size:1em;margin-bottom:4px;color:#4a7c59">${l1}</div><div class="text2" style="font-size:0.85em;opacity:0.85;margin-bottom:4px;color:${c}">${l2}</div><div class="text3" style="font-size:0.75em;opacity:0.75;color:#8b7355;letter-spacing:1px">${l3}</div></div>` },
    7: { type: 'watermark', html: (l1, l2, l3, c, f, sc) => `<div class="signature-style-7" style="color:${c}; font-family:${getFontFamily(f)}"><div class="text-upper" style="font-size:0.8em;opacity:0.8">${l1}</div><div class="line"></div><div class="text">${l2}</div><div class="line"></div><div class="text-lower" style="font-size:0.8em;opacity:0.8">${l3}</div></div>` },
    8: { type: 'watermark', html: (l1, l2, l3, c, f, sc) => `<div class="signature-style-8" style="color:${c}; font-family:${getFontFamily(f)}"><div class="text-top" style="font-size:0.8em;opacity:0.8;margin-bottom:2px">${l2}</div><div class="signature" style="font-family:'Dancing Script', cursive;font-size:1.3em">${l1}</div><div class="line"></div><div class="text-bottom" style="font-size:0.75em;opacity:0.7;margin-top:2px">${l3}</div></div>` },
    9: { type: 'watermark', html: (l1, l2, l3, c, f, sc) => `<div class="signature-style-9" style="color:${c}; font-family:${getFontFamily(f)}"><div class="text">${l1} ${l2}</div><div class="sub" style="font-size:0.8em;opacity:0.75;margin-top:3px">${l3}</div></div>` },
    10: { type: 'watermark', html: (l1, l2, l3, c, f, sc) => `<div class="signature-style-10" style="color:${c}; font-family:${getFontFamily(f)};position:relative;padding:15px;background: rgba(244, 241, 222, 0.4); border-radius: 8px;"><div class="leaf-pattern">🌿</div><div class="text" style="position:relative;z-index:1">${l1}</div><div class="leaf-pattern bottom">🌿</div><div class="sub" style="font-size:0.75em;opacity:0.7;margin-top:4px">${l2}</div><div class="year" style="font-size:0.7em;opacity:0.65;margin-top:2px">${l3}</div></div>` },

    // Signature styles (11-20)
    11: { type: 'signature', html: (l1, l2, l3, c, f, sc) => `<div class="signature-style-21" style="color:${c}; font-family:'Dancing Script', cursive"><div class="signature-text" style="font-size:2em">${l1}</div><div class="signature-line"></div><div class="signature-date" style="font-size:0.8em; opacity:0.7">${l3}</div></div>` },
    12: { type: 'signature', html: (l1, l2, l3, c, f, sc) => `<div class="signature-style-22" style="color:${c}; font-family:'Great Vibes', cursive"><div class="signature-main" style="font-size:1.8em">${l1}</div><div class="signature-title" style="font-size:0.9em; opacity:0.8">${l2}</div><div class="signature-year" style="font-size:0.7em; opacity:0.6">${l3}</div></div>` },
    13: { type: 'signature', html: (l1, l2, l3, c, f, sc) => `<div class="signature-style-23" style="color:${c}; font-family:'Alex Brush', cursive;text-align:center;padding:10px;background: linear-gradient(135deg, rgba(138, 43, 226, 0.05), rgba(255, 215, 0, 0.05)); border-radius: 8px;"><div class="signature-name" style="font-size:2.2em">${l1}</div><div class="signature-decoration" style="color:#8a2be2">✦</div><div class="signature-subtitle" style="font-size:0.8em; opacity:0.8">${l2}</div></div>` },
    14: { type: 'signature', html: (l1, l2, l3, c, f, sc) => `<div class="signature-style-24" style="color:${c}; font-family:'Sacramento', cursive"><div class="signature-flow" style="font-size:1.5em">${l1}</div><div class="signature-flow-sub" style="font-size:0.9em; opacity:0.8">${l2}</div><div class="signature-flow-date" style="font-size:0.7em; opacity:0.6">${l3}</div></div>` },
    15: { type: 'signature', html: (l1, l2, l3, c, f, sc) => `<div class="signature-style-25" style="color:${c}; font-family:'Tangerine', cursive;text-align:center;padding:15px;background: linear-gradient(135deg, rgba(255, 215, 0, 0.08), rgba(218, 165, 32, 0.05)); border-radius: 10px;"><div class="signature-elegant" style="font-size:2.5em">${l1}</div><div class="signature-elegant-line" style="background: linear-gradient(90deg, #d4af37, #ffd700);"></div><div class="signature-elegant-info" style="font-size:0.8em; opacity:0.8">${l2} • ${l3}</div></div>` },
    16: { type: 'signature', html: (l1, l2, l3, c, f, sc) => `<div class="signature-style-26" style="color:${c}; font-family:'Allura', cursive"><div class="signature-script" style="font-size:1.8em">${l1}</div><div class="signature-script-title" style="font-size:0.9em; opacity:0.8">${l2}</div><div class="signature-script-year" style="font-size:0.7em; opacity:0.6">${l3}</div></div>` },
    17: { type: 'signature', html: (l1, l2, l3, c, f, sc) => `<div class="signature-style-27" style="color:${c}; font-family:'Caveat', cursive;text-align:center;padding:12px;background: rgba(173, 216, 230, 0.2); border-radius: 8px; border: 1px solid rgba(70, 130, 180, 0.3);"><div class="signature-handwritten" style="font-size:1.6em">${l1}</div><div class="signature-handwritten-sub" style="font-size:0.9em; opacity:0.8">${l2}</div><div class="signature-handwritten-date" style="font-size:0.7em; opacity:0.6">${l3}</div></div>` },
    18: { type: 'signature', html: (l1, l2, l3, c, f, sc) => `<div class="signature-style-28" style="color:${c}; font-family:'Indie Flower', cursive"><div class="signature-casual" style="font-size:1.7em">${l1}</div><div class="signature-casual-line"></div><div class="signature-casual-info" style="font-size:0.8em; opacity:0.8">${l2} ${l3}</div></div>` },
    19: { type: 'signature', html: (l1, l2, l3, c, f, sc) => `<div class="signature-style-29" style="color:${c}; font-family:'Patrick Hand', cursive;text-align:center"><div class="signature-friendly" style="font-size:1.5em">${l1}</div><div class="signature-friendly-sub" style="font-size:0.9em; opacity:0.8">${l2}</div><div class="signature-friendly-date" style="font-size:0.7em; opacity:0.6">${l3}</div></div>` },
    20: { type: 'signature', html: (l1, l2, l3, c, f, sc) => `<div class="signature-style-30" style="color:${c}; font-family:'Amatic SC', cursive;text-align:center;position:relative;padding:15px;background: linear-gradient(135deg, rgba(255, 182, 193, 0.1), rgba(255, 218, 185, 0.1)); border-radius: 12px;"><div class="star-decoration" style="color:#ffb6c1">✨</div><div class="signature-playful" style="font-size:2em">${l1}</div><div class="star-decoration bottom" style="color:#ffb6c1">✨</div><div class="signature-playful-sub" style="font-size:0.8em; opacity:0.8">${l2}</div><div class="signature-playful-date" style="font-size:0.7em; opacity:0.6">${l3}</div></div>` },
};

const designStyles = {
    elegant: { name: 'Elegant', colors: ['#1a1a1a', '#d4af37'], fonts: ['Playfair', 'Lora'] },
    minimal: { name: 'Minimal', colors: ['#2d5a3d', '#666'], fonts: ['Inter', 'Source Sans Pro'] }
};

const fontLibrary = [
    { name: 'Playfair Display', key: 'Playfair', category: 'Serif' },
    { name: 'Lora', key: 'Lora', category: 'Serif' },
    { name: 'Merriweather', key: 'Merriweather', category: 'Serif' },
    { name: 'Poppins', key: 'Poppins', category: 'Sans-serif' },
    { name: 'Inter', key: 'Inter', category: 'Sans-serif' },
    { name: 'Montserrat', key: 'Montserrat', category: 'Sans-serif' },
    { name: 'Oswald', key: 'Oswald', category: 'Display' },
    { name: 'Source Sans Pro', key: 'SourceSansPro', category: 'Sans-serif' },
    { name: 'Dancing Script', key: 'DancingScript', category: 'Script' },
    { name: 'Great Vibes', key: 'GreatVibes', category: 'Script' },
    { name: 'Alex Brush', key: 'AlexBrush', category: 'Script' },
    { name: 'Sacramento', key: 'Sacramento', category: 'Script' },
    { name: 'Tangerine', key: 'Tangerine', category: 'Script' },
    { name: 'Allura', key: 'Allura', category: 'Script' },
    { name: 'Caveat', key: 'Caveat', category: 'Handwritten' },
    { name: 'Indie Flower', key: 'IndieFlower', category: 'Handwritten' },
    { name: 'Patrick Hand', key: 'PatrickHand', category: 'Handwritten' },
    { name: 'Amatic SC', key: 'AmaticSC', category: 'Handwritten' },
    { name: 'Comforter', key: 'Comforter', category: 'Handwritten' }
];