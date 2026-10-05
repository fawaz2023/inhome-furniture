export type ProductType = 'made_to_order' | 'ready_stock';
export type GalleryItemType = 'showroom' | 'finished_work' | 'new_arrival';

export interface ProductCustomisationOptions {
  wood_options?: string[];
  finish_options?: string[];
  size_notes?: string;
  fabric_notes?: string;
  [key: string]: unknown;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string;
  sort_order: number;
  visible: boolean;
  created_at: string;
  updated_at: string;
  product_count?: number;
}

export interface Product {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string | null;
  images: string[];
  image_url?: string | null;
  og_image_url?: string | null;
  keywords?: string[];
  customisation_options: ProductCustomisationOptions;
  product_type: ProductType;
  featured: boolean;
  visible: boolean;
  sort_order: number;
  deleted_at?: string | null;
  created_at: string;
  updated_at: string;
  // Joined relation helper
  category?: Category;
}

export interface GalleryItem {
  id: string;
  image_url: string;
  caption: string | null;
  item_type: GalleryItemType;
  sort_order: number;
  visible: boolean;
  created_at: string;
}

export interface Pageview {
  id: string;
  path: string;
  referrer: string | null;
  created_at: string;
}

export interface Settings {
  key: string;
  shop_name?: string;
  phone?: string;
  whatsapp_number?: string;
  address?: string;
  google_maps_url?: string;
  google_rating?: number;
  google_reviews_count?: number;
  opening_hours?: string;
  after_hours_note?: string;
  default_enquiry_message?: string;
  value?: string;
  description?: string | null;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: Category;
        Insert: Partial<Category>;
        Update: Partial<Category>;
        Relationships: [];
      };
      products: {
        Row: Product;
        Insert: Partial<Product>;
        Update: Partial<Product>;
        Relationships: [
          {
            foreignKeyName: 'products_category_id_fkey';
            columns: ['category_id'];
            isOneToOne: false;
            referencedRelation: 'categories';
            referencedColumns: ['id'];
          }
        ];
      };
      gallery_items: {
        Row: GalleryItem;
        Insert: Partial<GalleryItem>;
        Update: Partial<GalleryItem>;
        Relationships: [];
      };
      settings: {
        Row: Settings;
        Insert: Partial<Settings>;
        Update: Partial<Settings>;
        Relationships: [];
      };
      pageviews: {
        Row: Pageview;
        Insert: Partial<Pageview>;
        Update: Partial<Pageview>;
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
