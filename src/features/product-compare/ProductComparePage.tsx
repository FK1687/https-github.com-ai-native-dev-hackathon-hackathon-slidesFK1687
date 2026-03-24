import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useComparisonStore } from '@/stores';
import { useProductData } from '@/hooks';
import { Button, Badge, Skeleton, Separator } from '@/components/ui';

export function ProductComparePage(): JSX.Element {
  const { compareList, removeFromCompare, clearCompare } = useComparisonStore();
  const { products, options, loading } = useProductData();

  const compareProducts = useMemo(
    () => compareList.map((id) => products.find((p) => p.id === id)).filter(Boolean),
    [compareList, products],
  );

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <Skeleton className="h-8 w-48 mb-6" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (compareList.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 text-center">
        <h1 className="text-2xl font-bold text-kleb-gray-900 mb-4">Compare Products</h1>
        <p className="text-sm text-kleb-gray-500 mb-6">
          No products selected for comparison. Browse the catalog and add up to 4 products.
        </p>
        <Button asChild={false}>
          <Link to="/products" className="text-inherit no-underline">Browse Products</Link>
        </Button>
      </div>
    );
  }

  const specRows: { label: string; getValue: (p: NonNullable<(typeof compareProducts)[number]>) => string }[] = [
    { label: 'SKU', getValue: (p) => p.sku },
    { label: 'Category', getValue: (p) => options?.categoryLabels?.[p.category] ?? p.category },
    { label: 'Adhesive Type', getValue: (p) => options?.adhesiveLabels?.[p.adhesiveType] ?? p.adhesiveType },
    { label: 'Material', getValue: (p) => p.material },
    { label: 'Adhesion', getValue: (p) => `${p.properties.adhesionStrength} N/25mm` },
    { label: 'Temp Min', getValue: (p) => `${p.properties.temperatureMin}°C` },
    { label: 'Temp Max', getValue: (p) => `${p.properties.temperatureMax}°C` },
    { label: 'Environment', getValue: (p) => p.environment },
    { label: 'Color', getValue: (p) => p.color },
    { label: 'UV Resistant', getValue: (p) => p.properties.uvResistance ? '✓' : '–' },
    { label: 'Water Resistant', getValue: (p) => p.properties.waterResistance ? '✓' : '–' },
    { label: 'Solvent Resistant', getValue: (p) => p.properties.solventResistance ? '✓' : '–' },
    { label: 'Food Safe', getValue: (p) => p.properties.foodSafe ? '✓' : '–' },
    { label: 'Flame Retardant', getValue: (p) => p.properties.flameRetardant ? '✓' : '–' },
    { label: 'Removable', getValue: (p) => p.properties.removable ? '✓' : '–' },
    { label: 'Transparent Bond', getValue: (p) => p.properties.transparentBond ? '✓' : '–' },
    { label: 'Certifications', getValue: (p) => p.certification.join(', ') || '–' },
    { label: 'Widths (mm)', getValue: (p) => p.availableWidths.join(', ') },
    { label: 'Lengths (m)', getValue: (p) => p.availableLengths.join(', ') },
    { label: 'Shelf Life', getValue: (p) => `${p.shelfLife} months` },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-kleb-gray-900">Compare Products</h1>
          <p className="text-sm text-kleb-gray-500 mt-1">
            {compareProducts.length} of 4 products selected
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={clearCompare}>Clear All</Button>
      </div>

      <div className="overflow-x-auto border border-kleb-gray-300">
        <table className="w-full text-sm">
          {/* Product headers */}
          <thead>
            <tr className="border-b border-kleb-gray-300 bg-kleb-gray-50">
              <th className="sticky left-0 bg-kleb-gray-50 p-4 text-left text-xs font-medium text-kleb-gray-500 w-40 min-w-[160px]">
                Product
              </th>
              {compareProducts.map((product) => product && (
                <th key={product.id} className="p-4 text-left min-w-[200px]">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link
                        to={`/products/${product.id}`}
                        className="text-sm font-medium text-kleb-gray-900 hover:text-kleb-green-dark"
                      >
                        {product.name}
                      </Link>
                      <p className="text-[10px] text-kleb-gray-400 font-[var(--font-family-mono)] mt-0.5">
                        {product.sku}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCompare(product.id)}
                      className="text-kleb-gray-400 hover:text-kleb-gray-600 p-1"
                      aria-label={`Remove ${product.name}`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {specRows.map((row, i) => (
              <tr key={row.label} className={i % 2 === 0 ? 'bg-kleb-white' : 'bg-kleb-gray-50'}>
                <td className="sticky left-0 p-3 text-xs font-medium text-kleb-gray-500 border-r border-kleb-gray-200 bg-inherit">
                  {row.label}
                </td>
                {compareProducts.map((product) => product && (
                  <td key={product.id} className="p-3 text-xs text-kleb-gray-700">
                    {row.getValue(product)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <Button variant="outline" asChild={false}>
          <Link to="/products" className="text-inherit no-underline">Add More Products</Link>
        </Button>
        <Button asChild={false}>
          <Link to="/contact" className="text-inherit no-underline">Contact Sales</Link>
        </Button>
      </div>
    </div>
  );
}

export default ProductComparePage;
