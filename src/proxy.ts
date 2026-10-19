import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { assetByFile, previewRequestAllowed } from "@/config/assets";
import { ARTICLES } from "@/content/articles";

/**
 * Unknown article addresses must answer with a real 404 status. Under Cache Components the
 * article page streams after its shell has been sent, which would make an unknown slug a
 * "soft 404" (a 404 page served with status 200). Checking here, before rendering, avoids that.
 * Known slugs pass straight through. The legacy WordPress blog listed no posts when checked
 * (16 Oct 2026), so there are no old permalinks to redirect.
 */
export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const notFound = () => NextResponse.rewrite(new URL("/page-not-found", request.url));

  // The private review index answers only in the local review preview, to this computer.
  if (path === "/review") return previewRequestAllowed(request.headers) ? NextResponse.next() : notFound();

  // The image optimizer keeps resized copies. A copy of a pending photograph made for a local review
  // request must never be handed to anyone else, so refuse optimizer requests for pending media
  // unless the request is itself a local review request.
  if (path === "/_next/image") {
    const src = request.nextUrl.searchParams.get("url") ?? "";
    if (src.startsWith("/media/")) {
      let file = "";
      try {
        file = decodeURIComponent(src.slice("/media/".length).split("?")[0]);
      } catch {
        return notFound();
      }
      const asset = assetByFile(file);
      if (asset && !asset.approved && !previewRequestAllowed(request.headers)) return notFound();
    }
    return NextResponse.next();
  }

  const slug = request.nextUrl.pathname.split("/")[2] ?? "";
  if (ARTICLES.some((a) => a.slug === slug)) return NextResponse.next();
  return NextResponse.rewrite(new URL("/page-not-found", request.url));
}

export const config = { matcher: ["/blogs/:slug", "/review", "/_next/image"] };
