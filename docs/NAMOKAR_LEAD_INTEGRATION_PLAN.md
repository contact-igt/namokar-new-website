# Namokar website leads — implementation plan

## Confirmed architecture

This integration has three destinations with distinct responsibilities:

| System | Responsibility | Source of truth |
| --- | --- | --- |
| Namokar website | Validates the Contact Us and home-popup forms and redirects the visitor after acceptance. | No lead database or secrets in the browser. |
| Invictus Lead Admin | Saves the Namokar website lead, shows it in a Namokar Website Leads tab, and durably tracks Google Sheets/PulseOS delivery. | Internal operational copy and delivery outbox. |
| PulseOS | Creates or reuses the patient and journey, records Source = Website, timeline, and callback task. | Clinical/CRM lead intake. |

Google Sheets is a server-side mirror and fallback, never a browser destination.

```text
Contact form or home popup
  -> POST Namokar /api/appointment
  -> POST Invictus Namokar public-intake API
       -> transaction: Namokar website_leads row + outbox rows
       -> PulseOS Website Leads intake (server token)
       -> Google Sheets mirror/retry worker
  -> accepted -> /thank-you

If Namokar -> Invictus is unavailable
  -> Namokar server posts the validated lead directly to Google Apps Script
  -> acknowledged -> /thank-you
  -> rejected/timeout -> show error and call-the-centre fallback
```

The browser never calls PulseOS or Google Sheets directly, and never receives the PulseOS token.

## Evidence checked

### PulseOS (`C:\Invictus_Projects\pulseos--live`)

`POST /forms/website/:connectorId` already exists in
`apps/api/src/domain/acquisition/website-form.routes.ts`.

- The supplied Namokar endpoint is:
  `https://pulseosapi-production-a7a9.up.railway.app/forms/website/328e8ec9-eff6-476f-ad2f-b3dd6a988739`
- Authentication is `X-PulseOS-Intake-Token`, applied by a server only.
- `submissionId` is idempotent. Reusing it on a retry produces no duplicate lead.
- The payload accepts `submissionId`, `formId`, `name`, `phone`, `email`, `service`, `message`, `language`, `branchId`, `pageUrl`, `utm`, and `clickIds`.
- The connector must be enabled, token-protected, require a service, use fixed source `website`, and allow the Namokar origin(s).
- A successful request creates/reuses the patient and lead journey, writes the website source/timeline, and creates a callback task.

### Invictus Admin (`C:\Invictus_Projects\invictus-admin-panel`)

The Birthwave Website Leads module is the closest reusable pattern:

- a dedicated tenant-scoped `website_leads` table;
- unique `(client_id, source_key, external_submission_id)` idempotency;
- a transaction that persists the lead before downstream delivery;
- `sheet_sync_status`, attempts, last error, synced time, next retry time;
- an inline attempt plus a one-minute retry worker with capped attempts;
- a protected admin table/API with search, filters, detail, update, retry, and export.

The Shanti website shows the older direct browser-to-backend and backend-to-Sheets pattern. Do **not** copy its public client key or browser-to-Sheets call; retain its Apps Script acknowledgement handling only.

## Form contract

Both Namokar forms use the same server route, but keep their field scope.

| Field | Contact Us | Home popup | Notes |
| --- | --- | --- | --- |
| Full name | required | required | max 120 after server validation |
| Indian mobile number | required | required | normalize to E.164 `+91…` |
| Selected treatment | required | required | map to PulseOS `service` |
| Message | required | optional | max 1,000 for PulseOS; website display cap may remain 300 |
| Referral code | never shown | optional | store only in Invictus metadata/Sheets until PulseOS approves a schema field |
| Consent | required | required | retain the existing legal text |

Every browser submit creates one UUID `submissionId` and retains it when the same submission is retried.

## Payloads

### Namokar website to Invictus public intake

`POST /api/v1/namokar/public/website-leads` (final deployed Invictus base URL to be supplied)

```json
{
  "submissionId": "uuid",
  "formId": "namokar-contact-v1",
  "name": "Asha Kulkarni",
  "phone": "+919820000000",
  "service": "cataract",
  "message": "Please call after 5 pm",
  "consent": true,
  "referralCode": null,
  "pageUrl": "https://www.namokar…/contact-us",
  "utm": { "source": null, "medium": null, "campaign": null, "content": null, "term": null },
  "clickIds": { "gclid": null, "gbraid": null, "wbraid": null, "fbclid": null }
}
```

Protect this public route with a server-to-server secret or signed request. The website sends it from its Next.js route, never from client JavaScript.

### Invictus to PulseOS

```http
POST https://pulseosapi-production-a7a9.up.railway.app/forms/website/328e8ec9-eff6-476f-ad2f-b3dd6a988739
Content-Type: application/json
X-PulseOS-Intake-Token: <server-only token>
```

```json
{
  "submissionId": "uuid",
  "formId": "namokar-contact-v1",
  "name": "Asha Kulkarni",
  "phone": "+919820000000",
  "service": "Cataract Surgery",
  "message": "Please call after 5 pm",
  "language": "en",
  "pageUrl": "https://www.namokar…/contact-us",
  "utm": {},
  "clickIds": {}
}
```

The PulseOS URL may be a backend code constant because it is not a secret. The token must be supplied later through the Invictus backend secret store; it must not be hard-coded, committed, sent to Namokar, or exposed in an admin response.

### Invictus / website server to Google Sheets

Use this approved Apps Script URL as a **server-only code constant** in the Invictus Namokar sheet-sync service and as the Namokar emergency fallback constant:

```text
https://script.google.com/macros/s/AKfycbwVxZMai0hUESuSAwV06N1AKKKaPP_pzKsCf6t1dp8qoLMeM9-24PUPAPlUhxNIbrec/exec
```

Post `{ form: "Namokar Website Lead", data: { ... } }`, use an 8-second timeout, and accept success only for HTTP 2xx plus no explicit `success:false`, `ok:false`, error/failure status, or error field. Never log names, phones, tokens, or full error payloads.

## Implementation phases

### 1. Namokar website

Files:

- `src/components/AppointmentForm.tsx`
- `src/components/HomeAppointmentPopup.tsx`
- `src/lib/appointment.ts`
- `src/app/api/appointment/route.ts`
- `src/lib/namokar-leads.ts` (new)
- `src/app/thank-you/page.tsx` (new)
- `src/config/routes.ts`, sitemap/metadata as needed

Work:

1. Keep the current Contact Us reference-style UI and the home popup referral field.
2. Make shared validation form-aware: contact requires treatment/message; popup requires treatment and allows an optional referral code.
3. Replace the generic webhook client with one Next.js server-side delivery function to Invictus.
4. Keep body limit, JSON-only, same-origin check, honeypot, rate limit, revalidation, timeout, and no PII logging.
5. On an Invictus `200`/`201` accepted response, return `{ ok: true }`; the client redirects to `/thank-you?form=contact` or `?form=home`.
6. If Invictus is unreachable, times out, or returns a 5xx, use the same validated payload to post to the Apps Script fallback. Redirect only after its acknowledgement.
7. Do not fall back to Sheets for validation/authorization errors from Invictus (400/401/403/422/429); show the accurate error instead.
8. Add a calm thank-you page that says the request is not a confirmed appointment and retains the phone CTA.

### 2. Invictus Lead Backend

Create a standalone `namokar` module, following the Birthwave Website Leads pattern without copying unrelated CRM features.

Files/modules to add or register:

- `src/database/tables/NamokarWebsiteLeadTable/`
- migration and `tableName` registry entry
- `src/modules/namokar/namokarWebsiteLead.service.js`
- `src/modules/namokar/namokarSheetSync.service.js`
- `src/modules/namokar/namokarPulseos.service.js`
- `src/modules/namokar/namokar.controller.js`
- `src/modules/namokar/namokar.routes.js`
- validation schemas, public tenant resolution, scheduler registration, and client-module registration

Database fields:

- tenant/client id, source key, `external_submission_id` (unique), name, normalized phone, email, treatment, message, consent, referral code, page/referrer/UTM/click IDs;
- admin status and notes;
- Sheets state: status, attempts, last error, synced time, next retry time;
- PulseOS state: status, attempts, last error category, accepted time, next retry time, `pulseos_submission_id`.

Delivery rules:

1. Within one DB transaction, insert the Namokar lead/outbox state. A duplicate `submissionId` returns the existing row without new downstream calls.
2. Attempt PulseOS immediately with the exact submission ID and server-only token.
3. Attempt the Google Sheet mirror independently after persistence. Neither a sheet failure nor a PulseOS failure may delete the database row.
4. Retry only retriable delivery failures (network/timeout/5xx) through a durable, scheduled worker. Keep the original `submissionId` for every PulseOS retry.
5. Mark `401`, `403`, and `422` as non-retriable configuration/data failures requiring an admin action. Store only an error category, not request or secret details.
6. Return accepted to Namokar after the DB transaction commits, even when a durable outbox delivery is queued; the website can redirect to thank you without data loss.

### 3. Invictus Admin frontend

Add `namokar` to the supported client modules and client selector, then create a **Namokar → Website Leads** page based on the PixelEye/Birthwave table pattern.

The table needs:

- columns: received time, name, mobile, treatment, message preview, source form, status, PulseOS status, Sheets status;
- search plus filters for status, form, treatment, sheet state, PulseOS state, and date;
- detail drawer/page with attribution and delivery audit categories;
- admin status/notes updates and a retry action for failed delivery outbox rows;
- CSV export governed by the existing authenticated client/tenant permissions.

Do not make a second browser-facing endpoint from the admin UI and do not reveal the PulseOS intake token in the UI.

### 4. PulseOS configuration

In the Namokar tenant's **Integrations → Website Leads**:

1. Confirm connector `328e8ec9-eff6-476f-ad2f-b3dd6a988739` belongs to Namokar.
2. Enable the connector; set `requireService: true` and fixed source `website`.
3. Set approved production and localhost/staging origins as needed.
4. Generate/rotate the intake token and provide it for the Invictus backend deployment secret store.
5. Verify the resulting lead appears in PulseOS Leads with Website source, journey/timeline, and callback task.

## Thank-you and failure behaviour

| Outcome | Website response | Visitor result |
| --- | --- | --- |
| Invictus DB commit accepted | 200/201 | Redirect to thank-you; outbox delivers PulseOS/Sheets. |
| Namokar → Invictus transport failure, Sheets fallback acknowledges | 200 | Redirect to thank-you with no claim that an appointment is confirmed. |
| Invalid form or unauthorized/rate-limited Invictus request | 4xx | Keep form open with a specific safe message. |
| Invictus unavailable and Sheets fallback fails | 502/503 | Keep form open; ask visitor to call. |

## Tests and acceptance checks

1. Contact form contains no referral field; home popup contains it only once.
2. Valid Contact and home submissions create exactly one Namokar Invictus lead for one `submissionId`.
3. A repeated same-ID submission is idempotent in Invictus and PulseOS.
4. A saved Invictus lead reaches PulseOS with the required header and field mapping; token never appears in browser code/logs.
5. Successful/failed Sheets attempts persist state and retry as scheduled; an admin can inspect/retry failures.
6. When Invictus is intentionally offline, the Namokar server sends the acknowledged Sheets fallback and redirects to thank-you.
7. 401/403/422/429 PulseOS responses are not retried blindly; 5xx/timeouts are retried with the same ID.
8. Verify database and UI tenant isolation using a non-Namokar admin account.
9. Run the module's migration, unit tests, backend integration tests, website TypeScript/lint/build, and a browser smoke test for contact, popup, and thank-you routes.

## Required inputs before coding

1. PulseOS intake token for the supplied connector, delivered as a backend secret.
2. Deployed Invictus Lead Backend base URL and the chosen server-to-server authentication method for Namokar → Invictus.
3. Confirmation that an Invictus duplicate is intended alongside the PulseOS lead (this plan treats Invictus as operational/audit storage and PulseOS as clinical CRM).
4. Confirmation that the provided Apps Script accepts the proposed `{ form, data }` payload and is deployed with public webhook access.
5. Legal approval of consent text, privacy link, data retention, and the optional home-popup referral-code handling.
