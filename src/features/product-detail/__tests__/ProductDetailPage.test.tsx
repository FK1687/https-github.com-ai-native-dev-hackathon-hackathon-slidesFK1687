import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderWithProviders, screen, userEvent, waitFor } from '@/test/utils';

vi.mock('@/api', () => ({
  fetchProduct: vi.fn(),
  fetchProducts: vi.fn(),
}));

vi.mock('@/hooks', () => ({
  useProductData: vi.fn(),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...(actual as object),
    useParams: vi.fn(() => ({ id: 'p1' })),
  };
});

import { fetchProduct, fetchProducts } from '@/api';
import { useProductData } from '@/hooks';
import { useParams } from 'react-router-dom';
import { useComparisonStore } from '@/stores';
import { ProductDetailPage } from '../ProductDetailPage';

const mockProduct = {
  id: 'p1', name: 'Test Alpha Tape', sku: 'KLB-PKG-0001', category: 'packaging',
  application: ['bonding'], material: 'Polyester (PET)', adhesiveType: 'acrylic',
  description: 'High-performance acrylic adhesive tape.',
  shortDescription: 'Acrylic on PET.',
  properties: {
    uvResistance: true, waterResistance: true, solventResistance: false,
    foodSafe: false, flameRetardant: false, antistatic: false,
    transparentBond: false, removable: false,
    adhesionStrength: 5.0, temperatureMin: -10, temperatureMax: 100,
  },
  availableWidths: [25, 50], availableLengths: [33, 66],
  color: 'Clear', substrate: ['metal', 'plastic'],
  environment: 'indoor', certification: ['REACH', 'RoHS'],
  shelfLife: 24, tags: ['film', 'permanent'],
};

const relatedProduct = {
  ...mockProduct,
  id: 'p2', name: 'Related Tape', sku: 'KLB-PKG-0002',
};

const mockOptions = {
  categoryLabels: { packaging: 'Packaging' },
  adhesiveLabels: { acrylic: 'Acrylic' },
  substrateLabels: { metal: 'Metal', plastic: 'Plastic' },
  environmentLabels: { indoor: 'Indoor' },
  certificationLabels: { REACH: 'REACH', RoHS: 'RoHS' },
  applicationLabels: {},
};

describe('ProductDetailPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useComparisonStore.setState({ compareList: [] });
    vi.mocked(useParams).mockReturnValue({ id: 'p1' });
    vi.mocked(fetchProduct).mockResolvedValue(mockProduct as never);
    vi.mocked(fetchProducts).mockResolvedValue([mockProduct, relatedProduct] as never);
    vi.mocked(useProductData).mockReturnValue({
      products: [mockProduct, relatedProduct] as never,
      filters: null,
      options: mockOptions as never,
      loading: false,
      error: null,
      refetch: vi.fn(),
    });
  });

  it('renders product header with name and SKU', async () => {
    renderWithProviders(<ProductDetailPage />);
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Test Alpha Tape' })).toBeInTheDocument();
    });
    expect(screen.getByText('KLB-PKG-0001')).toBeInTheDocument();
  });

  it('renders breadcrumb navigation', async () => {
    renderWithProviders(<ProductDetailPage />);
    await waitFor(() => {
      expect(screen.getByText('Products')).toBeInTheDocument();
    });
  });

  it('renders description', async () => {
    renderWithProviders(<ProductDetailPage />);
    await waitFor(() => {
      expect(screen.getByText('High-performance acrylic adhesive tape.')).toBeInTheDocument();
    });
  });

  it('renders specification tabs', async () => {
    renderWithProviders(<ProductDetailPage />);
    await waitFor(() => {
      expect(screen.getByRole('tab', { name: 'Specifications' })).toBeInTheDocument();
    });
    expect(screen.getByRole('tab', { name: 'Dimensions' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Resistance' })).toBeInTheDocument();
  });

  it('shows specifications tab content by default', async () => {
    renderWithProviders(<ProductDetailPage />);
    await waitFor(() => {
      expect(screen.getByText('Adhesion Strength')).toBeInTheDocument();
    });
    expect(screen.getAllByText('5 N/25mm').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Polyester (PET)').length).toBeGreaterThanOrEqual(1);
  });

  it('switches to dimensions tab', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProductDetailPage />);
    await waitFor(() => {
      expect(screen.getByRole('tab', { name: 'Dimensions' })).toBeInTheDocument();
    });
    await user.click(screen.getByRole('tab', { name: 'Dimensions' }));
    expect(screen.getByText('Available Widths (mm)')).toBeInTheDocument();
  });

  it('renders Add to Compare button', async () => {
    renderWithProviders(<ProductDetailPage />);
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Add to Compare' })).toBeInTheDocument();
    });
  });

  it('toggles compare state', async () => {
    const user = userEvent.setup();
    renderWithProviders(<ProductDetailPage />);
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Add to Compare' })).toBeInTheDocument();
    });
    await user.click(screen.getByRole('button', { name: 'Add to Compare' }));
    expect(useComparisonStore.getState().compareList).toContain('p1');
  });

  it('renders product not found for invalid ID', async () => {
    vi.mocked(fetchProduct).mockResolvedValue(undefined);
    renderWithProviders(<ProductDetailPage />);
    await waitFor(() => {
      expect(screen.getByText('Product not found')).toBeInTheDocument();
    });
  });

  it('renders related products', async () => {
    renderWithProviders(<ProductDetailPage />);
    await waitFor(() => {
      expect(screen.getByText('Related Products')).toBeInTheDocument();
    });
    expect(screen.getByText('Related Tape')).toBeInTheDocument();
  });
});
