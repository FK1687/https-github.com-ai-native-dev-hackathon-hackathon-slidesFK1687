import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '@/test/utils';
import { Card } from '../Card';

describe('Card', () => {
  it('renders children', () => {
    renderWithProviders(<Card><p>Content</p></Card>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies border styling', () => {
    const { container } = renderWithProviders(<Card>Box</Card>);
    expect(container.firstElementChild?.className).toContain('border');
    expect(container.firstElementChild?.className).toContain('bg-kleb-white');
  });

  it('applies custom className', () => {
    const { container } = renderWithProviders(<Card className="p-4">Box</Card>);
    expect(container.firstElementChild?.className).toContain('p-4');
  });
});
