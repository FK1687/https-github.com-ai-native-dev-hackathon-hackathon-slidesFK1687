import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithProviders, screen, userEvent, waitFor } from '@/test/utils';

vi.mock('@/api', () => ({
  fetchAvailableSlots: vi.fn(),
  bookAppointment: vi.fn(),
  submitContact: vi.fn(),
}));

import { fetchAvailableSlots, bookAppointment, submitContact } from '@/api';
import { ContactSalesPage } from '../ContactSalesPage';

const mockSlots = [
  { date: '2026-03-25', times: ['09:00', '09:30', '10:00'] },
  { date: '2026-03-26', times: ['13:00', '14:00'] },
  { date: '2026-03-27', times: ['09:00'] },
];

describe('ContactSalesPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(fetchAvailableSlots).mockResolvedValue(mockSlots);
    vi.mocked(bookAppointment).mockResolvedValue({
      success: true,
      appointment: { id: 'apt-1', date: '2026-03-25', time: '09:00', status: 'confirmed' as const },
    });
    vi.mocked(submitContact).mockResolvedValue({
      success: true,
      contactId: 'contact-1',
    });
  });

  it('renders page heading', () => {
    renderWithProviders(<ContactSalesPage />);
    expect(screen.getByText('Contact Sales')).toBeInTheDocument();
  });

  it('renders sales expert card', () => {
    renderWithProviders(<ContactSalesPage />);
    expect(screen.getByText('Dr. Sarah Fischer')).toBeInTheDocument();
    expect(screen.getByText('Technical Sales Manager')).toBeInTheDocument();
  });

  it('renders tab buttons for message and appointment', () => {
    renderWithProviders(<ContactSalesPage />);
    // "Send Message" appears as both tab button and form submit button
    expect(screen.getAllByText('Send Message').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Book Appointment').length).toBeGreaterThanOrEqual(1);
  });

  describe('Message form', () => {
    it('renders message form labels', () => {
      renderWithProviders(<ContactSalesPage />);
      expect(screen.getByText('Name *')).toBeInTheDocument();
      expect(screen.getByText('Email *')).toBeInTheDocument();
      expect(screen.getByText('Message *')).toBeInTheDocument();
    });

    it('renders optional fields', () => {
      renderWithProviders(<ContactSalesPage />);
      expect(screen.getByText('Company')).toBeInTheDocument();
      expect(screen.getByText('Subject')).toBeInTheDocument();
    });

    it('submits message successfully', async () => {
      const user = userEvent.setup();
      renderWithProviders(<ContactSalesPage />);

      // Fill form fields - inputs are in order: Name, Email, Company, Subject + textarea for Message
      const inputs = screen.getAllByRole('textbox');
      await user.type(inputs[0]!, 'John');
      await user.type(inputs[1]!, 'john@test.com');

      const textarea = document.querySelector('textarea')!;
      await user.type(textarea, 'Hello');

      // The Send Message button in the form, not the tab button
      const buttons = screen.getAllByText('Send Message');
      // The submit button is inside the form (last occurrence or the <button type="submit">)
      const submitBtn = buttons.find((b) => b.closest('form')) ?? buttons[buttons.length - 1]!;
      await user.click(submitBtn);

      await waitFor(() => {
        expect(submitContact).toHaveBeenCalled();
      });
    });
  });

  describe('Appointment booking', () => {
    it('switches to appointment tab', async () => {
      const user = userEvent.setup();
      renderWithProviders(<ContactSalesPage />);
      await user.click(screen.getByText('Book Appointment'));
      expect(screen.getByText(/Step 1 of 3/)).toBeInTheDocument();
    });

    it('shows continue button disabled until fields filled', async () => {
      const user = userEvent.setup();
      renderWithProviders(<ContactSalesPage />);
      await user.click(screen.getByText('Book Appointment'));
      const continueBtn = screen.getByRole('button', { name: /Continue/i });
      expect(continueBtn).toBeDisabled();
    });
  });
});
