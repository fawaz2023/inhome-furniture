-- ============================================================================
-- INHOME FURNITURE — SEED DATA
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
