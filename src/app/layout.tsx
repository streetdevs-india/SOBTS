import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { SiteHeader } from "@/components/site-header";
import { LanguageProvider } from "@/components/language-provider";
import { getRequestLocale } from "@/lib/server-locale";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sobts.com"),
  title: { default: "SOBTS EXIM — Oil Seals, Hydraulic Seals & Tractor Spare Parts | Ghaziabad", template: "%s | SOBTS EXIM — Shree Om Balaji Trader and Supplier" },
  description: "SOBTS EXIM (Shree Om Balaji Trader and Supplier) — oil seals, hydraulic seals, pneumatic seals, hydraulic hoses, fittings, JCB parts and tractor spare parts supplier in Ghaziabad, India. Serving industrial, agricultural and construction sectors.",
  keywords: ["SOBTS", "SOBTS EXIM", "Shree Om Balaji Trader and Supplier", "oil seals", "hydraulic seals", "pneumatic seals", "hydraulic hoses", "JCB spare parts", "tractor spare parts", "Ghaziabad", "oil seal supplier India", "hydraulic seal dealer", "industrial seals"],
  authors: [{ name: "SOBTS EXIM — Shree Om Balaji Trader and Supplier" }],
  openGraph: { siteName: "SOBTS EXIM", title: "SOBTS EXIM — Oil Seals, Hydraulic Seals & Industrial Spare Parts", description: "Oil seals, hydraulic seals, hoses, fittings and tractor spare parts for industrial, construction and agricultural applications from Ghaziabad, India.", type: "website", locale: "en_IN", url: "https://sobts.com" },
  twitter: { card: "summary_large_image", title: "SOBTS EXIM — Oil Seals & Industrial Sealing Solutions", description: "Oil seals, hydraulic seals, hoses and tractor spare parts supplier in Ghaziabad. Serving India, Africa & Europe." },
  icons: { icon: "/images/sobts-logo.png", apple: "/images/sobts-logo.png" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
  alternates: { canonical: "https://sobts.com" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Shree Om Balaji Trader and Supplier (SOBTS EXIM)",
  alternateName: ["SOBTS EXIM", "SOBTS", "Shree Om Balaji Trader and Supplier"],
  url: "https://sobts.com",
  description: "Supplier of oil seals, hydraulic seals, pneumatic seals, hydraulic hoses, fittings, JCB parts and tractor spare parts in Ghaziabad, India.",
  address: { "@type": "PostalAddress", addressLocality: "Ghaziabad", addressRegion: "Uttar Pradesh", addressCountry: "IN" },
  areaServed: [{ "@type": "Country", name: "India" }, { "@type": "Continent", name: "Africa" }, { "@type": "Continent", name: "Europe" }],
  knowsAbout: ["Oil Seals", "Hydraulic Seals", "Pneumatic Seals", "Hydraulic Hoses", "Tractor Spare Parts", "JCB Spare Parts", "Industrial Sealing Solutions"],
  hasOfferCatalog: { "@type": "OfferCatalog", name: "SOBTS EXIM Product Range", itemListElement: [
    { "@type": "OfferCatalog", name: "Oil Seals", description: "Radial shaft, rotary and custom oil seals" },
    { "@type": "OfferCatalog", name: "Hydraulic Seals", description: "Rod, piston, wiper seals and seal kits" },
    { "@type": "OfferCatalog", name: "Pneumatic & PU Seals", description: "Pneumatic seal profiles and polyurethane seals" },
    { "@type": "OfferCatalog", name: "Hydraulic Hoses & Fittings", description: "Hydraulic hose assemblies and fittings" },
    { "@type": "OfferCatalog", name: "Tractor Spare Parts", description: "Drivetrain and maintenance parts for tractors" },
    { "@type": "OfferCatalog", name: "JCB Spare Parts", description: "Parts for JCB construction equipment" },
  ]},
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getRequestLocale();
  const currentYear = new Date().getFullYear();
  return <html lang={locale} dir="ltr"><head><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} /></head><body><LanguageProvider locale={locale}><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader /><div id="main-content" tabIndex={-1}>{children}</div><SiteFooter currentYear={currentYear} /><WhatsAppButton /></LanguageProvider></body></html>;
}
