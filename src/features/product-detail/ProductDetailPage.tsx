import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Product } from '@/types';
import { fetchProduct, fetchProducts } from '@/api';
import { useComparisonStore } from '@/stores';
import { useProductData } from '@/hooks';
import { Button, Badge, Skeleton, Separator } from '@/components/ui';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui';
import { ProductCard } from '@/components/ProductCard';

const PROPERTY_LABELS: Record<string, string> = {
  uvResistance: 'UV Resistant',
  waterResistance: 'Water Resistant',
  solventResistance: 'Solvent Resistant',
  foodSafe: 'Food Safe',
  flameRetardant: 'Flame Retardant',
  antistatic: 'Antistatic',
  transparentBond: 'Transparent Bond',
  removable: 'Removable',
};

export function ProductDetailPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const { options } = useProductData();
  const { addToCompare, removeFromCompare, isInCompare } = useComparisonStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);

    Promise.all([fetchProduct(id), fetchProducts()])
      .then(([prod, all]) => {
        if (!prod) {
          setError('Product not found');
          return;
        }
        setProduct(prod);
        // Find related: same category, different id
        const rel = all
          .filter((p) => p.category === prod.category && p.id !== prod.id)
          .slice(0, 4);
        setRelated(rel);
      })
      .catch(() => setError('Failed to load product'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <Skeleton className="h-4 w-48 mb-6" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Skeleton className="h-64 lg:col-span-1" />
          <div className="lg:col-span-2 space-y-4">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 text-center">
        <p className="text-sm text-red-600 mb-4">{error ?? 'Product not found'}</p>
        <Button variant="outline" onClick={() => window.history.back()}>Go Back</Button>
      </div>
    );
  }

  const inCompare = isInCompare(product.id);
  const booleanProperties = Object.entries(product.properties).filter(
    ([key, val]) => typeof val === 'boolean' && val && key in PROPERTY_LABELS,
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-kleb-gray-400 mb-6" aria-label="Breadcrumb">
        <Link to="/products" className="hover:text-kleb-gray-600 transition-colors">Products</Link>
        <span>/</span>
        <span className="text-kleb-gray-600">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Product visual */}
        <div className="lg:col-span-1">
          <div className="border border-kleb-gray-300 aspect-square flex items-center justify-center bg-kleb-gray-50">
            <div className="w-32 h-32 bg-kleb-green opacity-20" />
          </div>
          <div className="mt-4 flex gap-2">
            <Button
              className="flex-1"
              variant={inCompare ? 'solid' : 'outline'}
              onClick={() => inCompare ? removeFromCompare(product.id) : addToCompare(product.id)}
            >
              {inCompare ? 'Remove from Compare' : 'Add to Compare'}
            </Button>
          </div>
        </div>

        {/* Product info */}
        <div className="lg:col-span-2">
          <div className="flex items-start gap-3 mb-2">
            <h1 className="text-xl font-bold text-kleb-gray-900">{product.name}</h1>
            <Badge variant="outline" className="mt-1 shrink-0">
              {options?.categoryLabels?.[product.category] ?? product.category}
            </Badge>
          </div>
          <p className="text-xs text-kleb-gray-400 font-[var(--font-family-mono)] mb-4">{product.sku}</p>
          <p className="text-sm text-kleb-gray-600 mb-6">{product.description}</p>

          {/* Feature badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {booleanProperties.map(([key]) => (
              <Badge key={key}>{PROPERTY_LABELS[key]}</Badge>
            ))}
            {product.certification.map((cert) => (
              <Badge key={cert} variant="outline">{cert}</Badge>
            ))}
          </div>

          <Separator className="my-6" />

          {/* Tabs */}
          <Tabs defaultValue="specs">
            <TabsList>
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="dimensions">Dimensions</TabsTrigger>
              <TabsTrigger value="resistance">Resistance</TabsTrigger>
            </TabsList>

            <TabsContent value="specs">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <SpecRow label="Adhesive Type" value={options?.adhesiveLabels?.[product.adhesiveType] ?? product.adhesiveType} />
                <SpecRow label="Material" value={product.material} />
                <SpecRow label="Adhesion Strength" value={`${product.properties.adhesionStrength} N/25mm`} />
                <SpecRow label="Temperature Range" value={`${product.properties.temperatureMin}°C to ${product.properties.temperatureMax}°C`} />
                <SpecRow label="Environment" value={product.environment} />
                <SpecRow label="Color" value={product.color} />
                <SpecRow label="Shelf Life" value={`${product.shelfLife} months`} />
                <SpecRow label="Substrates" value={product.substrate.map((s) => options?.substrateLabels?.[s] ?? s).join(', ')} />
              </div>
            </TabsContent>

            <TabsContent value="dimensions">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-kleb-gray-400 text-xs mb-1">Available Widths (mm)</p>
                  <div className="flex flex-wrap gap-1">
                    {product.availableWidths.map((w) => (
                      <Badge key={w} variant="secondary">{w}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-kleb-gray-400 text-xs mb-1">Available Lengths (m)</p>
                  <div className="flex flex-wrap gap-1">
                    {product.availableLengths.map((l) => (
                      <Badge key={l} variant="secondary">{l}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="resistance">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <ResistanceItem label="UV" active={product.properties.uvResistance} />
                <ResistanceItem label="Water" active={product.properties.waterResistance} />
                <ResistanceItem label="Solvent" active={product.properties.solventResistance} />
                <ResistanceItem label="Flame" active={product.properties.flameRetardant} />
              </div>
            </TabsContent>
          </Tabs>

          <Separator className="my-6" />

          <div className="flex gap-3">
            <Button asChild={false} onClick={() => { /* handled by Link */ }}>
              <Link to="/contact" className="text-inherit no-underline">Contact Sales</Link>
            </Button>
            <Button variant="outline" onClick={() => window.print()}>Download TDS</Button>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-lg font-bold text-kleb-gray-900 mb-4">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                options={{ categoryLabels: options?.categoryLabels, adhesiveLabels: options?.adhesiveLabels }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }): JSX.Element {
  return (
    <div>
      <p className="text-kleb-gray-400 text-xs">{label}</p>
      <p className="font-medium text-kleb-gray-700 capitalize">{value}</p>
    </div>
  );
}

function ResistanceItem({ label, active }: { label: string; active: boolean }): JSX.Element {
  return (
    <div className={`border p-3 text-center ${active ? 'border-kleb-green bg-kleb-green/5' : 'border-kleb-gray-300 opacity-40'}`}>
      <p className="text-xs font-medium">{label}</p>
      <p className="text-lg mt-1">{active ? '✓' : '–'}</p>
    </div>
  );
}

export default ProductDetailPage;
