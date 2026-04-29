import Link from 'next/link';
import type { ReactNode } from 'react';

// Port of CTAButton from .extracted-source/000. The original wired into the
// hash-router; here we just use next/link. data-magnetic stays as a hook
// for any future magnetic-cursor follow-up (currently inert).
export default function CTAButton({
  primary = false,
  label,
  path,
  children,
}: {
  primary?: boolean;
  label?: ReactNode;
  path: string;
  children?: ReactNode;
}) {
  return (
    <Link
      href={path}
      data-magnetic
      className={primary ? 'btn btn-primary' : 'btn btn-secondary'}
    >
      {children ?? label}
      <span className="arrow">→</span>
    </Link>
  );
}
