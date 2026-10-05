'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  FolderTree, 
  Image as GalleryIcon, 
  ExternalLink, 
  LogOut, 
  AlertCircle,
  ShieldCheck,
  PlusCircle
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    // If running in local mock fallback mode, allow access without Supabase credentials
    if (!isSupabaseConfigured || !supabase) {
      setIsAuthenticated(true);
      setUserEmail('owner@inhomefurniture.in (Mock Mode)');
      return;
    }

    const client = supabase;

    // Check active Supabase Auth session
    const checkSession = async () => {
      try {
        const { data: { session } } = await client.auth.getSession();
        if (session?.user) {
          setIsAuthenticated(true);
          setUserEmail(session.user.email || 'Owner');
        } else {
          setIsAuthenticated(false);
          if (!isLoginPage) {
            router.push('/admin/login');
          }
        }
      } catch (err) {
        console.error('Auth check error:', err);
        setIsAuthenticated(false);
        if (!isLoginPage) {
          router.push('/admin/login');
        }
      }
    };

    checkSession();

    const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setIsAuthenticated(true);
        setUserEmail(session.user.email || 'Owner');
      } else {
        setIsAuthenticated(false);
        if (!isLoginPage) {
          router.push('/admin/login');
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    if (supabase && isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    router.push('/admin/login');
  };

  // If on login page, just render the login page without the admin layout chrome
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Loading state while checking session
  if (isAuthenticated === null) {
    return (
      <div className="admin-loading-screen">
        <div className="admin-spinner" />
        <p>Loading INHOME Admin...</p>
        <style jsx>{`
          .admin-loading-screen {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 1rem;
            background-color: var(--bg-canvas);
            color: var(--text-muted);
            font-size: 0.9rem;
          }
          .admin-spinner {
            width: 32px;
            height: 32px;
            border: 3px solid var(--border-subtle);
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

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Products', href: '/admin/products', icon: Package },
    { label: 'Categories', href: '/admin/categories', icon: FolderTree },
    { label: 'Gallery', href: '/admin/gallery', icon: GalleryIcon },
  ];

  return (
    <div className="admin-shell">
      {/* Top Banner if in Local Mock Mode */}
      {!isSupabaseConfigured && (
        <div className="mock-banner">
          <AlertCircle size={15} className="mock-banner-icon" />
          <span>Running in Local Mock Mode. Connect Supabase credentials in .env.local to enable persistent cloud storage.</span>
        </div>
      )}

      {/* Admin Top App Bar */}
      <header className="admin-header">
        <div className="admin-header-inner">
          <div className="admin-brand">
            <Link href="/admin" className="admin-logo">
              <span className="logo-text">INHOME</span>
              <span className="admin-tag">ADMIN</span>
            </Link>
          </div>

          <div className="admin-top-actions">
            <Link href="/admin/products/new" className="btn-quick-add">
              <PlusCircle size={16} />
              <span className="btn-add-label">New Piece</span>
            </Link>

            <Link href="/" target="_blank" className="btn-view-site" title="Preview public catalogue">
              <ExternalLink size={16} />
            </Link>

            {isSupabaseConfigured && (
              <button onClick={handleLogout} className="btn-logout" title="Sign out of admin">
                <LogOut size={16} />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <main className="admin-main">
        <div className="admin-container">
          {children}
        </div>
      </main>

      {/* Persistent Single-Thumb Mobile Bottom Navigation Bar */}
      <nav className="admin-bottom-nav" aria-label="Admin Navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} className="nav-icon" />
              <span className="nav-label">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <style jsx>{`
        .admin-shell {
          min-height: 100vh;
          background-color: var(--bg-canvas);
          display: flex;
          flex-direction: column;
          padding-bottom: calc(64px + env(safe-area-inset-bottom, 0px));
        }

        .mock-banner {
          background-color: #FEF3C7;
          border-bottom: 1px solid #FDE68A;
          color: #92400E;
          padding: 0.5rem 1rem;
          font-size: 0.78rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          text-align: center;
        }

        .mock-banner-icon {
          flex-shrink: 0;
        }

        .admin-header {
          background-color: var(--bg-surface);
          border-bottom: 1px solid var(--border-subtle);
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .admin-header-inner {
          max-width: 960px;
          margin: 0 auto;
          padding: 0 1rem;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .admin-brand {
          display: flex;
          align-items: center;
        }

        .admin-logo {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          text-decoration: none;
        }

        .logo-text {
          font-weight: 800;
          font-size: 1.05rem;
          color: var(--text-primary);
          letter-spacing: -0.01em;
        }

        .admin-tag {
          font-size: 0.65rem;
          font-weight: 800;
          background-color: var(--accent-subtle);
          color: var(--accent-primary);
          padding: 0.15rem 0.4rem;
          border-radius: var(--radius-sm);
          letter-spacing: 0.05em;
        }

        .admin-top-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .btn-quick-add {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          background-color: var(--accent-primary);
          color: #FFFFFF;
          padding: 0.45rem 0.85rem;
          border-radius: var(--radius-md);
          font-size: 0.825rem;
          font-weight: 700;
          text-decoration: none;
          min-height: 44px;
        }

        .btn-view-site,
        .btn-logout {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          border: 1px solid var(--border-subtle);
          background-color: var(--bg-surface-secondary);
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .btn-view-site:hover,
        .btn-logout:hover {
          color: var(--text-primary);
          background-color: #E7E2DA;
        }

        .admin-main {
          flex: 1;
          padding: 1.25rem 0;
        }

        .admin-container {
          max-width: 960px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .admin-bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: calc(58px + env(safe-area-inset-bottom, 0px));
          padding-bottom: env(safe-area-inset-bottom, 0px);
          background-color: #FFFFFF;
          border-top: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: space-around;
          z-index: 60;
          box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.04);
        }

        .nav-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          min-height: 48px;
          text-decoration: none;
          color: var(--text-muted);
          gap: 0.2rem;
          transition: color 0.15s ease;
        }

        .nav-item.active {
          color: var(--accent-primary);
          font-weight: 700;
        }

        .nav-label {
          font-size: 0.72rem;
          letter-spacing: -0.01em;
        }

        @media (max-width: 480px) {
          .btn-add-label {
            display: none;
          }
          .btn-quick-add {
            width: 44px;
            padding: 0;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
