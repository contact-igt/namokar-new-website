"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SERVICE_OPTIONS, validate } from "@/lib/appointment";
import { CalendarIcon, CloseIcon, MessageIcon, PhoneIcon } from "./Icons";

type Status = "idle" | "submitting" | "success" | "error";

/** Home-only appointment prompt. Uses the same validation and endpoint as the contact form. */
export default function HomeAppointmentPopup() {
  const [open, setOpen] = useState(true);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])');
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [open]);

  if (!open) return null;

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    const data = new FormData(event.currentTarget);
    if (!data.get("service")) {
      setError("Please select a treatment option.");
      setStatus("error");
      return;
    }
    const checked = data.get("consent") === "on";
    const result = validate({
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      service: String(data.get("service") ?? ""),
      preferredDate: "",
      consent: checked,
      couponCode: String(data.get("couponCode") ?? ""),
      referralCode: String(data.get("referralCode") ?? ""),
      message: String(data.get("message") ?? ""),
    });
    if (!result.ok) {
      setError(Object.values(result.errors)[0] ?? "Please check the form and try again.");
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setError("");
    try {
      const response = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.values),
      });
      const payload = (await response.json().catch(() => ({}))) as { ok?: boolean };
      if (response.ok && payload.ok) setStatus("success");
      else {
        setStatus("error");
        setError("We could not send your request just now. Please call the centre or try again later.");
      }
    } catch {
      setStatus("error");
      setError("We could not reach the centre just now. Please try again later.");
    }
  }

  return (
    <div className="home-popup" role="presentation">
      <div className="home-popup-backdrop" />
      <section ref={dialogRef} className="home-popup-dialog" role="dialog" aria-modal="true" aria-labelledby="home-popup-title">
        <button ref={closeRef} className="home-popup-close" type="button" onClick={() => setOpen(false)} aria-label="Close appointment form">
          <CloseIcon />
        </button>
        <aside className="home-popup-side">
          <Image src="/images/namokar-logo.webp" alt="Namokar Eye & Oculoplasty Centre" width={819} height={230} className="home-popup-logo" sizes="265px" priority />
          <h2>Book Your<br />Eye Consultation</h2>
          <p className="home-popup-side-lead">Get expert advice from our specialists and take the first step towards healthier vision.</p>
          <ul>
            <li><span className="home-popup-benefit-icon" aria-hidden="true"><CalendarIcon /></span><span><strong>Expert Eye Specialists</strong><small>Personalized care for all ages</small></span></li>
            <li><span className="home-popup-benefit-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2H3ZM17 5a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 5v1h-4"/></svg></span><span><strong>Convenient Appointments</strong><small>Choose a time that suits you</small></span></li>
            <li><span className="home-popup-benefit-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2 20 5v6c0 5-3.4 8.7-8 11-4.6-2.3-8-6-8-11V5l8-3Z"/><path d="m8 12 2.5 2.5L16 9"/></svg></span><span><strong>Safe &amp; Confidential</strong><small>Your information is protected</small></span></li>
          </ul>
          <div className="home-popup-photo">
            <Image src="/images/appointment-consultation-ai.png" alt="Illustration of a patient at a slit-lamp eye examination" fill sizes="(min-width: 900px) 530px, 100vw" />
          </div>
        </aside>
        <div className="home-popup-main">
          {status === "success" ? (
            <div className="home-popup-success" role="status">
              <CalendarIcon />
              <h2 id="home-popup-title">Your request has been received</h2>
              <p>The centre will contact you to discuss a suitable time. This is not a confirmed appointment.</p>
              <button type="button" className="btn btn--primary" onClick={() => setOpen(false)}>Close</button>
            </div>
          ) : (
            <>
              <header className="home-popup-head">
                <span className="home-popup-calendar" aria-hidden="true"><CalendarIcon /></span>
                <div>
                  <h2 id="home-popup-title">Book Appointment</h2>
                  <p>Fill in the details below and our team will get in touch with you.</p>
                </div>
              </header>
              <form className="home-popup-form" onSubmit={submit} noValidate aria-busy={status === "submitting"}>
                <label><span>Full Name <b>*</b></span><span className="home-popup-field"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="3"/><path d="M4 20v-1a8 8 0 0 1 16 0v1H4Z"/></svg><input name="name" autoComplete="name" placeholder="Enter full name" required /></span></label>
                <label><span>Mobile Number <b>*</b></span><span className="home-popup-field"><PhoneIcon /><input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="Enter mobile number" required /><span className="home-popup-country" aria-hidden="true">🇮🇳 &nbsp;+91</span></span></label>
                <label><span>Select Treatment <b>*</b></span><span className="home-popup-field"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 3H5a2 2 0 0 0-2 2v4a4 4 0 0 0 8 0V5a2 2 0 0 0-2-2H7ZM7 12v3a5 5 0 0 0 10 0v-2"/><circle cx="17" cy="11" r="2"/></svg><select name="service" defaultValue="" required><option value="" disabled>Select treatment option</option>{SERVICE_OPTIONS.slice(1).map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></span></label>
                <div className="home-popup-codes">
                  <div className="home-popup-codes-head"><span aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="9" width="18" height="12" rx="2"/><path d="M12 9v12M3 13h18M12 9C8 9 6 7.5 6 5.5A2.5 2.5 0 0 1 8.5 3C11 3 12 6 12 9ZM12 9c4 0 6-1.5 6-3.5A2.5 2.5 0 0 0 15.5 3C13 3 12 6 12 9Z"/></svg></span><div><strong>Have a Coupon or Referral Code?</strong><p>Share it with our team for review (optional).</p></div></div>
                  <div className="home-popup-codes-fields"><label><span className="sr-only">Coupon code</span><input name="couponCode" maxLength={40} placeholder="Enter coupon code" /></label><label><span className="sr-only">Referral code</span><input name="referralCode" maxLength={40} placeholder="Enter referral code" /></label></div>
                </div>
                <label><span>Additional Message <em>(Optional)</em></span><span className="home-popup-field home-popup-field--message"><MessageIcon /><textarea name="message" maxLength={300} placeholder="Share scheduling details only; please do not include medical information." /></span></label>
                <label className="home-popup-consent"><input type="checkbox" name="consent" />I agree that the centre may contact me about this enquiry.</label>
                {status === "error" && <p className="home-popup-error" role="alert">{error}</p>}
                <div className="home-popup-actions">
                  <button type="button" className="btn btn--secondary" onClick={() => setOpen(false)}>Maybe later</button>
                  <button type="submit" className="btn btn--primary" disabled={status === "submitting"}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m22 2-7 20-4-9-9-4 20-7ZM11 13 22 2"/></svg>{status === "submitting" ? "Sending…" : "Book Appointment"}</button>
                </div>
              </form>
              <p className="home-popup-security"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 15v2"/></svg>Your information is secure and confidential.</p>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
