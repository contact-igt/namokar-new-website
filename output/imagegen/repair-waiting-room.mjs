import sharp from 'sharp';
import path from 'node:path';

async function main() {
  const originalPath = path.resolve('public/images/Modern Ophthalmology Clinic Waiting Room.png');
  const generatedPath = 'C:/Users/admin/.codex/generated_images/01a1c93d-1152-70c0-94cc-7fab3d0a88f9/exec-bbc65c6d-907c-4559-b3c9-a9717536ff44.png';
  const outputPath = path.resolve('public/images/Modern Ophthalmology Clinic Waiting Room-clean.png');
  const original = await sharp(originalPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const generated = await sharp(generatedPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = original.info;
  if (generated.info.width !== width || generated.info.height !== height) throw new Error('Repair dimensions must match the original.');
  const result = Buffer.from(original.data);
  const area = { left: 625, top: 730, right: 915, bottom: height };
  const smooth = (t) => { t = Math.max(0, Math.min(1, t)); return t * t * (3 - 2 * t); };
  for (let y = area.top; y < area.bottom; y++) {
    for (let x = area.left; x < area.right; x++) {
      const blend = Math.min(smooth((x - area.left) / 24), smooth((area.right - 1 - x) / 24), smooth((y - area.top) / 18));
      const pixel = (y * width + x) * channels;
      for (let c = 0; c < channels; c++) result[pixel + c] = Math.round(original.data[pixel + c] * (1 - blend) + generated.data[pixel + c] * blend);
    }
  }
  await sharp(result, { raw: { width, height, channels } }).png().toFile(outputPath);
  const saved = await sharp(outputPath).ensureAlpha().raw().toBuffer();
  let changedPixels = 0;
  let changedOutsideRepair = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const pixel = (y * width + x) * channels;
      if (saved.subarray(pixel, pixel + channels).equals(original.data.subarray(pixel, pixel + channels))) continue;
      changedPixels++;
      if (x < area.left || x >= area.right || y < area.top || y >= area.bottom) changedOutsideRepair++;
    }
  }
  if (changedOutsideRepair) throw new Error('Pixels changed outside the repair.');
  console.log(JSON.stringify({ outputPath, width, height, repairArea: area, changedPixels, changedOutsideRepair }));
}

main().catch(error => { console.error(error); process.exitCode = 1; });
