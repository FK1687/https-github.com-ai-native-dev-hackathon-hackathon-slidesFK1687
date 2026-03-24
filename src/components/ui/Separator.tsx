interface SeparatorProps {
  className?: string;
}

export function Separator({ className = '' }: SeparatorProps): JSX.Element {
  return <hr className={`border-t border-kleb-gray-300 ${className}`} />;
}
