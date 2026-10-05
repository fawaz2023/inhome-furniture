'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Trash2, CheckCircle2, AlertCircle, Eye } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';
import { getCategories, isSupabaseConfigured, supabase } from '@/lib/supabase';
import { getMockCategories, MOCK_PRODUCTS } from '@/lib/mock-data';
import { Category, Product, ProductType } from '@/types/database';

export default function EditProductPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [productType, setProductType] = useState<ProductType>('made_to_order');
  const [description, setDescription] = useState('');
  const [displayUrl, setDisplayUrl] = useState('');
  const [ogImageUrl, setOgImageUrl] = useState('');
  const [keywordsInput, setKeywordsInput] = useState('');
  const [woodOptions, setWoodOptions] = useState('');
  const [finishOptions, setFinishOptions] = useState('');
  const [sizeNotes, setSizeNotes] = useState('');
  const [featured, setFeatured] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const cats = isSupabaseConfigured && supabase
          ? await getCategories()
          : getMockCategories();
        setCategories(cats);

        let currentProd: Product | null = null;
        if (isSupabaseConfigured && supabase) {
          const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', productId)
            .single();

          if (!error && data) {
            currentProd = data as Product;
          }
        }

        if (!currentProd) {
          currentProd = MOCK_PRODUCTS.find((p) => p.id === productId) || null;
        }

        if (currentProd) {
          setProduct(currentProd);
          setName(currentProd.name);
          setCategoryId(currentProd.category_id);
          setProductType(currentProd.product_type);
          setDescription(currentProd.description || '');
          setDisplayUrl(currentProd.image_url || (currentProd.images && currentProd.images[0]) || '');
          setOgImageUrl(currentProd.og_image_url || currentProd.image_url || '');
          setKeywordsInput((currentProd.keywords || []).join(', '));

          const custom = currentProd.customisation_options;
          setWoodOptions(custom.wood_options?.join(', ') || 'Teak Wood, Country Wood');
          setFinishOptions(custom.finish_options?.join(', ') || 'Natural Matte, Teak Brown Gloss');
          setSizeNotes(custom.size_notes || '');
          setFeatured(currentProd.featured);
          setVisible(currentProd.visible);
        } else {
          setErrorMessage('Product not found.');
        }
      } catch (err) {
        console.error('Failed to load piece:', err);
        setErrorMessage('Failed to load piece details.');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [productId]);

  const handleImagesReady = (display: string, og: string) => {
    setDisplayUrl(display);
    setOgImageUrl(og);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsSaving(true);

    try {
      const keywords = keywordsInput
        .split(',')
        .map((k) => k.trim().toLowerCase())
        .filter(Boolean);

      const customisationOptions = {
        wood_options: woodOptions.split(',').map((w) => w.trim()).filter(Boolean),
        finish_options: finishOptions.split(',').map((f) => f.trim()).filter(Boolean),
        size_notes: sizeNotes.trim()
      };

      const imagesArray = displayUrl ? [displayUrl] : [];

      if (!isSupabaseConfigured || !supabase) {
        // Mock update
        const idx = MOCK_PRODUCTS.findIndex((p) => p.id === productId);
        if (idx !== -1) {
          MOCK_PRODUCTS[idx] = {
            ...MOCK_PRODUCTS[idx],
            name,
            category_id: categoryId,
            product_type: productType,
            description: description || null,
            image_url: displayUrl || null,
            og_image_url: ogImageUrl || displayUrl || null,
            images: imagesArray,
            keywords,
            customisation_options: customisationOptions,
            featured,
            visible,
            updated_at: new Date().toISOString()
          };
        }
        setSuccessMessage('Changes saved in Mock Mode!');
        setTimeout(() => router.push('/admin/products'), 800);
        return;
      }

      const { error } = await supabase
        .from('products')
        .update({
          name: name.trim(),
          category_id: categoryId,
          product_type: productType,
          description: description.trim() || null,
          image_url: displayUrl || null,
          og_image_url: ogImageUrl || displayUrl || null,
          images: imagesArray,
          keywords,
          customisation_options: customisationOptions,
          featured,
          visible,
          updated_at: new Date().toISOString()
        })
        .eq('id', productId);

      if (error) throw error;

      setSuccessMessage('Piece successfully updated!');
      setTimeout(() => router.push('/admin/products'), 800);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update piece.';
      setErrorMessage(msg);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to remove this piece from your catalogue?')) {
      return;
    }

    try {
      if (isSupabaseConfigured && supabase) {
        await supabase
          .from('products')
          .update({ deleted_at: new Date().toISOString(), visible: false })
          .eq('id', productId);
      } else {
        const idx = MOCK_PRODUCTS.findIndex((p) => p.id === productId);
        if (idx !== -1) {
          MOCK_PRODUCTS.splice(idx, 1);
        }
      }
      router.push('/admin/products');
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  if (loading) {
    return (
      <div className="loading-card">
        <div className="spinner" />
        <p>Loading piece details...</p>
        <style jsx>{`
          .loading-card {
            padding: 3rem;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            color: var(--text-muted);
          }
          .spinner {
            width: 28px;
            height: 28px;
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

  return (
    <div className="edit-product-view">
      <div className="page-nav">
        <Link href="/admin/products" className="btn-back">
          <ArrowLeft size={16} />
          <span>Back to Pieces</span>
        </Link>
      </div>

      <div className="form-card">
        <div className="form-head">
          <div>
            <h1 className="form-title">Edit Piece</h1>
            <p className="form-sub">Update photo, customisation presets, and visibility.</p>
          </div>

          <button
            type="button"
            onClick={handleDelete}
            className="btn-delete-piece"
            title="Delete piece"
          >
            <Trash2 size={16} />
            <span>Delete</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-section">
            <label className="section-label">Photo &amp; WhatsApp Card</label>
            <ImageUploader
              onImagesReady={handleImagesReady}
              initialDisplayUrl={displayUrl}
              initialOgImageUrl={ogImageUrl}
            />
          </div>

          <div className="form-section">
            <label className="section-label">Piece Name &amp; Category</label>

            <div className="form-field">
              <label className="field-label" htmlFor="edit-piece-name">Piece Name *</label>
              <input
                id="edit-piece-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="input-text"
              />
            </div>

            <div className="grid-2-col">
              <div className="form-field">
                <label className="field-label" htmlFor="edit-piece-category">Category *</label>
                <select
                  id="edit-piece-category"
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="input-select"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label className="field-label" htmlFor="edit-piece-type">Production Model</label>
                <select
                  id="edit-piece-type"
                  value={productType}
                  onChange={(e) => setProductType(e.target.value as ProductType)}
                  className="input-select"
                >
                  <option value="made_to_order">Made to Order (Custom)</option>
                  <option value="ready_stock">Ready Stock (Immediate)</option>
                </select>
              </div>
            </div>

            <div className="form-field">
              <label className="field-label" htmlFor="edit-piece-desc">Description</label>
              <textarea
                id="edit-piece-desc"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input-textarea"
              />
            </div>
          </div>

          <div className="form-section">
            <div className="label-with-hint">
              <label className="section-label" htmlFor="edit-piece-keywords">Search Keywords / Tags</label>
              <span className="hint">Comma-separated</span>
            </div>
            <input
              id="edit-piece-keywords"
              type="text"
              value={keywordsInput}
              onChange={(e) => setKeywordsInput(e.target.value)}
              className="input-text"
            />
          </div>

          <div className="form-section">
            <label className="section-label">Customisation Presets</label>

            <div className="form-field">
              <label className="field-label" htmlFor="edit-piece-wood">Wood Varieties</label>
              <input
                id="edit-piece-wood"
                type="text"
                value={woodOptions}
                onChange={(e) => setWoodOptions(e.target.value)}
                className="input-text"
              />
            </div>

            <div className="form-field">
              <label className="field-label" htmlFor="edit-piece-finish">Finish Varieties</label>
              <input
                id="edit-piece-finish"
                type="text"
                value={finishOptions}
                onChange={(e) => setFinishOptions(e.target.value)}
                className="input-text"
              />
            </div>

            <div className="form-field">
              <label className="field-label" htmlFor="edit-piece-size">Dimensions Note</label>
              <input
                id="edit-piece-size"
                type="text"
                value={sizeNotes}
                onChange={(e) => setSizeNotes(e.target.value)}
                className="input-text"
              />
            </div>
          </div>

          <div className="form-section toggle-section">
            <label className="toggle-item">
              <input
                type="checkbox"
                checked={visible}
                onChange={(e) => setVisible(e.target.checked)}
                className="toggle-checkbox"
              />
              <span className="toggle-text">
                <strong>Visible in Public Catalogue</strong>
                <small>Customers can view and enquire on WhatsApp</small>
              </span>
            </label>

            <label className="toggle-item">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="toggle-checkbox"
              />
              <span className="toggle-text">
                <strong>Feature in Highlights</strong>
                <small>Placed in top New Arrivals showcase</small>
              </span>
            </label>
          </div>

          {errorMessage && (
            <div className="alert error">
              <AlertCircle size={16} />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="alert success">
              <CheckCircle2 size={16} />
              <span>{successMessage}</span>
            </div>
          )}

          <div className="form-actions">
            <button
              type="submit"
              disabled={isSaving}
              className="btn-save"
            >
              <Save size={18} />
              <span>{isSaving ? 'Saving Changes...' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .edit-product-view {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .btn-back {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          color: var(--text-muted);
          font-size: 0.85rem;
          font-weight: 600;
          text-decoration: none;
          min-height: 44px;
        }

        .btn-back:hover {
          color: var(--text-primary);
        }

        .form-card {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
        }

        .form-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 1rem;
          gap: 1rem;
        }

        .form-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .form-sub {
          font-size: 0.8rem;
          color: var(--text-muted);
          margin-top: 0.2rem;
        }

        .btn-delete-piece {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background-color: #FEE2E2;
          color: #DC2626;
          border: 1px solid #FCA5A5;
          padding: 0.45rem 0.85rem;
          border-radius: var(--radius-md);
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          min-height: 44px;
        }

        .product-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-section {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .section-label {
          font-size: 0.875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: var(--accent-primary);
        }

        .label-with-hint {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .hint {
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .field-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .input-text,
        .input-select,
        .input-textarea {
          width: 100%;
          border: 1.5px solid var(--border-subtle);
          border-radius: var(--radius-md);
          background-color: var(--bg-surface);
          color: var(--text-primary);
          padding: 0.65rem 0.85rem;
          font-size: 0.9rem;
          outline: none;
          min-height: 46px;
        }

        .input-text:focus,
        .input-select:focus,
        .input-textarea:focus {
          border-color: var(--accent-primary);
        }

        .input-textarea {
          resize: vertical;
          min-height: 80px;
          font-family: inherit;
        }

        .grid-2-col {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.85rem;
        }

        @media (max-width: 540px) {
          .grid-2-col {
            grid-template-columns: 1fr;
          }
        }

        .toggle-section {
          background-color: var(--bg-surface-secondary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 1rem;
          gap: 1rem;
        }

        .toggle-item {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          cursor: pointer;
        }

        .toggle-checkbox {
          width: 20px;
          height: 20px;
          margin-top: 0.15rem;
          accent-color: var(--accent-primary);
          flex-shrink: 0;
        }

        .toggle-text strong {
          display: block;
          font-size: 0.85rem;
          color: var(--text-primary);
        }

        .toggle-text small {
          display: block;
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        .alert {
          padding: 0.75rem 1rem;
          border-radius: var(--radius-md);
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .alert.error {
          background-color: #FEE2E2;
          color: #991B1B;
          border: 1px solid #FCA5A5;
        }

        .alert.success {
          background-color: #ECFDF5;
          color: #065F46;
          border: 1px solid #A7F3D0;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          padding-top: 0.5rem;
        }

        .btn-save {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background-color: var(--accent-primary);
          color: #FFFFFF;
          border: none;
          border-radius: var(--radius-md);
          padding: 0.85rem 1.75rem;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          min-height: 48px;
          width: 100%;
        }

        .btn-save:hover {
          background-color: var(--accent-hover);
        }
      `}</style>
    </div>
  );
}
