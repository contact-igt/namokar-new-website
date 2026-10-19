import { open, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { ASSET_PREVIEW, assetByFile, forwardedFromElsewhere, isLoopbackHost } from "@/config/assets";

/**
 * Serves files from /private-assets, but only those the asset registry allows:
 * approved assets, or any asset while the server-side review preview is on.
 * Everything else, including unknown names, answers 404, so pending photographs
 * are not reachable by guessing a URL. Supports Range requests so video can seek.
 */
const TYPES: Record<string, string> = {
  ".webp": "image/webp",
  ".mp4": "video/mp4",
  ".vtt": "text/vtt; charset=utf-8",
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ file: string }> },
) {
  const { file } = await params;
  const asset = assetByFile(file);
  // Approved assets are served to everyone. Pending ones only during a local review preview.
  // Preview-only files are served only during a local review: a loopback Host header, or the
  // framework's own internal image-optimizer request (which carries no Host header but does
  // carry a loopback X-Forwarded-Host). Requests that name any other host are refused.
  const host = request.headers.get("host");
  const internal = !host && isLoopbackHost(request.headers.get("x-forwarded-host"));
  const previewOk = ASSET_PREVIEW && (isLoopbackHost(host) || internal) && !forwardedFromElsewhere(request.headers);
  if (!asset || !(asset.approved || previewOk)) return new Response("Not found", { status: 404 });

  const full = path.join(process.cwd(), "private-assets", asset.file);
  let size: number;
  try {
    size = (await stat(full)).size;
  } catch {
    return new Response("Not found", { status: 404 });
  }
  const type = TYPES[path.extname(asset.file)] ?? "application/octet-stream";
  // Approved media may be cached; preview-only media must never be.
  const cache = asset.approved ? "public, max-age=3600" : "no-store";

  const range = request.headers.get("range")?.match(/^bytes=(\d*)-(\d*)$/);
  if (range && (range[1] || range[2])) {
    let start = range[1] ? Number(range[1]) : size - Number(range[2]);
    let end = range[1] && range[2] ? Number(range[2]) : size - 1;
    start = Math.max(0, start);
    end = Math.min(end, size - 1);
    if (start > end || start >= size)
      return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${size}` } });
    // Read only the requested bytes, so seeking in a video does not load the whole file each time.
    const length = end - start + 1;
    const handle = await open(full, "r");
    const chunk = Buffer.alloc(length);
    try {
      await handle.read(chunk, 0, length, start);
    } finally {
      await handle.close();
    }
    return new Response(new Uint8Array(chunk), {
      status: 206,
      headers: {
        "Content-Type": type,
        "Content-Range": `bytes ${start}-${end}/${size}`,
        "Content-Length": String(end - start + 1),
        "Accept-Ranges": "bytes",
        "Cache-Control": cache,
        "X-Content-Type-Options": "nosniff",
      },
    });
  }
  return new Response(new Uint8Array(await readFile(full)), {
    headers: {
      "Content-Type": type,
      "Content-Length": String(size),
      "Accept-Ranges": "bytes",
      "Cache-Control": cache,
      "X-Content-Type-Options": "nosniff",
    },
  });
}
