import { useState, useMemo } from 'react';
import type { SortOption, ViewMode, ProductCategory } from '@/types';
import { useProductData } from '@/hooks';
import { filterProducts, sortProducts } from '@/hooks/use-filter-products';
import { ProductCard } from '@/components/ProductCard';
import { PaginationControls } from '@/components/PaginationControls';
import { Input, Select, Button, Skeleton, Badge } from '@/components/ui';
import { Link } from 'react-router-dom';

const PAGE_SIZE = 24;

export function ProductCatalogPage(): JSX.Element {
  const { products, options, loading, error, refetch } = useProductData();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const result = filterProducts(products, {
      search,
      categories: category ? [category as ProductCategory] : [],
      applications: [],
      tempRange: [-200, 500],
      adhesionRange: [0, 200],
      properties: [],
      adhesiveTypes: [],
      substrates: [],
      environments: [],
      certifications: [],
    });
    return sortProducts(result, sortBy);
  }, [products, search, category, sortBy]);

  const paged = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  if (error) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 text-center">
        <p className="text-sm text-red-600 mb-4">{error}</p>
        <Button onClick={refetch}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-kleb-gray-900">Products</h1>
        <p className="text-sm text-kleb-gray-500 mt-1">Browse our complete catalog of industrial adhesive tapes.</p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border border-kleb-gray-300 p-4">
        <div className="flex items-center gap-3 flex-wrap flex-1">
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            onClear={() => { setSearch(''); setPage(1); }}
            className="w-64"
          />
          <Select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(1); }}
            className="w-44"
          >
            <option value="">All Categories</option>
            {options && Object.entries(options.categoryLabels).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </Select>
        </div>
        <div className="flex items-center gap-3">
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="w-44"
          >
            <option value="name">Name (A–Z)</option>
            <option value="adhesion-asc">Adhesion ↑</option>
            <option value="adhesion-desc">Adhesion ↓</option>
            <option value="temp-range">Temp Range</option>
          </Select>
          <div className="flex border border-kleb-gray-300">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 text-xs ${viewMode === 'grid' ? 'bg-kleb-gray-900 text-kleb-white' : 'text-kleb-gray-500 hover:bg-kleb-gray-50'}`}
              aria-label="Grid view"
            >
              ⊞
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 text-xs ${viewMode === 'list' ? 'bg-kleb-gray-900 text-kleb-white' : 'text-kleb-gray-500 hover:bg-kleb-gray-50'}`}
              aria-label="List view"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-kleb-gray-500">
          <span className="font-medium text-kleb-gray-900 font-[var(--font-family-mono)]">{filtered.length}</span> products
        </p>
        {(search || category) && (
          <button
            onClick={() => { setSearch(''); setCategory(''); setPage(1); }}
            className="text-xs text-kleb-green-dark hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-72 w-full" />)}
        </div>
      )}

      {/* Empty */}
      {!loading && filtered.length === 0 && (
        <div className="text-center py-16 border border-kleb-gray-300">
          <p className="text-sm text-kleb-gray-500">No products found.</p>
        </div>
      )}

      {/* Grid view */}
      {!loading && viewMode === 'grid' && paged.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paged.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              options={{ categoryLabels: options?.categoryLabels, adhesiveLabels: options?.adhesiveLabels }}
            />
          ))}
        </div>
      )}

      {/* List view */}
      {!loading && viewMode === 'list' && paged.length > 0 && (
        <div className="space-y-2">
          {paged.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="flex items-center gap-4 border border-kleb-gray-300 p-4 hover:bg-kleb-gray-50 transition-colors"
            >
              <div className="h-10 w-10 bg-kleb-green shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-kleb-gray-900 truncate">{product.name}</p>
                <p className="text-xs text-kleb-gray-500 truncate">{product.shortDescription}</p>
              </div>
              <div className="hidden sm:flex items-center gap-3 text-xs text-kleb-gray-500">
                <Badge variant="outline">{options?.categoryLabels?.[product.category] ?? product.category}</Badge>
                <span>{product.properties.adhesionStrength} N/25mm</span>
                <span>{product.properties.temperatureMin}° to {product.properties.temperatureMax}°C</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {!loading && (
        <PaginationControls
          currentPage={page}
          totalItems={filtered.length}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}

export default ProductCatalogPage;
