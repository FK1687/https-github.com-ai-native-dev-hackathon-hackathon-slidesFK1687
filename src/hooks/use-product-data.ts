import { useState, useEffect, useCallback } from 'react';
import type { Product, FilterConfiguration, OptionsData } from '@/types';
import { fetchProducts, fetchFilters, fetchOptions } from '@/api';

interface ProductDataState {
  products: Product[];
  filters: FilterConfiguration | null;
  options: OptionsData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useProductData(): ProductDataState {
  const [products, setProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<FilterConfiguration | null>(null);
  const [options, setOptions] = useState<OptionsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [productsData, filtersData, optionsData] = await Promise.all([
        fetchProducts(),
        fetchFilters(),
        fetchOptions(),
      ]);
      setProducts(productsData);
      setFilters(filtersData);
      setOptions(optionsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load product data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  return { products, filters, options, loading, error, refetch: loadData };
}
