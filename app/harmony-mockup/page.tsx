import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import './harmony.css';
import HarmonyMockupClient from './HarmonyMockupClient';
import HarmonyHeroVideo from './HarmonyHeroVideo';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StickyBottomBar from '@/components/layout/StickyBottomBar';
import CategoryCard from '@/components/catalogue/CategoryCard';
import ProductCard from '@/components/catalogue/ProductCard';
import HowItWorksStrip from '@/components/catalogue/HowItWorksStrip';
import { getMockCategories, getMockNewArrivals, getMockFeaturedProducts, getMockSettings } from '@/lib/mock-data';
import { buildCustomDesignEnquiryUrl, buildProductEnquiryUrl } from '@/lib/whatsapp';
import {
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Star,
  MessageCircle,
  Phone,
  Navigation,
  ShieldCheck,
  Ruler,
  TreeDeciduous,
  Award,
  Camera
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Harmony-Inspired Homepage Preview | INHOME FURNITURE',
  robots: {
    index: false,
    follow: false,
  },
};

export default function HarmonyMockupPage() {
  const categories = getMockCategories();
  const arrivals = getMockNewArrivals().slice(0, 4);
  const featuredList = getMockFeaturedProducts();
  const settings = getMockSettings();

  const customOrderWhatsAppUrl = buildCustomDesignEnquiryUrl(settings.whatsapp_number);

  // Spotlight categories
  const spotlightCats = categories.filter((c) =>
    ['sofas', 'beds', 'cots', 'dining-tables', 'tv-units', 'wardrobes'].includes(c.slug)
  ).slice(0, 6);

  // Flagship editorial feature
  const flagship = featuredList[0] || arrivals[0];
  const flagshipCat = categories.find((c) => c.id === flagship.category_id);
  const flagshipSlug = flagshipCat ? flagshipCat.slug : 'custom-furniture';
  const flagshipUrl = `/${flagshipSlug}/${flagship.slug}`;
  const flagshipWaUrl = buildProductEnquiryUrl(
    flagship.name,
    flagshipSlug,
    flagship.slug,
    'standard',
    settings.whatsapp_number
  );

  const stats = [
    { value: '17', label: 'Curated Collections', sub: 'Living, Dining, Bedroom & Puja' },
    { value: '4.8★', label: 'Google Rated', sub: 'Verified Kangeyam Showroom' },
    { value: '100%', label: 'Solid Wood Timber', sub: 'Seasoned Nilambur Teak' },
    { value: '1 : 1', label: 'Bespoke Consultation', sub: 'Direct on WhatsApp' },
  ];

  return (
    <HarmonyMockupClient>
      <div className="harm-page">
        <Header />

      <main className="harm-main">
        {/* 1. Harmony Sticky Video Hero with 4 Scene Switchers */}
        <HarmonyHeroVideo customOrderWhatsAppUrl={customOrderWhatsAppUrl} />

        {/* 2. Harmony Rising Curtain Sheet (Scrollable Content Body) */}
        <div id="harmony-content-sheet" className="harm-curtain-sheet">
          {/* Architectural Stats Strip */}
          <section className="harm-stats-section" aria-label="Key Trust Metrics">
            <div className="harm-stats-grid">
              {stats.map((s) => (
                <div key={s.label} className="harm-stat-card">
                  <span className="harm-stat-val">{s.value}</span>
                <span className="harm-stat-label">{s.label}</span>
                <span className="harm-stat-sub">{s.sub}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 3. The Nilambur Teak Distinction (Architectural Minimalist) */}
        <section className="harm-sec">
          <div className="harm-head">
            <div>
              <span className="harm-eyebrow">The Nilambur Pedigree</span>
              <h2 className="harm-h2">Why Nilambur Teak Stands Alone</h2>
            </div>
          </div>

          <div className="harm-pillars">
            <div className="harm-pillar-card">
              <div className="harm-pillar-icon">
                <TreeDeciduous size={22} />
              </div>
              <h3 className="harm-pillar-title">Dense Golden Grain</h3>
              <p className="harm-pillar-p">
                Fed by the rich alluvial soils of the Chaliyar river basin, Nilambur teak develops tight annular rings that yield unmatched structural strength and a lustrous golden-amber patina.
              </p>
            </div>

            <div className="harm-pillar-card">
              <div className="harm-pillar-icon">
                <ShieldCheck size={22} />
              </div>
              <h3 className="harm-pillar-title">Natural Termite Immunity</h3>
              <p className="harm-pillar-p">
                Rich in natural tectoquinone timber oils, providing permanent organic resistance to termites, wood-borers, and seasonal humidity without harsh chemical dips.
              </p>
            </div>

            <div className="harm-pillar-card">
              <div className="harm-pillar-icon">
                <Ruler size={22} />
              </div>
              <h3 className="harm-pillar-title">Bespoke Blueprint Precision</h3>
              <p className="harm-pillar-p">
                Every piece is custom-cut and crafted to your room dimensions, ceiling heights, and preferred finish tones — not restricted to mass-market factory sizes.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Portfolio / Curated Collections Grid */}
        <section className="harm-sec">
          <div className="harm-head">
            <div>
              <span className="harm-eyebrow">Our Portfolio</span>
              <h2 className="harm-h2">Collections for Every Room</h2>
            </div>
            <Link href="/catalogue" className="harm-link">
              <span>View all 17 categories</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="harm-grid">
            {spotlightCats.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </section>

        {/* 5. Flagship Editorial Split */}
        <section className="harm-feat-section">
          <div className="harm-feat-grid">
            <div className="harm-feat-media">
              <Image
                src={flagship.images[0]}
                alt={flagship.name}
                fill
                sizes="(max-width: 768px) 100vw, 560px"
                className="harm-feat-img"
              />
            </div>
            <div className="harm-feat-content">
              <span className="harm-eyebrow harm-eyebrow-light">Signature Showcase</span>
              <h2 className="harm-feat-title">{flagship.name}</h2>
              <p className="harm-feat-desc">{flagship.description}</p>

              <div className="harm-feat-tags">
                <span className="harm-feat-tag">
                  <TreeDeciduous size={14} /> Nilambur Teak
                </span>
                <span className="harm-feat-tag">
                  <Ruler size={14} /> Custom Sized
                </span>
                <span className="harm-feat-tag">
                  <ShieldCheck size={14} /> Showroom Inspected
                </span>
              </div>

              <div className="harm-feat-cta">
                <Link href={flagshipUrl} className="harm-btn-primary">
                  <span>View Details</span>
                  <ArrowRight size={16} />
                </Link>
                <a
                  href={flagshipWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="harm-btn-dark"
                >
                  <MessageCircle size={16} />
                  <span>Enquire on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Latest Additions Grid */}
        <section className="harm-sec">
          <div className="harm-head">
            <div>
              <span className="harm-eyebrow">New Additions</span>
              <h2 className="harm-h2">Recent Showroom Designs</h2>
            </div>
            <Link href="/catalogue" className="harm-link">
              <span>Open catalogue</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="harm-prods-grid">
            {arrivals.map((product) => {
              const cat = categories.find((c) => c.id === product.category_id);
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  categorySlug={cat ? cat.slug : 'custom-furniture'}
                  shopPhone={settings.whatsapp_number}
                />
              );
            })}
          </div>
        </section>

        {/* 7. How It Works Strip */}
        <HowItWorksStrip />

        {/* 8. Showroom Visit & Bespoke Elevation Consultation */}
        <section className="harm-visit-section">
          <div className="harm-visit-card">
            <span className="harm-eyebrow">Visit Kangeyam Showroom</span>
            <h2 className="harm-visit-title">TCL Tower, Chennimalai Road</h2>
            <p className="harm-visit-desc">
              Walk our showroom floor, feel the natural grain, and review wood samples in person before carving begins.
            </p>
            <div className="harm-visit-meta">
              <p><strong>Address:</strong> {settings.address || 'TCL Tower, 3/43A, Chennimalai Rd, Kangeyam, Tamil Nadu 638701'}</p>
              <p><strong>Hours:</strong> {settings.opening_hours || 'Mon - Sat: 9:00 AM - 6:00 PM'}</p>
            </div>
            <div className="harm-visit-actions">
              <a
                href={settings.google_maps_url || 'https://maps.google.com/?q=INHOME+FURNITURE+Kangeyam'}
                target="_blank"
                rel="noopener noreferrer"
                className="harm-btn-primary"
              >
                <Navigation size={15} />
                <span>Get Directions</span>
              </a>
              <a
                href={`tel:${settings.phone || '+919999999999'}`}
                className="harm-btn-dark"
              >
                <Phone size={15} />
                <span>Call Showroom</span>
              </a>
            </div>
          </div>

          <div className="harm-bespoke-card">
            <div className="harm-bespoke-badge">
              <Award size={18} />
              <span>Bespoke Design Service</span>
            </div>
            <h3 className="harm-bespoke-title">Have an Elevation or Pinterest Photo?</h3>
            <p className="harm-bespoke-desc">
              Architectural blueprints, 3D interior elevations, or reference photos from Instagram/Pinterest — send them with your room sizes for an itemized estimate on WhatsApp.
            </p>
            <a
              href={customOrderWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="harm-btn-bespoke"
            >
              <Camera size={18} />
              <span>Send Reference Photo on WhatsApp</span>
            </a>
          </div>
        </section>
        </div>
      </main>

      <Footer />

      <StickyBottomBar
        phoneNumber={settings.phone}
        whatsappNumber={settings.whatsapp_number}
        afterHoursNote={settings.after_hours_note}
      />
    </div>
  </HarmonyMockupClient>
);
}
