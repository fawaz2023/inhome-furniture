'use client';

import React, { useState, useRef } from 'react';
import { Camera, UploadCloud, CheckCircle2, AlertTriangle, X, Image as ImageIcon } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface ImageUploaderProps {
  onImagesReady: (displayUrl: string, ogImageUrl: string) => void;
  initialDisplayUrl?: string;
  initialOgImageUrl?: string;
}

interface CompressedResult {
  blob: Blob;
  dataUrl: string;
  width: number;
  height: number;
  sizeKb: number;
}

export default function ImageUploader({
  onImagesReady,
  initialDisplayUrl,
  initialOgImageUrl
}: ImageUploaderProps) {
  const [displayUrl, setDisplayUrl] = useState<string>(initialDisplayUrl || '');
  const [ogImageUrl, setOgImageUrl] = useState<string>(initialOgImageUrl || '');
  const [displaySizeKb, setDisplaySizeKb] = useState<number | null>(null);
  const [ogSizeKb, setOgSizeKb] = useState<number | null>(null);

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  /**
   * Resizes an image file to display version (long edge <= 1600px, WebP)
   */
  const compressDisplayVersion = (img: HTMLImageElement): Promise<CompressedResult> => {
    return new Promise((resolve, reject) => {
      try {
        const canvas = document.createElement('canvas');
        const maxEdge = 1600;
        let width = img.naturalWidth;
        let height = img.naturalHeight;

        if (width > maxEdge || height > maxEdge) {
          if (width > height) {
            height = Math.round((height * maxEdge) / width);
            width = maxEdge;
          } else {
            width = Math.round((width * maxEdge) / height);
            height = maxEdge;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not get 2D canvas context');

        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (!blob) return reject(new Error('Canvas display compression failed'));
            const sizeKb = Math.round(blob.size / 1024);
            const dataUrl = canvas.toDataURL('image/webp', 0.85);
            resolve({ blob, dataUrl, width, height, sizeKb });
          },
          'image/webp',
          0.85
        );
      } catch (err) {
        reject(err);
      }
    });
  };

  /**
   * Crops and resizes image to WhatsApp OG preview standard (1200x630, strictly < 300 KB)
   */
  const compressOgVersion = (img: HTMLImageElement): Promise<CompressedResult> => {
    return new Promise((resolve, reject) => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 1200;
        canvas.height = 630;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not get 2D canvas context');

        // Center crop math for 1200:630 (1.904:1)
        const targetAspect = 1200 / 630;
        const sourceAspect = img.naturalWidth / img.naturalHeight;
        let srcX = 0;
        let srcY = 0;
        let srcWidth = img.naturalWidth;
        let srcHeight = img.naturalHeight;

        if (sourceAspect > targetAspect) {
          // Wider than target: crop horizontal sides
          srcWidth = Math.round(img.naturalHeight * targetAspect);
          srcX = Math.round((img.naturalWidth - srcWidth) / 2);
        } else {
          // Taller than target: crop top/bottom
          srcHeight = Math.round(img.naturalWidth / targetAspect);
          srcY = Math.round((img.naturalHeight - srcHeight) / 2);
        }

        ctx.drawImage(img, srcX, srcY, srcWidth, srcHeight, 0, 0, 1200, 630);

        const tryQuality = (quality: number) => {
          canvas.toBlob(
            (blob) => {
              if (!blob) return reject(new Error('Canvas OG compression failed'));
              const sizeKb = Math.round(blob.size / 1024);

              // Strict AGENTS.md rule: OG image must be strictly < 300 KB
              if (sizeKb > 300 && quality > 0.5) {
                // Retry with reduced quality
                tryQuality(quality - 0.15);
              } else if (sizeKb > 300) {
                reject(
                  new Error(
                    `OG Preview image (${sizeKb} KB) exceeds the strict 300 KB WhatsApp crawler limit even after compression.`
                  )
                );
              } else {
                const dataUrl = canvas.toDataURL('image/webp', quality);
                resolve({ blob, dataUrl, width: 1200, height: 630, sizeKb });
              }
            },
            'image/webp',
            quality
          );
        };

        tryQuality(0.82);
      } catch (err) {
        reject(err);
      }
    });
  };

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select an image file (JPG, PNG, or WebP).');
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      // 1. Load image into HTMLImageElement
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load image file.'));
        img.src = objectUrl;
      });

      // 2. Browser-side compression BEFORE upload
      const [displayRes, ogRes] = await Promise.all([
        compressDisplayVersion(img),
        compressOgVersion(img)
      ]);

      URL.revokeObjectURL(objectUrl);

      setDisplaySizeKb(displayRes.sizeKb);
      setOgSizeKb(ogRes.sizeKb);

      // 3. Upload to Supabase Storage if configured; otherwise use dataUrl/blobUrl
      let finalDisplayUrl = displayRes.dataUrl;
      let finalOgUrl = ogRes.dataUrl;

      if (isSupabaseConfigured && supabase) {
        const timestamp = Date.now();
        const rand = Math.random().toString(36).substring(2, 7);
        const displayPath = `products/${timestamp}-${rand}-display.webp`;
        const ogPath = `products/${timestamp}-${rand}-og.webp`;

        // Upload Display version
        const { error: displayErr } = await supabase.storage
          .from('catalogue-images')
          .upload(displayPath, displayRes.blob, {
            contentType: 'image/webp',
            cacheControl: '31536000'
          });

        if (displayErr) throw new Error(`Display upload failed: ${displayErr.message}`);

        // Upload OG version
        const { error: ogErr } = await supabase.storage
          .from('catalogue-images')
          .upload(ogPath, ogRes.blob, {
            contentType: 'image/webp',
            cacheControl: '31536000'
          });

        if (ogErr) throw new Error(`OG preview upload failed: ${ogErr.message}`);

        const { data: displayPub } = supabase.storage.from('catalogue-images').getPublicUrl(displayPath);
        const { data: ogPub } = supabase.storage.from('catalogue-images').getPublicUrl(ogPath);

        finalDisplayUrl = displayPub.publicUrl;
        finalOgUrl = ogPub.publicUrl;
      }

      setDisplayUrl(finalDisplayUrl);
      setOgImageUrl(finalOgUrl);
      setSuccessMessage('Photo successfully compressed and prepared!');
      onImagesReady(finalDisplayUrl, finalOgUrl);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Photo processing failed.';
      setErrorMessage(msg);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClear = () => {
    setDisplayUrl('');
    setOgImageUrl('');
    setDisplaySizeKb(null);
    setOgSizeKb(null);
    setErrorMessage(null);
    setSuccessMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
    onImagesReady('', '');
  };

  return (
    <div className="image-uploader-wrapper">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden-file-input"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        }}
      />

      {/* Smartphone camera direct trigger */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden-file-input"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        }}
      />

      {!displayUrl ? (
        <div className="upload-dropzone">
          <div className="dropzone-icon-circle">
            <UploadCloud size={28} className="dropzone-icon" />
          </div>
          <p className="dropzone-title">Add Product Photo</p>
          <p className="dropzone-subtitle">
            Compressed in-browser before upload. Generates a display copy and a lightweight (&lt;300 KB) WhatsApp preview.
          </p>

          <div className="upload-buttons-row">
            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              disabled={isProcessing}
              className="btn-upload btn-camera"
            >
              <Camera size={18} />
              <span>Take Photo</span>
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
              className="btn-upload btn-gallery"
            >
              <ImageIcon size={18} />
              <span>Choose File</span>
            </button>
          </div>

          {isProcessing && (
            <div className="processing-indicator">
              <div className="uploader-spinner" />
              <span>Compressing photo to 1600px display + WhatsApp OG card...</span>
            </div>
          )}
        </div>
      ) : (
        <div className="preview-container">
          <div className="preview-header">
            <span className="preview-title">Photo Prepared &amp; Verified</span>
            <button
              type="button"
              onClick={handleClear}
              className="btn-remove-photo"
              aria-label="Remove and re-take photo"
            >
              <X size={16} />
              <span>Replace</span>
            </button>
          </div>

          <div className="preview-grid">
            {/* Display Version Preview */}
            <div className="preview-card">
              <div className="preview-img-box">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={displayUrl} alt="Display preview" className="preview-img" />
              </div>
              <div className="preview-info">
                <span className="preview-label">Display Version (WebP)</span>
                <span className="preview-specs">
                  Long edge &le; 1600px • {displaySizeKb ? `${displaySizeKb} KB` : 'Optimized'}
                </span>
              </div>
            </div>

            {/* OG Preview Version */}
            <div className="preview-card">
              <div className="preview-img-box og-box">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ogImageUrl || displayUrl} alt="WhatsApp OG preview" className="preview-img" />
              </div>
              <div className="preview-info">
                <span className="preview-label">WhatsApp Preview Card (1200&times;630)</span>
                <span className="preview-specs verified">
                  <CheckCircle2 size={13} className="text-success" />
                  {ogSizeKb ? `${ogSizeKb} KB` : '&lt; 300 KB'} (Guaranteed unfurl)
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="upload-alert error">
          <AlertTriangle size={18} className="alert-icon" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="upload-alert success">
          <CheckCircle2 size={18} className="alert-icon" />
          <span>{successMessage}</span>
        </div>
      )}

      <style jsx>{`
        .image-uploader-wrapper {
          width: 100%;
          margin-bottom: 1.25rem;
        }

        .hidden-file-input {
          display: none;
        }

        .upload-dropzone {
          border: 2px dashed var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 1.75rem 1rem;
          background-color: var(--bg-surface);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: border-color 0.2s ease, background-color 0.2s ease;
        }

        .upload-dropzone:hover {
          border-color: var(--accent-primary);
          background-color: var(--bg-surface-secondary);
        }

        .dropzone-icon-circle {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background-color: var(--accent-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.75rem;
        }

        .dropzone-icon {
          color: var(--accent-primary);
        }

        .dropzone-title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }

        .dropzone-subtitle {
          font-size: 0.8rem;
          color: var(--text-muted);
          max-width: 420px;
          line-height: 1.4;
          margin-bottom: 1.25rem;
        }

        .upload-buttons-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .btn-upload {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          min-height: 48px;
          border-radius: var(--radius-md);
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s ease;
          border: none;
        }

        .btn-camera {
          background-color: var(--accent-primary);
          color: #FFFFFF;
        }

        .btn-camera:hover {
          background-color: var(--accent-hover);
        }

        .btn-gallery {
          background-color: var(--bg-surface-secondary);
          color: var(--text-primary);
          border: 1px solid var(--border-subtle);
        }

        .btn-gallery:hover {
          background-color: #E7E2DA;
        }

        .processing-indicator {
          margin-top: 1.25rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--accent-primary);
        }

        .uploader-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid var(--accent-subtle);
          border-top-color: var(--accent-primary);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .preview-container {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 1rem;
        }

        .preview-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .preview-title {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .btn-remove-photo {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: none;
          border: none;
          color: #DC2626;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          min-height: 44px;
          padding: 0 0.5rem;
        }

        .preview-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.75rem;
        }

        @media (max-width: 480px) {
          .preview-grid {
            grid-template-columns: 1fr;
          }
        }

        .preview-card {
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          overflow: hidden;
          background-color: var(--bg-surface-secondary);
        }

        .preview-img-box {
          height: 120px;
          width: 100%;
          overflow: hidden;
          background-color: #1C1917;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .preview-img-box.og-box {
          aspect-ratio: 1200 / 630;
          height: auto;
          max-height: 120px;
        }

        .preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .preview-info {
          padding: 0.5rem 0.65rem;
        }

        .preview-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .preview-specs {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.7rem;
          color: var(--text-muted);
          margin-top: 0.2rem;
        }

        .preview-specs.verified {
          color: #047857;
          font-weight: 600;
        }

        .upload-alert {
          margin-top: 0.75rem;
          padding: 0.65rem 0.85rem;
          border-radius: var(--radius-md);
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .upload-alert.error {
          background-color: #FEF2F2;
          color: #991B1B;
          border: 1px solid #FCA5A5;
        }

        .upload-alert.success {
          background-color: #ECFDF5;
          color: #065F46;
          border: 1px solid #A7F3D0;
        }
      `}</style>
    </div>
  );
}
