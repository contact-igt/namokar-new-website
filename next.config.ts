import type { NextConfig } from "next";
import { readFileSync } from "node:fs";
import path from "node:path";
import { LEGACY_REDIRECTS } from "./src/config/redirects";

/**
 * Deployment packaging for /media. Only files whose asset is approved in src/config/assets.ts
 * are traced into a deployment; a local review preview (ASSET_PREVIEW=on) packages all of
 * /private-assets. With nothing approved, no private media is packaged at all.
 * (The registry is read as text so this file does not depend on TypeScript path aliases.)
 */
function mediaTracing(): { include: string[]; exclude: string[] } {
  const src = readFileSync(path.join(__dirname, "src/config/assets.ts"), "utf8");
  const include: string[] = [];
  const exclude: string[] = [];
  for (const m of src.matchAll(/file:\s*"([^"]+)"[\s\S]*?approved:\s*(true|false)/g)) {
    if (m[1].startsWith("namokar-logo")) continue;
    (m[2] === "true" || process.env.ASSET_PREVIEW === "on" ? include : exclude).push(`./private-assets/${m[1]}`);
  }
  return { include, exclude };
}

// A review preview packages every pending file (see mediaTracing). It exists for a local review
// only, so a hosted build refuses to run with it on rather than ship pending media.
if (process.env.ASSET_PREVIEW === "on" && (process.env.VERCEL || process.env.VERCEL_ENV)) {
  throw new Error("ASSET_PREVIEW=on is for local review only. Unset it for any hosted build.");
}

const { include, exclude } = mediaTracing();

const nextConfig: NextConfig = {
  cacheComponents: true,
  // Legacy WordPress addresses (src/config/redirects.ts). A legacy address with a trailing slash
  // reaches its destination in two hops: Next.js first removes the slash (308), then this rule.
  async redirects() {
    return LEGACY_REDIRECTS.map((r) => ({ source: r.source, destination: r.destination, permanent: r.permanent }));
  },
  partialPrefetching: true,
  turbopack: { root: path.resolve(__dirname) },
  // The route reads files by a computed path, so the tracer would otherwise pull in the whole
  // folder. Pending files are excluded explicitly; approved ones are included explicitly.
  outputFileTracingIncludes: { "/media/*": include },
  outputFileTracingExcludes: { "/media/*": ["./private-assets/**/*", ...exclude] },
};

export default nextConfig;
