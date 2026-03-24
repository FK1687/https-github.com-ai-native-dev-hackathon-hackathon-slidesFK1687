import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen, userEvent } from '@/test/utils';
import { Button } from '../Button';

describe('Button', () => {
  it('renders children', () => {
    renderWithProviders(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('renders solid variant by default', () => {
    renderWithProviders(<Button>Solid</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('bg-kleb-gray-900');
  });

  it('renders outline variant', () => {
    renderWithProviders(<Button variant="outline">Outline</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('bg-transparent');
    expect(btn.className).toContain('border-kleb-gray-300');
  });

  it('renders ghost variant', () => {
    renderWithProviders(<Button variant="ghost">Ghost</Button>);
    const btn = screen.getByRole('button');
    expect(btn.className).toContain('bg-transparent');
    expect(btn.className).toContain('border-transparent');
  });

  it('renders sm size', () => {
    renderWithProviders(<Button size="sm">Small</Button>);
    expect(screen.getByRole('button').className).toContain('px-3');
    expect(screen.getByRole('button').className).toContain('text-xs');
  });

  it('renders md size by default', () => {
    renderWithProviders(<Button>Medium</Button>);
    expect(screen.getByRole('button').className).toContain('px-4');
    expect(screen.getByRole('button').className).toContain('text-sm');
  });

  it('renders lg size', () => {
    renderWithProviders(<Button size="lg">Large</Button>);
    expect(screen.getByRole('button').className).toContain('px-6');
    expect(screen.getByRole('button').className).toContain('text-base');
  });

  it('handles disabled state', () => {
    renderWithProviders(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('calls onClick handler', async () => {
    const user = userEvent.setup();
    let clicked = false;
    renderWithProviders(<Button onClick={() => { clicked = true; }}>Click</Button>);
    await user.click(screen.getByRole('button'));
    expect(clicked).toBe(true);
  });

  it('does not fire click when disabled', async () => {
    const user = userEvent.setup();
    let clicked = false;
    renderWithProviders(<Button disabled onClick={() => { clicked = true; }}>Click</Button>);
    await user.click(screen.getByRole('button'));
    expect(clicked).toBe(false);
  });

  it('applies custom className', () => {
    renderWithProviders(<Button className="custom-class">Styled</Button>);
    expect(screen.getByRole('button').className).toContain('custom-class');
  });

  it('is keyboard activatable via Enter', async () => {
    const user = userEvent.setup();
    let clicked = false;
    renderWithProviders(<Button onClick={() => { clicked = true; }}>Press</Button>);
    screen.getByRole('button').focus();
    await user.keyboard('{Enter}');
    expect(clicked).toBe(true);
  });
});
