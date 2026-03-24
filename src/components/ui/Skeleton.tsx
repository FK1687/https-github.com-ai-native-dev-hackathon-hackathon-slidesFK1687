interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps): JSX.Element {
  return (
    <div
      className={`animate-pulse bg-kleb-gray-100 ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}
