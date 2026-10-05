import { NextResponse } from 'next/server';
import { createServerClient, isServerSupabaseConfigured } from '@/lib/supabase-server';
import { getMockCategories, MOCK_PRODUCTS } from '@/lib/mock-data';
import { Category, Product } from '@/types/database';

export const revalidate = 3600; // Cache for 1 hour with on-demand ISR

export interface SearchIndexItem {
  id: string;
  type: 'product' | 'category';
  name: string;
  slug: string;
  categorySlug?: string;
  categoryName?: string;
  thumbnail: string;
  keywords: string[];
  productType?: 'made_to_order' | 'ready_stock';
}

export async function GET() {
  try {
    let items: SearchIndexItem[] = [];

    if (!isServerSupabaseConfigured) {
      // Mock mode fallback
      const categories = getMockCategories();
      const products = MOCK_PRODUCTS.filter((p) => p.visible && !p.deleted_at);

      const categoryItems: SearchIndexItem[] = categories.map((cat) => ({
        id: cat.id,
        type: 'category',
        name: cat.name,
        slug: cat.slug,
        thumbnail: cat.image_url,
        keywords: [cat.name.toLowerCase(), ...(cat.description?.toLowerCase().split(/\s+/) || [])]
      }));

      const productItems: SearchIndexItem[] = products.map((prod) => {
        const cat = categories.find((c) => c.id === prod.category_id);
        return {
          id: prod.id,
          type: 'product',
          name: prod.name,
          slug: prod.slug,
          categorySlug: cat ? cat.slug : 'custom-furniture',
          categoryName: cat ? cat.name : 'Furniture',
          thumbnail: prod.image_url || prod.images[0] || '',
          keywords: (prod.keywords || []).map((k) => k.toLowerCase()),
          productType: prod.product_type
        };
      });

      items = [...categoryItems, ...productItems];
    } else {
      const client = createServerClient();
      if (!client) {
        throw new Error('Supabase client failed to initialize');
      }

      // 1. Fetch visible categories
      const { data: catData, error: catError } = await client
        .from('categories')
        .select('*')
        .eq('visible', true)
        .order('sort_order', { ascending: true });

      if (catError) throw catError;
      const categories: Category[] = (catData as unknown as Category[]) || [];

      // 2. Fetch visible non-deleted products
      const { data: prodData, error: prodError } = await client
        .from('products')
        .select('*')
        .eq('visible', true)
        .is('deleted_at', null)
        .order('sort_order', { ascending: true });

      if (prodError) throw prodError;
      const products: Product[] = (prodData as unknown as Product[]) || [];

      const catMap = new Map((categories || []).map((c) => [c.id, c]));

      const categoryItems: SearchIndexItem[] = (categories || []).map((cat) => ({
        id: cat.id,
        type: 'category',
        name: cat.name,
        slug: cat.slug,
        thumbnail: cat.image_url || '',
        keywords: [cat.name.toLowerCase(), ...(cat.description?.toLowerCase().split(/\s+/) || [])]
      }));

      const productItems: SearchIndexItem[] = (products || []).map((prod) => {
        const cat = catMap.get(prod.category_id);
        const thumb = prod.image_url || (prod.images && prod.images.length > 0 ? prod.images[0] : '');
        return {
          id: prod.id,
          type: 'product',
          name: prod.name,
          slug: prod.slug,
          categorySlug: cat ? cat.slug : 'custom-furniture',
          categoryName: cat ? cat.name : 'Furniture',
          thumbnail: thumb,
          keywords: (prod.keywords || []).map((k: string) => k.toLowerCase()),
          productType: prod.product_type as 'made_to_order' | 'ready_stock'
        };
      });

      items = [...categoryItems, ...productItems];
    }

    return NextResponse.json(
      { items },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400'
        }
      }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to generate search index';
    console.error('[Search Index Error]:', message);
    return NextResponse.json({ items: [] }, { status: 500 });
  }
}
