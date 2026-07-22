import CalEmbed from '@/components/audit/CalEmbed';
import { SITE } from '@/lib/site';

// Direct port from .extracted-source/006 — but the original's `cal.com embed
// mounts here` placeholder is replaced with the real <CalEmbed /> wired to
// NEXT_PUBLIC_CAL_LINK.
const WALKAWAY = [
  'A plain-English diagnosis of where leads die today',
  'A keep / augment / automate map for your stack',
  'A draft AOS architecture spec for your business',
  'A 5-week install timeline (if you proceed)',
  'No sales theatre, no slide deck, no upsell',
] as const;

export default function AuditSidebar() {
  return (
    <aside
      className="manhaj-audit-sidebar"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        position: 'sticky',
        top: 120,
      }}
    >
      <div
        style={{
          padding: 32,
          border: '1px solid var(--line)',
          background: 'var(--bg-elevated)',
        }}
      >
        <div className="t-eyebrow" style={{ marginBottom: 16 }}>◊ What you walk away with</div>
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {WALKAWAY.map((t) => (
            <li
              key={t}
              style={{
                display: 'flex',
                gap: 12,
                fontSize: 14,
                color: 'var(--ink-primary)',
                alignItems: 'flex-start',
              }}
            >
              <span
                style={{
                  color: 'var(--accent)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  marginTop: 2,
                }}
              >
                →
              </span>
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div
        style={{
          padding: 32,
          border: '1px solid var(--accent)',
          background: 'rgba(201,169,97,0.04)',
        }}
      >
        <div className="t-mono" style={{ marginBottom: 12, color: 'var(--accent)' }}>◊ Direct line</div>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 22,
            marginBottom: 8,
            color: 'var(--ink-primary)',
          }}
        >
          Ahmad Bukhari
        </div>
        <div
          style={{
            fontSize: 14,
            color: 'var(--ink-secondary)',
            marginBottom: 16,
            fontStyle: 'italic',
            fontFamily: 'var(--font-display)',
          }}
        >
          Architect · the only person on the call
        </div>
        <a
          className="manhaj-breakable-link"
          href={`mailto:${SITE.email}`}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--accent)',
            letterSpacing: '0.04em',
            textDecoration: 'none',
          }}
        >
          {SITE.email}
        </a>
        <div style={{ marginTop: 14 }}>
          <a
            href={SITE.bookingUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'var(--ink-secondary)',
              letterSpacing: '0.04em',
              textDecoration: 'underline',
              textUnderlineOffset: 3,
            }}
          >
            Open booking page ↗
          </a>
        </div>
      </div>

      <div>
        <div
          className="t-eyebrow"
          style={{ marginBottom: 12 }}
        >
          ◊ Pick a slot directly
        </div>
        <CalEmbed />
      </div>
    </aside>
  );
}
