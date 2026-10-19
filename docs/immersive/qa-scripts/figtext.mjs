import { chromium } from "playwright-core";
import fs from "node:fs";
const [base, out] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: process.env.HOME + "/Library/Caches/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-mac-arm64/chrome-headless-shell" });
const p = await (await b.newContext({ viewport: { width: 1280, height: 900 } })).newPage();
const FIGS = [
  ["/stitchless-cataract-surgery", "eyeAnatomy", ["Healthy lens", "Clouded lens (cataract)", "Cornea", "Iris", "Pupil", "Lens", "Vitreous", "Retina", "Optic nerve"]],
  ["/stitchless-cataract-surgery", "lensCompare", ["Mild", "Moderate", "More advanced"]],
  ["/stitchless-cataract-surgery", "lensDesigns", ["Distance", "Distance and near", "Astigmatism"]],
  ["/stitchless-cataract-surgery", "cataractSteps", [/^Step 1:/, /^Step 2:/, /^Step 3:/, /^Step 4:/]],
  ["/glaucoma-management", "glaucomaFlow", ["Drains normally", "Drainage slowed"]],
  ["/glaucoma-management", "sideVision", ["Typical view", "Early narrowing", "Advanced narrowing"]],
  ["/comprehensive-eye-examinations", "examParts", ["How well you see", "Spectacle needs", "Eye pressure", "The front of the eye", "The back of the eye"]],
  ["/eyelid-surgery-blepharoplasty", "eyelidPosition", ["Typical", "Drooping", "Excess skin"]],
  ["/eye-plastic-reconstructive-surgery", "tearPathway", ["Tears drain", "Passage blocked", "Tear gland", "Puncta", "Canaliculi", "Tear sac", "Tear duct"]],
  ["/eye-plastic-reconstructive-surgery", "lidMalposition", ["Typical", "Turning in", "Turning out"]],
  ["/aesthetic-oculofacial", "consultationQuestions", []],
];
const clean = (t) => t.replace(/\s+/g, " ").trim();
let md = "";
let cur = "";
for (const [path, id, controls] of FIGS) {
  if (cur !== path) { await p.goto(base + path, { waitUntil: "networkidle" }); cur = path; }
  const f = p.locator(`[data-figure="${id}"]`);
  const head = clean(await f.locator("h2").first().innerText());
  const intro = clean(await f.locator(".clin-head .lead").first().textContent().catch(() => ""));
  md += `### ${head}\n\n- Figure id: \`${id}\`  ·  Page: \`${path}\`\n- Introduction shown above the figure: ${intro}\n\n| Control | Text shown |\n|---|---|\n`;
  for (const c of controls) {
    await f.getByRole("button", typeof c === "string" ? { name: c, exact: true } : { name: c }).first().click(); await p.waitForTimeout(350);
    const txt = [];
    for (const sel of [".clin-panel", ".clin-cue"]) { const n = await f.locator(sel).count(); for (let i = 0; i < n; i++) txt.push(clean(await f.locator(sel).nth(i).innerText())); }
    md += `| ${typeof c === "string" ? c : "Step " + String(c).match(/\d/)[0]} | ${[...new Set(txt)].join(" ").replace(/\|/g, "\\|")} |\n`;
  }
  if (id === "consultationQuestions") {
    for (const q of await f.locator(".cq-item").allTextContents()) md += `| Question | ${clean(q)} |\n`;
  }
  md += `\nCaption under every figure: ${clean(await f.locator(".clin-note").innerText())}\n\n`;
}
fs.writeFileSync(out, md);
console.log("written", md.length);
await b.close();
