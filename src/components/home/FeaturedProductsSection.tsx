import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { products, featuredProductSlugs } from '@/data/products';
import { aboutImageUrl } from '@/lib/images';
import type { Product } from '@/types';

export function FeaturedProductsSection({
  onEnquire,
}: {
  onEnquire: (product: Product) => void;
}) {
  const featured = featuredProductSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is Product => !!p);

  return (
    <section className="py-16 lg:py-22">
      <div className="container-page">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <span className="section-eyebrow">Featured Varieties</span>
            <h2 className="mt-2 font-display text-fluid-3xl font-bold text-forest-800">
              Selected Hybrid Seeds
            </h2>
          </div>
          <Link
            to="/products"
            className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-forest-600 transition-colors hover:text-forest-700 sm:flex"
          >
            View all products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} onEnquire={onEnquire} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link to="/products" className="btn-outline">
            View all products
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function AboutPreviewSection() {
  return (
    <section className="bg-botanical py-16 lg:py-22">
      <div className="container-page">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-card">
              <img
                src={aboutImageUrl}
                alt="Lush green field in rural India with irrigation"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-5 -right-5 hidden rounded-xl bg-forest-500 px-6 py-4 text-white shadow-lift sm:block">
              <p className="font-display text-3xl font-extrabold">21+</p>
              <p className="text-xs text-forest-100">Hybrid Varieties</p>
            </div>
          </div>

          <div>
            <span className="section-eyebrow">About Synergy Seeds</span>
            <h2 className="mt-2 font-display text-fluid-3xl font-bold text-forest-800">
              Forward-thinking seed enterprise
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              Synergy Seeds India Private Limited, headquartered in Indore, Madhya
              Pradesh, is a forward-thinking agricultural biotechnology and seed
              enterprise committed to empowering farmers with high-quality hybrid
              seed varieties.
            </p>
            <p className="mt-3 text-muted leading-relaxed">
              Our focus spans chilli, cucumber, tomato, brinjal, and sweet corn —
              with a breeding programme guided by genetic purity, vigorous
              germination, robust disease tolerance, and high yield potential.
            </p>
            <Link to="/about" className="btn-primary mt-6">
              Learn More About Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
