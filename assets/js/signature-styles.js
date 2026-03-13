// Signature Styles CSS
const signatureStyles = `
/* Watermark Styles (1-20) */
.signature-style-1, .signature-style-2, .signature-style-3 { display: flex; flex-direction: column; gap: 8px; align-items: center; }
.signature-style-1 .logo-text { font-size: 22px; font-weight: 700; letter-spacing: 1px; }
.signature-style-1 .divider { width: 30px; height: 2px; background: var(--secondary-color, #eb9500); margin: 4px 0; }
.signature-style-1 .studio-name { font-size: 14px; font-weight: 600; opacity: 0.9; }
.signature-style-1 .year-text, .signature-style-2 .text-top { font-size: 10px; opacity: 0.7; }
.signature-style-2 .text { font-size: 18px; font-weight: 700; }
.signature-style-2 .text-bottom { font-size: 8px; }
.signature-style-3 .mark { text-align: center; }
.signature-style-3 .name { font-size: 18px; font-weight: 700; }
.signature-style-3 .subtitle { font-size: 12px; opacity: 0.8; }
.signature-style-3 .year { font-size: 10px; opacity: 0.7; margin-top: 3px; }
.signature-style-4 .signature-circle { width: 100px; height: 100px; border: 2px solid currentColor; border-radius: 50%; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; }
.signature-style-4 .studio-text { font-size: 14px; font-weight: 700; }
.signature-style-4 .studio-subtitle { font-size: 9px; opacity: 0.7; margin-top: 2px; }
.signature-style-4 .studio-year { font-size: 8px; opacity: 0.6; }
.signature-style-5 .text { font-size: 20px; font-weight: 700; }
.signature-style-5 .text-sub { font-size: 12px; }
.signature-style-5 .text-year { font-size: 10px; margin-top: 3px; }
.signature-style-6 { padding: 10px; border-radius: 4px; background: linear-gradient(135deg, rgba(235,149,0,0.08), rgba(58,90,64,0.04)); }
.signature-style-6 .text1 { font-weight: 600; font-size: 1em; margin-bottom: 4px; color: #3a5a40; }
.signature-style-6 .text2 { font-size: 0.85em; opacity: 0.85; margin-bottom: 4px; }
.signature-style-6 .text3 { font-size: 0.75em; opacity: 0.75; letter-spacing: 1px; }
.signature-style-7 .line { width: 40px; height: 1px; background: var(--secondary-color, #eb9500); }
.signature-style-7 .text { font-size: 16px; font-weight: 700; }
.signature-style-7 .text-lower { font-size: 10px; }
.signature-style-8 .text-top { font-size: 11px; }
.signature-style-8 .signature { font-size: 22px; font-weight: 700; }
.signature-style-8 .line { width: 30px; height: 1px; background: var(--secondary-color, #eb9500); }
.signature-style-8 .text-bottom { font-size: 9px; }
.signature-style-9 .text { font-size: 16px; font-weight: 700; }
.signature-style-9 .sub { font-size: 12px; margin-top: 3px; }
.signature-style-10 .dot { width: 3px; height: 3px; background: var(--secondary-color, #eb9500); border-radius: 50%; }
.signature-style-10 .text { font-size: 13px; font-weight: 600; }
.signature-style-10 .sub { margin-top: 4px; }
.signature-style-10 .year { margin-top: 2px; }
.signature-style-11 .part1 { font-size: 22px; font-weight: 700; }
.signature-style-11 .part2 { font-size: 16px; font-weight: 600; letter-spacing: 1px; }
.signature-style-11 .part3 { margin-top: 3px; }
.signature-style-12 .stripe { width: 50px; height: 1.5px; background: var(--secondary-color, #eb9500); opacity: 0.7; }
.signature-style-12 .text { font-size: 15px; font-weight: 600; padding: 4px 0; }
.signature-style-12 .sub { margin-top: 3px; }
.signature-style-13 .diamond { width: 60px; height: 60px; border: 1px solid var(--secondary-color, #eb9500); transform: rotate(45deg); display: flex; align-items: center; justify-content: center; }
.signature-style-13 .text { font-size: 9px; transform: rotate(-45deg); }
.signature-style-13 .text-full { font-size: 0.75em; opacity: 0.7; margin-top: 4px; text-align: center; }
.signature-style-14 .text { font-size: 16px; font-weight: 700; }
.signature-style-14 .sub { font-size: 12px; }
.signature-style-15 .text { font-size: 16px; font-weight: 700; }
.signature-style-15 .sub { font-size: 0.85em; opacity: 0.8; margin-top: 4px; font-style: italic; }
.signature-style-15 .year { font-size: 0.75em; opacity: 0.7; margin-top: 3px; }
.signature-style-16 .text { font-size: 16px; font-weight: 700; }
.signature-style-16 .sub { font-size: 0.8em; opacity: 0.8; margin-top: 4px; font-weight: 600; }
.signature-style-16 .year { font-size: 0.75em; opacity: 0.7; margin-top: 3px; }
.signature-style-17 .deco { font-size: 16px; opacity: 0.8; }
.signature-style-17 .text { font-size: 16px; font-weight: 700; }
.signature-style-17 .sub { margin-top: 4px; }
.signature-style-18 .text { font-size: 16px; font-weight: 700; }
.signature-style-18 .sub { font-size: 0.8em; opacity: 0.8; margin-top: 4px; letter-spacing: 1px; }
.signature-style-18 .accent { width: 40px; height: 1px; background: var(--secondary-color, #eb9500); margin: 4px 0; opacity: 0.7; }
.signature-style-18 .year { font-size: 0.75em; opacity: 0.7; margin-top: 3px; }
.signature-style-19 { padding: 8px; border-left: 3px solid var(--secondary-color, #eb9500); }
.signature-style-19 .text { font-size: 1.2em; letter-spacing: 2px; margin-bottom: 6px; }
.signature-style-19 .sub { font-size: 0.75em; opacity: 0.75; margin-bottom: 8px; }
.signature-style-19 .year { font-size: 0.65em; opacity: 0.6; letter-spacing: 1px; }
.signature-style-20 { position: relative; padding: 8px; background: linear-gradient(135deg, rgba(235,149,0,0.05) 0%, transparent 100%); }
.signature-style-20 .text { font-size: 0.9em; opacity: 0.8; font-weight: 600; }
.signature-style-20 .sub { font-size: 0.75em; opacity: 0.7; margin-top: 3px; }
.signature-style-20 .year { font-size: 0.65em; opacity: 0.6; }

/* Signature Styles (21-40) */
.signature-style-21 .signature-text { font-size: 2em; }
.signature-style-21 .signature-line { width: 100px; height: 1px; background: currentColor; margin: 4px 0; }
.signature-style-21 .signature-date { font-size: 0.8em; opacity: 0.7; }
.signature-style-22 .signature-main { font-size: 1.8em; }
.signature-style-22 .signature-title { font-size: 0.9em; opacity: 0.8; }
.signature-style-22 .signature-year { font-size: 0.7em; opacity: 0.6; }
.signature-style-23 .signature-name { font-size: 2.2em; }
.signature-style-23 .signature-decoration { font-size: 1.5em; opacity: 0.7; margin: 4px 0; }
.signature-style-23 .signature-subtitle { font-size: 0.8em; opacity: 0.8; }
.signature-style-24 .signature-flow { font-size: 1.5em; }
.signature-style-24 .signature-flow-sub { font-size: 0.9em; opacity: 0.8; }
.signature-style-24 .signature-flow-date { font-size: 0.7em; opacity: 0.6; }
.signature-style-25 .signature-elegant { font-size: 2.5em; }
.signature-style-25 .signature-elegant-line { width: 80px; height: 1px; background: currentColor; margin: 6px 0; }
.signature-style-25 .signature-elegant-info { font-size: 0.8em; opacity: 0.8; }
.signature-style-26 .signature-script { font-size: 1.8em; }
.signature-style-26 .signature-script-title { font-size: 0.9em; opacity: 0.8; }
.signature-style-26 .signature-script-year { font-size: 0.7em; opacity: 0.6; }
.signature-style-27 .signature-handwritten { font-size: 1.6em; }
.signature-style-27 .signature-handwritten-sub { font-size: 0.9em; opacity: 0.8; }
.signature-style-27 .signature-handwritten-date { font-size: 0.7em; opacity: 0.6; }
.signature-style-28 .signature-casual { font-size: 1.7em; }
.signature-style-28 .signature-casual-line { width: 60px; height: 1px; background: currentColor; margin: 4px 0; }
.signature-style-28 .signature-casual-info { font-size: 0.8em; opacity: 0.8; }
.signature-style-29 .signature-friendly { font-size: 1.5em; }
.signature-style-29 .signature-friendly-sub { font-size: 0.9em; opacity: 0.8; }
.signature-style-29 .signature-friendly-date { font-size: 0.7em; opacity: 0.6; }
.signature-style-30 .signature-playful { font-size: 2em; }
.signature-style-30 .signature-playful-sub { font-size: 0.8em; opacity: 0.8; }
.signature-style-30 .signature-playful-date { font-size: 0.7em; opacity: 0.6; }
.signature-style-31 .signature-modern { font-size: 1.9em; }
.signature-style-31 .signature-modern-line { width: 70px; height: 1px; background: currentColor; margin: 6px 0; }
.signature-style-31 .signature-modern-info { font-size: 0.8em; opacity: 0.8; }
.signature-style-32 .signature-classic { font-size: 1.8em; }
.signature-style-32 .signature-classic-title { font-size: 0.9em; opacity: 0.8; }
.signature-style-32 .signature-classic-year { font-size: 0.7em; opacity: 0.6; }
.signature-style-33 .signature-formal { font-size: 2.1em; }
.signature-style-33 .signature-formal-decoration { font-size: 1.2em; opacity: 0.7; margin: 4px 0; }
.signature-style-33 .signature-formal-info { font-size: 0.8em; opacity: 0.8; }
.signature-style-34 .signature-artistic { font-size: 1.7em; }
.signature-style-34 .signature-artistic-sub { font-size: 0.9em; opacity: 0.8; }
.signature-style-34 .signature-artistic-date { font-size: 0.7em; opacity: 0.6; }
.signature-style-35 .signature-delicate { font-size: 2.3em; }
.signature-style-35 .signature-delicate-line { width: 90px; height: 1px; background: currentColor; margin: 8px 0; }
.signature-style-35 .signature-delicate-info { font-size: 0.8em; opacity: 0.8; }
.signature-style-36 .signature-flowing { font-size: 2.4em; }
.signature-style-36 .signature-flowing-sub { font-size: 0.8em; opacity: 0.8; }
.signature-style-36 .signature-flowing-date { font-size: 0.7em; opacity: 0.6; }
.signature-style-37 .signature-elegant-script { font-size: 1.9em; }
.signature-style-37 .signature-elegant-script-decoration { font-size: 1.3em; opacity: 0.7; margin: 4px 0; }
.signature-style-37 .signature-elegant-script-info { font-size: 0.8em; opacity: 0.8; }
.signature-style-38 .signature-personal { font-size: 1.6em; }
.signature-style-38 .signature-personal-sub { font-size: 0.9em; opacity: 0.8; }
.signature-style-38 .signature-personal-date { font-size: 0.7em; opacity: 0.6; }
.signature-style-39 .signature-relaxed { font-size: 1.8em; }
.signature-style-39 .signature-relaxed-line { width: 65px; height: 1px; background: currentColor; margin: 5px 0; }
.signature-style-39 .signature-relaxed-info { font-size: 0.8em; opacity: 0.8; }
.signature-style-40 .signature-warm { font-size: 1.5em; }
.signature-style-40 .signature-warm-sub { font-size: 0.9em; opacity: 0.8; }
.signature-style-40 .signature-warm-date { font-size: 0.7em; opacity: 0.6; }
`;

// Inject styles into document
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = signatureStyles;
    document.head.appendChild(styleSheet);
}