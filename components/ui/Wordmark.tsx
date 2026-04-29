// Direct port from .extracted-source/004.
export default function Wordmark({ size = 'md' }: { size?: 'md' | 'lg' }) {
  const fontSize = size === 'lg' ? 22 : 16;
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          fontSize,
          letterSpacing: '0.04em',
          color: 'var(--ink-primary)',
        }}
      >
        MANHAJ
      </span>
      <span
        style={{
          fontFamily: 'var(--font-arabic)',
          fontSize: fontSize * 0.85,
          color: 'var(--accent)',
          fontWeight: 400,
        }}
      >
        منهج
      </span>
    </div>
  );
}
