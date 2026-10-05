'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setLoading(true);

    try {
      if (!isSupabaseConfigured || !supabase) {
        // Mock mode login bypass
        router.push('/admin');
        return;
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data.session) {
        router.push('/admin');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid credentials. Please check and try again.';
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleMockLogin = () => {
    router.push('/admin');
  };

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-head">
          <div className="logo-badge">
            <ShieldCheck size={28} className="shield-icon" />
          </div>
          <h1 className="login-title">INHOME Admin</h1>
          <p className="login-sub">Showroom Owner Management Portal</p>
        </div>

        {!isSupabaseConfigured && (
          <div className="mock-mode-notice">
            <AlertCircle size={16} className="notice-icon" />
            <div>
              <p className="notice-title">Local Mock Mode</p>
              <p className="notice-text">
                Supabase credentials not configured in .env.local. You can enter mock admin mode directly.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label className="input-label" htmlFor="admin-email">Owner Email</label>
            <div className="input-field-box">
              <Mail size={18} className="field-icon" />
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isSupabaseConfigured ? 'owner@inhomefurniture.in' : 'owner@inhomefurniture.in (Optional)'}
                required={isSupabaseConfigured}
                className="text-input"
                autoComplete="email"
              />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label" htmlFor="admin-password">Password</label>
            <div className="input-field-box">
              <Lock size={18} className="field-icon" />
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required={isSupabaseConfigured}
                className="text-input"
                autoComplete="current-password"
              />
            </div>
          </div>

          {errorMessage && (
            <div className="error-banner">
              <AlertCircle size={16} />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-submit"
          >
            {loading ? (
              <span className="btn-loading-text">Signing in...</span>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight size={17} />
              </>
            )}
          </button>

          {!isSupabaseConfigured && (
            <button
              type="button"
              onClick={handleMockLogin}
              className="btn-mock-enter"
            >
              <span>Explore Admin in Mock Mode</span>
            </button>
          )}
        </form>
      </div>

      <style jsx>{`
        .login-screen {
          min-height: 100vh;
          background: linear-gradient(180deg, #FAF8F5 0%, #F3EFEA 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .login-card {
          width: 100%;
          max-width: 420px;
          background-color: #FFFFFF;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-lg);
          padding: 2.25rem 1.75rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
        }

        .login-head {
          text-align: center;
          margin-bottom: 1.75rem;
        }

        .logo-badge {
          width: 56px;
          height: 56px;
          background-color: var(--accent-subtle);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }

        .shield-icon {
          color: var(--accent-primary);
        }

        .login-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
          letter-spacing: -0.02em;
        }

        .login-sub {
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .mock-mode-notice {
          display: flex;
          gap: 0.65rem;
          background-color: #FEF3C7;
          border: 1px solid #FDE68A;
          border-radius: var(--radius-md);
          padding: 0.75rem;
          margin-bottom: 1.5rem;
          color: #92400E;
        }

        .notice-icon {
          flex-shrink: 0;
          margin-top: 0.15rem;
        }

        .notice-title {
          font-size: 0.8rem;
          font-weight: 700;
          margin-bottom: 0.15rem;
        }

        .notice-text {
          font-size: 0.75rem;
          line-height: 1.35;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .input-label {
          font-size: 0.825rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .input-field-box {
          display: flex;
          align-items: center;
          border: 1.5px solid var(--border-subtle);
          border-radius: var(--radius-md);
          background-color: var(--bg-surface);
          padding: 0 0.85rem;
          min-height: 48px;
          transition: border-color 0.15s ease;
        }

        .input-field-box:focus-within {
          border-color: var(--accent-primary);
        }

        .field-icon {
          color: var(--text-muted);
          margin-right: 0.65rem;
          flex-shrink: 0;
        }

        .text-input {
          flex: 1;
          border: none;
          background: transparent;
          font-size: 0.95rem;
          color: var(--text-primary);
          outline: none;
          min-height: 44px;
        }

        .error-banner {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background-color: #FEE2E2;
          color: #991B1B;
          border: 1px solid #FCA5A5;
          padding: 0.65rem 0.85rem;
          border-radius: var(--radius-md);
          font-size: 0.8rem;
          font-weight: 600;
        }

        .btn-submit {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background-color: var(--accent-primary);
          color: #FFFFFF;
          border: none;
          border-radius: var(--radius-md);
          min-height: 48px;
          font-size: 0.95rem;
          font-weight: 700;
          cursor: pointer;
          margin-top: 0.5rem;
          transition: background-color 0.15s ease;
        }

        .btn-submit:hover {
          background-color: var(--accent-hover);
        }

        .btn-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .btn-mock-enter {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: var(--bg-surface-secondary);
          color: var(--text-primary);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          min-height: 44px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.15s ease;
        }

        .btn-mock-enter:hover {
          background-color: #E7E2DA;
        }
      `}</style>
    </div>
  );
}
