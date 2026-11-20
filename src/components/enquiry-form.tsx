"use client";

import { Check, Loader2, MessageCircle, Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { whatsappHref } from "@/lib/site";
import { useTranslation } from "@/components/language-provider";

export function EnquiryForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const { t } = useTranslation();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const form = new FormData(event.currentTarget);
    const payload = {
      name: form.get("name") as string,
      email: form.get("email") as string,
      phone: form.get("phone") as string,
      country: form.get("country") as string,
      productRequirement: form.get("productRequirement") as string,
      message: form.get("message") as string,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus("sent");
        (event.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="enquiry-section" id="enquiry">
      <div className="site-shell enquiry-shell">
        <div className="enquiry-intro">
          <span className="eyebrow"><span className="eyebrow-line" /> {t("CUSTOMER ENQUIRY")}</span>
          <h2>{t("Let's understand your requirement.")}</h2>
          <p>{t("Share the basics and we will get back to you with the right product information.")}</p>
          <div className="enquiry-note"><MessageCircle size={18} /><span>{t("Or reach us directly on WhatsApp for a faster response.")}</span></div>
          <a className="button button-outline-dark enquiry-whatsapp-link" href={whatsappHref()} target="_blank" rel="noreferrer"><MessageCircle size={16} /> {t("WhatsApp Us")}</a>
        </div>
        <form className="enquiry-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>{t("Name")}<input name="name" type="text" placeholder={t("Your full name")} required /></label>
            <label>{t("Email")}<input name="email" type="email" placeholder="you@company.com" required /></label>
            <label>{t("Phone")}<input name="phone" type="tel" placeholder={t("Your phone number")} required /></label>
            <label>{t("Country")}<input name="country" type="text" placeholder={t("Country")} required /></label>
            <label className="form-field-wide">{t("Product Requirement")}<input name="productRequirement" type="text" placeholder={t("Oil seals, tractor parts, hoses...")} required /></label>
            <label className="form-field-wide">{t("Message")}<textarea name="message" rows={4} placeholder={t("Tell us about the part, machine, dimensions or quantity")} required /></label>
          </div>
          <div className="enquiry-submit-row">
            <button className="button button-yellow" type="submit" disabled={status === "sending"}>
              {status === "sending" ? <><Loader2 size={17} className="spin" /> {t("Sending...")}</> : <><Send size={17} /> {t("Send Enquiry")}</>}
            </button>
            {status === "sent" && <span className="form-success" role="status"><Check size={16} /> {t("Enquiry sent successfully! We'll get back to you soon.")}</span>}
            {status === "error" && <span className="form-error" role="alert">{t("Failed to send. Please try again or use WhatsApp.")}</span>}
            {status === "idle" && <small>{t("Your enquiry will be sent directly to our team via email.")}</small>}
          </div>
        </form>
      </div>
    </section>
  );
}
