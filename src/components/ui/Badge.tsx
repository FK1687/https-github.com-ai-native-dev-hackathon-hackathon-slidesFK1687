import type { ReactNode } from 'react';

type BadgeVariant = 'default' | 'outline' | 'secondary';

interface BadgeProps {
  variant?: BadgeVariant;
  className?: string;
  children: ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-kleb-green/10 text-kleb-green-dark border border-kleb-green/30',
  outline: 'bg-transparent text-kleb-gray-700 border border-kleb-gray-300',
  secondary: 'bg-kleb-gray-100 text-kleb-gray-700 border border-transparent',
};

export function Badge({ variant = 'default', className = '', children }: BadgeProps): JSX.Element {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
