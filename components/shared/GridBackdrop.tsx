export default function GridBackdrop() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity: 0.72,
        backgroundImage: `
          linear-gradient(rgba(23, 20, 15, 0.055) 1px, transparent 1px),
          linear-gradient(90deg, rgba(23, 20, 15, 0.055) 1px, transparent 1px),
          radial-gradient(circle at 72% 34%, rgba(195, 60, 31, 0.10), transparent 26%)
        `,
        backgroundSize: '56px 56px, 56px 56px, auto',
        maskImage: 'linear-gradient(to bottom, black 12%, rgba(0,0,0,.88) 70%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 12%, rgba(0,0,0,.88) 70%, transparent 100%)',
      }}
    />
  );
}
