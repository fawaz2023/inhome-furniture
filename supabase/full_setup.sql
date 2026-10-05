-- ============================================================================
-- INHOME FURNITURE â€” SUPABASE DATABASE SCHEMA MIGRATION
-- ============================================================================
-- Single Source of Truth for INHOME FURNITURE Database Engine: PostgreSQL 15+
-- Storage Bucket: catalogue-images (Public read, authenticated upload)

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    visible BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    slug TEXT NOT NULL,
    description TEXT,
    images TEXT[] NOT NULL DEFAULT '{}',
    image_url TEXT,                  -- Display version (long edge <= 1600px, WebP)
    og_image_url TEXT,               -- WhatsApp OG preview version (1200x630, WebP, strictly < 300 KB)
    keywords TEXT[] DEFAULT '{}',    -- Optional search keywords for instant client-side search (M4.5)
    customisation_options JSONB NOT NULL DEFAULT '{
        "wood_options": ["Teak Wood", "Country Wood", "Rosewood Finish"],
        "finish_options": ["Natural Matte", "Teak Brown Gloss", "Dark Walnut"],
        "size_notes": "Custom dimensions tailored to your room specifications",
        "fabric_notes": "Premium fabric varieties available upon request"
    }'::jsonb,
    product_type TEXT NOT NULL DEFAULT 'made_to_order' 
        CHECK (product_type IN ('made_to_order', 'ready_stock')),
    featured BOOLEAN NOT NULL DEFAULT false,
    visible BOOLEAN NOT NULL DEFAULT true,
    sort_order INT NOT NULL DEFAULT 0,
    deleted_at TIMESTAMPTZ DEFAULT NULL,  -- Soft delete support
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_category_product_slug UNIQUE (category_id, slug)
);

-- 3. GALLERY ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.gallery_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    image_url TEXT NOT NULL,
    caption TEXT,
    item_type TEXT NOT NULL DEFAULT 'finished_work' 
        CHECK (item_type IN ('showroom', 'finished_work', 'new_arrival')),
    sort_order INT NOT NULL DEFAULT 0,
    visible BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. SHOP SETTINGS TABLE (Singleton key-value store)
CREATE TABLE IF NOT EXISTS public.settings (
    key TEXT PRIMARY KEY DEFAULT 'general',
    shop_name TEXT NOT NULL DEFAULT 'INHOME FURNITURE',
    phone TEXT NOT NULL DEFAULT '+919999999999',           -- Placeholder: replace with confirmed shop number
    whatsapp_number TEXT NOT NULL DEFAULT '919999999999',  -- Sanitized 91 + 10 digits
    address TEXT NOT NULL DEFAULT 'TCL Tower, 3/43A, Chennimalai Rd, Kangeyam, Tamil Nadu 638701',
    google_maps_url TEXT NOT NULL DEFAULT 'https://maps.google.com/?q=INHOME+FURNITURE+Kangeyam',
    google_rating NUMERIC(2, 1) NOT NULL DEFAULT 4.8,
    google_reviews_count INT NOT NULL DEFAULT 23,
    opening_hours VARCHAR(100) NOT NULL DEFAULT 'Mon - Sat: 9:00 AM - 6:00 PM',
    after_hours_note VARCHAR(255) DEFAULT 'We reply during shop hours (until 6:00 PM)',
    default_enquiry_message TEXT NOT NULL DEFAULT 'Hi INHOME Furniture, I like this design. Please share custom quote details.',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. PAGE VIEWS TABLE (Privacy-friendly link engagement counter)
CREATE TABLE IF NOT EXISTS public.pageviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    path TEXT NOT NULL,
    referrer TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pageviews_path ON public.pageviews (path);
CREATE INDEX IF NOT EXISTS idx_pageviews_created_at ON public.pageviews (created_at);

-- ============================================================================
-- AUTOMATIC UPDATED_AT TIMESTAMP TRIGGER
-- ============================================================================

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_categories_updated_at ON public.categories;
CREATE TRIGGER trg_categories_updated_at
BEFORE UPDATE ON public.categories
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_products_updated_at ON public.products;
CREATE TRIGGER trg_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_settings_updated_at ON public.settings;
CREATE TRIGGER trg_settings_updated_at
BEFORE UPDATE ON public.settings
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================================
-- PERFORMANCE & LOOKUP INDEXES
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories (slug);
CREATE INDEX IF NOT EXISTS idx_categories_visible_order ON public.categories (visible, sort_order);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON public.products (category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products (slug);
CREATE INDEX IF NOT EXISTS idx_products_visible_order ON public.products (visible, sort_order);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products (featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_products_keywords ON public.products USING GIN (keywords);
CREATE INDEX IF NOT EXISTS idx_products_deleted_at ON public.products (deleted_at);
CREATE INDEX IF NOT EXISTS idx_gallery_type_visible ON public.gallery_items (item_type, visible, sort_order);

-- ============================================================================
-- ROW-LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pageviews ENABLE ROW LEVEL SECURITY;

-- 1. Anonymous Public Read & Insert Policies
DROP POLICY IF EXISTS "Allow public read for visible categories" ON public.categories;
CREATE POLICY "Allow public read for visible categories" 
ON public.categories FOR SELECT 
USING (visible = true);

DROP POLICY IF EXISTS "Allow public read for visible products" ON public.products;
CREATE POLICY "Allow public read for visible products" 
ON public.products FOR SELECT 
USING (visible = true AND deleted_at IS NULL);

DROP POLICY IF EXISTS "Allow public read for visible gallery" ON public.gallery_items;
CREATE POLICY "Allow public read for visible gallery" 
ON public.gallery_items FOR SELECT 
USING (visible = true);

DROP POLICY IF EXISTS "Allow public read for settings" ON public.settings;
CREATE POLICY "Allow public read for settings" 
ON public.settings FOR SELECT 
USING (true);

-- Public insert policy for anonymous link visitor pageview logging (no PII)
DROP POLICY IF EXISTS "Allow public insert for pageviews" ON public.pageviews;
CREATE POLICY "Allow public insert for pageviews" 
ON public.pageviews FOR INSERT 
WITH CHECK (true);

-- 2. Authenticated Admin Full CRUD Policies
DROP POLICY IF EXISTS "Allow authenticated full access to categories" ON public.categories;
CREATE POLICY "Allow authenticated full access to categories" 
ON public.categories FOR ALL 
TO authenticated 
USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated full access to products" ON public.products;
CREATE POLICY "Allow authenticated full access to products" 
ON public.products FOR ALL 
TO authenticated 
USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated full access to gallery" ON public.gallery_items;
CREATE POLICY "Allow authenticated full access to gallery" 
ON public.gallery_items FOR ALL 
TO authenticated 
USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated full access to settings" ON public.settings;
CREATE POLICY "Allow authenticated full access to settings" 
ON public.settings FOR ALL 
TO authenticated 
USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated full access to pageviews" ON public.pageviews;
CREATE POLICY "Allow authenticated full access to pageviews" 
ON public.pageviews FOR ALL 
TO authenticated 
USING (true) WITH CHECK (true);

-- ============================================================================
-- STORAGE BUCKET CONFIGURATION (catalogue-images)
-- ============================================================================
-- Execute in Supabase SQL Editor if storage bucket creation is desired via SQL:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('catalogue-images', 'catalogue-images', true) ON CONFLICT (id) DO NOTHING;
-- CREATE POLICY "Public read for catalogue-images" ON storage.objects FOR SELECT USING (bucket_id = 'catalogue-images');
-- CREATE POLICY "Authenticated upload for catalogue-images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'catalogue-images');
-- CREATE POLICY "Authenticated update/delete for catalogue-images" ON storage.objects FOR ALL TO authenticated USING (bucket_id = 'catalogue-images');
-- ============================================================================
-- INHOME FURNITURE â€” SEED DATA
-- ============================================================================
-- 17 Confirmed Categories + Sample Products + Shop Settings

-- 1. SHOP SETTINGS
INSERT INTO public.settings (
    key, 
    shop_name, 
    phone, 
    whatsapp_number, 
    address, 
    google_maps_url, 
    google_rating, 
    google_reviews_count, 
    opening_hours, 
    after_hours_note, 
    default_enquiry_message
)
VALUES (
    'general',
    'INHOME FURNITURE',
    '+919999999999',
    '919999999999',
    'TCL Tower, 3/43A, Chennimalai Rd, Kangeyam, Tamil Nadu 638701',
    'https://maps.google.com/?q=INHOME+FURNITURE+Kangeyam',
    4.8,
    23,
    'Mon - Sat: 9:00 AM - 6:00 PM',
    'We reply during shop hours (until 6:00 PM)',
    'Hi INHOME Furniture, I like this design. Please share custom quote details.'
)
ON CONFLICT (key) DO UPDATE SET
    opening_hours = EXCLUDED.opening_hours,
    after_hours_note = EXCLUDED.after_hours_note;

-- 2. 17 CONFIRMED CATEGORIES
INSERT INTO public.categories (id, name, slug, description, image_url, sort_order, visible) VALUES
('a0000000-0000-0000-0000-000000000001', 'Sofas', 'sofas', 'Custom handcrafted 3-seater, L-shaped sectional, and chesterfield sofas.', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80', 1, true),
('a0000000-0000-0000-0000-000000000002', 'Beds', 'beds', 'Solid teak and upholstered king, queen, and hydraulic storage beds.', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80', 2, true),
('a0000000-0000-0000-0000-000000000003', 'Cots', 'cots', 'Durable solid wood single and double cots built for lifelong comfort.', 'https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=800&q=80', 3, true),
('a0000000-0000-0000-0000-000000000004', 'Dining Tables', 'dining-tables', '4-seater, 6-seater, and 8-seater solid wood dining sets with ergonomic chairs.', 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80', 4, true),
('a0000000-0000-0000-0000-000000000005', 'Dressing Tables', 'dressing-tables', 'Contemporary vanity mirrors and storage dressers in rich walnut and teak.', 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80', 5, true),
('a0000000-0000-0000-0000-000000000006', 'Wardrobes', 'wardrobes', 'Modular sliding and hinged wardrobes customized to your bedroom dimensions.', 'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=800&q=80', 6, true),
('a0000000-0000-0000-0000-000000000007', 'TV Units', 'tv-units', 'Wall-mounted and floating entertainment consoles with integrated wire management.', 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80', 7, true),
('a0000000-0000-0000-0000-000000000008', 'Study Tables', 'study-tables', 'Ergonomic work-from-home desks and student study tables with utility drawers.', 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80', 8, true),
('a0000000-0000-0000-0000-000000000009', 'Coffee Tables', 'coffee-tables', 'Statement centre tables and nesting tables in live-edge teak, marble, and metal.', 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80', 9, true),
('a0000000-0000-0000-0000-000000000010', 'Shoe Racks', 'shoe-racks', 'Ventilated wooden shoe cabinets with seating cushions and tiered shelves.', 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80', 10, true),
('a0000000-0000-0000-0000-000000000011', 'Pooja Units', 'pooja-units', 'Traditionally carved teak and contemporary CNC-lattice prayer mandirs.', 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80', 11, true),
('a0000000-0000-0000-0000-000000000012', 'Office Chairs', 'office-chairs', 'High-back mesh and bonded leather executive ergonomic chairs.', 'https://images.unsplash.com/photo-1580481077195-c3a82474919e?auto=format&fit=crop&w=800&q=80', 12, true),
('a0000000-0000-0000-0000-000000000013', 'Mattresses', 'mattresses', 'Orthopaedic memory foam, natural coir, and pocket-spring premium mattresses.', 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80', 13, true),
('a0000000-0000-0000-0000-000000000014', 'Rocking Chairs', 'rocking-chairs', 'Classic contoured teak rocking and easy chairs for timeless relaxation.', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80', 14, true),
('a0000000-0000-0000-0000-000000000015', 'Recliners', 'recliners', 'Motorized and manual plush single-seater reclining lounge chairs.', 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80', 15, true),
('a0000000-0000-0000-0000-000000000016', 'Bar Stools', 'bar-stools', 'Swivel and fixed solid wood kitchen island breakfast counter stools.', 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80', 16, true),
('a0000000-0000-0000-0000-000000000017', 'Custom Furniture', 'custom-furniture', 'Bespoke designs built to exact architectural blueprints and client reference photos.', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80', 17, true)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    image_url = EXCLUDED.image_url,
    sort_order = EXCLUDED.sort_order;

-- 3. SAMPLE PRODUCTS (With keywords & dual-image URLs for immediate demonstration)
INSERT INTO public.products (
    id, category_id, name, slug, description, images, image_url, og_image_url, keywords, 
    product_type, featured, visible, sort_order
) VALUES
(
    'b0000000-0000-0000-0000-000000000001',
    'a0000000-0000-0000-0000-000000000001',
    'Royal Chesterfield 3-Seater Sofa',
    'royal-chesterfield-3-seater-sofa',
    'Classic deep button-tufted backrest with rolled arms and solid teak wood legs. Available in premium velvet or breathable cotton-linen.',
    ARRAY['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80', 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80'],
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    ARRAY['sofa', 'chesterfield', 'living room', 'teak', '3 seater'],
    'made_to_order',
    true,
    true,
    1
),
(
    'b0000000-0000-0000-0000-000000000002',
    'a0000000-0000-0000-0000-000000000001',
    'Scandinavian Minimalist L-Sectional',
    'scandinavian-minimalist-l-sectional',
    'Clean-lined corner sectional with high-density foam cushioning, kiln-dried timber framing, and stain-resistant fabric.',
    ARRAY['https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80'],
    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80',
    ARRAY['sofa', 'sectional', 'l-shape', 'corner sofa', 'minimalist'],
    'ready_stock',
    true,
    true,
    2
),
(
    'b0000000-0000-0000-0000-000000000003',
    'a0000000-0000-0000-0000-000000000004',
    'Solid Teak 6-Seater Dining Suite',
    'solid-teak-6-seater-dining-suite',
    'Generous 6x3 ft solid teak dining tabletop paired with 6 ergonomically contoured wooden dining chairs.',
    ARRAY['https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80'],
    'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80',
    ARRAY['dining', 'dining table', 'teak', '6 seater', 'chairs'],
    'made_to_order',
    true,
    true,
    1
),
(
    'b0000000-0000-0000-0000-000000000004',
    'a0000000-0000-0000-0000-000000000002',
    'Grand Teak King Bed with Storage',
    'grand-teak-king-bed-with-storage',
    'Solid teak wood king-size bed with hydraulic lift-up storage compartments and padded acoustic fabric headboard.',
    ARRAY['https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'],
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    ARRAY['bed', 'king bed', 'cot', 'storage', 'teak'],
    'made_to_order',
    true,
    true,
    1
),
(
    'b0000000-0000-0000-0000-000000000005',
    'a0000000-0000-0000-0000-000000000014',
    'Heritage Carved Teak Rocking Chair',
    'heritage-carved-teak-rocking-chair',
    'Traditional south Indian curved rocker with smooth ergonomic slats, reinforced joint geometry, and warm teak polish.',
    ARRAY['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80'],
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    ARRAY['chair', 'rocking chair', 'easy chair', 'teak', 'relax'],
    'ready_stock',
    true,
    true,
    1
)
ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    keywords = EXCLUDED.keywords,
    image_url = EXCLUDED.image_url,
    og_image_url = EXCLUDED.og_image_url;
