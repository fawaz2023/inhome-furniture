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
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isServerSupabaseConfigured: boolean = Boolean(
  supabaseUrl &&
  supabaseKey &&
  !supabaseUrl.includes('placeholder') &&
  !supabaseKey.includes('placeholder') &&
  supabaseUrl.startsWith('https://')
);

export function createServerClient(): SupabaseClient | null {
  if (!isServerSupabaseConfigured) return null;
  return createClient(supabaseUrl!, supabaseKey!, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}

/**
 * Server-side Resilient Data Fetchers (SSR & Server Actions)
 */

export async function getServerCategories(): Promise<Category[]> {
  const client = createServerClient();
  if (!client) return getMockCategories();

  try {
    const { data, error } = await client
      .from('categories')
      .select('*')
      .eq('visible', true)
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return getMockCategories();
    }
    return data as Category[];
  } catch {
    return getMockCategories();
  }
}

export async function getServerCategoryBySlug(slug: string): Promise<Category | null> {
  const client = createServerClient();
  if (!client) return getMockCategoryBySlug(slug) || null;

  try {
    const { data, error } = await client
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

export async function getServerProductsByCategorySlug(slug: string): Promise<Product[]> {
  const client = createServerClient();
  if (!client) return getMockProductsByCategorySlug(slug);

  try {
    const category = await getServerCategoryBySlug(slug);
    if (!category) return getMockProductsByCategorySlug(slug);

    const { data, error } = await client
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

export async function getServerProductBySlugs(categorySlug: string, productSlug: string): Promise<Product | null> {
  const client = createServerClient();
  if (!client) return getMockProductBySlugs(categorySlug, productSlug) || null;

  try {
    const category = await getServerCategoryBySlug(categorySlug);
    if (!category) return getMockProductBySlugs(categorySlug, productSlug) || null;

    const { data, error } = await client
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

export async function getServerFeaturedProducts(): Promise<Product[]> {
  const client = createServerClient();
  if (!client) return getMockFeaturedProducts();

  try {
    const { data, error } = await client
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

export async function getServerNewArrivals(): Promise<Product[]> {
  const client = createServerClient();
  if (!client) return getMockNewArrivals();

  try {
    const { data, error } = await client
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

export async function getServerShopSettings(): Promise<Settings> {
  const client = createServerClient();
  if (!client) return getMockSettings();

  try {
    const { data, error } = await client
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

export async function getServerGalleryItems(): Promise<GalleryItem[]> {
  const client = createServerClient();
  if (!client) return MOCK_GALLERY;

  try {
    const { data, error } = await client
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
