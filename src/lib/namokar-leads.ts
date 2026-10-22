import type { CleanValues } from "@/lib/appointment";

export const GOOGLE_SHEETS_FALLBACK_URL = "https://script.google.com/macros/s/AKfycbwVxZMai0hUESuSAwV06N1AKKKaPP_pzKsCf6t1dp8qoLMeM9-24PUPAPlUhxNIbrec/exec";

export type NamokarLead = CleanValues & {
  submissionId: string;
  formId: "namokar-contact-v1" | "namokar-home-popup-v1";
  pageUrl: string;
};

const configuredUrl = (value: string | undefined): URL | null => {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
};

async function post(target: URL, body: unknown, headers: Record<string, string> = {}) {
  try {
    const response = await fetch(target, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(8_000),
      redirect: "error",
    });
    if (!response.ok) return false;
    const result = await response.json().catch(() => null) as { ok?: unknown; success?: unknown; error?: unknown } | null;
    return result?.ok !== false && result?.success !== false && !result?.error;
  } catch {
    return false;
  }
}

export async function deliverNamokarLead(lead: NamokarLead): Promise<"invictus" | "sheets" | null> {
  const invictus = configuredUrl(process.env.INVICTUS_NAMOKAR_LEADS_URL);
  if (invictus) {
    const accepted = await post(invictus, lead, {
      // PulseOS accepts leads only from the website server; never expose this in client code.
      ...(process.env.INVICTUS_NAMOKAR_LEADS_TOKEN
        ? { "X-PulseOS-Intake-Token": process.env.INVICTUS_NAMOKAR_LEADS_TOKEN }
        : {}),
    });
    if (accepted) return "invictus";
  }

  const sheetAccepted = await post(new URL(GOOGLE_SHEETS_FALLBACK_URL), {
    form: "Namokar Website Lead",
    data: { ...lead, deliveryPath: "website-sheet-fallback", receivedAt: new Date().toISOString() },
  });
  return sheetAccepted ? "sheets" : null;
}
