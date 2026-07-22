import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/site';

export const runtime = 'edge';
export const alt = `${SITE.name} — ${SITE.motto}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#0A0A0B',
          color: '#F5F2EA',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 18,
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 600,
              letterSpacing: 14,
              color: '#F5F2EA',
            }}
          >
            MANHAJ
          </div>
          <div
            style={{
              fontFamily: 'monospace',
              fontSize: 16,
              letterSpacing: 6,
              color: '#C9A961',
              textTransform: 'uppercase',
            }}
          >
            AOS-001
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'baseline',
              fontSize: 72,
              lineHeight: 1.05,
              letterSpacing: -1,
              color: '#F5F2EA',
              maxWidth: 920,
            }}
          >
            The AI Operating System architected{' '}
            <span style={{ color: '#C9A961', fontStyle: 'italic' }}>
              uniquely
            </span>{' '}
            for your business.
          </div>
          <div
            style={{
              fontSize: 28,
              fontStyle: 'italic',
              color: '#C9A961',
            }}
          >
            Your OS is no one else&apos;s.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontFamily: 'monospace',
            fontSize: 14,
            letterSpacing: 4,
            color: '#6B6B73',
            textTransform: 'uppercase',
          }}
        >
          <span>B2B SERVICE &amp; EDUCATION | $1M-$10M</span>
          <span>{SITE.domain}</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
