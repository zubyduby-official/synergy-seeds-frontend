import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ProductCard } from '@/components/ProductCard';
import { ProductEmptyState } from '@/components/States';
import { products } from '@/data/products';
import { productCategories } from '@/data/categories';
import type { Product, CropCategory } from '@/types';

interface ProductsPageProps {
  onEnquire: (product: Product) => void;
}

export function ProductsPage({ onEnquire }: ProductsPageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const activeCategory = searchParams.get('category') as CropCategory | null;

  const setCategory = (cat: CropCategory | null) => {
    const params = new URLSearchParams(searchParams);
    if (cat) params.set('category', cat);
    else params.delete('category');
    setSearchParams(params, { replace: true });
  };

  const filtered = useMemo(() => {
    let result = products;
    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, search]);

  const activeCategoryName = activeCategory
    ? productCategories.find((c) => c.slug === activeCategory)?.name
    : null;

  useEffect(() => {
    setShowFilters(false);
  }, [activeCategory]);

  return (
    <div className="py-8 lg:py-12">
      <div className="container-page">
        <Breadcrumbs items={[{ label: 'Products', path: '/products' }, ...(activeCategoryName ? [{ label: activeCategoryName }] : [])]} />

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-fluid-3xl font-bold text-forest-800">
            {activeCategoryName ? `${activeCategoryName} Seeds` : 'All Hybrid Seeds'}
          </h1>
          <p className="mt-2 max-w-2xl text-muted leading-relaxed">
            Browse our complete range of hybrid vegetable seed varieties. Filter by crop
            category or search by name to find the right variety for your farm.
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-5 flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by product name or crop…"
              className="input-field pl-11"
              aria-label="Search products"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-charcoal"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters((v) => !v)}
            className="btn-outline lg:hidden"
            aria-label="Toggle filters"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
          {/* Category filters — sidebar on desktop, collapsible on mobile */}
          <aside className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="card p-4 lg:sticky lg:top-24">
              <h2 className="mb-3 font-display text-sm font-bold uppercase tracking-wide text-forest-700">
                Categories
              </h2>
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => setCategory(null)}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                      !activeCategory
                        ? 'bg-forest-50 text-forest-700'
                        : 'text-charcoal hover:bg-botanical'
                    }`}
                  >
                    All Products
                    <span className="float-right text-xs text-muted">{products.length}</span>
                  </button>
                </li>
                {productCategories.map((cat) => {
                  const count = products.filter((p) => p.category === cat.slug).length;
                  return (
                    <li key={cat.slug}>
                      <button
                        onClick={() => setCategory(cat.slug)}
                        className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                          activeCategory === cat.slug
                            ? 'bg-forest-50 text-forest-700'
                            : 'text-charcoal hover:bg-botanical'
                        }`}
                      >
                        {cat.name}
                        <span className="float-right text-xs text-muted">{count}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          {/* Product grid */}
          <div>
            <p className="mb-4 text-sm text-muted">
              Showing <span className="font-semibold text-forest-700">{filtered.length}</span>{' '}
              {filtered.length === 1 ? 'product' : 'products'}
              {activeCategoryName && ` in ${activeCategoryName}`}
            </p>

            {filtered.length === 0 ? (
              <ProductEmptyState message="Try adjusting your search or selecting a different crop category." />
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} onEnquire={onEnquire} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
