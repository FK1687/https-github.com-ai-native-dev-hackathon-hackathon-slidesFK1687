import { Link } from 'react-router-dom';
import type { Product } from '@/types';
import { useComparisonStore } from '@/stores';
import { Card, Badge, Button } from '@/components/ui';

interface ProductCardProps {
  product: Product;
  options?: {
    categoryLabels?: Record<string, string>;
    adhesiveLabels?: Record<string, string>;
  };
}

export function ProductCard({ product, options }: ProductCardProps): JSX.Element {
  const { addToCompare, removeFromCompare, isInCompare } = useComparisonStore();
  const inCompare = isInCompare(product.id);

  const categoryLabel = options?.categoryLabels?.[product.category] ?? product.category;
  const adhesiveLabel = options?.adhesiveLabels?.[product.adhesiveType] ?? product.adhesiveType;

  return (
    <Card className="flex flex-col h-full group">
      {/* Color swatch / visual */}
      <div className="h-2 w-full bg-kleb-green" />

      <div className="flex flex-col flex-1 p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="min-w-0">
            <Link
              to={`/products/${product.id}`}
              className="text-sm font-medium text-kleb-gray-900 hover:text-kleb-green-dark transition-colors line-clamp-1"
            >
              {product.name}
            </Link>
            <p className="text-xs text-kleb-gray-400 font-[var(--font-family-mono)] mt-0.5">{product.sku}</p>
          </div>
          <Badge variant="outline" className="shrink-0 text-[10px]">{categoryLabel}</Badge>
        </div>

        {/* Description */}
        <p className="text-xs text-kleb-gray-500 line-clamp-2 mb-3">{product.shortDescription}</p>

        {/* Key specs */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs mb-3">
          <div>
            <span className="text-kleb-gray-400">Adhesive</span>
            <p className="font-medium text-kleb-gray-700">{adhesiveLabel}</p>
          </div>
          <div>
            <span className="text-kleb-gray-400">Adhesion</span>
            <p className="font-medium text-kleb-gray-700">{product.properties.adhesionStrength} N/25mm</p>
          </div>
          <div>
            <span className="text-kleb-gray-400">Temp Range</span>
            <p className="font-medium text-kleb-gray-700">
              {product.properties.temperatureMin}°C to {product.properties.temperatureMax}°C
            </p>
          </div>
          <div>
            <span className="text-kleb-gray-400">Environment</span>
            <p className="font-medium text-kleb-gray-700 capitalize">{product.environment}</p>
          </div>
        </div>

        {/* Properties badges */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.properties.uvResistance && <Badge variant="secondary" className="text-[10px]">UV</Badge>}
          {product.properties.waterResistance && <Badge variant="secondary" className="text-[10px]">Water</Badge>}
          {product.properties.foodSafe && <Badge className="text-[10px]">Food Safe</Badge>}
          {product.properties.flameRetardant && <Badge variant="secondary" className="text-[10px]">Flame Ret.</Badge>}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Actions */}
        <div className="flex items-center gap-2 pt-3 border-t border-kleb-gray-100">
          <Button size="sm" className="flex-1" onClick={() => {
            // Navigate handled by parent or Link
          }}>
            <Link to={`/products/${product.id}`} className="text-inherit no-underline">View Details</Link>
          </Button>
          <Button
            variant={inCompare ? 'solid' : 'outline'}
            size="sm"
            onClick={() => inCompare ? removeFromCompare(product.id) : addToCompare(product.id)}
            aria-label={inCompare ? `Remove ${product.name} from comparison` : `Add ${product.name} to comparison`}
          >
            {inCompare ? '✓' : '+'}
          </Button>
        </div>
      </div>
    </Card>
  );
}
