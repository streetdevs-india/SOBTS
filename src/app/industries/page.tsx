import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { ContactCta } from "@/components/contact-cta";
import { SectionHeading } from "@/components/section-heading";
import { industries } from "@/data/industries";
import { createTranslator } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/server-locale";

export const metadata = { title: "Industries We Serve — Construction, Agriculture & Industrial", description: "SOBTS EXIM supplies oil seals, hydraulic seals, hoses and spare parts for construction equipment, agricultural machinery, industrial systems and heavy equipment applications.", alternates: { canonical: "https://sobts.com/industries" } };

export default async function IndustriesPage() {
  const t = createTranslator(await getRequestLocale());
  return <main><section className="page-hero page-hero-industries"><div className="site-shell page-hero-inner"><span className="eyebrow"><span className="eyebrow-line" /> {t("APPLICATIONS")}</span><h1>{t("Products for the")}<br /><em>{t("work behind the work.")}</em></h1><p>{t("From construction equipment to agricultural machinery and industrial systems, we help you make a more useful product enquiry.")}</p></div></section><section className="section industries-page"><div className="site-shell"><SectionHeading eyebrow={t("WHERE WE WORK")} title={t("A range built around working equipment.")} description={t("Use the application context below as a starting point, then tell us the machine, part or seal you are working with.")} /><div className="industry-detail-list">{industries.map((industry, index) => <article className="industry-detail" id={industry.slug} key={industry.slug}><div className="industry-detail-image"><Image src={industry.image} alt={industry.alt} fill sizes="(max-width: 800px) 100vw, 42vw" /><span>0{index + 1}</span></div><div className="industry-detail-copy"><span className="eyebrow"><span className="eyebrow-line" /> {String(index + 1).padStart(2, "0")} / {t("APPLICATION")}</span><h2>{t(industry.name)}</h2><p>{t(industry.description)}</p><ul>{industry.products.map((product) => <li key={product}><Check size={16} /> {t(product)}</li>)}</ul><Link className="text-link" href="/contact">{t("Discuss an application")} <ArrowRight size={16} /></Link></div></article>)}</div></div></section><ContactCta /></main>;
}
