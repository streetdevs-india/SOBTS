import { ProductsBrowser } from "@/components/products-browser";
import { SectionHeading } from "@/components/section-heading";
import { products } from "@/data/products";
import { createTranslator } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/server-locale";

export const metadata = { title: "Products — Oil Seals, Hydraulic Seals, Hoses & Tractor Parts", description: "Browse SOBTS EXIM product range — oil seals, hydraulic seals, pneumatic seals, PU seals, hydraulic hoses, fittings, JCB parts and tractor spare parts. Quality industrial sealing solutions from Ghaziabad.", alternates: { canonical: "https://sobts.com/products" } };

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const t = createTranslator(await getRequestLocale());
  const category = (await searchParams).category;
  const validCategories = ["oil-seals", "hydraulic-seals", "pneumatic-seals", "hydraulic-hoses", "tractor-parts", "jcb-parts"] as const;
  const validCategory = validCategories.includes(category as (typeof validCategories)[number]) ? category as (typeof validCategories)[number] : "all";
  return <main><section className="page-hero page-hero-products"><div className="site-shell page-hero-inner"><span className="eyebrow"><span className="eyebrow-line" /> {t("PRODUCT RANGE")}</span><h1>{t("Find the part")}<br /><em>{t("that fits the work.")}</em></h1><p>{t("Search the product references below, filter by category and open a detail page to start an enquiry.")}</p></div></section><section className="section products-page-section"><div className="site-shell"><SectionHeading eyebrow={t("BROWSE THE RANGE")} title={t("A focused range of sealing and spare part products.")} description={t("Oil seals are the primary focus, supported by hydraulic, pneumatic, hose and Tractor Spare Parts enquiries.")} /><ProductsBrowser products={products} initialCategory={validCategory} /></div></section></main>;
}
