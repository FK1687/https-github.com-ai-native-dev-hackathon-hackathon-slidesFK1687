interface KlebLogoProps {
  height?: number;
  className?: string;
}

export function KlebLogo({ height = 20, className = '' }: KlebLogoProps): JSX.Element {
  return (
    <span
      className={`font-bold tracking-tight text-kleb-gray-900 ${className}`}
      style={{ fontSize: `${height}px`, fontFamily: 'var(--font-family-base)' }}
    >
      KLEB<span className="text-kleb-green">.</span>
    </span>
  );
}
