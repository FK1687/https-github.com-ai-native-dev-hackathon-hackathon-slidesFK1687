import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen, userEvent } from '@/test/utils';
import { Input } from '../Input';

describe('Input', () => {
  it('renders with placeholder', () => {
    renderWithProviders(<Input placeholder="Search..." />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('renders with icon', () => {
    renderWithProviders(<Input icon={<span data-testid="icon">🔍</span>} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('adds pl-9 class when icon is present', () => {
    renderWithProviders(<Input icon={<span>🔍</span>} />);
    const input = screen.getByRole('textbox');
    expect(input.className).toContain('pl-9');
  });

  it('calls onChange handler', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    renderWithProviders(<Input onChange={onChange} />);
    await user.type(screen.getByRole('textbox'), 'hello');
    expect(onChange).toHaveBeenCalled();
  });

  it('shows clear button when value is present and onClear provided', () => {
    renderWithProviders(<Input value="test" onClear={() => {}} onChange={() => {}} />);
    expect(screen.getByLabelText('Clear input')).toBeInTheDocument();
  });

  it('does not show clear button when value is empty', () => {
    renderWithProviders(<Input value="" onClear={() => {}} onChange={() => {}} />);
    expect(screen.queryByLabelText('Clear input')).not.toBeInTheDocument();
  });

  it('calls onClear when clear button is clicked', async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();
    renderWithProviders(<Input value="test" onClear={onClear} onChange={() => {}} />);
    await user.click(screen.getByLabelText('Clear input'));
    expect(onClear).toHaveBeenCalledOnce();
  });

  it('applies custom className', () => {
    renderWithProviders(<Input className="my-class" />);
    expect(screen.getByRole('textbox').className).toContain('my-class');
  });

  it('handles disabled state', () => {
    renderWithProviders(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
