import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, Check, Download, MessageCircle } from "lucide-react";
import { notFound } from "next/navigation";
import { ContactCta } from "@/components/contact-cta";
import { ProductCard } from "@/components/product-card";
import { catalogues } from "@/data/catalogues";
import { products, getProduct } from "@/data/products";
import { whatsappHref } from "@/lib/site";
import { createTranslator } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/server-locale";

export function generateStaticParams() { return products.map((product) => ({ slug: product.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const product = getProduct((await params).slug);
  return product ? { title: `${product.name} — SOBTS EXIM`, description: `${product.description} Buy ${product.name.toLowerCase()} from SOBTS EXIM (Shree Om Balaji Trader and Supplier), Ghaziabad.`, alternates: { canonical: `https://sobts.com/products/${product.slug}` } } : { title: "Product" };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const related = products.filter((item) => item.category === product.category && item.slug !== product.slug).slice(0, 3);
  const t = createTranslator(await getRequestLocale());
  const enquiry = whatsappHref(`Hello Shree Om Balaji Trader and Supplier (SOBTS EXIM), I would like to enquire about ${product.name}.`);
  const catalogue = catalogues.find((item) => item.href === product.catalogueHref) ?? catalogues[0];
  const catalogueAnchor = `catalogue-${catalogue.code.toLowerCase()}`;
  return (
    <main>
      <section className="detail-hero">
        <div className="site-shell">
          <Link className="back-link" href="/products">
            <ArrowLeft size={16} /> {t("Back to all products")}
          </Link>
          <div className="detail-grid">
            <a
              className="detail-image detail-catalogue-preview"
              href={catalogue.href}
              download
              aria-label={`${t("Download catalogue")}: ${t(catalogue.title)}`}
            >
              <Image
                src={catalogue.image}
                alt={catalogue.alt}
                fill
                priority
                sizes="(max-width: 800px) 100vw, 48vw"
              />
              <span className="detail-catalogue-overlay">
                <strong>
                  <Download size={18} /> {t("Download catalogue")}
                </strong>
                <small>{t(catalogue.title)}</small>
              </span>
              <span className="detail-image-label">{t(product.categoryLabel)}</span>
            </a>
            <div className="detail-copy">
              <span className="eyebrow">
                <span className="eyebrow-line" /> {t(product.categoryLabel).toUpperCase()}
              </span>
              <h1>{t(product.name)}</h1>
              <p className="detail-lede">{t(product.description)}</p>
              <div className="detail-actions">
                <a className="button button-yellow" href={enquiry} target="_blank" rel="noreferrer">
                  <MessageCircle size={18} /> {t("Enquire on WhatsApp")}
                </a>
                <Link className="button button-outline-dark" href={`/catalogues#${catalogueAnchor}`}>
                  <BookOpen size={17} /> {t("See our catalogue")}
                </Link>
              </div>
              <div className="detail-note">
                <Check size={18} /> {t("Product fit is confirmed from your application details.")}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section detail-information">
        <div className="site-shell detail-information-grid">
          <div>
            <span className="eyebrow">
              <span className="eyebrow-line" /> {t("WHAT TO SHARE")}
            </span>
            <h2>{t("Help us understand the requirement.")}</h2>
            <p>
              {t("A clear photo, existing part marking, dimensions, machine model or drawing can make the product conversation much faster. You do not need every detail to begin.")}
            </p>
            <ul className="check-list">
              {product.features.map((feature) => (
                <li key={feature}>
                  <Check size={17} /> {t(feature)}
                </li>
              ))}
            </ul>
          </div>

          <div className="application-card">
            <a
              className="application-catalogue-preview"
              href={catalogue.href}
              download
              aria-label={`${t("Download catalogue")}: ${t(catalogue.title)}`}
            >
              <Image src={catalogue.image} alt={catalogue.alt} fill sizes="(max-width: 800px) 100vw, 38vw" />
              <span className="application-catalogue-overlay">
                <small>{t("PRODUCT RESOURCES")}</small>
                <strong>{t(catalogue.title)}</strong>
                <em>
                  <Download size={15} /> {t("Download catalogue")}
                </em>
              </span>
            </a>
            <div className="application-card-content">
              <span>{t("COMMON APPLICATIONS")}</span>
              <h3>{t("Where this product may be used")}</h3>
              <div>
                {product.applications.map((application) => (
                  <span key={application}>{t(application)}</span>
                ))}
              </div>
              {product.catalogueHref ? (
                <a className="text-link" href={product.catalogueHref} download>
                  <Download size={16} /> {t(product.catalogueLabel ?? "Download PDF")}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="section related-section section-cream">
          <div className="site-shell">
            <div className="section-intro-row">
              <div>
                <span className="eyebrow">
                  <span className="eyebrow-line" /> {t("KEEP EXPLORING")}
                </span>
                <h2>{t("Related product references.")}</h2>
              </div>
              <Link className="text-link" href={`/products?category=${product.category}`}>
                {t("View category")} <ArrowRight size={16} />
              </Link>
            </div>
            <div className="product-grid related-grid">
              {related.map((item, index) => (
                <ProductCard key={item.slug} product={item} index={index} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <ContactCta />
    </main>
  );
}
