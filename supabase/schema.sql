-- ============================================================================
-- INHOME FURNITURE — SUPABASE DATABASE SCHEMA MIGRATION
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
