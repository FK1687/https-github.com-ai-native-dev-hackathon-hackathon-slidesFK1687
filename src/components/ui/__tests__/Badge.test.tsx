import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen } from '@/test/utils';
import { Badge } from '../Badge';

describe('Badge', () => {
  it('renders children', () => {
    renderWithProviders(<Badge>Testing</Badge>);
    expect(screen.getByText('Testing')).toBeInTheDocument();
  });

  it('renders default variant', () => {
    renderWithProviders(<Badge>Default</Badge>);
    expect(screen.getByText('Default').className).toContain('bg-kleb-green/10');
  });

  it('renders outline variant', () => {
    renderWithProviders(<Badge variant="outline">Outline</Badge>);
    expect(screen.getByText('Outline').className).toContain('border-kleb-gray-300');
  });

  it('renders secondary variant', () => {
    renderWithProviders(<Badge variant="secondary">Secondary</Badge>);
    expect(screen.getByText('Secondary').className).toContain('bg-kleb-gray-100');
  });

  it('applies custom className', () => {
    renderWithProviders(<Badge className="custom">Styled</Badge>);
    expect(screen.getByText('Styled').className).toContain('custom');
  });
});
