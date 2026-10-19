import { type CleanValues, validate } from "@/lib/appointment";
import { onlineBookingAvailable, webhookTarget } from "@/lib/booking";

/**
 * POST /api/appointment
 *
 * Validates an appointment enquiry and forwards it to a delivery endpoint configured on
 * the SERVER only:
 *   APPOINTMENT_FORM_ENABLED=on  explicit release switch (see src/lib/booking.ts)
 *   APPOINTMENT_WEBHOOK_URL      required; https:// (http:// allowed for localhost only)
 *   APPOINTMENT_WEBHOOK_TOKEN    optional; sent as "Authorization: Bearer <token>"
 * There is no NEXT_PUBLIC_ switch: a public frontend flag cannot enable this route.
 *
 * It never reports success unless that endpoint answered 2xx. With no endpoint
 * configured it answers 503, so the form can never pretend to have delivered anything.
 * Personal details are never logged.
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

async function deliver(values: CleanValues, target: URL): Promise<boolean> {
  try {
    const res = await fetch(target, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.APPOINTMENT_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${process.env.APPOINTMENT_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({
        ...values,
        source: "website-contact-form",
        receivedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(8_000),
      redirect: "error",
    });
    return res.ok;
  } catch {
    return false;
  }
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

  const result = validate({
    name: String(b.name ?? ""),
    phone: String(b.phone ?? ""),
    service: String(b.service ?? ""),
    preferredDate: String(b.preferredDate ?? ""),
    consent: b.consent === true,
  });
  if (!result.ok) return json({ ok: false, code: "invalid", errors: result.errors }, 422);

  const target = webhookTarget();
  if (!target) return json({ ok: false, code: "not_configured" }, 503);

  const delivered = await deliver(result.values, target);
  return delivered ? json({ ok: true }, 200) : json({ ok: false, code: "delivery_failed" }, 502);
}
