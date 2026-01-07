
const watermarkTemplates = {
    1: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-1" style="color:${c}; font-family:${getFontFamily(f)}"><div class="logo-text">${l1}</div><div class="divider" style="background:${sc}"></div><div class="studio-name">${l2}</div><div class="year-text">${l3}</div></div>` },
    2: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-2" style="color:${c}; font-family:${getFontFamily(f)}"><div class="text-top">${l1}</div><div class="text" style="opacity:0.85">${l2}</div><div class="text-bottom" style="font-size:0.8em; opacity:0.7">${l3}</div></div>` },
    3: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-3" style="color:${c}; font-family:${getFontFamily(f)}"><div class="mark"><div class="name">${l1}</div><div class="subtitle">${l2}</div><div class="year" style="font-size:0.75em; opacity:0.8; margin-top:3px">${l3}</div></div></div>` },
    4: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-4"><div class="watermark-circle" style="color:${c}; font-family:${getFontFamily(f)}"><div class="studio-text">${l1}</div><div class="studio-subtitle">${l2}</div><div class="studio-year">${l3}</div></div></div>` },
    5: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-5" style="color:${c}; font-family:${getFontFamily(f)}"><div class="text">${l1.toUpperCase()}</div><div class="text-sub" style="font-size:0.7em; opacity:0.8">${l2}</div><div class="text-year" style="font-size:0.65em; opacity:0.7; margin-top:3px">${l3}</div></div>` },
    6: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-6" style="color:${c}; font-family:${getFontFamily(f)};padding:10px;border-radius:4px;background:linear-gradient(135deg, rgba(235,149,0,0.08), rgba(58,90,64,0.04))"><div class="text1" style="font-weight:600;font-size:1em;margin-bottom:4px;color:#3a5a40">${l1}</div><div class="text2" style="font-size:0.85em;opacity:0.85;margin-bottom:4px;color:${c}">${l2}</div><div class="text3" style="font-size:0.75em;opacity:0.75;color:${sc};letter-spacing:1px">${l3}</div></div>` },
    7: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-8" style="color:${c}; font-family:${getFontFamily(f)}"><div class="text-upper" style="font-size:0.8em;opacity:0.8">${l1}</div><div class="line"></div><div class="text">${l2}</div><div class="line"></div><div class="text-lower" style="font-size:0.8em;opacity:0.8">${l3}</div></div>` },
    8: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-9" style="color:${c}; font-family:${getFontFamily(f)}"><div class="text-top" style="font-size:0.8em;opacity:0.8;margin-bottom:2px">${l2}</div><div class="signature" style="font-family:'Dancing Script', cursive;font-size:1.3em">${l1}</div><div class="line"></div><div class="text-bottom" style="font-size:0.75em;opacity:0.7;margin-top:2px">${l3}</div></div>` },
    9: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-11" style="color:${c}; font-family:${getFontFamily(f)}"><div class="text">${l1} ${l2}</div><div class="sub" style="font-size:0.8em;opacity:0.75;margin-top:3px">${l3}</div></div>` },
    10: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-12" style="color:${c}; font-family:${getFontFamily(f)}"><div class="dot"></div><div class="text">${l1}</div><div class="dot"></div><div class="sub" style="font-size:0.75em;opacity:0.7;margin-top:4px">${l2}</div><div class="year" style="font-size:0.7em;opacity:0.65;margin-top:2px">${l3}</div></div>` },
    11: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-13" style="color:${c}; font-family:${getFontFamily(f)}"><div class="part1">${l1}</div><div class="part2">${l2}</div><div class="part3" style="font-size:0.75em;opacity:0.7;margin-top:3px">${l3}</div></div>` },
    12: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-18" style="color:${c}; font-family:${getFontFamily(f)}"><div class="stripe"></div><div class="text">${l1}</div><div class="sub" style="font-size:0.8em;opacity:0.75;margin-top:3px">${l2}</div><div class="stripe"></div><div class="year" style="font-size:0.7em;opacity:0.65;margin-top:2px">${l3}</div></div>` },
    13: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-19" style="color:${c}; font-family:${getFontFamily(f)}"><div class="diamond"><div class="text">${l1.substring(0,1)}</div></div><div class="text-full" style="font-size:0.75em;opacity:0.7;margin-top:4px;text-align:center">${l2} ${l3}</div></div>` },
    14: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-21" style="color:${c}; font-family:${getFontFamily(f)}"><div class="text">${l1} ${l2}</div><div class="sub">${l3}</div></div>` },
    15: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-24" style="color:${c}; font-family:${getFontFamily(f)}"><div class="text">${l1}</div><div class="sub" style="font-size:0.85em;opacity:0.8;margin-top:4px;font-style:italic">${l2}</div><div class="year" style="font-size:0.75em;opacity:0.7;margin-top:3px">${l3}</div></div>` },
    16: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-29" style="color:${c}; font-family:${getFontFamily(f)}"><div class="text">${l1}</div><div class="sub" style="font-size:0.8em;opacity:0.8;margin-top:4px;font-weight:600">${l2}</div><div class="year" style="font-size:0.75em;opacity:0.7;margin-top:3px">${l3}</div></div>` },
    17: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-32" style="color:${c}; font-family:${getFontFamily(f)}"><div class="deco">❁</div><div class="text">${l1}</div><div class="deco">❁</div><div class="sub" style="font-size:0.8em;opacity:0.75;margin-top:4px">${l2}</div><div class="year" style="font-size:0.7em;opacity:0.65;margin-top:2px">${l3}</div></div>` },
    18: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-39" style="color:${c}; font-family:${getFontFamily(f)}"><div class="text">${l1}</div><div class="sub" style="font-size:0.8em;opacity:0.8;margin-top:4px;letter-spacing:1px">${l2}</div><div class="accent"></div><div class="year" style="font-size:0.75em;opacity:0.7;margin-top:3px">${l3}</div></div>` },
    19: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-floating" style="color:${c}; font-family:${getFontFamily(f)};padding:8px;border-left:3px solid ${sc}"><div class="text" style="font-size:1.2em;letter-spacing:2px;margin-bottom:6px">${l1}</div><div class="sub" style="font-size:0.75em;opacity:0.75;margin-bottom:8px;color:#3a5a40">${l2}</div><div class="year" style="font-size:0.65em;opacity:0.6;letter-spacing:1px;color:${sc}">${l3}</div></div>` },
    20: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-corner" style="color:${c}; font-family:${getFontFamily(f)};position:relative;padding:8px;background:linear-gradient(135deg, rgba(235,149,0,0.05) 0%, transparent 100%)"><div style="position:absolute;top:0;right:0;text-align:right;padding:8px"><div style="font-size:0.9em;opacity:0.8;margin-bottom:3px;color:#3a5a40;font-weight:600">${l1}</div><div style="font-size:0.75em;opacity:0.7;margin-bottom:3px;color:${c}">${l2}</div><div style="font-size:0.65em;opacity:0.6;color:${sc}">${l3}</div></div></div>` },
    21: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-brush" style="color:${c}; font-family:${getFontFamily(f)}"><div style="font-style:italic;opacity:0.85;margin-bottom:4px;font-size:0.95em;color:#3a5a40;font-weight:500">${l1}</div><div style="border-bottom:2px solid ${sc};opacity:0.8;width:40%;margin:6px 0"></div><div style="font-size:0.75em;opacity:0.75;letter-spacing:0.5px;color:${c}">${l2}</div><div style="font-size:0.65em;opacity:0.65;margin-top:3px;color:${sc}">${l3}</div></div>` },
    22: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-modern-stack" style="color:${c}; font-family:${getFontFamily(f)};padding:8px;border-radius:3px;background:rgba(58,90,64,0.04)"><div style="text-transform:uppercase;font-size:0.85em;letter-spacing:3px;font-weight:600;margin-bottom:4px;color:#3a5a40">${l1}</div><div style="height:2px;background:${sc};opacity:0.6;width:50%;margin:6px 0;margin-bottom:8px"></div><div style="font-size:0.75em;opacity:0.8;color:${c}">${l2}</div><div style="font-size:0.65em;opacity:0.65;margin-top:2px;color:${sc}">${l3}</div></div>` },
    23: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-vintage-border" style="color:${c}; font-family:${getFontFamily(f)};border:2px solid ${sc};border-radius:4px;padding:8px 12px;background:rgba(235,149,0,0.03)"><div style="font-size:0.8em;letter-spacing:1px;margin-bottom:3px;color:#3a5a40;font-weight:600">${l1}</div><div style="font-size:0.7em;opacity:0.85;margin-bottom:3px;color:${c}">${l2}</div><div style="font-size:0.65em;opacity:0.75;color:${sc}">${l3}</div></div>` },
    24: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-geometric" style="color:${c}; font-family:${getFontFamily(f)}"><div style="display:flex;align-items:center;gap:8px;margin-bottom:4px"><div style="width:20px;height:2px;background:${sc};opacity:0.7"></div><div style="font-size:0.85em;font-weight:600;color:#3a5a40">${l1}</div></div><div style="font-size:0.75em;opacity:0.75;margin-left:28px;color:${c}">${l2}</div><div style="font-size:0.65em;opacity:0.65;margin-left:28px;margin-top:2px;color:${sc}">${l3}</div></div>` },
    25: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-serif-elegance" style="color:${c}; font-family:'Cormorant Garamond', serif;padding:8px"><div style="font-size:1.3em;font-weight:300;letter-spacing:2px;margin-bottom:6px;color:#3a5a40">${l1}</div><div style="font-size:0.8em;font-weight:400;opacity:0.85;margin-bottom:6px;color:${c}">${l2}</div><div style="border-top:2px solid #eb9500;opacity:0.7;width:60%;padding-top:6px;font-size:0.7em;opacity:0.8;color:#eb9500">${l3}</div></div>` },
    26: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-minimal-dots" style="color:${c}; font-family:${getFontFamily(f)};padding:8px"><div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:6px"><div style="width:4px;height:4px;border-radius:50%;background:#3a5a40"></div><div style="font-size:0.9em;letter-spacing:1px;color:#3a5a40;font-weight:500">${l1}</div><div style="width:4px;height:4px;border-radius:50%;background:#eb9500"></div></div><div style="font-size:0.75em;opacity:0.8;text-align:center;margin-bottom:2px;color:${c}">${l2}</div><div style="font-size:0.65em;opacity:0.7;text-align:center;color:#eb9500">${l3}</div></div>` },
    27: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-gradient-fade" style="color:${c}; font-family:${getFontFamily(f)};background:linear-gradient(135deg, rgba(235,149,0,0.08) 0%, rgba(58,90,64,0.04) 100%);padding:10px 12px;border-radius:3px;border-left:3px solid #eb9500"><div style="font-size:0.95em;font-weight:600;margin-bottom:4px;color:#3a5a40">${l1}</div><div style="font-size:0.75em;opacity:0.85;margin-bottom:3px;color:${c}">${l2}</div><div style="font-size:0.65em;opacity:0.75;color:#eb9500">${l3}</div></div>` },
    28: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-ornate" style="color:${c}; font-family:${getFontFamily(f)};text-align:center;padding:8px"><div style="font-size:1.2em;color:#eb9500;margin-bottom:4px;opacity:0.8">✦</div><div style="font-size:0.9em;letter-spacing:2px;margin-bottom:4px;color:#3a5a40;font-weight:500">${l1}</div><div style="font-size:0.75em;opacity:0.8;margin-bottom:3px;color:${c}">${l2}</div><div style="font-size:0.7em;opacity:0.7;color:#eb9500;margin-bottom:4px">${l3}</div><div style="font-size:1.2em;color:#3a5a40;opacity:0.8">✦</div></div></div>` },
    29: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-monogram" style="color:${c}; font-family:${getFontFamily(f)};text-align:center;padding:8px;background:linear-gradient(to bottom, rgba(235,149,0,0.05), rgba(58,90,64,0.05))"><div style="font-size:1.8em;font-weight:700;letter-spacing:3px;margin-bottom:6px;font-family:'Playfair Display', serif;color:#3a5a40">${l1.substring(0,1).toUpperCase()}</div><div style="font-size:0.8em;letter-spacing:2px;margin-bottom:5px;color:#3a5a40;text-transform:uppercase;font-weight:500">${l1}</div><div style="font-size:0.7em;opacity:0.8;color:#eb9500">${l2} • ${l3}</div></div>` },
    30: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-contemporary" style="color:${c}; font-family:${getFontFamily(f)};padding:8px"><div style="display:grid;grid-template-columns:auto 1fr;gap:10px;align-items:start"><div style="width:3px;height:45px;background:linear-gradient(to bottom, #eb9500, #3a5a40);opacity:0.8"></div><div><div style="font-size:0.9em;font-weight:600;margin-bottom:4px;letter-spacing:1px;color:#3a5a40">${l1}</div><div style="font-size:0.75em;opacity:0.85;margin-bottom:2px;color:${c}">${l2}</div><div style="font-size:0.65em;opacity:0.75;color:#eb9500">${l3}</div></div></div></div>` },
    31: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-31" style="color:${c}; font-family:${getFontFamily(f)};text-align:center;padding:10px"><div style="font-size:1.2em;font-weight:600;letter-spacing:1px;margin-bottom:4px;color:#EB9500">${l1}</div><div style="border-bottom:2px solid #2d5a3d;width:80%;margin:6px auto"></div><div style="font-size:0.8em;opacity:0.9;margin-top:6px;color:#2d5a3d">${l2}</div></div>` },
    32: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-32" style="color:${c}; font-family:${getFontFamily(f)};text-align:center;padding:8px"><div style="font-size:1em;letter-spacing:3px;margin-bottom:8px;color:#1a4d2e;font-weight:600">${l1}</div><div style="font-size:0.85em;color:${c};margin-bottom:4px">${l2}</div><div style="font-size:0.75em;color:#D4AF37;opacity:0.9">${l3}</div></div>` },
    33: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-33" style="color:${c}; font-family:${getFontFamily(f)};padding:8px;border-right:3px solid #EB9500"><div style="font-size:0.95em;font-weight:600;margin-bottom:6px;color:#1a1a1a">${l1}</div><div style="font-size:0.8em;opacity:0.85;margin-bottom:4px;color:${c}">${l2}</div><div style="font-size:0.75em;color:#2d5a3d;letter-spacing:1px">${l3}</div></div>` },
    34: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-34" style="color:${c}; font-family:${getFontFamily(f)};text-align:center;padding:10px;background:rgba(235,149,0,0.05)"><div style="font-size:1.1em;font-weight:600;margin-bottom:6px;color:#1a4d2e;letter-spacing:2px">${l1}</div><div style="font-size:0.8em;opacity:0.85;color:#1a1a1a;margin-bottom:4px">${l2}</div><div style="font-size:0.7em;color:#EB9500">${l3}</div></div>` },
    35: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-35" style="color:${c}; font-family:${getFontFamily(f)};padding:10px;border:2px solid #EB9500;border-radius:3px"><div style="font-size:0.95em;font-weight:600;margin-bottom:5px;color:#1a4d2e">${l1}</div><div style="border-bottom:1px solid #D4AF37;padding-bottom:5px;margin-bottom:5px"><div style="font-size:0.8em;opacity:0.85;color:#1a1a1a">${l2}</div></div><div style="font-size:0.75em;color:#2d5a3d">${l3}</div></div>` },
    36: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-36" style="color:${c}; font-family:${getFontFamily(f)};text-align:right;padding:8px"><div style="font-size:0.9em;font-weight:600;margin-bottom:4px;color:#D4AF37;letter-spacing:1px">${l1}</div><div style="font-size:0.8em;opacity:0.85;margin-bottom:3px;color:#1a1a1a">${l2}</div><div style="font-size:0.75em;color:#2d5a3d">${l3}</div></div>` },
    37: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-37" style="color:${c}; font-family:${getFontFamily(f)};padding:8px"><div style="display:flex;align-items:center;gap:8px;margin-bottom:6px"><div style="width:2px;height:20px;background:#EB9500"></div><div style="font-size:0.95em;font-weight:600;color:#1a4d2e">${l1}</div></div><div style="padding-left:10px;font-size:0.8em;opacity:0.85;color:#1a1a1a;margin-bottom:4px">${l2}</div><div style="padding-left:10px;font-size:0.75em;color:#D4AF37">${l3}</div></div>` },
    38: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-38" style="color:${c}; font-family:${getFontFamily(f)};text-align:center;padding:10px;background:linear-gradient(135deg, rgba(45,90,61,0.08), rgba(235,149,0,0.06))"><div style="font-size:1em;letter-spacing:2px;margin-bottom:6px;color:#1a1a1a;font-weight:600">${l1}</div><div style="font-size:0.8em;opacity:0.85;color:#2d5a3d;margin-bottom:5px">${l2}</div><div style="font-size:0.75em;color:#EB9500;letter-spacing:1px">${l3}</div></div>` },
    39: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-39" style="color:${c}; font-family:${getFontFamily(f)};padding:8px;border-left:4px solid #2d5a3d"><div style="font-size:0.95em;font-weight:600;margin-bottom:4px;color:#D4AF37;letter-spacing:1px">${l1}</div><div style="font-size:0.8em;opacity:0.85;margin-bottom:3px;color:#1a1a1a">${l2}</div><div style="font-size:0.75em;color:#2d5a3d">${l3}</div></div>` },
    40: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-40" style="color:${c}; font-family:${getFontFamily(f)};text-align:center;padding:10px"><div style="font-size:0.95em;letter-spacing:3px;margin-bottom:8px;color:#1a1a1a;font-weight:600;text-transform:uppercase">${l1}</div><div style="height:2px;background:linear-gradient(to right, #2d5a3d, #EB9500, #2d5a3d);margin:8px 0"></div><div style="font-size:0.8em;opacity:0.85;color:#1a4d2e;margin-bottom:4px">${l2}</div><div style="font-size:0.75em;color:#D4AF37">${l3}</div></div>` },
    41: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-41" style="color:${c}; font-family:${getFontFamily(f)};text-align:center;padding:10px"><div style="font-size:1.1em;font-weight:600;margin-bottom:4px;color:#EB9500;letter-spacing:2px">${l1}</div><div style="font-size:0.8em;opacity:0.85;color:#1a1a1a">${l2}</div></div>` },
    42: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-42" style="color:${c}; font-family:${getFontFamily(f)};text-align:center;padding:10px"><div style="font-size:1em;letter-spacing:1px;margin-bottom:6px;color:#2d5a3d;font-weight:600">${l1}</div><div style="font-size:0.85em;opacity:0.85;color:#1a1a1a;margin-bottom:4px">${l2}</div><div style="font-size:0.7em;color:#D4AF37">${l3}</div></div>` },
    43: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-43" style="color:${c}; font-family:${getFontFamily(f)};padding:8px"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px"><div style="flex:1;height:2px;background:#EB9500"></div><div style="padding:0 8px;font-size:0.9em;font-weight:600;color:#1a1a1a">${l1}</div><div style="flex:1;height:2px;background:#2d5a3d"></div></div><div style="text-align:center;font-size:0.8em;opacity:0.85;color:#1a4d2e;margin-bottom:4px">${l2}</div><div style="text-align:center;font-size:0.75em;color:#D4AF37">${l3}</div></div>` },
    44: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-44" style="color:${c}; font-family:${getFontFamily(f)};text-align:center;padding:8px"><div style="font-size:1.05em;letter-spacing:1px;margin-bottom:6px;color:#1a1a1a;font-weight:600">${l1}</div><div style="margin:6px 0;width:50%;margin-left:auto;margin-right:auto"><div style="height:2px;background:#EB9500;margin-bottom:4px"></div><div style="font-size:0.8em;opacity:0.85;color:#2d5a3d;padding:4px 0">${l2}</div><div style="height:2px;background:#2d5a3d"></div></div><div style="font-size:0.75em;color:#D4AF37;margin-top:6px">${l3}</div></div>` },
    45: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-45" style="color:${c}; font-family:${getFontFamily(f)};padding:8px;text-align:center"><div style="font-size:1em;font-weight:600;margin-bottom:6px;color:#D4AF37;letter-spacing:2px;text-transform:uppercase">${l1}</div><div style="font-size:0.8em;opacity:0.85;color:#1a1a1a;margin-bottom:4px">${l2}</div><div style="font-size:0.75em;color:#2d5a3d;letter-spacing:1px">${l3}</div></div>` },
    46: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-46" style="color:${c}; font-family:${getFontFamily(f)};padding:10px;border-top:3px solid #EB9500;border-bottom:3px solid #2d5a3d"><div style="font-size:0.95em;font-weight:600;margin:6px 0;color:#1a1a1a;text-align:center">${l1}</div><div style="font-size:0.8em;opacity:0.85;color:#1a4d2e;text-align:center;margin-bottom:4px">${l2}</div><div style="font-size:0.75em;color:#D4AF37;text-align:center">${l3}</div></div>` },
    47: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-47" style="color:${c}; font-family:${getFontFamily(f)};text-align:center;padding:8px"><div style="font-size:0.9em;font-weight:600;margin-bottom:8px;color:#1a1a1a;letter-spacing:1px">${l1}</div><div style="font-size:0.8em;opacity:0.85;color:#2d5a3d;margin-bottom:6px">${l2}</div><div style="font-size:0.75em;color:#EB9500;letter-spacing:2px;text-transform:uppercase">${l3}</div></div>` },
    48: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-48" style="color:${c}; font-family:${getFontFamily(f)};padding:8px;background:rgba(45,90,61,0.03);border-radius:2px"><div style="font-size:1em;font-weight:600;margin-bottom:6px;color:#D4AF37;text-align:center">${l1}</div><div style="font-size:0.8em;opacity:0.85;color:#1a1a1a;text-align:center;margin-bottom:4px">${l2}</div><div style="font-size:0.75em;color:#2d5a3d;text-align:center">${l3}</div></div>` },
    49: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-49" style="color:${c}; font-family:${getFontFamily(f)};text-align:center;padding:10px;border-left:3px solid #EB9500;border-right:3px solid #2d5a3d"><div style="font-size:0.95em;font-weight:600;margin:6px 0;color:#1a1a1a">${l1}</div><div style="font-size:0.8em;opacity:0.85;color:#1a4d2e;margin-bottom:4px">${l2}</div><div style="font-size:0.75em;color:#D4AF37">${l3}</div></div>` },
    50: { html: (l1, l2, l3, c, f, sc) => `<div class="watermark-style-50" style="color:${c}; font-family:${getFontFamily(f)};text-align:center;padding:10px;background:linear-gradient(135deg, rgba(26,77,46,0.08) 0%, rgba(212,175,55,0.06) 100%)"><div style="font-size:1em;font-weight:600;margin-bottom:6px;color:#1a1a1a;letter-spacing:2px">${l1}</div><div style="font-size:0.8em;opacity:0.85;color:#2d5a3d;margin-bottom:4px">${l2}</div><div style="font-size:0.75em;color:#EB9500;letter-spacing:1px">${l3}</div></div>` }
};

const colorPalettes = {
    elegant: { name: 'Elegant', primary: '#1a1a1a', secondary: '#d4af37', tertiary: '#f5f5f5' },
    noir: { name: 'Noir', primary: '#1f1f1f', secondary: '#e8dcc8', tertiary: '#fef9f3' },
    luxury: { name: 'Luxury', primary: '#1a1a1a', secondary: '#c9a961', tertiary: '#f4f1e8' },
    vintage: { name: 'Vintage', primary: '#5d4e37', secondary: '#d9b894', tertiary: '#fdf6f1' },
    modern: { name: 'Modern', primary: '#2d3748', secondary: '#718096', tertiary: '#edf2f7' },
    romantic: { name: 'Romantic', primary: '#8b4545', secondary: '#d4a5a5', tertiary: '#faf6f3' },
    vibrant: { name: 'Vibrant', primary: '#d84315', secondary: '#ff6f00', tertiary: '#fff3e0' }
};

const fontLibrary = [
    // 1️⃣ Sans-serif (Hiện đại, dễ đọc, gần gũi)
    { name: 'Raleway', key: 'Raleway', category: '1️⃣ Sans-serif', group: 'Sans-serif' },
    { name: 'Lato', key: 'Lato', category: '1️⃣ Sans-serif', group: 'Sans-serif' },
    { name: 'Poppins', key: 'Poppins', category: '1️⃣ Sans-serif', group: 'Sans-serif' },
    
    // 2️⃣ Serif (Ấm áp, truyền thống, đáng tin cậy)
    { name: 'Playfair Display', key: 'Playfair', category: '2️⃣ Serif', group: 'Serif' },
    { name: 'Merriweather', key: 'Merriweather', category: '2️⃣ Serif', group: 'Serif' },
    { name: 'Lora', key: 'Lora', category: '2️⃣ Serif', group: 'Serif' },
    
    // 3️⃣ Script (Lãng mạn, cảm xúc, cá nhân)
    { name: 'Pacifico', key: 'Pacifico', category: '3️⃣ Script', group: 'Script' },
    { name: 'Dancing Script', key: 'DancingScript', category: '3️⃣ Script', group: 'Script' },
    { name: 'Satisfy', key: 'Satisfy', category: '3️⃣ Script', group: 'Script' },
    
    // 4️⃣ Handwritten (Viết tay tự nhiên, đời thường)
    { name: 'Caveat', key: 'Caveat', category: '4️⃣ Handwritten', group: 'Handwritten' },
    { name: 'Indie Flower', key: 'IndieFlower', category: '4️⃣ Handwritten', group: 'Handwritten' },
    { name: 'Patrick Hand', key: 'PatrickHand', category: '4️⃣ Handwritten', group: 'Handwritten' },
    { name: 'Great Vibes', key: 'GreatVibes', category: '4️⃣ Handwritten', group: 'Handwritten' },
    { name: 'Amatic SC', key: 'AmaticSC', category: '4️⃣ Handwritten', group: 'Handwritten' },
    { name: 'Comforter', key: 'Comforter', category: '4️⃣ Handwritten', group: 'Handwritten' },
    { name: 'Tangerine', key: 'Tangerine', category: '4️⃣ Handwritten', group: 'Handwritten' },
    { name: 'Allura', key: 'Allura', category: '4️⃣ Handwritten', group: 'Handwritten' },
    { name: 'Alex Brush', key: 'AlexBrush', category: '4️⃣ Handwritten', group: 'Handwritten' },
    { name: 'Sacramento', key: 'Sacramento', category: '4️⃣ Handwritten', group: 'Handwritten' },
    
    // 5️⃣ Rounded Font (Thân thiện, vui vẻ, mềm mại)
    { name: 'Quicksand', key: 'Quicksand', category: '5️⃣ Rounded', group: 'Rounded' },
    { name: 'Nunito', key: 'Nunito', category: '5️⃣ Rounded', group: 'Rounded' },
    { name: 'Fredoka', key: 'Fredoka', category: '5️⃣ Rounded', group: 'Rounded' },
    
    // 6️⃣ Display/Decorative (Nổi bật, cá tính)
    { name: 'Abril Fatface', key: 'AbrilFatface', category: '6️⃣ Display', group: 'Display' },
    { name: 'Oswald', key: 'Oswald', category: '6️⃣ Display', group: 'Display' },
    
    // 7️⃣ Humanist (Tự nhiên, dễ đọc, đời sống)
    { name: 'Roboto', key: 'Roboto', category: '7️⃣ Humanist', group: 'Humanist' },
    { name: 'Source Sans Pro', key: 'SourceSansPro', category: '7️⃣ Humanist', group: 'Humanist' },
    
    // 8️⃣ Minimal/Modern (Nhẹ nhàng, tinh tế, hợp lifestyle)
    { name: 'Sora', key: 'Sora', category: '8️⃣ Minimal', group: 'Minimal' },
    { name: 'Unbounded', key: 'Unbounded', category: '8️⃣ Minimal', group: 'Minimal' },
    { name: 'Inter', key: 'Inter', category: '8️⃣ Minimal', group: 'Minimal' }
];

function getFontFamily(f) {
    const fonts = {
        // Sans-serif
        'Raleway': "'Raleway', sans-serif",
        'Lato': "'Lato', sans-serif",
        'Poppins': "'Poppins', sans-serif",
        
        // Serif
        'Playfair': "'Playfair Display', serif",
        'Merriweather': "'Merriweather', serif",
        'Lora': "'Lora', serif",
        
        // Script
        'Pacifico': "'Pacifico', cursive",
        'DancingScript': "'Dancing Script', cursive",
        'Satisfy': "'Satisfy', cursive",
        
        // Handwritten
        'Caveat': "'Caveat', cursive",
        'IndieFlower': "'Indie Flower', cursive",
        'PatrickHand': "'Patrick Hand', cursive",
        'GreatVibes': "'Great Vibes', cursive",
        'AmaticSC': "'Amatic SC', cursive",
        'Comforter': "'Comforter', cursive",
        'Tangerine': "'Tangerine', cursive",
        'Allura': "'Allura', cursive",
        'AlexBrush': "'Alex Brush', cursive",
        'Sacramento': "'Sacramento', cursive",
        
        // Rounded
        'Quicksand': "'Quicksand', sans-serif",
        'Nunito': "'Nunito', sans-serif",
        'Fredoka': "'Fredoka', sans-serif",
        
        // Display
        'AbrilFatface': "'Abril Fatface', serif",
        'Oswald': "'Oswald', sans-serif",
        
        // Humanist
        'Roboto': "'Roboto', sans-serif",
        'SourceSansPro': "'Source Sans Pro', sans-serif",
        
        // Minimal
        'Sora': "'Sora', sans-serif",
        'Unbounded': "'Unbounded', sans-serif",
        'Inter': "'Inter', sans-serif"
    };
    return fonts[f] || fonts['Raleway'];
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '0, 0, 0';
}

function getComplementaryColor(hex) {
    // Enhanced professional color harmony logic
    // First check predefined palette colors
    const colorMap = {
        '#1a1a1a': '#eb9500',  // Dark -> Gold (luxury)
        '#1f1f1f': '#e8dcc8',  // Noir -> Cream (sophisticated)
        '#5d4e37': '#d9b894',  // Vintage -> Light tan (harmonious)
        '#2d3748': '#718096',  // Modern -> Gray-blue (balanced)
        '#8b4545': '#d4a5a5',  // Romantic -> Dusty rose (complementary)
        '#d84315': '#ff6f00',  // Vibrant -> Bright orange (split-complementary)
        '#3a5a40': '#eb9500',  // Deep Green -> Gold (classic)
    };
    
    if (colorMap[hex]) {
        return colorMap[hex];
    }
    
    // For custom colors: Calculate complementary using HSL color space
    const rgb = hexToRgbArray(hex);
    const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
    
    // Calculate complementary hue (180 degrees opposite)
    let complementaryHue = (hsl.h + 180) % 360;
    
    // Adjust saturation and lightness for professional look
    let saturation = hsl.s;
    let lightness = hsl.l;
    
    // Professional adjustments based on original color brightness
    if (lightness < 30) {
        // Dark colors: Use lighter, more saturated accent
        lightness = 65;
        saturation = Math.min(saturation + 20, 100);
    } else if (lightness > 70) {
        // Light colors: Use darker, more saturated accent
        lightness = 35;
        saturation = Math.min(saturation + 15, 100);
    } else {
        // Mid-tone: Use complementary with slight adjustments
        saturation = Math.min(saturation + 10, 100);
    }
    
    const complementaryRgb = hslToRgb(complementaryHue, saturation, lightness);
    return rgbToHex(complementaryRgb[0], complementaryRgb[1], complementaryRgb[2]);
}

function hexToRgbArray(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return [26, 26, 26]; // Default to dark gray
    return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
}

function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    
    return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToRgb(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    
    let r, g, b;
    
    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('').toUpperCase();
}
