import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { SiteHeader } from "@/components/site-header";
import { LanguageProvider } from "@/components/language-provider";
import { getRequestLocale } from "@/lib/server-locale";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sobtsexim.com"),
  title: { default: "Shree Om Balaji Trader and Supplier | Oil Seals", template: "%s | Shree Om Balaji Trader and Supplier" },
  description: "Oil seals, hydraulic and pneumatic seals, hydraulic hoses, fittings and tractor spare parts from Shree Om Balaji Trader and Supplier, Ghaziabad.",
  keywords: ["oil seals", "hydraulic seals", "pneumatic seals", "hydraulic hoses", "JCB spare parts", "tractor spare parts", "Ghaziabad"],
  authors: [{ name: "Shree Om Balaji Trader and Supplier" }],
  openGraph: { title: "Shree Om Balaji Trader and Supplier | Industrial Sealing Solutions", description: "Oil seals, hoses and tractor spare parts for industrial, construction and agricultural applications.", type: "website", locale: "en_IN" },
  twitter: { card: "summary_large_image", title: "Shree Om Balaji Trader and Supplier | Industrial Sealing Solutions", description: "Oil seals, hydraulic solutions and industrial spare parts." },
  icons: { icon: "/images/sobts-logo.png", apple: "/images/sobts-logo.png" },
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getRequestLocale();
  const currentYear = new Date().getFullYear();
  // Keep the site composition consistent across languages; Arabic copy still
  // renders naturally, but it should not mirror the whole page layout.
  return <html lang={locale} dir="ltr"><body><LanguageProvider locale={locale}><a className="skip-link" href="#main-content">Skip to content</a><SiteHeader /><div id="main-content" tabIndex={-1}>{children}</div><SiteFooter currentYear={currentYear} /><WhatsAppButton /></LanguageProvider></body></html>;
}
