// Script simple pour créer des icônes SVG basiques
const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, 'public', 'icons');

// S'assurer que le dossier existe
if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
}

// Template SVG de base
function createSVGIcon(size) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#2563eb" rx="${size/8}"/>
  <text x="${size/2}" y="${size/2 - size/8}" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="${size/4}" font-weight="bold">DAF</text>
  <text x="${size/2}" y="${size/2 + size/6}" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="${size/8}">Formation</text>
</svg>`;
}

// Créer les icônes aux différentes tailles
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

sizes.forEach(size => {
    const svgContent = createSVGIcon(size);
    const filename = `icon-${size}x${size}.svg`;
    const filepath = path.join(iconsDir, filename);

    fs.writeFileSync(filepath, svgContent);
    console.log(`Créé: ${filename}`);
});

console.log('Toutes les icônes SVG ont été créées !');
console.log('Note: Pour une PWA optimale, convertissez ces SVG en PNG avec un outil comme Inkscape ou un convertisseur en ligne.');