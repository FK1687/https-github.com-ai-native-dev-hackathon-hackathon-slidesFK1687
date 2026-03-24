import { describe, it, expect } from 'vitest';
import { renderWithProviders } from '@/test/utils';
import { Separator } from '../Separator';

describe('Separator', () => {
  it('renders an hr element', () => {
    const { container } = renderWithProviders(<Separator />);
    const hr = container.querySelector('hr');
    expect(hr).toBeInTheDocument();
  });

  it('is an hr element (implicit separator semantics)', () => {
    const { container } = renderWithProviders(<Separator />);
    const hr = container.querySelector('hr');
    expect(hr?.tagName).toBe('HR');
  });

  it('applies custom className', () => {
    const { container } = renderWithProviders(<Separator className="my-4" />);
    expect(container.querySelector('hr')?.className).toContain('my-4');
  });
});
