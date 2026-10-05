import { NextRequest, NextResponse } from 'next/server';
import { createServerClient, isServerSupabaseConfigured } from '@/lib/supabase-server';
import { getMockCategories } from '@/lib/mock-data';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const startTime = Date.now();

  // 1. Verify CRON_SECRET if configured in environment
  const configuredSecret = process.env.CRON_SECRET;
  if (configuredSecret) {
    const authHeader = request.headers.get('authorization');
    const customHeader = request.headers.get('x-cron-secret');
    const querySecret = request.nextUrl.searchParams.get('secret');

    const providedSecret = 
      (authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null) ||
      customHeader ||
      querySecret;

    if (providedSecret !== configuredSecret) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Invalid cron secret' },
        { status: 401 }
      );
    }
  }

  // 2. Execute category count heartbeat ping
  try {
    if (!isServerSupabaseConfigured) {
      const mockCount = getMockCategories().length;
      const latencyMs = Date.now() - startTime;
      return NextResponse.json({
        success: true,
        mode: 'mock',
        timestamp: new Date().toISOString(),
        count: mockCount,
        latencyMs,
        message: 'Keep-alive ping acknowledged in local mock fallback mode.'
      });
    }

    const client = createServerClient();
    if (!client) {
      throw new Error('Supabase client failed to initialize');
    }

    const { count, error } = await client
      .from('categories')
      .select('*', { count: 'exact', head: true });

    if (error) {
      throw error;
    }

    const latencyMs = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      mode: 'supabase',
      timestamp: new Date().toISOString(),
      count: count ?? 0,
      latencyMs
    });
  } catch (err: unknown) {
    const latencyMs = Date.now() - startTime;
    const errorMessage = err instanceof Error ? err.message : 'Unknown database error';
    
    console.error('[Keep-Alive API Error]:', errorMessage);

    return NextResponse.json(
      {
        success: false,
        timestamp: new Date().toISOString(),
        latencyMs,
        error: errorMessage
      },
      { status: 500 }
    );
  }
}
