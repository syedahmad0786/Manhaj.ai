'use client';

import { useEffect, useRef, type ReactNode } from 'react';

export default function Reveal({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.setTimeout(() => {
              el.dataset.revealed = 'true';
            }, delay);
            obs.unobserve(el);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  // The dynamic Tag rendering needs `any` because React doesn't have a type
  // strong enough to express "any HTML element" with a ref.
  const Component = Tag as React.ElementType;
  return (
    <Component ref={ref} data-reveal className={className}>
      {children}
    </Component>
  );
}
