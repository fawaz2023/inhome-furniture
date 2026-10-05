# Design Reference Benchmark & Superiority Guide
## INHOME FURNITURE vs. Reference Platform (CU Malaysian Furniture / Nine Finds)

**Reference URL:** `https://ninefinds.com/business/cu-malaysian-furniture-9829d914-ab4e-4b82-af84-ee946ee69cde`  
**Archived Screenshots:** `docs/references/ref_*.png`

---

## 1. Reference Architecture & Feature Extraction

Through Playwright automated headless inspection, the reference application provides a mobile-first directory experience for a furniture showroom with the following core modules:

1. **Showroom Header & Profile Card**:
   - Exterior night photography banner of the showroom building.
   - Circular brand badge overlay.
   - Direct phone consultation link and verified Google rating pill (`★ 4.9 (20) ↗`).
2. **4 Core Showcase Tabs**:
   - `Products`: 1-tap category cards with design counts (`SOFA 33 products`, `COT MODEL 43 products`) leading to 2-column mobile product cards.
   - `Gallery`: Photo and video grid showcasing showroom displays, timber logs, raw grain, and custom finished doors.
   - `Reviews`: Customer testimonials and star breakdown.
   - `More`: Location, directions, and showroom details.
3. **Product Interaction & WhatsApp Handoff**:
   - 2-column product cards with quick action button (`ADD` / quantity stepper).
   - "Collection" bottom drawer compiling selected pieces and generating a pre-filled WhatsApp message.

---

## 2. Competitive Analysis: Where INHOME FURNITURE Must Be Superior

| Feature Dimension | Reference Platform (*Nine Finds*) | INHOME FURNITURE (*Superior Standard*) |
| :--- | :--- | :--- |
| **Visual Atmosphere & Brand Feel** | Generic multi-tenant SaaS directory with harsh purple/blue buttons and grey containers. | **Bespoke Luxury Atelier**: Warm Teak Timber (`#8B5A2B`), tactile warm stone canvas (`#FAF8F5`), crisp white cards with refined borders, and champagne gold accents. |
| **WhatsApp Enquiry Flow** | Confusing multi-button flow (*"Order via Nine"*, *"Order via WhatsApp"*, disclaimers). | **Zero-Friction 1-Tap Consultation**: Instant WhatsApp link generation with rich Open Graph card unfurl (product image + name) directly in the owner's chat. |
| **Trust & Social Proof** | In-app submission form that feels like an app store review. | **Verified Kangeyam Credibility**: Real Google ⭐ 4.8 badge linked directly to the TCL Tower Chennimalai Road Google Maps listing with live interactive directions. |
| **Typography & Ergonomics** | System fallback fonts with cramped mobile line heights. | **Editorial Grade**: *Plus Jakarta Sans* headings, generous 8px spatial rhythm, and strict $\ge 44\times 44\text{px}$ touch targets. |
| **Product Customization** | Generic e-commerce `ADD` to cart style steppers. | **Custom-Crafted Focus**: Dual WhatsApp CTAs (*"Enquire on WhatsApp"* & *"Customise Size or Wood"*), transparent custom-order roadmap, and zero workshop ownership claims. |

---

## 3. Implementation Rules for Superiority

1. **Keep it Simple & Friction-Free**: Never make the customer jump through carts or confusing multi-step checkouts. The priority is rapid visual inspiration and direct WhatsApp conversation.
2. **Visual Richness in Gallery (Milestone 8)**: Emulate the reference's tactile showcasing of raw materials, wood grains, showroom displays, and finished custom work, but elevate it with high-resolution lightbox zoom and WhatsApp consultation.
3. **Mobile-First Touch Ergonomics**: Maintain $\ge 44\text{px}$ touch targets and persistent bottom quick actions (`Call`, `WhatsApp`, `Directions`).
