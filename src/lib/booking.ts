/**
 * Server-side booking configuration. Import this only from server code (pages, layouts,
 * route handlers); it reads server-only environment variables.
 *
 * Online appointment requests exist only when the explicit release switch is on.
 * Delivery goes to PulseOS when INVICTUS_NAMOKAR_LEADS_URL is configured to its
 * /forms/website/<connectorId> intake URL, with the server-side Google Sheets
 * fallback used when that service is unavailable.
 *   APPOINTMENT_FORM_ENABLED=on   an explicit release decision
 *   INVICTUS_NAMOKAR_LEADS_URL   PulseOS website-intake URL (https only)
 * Optional: INVICTUS_NAMOKAR_LEADS_TOKEN (sent server-to-server; never exposed to the browser).
 *
 * There is intentionally no NEXT_PUBLIC_ switch: a public frontend flag cannot turn this on.
 */
export function webhookTarget(): URL | null {
  const raw = process.env.APPOINTMENT_WEBHOOK_URL;
  if (!raw) return null;
  try {
    const url = new URL(raw);
    const local = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
    if (url.protocol === "https:" || (url.protocol === "http:" && local)) return url;
  } catch {}
  return null;
}

export function onlineBookingAvailable(): boolean {
  return process.env.APPOINTMENT_FORM_ENABLED === "on";
}
