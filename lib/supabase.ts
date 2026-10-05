import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';
import {
  Category,
  Product,
  Settings,
  GalleryItem
} from '@/types/database';
import {
  getMockCategories,
  getMockCategoryBySlug,
  getMockProductsByCategorySlug,
  getMockProductBySlugs,
  getMockFeaturedProducts,
  getMockNewArrivals,
  getMockSettings,
  MOCK_GALLERY
} from '@/lib/mock-data';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured: boolean = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  !supabaseUrl.includes('placeholder') &&
  !supabaseAnonKey.includes('placeholder') &&
  supabaseUrl.startsWith('https://')
);

// Client-side singleton Supabase instance (or null if mock mode)
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

/**
 * Resilient Data Access Helpers with Graceful Fallback
 * Guarantees zero crashing when Supabase credentials are absent or remote project is paused.
 */

export async function getCategories(): Promise<Category[]> {
  if (!isSupabaseConfigured || !supabase) {
    return getMockCategories();
  }

  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('visible', true)
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      console.warn('[Supabase] Categories query returned empty/error, falling back to mock:', error?.message);
      return getMockCategories();
    }
    return data as Category[];
  } catch (err) {
    console.warn('[Supabase] Connection failed in getCategories, falling back to mock:', err);
    return getMockCategories();
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (!isSupabaseConfigured || !supabase) {
    return getMockCategoryBySlug(slug) || null;
  }

  try {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .eq('visible', true)
      .single();

    if (error || !data) {
      return getMockCategoryBySlug(slug) || null;
    }
    return data as Category;
  } catch {
    return getMockCategoryBySlug(slug) || null;
  }
}

export async function getProductsByCategorySlug(slug: string): Promise<Product[]> {
  if (!isSupabaseConfigured || !supabase) {
    return getMockProductsByCategorySlug(slug);
  }

  try {
    // First lookup category id
    const category = await getCategoryBySlug(slug);
    if (!category) {
      return getMockProductsByCategorySlug(slug);
    }

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category_id', category.id)
      .eq('visible', true)
      .is('deleted_at', null)
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return getMockProductsByCategorySlug(slug);
    }
    return data as Product[];
  } catch {
    return getMockProductsByCategorySlug(slug);
  }
}

export async function getProductBySlugs(categorySlug: string, productSlug: string): Promise<Product | null> {
  if (!isSupabaseConfigured || !supabase) {
    return getMockProductBySlugs(categorySlug, productSlug) || null;
  }

  try {
    const category = await getCategoryBySlug(categorySlug);
    if (!category) {
      return getMockProductBySlugs(categorySlug, productSlug) || null;
    }

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category_id', category.id)
      .eq('slug', productSlug)
      .eq('visible', true)
      .is('deleted_at', null)
      .single();

    if (error || !data) {
      return getMockProductBySlugs(categorySlug, productSlug) || null;
    }

    return {
      ...(data as Product),
      category
    };
  } catch {
    return getMockProductBySlugs(categorySlug, productSlug) || null;
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured || !supabase) {
    return getMockFeaturedProducts();
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .eq('visible', true)
      .is('deleted_at', null)
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return getMockFeaturedProducts();
    }
    return data as Product[];
  } catch {
    return getMockFeaturedProducts();
  }
}

export async function getNewArrivals(): Promise<Product[]> {
  if (!isSupabaseConfigured || !supabase) {
    return getMockNewArrivals();
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('visible', true)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .limit(8);

    if (error || !data || data.length === 0) {
      return getMockNewArrivals();
    }
    return data as Product[];
  } catch {
    return getMockNewArrivals();
  }
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  if (!isSupabaseConfigured || !supabase) {
    return MOCK_GALLERY;
  }

  try {
    const { data, error } = await supabase
      .from('gallery_items')
      .select('*')
      .eq('visible', true)
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return MOCK_GALLERY;
    }
    return data as GalleryItem[];
  } catch {
    return MOCK_GALLERY;
  }
}

export async function getShopSettings(): Promise<Settings> {
  if (!isSupabaseConfigured || !supabase) {
    return getMockSettings();
  }

  try {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('key', 'general')
      .single();

    if (error || !data) {
      return getMockSettings();
    }
    return data as Settings;
  } catch {
    return getMockSettings();
  }
}
