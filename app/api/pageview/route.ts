import { NextRequest, NextResponse } from 'next/server';
import { createServerClient, isServerSupabaseConfigured } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

// In-memory fallback storage for local development & mock mode
interface FallbackPageView {
  path: string;
  referrer: string | null;
  created_at: string;
}

const fallbackViews: FallbackPageView[] = [];

export async function POST(request: NextRequest) {
  try {
    let body: { path?: string; referrer?: string | null };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 });
    }

    const rawPath = typeof body.path === 'string' ? body.path.trim() : '/';
    const rawReferrer = typeof body.referrer === 'string' ? body.referrer.trim() : null;

    // Sanitize
    const path = rawPath.slice(0, 255);
    const referrer = rawReferrer ? rawReferrer.slice(0, 255) : null;

    // Do not track admin portal or internal API calls
    if (path.startsWith('/admin') || path.startsWith('/api')) {
      return NextResponse.json({ success: true, ignored: true });
    }

    const timestamp = new Date().toISOString();

    if (isServerSupabaseConfigured) {
      const client = createServerClient();
      if (client) {
        const { error } = await client
          .from('pageviews')
          .insert({ path, referrer });

        if (error) {
          console.error('[Pageview API insert error]:', error.message);
          // Graceful fallback to in-memory so tracking is never lost
          fallbackViews.unshift({ path, referrer, created_at: timestamp });
          if (fallbackViews.length > 500) fallbackViews.pop();
        }
      }
    } else {
      fallbackViews.unshift({ path, referrer, created_at: timestamp });
      if (fallbackViews.length > 500) fallbackViews.pop();
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown pageview error';
    console.error('[Pageview API Error]:', errorMsg);
    // Never crash or return 500 to client beacon
    return NextResponse.json({ success: false, error: errorMsg }, { status: 200 });
  }
}

export async function GET() {
  try {
    if (isServerSupabaseConfigured) {
      const client = createServerClient();
      if (client) {
        // Total views count
        const { count: totalCount, error: countError } = await client
          .from('pageviews')
          .select('*', { count: 'exact', head: true });

        // Views today
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);

        const { count: todayCount } = await client
          .from('pageviews')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', startOfToday.toISOString());

        // Recent 100 views to compute top paths
        const { data: recentRows } = await client
          .from('pageviews')
          .select('path, referrer, created_at')
          .order('created_at', { ascending: false })
          .limit(100);

        if (!countError && totalCount !== null) {
          const pathCounts: Record<string, number> = {};
          (recentRows || []).forEach((row) => {
            pathCounts[row.path] = (pathCounts[row.path] || 0) + 1;
          });

          const topPages = Object.entries(pathCounts)
            .map(([path, count]) => ({ path, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5);

          return NextResponse.json({
            success: true,
            mode: 'supabase',
            totalViews: totalCount,
            todayViews: todayCount ?? 0,
            topPages,
            recentViews: (recentRows || []).slice(0, 10),
          });
        }
      }
    }

    // Fallback Mock Aggregation
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    
    const totalViews = fallbackViews.length;
    const todayViews = fallbackViews.filter(
      (v) => new Date(v.created_at).getTime() >= startOfToday
    ).length;

    const pathCounts: Record<string, number> = {};

    fallbackViews.forEach((v) => {
      pathCounts[v.path] = (pathCounts[v.path] || 0) + 1;
    });

    const topPages = Object.entries(pathCounts)
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return NextResponse.json({
      success: true,
      mode: 'fallback',
      totalViews,
      todayViews,
      topPages,
      recentViews: fallbackViews.slice(0, 8),
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown aggregation error';
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
