/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-unused-vars */
const sharp = require('sharp');
const path = require('path');

async function generate() {
  const W = 1300;
  const H = 1152;

  // 1. Prepare Dr. Poonam Jain image resized to cover the arch area
  // In private-assets/dr-poonam-jain-desk.webp (2400x1600):
  // Dr. Poonam Jain is seated slightly to the right of center.
  // We extract a generous bounding box and resize to W x H.
  const croppedDoc = await sharp('private-assets/dr-poonam-jain-desk.webp')
    .extract({ left: 650, top: 40, width: 1750, height: 1550 })
    .resize(W, H, { fit: 'cover', position: 'center' })
    .toBuffer();

  // 2. Arch mask path
  // The curve starts from top-left (around x=240), curves down towards x=50, then to x=120 at bottom.
  const archPath = `M 260 0 C 130 180, 40 380, 70 650 C 95 850, 130 1020, 120 1152 L ${W} 1152 L ${W} 0 Z`;

  // SVG mask
  const maskSvg = Buffer.from(`
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <path d="${archPath}" fill="#ffffff" />
    </svg>
  `);

  const maskPng = await sharp(maskSvg).png().toBuffer();

  // Apply mask to doctor image
  const maskedDoc = await sharp(croppedDoc)
    .composite([{ input: maskPng, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // 3. Overlay borders & decorative dot matrix
  // Generate dot matrix: 6 columns x 4 rows
  let dotsSvg = '';
  const dotStartX = W - 240;
  const dotStartY = 80;
  const dotSpacingX = 32;
  const dotSpacingY = 32;
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 6; c++) {
      const cx = dotStartX + c * dotSpacingX;
      const cy = dotStartY + r * dotSpacingY;
      dotsSvg += `<circle cx="${cx}" cy="${cy}" r="3.5" fill="#E89A60" opacity="0.45" />`;
    }
  }

  // The decorative border along the arch line:
  // We draw the line from (260, 0) down to (120, 1152) with two strokes:
  // Outer soft peach/tan stroke, inner terracotta stroke.
  const borderCurve = `M 260 0 C 130 180, 40 380, 70 650 C 95 850, 130 1020, 120 1152`;

  const decorOverlaySvg = Buffer.from(`
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <!-- Outer soft peach stroke -->
      <path d="${borderCurve}" fill="none" stroke="#F4D3B8" stroke-width="16" stroke-linecap="round" opacity="0.85" />
      <!-- Inner warm terracotta stroke -->
      <path d="${borderCurve}" fill="none" stroke="#E89A60" stroke-width="6" stroke-linecap="round" />
      <!-- Top-right terracotta dot matrix -->
      ${dotsSvg}
    </svg>
  `);

  const decorOverlayPng = await sharp(decorOverlaySvg).png().toBuffer();

  // Composite the masked doctor with the decorative borders
  const finalVisual = await sharp(maskedDoc)
    .composite([{ input: decorOverlayPng, blend: 'over' }])
    .webp({ quality: 92 })
    .toFile('public/images/aesthetic/aesthetic-doctor-real.webp');

  console.log('Successfully generated aesthetic-doctor-real.webp:', finalVisual);
}

generate().catch(console.error);
