import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '@/test/utils';
import { Skeleton } from '../Skeleton';

describe('Skeleton', () => {
  it('renders with role status', () => {
    renderWithProviders(<Skeleton />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has Loading aria-label', () => {
    renderWithProviders(<Skeleton />);
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('applies animate-pulse class', () => {
    renderWithProviders(<Skeleton />);
    expect(screen.getByRole('status').className).toContain('animate-pulse');
  });

  it('applies custom className for dimensions', () => {
    renderWithProviders(<Skeleton className="h-8 w-48" />);
    const el = screen.getByRole('status');
    expect(el.className).toContain('h-8');
    expect(el.className).toContain('w-48');
  });
});
