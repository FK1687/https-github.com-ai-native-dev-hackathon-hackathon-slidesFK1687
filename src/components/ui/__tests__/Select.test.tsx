import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen, userEvent } from '@/test/utils';
import { Select } from '../Select';

describe('Select', () => {
  it('renders with children options', () => {
    renderWithProviders(
      <Select aria-label="Sort">
        <option value="a">Option A</option>
        <option value="b">Option B</option>
      </Select>,
    );
    const select = screen.getByLabelText('Sort');
    expect(select).toBeInTheDocument();
    expect(select.querySelectorAll('option')).toHaveLength(2);
  });

  it('handles selection change', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderWithProviders(
      <Select aria-label="Sort" onChange={onChange}>
        <option value="a">Option A</option>
        <option value="b">Option B</option>
      </Select>,
    );
    await user.selectOptions(screen.getByLabelText('Sort'), 'b');
    expect(onChange).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    renderWithProviders(
      <Select className="min-w-32" aria-label="Test">
        <option>Test</option>
      </Select>,
    );
    expect(screen.getByLabelText('Test').className).toContain('min-w-32');
  });

  it('handles disabled state', () => {
    renderWithProviders(
      <Select disabled aria-label="Disabled">
        <option>Test</option>
      </Select>,
    );
    expect(screen.getByLabelText('Disabled')).toBeDisabled();
  });
});
