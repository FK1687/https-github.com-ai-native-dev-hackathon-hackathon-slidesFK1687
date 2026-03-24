import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useProductData } from '../use-product-data';

vi.mock('@/api', () => ({
  fetchProducts: vi.fn(),
  fetchFilters: vi.fn(),
  fetchOptions: vi.fn(),
}));

import { fetchProducts, fetchFilters, fetchOptions } from '@/api';

const mockProducts = [
  { id: 'p1', name: 'Product 1' },
  { id: 'p2', name: 'Product 2' },
];
const mockFilters = { categories: ['packaging'] };
const mockOptions = { categoryLabels: { packaging: 'Packaging' } };

describe('useProductData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(fetchProducts).mockResolvedValue(mockProducts as never);
    vi.mocked(fetchFilters).mockResolvedValue(mockFilters as never);
    vi.mocked(fetchOptions).mockResolvedValue(mockOptions as never);
  });

  it('starts in loading state', () => {
    const { result } = renderHook(() => useProductData());
    expect(result.current.loading).toBe(true);
  });

  it('populates products, filters, and options after fetch', async () => {
    const { result } = renderHook(() => useProductData());
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.filters).toEqual(mockFilters);
    expect(result.current.options).toEqual(mockOptions);
    expect(result.current.error).toBeNull();
  });

  it('sets error state on fetch failure', async () => {
    vi.mocked(fetchProducts).mockRejectedValue(new Error('Network error'));
    const { result } = renderHook(() => useProductData());
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.error).toBe('Network error');
    expect(result.current.products).toEqual([]);
  });

  it('sets fallback error message for non-Error throws', async () => {
    vi.mocked(fetchProducts).mockRejectedValue('unknown');
    const { result } = renderHook(() => useProductData());
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.error).toBe('Failed to load product data');
  });

  it('refetch triggers a new data load', async () => {
    const { result } = renderHook(() => useProductData());
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(fetchProducts).toHaveBeenCalledTimes(1);

    await result.current.refetch();
    expect(fetchProducts).toHaveBeenCalledTimes(2);
  });
});
