'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Camera, Image as ImageIcon, Plus, Trash2, Eye, EyeOff, Save, CheckCircle2, AlertCircle } from 'lucide-react';
import ImageUploader from '@/components/admin/ImageUploader';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';
import { MOCK_GALLERY } from '@/lib/mock-data';
import { GalleryItem, GalleryItemType } from '@/types/database';

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [itemType, setItemType] = useState<GalleryItemType>('showroom');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadGallery() {
      setLoading(true);
      try {
        if (!isSupabaseConfigured || !supabase) {
          setItems(MOCK_GALLERY);
        } else {
          const { data, error } = await supabase
            .from('gallery_items')
            .select('*')
            .order('sort_order', { ascending: true });

          if (!error && data) {
            setItems(data as GalleryItem[]);
          } else {
            setItems(MOCK_GALLERY);
          }
        }
      } catch {
        setItems(MOCK_GALLERY);
      } finally {
        setLoading(false);
      }
    }

    loadGallery();
  }, []);

  const handleToggleVisibility = async (id: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, visible: newStatus } : i))
    );

    if (isSupabaseConfigured && supabase) {
      await supabase
        .from('gallery_items')
        .update({ visible: newStatus })
        .eq('id', id);
    }
    setStatusMessage('Gallery photo visibility updated');
    setTimeout(() => setStatusMessage(null), 2000);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this photo from the gallery?')) return;

    setItems((prev) => prev.filter((i) => i.id !== id));

    if (isSupabaseConfigured && supabase) {
      await supabase.from('gallery_items').delete().eq('id', id);
    }
  };

  const handleCreateItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedUrl) {
      alert('Please upload or snap a photo first.');
      return;
    }

    const newItem: GalleryItem = {
      id: `gal-${Date.now()}`,
      image_url: uploadedUrl,
      caption: caption.trim() || null,
      item_type: itemType,
      sort_order: items.length + 1,
      visible: true,
      created_at: new Date().toISOString()
    };

    if (!isSupabaseConfigured || !supabase) {
      setItems((prev) => [newItem, ...prev]);
      setUploadedUrl('');
      setCaption('');
      setIsAddingNew(false);
      setStatusMessage('Photo saved in Mock Mode');
      setTimeout(() => setStatusMessage(null), 2000);
      return;
    }

    const { data, error } = await supabase
      .from('gallery_items')
      .insert({
        image_url: uploadedUrl,
        caption: caption.trim() || null,
        item_type: itemType,
        sort_order: items.length + 1,
        visible: true
      })
      .select()
      .single();

    if (!error && data) {
      setItems((prev) => [data as GalleryItem, ...prev]);
      setUploadedUrl('');
      setCaption('');
      setIsAddingNew(false);
      setStatusMessage('Photo published to gallery');
      setTimeout(() => setStatusMessage(null), 2000);
    }
  };

  return (
    <div className="admin-gallery-view">
      <div className="page-head">
        <div>
          <h1 className="page-title">Showroom Gallery</h1>
          <p className="page-sub">Upload showroom floor captures and finished custom orders</p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddingNew(!isAddingNew)}
          className="btn-add-photo"
        >
          <Plus size={18} />
          <span>{isAddingNew ? 'Close' : 'Add Photo'}</span>
        </button>
      </div>

      {statusMessage && (
        <div className="status-toast">
          <CheckCircle2 size={16} />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Add Photo Panel */}
      {isAddingNew && (
        <div className="add-panel">
          <h2 className="panel-title">Upload Showroom Snapshot</h2>
          <form onSubmit={handleCreateItem} className="gallery-form">
            <ImageUploader onImagesReady={(display) => setUploadedUrl(display)} />

            <div className="form-field">
              <label className="field-label" htmlFor="photo-type">Photo Category Tag</label>
              <select
                id="photo-type"
                value={itemType}
                onChange={(e) => setItemType(e.target.value as GalleryItemType)}
                className="input-select"
              >
                <option value="showroom">Showroom Floor Display</option>
                <option value="finished_work">Finished Custom Order</option>
                <option value="new_arrival">New Arrival Feature</option>
              </select>
            </div>

            <div className="form-field">
              <label className="field-label" htmlFor="photo-caption">Caption</label>
              <input
                id="photo-caption"
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="e.g. 6-Seater Solid Teak Dining Set delivered to client in Kangeyam"
                className="input-text"
              />
            </div>

            <button type="submit" disabled={!uploadedUrl} className="btn-save-photo">
              <Save size={16} />
              <span>Publish Photo to Gallery</span>
            </button>
          </form>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="gallery-grid">
        {loading ? (
          <div className="loading-state">
            <div className="spinner" />
            <p>Loading gallery photos...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="empty-state">
            <ImageIcon size={32} />
            <p>No gallery photos uploaded yet.</p>
          </div>
        ) : (
          items.map((item) => (
            <div key={item.id} className={`gallery-card ${!item.visible ? 'hidden-item' : ''}`}>
              <div className="card-media">
                <Image
                  src={item.image_url}
                  alt={item.caption || 'Showroom Photo'}
                  width={360}
                  height={240}
                  className="card-img"
                  unoptimized
                />
                <span className={`tag-badge ${item.item_type}`}>
                  {item.item_type === 'finished_work'
                    ? 'Finished Work'
                    : item.item_type === 'new_arrival'
                    ? 'New Arrival'
                    : 'Showroom'}
                </span>
              </div>

              <div className="card-body">
                <p className="caption-text">{item.caption || 'No caption'}</p>

                <div className="card-actions">
                  <button
                    type="button"
                    onClick={() => handleToggleVisibility(item.id, item.visible)}
                    className={`btn-action btn-vis ${item.visible ? 'visible' : 'hidden'}`}
                    aria-label={item.visible ? 'Hide photo' : 'Show photo'}
                  >
                    {item.visible ? <Eye size={16} /> : <EyeOff size={16} />}
                    <span>{item.visible ? 'Visible' : 'Hidden'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="btn-action btn-del"
                    aria-label="Delete photo"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <style jsx>{`
        .admin-gallery-view {
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

        .btn-add-photo {
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

        .add-panel {
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

        .gallery-form {
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

        .input-select,
        .input-text {
          width: 100%;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          padding: 0.65rem 0.85rem;
          font-size: 0.9rem;
          outline: none;
          min-height: 44px;
        }

        .btn-save-photo {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          background-color: var(--accent-primary);
          color: #FFFFFF;
          border: none;
          border-radius: var(--radius-md);
          min-height: 46px;
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          margin-top: 0.5rem;
        }

        .btn-save-photo:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
        }

        @media (max-width: 580px) {
          .gallery-grid {
            grid-template-columns: 1fr;
          }
        }

        .gallery-card {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
        }

        .gallery-card.hidden-item {
          opacity: 0.65;
        }

        .card-media {
          position: relative;
          aspect-ratio: 4 / 3;
          width: 100%;
          background-color: #1C1917;
        }

        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .tag-badge {
          position: absolute;
          top: 0.5rem;
          left: 0.5rem;
          font-size: 0.68rem;
          font-weight: 700;
          padding: 0.2rem 0.5rem;
          border-radius: var(--radius-full);
          background-color: rgba(28, 25, 23, 0.8);
          color: #FFFFFF;
        }

        .tag-badge.finished_work {
          background-color: rgba(139, 90, 43, 0.9);
        }

        .tag-badge.new_arrival {
          background-color: rgba(4, 120, 87, 0.9);
        }

        .card-body {
          padding: 0.75rem;
        }

        .caption-text {
          font-size: 0.825rem;
          color: var(--text-primary);
          line-height: 1.4;
          margin-bottom: 0.65rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.5rem;
          border-top: 1px solid var(--border-subtle);
        }

        .btn-action {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          min-height: 44px;
          border-radius: var(--radius-sm);
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          border: 1px solid transparent;
        }

        .btn-vis.visible {
          background-color: #ECFDF5;
          color: #047857;
          border-color: #A7F3D0;
          padding: 0 0.65rem;
        }

        .btn-vis.hidden {
          background-color: #F3F4F6;
          color: #6B7280;
          border-color: #D1D5DB;
          padding: 0 0.65rem;
        }

        .btn-del {
          background: none;
          color: #DC2626;
          padding: 0 0.5rem;
        }

        .loading-state,
        .empty-state {
          grid-column: 1 / -1;
          padding: 3rem;
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
