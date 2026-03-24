import type { ReactNode } from 'react';

interface CardProps {
  className?: string;
  children: ReactNode;
}

export function Card({ className = '', children }: CardProps): JSX.Element {
  return (
    <div className={`border border-kleb-gray-300 bg-kleb-white ${className}`}>
      {children}
    </div>
  );
}
