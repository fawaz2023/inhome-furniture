import { Category, Product, GalleryItem, Settings } from '@/types/database';

export const MOCK_CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Sofas',
    slug: 'sofas',
    description: 'Custom handcrafted 3-seater, L-shaped sectional, and chesterfield sofas.',
    image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    sort_order: 1,
    visible: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    product_count: 3
  },
  {
    id: 'cat-2',
    name: 'Beds',
    slug: 'beds',
    description: 'Solid teak and upholstered king, queen, and hydraulic storage beds.',
    image_url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
    sort_order: 2,
    visible: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    product_count: 2
  },
  {
    id: 'cat-3',
    name: 'Cots',
    slug: 'cots',
    description: 'Durable solid wood single and double cots built for lifelong comfort.',
    image_url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
    sort_order: 3,
    visible: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    product_count: 2
  },
  {
    id: 'cat-4',
    name: 'Dining Tables',
    slug: 'dining-tables',
    description: '4-seater, 6-seater, and 8-seater solid wood dining sets with ergonomic chairs.',
    image_url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80',
    sort_order: 4,
    visible: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    product_count: 2
  },
  {
    id: 'cat-5',
    name: 'Dressing Tables',
    slug: 'dressing-tables',
    description: 'Contemporary vanity mirrors and storage dressers in rich walnut and teak.',
    image_url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
    sort_order: 5,
    visible: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    product_count: 2
  },
  {
    id: 'cat-6',
    name: 'Wardrobes',
    slug: 'wardrobes',
    description: 'Modular sliding and hinged wardrobes customized to your bedroom dimensions.',
    image_url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
    sort_order: 6,
    visible: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    product_count: 2
  },
  {
    id: 'cat-7',
    name: 'TV Units',
    slug: 'tv-units',
    description: 'Wall-mounted and floating entertainment consoles with integrated wire management.',
    image_url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    sort_order: 7,
    visible: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    product_count: 2
  },
  {
    id: 'cat-8',
    name: 'Study Tables',
    slug: 'study-tables',
    description: 'Ergonomic work-from-home desks and student study tables with utility drawers.',
    image_url: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
    sort_order: 8,
    visible: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    product_count: 2
  },
  {
    id: 'cat-9',
    name: 'Coffee Tables',
    slug: 'coffee-tables',
    description: 'Statement centre tables and nesting tables in live-edge teak, marble, and metal.',
    image_url: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80',
    sort_order: 9,
    visible: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    product_count: 2
  },
  {
    id: 'cat-10',
    name: 'Shoe Racks',
    slug: 'shoe-racks',
    description: 'Ventilated wooden shoe cabinets with seating cushions and tiered shelves.',
    image_url: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80',
    sort_order: 10,
    visible: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    product_count: 2
  },
  {
    id: 'cat-11',
    name: 'Pooja Units',
    slug: 'pooja-units',
    description: 'Traditionally carved teak and contemporary CNC-lattice prayer mandirs.',
    image_url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    sort_order: 11,
    visible: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    product_count: 2
  },
  {
    id: 'cat-12',
    name: 'Office Chairs',
    slug: 'office-chairs',
    description: 'High-back mesh and bonded leather executive ergonomic chairs.',
    image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    sort_order: 12,
    visible: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    product_count: 2
  },
  {
    id: 'cat-13',
    name: 'Mattresses',
    slug: 'mattresses',
    description: 'Orthopaedic memory foam, natural coir, and pocket-spring premium mattresses.',
    image_url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
    sort_order: 13,
    visible: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    product_count: 2
  },
  {
    id: 'cat-14',
    name: 'Rocking Chairs',
    slug: 'rocking-chairs',
    description: 'Classic contoured teak rocking and easy chairs for timeless relaxation.',
    image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    sort_order: 14,
    visible: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    product_count: 2
  },
  {
    id: 'cat-15',
    name: 'Recliners',
    slug: 'recliners',
    description: 'Motorized and manual plush single-seater reclining lounge chairs.',
    image_url: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80',
    sort_order: 15,
    visible: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    product_count: 2
  },
  {
    id: 'cat-16',
    name: 'Bar Stools',
    slug: 'bar-stools',
    description: 'Swivel and fixed solid wood kitchen island breakfast counter stools.',
    image_url: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80',
    sort_order: 16,
    visible: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    product_count: 2
  },
  {
    id: 'cat-17',
    name: 'Custom Furniture',
    slug: 'custom-furniture',
    description: 'Bespoke designs built to exact architectural blueprints and client reference photos.',
    image_url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    sort_order: 17,
    visible: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    product_count: 2
  }
];

export const MOCK_PRODUCTS: Product[] = [
  // Sofas
  {
    id: 'prod-sofa-1',
    category_id: 'cat-1',
    name: 'Royal Chesterfield 3-Seater Sofa',
    slug: 'royal-chesterfield-3-seater-sofa',
    description: 'Classic deep button-tufted backrest with rolled arms and solid teak wood legs. Available in premium velvet or breathable cotton-linen.',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80'
    ],
    image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    og_image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    keywords: ['sofa', 'chesterfield', 'living room', 'teak', '3 seater'],
    customisation_options: {
      wood_options: ['Teak Wood', 'Country Wood', 'Rosewood'],
      finish_options: ['Dark Walnut', 'Natural Teak', 'Honey Matte'],
      size_notes: 'Standard 84" W x 35" D x 32" H or custom dimensions',
      fabric_notes: 'Available in 40+ fabric swatches in our Kangeyam showroom'
    },
    product_type: 'made_to_order',
    featured: true,
    visible: true,
    sort_order: 1,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z'
  },
  {
    id: 'prod-sofa-2',
    category_id: 'cat-1',
    name: 'Modern L-Shaped Sectional Sofa',
    slug: 'modern-l-shaped-sectional-sofa',
    description: 'Spacious 5-seater corner sofa designed for family living. High-resilience foam cushions with stain-resistant fabric.',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80'
    ],
    image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    og_image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    keywords: ['sofa', 'sectional', 'l-shape', 'corner sofa', 'living room'],
    customisation_options: {
      wood_options: ['Teak Wood', 'Country Wood'],
      finish_options: ['Natural Matte', 'Espresso'],
      size_notes: 'Configurable left-hand or right-hand lounger orientation',
      fabric_notes: 'Jute blend, Boucle, or Water-repellent velvet'
    },
    product_type: 'made_to_order',
    featured: true,
    visible: true,
    sort_order: 2,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z'
  },
  {
    id: 'prod-sofa-3',
    category_id: 'cat-1',
    name: 'Minimalist 2-Seater Teak Accent Sofa',
    slug: 'minimalist-2-seater-teak-accent-sofa',
    description: 'Clean Scandinavian lines with an exposed solid teak frame and removable upholstered cushions.',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80'
    ],
    image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    og_image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    keywords: ['sofa', 'accent sofa', 'teak', '2 seater', 'minimalist'],
    customisation_options: {
      wood_options: ['First-Quality Teak'],
      finish_options: ['Natural Raw Matte', 'Teak Oil'],
      size_notes: '58" W x 32" D x 30" H',
      fabric_notes: 'Neutral beige, Charcoal grey, Sage green'
    },
    product_type: 'ready_stock',
    featured: false,
    visible: true,
    sort_order: 3,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z'
  },

  // Beds
  {
    id: 'prod-bed-1',
    category_id: 'cat-2',
    name: 'Teak Heritage King Size Bed',
    slug: 'teak-heritage-king-size-bed',
    description: 'Substantial solid teak platform bed with subtle panel fluting on headboard and footboard. Engineered for silent sturdiness.',
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'
    ],
    customisation_options: {
      wood_options: ['Solid Teak', 'Country Wood', 'Rosewood'],
      finish_options: ['Natural Gloss', 'Rich Teak Matte', 'Dark Walnut'],
      size_notes: 'King (72" x 78"), Queen (60" x 78"), or Custom Mattress size',
      fabric_notes: 'Optional cushioned upholstered headboard panel'
    },
    product_type: 'made_to_order',
    featured: true,
    visible: true,
    sort_order: 1,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z'
  },
  {
    id: 'prod-bed-2',
    category_id: 'cat-2',
    name: 'Hydraulic Storage Queen Bed',
    slug: 'hydraulic-storage-queen-bed',
    description: 'Effortless German gas-lift hydraulic storage bed with padded wingback headboard for reading in comfort.',
    images: [
      'https://images.unsplash.com/photo-1540518614846-7ede433c4550?auto=format&fit=crop&w=1200&q=80'
    ],
    customisation_options: {
      wood_options: ['Hardwood Plywood + Teak Finish', 'Solid Teak Frame'],
      finish_options: ['Walnut Matte', 'Warm Oak'],
      size_notes: 'Queen 60" x 78" or King 72" x 78"'
    },
    product_type: 'made_to_order',
    featured: false,
    visible: true,
    sort_order: 2,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z'
  },

  // Dining Tables
  {
    id: 'prod-dining-1',
    category_id: 'cat-4',
    name: 'Grand 6-Seater Solid Teak Dining Set',
    slug: 'grand-6-seater-solid-teak-dining-set',
    description: 'Thick solid teak tabletop with chamfered edges and 6 ergonomic high-back chairs with cushioned seating.',
    images: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80'
    ],
    customisation_options: {
      wood_options: ['Pure Teak', 'Country Wood', 'Rosewood'],
      finish_options: ['Warm Teak Satin', 'Natural Oil Matte'],
      size_notes: '6 ft x 3 ft, or custom 8-seater (8 ft x 3.5 ft)'
    },
    product_type: 'made_to_order',
    featured: true,
    visible: true,
    sort_order: 1,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z'
  },
  {
    id: 'prod-dining-2',
    category_id: 'cat-4',
    name: 'Compact 4-Seater Round Dining Table',
    slug: 'compact-4-seater-round-dining-table',
    description: 'Space-efficient 42-inch circular dining table with central fluted pedestal column.',
    images: [
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80'
    ],
    customisation_options: {
      wood_options: ['Teak Wood', 'Country Wood'],
      finish_options: ['Natural Matte', 'Dark Walnut'],
      size_notes: '36", 42", or 48" Diameter'
    },
    product_type: 'ready_stock',
    featured: false,
    visible: true,
    sort_order: 2,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z'
  },

  // TV Units
  {
    id: 'prod-tv-1',
    category_id: 'cat-7',
    name: 'Floating Slat TV Entertainment Console',
    slug: 'floating-slat-tv-entertainment-console',
    description: 'Modern wall-hung entertainment unit featuring vertical fluted acoustic slats and soft-close push drawers.',
    images: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80'
    ],
    customisation_options: {
      wood_options: ['Teak Wood Veneer', 'Solid Teak Accents'],
      finish_options: ['Smoked Oak', 'Natural Teak'],
      size_notes: '6 ft, 7 ft, or 8 ft length to suit your TV size'
    },
    product_type: 'made_to_order',
    featured: true,
    visible: true,
    sort_order: 1,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z'
  },

  // Rocking Chairs
  {
    id: 'prod-rocking-1',
    category_id: 'cat-14',
    name: 'Traditional Kangeyam Teak Rocking Chair',
    slug: 'traditional-kangeyam-teak-rocking-chair',
    description: 'Smooth, balanced rocking motion with contoured lumbar slats and sculpted armrests crafted from aged teak.',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80'
    ],
    customisation_options: {
      wood_options: ['Pure Teak Wood', 'Rosewood'],
      finish_options: ['High Gloss Teak', 'Satin Smooth'],
      size_notes: 'Ergonomic adult proportion with balanced curve runners'
    },
    product_type: 'ready_stock',
    featured: true,
    visible: true,
    sort_order: 1,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z'
  },

  // Bar Stools
  {
    id: 'prod-bar-1',
    category_id: 'cat-16',
    name: 'Sculpted Saddle Teak Bar Stool',
    slug: 'sculpted-saddle-teak-bar-stool',
    description: 'Counter-height wooden stool featuring a hand-carved tractor saddle seat and brass-capped footrest bar.',
    images: [
      'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80'
    ],
    customisation_options: {
      wood_options: ['Solid Teak Wood'],
      finish_options: ['Natural Teak Matte', 'Blackened Teak'],
      size_notes: 'Available in 26" counter height or 30" bar height'
    },
    product_type: 'ready_stock',
    featured: false,
    visible: true,
    sort_order: 1,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z'
  },

  // Custom Furniture
  {
    id: 'prod-custom-1',
    category_id: 'cat-17',
    name: 'Bespoke Architectural Teak Credenza',
    slug: 'bespoke-architectural-teak-credenza',
    description: 'Custom sideboard crafted to client architectural elevations with cane rattan door inlays and brass hardware.',
    images: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80'
    ],
    customisation_options: {
      wood_options: ['Teak + Cane Mesh', 'Country Wood', 'Rosewood Inlays'],
      finish_options: ['Bleached Teak', 'Dark Walnut Satin', 'Natural Teak'],
      size_notes: 'Fully custom made to your room dimensions and drawing'
    },
    product_type: 'made_to_order',
    featured: true,
    visible: true,
    sort_order: 1,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z'
  },

  // Cots (cat-3)
  {
    id: 'prod-cot-1',
    category_id: 'cat-3',
    name: 'Solid Teak King Size Box Cot',
    slug: 'solid-teak-king-size-box-cot',
    description: 'Sturdy solid teak wood platform bed cot with integrated storage box and ergonomic headboard panels.',
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef5?auto=format&fit=crop&w=1200&q=80'
    ],
    image_url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    og_image_url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    keywords: ['cot', 'teak cot', 'king size cot', 'storage cot', 'solid wood bed'],
    customisation_options: {
      wood_options: ['Pure Teak Wood', 'Country Wood'],
      finish_options: ['Natural Honey Matte', 'Deep Walnut', 'Rosewood Tint'],
      size_notes: 'King (78" x 72") or Queen (78" x 60") with custom box depth'
    },
    product_type: 'made_to_order',
    featured: true,
    visible: true,
    sort_order: 1,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z'
  },
  {
    id: 'prod-cot-2',
    category_id: 'cat-3',
    name: 'Country Wood Queen Single-Lift Storage Cot',
    slug: 'country-wood-queen-single-lift-storage-cot',
    description: 'High-durability country wood cot built for everyday comfort with smooth hydraulic lift underbed storage.',
    images: [
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef5?auto=format&fit=crop&w=1200&q=80'
    ],
    image_url: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef5?auto=format&fit=crop&w=1200&q=80',
    og_image_url: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef5?auto=format&fit=crop&w=1200&q=80',
    keywords: ['cot', 'queen cot', 'country wood', 'hydraulic storage'],
    customisation_options: {
      wood_options: ['Country Wood', 'Teak Wood Accents'],
      finish_options: ['Dark Walnut', 'Natural Semi-Gloss'],
      size_notes: 'Standard Queen 75" x 60" or customized single/double dimensions'
    },
    product_type: 'ready_stock',
    featured: false,
    visible: true,
    sort_order: 2,
    created_at: '2026-01-02T00:00:00Z',
    updated_at: '2026-01-02T00:00:00Z'
  },

  // Dressing Tables (cat-5)
  {
    id: 'prod-dressing-1',
    category_id: 'cat-5',
    name: 'Contemporary Teak Vanity with Full-Length Mirror',
    slug: 'contemporary-teak-vanity-full-length-mirror',
    description: 'Architectural teak dressing unit with concealed LED perimeter channel, slide-out jewelry drawer, and cushioned stool.',
    images: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80'
    ],
    image_url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80',
    og_image_url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80',
    keywords: ['dressing table', 'vanity', 'mirror', 'teak dresser', 'bedroom furniture'],
    customisation_options: {
      wood_options: ['Solid Teak Wood', 'Country Wood'],
      finish_options: ['Natural Matte', 'Warm Teak', 'Dark Walnut'],
      size_notes: '36" W x 18" D x 72" H or built to your wall dimensions'
    },
    product_type: 'made_to_order',
    featured: true,
    visible: true,
    sort_order: 1,
    created_at: '2026-01-02T00:00:00Z',
    updated_at: '2026-01-02T00:00:00Z'
  },
  {
    id: 'prod-dressing-2',
    category_id: 'cat-5',
    name: 'Nordic 3-Drawer Compact Dresser with Stool',
    slug: 'nordic-3-drawer-compact-dresser-stool',
    description: 'Minimalist dressing console designed for modern apartments with fluted drawer fronts and brass pull handles.',
    images: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80'
    ],
    image_url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    og_image_url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    keywords: ['compact dresser', 'dressing table', 'minimalist', 'fluted wood'],
    customisation_options: {
      wood_options: ['Teak Wood', 'Country Wood'],
      finish_options: ['Light Teak', 'Chestnut Satin'],
      size_notes: '30" W x 16" D x 66" H'
    },
    product_type: 'ready_stock',
    featured: false,
    visible: true,
    sort_order: 2,
    created_at: '2026-01-03T00:00:00Z',
    updated_at: '2026-01-03T00:00:00Z'
  },

  // Wardrobes (cat-6)
  {
    id: 'prod-wardrobe-1',
    category_id: 'cat-6',
    name: '3-Door Solid Teak Master Wardrobe with Lofts',
    slug: '3-door-solid-teak-master-wardrobe-lofts',
    description: 'Spacious triple-door teak wardrobe with top storage lofts, internal drawer lockbox, and full-length dressing mirror.',
    images: [
      'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=80'
    ],
    image_url: 'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=80',
    og_image_url: 'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=80',
    keywords: ['wardrobe', 'almirah', 'teak wardrobe', '3 door wardrobe', 'lofts'],
    customisation_options: {
      wood_options: ['Pure Teak Wood', 'Country Wood Framework + Teak Doors'],
      finish_options: ['Gloss Teak', 'Satin Walnut', 'Natural Matte'],
      size_notes: 'Standard 6 ft W x 2 ft D x 7 ft H + 2 ft loft, or bespoke room height'
    },
    product_type: 'made_to_order',
    featured: true,
    visible: true,
    sort_order: 1,
    created_at: '2026-01-03T00:00:00Z',
    updated_at: '2026-01-03T00:00:00Z'
  },
  {
    id: 'prod-wardrobe-2',
    category_id: 'cat-6',
    name: 'Modern Sliding Door Teak & Cane Almirah',
    slug: 'modern-sliding-door-teak-cane-almirah',
    description: 'Space-saving sliding double-door wardrobe with breathable natural cane rattan inlays and soft-close German tracks.',
    images: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80'
    ],
    image_url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80',
    og_image_url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80',
    keywords: ['sliding wardrobe', 'cane wardrobe', 'almirah', 'teak almirah'],
    customisation_options: {
      wood_options: ['Teak Wood + Cane Mesh', 'Country Wood'],
      finish_options: ['Bleached Teak', 'Rich Honey'],
      size_notes: '5 ft W x 2 ft D x 7 ft H'
    },
    product_type: 'ready_stock',
    featured: false,
    visible: true,
    sort_order: 2,
    created_at: '2026-01-04T00:00:00Z',
    updated_at: '2026-01-04T00:00:00Z'
  },

  // TV Units (cat-7, second item)
  {
    id: 'prod-tv-2',
    category_id: 'cat-7',
    name: 'Minimalist Low-Profile Teak Media Console',
    slug: 'minimalist-low-profile-teak-media-console',
    description: 'Floor-standing solid teak entertainment unit with fluted tambour doors, soundbar cubby, and brushed bronze tapered legs.',
    images: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80'
    ],
    image_url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80',
    og_image_url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80',
    keywords: ['tv unit', 'media console', 'low profile', 'teak credenza', 'living room'],
    customisation_options: {
      wood_options: ['Solid Teak Wood', 'Country Wood'],
      finish_options: ['Natural Teak', 'Dark Walnut'],
      size_notes: '5 ft, 6 ft, or 7 ft length'
    },
    product_type: 'ready_stock',
    featured: false,
    visible: true,
    sort_order: 2,
    created_at: '2026-01-04T00:00:00Z',
    updated_at: '2026-01-04T00:00:00Z'
  },

  // Office Tables (cat-8)
  {
    id: 'prod-office-tab-1',
    category_id: 'cat-8',
    name: 'Executive Solid Teak Desk with Cable Organiser',
    slug: 'executive-solid-teak-desk-cable-organiser',
    description: 'Premium home office desk with concealed brass cable grommets, soft-close drawer pedestals, and chamfered timber edges.',
    images: [
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80'
    ],
    image_url: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80',
    og_image_url: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80',
    keywords: ['office table', 'executive desk', 'study desk', 'teak work desk'],
    customisation_options: {
      wood_options: ['Pure Teak Wood', 'Country Wood Base + Teak Top'],
      finish_options: ['Natural Matte Teak', 'Dark Walnut', 'Smoked Honey'],
      size_notes: '5 ft x 2.5 ft or 6 ft x 3 ft custom dimensions'
    },
    product_type: 'made_to_order',
    featured: true,
    visible: true,
    sort_order: 1,
    created_at: '2026-01-05T00:00:00Z',
    updated_at: '2026-01-05T00:00:00Z'
  },
  {
    id: 'prod-office-tab-2',
    category_id: 'cat-8',
    name: 'Compact Country Wood Study & Laptop Table',
    slug: 'compact-country-wood-study-laptop-table',
    description: 'Clean space-saving computer desk with dual drawers and elevated monitor shelf, ideal for home workstations.',
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80'
    ],
    image_url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80',
    og_image_url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80',
    keywords: ['study table', 'laptop desk', 'compact desk', 'work from home'],
    customisation_options: {
      wood_options: ['Country Wood', 'Teak Wood'],
      finish_options: ['Natural Teak Tint', 'Honey Satin'],
      size_notes: '42" W x 22" D x 30" H'
    },
    product_type: 'ready_stock',
    featured: false,
    visible: true,
    sort_order: 2,
    created_at: '2026-01-05T00:00:00Z',
    updated_at: '2026-01-05T00:00:00Z'
  },

  // Office Chairs (cat-9)
  {
    id: 'prod-office-chair-1',
    category_id: 'cat-9',
    name: 'Ergonomic Sculpted Teak Swivel Chair',
    slug: 'ergonomic-sculpted-teak-swivel-chair',
    description: 'Handcrafted solid teak office swivel chair with contoured ergonomic lumbar slats, tilt mechanism, and brass castors.',
    images: [
      'https://images.unsplash.com/photo-1580481077195-c3a82104e362?auto=format&fit=crop&w=1200&q=80'
    ],
    image_url: 'https://images.unsplash.com/photo-1580481077195-c3a82104e362?auto=format&fit=crop&w=1200&q=80',
    og_image_url: 'https://images.unsplash.com/photo-1580481077195-c3a82104e362?auto=format&fit=crop&w=1200&q=80',
    keywords: ['office chair', 'teak chair', 'swivel chair', 'desk chair', 'ergonomic'],
    customisation_options: {
      wood_options: ['Solid Teak Wood'],
      finish_options: ['Natural Teak Matte', 'Dark Walnut'],
      size_notes: 'Height-adjustable pneumatic swivel or fixed timber base'
    },
    product_type: 'made_to_order',
    featured: true,
    visible: true,
    sort_order: 1,
    created_at: '2026-01-06T00:00:00Z',
    updated_at: '2026-01-06T00:00:00Z'
  },
  {
    id: 'prod-office-chair-2',
    category_id: 'cat-9',
    name: 'High-Back Cane Backrest Executive Desk Chair',
    slug: 'high-back-cane-backrest-executive-desk-chair',
    description: 'Breathable natural cane backrest with aged teak arms and high-density linen padded cushion for all-day focus.',
    images: [
      'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80'
    ],
    image_url: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80',
    og_image_url: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80',
    keywords: ['cane office chair', 'high back chair', 'executive desk chair'],
    customisation_options: {
      wood_options: ['Teak Wood + Handwoven Cane', 'Rosewood Accents'],
      finish_options: ['Natural Satin', 'Dark Walnut'],
      size_notes: 'Standard executive ergonomic dimensions'
    },
    product_type: 'ready_stock',
    featured: false,
    visible: true,
    sort_order: 2,
    created_at: '2026-01-06T00:00:00Z',
    updated_at: '2026-01-06T00:00:00Z'
  },

  // Coffee Tables (cat-10)
  {
    id: 'prod-coffee-1',
    category_id: 'cat-10',
    name: 'Live Edge Teak Trunk Coffee Table',
    slug: 'live-edge-teak-trunk-coffee-table',
    description: 'Showpiece center table fashioned from a solid cross-cut teak slab preserving organic live edges and distinctive growth rings.',
    images: [
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80'
    ],
    image_url: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80',
    og_image_url: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80',
    keywords: ['coffee table', 'live edge', 'teak center table', 'solid wood table', 'living room'],
    customisation_options: {
      wood_options: ['Pure Teak Slab', 'Rosewood Trunk Slice'],
      finish_options: ['Natural Polyurethane Matte', 'Satin Wax'],
      size_notes: 'Approx 48" L x 24" W x 18" H (natural variance in organic edge)'
    },
    product_type: 'ready_stock',
    featured: true,
    visible: true,
    sort_order: 1,
    created_at: '2026-01-07T00:00:00Z',
    updated_at: '2026-01-07T00:00:00Z'
  },
  {
    id: 'prod-coffee-2',
    category_id: 'cat-10',
    name: 'Fluted Teak Drum Center Table',
    slug: 'fluted-teak-drum-center-table',
    description: 'Circular architectural coffee table wrapped in vertical solid teak dowels with inset tinted tempered glass or solid wood top.',
    images: [
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80'
    ],
    image_url: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80',
    og_image_url: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80',
    keywords: ['drum coffee table', 'fluted teak', 'center table', 'circular coffee table'],
    customisation_options: {
      wood_options: ['Solid Teak Wood', 'Country Wood'],
      finish_options: ['Smoked Oak', 'Bleached Teak', 'Dark Walnut'],
      size_notes: '32" or 36" Diameter x 16" Height'
    },
    product_type: 'made_to_order',
    featured: false,
    visible: true,
    sort_order: 2,
    created_at: '2026-01-07T00:00:00Z',
    updated_at: '2026-01-07T00:00:00Z'
  },

  // Book Shelves (cat-11)
  {
    id: 'prod-bookshelf-1',
    category_id: 'cat-11',
    name: '5-Tier Open Solid Teak Display Bookshelf',
    slug: '5-tier-open-solid-teak-display-bookshelf',
    description: 'Heavy-duty open shelving tower made from aged teak timbers, ideal for library collections, curios, and indoor greenery.',
    images: [
      'https://images.unsplash.com/photo-1594643442188-6622ec19a777?auto=format&fit=crop&w=1200&q=80'
    ],
    image_url: 'https://images.unsplash.com/photo-1594643442188-6622ec19a777?auto=format&fit=crop&w=1200&q=80',
    og_image_url: 'https://images.unsplash.com/photo-1594643442188-6622ec19a777?auto=format&fit=crop&w=1200&q=80',
    keywords: ['bookshelf', 'bookcase', 'teak shelf', '5 tier shelf', 'display unit'],
    customisation_options: {
      wood_options: ['Solid Teak Wood', 'Country Wood'],
      finish_options: ['Natural Matte', 'Warm Teak Satin', 'Dark Walnut'],
      size_notes: '36" W x 14" D x 72" H (shelf spacing customisable)'
    },
    product_type: 'made_to_order',
    featured: true,
    visible: true,
    sort_order: 1,
    created_at: '2026-01-08T00:00:00Z',
    updated_at: '2026-01-08T00:00:00Z'
  },
  {
    id: 'prod-bookshelf-2',
    category_id: 'cat-11',
    name: 'Asymmetric Modular Teak Wall Shelf',
    slug: 'asymmetric-modular-teak-wall-shelf',
    description: 'Contemporary geometric staggered shelving unit with closed base cabinets and alternating open display niches.',
    images: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80'
    ],
    image_url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80',
    og_image_url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80',
    keywords: ['modular bookshelf', 'wall shelf', 'geometric shelf', 'display cabinet'],
    customisation_options: {
      wood_options: ['Teak Wood', 'Country Wood'],
      finish_options: ['Natural Teak', 'Honey Matte'],
      size_notes: '48" W x 12" D x 60" H'
    },
    product_type: 'ready_stock',
    featured: false,
    visible: true,
    sort_order: 2,
    created_at: '2026-01-08T00:00:00Z',
    updated_at: '2026-01-08T00:00:00Z'
  },

  // Shoe Racks (cat-12)
  {
    id: 'prod-shoerack-1',
    category_id: 'cat-12',
    name: 'Louvered Door Teak Ventilated Shoe Cabinet',
    slug: 'louvered-door-teak-ventilated-shoe-cabinet',
    description: 'Slatted louvered door cabinet ensuring maximum airflow for 18+ pairs of footwear with an integrated sock drawer.',
    images: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80'
    ],
    image_url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80',
    og_image_url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80',
    keywords: ['shoe rack', 'shoe cabinet', 'louvered shoe rack', 'teak shoe storage'],
    customisation_options: {
      wood_options: ['Solid Teak Wood', 'Country Wood'],
      finish_options: ['Natural Teak Semi-Gloss', 'Walnut Satin'],
      size_notes: '36" W x 15" D x 42" H (stores 16–20 pairs)'
    },
    product_type: 'made_to_order',
    featured: true,
    visible: true,
    sort_order: 1,
    created_at: '2026-01-09T00:00:00Z',
    updated_at: '2026-01-09T00:00:00Z'
  },
  {
    id: 'prod-shoerack-2',
    category_id: 'cat-12',
    name: 'Entryway Bench with 2-Tier Shoe Storage Shelf',
    slug: 'entryway-bench-2-tier-shoe-storage-shelf',
    description: 'Solid wood seating bench with thick upholstered top cushion and two slatted under-bench shoe shelves for quick daily access.',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80'
    ],
    image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    og_image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    keywords: ['shoe bench', 'entryway bench', 'shoe rack', 'storage bench'],
    customisation_options: {
      wood_options: ['Teak Wood', 'Country Wood'],
      finish_options: ['Dark Walnut', 'Natural Honey'],
      size_notes: '36" W x 16" D x 18" H'
    },
    product_type: 'ready_stock',
    featured: false,
    visible: true,
    sort_order: 2,
    created_at: '2026-01-09T00:00:00Z',
    updated_at: '2026-01-09T00:00:00Z'
  },

  // Puja Mandapams (cat-13)
  {
    id: 'prod-puja-1',
    category_id: 'cat-13',
    name: 'Traditional Carved Teak Temple Mandapam with Brass Bells',
    slug: 'traditional-carved-teak-temple-mandapam-brass-bells',
    description: 'Auspicious home temple shrine crafted from seasoned teak with floral gopuram crown, engraved pillars, and brass bell hangings.',
    images: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80'
    ],
    image_url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    og_image_url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    keywords: ['puja mandapam', 'home temple', 'teak mandapam', 'pooja unit', 'brass bells'],
    customisation_options: {
      wood_options: ['Aged Teak Wood', 'Country Wood Shrine'],
      finish_options: ['High Gloss Teak', 'Traditional Honey', 'Rosewood Stain'],
      size_notes: '3 ft W x 2 ft D x 5 ft H or custom architectural dimensions'
    },
    product_type: 'made_to_order',
    featured: true,
    visible: true,
    sort_order: 1,
    created_at: '2026-01-10T00:00:00Z',
    updated_at: '2026-01-10T00:00:00Z'
  },
  {
    id: 'prod-puja-2',
    category_id: 'cat-13',
    name: 'Wall-Mounted Compact Modern Teak Puja Unit',
    slug: 'wall-mounted-compact-modern-teak-puja-unit',
    description: 'Contemporary space-saving pooja shrine with laser-cut jali jaali back panel, concealed warm LED glow, and prasad drawer.',
    images: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80'
    ],
    image_url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80',
    og_image_url: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80',
    keywords: ['wall puja unit', 'pooja shelf', 'jali mandapam', 'modern home temple'],
    customisation_options: {
      wood_options: ['Teak Wood', 'Teak Veneer + Solid Accents'],
      finish_options: ['Natural Teak Matte', 'Gold Teak Highlights'],
      size_notes: '24" W x 12" D x 30" H'
    },
    product_type: 'ready_stock',
    featured: false,
    visible: true,
    sort_order: 2,
    created_at: '2026-01-10T00:00:00Z',
    updated_at: '2026-01-10T00:00:00Z'
  },

  // Rocking and Easy Chairs (cat-14, second item)
  {
    id: 'prod-rocking-2',
    category_id: 'cat-14',
    name: 'Vintage Easy Armchair with Handwoven Natural Cane',
    slug: 'vintage-easy-armchair-handwoven-natural-cane',
    description: 'Relaxed reclined lounge chair featuring natural hand-knotted cane webbing, sculpted paddle armrests, and smooth solid teak frame.',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80'
    ],
    image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    og_image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    keywords: ['easy chair', 'cane chair', 'armchair', 'vintage chair', 'teak lounger'],
    customisation_options: {
      wood_options: ['Pure Teak Wood', 'Country Wood'],
      finish_options: ['Natural Teak', 'Dark Walnut'],
      size_notes: 'Low ergonomic posture with 105-degree reclined pitch'
    },
    product_type: 'ready_stock',
    featured: false,
    visible: true,
    sort_order: 2,
    created_at: '2026-01-11T00:00:00Z',
    updated_at: '2026-01-11T00:00:00Z'
  },

  // Mattresses (cat-15)
  {
    id: 'prod-mattress-1',
    category_id: 'cat-15',
    name: 'Natural Latex & Rubberised Coir Orthopaedic Mattress',
    slug: 'natural-latex-rubberised-coir-orthopaedic-mattress',
    description: 'Firm dual-comfort spine support mattress with certified organic natural latex layer and breathable high-density rubberised coir core.',
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'
    ],
    image_url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    og_image_url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    keywords: ['mattress', 'orthopaedic mattress', 'natural latex', 'coir mattress', 'spine care'],
    customisation_options: {
      wood_options: ['N/A - Mattress'],
      finish_options: ['Organic Bamboo Fabric Quilted', 'Cotton Jacquard Cover'],
      size_notes: 'Custom cut to any King, Queen, or bespoke cot size (5", 6", or 8" thickness)'
    },
    product_type: 'made_to_order',
    featured: true,
    visible: true,
    sort_order: 1,
    created_at: '2026-01-11T00:00:00Z',
    updated_at: '2026-01-11T00:00:00Z'
  },
  {
    id: 'prod-mattress-2',
    category_id: 'cat-15',
    name: 'Pocket Spring Hotel Comfort Custom Mattress',
    slug: 'pocket-spring-hotel-comfort-custom-mattress',
    description: 'Zero motion transfer pocketed spring mattress with euro-top high-resilience foam padding for plush hotel-grade sleep.',
    images: [
      'https://images.unsplash.com/photo-1540518614846-7ede433c4ef5?auto=format&fit=crop&w=1200&q=80'
    ],
    image_url: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef5?auto=format&fit=crop&w=1200&q=80',
    og_image_url: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef5?auto=format&fit=crop&w=1200&q=80',
    keywords: ['pocket spring mattress', 'hotel mattress', 'spring bed', 'euro top mattress'],
    customisation_options: {
      wood_options: ['N/A - Mattress'],
      finish_options: ['Plush Euro-Top Quilt', 'Medium Firm Dual-Tone Cover'],
      size_notes: 'Available in 72x36, 75x60, 78x72, or custom tailor-made dimensions'
    },
    product_type: 'ready_stock',
    featured: false,
    visible: true,
    sort_order: 2,
    created_at: '2026-01-12T00:00:00Z',
    updated_at: '2026-01-12T00:00:00Z'
  },

  // Bar Stools (cat-16, second item)
  {
    id: 'prod-bar-2',
    category_id: 'cat-16',
    name: 'Upholstered Round Cushion Teak Counter Stool',
    slug: 'upholstered-round-cushion-teak-counter-stool',
    description: 'Breakfast island stool with 360-degree swivel, stain-resistant textured fabric seat, and reinforced teak stretcher footrests.',
    images: [
      'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80'
    ],
    image_url: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80',
    og_image_url: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=1200&q=80',
    keywords: ['bar stool', 'counter stool', 'swivel stool', 'teak kitchen stool'],
    customisation_options: {
      wood_options: ['Solid Teak Wood'],
      finish_options: ['Natural Teak', 'Dark Walnut'],
      size_notes: 'Seat height 24", 26", or 30"'
    },
    product_type: 'ready_stock',
    featured: false,
    visible: true,
    sort_order: 2,
    created_at: '2026-01-12T00:00:00Z',
    updated_at: '2026-01-12T00:00:00Z'
  },

  // Custom Furniture (cat-17, second item)
  {
    id: 'prod-custom-2',
    category_id: 'cat-17',
    name: 'Custom Teak Partition Screen with Geometric Jali Work',
    slug: 'custom-teak-partition-screen-geometric-jali-work',
    description: 'Architectural room divider screen featuring CNC precision jali lattice panels set into heavy solid teak framing.',
    images: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80'
    ],
    image_url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    og_image_url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    keywords: ['custom partition', 'jali screen', 'room divider', 'teak jali', 'bespoke furniture'],
    customisation_options: {
      wood_options: ['Solid Teak Wood', 'Country Wood Framework'],
      finish_options: ['Natural Teak Matte', 'Dark Antique Polish'],
      size_notes: 'Tailored to ceiling height and floor-plan layout'
    },
    product_type: 'made_to_order',
    featured: false,
    visible: true,
    sort_order: 2,
    created_at: '2026-01-13T00:00:00Z',
    updated_at: '2026-01-13T00:00:00Z'
  }
];

export const MOCK_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    image_url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    caption: 'Finished Teak Living Room Credenza delivered to client residence',
    item_type: 'finished_work',
    sort_order: 1,
    visible: true,
    created_at: '2026-01-01T00:00:00Z'
  },
  {
    id: 'gal-2',
    image_url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    caption: 'Showroom living display at TCL Tower Kangeyam',
    item_type: 'showroom',
    sort_order: 2,
    visible: true,
    created_at: '2026-01-02T00:00:00Z'
  },
  {
    id: 'gal-3',
    image_url: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80',
    caption: '6-Seater Solid Teak Dining Suite with hand-buffed natural timber grain',
    item_type: 'new_arrival',
    sort_order: 3,
    visible: true,
    created_at: '2026-01-03T00:00:00Z'
  },
  {
    id: 'gal-4',
    image_url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    caption: 'King Size Teak Wood Platform Bed with integrated floating side ledges',
    item_type: 'finished_work',
    sort_order: 4,
    visible: true,
    created_at: '2026-01-04T00:00:00Z'
  },
  {
    id: 'gal-5',
    image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
    caption: 'Modern L-Shape Sectional with stain-resistant woven fabric in Kangeyam showroom',
    item_type: 'showroom',
    sort_order: 5,
    visible: true,
    created_at: '2026-01-05T00:00:00Z'
  },
  {
    id: 'gal-6',
    image_url: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80',
    caption: 'Handcrafted architectural coffee table highlighting natural solid wood rings',
    item_type: 'finished_work',
    sort_order: 6,
    visible: true,
    created_at: '2026-01-06T00:00:00Z'
  },
  {
    id: 'gal-7',
    image_url: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80',
    caption: 'Curated showroom lounge suite display at TCL Tower Kangeyam',
    item_type: 'showroom',
    sort_order: 7,
    visible: true,
    created_at: '2026-01-07T00:00:00Z'
  },
  {
    id: 'gal-8',
    image_url: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80',
    caption: 'Fluted wood bespoke wardrobe with custom interior drawer modules',
    item_type: 'new_arrival',
    sort_order: 8,
    visible: true,
    created_at: '2026-01-08T00:00:00Z'
  },
  {
    id: 'gal-9',
    image_url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    caption: 'Minimalist bespoke accent armchair with natural organic matte finish',
    item_type: 'finished_work',
    sort_order: 9,
    visible: true,
    created_at: '2026-01-09T00:00:00Z'
  }
];

// Helper methods for synchronous mock retrieval
export function getMockCategories(): Category[] {
  return MOCK_CATEGORIES.filter((c) => c.visible)
    .map((c) => ({
      ...c,
      product_count: MOCK_PRODUCTS.filter((p) => p.category_id === c.id && p.visible).length,
    }))
    .sort((a, b) => a.sort_order - b.sort_order);
}

export function getMockCategoryBySlug(slug: string): Category | undefined {
  const category = MOCK_CATEGORIES.find((c) => c.slug === slug && c.visible);
  if (!category) return undefined;
  return {
    ...category,
    product_count: MOCK_PRODUCTS.filter((p) => p.category_id === category.id && p.visible).length,
  };
}

export function getMockProductsByCategorySlug(slug: string): Product[] {
  const category = getMockCategoryBySlug(slug);
  if (!category) return [];
  return MOCK_PRODUCTS.filter((p) => p.category_id === category.id && p.visible)
    .sort((a, b) => a.sort_order - b.sort_order);
}

export function getMockProductBySlugs(categorySlug: string, productSlug: string): Product | undefined {
  const category = getMockCategoryBySlug(categorySlug);
  if (!category) return undefined;
  const product = MOCK_PRODUCTS.find((p) => p.category_id === category.id && p.slug === productSlug && p.visible);
  if (product) {
    return { ...product, category };
  }
  return undefined;
}

export function getMockFeaturedProducts(): Product[] {
  return MOCK_PRODUCTS.filter((p) => p.featured && p.visible).sort((a, b) => a.sort_order - b.sort_order);
}

export function getMockNewArrivals(): Product[] {
  return MOCK_PRODUCTS.filter((p) => p.visible).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

// Shop Settings Mock (Fallback)
export const MOCK_SETTINGS: Settings = {
  key: 'general',
  shop_name: 'INHOME FURNITURE',
  phone: process.env.NEXT_PUBLIC_SHOP_PHONE || '+919999999999',
  whatsapp_number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919999999999',
  address: 'TCL Tower, 3/43A, Chennimalai Rd, Kangeyam, Tamil Nadu 638701',
  google_maps_url: 'https://maps.google.com/?q=INHOME+FURNITURE+Kangeyam',
  google_rating: 4.8,
  google_reviews_count: 23,
  opening_hours: 'Mon - Sat: 9:00 AM - 6:00 PM',
  after_hours_note: 'We reply during shop hours (until 6:00 PM)',
  default_enquiry_message: 'Hi INHOME Furniture, I like this design. Please share custom quote details.',
  updated_at: '2026-01-01T00:00:00Z'
};

export function getMockSettings(): Settings {
  return MOCK_SETTINGS;
}
