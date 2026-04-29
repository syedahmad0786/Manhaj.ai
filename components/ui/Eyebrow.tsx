import type { ReactNode } from 'react';

export default function Eyebrow({
  children,
  className = '',
  diamond = true,
}: {
  children: ReactNode;
  className?: string;
  diamond?: boolean;
}) {
  return (
    <p
      className={`font-mono text-[11px] uppercase tracking-[0.32em] text-gold ${className}`}
    >
      {diamond && <span aria-hidden className="mr-2">◊</span>}
      {children}
    </p>
  );
}
