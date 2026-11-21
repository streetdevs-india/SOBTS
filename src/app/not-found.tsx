import Link from "next/link";

export default function NotFound() {
  return <main className="section"><div className="site-shell not-found"><span className="eyebrow">PAGE NOT FOUND</span><h1>Let’s get you back on track.</h1><p>This page may have moved. Explore our product range or contact us for help finding a part.</p><div className="not-found-actions"><Link className="button button-yellow" href="/products">Explore products</Link><Link className="button button-outline-dark" href="/contact">Contact us</Link></div></div></main>;
}
