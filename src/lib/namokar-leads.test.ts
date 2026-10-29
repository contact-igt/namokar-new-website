import assert from "node:assert/strict";
import test from "node:test";
import { deliverNamokarLead } from "./namokar-leads";

test("sends the Namokar tenant key to Invictus", async () => {
  const originalFetch = globalThis.fetch;
  const originalUrl = process.env.INVICTUS_NAMOKAR_LEADS_URL;
  const originalKey = process.env.INVICTUS_NAMOKAR_CLIENT_KEY;
  let headers: Headers | undefined;
  let payload: { email?: string } | undefined;

  process.env.INVICTUS_NAMOKAR_LEADS_URL = "https://invictus.example/api/v1/namokar/website-leads";
  delete process.env.INVICTUS_NAMOKAR_CLIENT_KEY;
  globalThis.fetch = async (_input, init) => {
    headers = new Headers(init?.headers);
    payload = JSON.parse(String(init?.body));
    return new Response(JSON.stringify({ success: true }), { status: 201 });
  };

  try {
    assert.equal(await deliverNamokarLead({
      submissionId: "00000000-0000-4000-8000-000000000001",
      formId: "namokar-contact-v1",
      name: "Test Patient",
      phone: "9876543210",
      email: "patient@example.com",
      service: "Cataract Surgery",
      preferredDate: "",
      consent: true,
      couponCode: "",
      referralCode: "",
      message: "Please call.",
      pageUrl: "https://www.namokareyecare.com/contact-us",
    }), "invictus");
    assert.equal(headers?.get("X-Client-Key"), "namokar");
    assert.equal(payload?.email, "patient@example.com");
  } finally {
    globalThis.fetch = originalFetch;
    if (originalUrl === undefined) delete process.env.INVICTUS_NAMOKAR_LEADS_URL;
    else process.env.INVICTUS_NAMOKAR_LEADS_URL = originalUrl;
    if (originalKey === undefined) delete process.env.INVICTUS_NAMOKAR_CLIENT_KEY;
    else process.env.INVICTUS_NAMOKAR_CLIENT_KEY = originalKey;
  }
});
