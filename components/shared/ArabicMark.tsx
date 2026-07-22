'use client';

import { useEffect, useRef, useState } from 'react';

// Animated stroke draw of Arabic منهج mark. Port from .extracted-source/003.
export default function ArabicMark() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, minWidth: 220 }}
    >
      <div
        style={{
          position: 'relative',
          width: 220,
          height: 140,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-arabic)',
            fontSize: 110,
            color: 'var(--accent)',
            lineHeight: 1,
            fontWeight: 400,
            opacity: active ? 1 : 0,
            transform: active ? 'scale(1)' : 'scale(0.92)',
            transition: 'opacity 1200ms var(--ease), transform 1200ms var(--ease)',
            textShadow: '0 0 60px rgba(195, 60, 31, 0.34)',
          }}
        >
          منهج
        </span>
        <svg width="220" height="140" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <line
            x1="0" y1="70" x2="220" y2="70"
            stroke="var(--accent)" strokeOpacity="0.2"
            strokeDasharray="220" strokeDashoffset={active ? '0' : '220'}
            style={{ transition: 'stroke-dashoffset 1400ms var(--ease)' }}
          />
          <line
            x1="110" y1="0" x2="110" y2="140"
            stroke="var(--accent)" strokeOpacity="0.2"
            strokeDasharray="140" strokeDashoffset={active ? '0' : '140'}
            style={{ transition: 'stroke-dashoffset 1400ms var(--ease) 200ms' }}
          />
        </svg>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div className="t-mono">man · haj</div>
        <div
          style={{
            fontSize: 13,
            color: 'var(--ink-secondary)',
            marginTop: 6,
            fontStyle: 'italic',
            fontFamily: 'var(--font-display)',
          }}
        >
          system · methodology
        </div>
      </div>
    </div>
  );
}
