// Grid backdrop with a radial mask. Direct port from
// .extracted-source/000 (Hero3DStack file).
export default function GridBackdrop() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity: 0.4,
        backgroundImage: `
          linear-gradient(rgba(201,169,97,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(201,169,97,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
      }}
    />
  );
}
