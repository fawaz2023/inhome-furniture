'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { PlusCircle, Search, Filter, Package } from 'lucide-react';
import { getCategories, isSupabaseConfigured, supabase } from '@/lib/supabase';
import { getMockCategories, MOCK_PRODUCTS } from '@/lib/mock-data';
import { Category, Product } from '@/types/database';
import ProductRow from '@/components/admin/ProductRow';

export default function AdminProductsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'ready_stock' | 'made_to_order' | 'hidden'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        if (!isSupabaseConfigured || !supabase) {
          setCategories(getMockCategories());
          setProducts(MOCK_PRODUCTS);
        } else {
          const cats = await getCategories();
          setCategories(cats);

          const { data: prods } = await supabase
            .from('products')
            .select('*')
            .is('deleted_at', null)
            .order('sort_order', { ascending: true });

          if (prods && prods.length > 0) {
            setProducts(prods as Product[]);
          } else {
            setProducts(MOCK_PRODUCTS);
          }
        }
      } catch (err) {
        console.error('Failed to load products list:', err);
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
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, visible: newStatus } : p))
    );

    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase
        .from('products')
        .update({ visible: newStatus })
        .eq('id', id);

      if (error) {
        console.error('Failed to update visibility:', error);
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, visible: currentVisibility } : p))
        );
      }
    }
  };

  const handleDeleteProduct = async (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));

    if (isSupabaseConfigured && supabase) {
      await supabase
        .from('products')
        .update({ deleted_at: new Date().toISOString(), visible: false })
        .eq('id', id);
    }
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // 1. Status filter
      if (selectedFilter === 'ready_stock' && p.product_type !== 'ready_stock') return false;
      if (selectedFilter === 'made_to_order' && p.product_type !== 'made_to_order') return false;
      if (selectedFilter === 'hidden' && p.visible !== false) return false;

      // 2. Category filter
      if (selectedCategory !== 'all' && p.category_id !== selectedCategory) return false;

      // 3. Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesKeywords = (p.keywords || []).some((k) => k.toLowerCase().includes(query));
        if (!matchesName && !matchesKeywords) return false;
      }

      return true;
    });
  }, [products, selectedFilter, selectedCategory, searchQuery]);

  return (
    <div className="admin-products-view">
      <div className="page-head">
        <div>
          <h1 className="page-title">Furniture Pieces</h1>
          <p className="page-sub">Manage catalogue visibility, specs, and instant WhatsApp sharing</p>
        </div>

        <Link href="/admin/products/new" className="btn-add-piece">
          <PlusCircle size={18} />
          <span>Add Piece</span>
        </Link>
      </div>

      {/* Search & Filter Bar */}
      <div className="filter-controls">
        <div className="search-bar">
          <Search size={16} className="search-bar-icon" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter by piece name or tags..."
            className="filter-input"
          />
        </div>

        <div className="category-select-wrapper">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-dropdown"
          >
            <option value="all">All Categories ({categories.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Pill Filter Tabs */}
      <div className="filter-pills-row">
        <button
          type="button"
          onClick={() => setSelectedFilter('all')}
          className={`pill-btn ${selectedFilter === 'all' ? 'active' : ''}`}
        >
          All ({products.length})
        </button>
        <button
          type="button"
          onClick={() => setSelectedFilter('ready_stock')}
          className={`pill-btn ${selectedFilter === 'ready_stock' ? 'active' : ''}`}
        >
          Ready Stock
        </button>
        <button
          type="button"
          onClick={() => setSelectedFilter('made_to_order')}
          className={`pill-btn ${selectedFilter === 'made_to_order' ? 'active' : ''}`}
        >
          Made to Order
        </button>
        <button
          type="button"
          onClick={() => setSelectedFilter('hidden')}
          className={`pill-btn ${selectedFilter === 'hidden' ? 'active' : ''}`}
        >
          Hidden ({products.filter((p) => !p.visible).length})
        </button>
      </div>

      {/* Product List */}
      <div className="list-wrapper">
        {loading ? (
          <div className="loading-box">
            <div className="spinner" />
            <p>Loading pieces...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="empty-box">
            <Package size={32} />
            <p>No products match your active search or filters.</p>
          </div>
        ) : (
          <div className="products-container">
            {filteredProducts.map((product) => {
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
        .admin-products-view {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .page-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .page-title {
          font-size: 1.45rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .page-sub {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 0.15rem;
        }

        .btn-add-piece {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background-color: var(--accent-primary);
          color: #FFFFFF;
          padding: 0.65rem 1.15rem;
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          font-weight: 700;
          text-decoration: none;
          min-height: 44px;
        }

        .filter-controls {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .search-bar {
          flex: 1;
          min-width: 220px;
          display: flex;
          align-items: center;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 0 0.85rem;
          min-height: 46px;
        }

        .search-bar-icon {
          color: var(--text-muted);
          margin-right: 0.5rem;
        }

        .filter-input {
          flex: 1;
          border: none;
          background: transparent;
          font-size: 0.9rem;
          color: var(--text-primary);
          outline: none;
          min-height: 44px;
        }

        .category-select-wrapper {
          min-width: 170px;
        }

        .category-dropdown {
          width: 100%;
          min-height: 46px;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          background-color: var(--bg-surface);
          color: var(--text-primary);
          padding: 0 0.75rem;
          font-size: 0.85rem;
          font-weight: 600;
          outline: none;
        }

        .filter-pills-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          overflow-x: auto;
          padding-bottom: 0.25rem;
          -webkit-overflow-scrolling: touch;
        }

        .pill-btn {
          border: 1px solid var(--border-subtle);
          background-color: var(--bg-surface);
          color: var(--text-muted);
          border-radius: var(--radius-full);
          padding: 0.4rem 0.85rem;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
          min-height: 38px;
          transition: all 0.15s ease;
        }

        .pill-btn.active {
          background-color: var(--accent-primary);
          color: #FFFFFF;
          border-color: var(--accent-primary);
        }

        .loading-box,
        .empty-box {
          padding: 3rem 1rem;
          text-align: center;
          background-color: var(--bg-surface);
          border: 1px dashed var(--border-subtle);
          border-radius: var(--radius-md);
          color: var(--text-muted);
          font-size: 0.875rem;
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
