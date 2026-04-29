'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PRIMARY_NAV } from '@/lib/data/nav';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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
      className={`sticky top-0 z-40 transition-colors ${
        scrolled
          ? 'bg-ink/85 backdrop-blur-md border-b border-line'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-(--container-wide) items-center justify-between gap-6 px-6 py-4 md:px-10">
        <Link href="/" className="flex items-baseline gap-3" aria-label="Manhaj home">
          <span className="font-serif text-xl font-semibold tracking-[0.32em] text-cream">
            MANHAJ
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.32em] text-gold sm:inline">
            ◊ AOS-001
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-sans text-[13px] text-cream-dim transition-colors hover:text-gold"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/audit"
            className="inline-flex items-center gap-2 border border-gold px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-cream transition-colors hover:bg-gold hover:text-ink"
          >
            Book audit <span aria-hidden>→</span>
          </Link>
        </nav>

        <button
          type="button"
          className="md:hidden font-mono text-[11px] uppercase tracking-[0.18em] text-cream"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="md:hidden border-t border-line bg-ink"
        >
          <nav
            aria-label="Mobile primary"
            className="mx-auto flex max-w-(--container-wide) flex-col gap-2 px-6 py-6"
          >
            {PRIMARY_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-3 font-serif text-2xl text-cream"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/audit"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center gap-2 border border-gold py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-cream"
            >
              Book audit <span aria-hidden>→</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
