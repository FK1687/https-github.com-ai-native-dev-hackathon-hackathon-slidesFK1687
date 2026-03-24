import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithProviders, screen, userEvent } from '@/test/utils';

vi.mock('@/hooks', () => ({
  useProductData: vi.fn(),
  filterProducts: vi.fn(),
  sortProducts: vi.fn(),
}));

vi.mock('@/hooks/use-filter-products', () => ({
  filterProducts: vi.fn((products: unknown[]) => products),
  sortProducts: vi.fn((products: unknown[]) => products),
}));

import { useProductData } from '@/hooks';
import { filterProducts, sortProducts } from '@/hooks/use-filter-products';
import { ProductCatalogPage } from '../ProductCatalogPage';

const mockOptions = {
  categoryLabels: { packaging: 'Packaging', automotive: 'Automotive' },
  applicationLabels: { bonding: 'Bonding' },
  adhesiveLabels: { acrylic: 'Acrylic' },
  substrateLabels: { metal: 'Metal' },
  environmentLabels: { indoor: 'Indoor' },
  certificationLabels: { REACH: 'REACH' },
};

const mockProducts = [
  {
    id: 'p1', name: 'Alpha Tape', sku: 'KLB-PKG-0001', category: 'packaging',
    application: ['bonding'], material: 'PET', adhesiveType: 'acrylic',
    description: 'Desc 1', shortDescription: 'Acrylic on PET for packaging.',
    properties: { uvResistance: true, waterResistance: false, solventResistance: false, foodSafe: false, flameRetardant: false, antistatic: false, transparentBond: false, removable: false, adhesionStrength: 5, temperatureMin: -10, temperatureMax: 100 },
    availableWidths: [25], availableLengths: [33], color: 'Clear', substrate: ['metal'], environment: 'indoor', certification: ['REACH'], shelfLife: 24, tags: ['film'],
  },
  {
    id: 'p2', name: 'Beta Bond', sku: 'KLB-AUT-0002', category: 'automotive',
    application: ['bonding'], material: 'Foam', adhesiveType: 'acrylic',
    description: 'Desc 2', shortDescription: 'Acrylic on foam for automotive.',
    properties: { uvResistance: false, waterResistance: true, solventResistance: false, foodSafe: false, flameRetardant: false, antistatic: false, transparentBond: false, removable: false, adhesionStrength: 8, temperatureMin: -20, temperatureMax: 200 },
    availableWidths: [50], availableLengths: [66], color: 'White', substrate: ['metal'], environment: 'indoor', certification: ['REACH'], shelfLife: 36, tags: ['foam'],
  },
];

describe('ProductCatalogPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useProductData).mockReturnValue({
      products: mockProducts,
      filters: null,
      options: mockOptions as never,
      loading: false,
      error: null,
      refetch: vi.fn(),
    });
    vi.mocked(filterProducts).mockImplementation((products) => products as never);
    vi.mocked(sortProducts).mockImplementation((products) => products as never);
  });

  it('renders heading', () => {
    renderWithProviders(<ProductCatalogPage />);
    expect(screen.getByText('Products')).toBeInTheDocument();
  });

  it('renders search bar', () => {
    renderWithProviders(<ProductCatalogPage />);
    expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
  });

  it('renders category dropdown', () => {
    renderWithProviders(<ProductCatalogPage />);
    expect(screen.getByDisplayValue('All Categories')).toBeInTheDocument();
  });

  it('renders product count', () => {
    renderWithProviders(<ProductCatalogPage />);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('renders product cards in grid view by default', () => {
    renderWithProviders(<ProductCatalogPage />);
    expect(screen.getByText('Alpha Tape')).toBeInTheDocument();
    expect(screen.getByText('Beta Bond')).toBeInTheDocument();
  });

  it('renders view toggle buttons', () => {
    renderWithProviders(<ProductCatalogPage />);
    expect(screen.getByLabelText('Grid view')).toBeInTheDocument();
    expect(screen.getByLabelText('List view')).toBeInTheDocument();
  });

  it('switches to list view', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProductCatalogPage />);
    await user.click(screen.getByLabelText('List view'));
    // In list view, items show shortDescription
    expect(screen.getByText('Acrylic on PET for packaging.')).toBeInTheDocument();
  });

  it('renders error state with retry', () => {
    vi.mocked(useProductData).mockReturnValue({
      products: [], filters: null, options: null,
      loading: false, error: 'Server error', refetch: vi.fn(),
    });
    renderWithProviders(<ProductCatalogPage />);
    expect(screen.getByText('Server error')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
  });

  it('renders loading skeletons', () => {
    vi.mocked(useProductData).mockReturnValue({
      products: [], filters: null, options: null,
      loading: true, error: null, refetch: vi.fn(),
    });
    renderWithProviders(<ProductCatalogPage />);
    const skeletons = screen.getAllByRole('status');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders empty state when no products match', () => {
    vi.mocked(filterProducts).mockReturnValue([] as never);
    renderWithProviders(<ProductCatalogPage />);
    expect(screen.getByText('No products found.')).toBeInTheDocument();
  });
});
