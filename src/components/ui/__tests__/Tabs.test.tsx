import { describe, it, expect } from 'vitest';
import { renderWithProviders, screen, userEvent } from '@/test/utils';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../Tabs';

describe('Tabs', () => {
  function renderTabs() {
    return renderWithProviders(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>,
    );
  }

  it('renders TabsList with tablist role', () => {
    renderTabs();
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('renders tab triggers with tab role', () => {
    renderTabs();
    expect(screen.getAllByRole('tab')).toHaveLength(2);
  });

  it('shows default tab content', () => {
    renderTabs();
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
  });

  it('marks default tab as selected', () => {
    renderTabs();
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('aria-selected', 'false');
  });

  it('switches tabs on click', async () => {
    const user = userEvent.setup();
    renderTabs();
    await user.click(screen.getByRole('tab', { name: 'Tab 2' }));
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Tab 2' })).toHaveAttribute('aria-selected', 'true');
  });

  it('renders tabpanel for active content', () => {
    renderTabs();
    expect(screen.getByRole('tabpanel')).toBeInTheDocument();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Content 1');
  });

  it('supports controlled mode', async () => {
    const user = userEvent.setup();
    let value = 'tab1';
    const { rerender } = renderWithProviders(
      <Tabs defaultValue="tab1" value={value} onValueChange={(v) => { value = v; }}>
        <TabsList>
          <TabsTrigger value="tab1">A</TabsTrigger>
          <TabsTrigger value="tab2">B</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">A Content</TabsContent>
        <TabsContent value="tab2">B Content</TabsContent>
      </Tabs>,
    );
    await user.click(screen.getByRole('tab', { name: 'B' }));
    expect(value).toBe('tab2');

    rerender(
      <Tabs defaultValue="tab1" value="tab2" onValueChange={() => {}}>
        <TabsList>
          <TabsTrigger value="tab1">A</TabsTrigger>
          <TabsTrigger value="tab2">B</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">A Content</TabsContent>
        <TabsContent value="tab2">B Content</TabsContent>
      </Tabs>,
    );
    expect(screen.getByText('B Content')).toBeInTheDocument();
  });
});
