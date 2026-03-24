import { Link } from 'react-router-dom';
import { useComparisonStore } from '@/stores';
import { useProductData } from '@/hooks';
import { Button } from '@/components/ui';

export function CompareBar(): JSX.Element | null {
  const { compareList, removeFromCompare, clearCompare } = useComparisonStore();
  const { products } = useProductData();

  if (compareList.length === 0) return null;

  const compareProducts = compareList
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-kleb-gray-300 bg-kleb-white shadow-lg">
      <div className="mx-auto max-w-5xl px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 overflow-x-auto">
            <span className="text-sm font-medium text-kleb-gray-900 shrink-0">Compare</span>
            {compareProducts.map((product) => product && (
              <span
                key={product.id}
                className="inline-flex items-center gap-1 border border-kleb-gray-300 px-2 py-1 text-xs shrink-0"
              >
                <span className="font-medium whitespace-nowrap">{product.name}</span>
                <button
                  onClick={() => removeFromCompare(product.id)}
                  className="ml-1 text-kleb-gray-400 hover:text-kleb-gray-600"
                  aria-label={`Remove ${product.name} from comparison`}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </span>
            ))}
            <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium font-[var(--font-family-mono)] border border-kleb-gray-300">
              {compareList.length}/4
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button variant="ghost" size="sm" onClick={clearCompare}>Clear</Button>
            <Link
              to="/compare"
              className="inline-flex items-center justify-center gap-2 font-medium transition-colors bg-kleb-gray-900 text-kleb-white hover:bg-kleb-gray-800 border border-kleb-gray-900 px-3 py-1.5 text-xs"
            >
              Compare
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
