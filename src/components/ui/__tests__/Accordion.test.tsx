import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen, userEvent } from '@/test/utils';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../Accordion';

describe('Accordion', () => {
  function renderAccordion(props: { type?: 'single' | 'multiple'; defaultValue?: string[] } = {}) {
    return renderWithProviders(
      <Accordion {...props}>
        <AccordionItem value="section1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="section2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>Content 2</AccordionContent>
        </AccordionItem>
        <AccordionItem value="section3">
          <AccordionTrigger>Section 3</AccordionTrigger>
          <AccordionContent>Content 3</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
  }

  it('renders all trigger buttons', () => {
    renderAccordion();
    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
    expect(screen.getByText('Section 3')).toBeInTheDocument();
  });

  it('all sections are collapsed by default', () => {
    renderAccordion();
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
  });

  it('renders with defaultValue sections open', () => {
    renderAccordion({ defaultValue: ['section1'] });
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
  });

  it('expands section on click', async () => {
    const user = userEvent.setup();
    renderAccordion();
    await user.click(screen.getByText('Section 1'));
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('collapses section on second click', async () => {
    const user = userEvent.setup();
    renderAccordion({ defaultValue: ['section1'] });
    await user.click(screen.getByText('Section 1'));
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  it('allows multiple sections open simultaneously (multiple mode)', async () => {
    const user = userEvent.setup();
    renderAccordion({ type: 'multiple' });
    await user.click(screen.getByText('Section 1'));
    await user.click(screen.getByText('Section 2'));
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('only one section open in single mode', async () => {
    const user = userEvent.setup();
    renderAccordion({ type: 'single' });
    await user.click(screen.getByText('Section 1'));
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    await user.click(screen.getByText('Section 2'));
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('sets aria-expanded on trigger buttons', async () => {
    const user = userEvent.setup();
    renderAccordion();
    const trigger = screen.getByText('Section 1').closest('button')!;
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });
});
