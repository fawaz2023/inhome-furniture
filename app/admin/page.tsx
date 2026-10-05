'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Package, 
  FolderTree, 
  PlusCircle, 
  Share2, 
  Eye, 
  Layers, 
  ArrowRight,
  TrendingUp,
  Image as ImageIcon
} from 'lucide-react';
import { getCategories, isSupabaseConfigured, supabase } from '@/lib/supabase';
import { getMockCategories, MOCK_PRODUCTS } from '@/lib/mock-data';
import { Category, Product } from '@/types/database';
import ProductRow from '@/components/admin/ProductRow';

export default function AdminDashboardPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [pageviewStats, setPageviewStats] = useState<{
    totalViews: number;
    todayViews: number;
    topPages: { path: string; count: number }[];
  }>({
    totalViews: 0,
    todayViews: 0,
    topPages: [],
  });

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        // Fetch pageview analytics
        try {
          const pvRes = await fetch('/api/pageview');
          if (pvRes.ok) {
            const pvData = await pvRes.json();
            if (pvData.success) {
              setPageviewStats({
                totalViews: pvData.totalViews || 0,
                todayViews: pvData.todayViews || 0,
                topPages: pvData.topPages || [],
              });
            }
          }
        } catch {
          // Non-blocking telemetry fallback
        }

        if (!isSupabaseConfigured || !supabase) {
          setCategories(getMockCategories());
          setProducts(MOCK_PRODUCTS);
        } else {
          // Fetch categories
          const cats = await getCategories();
          setCategories(cats);

          // Fetch products
          const { data: prods } = await supabase
            .from('products')
            .select('*')
            .is('deleted_at', null)
            .order('created_at', { ascending: false });

          if (prods && prods.length > 0) {
            setProducts(prods as Product[]);
          } else {
            setProducts(MOCK_PRODUCTS);
          }
        }
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
        setCategories(getMockCategories());
        setProducts(MOCK_PRODUCTS);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const handleToggleVisibility = async (id: string, currentVisibility: boolean) => {
    const newStatus = !currentVisibility;
    // Optimistic UI update
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, visible: newStatus } : p))
    );

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from('products')
        .update({ visible: newStatus })
        .eq('id', id);

      if (error) {
        console.error('Failed to update product visibility:', error);
        // Revert
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, visible: currentVisibility } : p))
        );
      }
    }
  };

  const handleDeleteProduct = async (id: string) => {
    // Soft delete
    setProducts((prev) => prev.filter((p) => p.id !== id));

    if (isSupabaseConfigured && supabase) {
      await supabase
        .from('products')
        .update({ deleted_at: new Date().toISOString(), visible: false })
        .eq('id', id);
    }
  };

  const visibleCount = products.filter((p) => p.visible).length;
  const hiddenCount = products.length - visibleCount;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://inhome-furniture-ebon.vercel.app';
  const generalShareMessage = `Explore the latest handcrafted custom furniture catalogue from INHOME FURNITURE, Kangeyam: ${siteUrl}`;
  const generalShareWhatsAppUrl = `https://wa.me/?text=${encodeURIComponent(generalShareMessage)}`;

  return (
    <div className="dashboard-content">
      {/* Welcome Header */}
      <div className="dash-header">
        <div>
          <h1 className="dash-title">Showroom Overview</h1>
          <p className="dash-sub">TCL Tower Kangeyam • Custom Catalogue Operations</p>
        </div>

        <Link href="/admin/products/new" className="btn-add-primary">
          <PlusCircle size={18} />
          <span>Add Product</span>
        </Link>
      </div>

      {/* Quick Action Cards Grid */}
      <div className="quick-actions-grid">
        <a
          href={generalShareWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="quick-card share-card"
        >
          <div className="card-icon-box share-icon-box">
            <Share2 size={20} />
          </div>
          <div className="card-text">
            <span className="card-label">Share Catalogue</span>
            <span className="card-desc">Send home catalogue link to customers on WhatsApp</span>
          </div>
        </a>

        <Link href="/admin/products/new" className="quick-card add-card">
          <div className="card-icon-box add-icon-box">
            <PlusCircle size={20} />
          </div>
          <div className="card-text">
            <span className="card-label">Take Showroom Photo</span>
            <span className="card-desc">Instant camera capture &amp; 1600px/OG WebP compression</span>
          </div>
        </Link>
      </div>

      {/* Numerical Metrics Strip */}
      <div className="metrics-strip">
        <div className="metric-box">
          <div className="metric-top">
            <Package size={18} className="metric-icon" />
            <span className="metric-title">Total Designs</span>
          </div>
          <div className="metric-value">{products.length}</div>
          <span className="metric-sub">{visibleCount} visible • {hiddenCount} hidden</span>
        </div>

        <div className="metric-box">
          <div className="metric-top">
            <FolderTree size={18} className="metric-icon" />
            <span className="metric-title">Categories</span>
          </div>
          <div className="metric-value">{categories.length}</div>
          <span className="metric-sub">Active furniture collections</span>
        </div>

        <div className="metric-box">
          <div className="metric-top">
            <Eye size={18} className="metric-icon" />
            <span className="metric-title">Google Rating</span>
          </div>
          <div className="metric-value">4.8 ★</div>
          <span className="metric-sub">Kangeyam verified reviews</span>
        </div>

        <div className="metric-box">
          <div className="metric-top">
            <TrendingUp size={18} className="metric-icon" />
            <span className="metric-title">Link Opens</span>
          </div>
          <div className="metric-value">{pageviewStats.totalViews}</div>
          <span className="metric-sub">{pageviewStats.todayViews} today • Link engagement</span>
        </div>
      </div>

      {/* Top Opened Links Strip */}
      {pageviewStats.topPages.length > 0 && (
        <div className="top-links-strip">
          <div className="top-links-header">
            <span className="top-links-title">🔥 Most Opened Catalogue Links</span>
            <span className="top-links-sub">Direct visitor engagement</span>
          </div>
          <div className="top-links-chips">
            {pageviewStats.topPages.map((tp) => (
              <span key={tp.path} className="top-link-chip">
                <span className="chip-path">{tp.path === '/' ? 'Showroom Home' : tp.path.replace(/^\//, '')}</span>
                <span className="chip-count">{tp.count} views</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Recent Products Section */}
      <div className="recent-section">
        <div className="section-title-row">
          <h2 className="section-heading">Recent Pieces</h2>
          <Link href="/admin/products" className="link-view-all">
            <span>View All ({products.length})</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {loading ? (
          <div className="loading-state">
            <div className="spinner" />
            <p>Loading pieces...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="empty-state">
            <Package size={32} />
            <p>No products yet. Tap &ldquo;Add Product&rdquo; above to upload your first showroom piece.</p>
          </div>
        ) : (
          <div className="products-list">
            {products.slice(0, 5).map((product) => {
              const cat = categories.find((c) => c.id === product.category_id);
              return (
                <ProductRow
                  key={product.id}
                  product={product}
                  category={cat}
                  onToggleVisibility={handleToggleVisibility}
                  onDeleteProduct={handleDeleteProduct}
                />
              );
            })}
          </div>
        )}
      </div>

      <style jsx>{`
        .dashboard-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .dash-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .dash-title {
          font-size: 1.45rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .dash-sub {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 0.15rem;
        }

        .btn-add-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background-color: var(--accent-primary);
          color: #FFFFFF;
          font-size: 0.875rem;
          font-weight: 700;
          padding: 0.65rem 1.15rem;
          border-radius: var(--radius-md);
          text-decoration: none;
          min-height: 44px;
          transition: background-color 0.15s ease;
        }

        .btn-add-primary:hover {
          background-color: var(--accent-hover);
        }

        .quick-actions-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.85rem;
        }

        @media (max-width: 600px) {
          .quick-actions-grid {
            grid-template-columns: 1fr;
          }
        }

        .quick-card {
          background-color: var(--bg-surface);
          border: 1.5px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1rem;
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
          text-decoration: none;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
          transition: all 0.15s ease;
        }

        .quick-card:hover {
          border-color: var(--accent-primary);
          transform: translateY(-1px);
        }

        .card-icon-box {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .share-icon-box {
          background-color: #ECFDF5;
          color: #047857;
        }

        .add-icon-box {
          background-color: var(--accent-subtle);
          color: var(--accent-primary);
        }

        .card-label {
          display: block;
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.2rem;
        }

        .card-desc {
          display: block;
          font-size: 0.78rem;
          color: var(--text-muted);
          line-height: 1.35;
        }

        .metrics-strip {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 0.85rem;
        }

        @media (max-width: 900px) {
          .metrics-strip {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media (max-width: 480px) {
          .metrics-strip {
            grid-template-columns: 1fr;
          }
        }

        .top-links-strip {
          margin-top: 1.25rem;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1rem 1.25rem;
        }

        .top-links-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .top-links-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .top-links-sub {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .top-links-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .top-link-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background-color: var(--bg-surface-secondary);
          padding: 0.35rem 0.65rem;
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          border: 1px solid var(--border-subtle);
        }

        .chip-path {
          color: var(--text-primary);
          font-weight: 500;
          max-width: 220px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .chip-count {
          background-color: var(--accent-subtle);
          color: var(--accent-primary);
          padding: 0.1rem 0.45rem;
          border-radius: var(--radius-full);
          font-weight: 700;
          font-size: 0.72rem;
        }

        .metric-box {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1rem;
        }

        .metric-top {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--text-muted);
          margin-bottom: 0.5rem;
        }

        .metric-title {
          font-size: 0.78rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .metric-value {
          font-size: 1.65rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.1;
        }

        .metric-sub {
          display: block;
          font-size: 0.72rem;
          color: var(--text-muted);
          margin-top: 0.35rem;
        }

        .recent-section {
          background-color: transparent;
        }

        .section-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.85rem;
        }

        .section-heading {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .link-view-all {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--accent-primary);
          text-decoration: none;
        }

        .loading-state,
        .empty-state {
          padding: 2.5rem 1rem;
          text-align: center;
          background-color: var(--bg-surface);
          border: 1px dashed var(--border-subtle);
          border-radius: var(--radius-md);
          color: var(--text-muted);
          font-size: 0.85rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }

        .spinner {
          width: 24px;
          height: 24px;
          border: 2px solid var(--border-subtle);
          border-top-color: var(--accent-primary);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
