'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';
import { getCategories, isSupabaseConfigured, supabase } from '@/lib/supabase';
import { getMockCategories, MOCK_PRODUCTS } from '@/lib/mock-data';
import { Category, ProductType } from '@/types/database';

export default function NewProductPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
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
  const [woodOptions, setWoodOptions] = useState('Teak Wood, Country Wood, Rosewood Finish');
  const [finishOptions, setFinishOptions] = useState('Natural Matte, Teak Brown Gloss, Dark Walnut');
  const [sizeNotes, setSizeNotes] = useState('Custom dimensions tailored to your room specifications');
  const [featured, setFeatured] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const cats = await getCategories();
        setCategories(cats);
        if (cats.length > 0) {
          setCategoryId(cats[0].id);
        }
      } catch {
        const mockCats = getMockCategories();
        setCategories(mockCats);
        if (mockCats.length > 0) {
          setCategoryId(mockCats[0].id);
        }
      }
    }
    loadCategories();
  }, []);

  const handleImagesReady = (display: string, og: string) => {
    setDisplayUrl(display);
    setOgImageUrl(og);
  };

  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!name.trim()) {
      setErrorMessage('Please enter a product name.');
      return;
    }

    if (!categoryId) {
      setErrorMessage('Please choose a category.');
      return;
    }

    setLoading(true);

    try {
      const slug = generateSlug(name);
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
        // Mock mode: add to in-memory array
        const newProduct = {
          id: `prod-${Date.now()}`,
          category_id: categoryId,
          name: name.trim(),
          slug,
          description: description.trim() || null,
          images: imagesArray,
          image_url: displayUrl || null,
          og_image_url: ogImageUrl || displayUrl || null,
          keywords,
          customisation_options: customisationOptions,
          product_type: productType,
          featured,
          visible,
          sort_order: 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        MOCK_PRODUCTS.unshift(newProduct);
        setSuccessMessage('Product created successfully in Mock Mode!');
        setTimeout(() => router.push('/admin/products'), 1000);
        return;
      }

      // Live Supabase Insert
      const { error } = await supabase.from('products').insert({
        category_id: categoryId,
        name: name.trim(),
        slug,
        description: description.trim() || null,
        images: imagesArray,
        image_url: displayUrl || null,
        og_image_url: ogImageUrl || displayUrl || null,
        keywords,
        customisation_options: customisationOptions,
        product_type: productType,
        featured,
        visible,
        sort_order: 0
      });

      if (error) {
        throw error;
      }

      setSuccessMessage('Piece successfully published to the catalogue!');
      setTimeout(() => router.push('/admin/products'), 1000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to publish piece.';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="new-product-view">
      <div className="page-nav">
        <Link href="/admin/products" className="btn-back">
          <ArrowLeft size={16} />
          <span>Back to Pieces</span>
        </Link>
      </div>

      <div className="form-card">
        <div className="form-head">
          <h1 className="form-title">Add Showroom Piece</h1>
          <p className="form-sub">
            Capture a showroom photo on your phone, set specifications, and publish instantly.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="product-form">
          {/* 1. Dual-Output Image Uploader */}
          <div className="form-section">
            <label className="section-label">Photo &amp; WhatsApp Card</label>
            <ImageUploader onImagesReady={handleImagesReady} />
          </div>

          {/* 2. Core Details */}
          <div className="form-section">
            <label className="section-label">Piece Name &amp; Category</label>

            <div className="form-field">
              <label className="field-label" htmlFor="piece-name">Piece Name *</label>
              <input
                id="piece-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Royal Chesterfield 3-Seater Sofa"
                required
                className="input-text"
              />
            </div>

            <div className="grid-2-col">
              <div className="form-field">
                <label className="field-label" htmlFor="piece-category">Category *</label>
                <select
                  id="piece-category"
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
                <label className="field-label" htmlFor="piece-type">Production Model</label>
                <select
                  id="piece-type"
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
              <label className="field-label" htmlFor="piece-desc">Description</label>
              <textarea
                id="piece-desc"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Craftsmanship details, timber grade, headboard or cushion features..."
                className="input-textarea"
              />
            </div>
          </div>

          {/* 3. Search Engine Keywords */}
          <div className="form-section">
            <div className="label-with-hint">
              <label className="section-label" htmlFor="piece-keywords">Search Keywords / Tags</label>
              <span className="hint">Used by the client-side search box</span>
            </div>
            <input
              id="piece-keywords"
              type="text"
              value={keywordsInput}
              onChange={(e) => setKeywordsInput(e.target.value)}
              placeholder="e.g. sofa, teak, 3 seater, living room, chesterfield"
              className="input-text"
            />
          </div>

          {/* 4. Customisation Attributes */}
          <div className="form-section">
            <label className="section-label">Customisation Presets</label>

            <div className="form-field">
              <label className="field-label" htmlFor="piece-wood">Wood Varieties (comma separated)</label>
              <input
                id="piece-wood"
                type="text"
                value={woodOptions}
                onChange={(e) => setWoodOptions(e.target.value)}
                className="input-text"
              />
            </div>

            <div className="form-field">
              <label className="field-label" htmlFor="piece-finish">Finish Varieties (comma separated)</label>
              <input
                id="piece-finish"
                type="text"
                value={finishOptions}
                onChange={(e) => setFinishOptions(e.target.value)}
                className="input-text"
              />
            </div>

            <div className="form-field">
              <label className="field-label" htmlFor="piece-size">Dimensions / Size Note</label>
              <input
                id="piece-size"
                type="text"
                value={sizeNotes}
                onChange={(e) => setSizeNotes(e.target.value)}
                className="input-text"
              />
            </div>
          </div>

          {/* 5. Visibility & Highlights */}
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
                <small>When unchecked, only visible to admin</small>
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
                <strong>Feature in Highlights Carousel</strong>
                <small>Displays in top new arrivals row for Instagram traffic</small>
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
              disabled={loading}
              className="btn-publish"
            >
              <Save size={18} />
              <span>{loading ? 'Publishing...' : 'Save & Publish Piece'}</span>
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .new-product-view {
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
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
        }

        .form-head {
          margin-bottom: 1.5rem;
          border-bottom: 1px solid var(--border-subtle);
          padding-bottom: 1rem;
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
          transition: border-color 0.15s ease;
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

        .btn-publish {
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
          transition: background-color 0.15s ease;
        }

        .btn-publish:hover {
          background-color: var(--accent-hover);
        }

        .btn-publish:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
