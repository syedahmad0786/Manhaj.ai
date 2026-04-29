import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

type Variant = 'primary' | 'ghost' | 'outline';

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-gold text-ink hover:bg-gold-soft border border-gold',
  ghost:
    'bg-transparent text-cream hover:text-gold border border-transparent',
  outline:
    'bg-transparent text-cream border border-gold hover:bg-gold hover:text-ink',
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  arrow?: boolean;
};

export function Button({
  children,
  variant = 'outline',
  className = '',
  arrow = true,
  ...rest
}: CommonProps & ComponentProps<'button'>) {
  return (
    <button
      {...rest}
      className={`inline-flex items-center gap-3 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors ${variantClasses[variant]} ${className}`}
    >
      {children}
      {arrow && <span aria-hidden>→</span>}
    </button>
  );
}

export function ButtonLink({
  children,
  variant = 'outline',
  className = '',
  arrow = true,
  href,
  ...rest
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link
      href={href}
      {...rest}
      className={`inline-flex items-center gap-3 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors ${variantClasses[variant]} ${className}`}
    >
      {children}
      {arrow && <span aria-hidden>→</span>}
    </Link>
  );
}
