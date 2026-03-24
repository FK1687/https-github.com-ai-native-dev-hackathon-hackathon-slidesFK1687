import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithProviders, screen, userEvent, waitFor } from '@/test/utils';

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
import { ProductFinderPage } from '../ProductFinderPage';

const mockFilters = {
  categories: ['packaging', 'automotive'] as const,
  applications: ['bonding'] as const,
  adhesiveTypes: ['acrylic'] as const,
  substrates: ['metal'] as const,
  environments: ['indoor'] as const,
  certifications: ['REACH'] as const,
  properties: ['uvResistance', 'waterResistance'] as const,
  temperatureRange: { min: -70, max: 260 },
  adhesionRange: { min: 0, max: 15 },
};

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
    id: 'p1', name: 'Test Alpha', sku: 'KLB-PKG-0001', category: 'packaging',
    application: ['bonding'], material: 'PET', adhesiveType: 'acrylic',
    description: 'Desc 1', shortDescription: 'Short 1',
    properties: { uvResistance: true, waterResistance: false, solventResistance: false, foodSafe: false, flameRetardant: false, antistatic: false, transparentBond: false, removable: false, adhesionStrength: 5, temperatureMin: -10, temperatureMax: 100 },
    availableWidths: [25], availableLengths: [33], color: 'Clear', substrate: ['metal'], environment: 'indoor', certification: ['REACH'], shelfLife: 24, tags: ['film'],
  },
  {
    id: 'p2', name: 'Test Beta', sku: 'KLB-AUT-0002', category: 'automotive',
    application: ['bonding'], material: 'Foam', adhesiveType: 'acrylic',
    description: 'Desc 2', shortDescription: 'Short 2',
    properties: { uvResistance: false, waterResistance: true, solventResistance: false, foodSafe: false, flameRetardant: false, antistatic: false, transparentBond: false, removable: false, adhesionStrength: 8, temperatureMin: -20, temperatureMax: 200 },
    availableWidths: [50], availableLengths: [66], color: 'White', substrate: ['metal'], environment: 'indoor', certification: ['REACH'], shelfLife: 36, tags: ['foam'],
  },
];

describe('ProductFinderPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useProductData).mockReturnValue({
      products: mockProducts,
      filters: mockFilters as never,
      options: mockOptions as never,
      loading: false,
      error: null,
      refetch: vi.fn(),
    });
    vi.mocked(filterProducts).mockImplementation((products) => products as never);
    vi.mocked(sortProducts).mockImplementation((products) => products as never);
  });

  it('renders heading and description', () => {
    renderWithProviders(<ProductFinderPage />);
    expect(screen.getByText('Product Finder')).toBeInTheDocument();
    expect(screen.getByText(/Find the perfect adhesive/)).toBeInTheDocument();
  });

  it('renders search input', () => {
    renderWithProviders(<ProductFinderPage />);
    expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
  });

  it('shows product count', () => {
    renderWithProviders(<ProductFinderPage />);
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('products found')).toBeInTheDocument();
  });

  it('renders product cards', () => {
    renderWithProviders(<ProductFinderPage />);
    expect(screen.getByText('Test Alpha')).toBeInTheDocument();
    expect(screen.getByText('Test Beta')).toBeInTheDocument();
  });

  it('renders sort dropdown', () => {
    renderWithProviders(<ProductFinderPage />);
    expect(screen.getByDisplayValue('Name (A–Z)')).toBeInTheDocument();
  });

  it('renders loading skeleton when loading', () => {
    vi.mocked(useProductData).mockReturnValue({
      products: [], filters: null, options: null,
      loading: true, error: null, refetch: vi.fn(),
    });
    renderWithProviders(<ProductFinderPage />);
    const skeletons = screen.getAllByRole('status');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders error state with retry button', () => {
    const refetch = vi.fn();
    vi.mocked(useProductData).mockReturnValue({
      products: [], filters: null, options: null,
      loading: false, error: 'Network error', refetch,
    });
    renderWithProviders(<ProductFinderPage />);
    expect(screen.getByText(/Network error/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
  });

  it('calls refetch when retry button is clicked', async () => {
    const user = userEvent.setup();
    const refetch = vi.fn();
    vi.mocked(useProductData).mockReturnValue({
      products: [], filters: null, options: null,
      loading: false, error: 'Oops', refetch,
    });
    renderWithProviders(<ProductFinderPage />);
    await user.click(screen.getByRole('button', { name: 'Retry' }));
    expect(refetch).toHaveBeenCalledOnce();
  });

  it('renders filter accordion sections', () => {
    renderWithProviders(<ProductFinderPage />);
    // Accordion sections render as buttons with text
    const buttons = screen.getAllByRole('button');
    const buttonTexts = buttons.map((b) => b.textContent);
    expect(buttonTexts.some((t) => t?.includes('Category'))).toBe(true);
    expect(buttonTexts.some((t) => t?.includes('Application'))).toBe(true);
    expect(buttonTexts.some((t) => t?.includes('Adhesive Type'))).toBe(true);
    expect(buttonTexts.some((t) => t?.includes('Substrate'))).toBe(true);
    expect(buttonTexts.some((t) => t?.includes('Environment'))).toBe(true);
    expect(buttonTexts.some((t) => t?.includes('Certifications'))).toBe(true);
    expect(buttonTexts.some((t) => t?.includes('Properties'))).toBe(true);
  });
});
