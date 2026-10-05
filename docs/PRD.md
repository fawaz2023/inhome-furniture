# Product Requirements Document (PRD)
## INHOME FURNITURE — Mobile-First Catalogue & WhatsApp Enquiry System

**Document Version:** 1.0.0  
**Date:** October 4, 2026  
**Status:** Approved for Implementation  
**Client / Brand:** INHOME FURNITURE, Kangeyam, Tamil Nadu  

---

## 1. Executive Summary & Vision

### 1.1 Problem Statement
INHOME FURNITURE is a prominent custom furniture workshop and showroom in Kangeyam, Tamil Nadu (Google Rating 4.8 / 23 reviews). Currently, client consultations happen via WhatsApp chats, phone calls, or walk-ins. Sending individual photos back and forth via WhatsApp chat without a structured catalogue creates confusion regarding dimensions, wood finishes, and item specifications. Traditional e-commerce platforms (Shopify, WooCommerce) are inappropriate because:
- Almost all furniture items are **custom-crafted to order** with variable dimensions and wood selections (Teak, Rosewood, Mahogany, Ash, etc.).
- There are no fixed inventory counts or instant digital checkouts.
- Customers in Kangeyam and the surrounding region expect direct personal dialogue with the shop owner before committing to custom furniture orders.

### 1.2 Solution
A lightweight, lightning-fast, mobile-first catalogue web application built with **Next.js (App Router)** and **Supabase**. The platform operates as a modern digital design showcase mirroring the intuitive app-like flow of NineFinds / CU Malaysian Furniture (Category Cards $\to$ Category View $\to$ Product Detail $\to$ WhatsApp Enquiry). 

When a customer finds a piece they like, a single tap triggers a pre-filled WhatsApp message containing the **exact product canonical URL**. WhatsApp automatically unfurls the Open Graph card displaying the high-resolution product photo, title, and preview directly into the chat with the shop owner.

---

## 2. Business & Shop Profile

| Attribute | Verified Value |
| :--- | :--- |
| **Business Name** | **INHOME FURNITURE** (Single word "INHOME", matching Google Business Profile) |
| **Address** | TCL Tower, 3/43A, Chennimalai Rd, Kangeyam, Tamil Nadu 638701 |
| **Google Listing** | 4.8 Stars (23 reviews) — Call, Directions, WhatsApp already configured |
| **Hours** | Closes 6:00 PM daily |
| **Target Regions** | Kangeyam, Tirupur, Erode, Dharapuram, Karur, Coimbatore, and Tamil Nadu |
| **Core Business Model** | Made-to-order custom wooden & upholstered furniture + limited ready showroom stock |
| **Primary Customer Device** | Mobile smartphones (WhatsApp referrals, QR code scans, Google Local searches) |

---

## 3. Product Goals & Non-Goals

### 3.1 Primary Goals
1. **Zero-Friction Browsing:** Rapid, app-like navigation with smooth transitions between Home, Category, and Product views.
2. **Deterministic WhatsApp Product Enquiry:** 1-tap WhatsApp message generation encoding the exact product name and canonical URL to produce rich link preview cards (photo + title) in the merchant's chat.
3. **Owner-Friendly Mobile Admin Panel:** Lightweight, single-hand friendly admin dashboard allowing the owner to photograph furniture on the showroom floor and publish it with customisation tags in under 60 seconds.
4. **Custom-Order Centric UX:** Prominent tags (`Made to order` vs `Ready stock`), customizable options (Wood, Size, Finish, Fabric), and a direct "Have your own design? Send photo" CTA.
5. **Local SEO & Discovery:** First-class Open Graph tags, JSON-LD `LocalBusiness` + `Product` structured data, and sub-second load times on 4G/5G mobile networks.

### 3.2 Non-Goals (Strictly Out of Scope)
- ❌ **No Cart or Checkout:** Customers do not add items to a shopping cart.
- ❌ **No Online Payment Gateways:** No Razorpay, Stripe, or UPI gateway integration on the site.
- ❌ **No Customer Accounts or Signups:** Zero login or profile requirements for catalog visitors.
- ❌ **No Inventory/Stock Sync:** No complex stock tracking or warehouse management.
- ❌ **No Heavy CMS Overheads:** No WordPress, WooCommerce, or bloated plugins.

---

## 4. User Personas & Core Journeys

### 4.1 Persona A: The Custom Home Builder (Customer)
* **Profile:** Homeowner furnishing a new house in Kangeyam or Tirupur. Received a WhatsApp catalogue link from the owner or discovered the shop on Google Maps.
* **Goal:** Browse dining tables, cots, and sofas; see design craftsmanship; ask for a quote with specific room dimensions.
* **Journey:**
  1. Opens link `inhomefurniture.in` on mobile browser.
  2. Taps "Dining Tables" category card $\to$ sees grid of custom dining sets.
  3. Taps "6-Seater Solid Teak Dining Table" $\to$ views high-res photos and customizable wood options.
  4. Taps **"Customise this design"** button $\to$ native WhatsApp opens with:
     > *"Hi INHOME Furniture, I'd like to customise this 6-Seater Solid Teak Dining Table (size/wood): https://inhomefurniture.in/dining-tables/6-seater-solid-teak-dining-table. Please share details."*
  5. WhatsApp renders the preview thumbnail of the table $\to$ customer sends message $\to$ conversation starts.

### 4.2 Persona B: The Shop Owner (Admin)
* **Profile:** Retailer, design consultant, and showroom manager at INHOME FURNITURE Kangeyam. Uses an Android/iOS smartphone. **Single admin login — owner only.**
* **Goal:** Quickly upload newly finished pieces, mark items as "Ready stock" or "Made to order", and share direct category/product links to enquiring WhatsApp leads.
* **Journey:**
  1. Visits `/admin` on phone and authenticates via Supabase Auth.
  2. Taps "Add Product" $\to$ takes photo directly using phone camera or selects from gallery.
  3. Types product name, selects category ("Cot Model"), tags as "Made to order", adds customisation options ("Teak / Rosewood; King / Queen size").
  4. Taps "Publish" $\to$ instantly live on website with optimized WebP compression.
  5. Uses "Share on WhatsApp" button inside admin to dispatch the link directly to an existing customer chat.

---

## 5. Detailed Feature Specifications

### 5.1 Public Experience (Mobile-First)

#### 5.1.1 Navigation & Layout
- **Header:**
  - INHOME FURNITURE wordmark + "Kangeyam, Tamil Nadu" micro-subtitle.
  - Google Rating Pill badge: "⭐ 4.8 (23 reviews on Google)" linking out to Google Maps review tab.
  - Clean top tabs: **Products** | **Gallery** | **About & Showroom**.
- **Search Bar:**
  - Sticky or prominent search input with instant client-side filtering across product titles, wood types, and categories.
- **Sticky Bottom Action Bar (Persistent on all public screens):**
  - **Call:** `tel:+91<verified-phone>`
  - **WhatsApp:** Direct chat launch `https://wa.me/91<verified-phone>?text=Hi%20INHOME%20Furniture,%20I%20have%20an%20enquiry.`
  - **Directions:** Direct Google Maps navigation link (`https://maps.google.com/?q=INHOME+FURNITURE+Kangeyam`).
  - High thumb-zone ergonomic placement (`min-height: 56px`, touch target $> 48\text{px}$).

#### 5.1.2 Home Screen Structure
1. **Hero Header:** Confident, warm typography introducing INHOME FURNITURE Kangeyam as bespoke makers of solid wood and custom living essentials.
2. **"How It Works" 5-Step Process Strip (no workshop ownership claims):**
   - Step 1: *Choose a Design* (from catalogue or your own reference photo)
   - Step 2: *Share Dimensions & Wood Preference* (Teak, Rosewood, Fabric)
   - Step 3: *Get a Transparent Quote*
   - Step 4: *Custom Made to Order*
   - Step 5: *Delivered to Your Door*
3. **"Have Your Own Design?" Action Card:**
   - Visual card with prompt: *"Saw a design on Pinterest or Instagram? Share your reference photo and dimensions on WhatsApp for an instant estimate."*
   - Button: "Send Reference Photo on WhatsApp" $\to$ pre-fills custom quote prompt.
4. **Category Grid:**
   - 2-column mobile grid (responsive 3-4 columns on tablet/desktop).
   - Rich cover images with smooth rounded corners (`12px`), fixed 4:3 or 1:1 aspect ratio, category name, and count of active designs.
   - Categories with 0 active products are hidden automatically.
5. **"New Arrivals / Showroom Highlights" Row:**
   - Horizontal snap carousel of recently added products.

#### 5.1.3 Category Page (`/[category]`)
- **Breadcrumb Navigation:** `Home / [Category Name]`.
- **Category Header:** Title, brief description, and total designs count.
- **Product Card Grid:**
  - 2 columns on mobile.
  - Image thumbnail with WebP format and lazy loading.
  - Product Name (truncated to 2 lines max with optical height balance).
  - Status Tag: `Made to order` (soft neutral/warm badge) or `Ready stock` (emerald green badge).
  - Tap card $\to$ navigates to `/[category]/[product]`.

#### 5.1.4 Product Detail Page (`/[category]/[product]`)
- **Visuals:** High-resolution product image gallery (main viewport with swipe/tap thumbnail switcher).
- **Badge Indicators:** `Made to order` / `Ready stock` tag. **Do NOT use "Kangeyam Workshop Made" — production is managed via a separate partner entity; claiming in-house manufacturing would be inaccurate.**
- **Title:** Large, confident heading.
- **Customisation Details Panel (Clean readable specification list):**
  - **Wood Options:** e.g., Teak Wood, Country Wood, Sheesham, Rosewood finish.
  - **Dimensions / Size:** e.g., Custom sizes crafted to fit your room.
  - **Finish & Polish:** e.g., Natural Matte, Glossy Teak, Walnut, Dark Oak.
  - **Upholstery / Fabric:** e.g., Velvet, Jute, Stain-resistant leatherette (where applicable).
- **Pricing Clarity Notice:**
  - *"Prices vary based on selected wood type and custom dimensions. Tap below for an exact quote."*
- **Call-to-Actions (Dual WhatsApp CTAs):**
  - **Primary CTA Button:** "Enquire on WhatsApp" (Pre-fills standard enquiry).
  - **Secondary CTA Button:** "Customise Size or Wood" (Pre-fills customisation inquiry).
- **Related / More from this Category:** 3-4 suggested companion pieces.

#### 5.1.5 WhatsApp Link Generation Mechanics
To guarantee rich Open Graph unfurls in WhatsApp:
1. URL Format:
   `https://wa.me/91<phone_number>?text=<encoded_text>`
2. Standard Message Template:
   ```text
   Hi INHOME Furniture, I like this [Product Name]: https://[domain]/[category]/[product-slug]. Please share details.
   ```
3. Customise Message Template:
   ```text
   Hi INHOME Furniture, I'd like to customise this [Product Name] (size/wood): https://[domain]/[category]/[product-slug]. Please share details.
   ```
4. Technical Requirements for Preview Cards:
   - Page must expose complete `<meta property="og:title">`, `<meta property="og:description">`, `<meta property="og:image">`, `<meta property="og:url">`.
   - `og:image` must be an **absolute HTTPS URL** pointing to a compressed JPEG/PNG image ($< 300\text{KB}$, minimum $600\times315\text{px}$, recommended $1200\times630\text{px}$).
   - Product pages must be publicly accessible with HTTP 200 without redirects.

#### 5.1.6 Gallery Page (`/gallery`)
- Filter tabs: **All** | **Showroom** | **Finished Custom Work** | **New Arrivals**.
- Masonry / clean grid with lightbox image zoom.
- Direct WhatsApp enquiry button on individual gallery photos ("Ask about this piece").

#### 5.1.7 About & Showroom Page (`/about`)
- Story of INHOME FURNITURE as a trusted custom-furniture specialist and design consultant in Kangeyam. **Omit any claims of in-house manufacturing; use language like "custom-crafted to your specifications" and "made to order" instead.**
- Verified address and landmark details (TCL Tower, Chennimalai Rd).
- Google Business Profile integration:
  - Google ⭐ 4.8 static rating badge (text + link to Google Maps listing). **No Google Places API, no fetched review text — static badge only.**
  - Embedded Google Map with a "Get Directions" deep link button.
  - Operating hours (closing time 6 PM confirmed; opening time **TBD** — placeholder "9:00 AM" until owner confirms).

---

### 5.2 Admin Experience (Mobile-First)

#### 5.2.1 Authentication & Security
- Route: `/admin/login` and `/admin/*`.
- Supabase Auth session with secure cookies (`sb-access-token`).
- Protected layout redirecting unauthenticated sessions to login.

#### 5.2.2 Admin Dashboard (`/admin`)
- Overview stats: Total Products, Active Categories, Gallery Photos.
- Quick Actions:
  - ➕ **Add New Product**
  - ➕ **Add New Category**
  - 🖼️ **Upload Gallery Photo**
  - ⚙️ **Update Shop Settings** (WhatsApp number, Call number, Address)

#### 5.2.3 Product Management (`/admin/products`)
- Search and filter by category or tag.
- One-tap Visibility Toggle (`visible: true/false`).
- One-tap Featured Toggle (`featured: true/false`).
- **"Share on WhatsApp" Button:** Opens WhatsApp on the owner's phone pre-filled with the public link so the owner can instantly forward it to a prospect.
- Create / Edit Form:
  - Direct camera capture or gallery picker `<input type="file" accept="image/*" capture="environment">`.
  - Multi-image upload to Supabase Storage bucket (`catalogue-images`).
  - Automatic slug generation from product name.
  - Dropdown for Category.
  - Tag selector: `Made to order` vs `Ready stock`.
  - Customisation fields (size notes, wood types, finishes).

#### 5.2.4 Category Management (`/admin/categories`)
- Reorder categories (drag-and-drop or sort order index).
- Edit category title, description, and cover image.
- Toggle category visibility.

---

## 6. Technical Architecture & Data Flow

```mermaid
flowchart TD
    subgraph Public[Customer Experience]
        C[Mobile Browser] -->|Browse / Search| P[Next.js App Router]
        P -->|Server Render / SSR| DB[(Supabase Postgres)]
        P -->|Stream Media| ST[(Supabase Storage)]
        C -->|Tap Enquire| WA[WhatsApp App]
        WA -->|Unfurl Preview URL| P
    end

    subgraph Admin[Owner Experience]
        O[Owner Phone] -->|Camera / Upload| AP[Admin Dashboard]
        AP -->|Auth & Mutate| DB
        AP -->|Upload Photos| ST
        AP -->|Share to Lead| WA
    end

    subgraph Maintenance[Infrastructure]
        GH[GitHub Actions Cron] -->|Every 3 Days| KA[/api/keep-alive]
        KA -->|Ping Query| DB
    end
```

---

## 7. Supabase Free Tier Keep-Alive Protocol
Because Supabase free projects pause after 7 days of inactivity:
1. Endpoint: `/api/keep-alive` configured with an authorization header secret.
2. Endpoint executes a lightweight query (`SELECT count(*) FROM categories`).
3. External cron trigger (GitHub Actions scheduled workflow or cron-job.org) invokes this endpoint every 3 days.
4. Response returns status, timestamp, and database roundtrip latency.

---

## 8. Success Metrics & Verification

| Milestone / Metric | Target Bar | Verification Method |
| :--- | :--- | :--- |
| **Mobile Performance** | Google Lighthouse $\ge 90$ | Mobile audit on 4G throttle |
| **WhatsApp Preview** | 100% Unfurl Reliability | Live WhatsApp chat testing with generated URLs |
| **Image Load Speed** | WebP formats $< 150\text{KB}$ | Chrome Network inspection |
| **Admin Upload Time** | Under 45 seconds from photo to live | Stopwatch test on real mobile device |
| **Touch Ergonomics** | Zero targets $< 44\text{px}$ | DevTools accessibility audit |
| **Database Resilience** | 0 unhandled Supabase pauses | Keep-alive monitoring logs |
