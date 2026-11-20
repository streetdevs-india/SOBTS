"use client";

import { ArrowUpRight, Phone, Zap } from "lucide-react";
import { site, whatsappHref } from "@/lib/site";
import { useTranslation } from "@/components/language-provider";

export function ContactCta() {
  const { t } = useTranslation();
  return (
    <section className="contact-cta"><div className="site-shell contact-cta-inner"><div className="contact-cta-copy"><span className="eyebrow eyebrow-light"><Zap size={15} /> {t("LET'S FIND THE RIGHT FIT")}</span><h2>{t("Looking for the right")}<br />{t("seal or spare part?")}</h2><p>{t("Send us the product details, part marking, dimensions or a photo and our team will help with the next step.")}</p></div><div className="contact-cta-actions"><a className="button button-dark" href={whatsappHref()} target="_blank" rel="noreferrer">{t("WhatsApp Us")} <ArrowUpRight size={18} /></a><a className="button button-outline-dark" href={site.phoneHref}><Phone size={17} /> {t("Call Now")}</a></div><span className="cta-mark" aria-hidden="true">01</span></div></section>
  );
}
