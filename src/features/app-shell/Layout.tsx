import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { KlebLogo } from '@/components/KlebLogo';
import { CompareBar } from '@/components/CompareBar';

const NAV_ITEMS = [
  { label: 'Product Finder', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'Compare', path: '/compare' },
  { label: 'Contact', path: '/contact' },
];

export function Layout(): JSX.Element {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col font-[var(--font-family-base)]">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-kleb-gray-300 bg-kleb-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link to="/" className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-kleb-gray-900" aria-label="KLEB. Home">
            <KlebLogo height={22} />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-kleb-gray-900 ${
                  location.pathname === item.path ? 'text-kleb-gray-900' : 'text-kleb-gray-500'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 font-medium transition-colors bg-transparent text-kleb-gray-900 border border-kleb-gray-300 hover:bg-kleb-gray-50 px-3 py-1.5 text-xs"
            >
              Search Products
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 font-medium transition-colors bg-kleb-gray-900 text-kleb-white hover:bg-kleb-gray-800 border border-kleb-gray-900 px-3 py-1.5 text-xs"
            >
              Find Product
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-kleb-gray-600 hover:text-kleb-gray-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile nav overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/20" onClick={() => setMobileMenuOpen(false)} />
          <nav
            className="absolute right-0 top-0 h-full w-72 bg-kleb-white border-l border-kleb-gray-300 shadow-lg flex flex-col"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between p-4 border-b border-kleb-gray-300">
              <KlebLogo height={20} />
              <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-kleb-gray-600" aria-label="Close menu">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <div className="flex-1 p-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center border-b border-kleb-gray-100 py-3 text-sm font-medium transition-colors hover:text-kleb-gray-900 ${
                    location.pathname === item.path ? 'text-kleb-gray-900' : 'text-kleb-gray-500'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="p-4">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center gap-2 font-medium transition-colors bg-kleb-gray-900 text-kleb-white hover:bg-kleb-gray-800 border border-kleb-gray-900 px-4 py-2 text-sm"
              >
                Find Product
              </Link>
            </div>
          </nav>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1"><Outlet /></main>

      {/* Compare bar */}
      <CompareBar />

      {/* Footer */}
      <footer className="border-t border-kleb-gray-300 bg-kleb-gray-900 text-kleb-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <KlebLogo height={24} className="!text-kleb-white" />
              <p className="mt-3 text-sm text-kleb-gray-400">Industrial adhesive solutions for every application.</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-kleb-white mb-3">Products</h3>
              <ul className="space-y-2 text-sm text-kleb-gray-400">
                <li><Link to="/products" className="hover:text-kleb-white transition-colors">All Products</Link></li>
                <li><Link to="/" className="hover:text-kleb-white transition-colors">Product Finder</Link></li>
                <li><Link to="/compare" className="hover:text-kleb-white transition-colors">Compare Products</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-kleb-white mb-3">Support</h3>
              <ul className="space-y-2 text-sm text-kleb-gray-400">
                <li><span className="cursor-default">Technical Data Sheets</span></li>
                <li><span className="cursor-default">Application Guides</span></li>
                <li><Link to="/contact" className="hover:text-kleb-white transition-colors">Contact Sales</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-kleb-white mb-3">Company</h3>
              <ul className="space-y-2 text-sm text-kleb-gray-400">
                <li><span className="cursor-default">About</span></li>
                <li><span className="cursor-default">Sustainability</span></li>
                <li><span className="cursor-default">Careers</span></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-kleb-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-kleb-gray-400 font-[var(--font-family-mono)]">© 2026 KLEB. All rights reserved.</p>
            <div className="flex gap-4 text-xs text-kleb-gray-400">
              <span className="cursor-default hover:text-kleb-white transition-colors">Privacy</span>
              <span className="cursor-default hover:text-kleb-white transition-colors">Terms</span>
              <span className="cursor-default hover:text-kleb-white transition-colors">Imprint</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
