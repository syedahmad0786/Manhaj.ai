'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
  style?: CSSProperties;
  className?: string;
};

// Direct port from .extracted-source/004 — IntersectionObserver-driven fade.
export default function Reveal({
  children,
  delay = 0,
  y = 24,
  once = true,
  style,
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setShown(false);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [once]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : `translateY(${y}px)`,
        transition: `opacity 800ms var(--ease) ${delay}ms, transform 800ms var(--ease) ${delay}ms`,
        ...(style ?? {}),
      }}
    >
      {children}
    </div>
  );
}
