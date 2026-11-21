import { BookOpen, MessageCircle } from "lucide-react";
import { CatalogueCard } from "@/components/catalogue-card";
import { ContactCta } from "@/components/contact-cta";
import { SectionHeading } from "@/components/section-heading";
import { catalogues } from "@/data/catalogues";
import { createTranslator } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/server-locale";
import { whatsappHref } from "@/lib/site";

export const metadata = { title: "Product Catalogues — Oil Seals, Hydraulic Hoses & Spare Parts", description: "Download SOBTS EXIM product catalogues for oil seals, PU U-seals, hydraulic hoses, JCB spare parts and tractor spare parts. Free PDF catalogues with product references and specifications.", alternates: { canonical: "https://sobts.com/catalogues" } };

export default async function CataloguesPage() {
  const t = createTranslator(await getRequestLocale());
  return <main><section className="page-hero page-hero-catalogues"><div className="site-shell page-hero-inner"><span className="eyebrow"><span className="eyebrow-line" /> {t("PRODUCT RESOURCES")}</span><h1>{t("Reference material")}<br /><em>{t("for the next step.")}</em></h1><p>{t("Download the supplied product catalogues to browse the range, then send us the details of the item you need help with.")}</p></div></section><section className="section catalogues-page"><div className="site-shell"><div className="catalogue-page-intro"><SectionHeading eyebrow={t("DOWNLOAD CATALOGUES")} title={t("Start with the reference that matches your requirement.")} description={t("These catalogues are provided as product references. Availability, fit and final selection are confirmed during your enquiry.")} /><a className="button button-outline-dark" href={whatsappHref("Hello Shree Om Balaji Trader and Supplier (SOBTS EXIM), please help me with a product catalogue.")} target="_blank" rel="noreferrer"><MessageCircle size={17} /> {t("Ask about a catalogue")}</a></div><div className="catalogues-grid">{catalogues.map((catalogue) => <CatalogueCard catalogue={catalogue} key={catalogue.href} />)}</div><div className="catalogue-help"><BookOpen size={22} /><div><strong>{t("Need help finding a product?")}</strong><p>{t("Share a screenshot or catalogue page number on WhatsApp and we can continue the conversation around it.")}</p></div><a className="text-link" href={whatsappHref("Hello Shree Om Balaji Trader and Supplier (SOBTS EXIM), I need help finding a product in a catalogue.")} target="_blank" rel="noreferrer">{t("Get help")} <MessageCircle size={16} /></a></div></div></section><ContactCta /></main>;
}
