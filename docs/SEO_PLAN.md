# Local SEO & WhatsApp Unfurl Specification
## INHOME FURNITURE — Kangeyam, Tamil Nadu

**Document Version:** 1.0.0  
**Date:** October 4, 2026  
**Primary Focus:** Local Search Rankings (Kangeyam / Tirupur District) + Flawless WhatsApp Preview Cards  

---

## 1. SEO Strategy & Value Proposition

While INHOME FURNITURE receives significant direct traffic through customer link sharing on WhatsApp, ranking #1 for furniture searches in Kangeyam and adjacent regions provides an ongoing passive stream of high-intent custom furniture leads.

### 1.1 Local Keyword Targets

| Priority | Search Query Intent | Target Page |
| :--- | :--- | :--- |
| **P1** | `furniture shop in Kangeyam` | Home (`/`) |
| **P1** | `custom furniture Kangeyam` | Home / About (`/about`) |
| **P1** | `sofa Kangeyam` / `wooden sofa Kangeyam` | Sofa Category (`/sofa`) |
| **P1** | `wooden cot Kangeyam` / `custom wooden cot in Kangeyam` | Cot Model (`/cot-model`) |
| **P1** | `made-to-order wardrobe Kangeyam` | Wardrobe (`/wardrobe`) |
| **P1** | `wooden door maker near Kangeyam` | Wooden Door (`/wooden-door`) |
| **P2** | `teak wood dining table Kangeyam` | Dining Tables (`/dining-tables`) |
| **P2** | `bar stool Kangeyam` / `teapoy Kangeyam` | Specific Categories |
| **P2** | `furniture showroom Chennimalai road Kangeyam` | About & Contact (`/about`) |
| **P3** | `teak furniture makers near Tirupur / Erode` | Home / Gallery |

---

## 2. Canonical URL Hierarchy

All URLs are clean, human-readable, lowercase, and strictly canonicalized:

```text
/                              -> Home (Showcase & 17 Category Cards)
/gallery                       -> Workshop & Showroom Gallery
/about                         -> Story, Address, Hours, Google 4.8 Rating & Map
/[category-slug]               -> Category Product Showcase (e.g., /cot-model)
/[category-slug]/[product-slug] -> Single Product Detail (e.g., /cot-model/royal-teak-king-cot)
```

Rules:
- Never expose database IDs in public URLs.
- Trailing slashes are consistently stripped (`trailingSlash: false`).
- Canonical meta tag present on every single page.

---

## 3. WhatsApp Open Graph & Link Unfurl Engineering

### 3.1 How WhatsApp Fetches Previews
When a link is sent in WhatsApp:
1. WhatsApp's crawler (`WhatsApp/2.x.x` or `facebookexternalhit/1.1`) issues an HTTP GET request to the shared URL.
2. It parses `<meta property="og:...">` tags.
3. It downloads the image specified in `og:image`.
4. If valid, WhatsApp renders a preview card showing:
   - **Cover Image** (Left thumbnail or top banner)
   - **Bold Title** (`og:title`)
   - **Subtitle / Excerpt** (`og:description`)
   - **Hostname** (e.g., `inhomefurniture.in`)

### 3.2 WhatsApp Strict Requirements
To guarantee the preview unfurls 100% of the time:
1. **Absolute HTTPS URL:** `og:image` must NOT be relative. It must be `https://inhomefurniture.in/uploads/...` or the Supabase Storage CDN URL.
2. **File Size Limit:** Image must be **under 300 KB**. If the image is 5 MB, WhatsApp will timeout and drop the preview card entirely.
3. **Dimensions:** Optimal is $1200\times630\text{ px}$ (1.91:1) or $800\times800\text{ px}$ square. Minimum is $400\times400\text{ px}$.
4. **MIME Type:** JPEG or PNG preferred. WebP is supported on modern clients, but serving a fast JPEG/PNG fallback guarantees universal WhatsApp compatibility.
5. **No Client-Side Rendering for Meta:** Meta tags must be present in the initial server-rendered HTML.

---

## 4. Metadata Templates (Next.js App Router)

### 4.1 Global Default Template (`app/layout.tsx`)
```typescript
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://inhomefurniture.in'),
  title: {
    default: 'INHOME FURNITURE | Custom Wooden Furniture in Kangeyam',
    template: '%s | INHOME FURNITURE Kangeyam',
  },
  description:
    'Custom-made solid wood furniture in Kangeyam, Tamil Nadu. Handcrafted cots, sofas, dining tables, wardrobes, and doors. Made to order at our workshop on Chennimalai Rd.',
  keywords: [
    'furniture shop in Kangeyam',
    'custom wooden cot Kangeyam',
    'sofa Kangeyam',
    'teak dining table Kangeyam',
    'INHOME furniture TCL tower',
    'wooden door maker Kangeyam'
  ],
  authors: [{ name: 'INHOME FURNITURE' }],
  creator: 'INHOME FURNITURE',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://inhomefurniture.in',
    siteName: 'INHOME FURNITURE Kangeyam',
    title: 'INHOME FURNITURE | Custom Wooden Furniture Kangeyam',
    description: 'Bespoke wooden furniture, cots, dining tables, and sofas made to order. Explore our Kangeyam showroom catalogue.',
    images: [
      {
        url: 'https://inhomefurniture.in/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'INHOME FURNITURE Kangeyam Showroom',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'INHOME FURNITURE Kangeyam',
    description: 'Custom-made solid wood furniture in Kangeyam, Tamil Nadu.',
    images: ['https://inhomefurniture.in/og-default.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

### 4.2 Dynamic Category Template (`app/[category]/page.tsx`)
```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return { title: 'Category Not Found' };
  }

  const title = `${category.name} in Kangeyam | Custom Wooden Designs`;
  const description = category.description 
    || `Explore custom-crafted ${category.name.toLowerCase()} at INHOME FURNITURE, Kangeyam. Solid wood, custom dimensions, and custom finishes.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${category.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `https://inhomefurniture.in/${category.slug}`,
      images: [
        {
          url: category.image_url || 'https://inhomefurniture.in/og-default.jpg',
          width: 1200,
          height: 630,
          alt: `${category.name} - INHOME FURNITURE`,
        },
      ],
    },
  };
}
```

### 4.3 Dynamic Product Template (`app/[category]/[product]/page.tsx`)
```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug, product: productSlug } = params;
  const product = await getProductBySlug(categorySlug, productSlug);

  if (!product) {
    return { title: 'Product Not Found' };
  }

  const categoryName = product.category?.name || 'Furniture';
  const title = `${product.name} | Custom ${categoryName} Kangeyam`;
  const description = product.description 
    ? `${product.description.slice(0, 140)}... Customise wood and size at INHOME FURNITURE Kangeyam.`
    : `Customise this handcrafted ${product.name}. Available in Teak, Rosewood, and bespoke dimensions at INHOME FURNITURE Kangeyam.`;

  const primaryImage = product.images?.[0] || 'https://inhomefurniture.in/og-default.jpg';

  return {
    title,
    description,
    alternates: {
      canonical: `/${categorySlug}/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} — INHOME FURNITURE Kangeyam`,
      description,
      url: `https://inhomefurniture.in/${categorySlug}/${product.slug}`,
      images: [
        {
          url: primaryImage,
          width: 800,
          height: 800,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.name} | INHOME FURNITURE`,
      description,
      images: [primaryImage],
    },
  };
}
```

---

## 5. Schema.org JSON-LD Structured Data

### 5.1 LocalBusiness / FurnitureStore (On Layout & About)
```json
{
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  "name": "INHOME FURNITURE",
  "image": "https://inhomefurniture.in/og-default.jpg",
  "@id": "https://inhomefurniture.in",
  "url": "https://inhomefurniture.in",
  "telephone": "+919876543210",
  "priceRange": "₹₹ - ₹₹₹",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "TCL Tower, 3/43A, Chennimalai Rd",
    "addressLocality": "Kangeyam",
    "addressRegion": "Tamil Nadu",
    "postalCode": "638701",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 11.0062,
    "longitude": 77.5623
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "23"
  }
}
```

### 5.2 Product Schema (On Product Pages)
```json
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Wooden Bar Stool",
  "image": [
    "https://inhomefurniture.in/images/wooden-bar-stool.jpg"
  ],
  "description": "Handcrafted solid wood bar stool custom-built for breakfast counters and kitchen islands.",
  "brand": {
    "@type": "Brand",
    "name": "INHOME FURNITURE"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://inhomefurniture.in/bar-stool/wooden-bar-stool",
    "priceCurrency": "INR",
    "price": "0",
    "priceValidUntil": "2027-12-31",
    "availability": "https://schema.org/PreOrder",
    "itemCondition": "https://schema.org/NewCondition"
  }
}
```

---

## 6. Sitemap & Robots Configuration

### 6.1 `app/sitemap.ts`
Generates dynamic XML sitemap containing:
- Static routes: `/`, `/gallery`, `/about` (changeFrequency: `weekly`, priority: `1.0` / `0.8`).
- All active categories (`/[category]`, changeFrequency: `daily`, priority: `0.9`).
- All active products (`/[category]/[product]`, changeFrequency: `daily`, priority: `0.8`).

### 6.2 `app/robots.ts`
- Disallows: `/admin`, `/api/`
- Allows: `/`
- Points directly to `https://inhomefurniture.in/sitemap.xml`.
