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
  return MOCK_CATEGORIES.filter((c) => c.visible).sort((a, b) => a.sort_order - b.sort_order);
}

export function getMockCategoryBySlug(slug: string): Category | undefined {
  return MOCK_CATEGORIES.find((c) => c.slug === slug && c.visible);
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
  phone: '+919999999999',
  whatsapp_number: '919999999999',
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
