import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ASSETS, previewRequestAllowed } from "@/config/assets";
import { FIGURES, type Figure } from "@/config/figures";
import { PAGES } from "@/config/routes";
import { VIDEOS } from "@/content/videos";

export const metadata: Metadata = { title: "Local design review", robots: { index: false, follow: false } };

/**
 * Private index of everything that is shown in the local review but has NOT been approved.
 * It exists so the visual review can be clean (no labels on pictures) without losing the
 * approval context. It answers 404 unless the server runs with ASSET_PREVIEW=on AND the request
 * comes from this computer (also enforced in src/proxy.ts). Nothing here changes any approval.
 */
async function Index() {
  if (!previewRequestAllowed(await headers())) notFound();
  const assets = Object.entries(ASSETS);
  const pending = assets.filter(([, a]) => !a.approved);
  return (
    <div className="container rv">
      <h1 className="h2">Local design review: pending items</h1>
      <p className="lead">
        Everything below is visible in this private preview and is <strong>not approved</strong>. It is hidden, and
        its files return 404, in a normal build. Approvals are recorded in <code>src/config/assets.ts</code>,{" "}
        <code>src/config/figures.ts</code> and <code>docs/client-approval/</code>; this page changes none of them.
      </p>

      <h2 className="h3">Photographs and local videos ({pending.length} pending of {assets.length})</h2>
      <div className="rv-wrap">
        <table className="rv-table">
          <thead>
            <tr><th>Item</th><th>File</th><th>People</th><th>Status</th><th>What approval is outstanding</th></tr>
          </thead>
          <tbody>
            {assets.map(([key, a]) => (
              <tr key={key}>
                <td>{key}</td>
                <td><code>{a.file}</code></td>
                <td>{a.people}</td>
                <td>{a.approved ? "Approved" : "Pending"}</td>
                <td>{a.approval}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="h3">Videos ({VIDEOS.length})</h2>
      <div className="rv-wrap">
        <table className="rv-table">
          <thead>
            <tr><th>Source</th><th>Title</th><th>Status</th><th>Check before approving</th></tr>
          </thead>
          <tbody>
            {VIDEOS.map((v) => (
              <tr key={v.id}>
                <td>{v.source === "youtube" ? `YouTube ${v.videoId}` : "Local file"}</td>
                <td>{v.title}</td>
                <td>{v.source === "youtube" ? (v.approved ? "Approved" : "Pending") : "See the file in the table above"}</td>
                <td>{v.review}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="h3">Clinical illustrations ({Object.keys(FIGURES).length})</h2>
      <div className="rv-wrap">
        <table className="rv-table">
          <thead>
            <tr><th>Figure</th><th>Page</th><th>Status</th><th>Reviewer</th><th>Reviewer must check</th></tr>
          </thead>
          <tbody>
            {Object.entries(FIGURES as Record<string, Figure>).map(([id, f]) => (
              <tr key={id}>
                <td>{f.title}</td>
                <td>{f.page}</td>
                <td>{f.approved ? "Approved" : "Pending medical review"}</td>
                <td>{f.reviewer ? `${f.reviewer.name} (${f.reviewer.date})` : "none"}</td>
                <td>{f.check}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="h3">Pages not yet reviewed</h2>
      <ul className="rv-list">
        {Object.values(PAGES).filter((p) => !p.reviewed).map((p) => (
          <li key={p.path}><strong>{p.label}</strong> ({p.path}): {p.blocker}</li>
        ))}
      </ul>
    </div>
  );
}

export default function ReviewPage() {
  return (
    <main id="main" className="section">
      <Suspense fallback={null}>
        <Index />
      </Suspense>
    </main>
  );
}
