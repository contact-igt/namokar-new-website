/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-unused-vars */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function build() {
  const W = 1200;
  const H = 900;

  // Arch mask:
  // Starts at x=380 at the top, curves gracefully down to x=220 at y=450, and x=250 at y=900.
  // The left 380px (approx 32% of width) is transparent, ensuring ample clearance for left-aligned text.
  const archPath = 'M 380 0 C 260 200, 180 400, 210 600 C 230 750, 245 840, 260 900 L 1200 900 L 1200 0 Z';
  const borderCurve = 'M 380 0 C 260 200, 180 400, 210 600 C 230 750, 245 840, 260 900';

  const maskSvg = Buffer.from(`
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <path d="${archPath}" fill="#ffffff" />
    </svg>
  `);
  const maskPng = await sharp(maskSvg).png().toBuffer();

  // Dot matrix at top right: 6 cols x 4 rows
  let dotsSvg = '';
  const dotStartX = W - 180;
  const dotStartY = 50;
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 6; c++) {
      dotsSvg += `<circle cx="${dotStartX + c * 24}" cy="${dotStartY + r * 24}" r="3" fill="#E89A60" opacity="0.45" />`;
    }
  }

  const decorSvg = Buffer.from(`
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <!-- Outer soft peach stroke -->
      <path d="${borderCurve}" fill="none" stroke="#F5D6BE" stroke-width="16" stroke-linecap="round" opacity="0.85" />
      <!-- Inner crisp terracotta stroke -->
      <path d="${borderCurve}" fill="none" stroke="#E89A60" stroke-width="4.5" stroke-linecap="round" />
      ${dotsSvg}
    </svg>
  `);
  const decorPng = await sharp(decorSvg).png().toBuffer();

  // 1. Dr. Poonam Jain Desk (ASSETS.docDesk)
  if (fs.existsSync('private-assets/dr-poonam-jain-desk.webp')) {
    const croppedDesk = await sharp('private-assets/dr-poonam-jain-desk.webp')
      .extract({ left: 600, top: 20, width: 1780, height: 1560 })
      .resize(W, H, { fit: 'cover', position: 'center' })
      .toBuffer();

    const maskedDesk = await sharp(croppedDesk)
      .composite([{ input: maskPng, blend: 'dest-in' }])
      .png()
      .toBuffer();

    await sharp(maskedDesk)
      .composite([{ input: decorPng, blend: 'over' }])
      .webp({ quality: 92 })
      .toFile('public/images/aesthetic/dr-poonam-jain-banner-desk.webp');
    console.log('Saved dr-poonam-jain-banner-desk.webp');
  }

  // 2. Dr. Poonam Jain Slit Exam (Copy of DSC06796)
  if (fs.existsSync('public/images/Copy of DSC06796-200kb.jpg')) {
    const croppedExam = await sharp('public/images/Copy of DSC06796-200kb.jpg')
      .resize(W, H, { fit: 'cover', position: 'center' })
      .toBuffer();

    const maskedExam = await sharp(croppedExam)
      .composite([{ input: maskPng, blend: 'dest-in' }])
      .png()
      .toBuffer();

    await sharp(maskedExam)
      .composite([{ input: decorPng, blend: 'over' }])
      .webp({ quality: 92 })
      .toFile('public/images/aesthetic/dr-poonam-jain-banner-exam.webp');
    console.log('Saved dr-poonam-jain-banner-exam.webp');
  }

  // 3. Dr. Poonam Jain Standing Portrait (Copy of DSC06862.JPG)
  if (fs.existsSync('public/images/Copy of DSC06862.JPG')) {
    const croppedPortrait = await sharp('public/images/Copy of DSC06862.JPG')
      .extract({ left: 300, top: 150, width: 3400, height: 3800 })
      .resize(W, H, { fit: 'cover', position: 'top' })
      .toBuffer();

    const maskedPortrait = await sharp(croppedPortrait)
      .composite([{ input: maskPng, blend: 'dest-in' }])
      .png()
      .toBuffer();

    await sharp(maskedPortrait)
      .composite([{ input: decorPng, blend: 'over' }])
      .webp({ quality: 92 })
      .toFile('public/images/aesthetic/dr-poonam-jain-banner-portrait.webp');
    console.log('Saved dr-poonam-jain-banner-portrait.webp');
  }
}

build().catch(console.error);

