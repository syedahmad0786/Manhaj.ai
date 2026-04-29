import Link from 'next/link';
import { FOOTER_NAV } from '@/lib/data/nav';
import { SITE } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-line bg-ink">
      <div className="mx-auto grid max-w-(--container-wide) gap-12 px-6 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)] md:px-10">
        <div>
          <Link href="/" className="flex items-baseline gap-3">
            <span className="font-serif text-2xl font-semibold tracking-[0.32em] text-cream">
              MANHAJ
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold">
              ◊ AOS-001
            </span>
          </Link>
          <p className="mt-6 max-w-sm font-sans text-sm leading-relaxed text-cream-dim">
            {SITE.tagline}
          </p>
          <p className="mt-3 max-w-sm font-serif italic text-cream-dim">
            {SITE.motto}
          </p>
        </div>

        {FOOTER_NAV.map((col) => (
          <div key={col.heading}>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.32em] text-gold">
              {col.heading}
            </h3>
            <ul className="mt-5 space-y-3">
              {col.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-sans text-sm text-cream-dim transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-(--container-wide) flex-wrap items-center justify-between gap-4 px-6 py-6 md:px-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-mute">
            © {new Date().getFullYear()} · {SITE.name} · Architected by {SITE.founder}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.32em] text-mute">
            Manhaj (منهج) · system / methodology
          </span>
        </div>
      </div>
    </footer>
  );
}
