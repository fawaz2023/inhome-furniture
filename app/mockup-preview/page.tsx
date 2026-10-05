import Link from 'next/link';
import Image from 'next/image';
import './mockup.css';
import CategoryCard from '@/components/catalogue/CategoryCard';
import ProductCard from '@/components/catalogue/ProductCard';
import HowItWorksStrip from '@/components/catalogue/HowItWorksStrip';
import NewArrivalsCarousel from '@/components/catalogue/NewArrivalsCarousel';
import { getMockCategories, getMockNewArrivals, getMockProductsByCategorySlug, getMockSettings } from '@/lib/mock-data';
import { buildProductEnquiryUrl, buildCustomDesignEnquiryUrl } from '@/lib/whatsapp';
import { Star, MapPin, Clock, MessageCircle, SlidersHorizontal, ArrowRight, CheckCircle2, Sparkles, Phone, Navigation, ShieldCheck, Ruler, Truck } from 'lucide-react';

export const metadata = {
  title: 'Mockup Preview â€” INHOME FURNITURE Vibe Check',
  robots: { index: false, follow: false },
};

export default function MockupPreviewPage() {
  const categories = getMockCategories();
  const newArrivals = getMockNewArrivals().slice(0, 6);
  const settings = getMockSettings();
  const heroCat = categories[0];
  const sofaCat = categories.find((c) => c.slug === 'sofas') ?? categories[0];
  const sofaProducts = getMockProductsByCategorySlug(sofaCat.slug).slice(0, 4);
  const featured = sofaProducts[0] ?? newArrivals[0];
  const featuredCatSlug = sofaCat.slug;
  const customUrl = buildCustomDesignEnquiryUrl(settings.whatsapp_number);
  const enquireUrl = featured ? buildProductEnquiryUrl(featured.name, featuredCatSlug, featured.slug, 'standard', settings.whatsapp_number) : customUrl;
  const customiseUrl = featured ? buildProductEnquiryUrl(featured.name, featuredCatSlug, featured.slug, 'customise', settings.whatsapp_number) : customUrl;
  const arrivalsWithSlug = newArrivals.map((p) => {
    const cat = categories.find((c) => c.id === p.category_id);
    return { ...p, categorySlug: cat ? cat.slug : sofaCat.slug };
  });
  const heroImg = heroCat.image_url;
  const heroImg2 = categories[3]?.image_url ?? heroImg;

  return (
    <div className="mk-wrap">
      <div className="mk-topbar container-standard">
        <span className="mk-pill">âœ¦ MOCKUP PREVIEW â€” Option B</span>
        <span className="mk-top-hint">Scroll: 01 Home â†’ 02 Category â†’ 03 Product â€¢ <Link href="/">Live site</Link></span>
      </div>

      <div className="mk-chapter-label container-standard"><span>01 â€” Home â€¢ 3-second trust</span></div>
      <section className="mk-hero container-standard">
        <div className="mk-trustbar">
          <span className="mk-trust"><Star size={13} fill="currentColor" /> 4.8 Google â€¢ 23 reviews</span>
          <span className="mk-dot" />
          <span className="mk-trust"><MapPin size={13} /> TCL Tower, Kangeyam</span>
          <span className="mk-dot" />
          <span className="mk-trust"><Clock size={13} /> Mon-Sat â€¢ 9amâ€“6pm</span>
        </div>
        <div className="mk-hero-grid">
          <div className="mk-hero-copy">
            <span className="mk-eyebrow">Kangeyam â€¢ Custom Furniture</span>
            <h1 className="mk-h1">Furniture made to your <em>specifications.</em></h1>
            <p className="mk-sub">Browse solid-teak designs. Tap any piece for a transparent quote on WhatsApp â€” wood, size, finish, your way.</p>
            <div className="mk-cta-row">
              <a href={enquireUrl} target="_blank" rel="noreferrer" className="btn-whatsapp mk-cta-main"><MessageCircle size={18} /> Enquire on WhatsApp</a>
              <a href="#mk-categories" className="btn-secondary mk-cta-ghost">Browse catalogue <ArrowRight size={15} /></a>
            </div>
            <div className="mk-mini-proof">
              <span><CheckCircle2 size={14} /> Solid wood options</span>
              <span><CheckCircle2 size={14} /> Custom dimensions</span>
              <span><CheckCircle2 size={14} /> Direct showroom chat</span>
            </div>
            <div className="mk-search-mock" aria-disabled="true" title="Visual mock - not tappable"><span>âŒ•</span><span>Search sofas, teak beds, dining setsâ€¦</span><span className="mk-search-tag">visual mock</span></div>
          </div>
          <div className="mk-hero-media">
            <div className="mk-hero-img-main"><Image src={heroImg} alt={heroCat.name} fill sizes="(max-width:768px) 100vw, 520px" className="mk-img" priority /></div>
            <div className="mk-hero-img-small"><Image src={heroImg2} alt="Detail" fill sizes="200px" className="mk-img" /></div>
            <div className="mk-float mk-float-top"><span className="badge badge-ready"><CheckCircle2 size={11} /> Ready stock</span></div>
            <div className="mk-float mk-float-bottom"><span className="badge badge-order"><Sparkles size={11} /> Made to order</span><span className="mk-float-sub">Teak â€¢ Rosewood â€¢ Custom size</span></div>
          </div>
        </div>
      </section>

      <div className="mk-strip container-standard">
        <div className="mk-strip-steps">
          <span><b>01</b> Pick design</span><span className="mk-arrow">â†’</span>
          <span><b>02</b> Share size / wood on WhatsApp</span><span className="mk-arrow">â†’</span>
          <span><b>03</b> Custom-crafted to order</span>
        </div>
      </div>
      <NewArrivalsCarousel products={arrivalsWithSlug} shopPhone={settings.whatsapp_number} />
      <section id="mk-categories" className="mk-cats container-standard">
        <div className="mk-sec-head">
          <div><span className="mk-eyebrow">Complete catalogue</span><h2 className="mk-h2">Explore by category</h2></div>
          <p className="mk-sec-cap">{categories.length} specialised collections â€” tap in to view designs.</p>
        </div>
        <div className="mk-cat-grid">{categories.slice(0, 8).map((c) => (<CategoryCard key={c.id} category={c} />))}</div>
      </section>
      <section className="container-standard"><div className="mk-custom-card">
        <span className="mk-custom-badge">âœ¦ Bespoke orders</span>
        <h2>Have your own design in mind?</h2>
        <p>Send a Pinterest / Instagram reference photo with dimensions and wood on WhatsApp for a fast quote.</p>
        <a href={customUrl} target="_blank" rel="noreferrer" className="btn-whatsapp mk-cta-main"><MessageCircle size={18} /> Send reference photo</a>
        {settings.after_hours_note && (<span className="mk-hours"><Clock size={13} /> {settings.after_hours_note} â€” UI label only</span>)}
      </div></section>
      <HowItWorksStrip />
      <div className="mk-chapter-label container-standard"><span>02 â€” Category â€¢ calm 2-col grid</span></div>
      <section className="container-standard mk-catmock">
        <nav className="mk-crumb" aria-label="Breadcrumb"><span>Home</span><span>â€º</span><b>{sofaCat.name}</b></nav>
        <div className="mk-cat-head">
          <div><span className="mk-eyebrow">Category showcase</span><h2 className="mk-h2">{sofaCat.name}</h2>
          <p className="mk-sub2">{sofaCat.description}</p></div>
          <span className="mk-count">{sofaProducts.length} designs</span>
        </div>
        <div className="mk-pills" aria-disabled="true" title="Visual mock - not tappable"><span className="mk-pill-on">All</span><span>Ready stock</span><span>Made to order</span></div>
        <div className="mk-prod-grid">{sofaProducts.map((p) => (<ProductCard key={p.id} product={p} categorySlug={featuredCatSlug} shopPhone={settings.whatsapp_number} />))}</div>
      </section>


      <div className="mk-chapter-label container-standard"><span>03 â€” Product â€¢ dual WhatsApp CTAs</span></div>
      {featured && (
      <section className="container-standard mk-prodmock">
        <div className="mk-prod-grid2">
          <div className="mk-gal">
            <div className="mk-gal-main"><Image src={featured.images[0]} alt={featured.name} fill sizes="(max-width:768px) 100vw, 560px" className="mk-img" /></div>
            <div className="mk-gal-thumbs">{featured.images.slice(0, 3).map((src, i) => (<span key={i} className={i === 0 ? 'mk-thumb on' : 'mk-thumb'}><Image src={src} alt="" fill sizes="90px" className="mk-img" /></span>))}</div>
          </div>
          <div className="mk-info">
            <nav className="mk-crumb" aria-label="Breadcrumb"><span>Home</span><span>â€º</span><span>{sofaCat.name}</span><span>â€º</span><b>{featured.name.slice(0, 22)}..</b></nav>
            <span className={featured.product_type === 'made_to_order' ? 'badge badge-order' : 'badge badge-ready'}>{featured.product_type === 'made_to_order' ? 'Made to order' : 'Ready stock'}</span>
            <h2 className="mk-h2">{featured.name}</h2>
            <p className="mk-sub2">{featured.description}</p>
            <div className="mk-specs">
              <div><Ruler size={15} /><span>{featured.customisation_options.wood_options?.slice(0, 3).join(' â€¢ ') ?? 'Teak â€¢ Rosewood'}</span></div>
              <div><SlidersHorizontal size={15} /><span>{featured.customisation_options.size_notes ?? 'Custom dimensions welcome'}</span></div>
              <div><ShieldCheck size={15} /><span>Transparent quote â€¢ Custom-crafted to order</span></div>
            </div>
            <a href={enquireUrl} target="_blank" rel="noreferrer" className="btn-whatsapp mk-big"><MessageCircle size={19} /> Enquire on WhatsApp</a>
            <a href={customiseUrl} target="_blank" rel="noreferrer" className="btn-secondary mk-big2"><SlidersHorizontal size={17} /> Customise size or wood</a>
            {settings.after_hours_note && (<span className="mk-hours"><Clock size={13} /> {settings.after_hours_note}</span>)}
            <div className="mk-trustline"><Truck size={14} /> Kangeyam delivery â€¢ TCL Tower</div>
          </div>
        </div>
      </section>
      )}
      <div className="container-standard mk-sticky-mock" aria-hidden="true" title="Sticky-bar preview (visual mock)">
        <span><Phone size={17} /> Call</span>
        <span className="mk-sticky-wa"><MessageCircle size={17} /> WhatsApp</span>
        <span><Navigation size={17} /> Directions</span>
      </div>
      <div className="container-standard mk-sticky-cap"><p>Preview of the fixed bottom Call / WhatsApp / Directions bar above (visual only — the live bar is fixed to the viewport).</p></div>      <div className="mk-foot container-standard"><p>Mockup only — reuses live atoms + tokens. WhatsApp links use P0 builder, hours note is UI-only.</p></div>
    </div>
  );
}

