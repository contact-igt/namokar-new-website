import { randomUUID } from "crypto";
import { type FieldErrors, validate } from "@/lib/appointment";
import { onlineBookingAvailable } from "@/lib/booking";
import { deliverNamokarLead } from "@/lib/namokar-leads";

/**
 * POST /api/appointment
 *
 * Sends validated submissions server-to-server to Invictus, then to Google Sheets
 * only as the emergency fallback. Personal details and upstream credentials are never logged.
 */

const MAX_BODY = 4_096;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>(); // per server instance only

const json = (body: Record<string, unknown>, status: number, headers?: HeadersInit) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5_000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  if (process.env.APPOINTMENT_FORM_ENABLED !== "on")
    return json({ ok: false, code: "disabled" }, 503);
  if (!onlineBookingAvailable()) return json({ ok: false, code: "not_configured" }, 503);

  // Same-origin only.
  const origin = request.headers.get("origin");
  if (origin) {
    let host = "";
    try {
      host = new URL(origin).host;
    } catch {}
    if (host !== request.headers.get("host")) return json({ ok: false, code: "forbidden" }, 403);
  }
  if (!request.headers.get("content-type")?.includes("application/json"))
    return json({ ok: false, code: "bad_request" }, 415);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip))
    return json({ ok: false, code: "rate_limited" }, 429, { "Retry-After": "600" });

  const text = await request.text();
  if (text.length > MAX_BODY) return json({ ok: false, code: "too_large" }, 413);
  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return json({ ok: false, code: "bad_request" }, 400);
  }
  if (!body || typeof body !== "object") return json({ ok: false, code: "bad_request" }, 400);
  const b = body as Record<string, unknown>;

  // Honeypot: only automated fills touch this hidden field. Deliver nothing and say so
  // plainly, so a person whose browser autofilled it is never told it succeeded.
  if (typeof b.hp_check === "string" && b.hp_check.trim() !== "")
    return json({ ok: false, code: "rejected" }, 400);

  const formId = b.formId === "namokar-home-popup-v1" ? "namokar-home-popup-v1" : b.formId === "namokar-contact-v1" ? "namokar-contact-v1" : null;
  if (!formId) return json({ ok: false, code: "bad_request" }, 400);
  const result = validate({
    name: String(b.name ?? ""),
    phone: String(b.phone ?? ""),
    service: String(b.service ?? ""),
    preferredDate: String(b.preferredDate ?? ""),
    consent: b.consent === true,
    couponCode: String(b.couponCode ?? ""),
    referralCode: String(b.referralCode ?? ""),
    message: String(b.message ?? ""),
  });
  if (!result.ok) return json({ ok: false, code: "invalid", errors: result.errors }, 422);
  const errors: FieldErrors = {};
  if (!result.values.service) errors.service = "Please select a treatment option.";
  if (formId === "namokar-contact-v1" && !result.values.message) errors.message = "Please enter a short message.";
  if (Object.keys(errors).length) return json({ ok: false, code: "invalid", errors }, 422);

  const submissionId = typeof b.submissionId === "string" && /^[0-9a-f-]{36}$/i.test(b.submissionId) ? b.submissionId : randomUUID();
  const pageUrl = typeof b.pageUrl === "string" && b.pageUrl.length <= 500 ? b.pageUrl : "";
  const delivered = await deliverNamokarLead({ ...result.values, submissionId, formId, pageUrl });
  return delivered ? json({ ok: true, delivery: delivered }, 200) : json({ ok: false, code: "delivery_failed" }, 502);
}
