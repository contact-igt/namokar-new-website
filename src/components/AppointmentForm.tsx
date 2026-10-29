"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  type FieldErrors,
  type FieldName,
  SERVICE_OPTIONS,
  validate,
} from "@/lib/appointment";
import { SITE, TEL_HREF } from "@/config/site";

type Status = "idle" | "submitting" | "success" | "error";

const ORDER: FieldName[] = ["name", "phone", "email", "service", "message", "consent"];

const SERVER_MESSAGES: Record<string, string> = {
  rate_limited: "Too many requests from this connection. Please wait a few minutes, or call the centre.",
  not_configured: "Online requests are not available right now. Please call the centre.",
  disabled: "Online requests are not available right now. Please call the centre.",
  rejected: "Your request could not be sent. Please clear any automatically filled fields and try again, or call the centre.",
  delivery_failed: "We could not pass your request on just now. Please try again, or call the centre.",
};

/**
 * Appointment enquiry. Shows confirmation only after the server reports that the
 * enquiry was accepted. Collects no medical details.
 */
export default function AppointmentForm({ privacyUrl }: { privacyUrl: string | null }) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const submissionIdRef = useRef("");
  const focusFirstError = (fieldErrors: FieldErrors) => {
    const first = ORDER.find((field) => fieldErrors[field]);
    if (first) requestAnimationFrame(() => document.getElementById(first)?.focus());
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    const fd = new FormData(e.currentTarget);
    const raw = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      email: String(fd.get("email") ?? ""),
      service: String(fd.get("service") ?? ""),
      preferredDate: "",
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
      hp_check: String(fd.get("hp_check") ?? ""),
    };

    const local = validate(raw);
    const localErrors = local.ok ? {} : local.errors;
    if (!raw.service) localErrors.service = "Please select a treatment option.";
    if (!raw.message.trim()) localErrors.message = "Please enter a short message.";
    if (Object.keys(localErrors).length) {
      setErrors(localErrors);
      setFormError("");
      setStatus("error");
      focusFirstError(localErrors);
      return;
    }

    setErrors({});
    setFormError("");
    setStatus("submitting");
    if (!submissionIdRef.current) submissionIdRef.current = crypto.randomUUID();
    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...raw, formId: "namokar-contact-v1", submissionId: submissionIdRef.current, pageUrl: window.location.href }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        code?: string;
        errors?: FieldErrors;
      };
      if (res.ok && data.ok === true) {
        router.push("/thank-you?form=contact");
        return;
      }
      if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        focusFirstError(data.errors);
      } else {
        setFormError(
          SERVER_MESSAGES[data.code ?? ""] ??
            "Something went wrong. Please try again, or call the centre.",
        );
      }
      setStatus("error");
    } catch {
      setFormError("We could not reach the server. Please check your connection and try again, or call the centre.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="form-note form-note--ok" role="status">
        <h3 className="h3">Your request has been received</h3>
        <p>
          Thank you. This is a request only, <strong>not a confirmed appointment</strong>.
          The centre may contact you on the number you gave to discuss a suitable time.
        </p>
        <p>
          If you need to speak to someone sooner, please call{" "}
          <a href={TEL_HREF} className="text-link">{SITE.phone.display}</a>.
        </p>
        <button type="button" className="btn btn--secondary" onClick={() => setStatus("idle")}>
          Send another request
        </button>
      </div>
    );
  }

  const fieldProps = (f: FieldName) => ({
    "aria-invalid": errors[f] ? (true as const) : undefined,
    "aria-describedby": errors[f] ? `${f}-error` : undefined,
  });

  return (
    <form onSubmit={onSubmit} noValidate className="form form--contact" aria-busy={status === "submitting"}>
      <div className="form-row">
        <div className="field">
          <label htmlFor="name">Full name <span aria-hidden="true">*</span></label>
          <input id="name" name="name" type="text" autoComplete="name" maxLength={80} placeholder="Enter full name" required {...fieldProps("name")} />
          {errors.name && <p id="name-error" className="field-error">{errors.name}</p>}
        </div>
        <div className="field">
          <label htmlFor="phone">Mobile number <span aria-hidden="true">*</span></label>
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" maxLength={20} placeholder="Enter mobile number" required {...fieldProps("phone")} />
          {errors.phone && <p id="phone-error" className="field-error">{errors.phone}</p>}
        </div>
        <div className="field">
          <label htmlFor="email">Email <span className="hint">(optional)</span></label>
          <input id="email" name="email" type="email" inputMode="email" autoComplete="email" maxLength={254} placeholder="Enter email address" {...fieldProps("email")} />
          {errors.email && <p id="email-error" className="field-error">{errors.email}</p>}
        </div>
      </div>

      <div className="field">
        <label htmlFor="service">Selected treatment <span aria-hidden="true">*</span></label>
        <select id="service" name="service" defaultValue="" {...fieldProps("service")}>
          <option value="" disabled>Select treatment option</option>
          {SERVICE_OPTIONS.slice(1).map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        {errors.service && <p id="service-error" className="field-error">{errors.service}</p>}
      </div>

      <div className="field">
        <label htmlFor="message">Message <span aria-hidden="true">*</span></label>
        <textarea id="message" name="message" maxLength={300} required placeholder="Enter your message here…" {...fieldProps("message")} />
        {errors.message && <p id="message-error" className="field-error">{errors.message}</p>}
      </div>

      {/* Honeypot: hidden from people and assistive technology */}
      <div className="hp" aria-hidden="true">
        <label htmlFor="hp_check">Leave this field empty</label>
        <input id="hp_check" name="hp_check" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="field field--check">
        <input id="consent" name="consent" type="checkbox" {...fieldProps("consent")} />
        <label htmlFor="consent">
          I agree that Namokar Eye &amp; Oculoplasty Centre may contact me on this number
          about my enquiry.
        </label>
      </div>
      {errors.consent && <p id="consent-error" className="field-error">{errors.consent}</p>}

      <p className="hint">
        Please do not include medical history, diagnoses or reports. The details you enter
        are sent to the centre so that it can respond to your enquiry.
        {privacyUrl && (
          <>
            {" "}
            <a href={privacyUrl} className="text-link">Read the privacy notice</a>.
          </>
        )}
      </p>

      {formError && <p className="field-error" role="alert">{formError}</p>}
      <button type="submit" className="btn btn--primary" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : status === "error" ? "Try again" : "Send message"}
      </button>
    </form>
  );
}
