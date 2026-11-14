const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function createTunnelVision() {
  const dir = path.join(process.cwd(), 'public', 'images', 'glaucoma');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const inputPath = path.join(process.cwd(), 'public', 'images', 'cataract-vision-comparison.png');
  const metadata = await sharp(inputPath).metadata();
  const width = metadata.width || 1672;
  const height = metadata.height || 941;

  // Create an SVG radial mask for tunnel vision
  // Central field is clear (transparent), fading to dark vignette around perimeter
  const svgMask = Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="tunnel" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stop-color="#0a1218" stop-opacity="0" />
          <stop offset="30%" stop-color="#0a1218" stop-opacity="0" />
          <stop offset="42%" stop-color="#0a1218" stop-opacity="0.4" />
          <stop offset="54%" stop-color="#0a1218" stop-opacity="0.85" />
          <stop offset="65%" stop-color="#0a1218" stop-opacity="0.97" />
          <stop offset="100%" stop-color="#0a1218" stop-opacity="1" />
        </radialGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#tunnel)" />
    </svg>
  `);

  const outPath = path.join(dir, 'glaucoma-tunnel-vision.webp');
  await sharp(inputPath)
    .composite([{ input: svgMask, blend: 'over' }])
    .webp({ quality: 92 })
    .toFile(outPath);

  console.log('Tunnel vision image created:', outPath);
}

async function prepareCard2FromUpload() {
  const dir = path.join(process.cwd(), 'public', 'images', 'glaucoma');
  const uploadedCard = path.join(
    'C:/Users/sveer/.gemini/antigravity/brain/ba481393-9b83-477f-9bee-e8b5e0a66b93/.user_uploaded/media_1794661045341_581263d8.jpg'
  );
  
  if (fs.existsSync(uploadedCard)) {
    // Crop the exact right card (woman holding forehead with headache/nausea)
    // Image 1 is 1024x327
    // The right card starts around x=614, y=120, width=355, height=195
    const outPath = path.join(dir, 'glaucoma-acute-symptoms.webp');
    await sharp(uploadedCard)
      .extract({ left: 614, top: 120, width: 355, height: 195 })
      .resize(800, 440, { fit: 'cover' })
      .webp({ quality: 90 })
      .toFile(outPath);
    console.log('Acute symptoms image extracted and enhanced:', outPath);
  }
}

async function main() {
  await createTunnelVision();
  await prepareCard2FromUpload();
}

main().catch(console.error);
