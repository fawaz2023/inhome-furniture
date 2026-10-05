'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FolderTree, Plus, Eye, EyeOff, Save, CheckCircle2, AlertCircle, Layers } from 'lucide-react';
import { getCategories, isSupabaseConfigured, supabase } from '@/lib/supabase';
import { getMockCategories } from '@/lib/mock-data';
import { Category } from '@/types/database';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        if (!isSupabaseConfigured || !supabase) {
          setCategories(getMockCategories());
        } else {
          const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('sort_order', { ascending: true });

          if (!error && data) {
            setCategories(data as Category[]);
          } else {
            setCategories(getMockCategories());
          }
        }
      } catch {
        setCategories(getMockCategories());
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const handleToggleVisibility = async (id: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, visible: newStatus } : c))
    );

    if (isSupabaseConfigured && supabase) {
      await supabase
        .from('categories')
        .update({ visible: newStatus })
        .eq('id', id);
    }
    setStatusMessage('Category visibility updated');
    setTimeout(() => setStatusMessage(null), 2000);
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const slug = newName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const nextOrder = categories.length + 1;

    if (!isSupabaseConfigured || !supabase) {
      const newCat: Category = {
        id: `cat-${Date.now()}`,
        name: newName.trim(),
        slug,
        description: newDescription.trim() || null,
        image_url: newImageUrl.trim() || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
        sort_order: nextOrder,
        visible: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      setCategories((prev) => [...prev, newCat]);
      setNewName('');
      setNewDescription('');
      setNewImageUrl('');
      setIsAddingNew(false);
      setStatusMessage('Category added successfully in Mock Mode');
      setTimeout(() => setStatusMessage(null), 2000);
      return;
    }

    const { data, error } = await supabase
      .from('categories')
      .insert({
        name: newName.trim(),
        slug,
        description: newDescription.trim() || null,
        image_url: newImageUrl.trim() || null,
        sort_order: nextOrder,
        visible: true
      })
      .select()
      .single();

    if (!error && data) {
      setCategories((prev) => [...prev, data as Category]);
      setNewName('');
      setNewDescription('');
      setNewImageUrl('');
      setIsAddingNew(false);
      setStatusMessage('Category published successfully');
      setTimeout(() => setStatusMessage(null), 2000);
    }
  };

  return (
    <div className="admin-categories-view">
      <div className="page-head">
        <div>
          <h1 className="page-title">Categories &amp; Collections</h1>
          <p className="page-sub">Manage 17 catalogue groupings, public visibility, and ordering</p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddingNew(!isAddingNew)}
          className="btn-add-cat"
        >
          <Plus size={18} />
          <span>{isAddingNew ? 'Close' : 'Add Category'}</span>
        </button>
      </div>

      {statusMessage && (
        <div className="status-toast">
          <CheckCircle2 size={16} />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Add New Category Panel */}
      {isAddingNew && (
        <div className="new-cat-panel">
          <h2 className="panel-title">Add New Category</h2>
          <form onSubmit={handleCreateCategory} className="cat-form">
            <div className="form-field">
              <label className="field-label" htmlFor="new-cat-name">Category Name *</label>
              <input
                id="new-cat-name"
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Teak Swings &amp; Benches"
                required
                className="input-text"
              />
            </div>

            <div className="form-field">
              <label className="field-label" htmlFor="new-cat-desc">Description</label>
              <input
                id="new-cat-desc"
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Brief summary of pieces in this collection"
                className="input-text"
              />
            </div>

            <div className="form-field">
              <label className="field-label" htmlFor="new-cat-image">Cover Image URL</label>
              <input
                id="new-cat-image"
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="input-text"
              />
            </div>

            <button type="submit" className="btn-save-cat">
              <Save size={16} />
              <span>Save Category</span>
            </button>
          </form>
        </div>
      )}

      {/* Categories List */}
      <div className="categories-list">
        {loading ? (
          <div className="loading-state">
            <div className="spinner" />
            <p>Loading categories...</p>
          </div>
        ) : (
          categories.map((cat, index) => (
            <div key={cat.id} className={`cat-row ${!cat.visible ? 'hidden-cat' : ''}`}>
              <div className="cat-order-num">#{index + 1}</div>

              <div className="cat-thumb">
                {cat.image_url ? (
                  <Image
                    src={cat.image_url}
                    alt={cat.name}
                    width={52}
                    height={52}
                    className="cat-thumb-img"
                    unoptimized
                  />
                ) : (
                  <div className="cat-thumb-placeholder">
                    <Layers size={20} />
                  </div>
                )}
              </div>

              <div className="cat-info">
                <span className="cat-name">{cat.name}</span>
                <span className="cat-slug">/{cat.slug}</span>
                {cat.description && (
                  <p className="cat-desc">{cat.description}</p>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleToggleVisibility(cat.id, cat.visible)}
                className={`btn-visibility ${cat.visible ? 'visible' : 'hidden'}`}
                title={cat.visible ? 'Visible (Tap to hide)' : 'Hidden (Tap to show)'}
                aria-label={cat.visible ? 'Hide category' : 'Show category'}
              >
                {cat.visible ? <Eye size={18} /> : <EyeOff size={18} />}
                <span className="vis-label">{cat.visible ? 'Visible' : 'Hidden'}</span>
              </button>
            </div>
          ))
        )}
      </div>

      <style jsx>{`
        .admin-categories-view {
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

        .btn-add-cat {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background-color: var(--accent-primary);
          color: #FFFFFF;
          border: none;
          padding: 0.65rem 1.15rem;
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          font-weight: 700;
          cursor: pointer;
          min-height: 44px;
        }

        .status-toast {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background-color: #ECFDF5;
          color: #065F46;
          border: 1px solid #A7F3D0;
          padding: 0.65rem 1rem;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          font-weight: 600;
        }

        .new-cat-panel {
          background-color: var(--bg-surface);
          border: 1.5px solid var(--accent-primary);
          border-radius: var(--radius-lg);
          padding: 1.25rem;
        }

        .panel-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 1rem;
        }

        .cat-form {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .field-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .input-text {
          width: 100%;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 0.65rem 0.85rem;
          font-size: 0.9rem;
          outline: none;
          min-height: 44px;
        }

        .btn-save-cat {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          background-color: var(--accent-primary);
          color: #FFFFFF;
          border: none;
          border-radius: var(--radius-md);
          min-height: 44px;
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          margin-top: 0.5rem;
        }

        .categories-list {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }

        .cat-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 0.75rem 1rem;
        }

        .cat-row.hidden-cat {
          opacity: 0.65;
          background-color: #FBF9F7;
        }

        .cat-order-num {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--text-muted);
          width: 28px;
          flex-shrink: 0;
        }

        .cat-thumb {
          width: 50px;
          height: 50px;
          border-radius: var(--radius-sm);
          overflow: hidden;
          background-color: var(--bg-surface-secondary);
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cat-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .cat-thumb-placeholder {
          color: var(--text-muted);
        }

        .cat-info {
          flex: 1;
          min-width: 0;
        }

        .cat-name {
          display: block;
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .cat-slug {
          display: block;
          font-size: 0.75rem;
          color: var(--accent-primary);
          font-family: monospace;
          margin-top: 0.1rem;
        }

        .cat-desc {
          font-size: 0.75rem;
          color: var(--text-muted);
          margin-top: 0.2rem;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .btn-visibility {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.4rem 0.75rem;
          border-radius: var(--radius-sm);
          font-size: 0.78rem;
          font-weight: 600;
          min-height: 44px;
          cursor: pointer;
          border: 1px solid transparent;
          flex-shrink: 0;
        }

        .btn-visibility.visible {
          background-color: #ECFDF5;
          color: #047857;
          border-color: #A7F3D0;
        }

        .btn-visibility.hidden {
          background-color: #F3F4F6;
          color: #6B7280;
          border-color: #D1D5DB;
        }

        @media (max-width: 480px) {
          .vis-label {
            display: none;
          }
          .btn-visibility {
            padding: 0 0.65rem;
          }
        }

        .loading-state {
          padding: 2.5rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          color: var(--text-muted);
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
