import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/features/app-shell';
import { Skeleton } from '@/components/ui';

const ProductFinder = lazy(() => import('@/features/product-finder/ProductFinderPage'));
const ProductCatalog = lazy(() => import('@/features/product-catalog/ProductCatalogPage'));
const ProductDetail = lazy(() => import('@/features/product-detail/ProductDetailPage'));
const ProductCompare = lazy(() => import('@/features/product-compare/ProductComparePage'));
const ContactSales = lazy(() => import('@/features/contact-sales/ContactSalesPage'));

function PageFallback(): JSX.Element {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <Skeleton className="h-8 w-48 mb-6" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-64 w-full" />
        ))}
      </div>
    </div>
  );
}

export function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Suspense fallback={<PageFallback />}><ProductFinder /></Suspense>} />
          <Route path="products" element={<Suspense fallback={<PageFallback />}><ProductCatalog /></Suspense>} />
          <Route path="products/:id" element={<Suspense fallback={<PageFallback />}><ProductDetail /></Suspense>} />
          <Route path="compare" element={<Suspense fallback={<PageFallback />}><ProductCompare /></Suspense>} />
          <Route path="contact" element={<Suspense fallback={<PageFallback />}><ContactSales /></Suspense>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
