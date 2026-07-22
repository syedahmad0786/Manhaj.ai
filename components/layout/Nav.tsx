'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Wordmark from '@/components/ui/Wordmark';

// Direct port from .extracted-source/004 (Nav block).
// Hash-route `<a href="#/path">` swapped for next/link; usePathname()
// drives the active-state underline.
const NAV_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/foundation', label: 'Foundation' },
  { path: '/kiosks', label: 'Demos' },
  { path: '/process', label: 'Process' },
  { path: '/pricing', label: 'Pricing' },
  { path: '/about', label: 'About' },
] as const;

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className="manhaj-site-nav"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? '14px 32px' : '24px 32px',
        transition: 'all 400ms var(--ease)',
        background: scrolled ? 'rgba(10, 10, 11, 0.7)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(140%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(140%)' : 'none',
        borderBottom: scrolled ? '1px solid var(--line-soft)' : '1px solid transparent',
      }}
    >
      <div
        className="manhaj-site-nav-inner"
        style={{
          maxWidth: 1360,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 32,
        }}
      >
        <Link
          href="/"
          style={{
            textDecoration: 'none',
            color: 'var(--ink-primary)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <Wordmark />
        </Link>

        <nav
          aria-label="Primary"
          className="manhaj-nav-desktop"
          style={{ display: 'none', gap: 4, alignItems: 'center' }}
        >
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: active ? 'var(--accent)' : 'var(--ink-secondary)',
                  textDecoration: 'none',
                  padding: '8px 14px',
                  position: 'relative',
                  transition: 'color 300ms var(--ease)',
                }}
              >
                {item.label}
                {active && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 2,
                      left: 14,
                      right: 14,
                      height: 1,
                      background: 'var(--accent)',
                    }}
                  />
                )}
              </Link>
            );
          })}
          <span style={{ width: 1, height: 18, background: 'var(--line)', margin: '0 8px' }} />
          <Link
            href="/audit"
            data-magnetic
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 13,
              fontWeight: 500,
              padding: '10px 18px',
              border: '1px solid var(--accent)',
              color: 'var(--accent)',
              textDecoration: 'none',
              transition: 'all 300ms var(--ease)',
            }}
          >
            Book audit →
          </Link>
        </nav>

        <button
          type="button"
          className="manhaj-nav-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="manhaj-nav-mobile"
          style={{
            display: 'inline-flex',
            background: 'transparent',
            border: 'none',
            padding: 8,
            color: 'var(--ink-primary)',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open && (
        <div
          id="manhaj-nav-mobile"
          className="manhaj-nav-mobile-panel"
          style={{
            marginTop: 16,
            borderTop: '1px solid var(--line)',
            background: 'rgba(10,10,11,0.96)',
          }}
        >
          <nav
            aria-label="Mobile primary"
            style={{
              maxWidth: 1360,
              margin: '0 auto',
              padding: '24px 0',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setOpen(false)}
                style={{
                  display: 'block',
                  padding: '14px 0',
                  borderBottom: '1px solid var(--line-soft)',
                  fontFamily: 'var(--font-display)',
                  fontSize: 24,
                  color: 'var(--ink-primary)',
                  textDecoration: 'none',
                }}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/audit"
              onClick={() => setOpen(false)}
              style={{
                marginTop: 16,
                padding: '14px 0',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                border: '1px solid var(--accent)',
                textAlign: 'center',
                textDecoration: 'none',
              }}
            >
              Book audit →
            </Link>
          </nav>
        </div>
      )}

      <style>{`
        @media (min-width: 880px) {
          .manhaj-nav-desktop { display: flex !important; }
          .manhaj-nav-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
}
