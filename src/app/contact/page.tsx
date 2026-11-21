import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { EnquiryForm } from "@/components/enquiry-form";
import { SectionHeading } from "@/components/section-heading";
import { createTranslator } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/server-locale";
import { site, whatsappHref } from "@/lib/site";

export const metadata = { title: "Contact SOBTS EXIM — Get a Quote for Oil Seals & Spare Parts", description: "Contact SOBTS EXIM (Shree Om Balaji Trader and Supplier) in Ghaziabad for oil seals, hydraulic seals, hoses, JCB parts and tractor spare parts enquiries. Call, WhatsApp or fill the enquiry form.", alternates: { canonical: "https://sobts.com/contact" } };

export default async function ContactPage() {
  const t = createTranslator(await getRequestLocale());

  return (
    <main>
      <section className="page-hero page-hero-contact">
        <div className="site-shell page-hero-inner">
          <span className="eyebrow"><span className="eyebrow-line" /> {t("CONTACT THE COMPANY")}</span>
          <h1>{t("Tell us what")}<br /><em>{t("you need to keep moving.")}</em></h1>
          <p>{t("Send the part name, dimensions, machine model, marking or a photo. We will help you make the product enquiry more specific.")}</p>
        </div>
      </section>
      <section className="section contact-page">
        <div className="site-shell contact-page-grid">
          <div className="contact-page-copy">
            <SectionHeading eyebrow={t("GET IN TOUCH")} title={t("A direct line to the right product conversation.")} description={t("Choose the channel that works for you. WhatsApp is best when you want to share a photo, marking or catalogue page.")} />
            <div className="contact-methods">
              <a href={whatsappHref()} target="_blank" rel="noreferrer"><span className="contact-method-icon"><MessageCircle /></span><span><small>{t("WhatsApp enquiry")}</small><strong>{t("Message our team")}</strong></span><ArrowUpRight size={18} /></a>
              <a href={site.phoneHref}><span className="contact-method-icon"><Phone /></span><span><small>{t("Indian contact number")}</small><strong>{site.phone}</strong></span><ArrowUpRight size={18} /></a>
              <a href={site.emailHref}><span className="contact-method-icon"><Mail /></span><span><small>{t("Email")}</small><strong>{site.email}</strong></span><ArrowUpRight size={18} /></a>
              <a href={site.secondaryEmailHref}><span className="contact-method-icon"><Mail /></span><span><small>{t("Email")}</small><strong>{site.secondaryEmail}</strong></span><ArrowUpRight size={18} /></a>
              <a className="contact-method-static" href={site.germanWhatsappHref} target="_blank" rel="noreferrer"><span className="contact-method-icon"><MessageCircle /></span><span><small>{t("German contact")}</small><strong>{site.germanContact}</strong><em>{site.germanContactNote}</em></span><ArrowUpRight size={18} /></a>
              <a href={site.mapHref} target="_blank" rel="noreferrer"><span className="contact-method-icon"><MapPin /></span><span><small>{t("Visit / locate us")}</small><strong>Raj Nagar Extension, Ghaziabad</strong></span><ArrowUpRight size={18} /></a>
            </div>
          </div>
          <EnquiryForm compact />
        </div>
      </section>

    </main>
  );
}
