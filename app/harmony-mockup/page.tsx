import Link from 'next/link';
import Image from 'next/image';
import './harmony.css';
import CategoryCard from '@/components/catalogue/CategoryCard';
import ProductCard from '@/components/catalogue/ProductCard';
import HowItWorksStrip from '@/components/catalogue/HowItWorksStrip';
import { getMockCategories, getMockNewArrivals, getMockFeaturedProducts, getMockSettings } from '@/lib/mock-data';
import { buildCustomDesignEnquiryUrl, buildProductEnquiryUrl } from '@/lib/whatsapp';
import { ArrowRight, ArrowUpRight, MapPin, Star, MessageCircle, Phone, Navigation, ShieldCheck, Ruler, TreeDeciduous, Award } from 'lucide-react';
export const metadata = { title: 'Harmony Mockup - INHOME Vibe Check', robots: { index: false, follow: false } };
export default function HarmonyMockupPage() {
  const cats = getMockCategories();
  const arrivals = getMockNewArrivals().slice(0, 4);
  const featList = getMockFeaturedProducts();
  const settings = getMockSettings();
  const customUrl = buildCustomDesignEnquiryUrl(settings.whatsapp_number);
  const hero = cats[0];
  const heroImg = hero?.image_url || '/og-default.jpg';
  const feat = featList[0] || arrivals[0];
  const featCat = cats.find((c) => c.id === feat.category_id);
  const featSlug = featCat ? featCat.slug : 'custom-furniture';
  const featUrl = `/${featSlug}/${feat.slug}`;
  const featWa = buildProductEnquiryUrl(feat.name, featSlug, feat.slug, 'standard', settings.whatsapp_number);
  const stats = [{ v: '17', l: 'Curated collections' }, { v: '4.8', l: 'Google rated showroom' }, { v: '100%', l: 'Solid wood options' }, { v: '1:1', l: 'WhatsApp design consult' }];
  return (
    <div className="harm">
      <p className="harm-top">MOCKUP - Harmony-inspired - isolated, live site untouched</p>
      <header className="harm-hero">
        <Image src={heroImg} alt={hero?.name || 'INHOME showroom'} fill priority sizes="100vw" className="harm-hero-img" />
        <div className="harm-shade" />
        <div className="harm-inner">
          <span className="harm-eye"><MapPin size={13} /> Kangeyam - Custom Furniture</span>
          <h1 className="harm-h1">Spaces that feel like home. <em>Built to your dimensions.</em></h1>
          <p className="harm-sub">Solid teak sofas, beds, dining sets and storage - custom-crafted to order. Send a reference photo for a transparent quote on WhatsApp.</p>
          <div className="harm-cta"><Link href="/catalogue" className="harm-solid">Browse catalogue <ArrowRight size={16} /></Link><a href={customUrl} target="_blank" rel="noopener noreferrer" className="harm-ghost"><MessageCircle size={16} /> Enquire on WhatsApp</a></div>
          <div className="harm-proof"><Star size={14} fill="currentColor" /> 4.8 Google - TCL Tower, Chennimalai Rd - Mon-Sat till 6 PM</div>
        </div>
      </header>
      <section className="harm-stats">{stats.map((s) => (<div key={s.l} className="harm-stat"><span className="harm-v">{s.v}</span><span className="harm-l">{s.l}</span></div>))}</section>
      <section className="harm-sec"><div className="harm-head"><div><span className="harm-kick">Our portfolio</span><h2 className="harm-h2">Collections for every room</h2></div><Link href="/catalogue" className="harm-link">View all 17 <ArrowUpRight size={15} /></Link></div><div className="harm-grid">{cats.slice(0, 6).map((c) => (<CategoryCard key={c.id} category={c} />))}</div></section>
      <section className="harm-feat"><div className="harm-feat-media"><Image src={feat.images[0]} alt={feat.name} fill sizes="(max-width:768px) 100vw, 560px" className="harm-img" /></div><div className="harm-feat-copy"><span className="harm-kick">Featured showcase</span><h2 className="harm-h2">{feat.name}</h2><p className="harm-p">{feat.description}</p><div className="harm-cta"><Link href={featUrl} className="harm-solid">View piece <ArrowRight size={16} /></Link><a href={featWa} target="_blank" rel="noopener noreferrer" className="harm-dark">Quote on WhatsApp</a></div><div className="harm-mini"><span><TreeDeciduous size={14} /> Solid wood</span><span><Ruler size={14} /> Custom size</span><span><ShieldCheck size={14} /> Showroom QA</span></div></div></section>
      <section className="harm-sec"><div className="harm-head"><div><span className="harm-kick">Latest additions</span><h2 className="harm-h2">New designs and ready stock</h2></div><Link href="/catalogue" className="harm-link">Full catalogue <ArrowRight size={15} /></Link></div><div className="harm-prods">{arrivals.map((p) => { const cc = cats.find((c) => c.id === p.category_id); return <ProductCard key={p.id} product={p} categorySlug={cc ? cc.slug : 'custom-furniture'} shopPhone={settings.whatsapp_number} />; })}</div></section>
      <HowItWorksStrip />
      <section className="harm-visit"><div><span className="harm-kick">Visit showroom</span><h2 className="harm-h2">TCL Tower, Kangeyam</h2><p className="harm-p">Walk the floor, feel the timber, bring room sizes. Open Mon-Sat till 6 PM.</p><div className="harm-cta"><a href="https://maps.google.com/?q=INHOME+FURNITURE+Kangeyam" target="_blank" rel="noopener noreferrer" className="harm-solid"><Navigation size={15} /> Get directions</a><a href="tel:+919999999999" className="harm-dark"><Phone size={15} /> Call showroom</a></div></div><div className="harm-bespoke"><Award size={18} /><h3>Have a reference photo?</h3><p>Send Pinterest or Instagram ideas plus dimensions for a fast custom quote.</p><a href={customUrl} target="_blank" rel="noopener noreferrer" className="harm-ghost">Send photo on WhatsApp</a></div></section>
    </div>
  );
}
