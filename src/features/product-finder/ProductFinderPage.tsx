import { useState, useMemo } from 'react';
import type {
  ProductCategory,
  ApplicationType,
  AdhesiveType,
  SubstrateType,
  EnvironmentType,
  CertificationType,
  ProductProperties,
  SortOption,
} from '@/types';
import { useProductData } from '@/hooks';
import { filterProducts, sortProducts } from '@/hooks/use-filter-products';
import { ProductCard } from '@/components/ProductCard';
import { PaginationControls } from '@/components/PaginationControls';
import { Button, Input, Select, Skeleton, Badge } from '@/components/ui';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui';

const PAGE_SIZE = 24;

type PropertyKey = keyof Pick<
  ProductProperties,
  'uvResistance' | 'waterResistance' | 'solventResistance' |
  'foodSafe' | 'flameRetardant' | 'antistatic' |
  'transparentBond' | 'removable'
>;

const PROPERTY_LABELS: Record<PropertyKey, string> = {
  uvResistance: 'UV Resistant',
  waterResistance: 'Water Resistant',
  solventResistance: 'Solvent Resistant',
  foodSafe: 'Food Safe',
  flameRetardant: 'Flame Retardant',
  antistatic: 'Antistatic',
  transparentBond: 'Transparent Bond',
  removable: 'Removable',
};

export function ProductFinderPage(): JSX.Element {
  const { products, filters, options, loading, error, refetch } = useProductData();

  // Filter state
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [applications, setApplications] = useState<ApplicationType[]>([]);
  const [adhesiveTypes, setAdhesiveTypes] = useState<AdhesiveType[]>([]);
  const [substrates, setSubstrates] = useState<SubstrateType[]>([]);
  const [environments, setEnvironments] = useState<EnvironmentType[]>([]);
  const [certifications, setCertifications] = useState<CertificationType[]>([]);
  const [properties, setProperties] = useState<PropertyKey[]>([]);
  const [tempRange, setTempRange] = useState<[number, number]>([-40, 260]);
  const [adhesionRange, setAdhesionRange] = useState<[number, number]>([0, 60]);
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [page, setPage] = useState(1);

  const activeFilterCount = [
    categories.length, applications.length, adhesiveTypes.length,
    substrates.length, environments.length, certifications.length,
    properties.length,
  ].reduce((a, b) => a + b, 0) + (search ? 1 : 0);

  const filtered = useMemo(() => {
    const result = filterProducts(products, {
      search, categories, applications, tempRange, adhesionRange,
      properties, adhesiveTypes, substrates, environments, certifications,
    });
    return sortProducts(result, sortBy);
  }, [products, search, categories, applications, tempRange, adhesionRange,
      properties, adhesiveTypes, substrates, environments, certifications, sortBy]);

  const paged = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  // Reset page when filters change
  const setPageAndReset = (value: number) => setPage(value);

  function toggleArrayItem<T>(arr: T[], item: T, setter: (v: T[]) => void): void {
    setter(arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item]);
    setPage(1);
  }

  function clearAll(): void {
    setSearch(''); setCategories([]); setApplications([]);
    setAdhesiveTypes([]); setSubstrates([]); setEnvironments([]);
    setCertifications([]); setProperties([]);
    setTempRange([-40, 260]); setAdhesionRange([0, 60]);
    setPage(1);
  }

  if (error) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 text-center">
        <p className="text-sm text-red-600 mb-4">Failed to load products: {error}</p>
        <Button onClick={refetch}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-kleb-gray-900">Product Finder</h1>
        <p className="text-sm text-kleb-gray-500 mt-1">
          Find the perfect adhesive tape for your application. Use the filters to narrow down from {products.length} products.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filter Panel */}
        <aside className="w-full lg:w-72 shrink-0">
          <div className="border border-kleb-gray-300 bg-kleb-white">
            {/* Search */}
            <div className="p-4 border-b border-kleb-gray-300">
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                onClear={() => { setSearch(''); setPage(1); }}
              />
            </div>

            {/* Filter header */}
            <div className="flex items-center justify-between p-4 border-b border-kleb-gray-300">
              <span className="text-sm font-medium">Filters</span>
              {activeFilterCount > 0 && (
                <button onClick={clearAll} className="text-xs text-kleb-green-dark hover:underline">
                  Clear all ({activeFilterCount})
                </button>
              )}
            </div>

            {loading ? (
              <div className="p-4 space-y-4">
                {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-8 w-full" />)}
              </div>
            ) : (
              <Accordion>
                {/* Category */}
                <AccordionItem value="category">
                  <AccordionTrigger className="px-4">
                    Category {categories.length > 0 && <Badge className="ml-2 text-[10px]">{categories.length}</Badge>}
                  </AccordionTrigger>
                  <AccordionContent className="px-4">
                    <div className="space-y-1">
                      {filters?.categories.map((cat) => (
                        <label key={cat} className="flex items-center gap-2 text-xs cursor-pointer hover:bg-kleb-gray-50 px-1 py-0.5">
                          <input
                            type="checkbox"
                            checked={categories.includes(cat)}
                            onChange={() => toggleArrayItem(categories, cat, setCategories)}
                            className="accent-kleb-green"
                          />
                          {options?.categoryLabels[cat] ?? cat}
                        </label>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Application */}
                <AccordionItem value="application">
                  <AccordionTrigger className="px-4">
                    Application {applications.length > 0 && <Badge className="ml-2 text-[10px]">{applications.length}</Badge>}
                  </AccordionTrigger>
                  <AccordionContent className="px-4">
                    <div className="space-y-1">
                      {filters?.applications.map((app) => (
                        <label key={app} className="flex items-center gap-2 text-xs cursor-pointer hover:bg-kleb-gray-50 px-1 py-0.5">
                          <input
                            type="checkbox"
                            checked={applications.includes(app)}
                            onChange={() => toggleArrayItem(applications, app, setApplications)}
                            className="accent-kleb-green"
                          />
                          {options?.applicationLabels[app] ?? app}
                        </label>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Adhesive Type */}
                <AccordionItem value="adhesive">
                  <AccordionTrigger className="px-4">
                    Adhesive Type {adhesiveTypes.length > 0 && <Badge className="ml-2 text-[10px]">{adhesiveTypes.length}</Badge>}
                  </AccordionTrigger>
                  <AccordionContent className="px-4">
                    <div className="space-y-1">
                      {filters?.adhesiveTypes.map((at) => (
                        <label key={at} className="flex items-center gap-2 text-xs cursor-pointer hover:bg-kleb-gray-50 px-1 py-0.5">
                          <input
                            type="checkbox"
                            checked={adhesiveTypes.includes(at)}
                            onChange={() => toggleArrayItem(adhesiveTypes, at, setAdhesiveTypes)}
                            className="accent-kleb-green"
                          />
                          {options?.adhesiveLabels[at] ?? at}
                        </label>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Substrate */}
                <AccordionItem value="substrate">
                  <AccordionTrigger className="px-4">
                    Substrate {substrates.length > 0 && <Badge className="ml-2 text-[10px]">{substrates.length}</Badge>}
                  </AccordionTrigger>
                  <AccordionContent className="px-4">
                    <div className="space-y-1">
                      {filters?.substrates.map((sub) => (
                        <label key={sub} className="flex items-center gap-2 text-xs cursor-pointer hover:bg-kleb-gray-50 px-1 py-0.5">
                          <input
                            type="checkbox"
                            checked={substrates.includes(sub)}
                            onChange={() => toggleArrayItem(substrates, sub, setSubstrates)}
                            className="accent-kleb-green"
                          />
                          {options?.substrateLabels[sub] ?? sub}
                        </label>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Environment */}
                <AccordionItem value="environment">
                  <AccordionTrigger className="px-4">
                    Environment {environments.length > 0 && <Badge className="ml-2 text-[10px]">{environments.length}</Badge>}
                  </AccordionTrigger>
                  <AccordionContent className="px-4">
                    <div className="space-y-1">
                      {filters?.environments.map((env) => (
                        <label key={env} className="flex items-center gap-2 text-xs cursor-pointer hover:bg-kleb-gray-50 px-1 py-0.5">
                          <input
                            type="checkbox"
                            checked={environments.includes(env)}
                            onChange={() => toggleArrayItem(environments, env, setEnvironments)}
                            className="accent-kleb-green"
                          />
                          {options?.environmentLabels[env] ?? env}
                        </label>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Certifications */}
                <AccordionItem value="certifications">
                  <AccordionTrigger className="px-4">
                    Certifications {certifications.length > 0 && <Badge className="ml-2 text-[10px]">{certifications.length}</Badge>}
                  </AccordionTrigger>
                  <AccordionContent className="px-4">
                    <div className="space-y-1">
                      {filters?.certifications.map((cert) => (
                        <label key={cert} className="flex items-center gap-2 text-xs cursor-pointer hover:bg-kleb-gray-50 px-1 py-0.5">
                          <input
                            type="checkbox"
                            checked={certifications.includes(cert)}
                            onChange={() => toggleArrayItem(certifications, cert, setCertifications)}
                            className="accent-kleb-green"
                          />
                          {options?.certificationLabels[cert] ?? cert}
                        </label>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Properties */}
                <AccordionItem value="properties">
                  <AccordionTrigger className="px-4">
                    Properties {properties.length > 0 && <Badge className="ml-2 text-[10px]">{properties.length}</Badge>}
                  </AccordionTrigger>
                  <AccordionContent className="px-4">
                    <div className="space-y-1">
                      {filters?.properties.map((prop) => (
                        <label key={prop} className="flex items-center gap-2 text-xs cursor-pointer hover:bg-kleb-gray-50 px-1 py-0.5">
                          <input
                            type="checkbox"
                            checked={properties.includes(prop)}
                            onChange={() => toggleArrayItem(properties, prop, setProperties)}
                            className="accent-kleb-green"
                          />
                          {PROPERTY_LABELS[prop]}
                        </label>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1 min-w-0">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
            <p className="text-sm text-kleb-gray-500">
              <span className="font-medium text-kleb-gray-900 font-[var(--font-family-mono)]">{filtered.length}</span>{' '}
              {filtered.length === 1 ? 'product' : 'products'} found
            </p>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-44"
            >
              <option value="name">Name (A–Z)</option>
              <option value="adhesion-asc">Adhesion (Low → High)</option>
              <option value="adhesion-desc">Adhesion (High → Low)</option>
              <option value="temp-range">Temperature Range</option>
            </Select>
          </div>

          {/* Loading */}
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-72 w-full" />)}
            </div>
          )}

          {/* No results */}
          {!loading && filtered.length === 0 && (
            <div className="text-center py-16 border border-kleb-gray-300">
              <p className="text-sm text-kleb-gray-500 mb-3">No products match your filters.</p>
              <Button variant="outline" size="sm" onClick={clearAll}>Clear all filters</Button>
            </div>
          )}

          {/* Grid */}
          {!loading && paged.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {paged.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    options={{
                      categoryLabels: options?.categoryLabels,
                      adhesiveLabels: options?.adhesiveLabels,
                    }}
                  />
                ))}
              </div>
              <PaginationControls
                currentPage={page}
                totalItems={filtered.length}
                pageSize={PAGE_SIZE}
                onPageChange={setPageAndReset}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductFinderPage;
