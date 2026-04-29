import type { ReactNode } from 'react';

type Props = {
  eyebrow?: ReactNode;
  title: ReactNode;
  sub?: ReactNode;
  align?: 'left' | 'center';
};

// Port of SectionHeader from .extracted-source/004.
export default function SectionHeader({ eyebrow, title, sub, align = 'left' }: Props) {
  return (
    <div
      style={{
        textAlign: align,
        marginBottom: 80,
        maxWidth: align === 'center' ? 720 : 880,
        marginLeft: align === 'center' ? 'auto' : 0,
        marginRight: align === 'center' ? 'auto' : 0,
      }}
    >
      {eyebrow && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 28,
            justifyContent: align === 'center' ? 'center' : 'flex-start',
          }}
        >
          <span style={{ width: 24, height: 1, background: 'var(--accent)' }} />
          <span className="t-eyebrow">{eyebrow}</span>
        </div>
      )}
      <h2 className="t-display" style={{ fontSize: 'clamp(36px, 5vw, 56px)', marginBottom: sub ? 24 : 0 }}>
        {title}
      </h2>
      {sub && (
        <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--ink-secondary)', maxWidth: 640 }}>
          {sub}
        </p>
      )}
    </div>
  );
}
