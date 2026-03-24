import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithProviders, screen, userEvent, waitFor } from '@/test/utils';
import { useComparisonStore } from '@/stores';

vi.mock('@/hooks', () => ({
  useProductData: vi.fn(),
}));

import { useProductData } from '@/hooks';
import { ProductComparePage } from '../ProductComparePage';

const mockProducts = [
  {
    id: 'p1', name: 'Alpha Tape', sku: 'KLB-PKG-0001', category: 'packaging',
    application: ['bonding'], material: 'PET', adhesiveType: 'acrylic',
    description: 'Desc', shortDescription: 'Short',
    properties: { uvResistance: true, waterResistance: false, solventResistance: false, foodSafe: false, flameRetardant: false, antistatic: false, transparentBond: false, removable: false, adhesionStrength: 5, temperatureMin: -10, temperatureMax: 100 },
    availableWidths: [25], availableLengths: [33], color: 'Clear',
    substrate: ['metal'], environment: 'indoor', certification: ['REACH'], shelfLife: 24, tags: [],
  },
  {
    id: 'p2', name: 'Beta Bond', sku: 'KLB-AUT-0002', category: 'automotive',
    application: ['bonding'], material: 'Foam', adhesiveType: 'rubber',
    description: 'Desc 2', shortDescription: 'Short 2',
    properties: { uvResistance: false, waterResistance: true, solventResistance: false, foodSafe: false, flameRetardant: false, antistatic: false, transparentBond: false, removable: false, adhesionStrength: 8, temperatureMin: -20, temperatureMax: 200 },
    availableWidths: [50], availableLengths: [66], color: 'White',
    substrate: ['metal'], environment: 'outdoor', certification: ['RoHS'], shelfLife: 36, tags: [],
  },
  {
    id: 'p3', name: 'Gamma Film', sku: 'KLB-ELE-0003', category: 'electronics',
    application: ['bonding'], material: 'Kapton', adhesiveType: 'silicone',
    description: 'Desc 3', shortDescription: 'Short 3',
    properties: { uvResistance: false, waterResistance: false, solventResistance: true, foodSafe: false, flameRetardant: false, antistatic: true, transparentBond: false, removable: false, adhesionStrength: 3, temperatureMin: 0, temperatureMax: 260 },
    availableWidths: [12], availableLengths: [33], color: 'Yellow',
    substrate: ['metal'], environment: 'cleanroom', certification: ['UL'], shelfLife: 18, tags: [],
  },
];

const mockOptions = {
  categoryLabels: { packaging: 'Packaging', automotive: 'Automotive', electronics: 'Electronics' },
  adhesiveLabels: { acrylic: 'Acrylic', rubber: 'Natural Rubber', silicone: 'Silicone' },
  substrateLabels: { metal: 'Metal' },
  environmentLabels: { indoor: 'Indoor', outdoor: 'Outdoor', cleanroom: 'Cleanroom' },
  certificationLabels: { REACH: 'REACH', RoHS: 'RoHS', UL: 'UL' },
  applicationLabels: { bonding: 'Bonding' },
};

describe('ProductComparePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useComparisonStore.setState({ compareList: [] });
    vi.mocked(useProductData).mockReturnValue({
      products: mockProducts as never,
      filters: null,
      options: mockOptions as never,
      loading: false,
      error: null,
      refetch: vi.fn(),
    });
  });

  it('renders empty state when no products selected', () => {
    renderWithProviders(<ProductComparePage />);
    expect(screen.getByText('Compare Products')).toBeInTheDocument();
    expect(screen.getByText(/No products selected/)).toBeInTheDocument();
  });

  it('renders comparison table with selected products', () => {
    useComparisonStore.setState({ compareList: ['p1', 'p2'] });
    renderWithProviders(<ProductComparePage />);
    expect(screen.getByText('Alpha Tape')).toBeInTheDocument();
    expect(screen.getByText('Beta Bond')).toBeInTheDocument();
    expect(screen.getByText('2 of 4 products selected')).toBeInTheDocument();
  });

  it('renders specification rows in comparison table', () => {
    useComparisonStore.setState({ compareList: ['p1', 'p2'] });
    renderWithProviders(<ProductComparePage />);
    expect(screen.getByText('SKU')).toBeInTheDocument();
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Adhesion')).toBeInTheDocument();
    expect(screen.getByText('Material')).toBeInTheDocument();
  });

  it('shows spec values for each product', () => {
    useComparisonStore.setState({ compareList: ['p1', 'p2'] });
    renderWithProviders(<ProductComparePage />);
    // SKUs appear in both header and table rows
    expect(screen.getAllByText('KLB-PKG-0001').length).toBeGreaterThan(0);
    expect(screen.getAllByText('KLB-AUT-0002').length).toBeGreaterThan(0);
    // Adhesion values
    expect(screen.getByText('5 N/25mm')).toBeInTheDocument();
    expect(screen.getByText('8 N/25mm')).toBeInTheDocument();
  });

  it('removes a product when remove button is clicked', async () => {
    const user = userEvent.setup();
    useComparisonStore.setState({ compareList: ['p1', 'p2'] });
    renderWithProviders(<ProductComparePage />);
    await user.click(screen.getByLabelText('Remove Alpha Tape'));
    expect(useComparisonStore.getState().compareList).toEqual(['p2']);
  });

  it('clear all removes all products and shows empty state', async () => {
    const user = userEvent.setup();
    useComparisonStore.setState({ compareList: ['p1', 'p2'] });
    renderWithProviders(<ProductComparePage />);
    await user.click(screen.getByRole('button', { name: 'Clear All' }));
    expect(useComparisonStore.getState().compareList).toEqual([]);
  });

  it('renders loading skeleton', () => {
    vi.mocked(useProductData).mockReturnValue({
      products: [], filters: null, options: null,
      loading: true, error: null, refetch: vi.fn(),
    });
    useComparisonStore.setState({ compareList: ['p1'] });
    renderWithProviders(<ProductComparePage />);
    const skeletons = screen.getAllByRole('status');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('displays boolean properties as checkmark or dash', () => {
    useComparisonStore.setState({ compareList: ['p1'] });
    renderWithProviders(<ProductComparePage />);
    // p1 has uvResistance: true
    const uvRow = screen.getByText('UV Resistant').closest('tr')!;
    expect(uvRow.textContent).toContain('✓');
    // p1 has waterResistance: false
    const waterRow = screen.getByText('Water Resistant').closest('tr')!;
    expect(waterRow.textContent).toContain('–');
  });
});
