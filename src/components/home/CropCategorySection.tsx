import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { productCategories } from '@/data/categories';
import { categoryImages } from '@/lib/images';

export function CropCategorySection() {
  return (
    <section className="py-16 lg:py-22">
      <div className="container-page">
        <div className="mb-10 text-center">
          <span className="section-eyebrow">Our Crop Range</span>
          <h2 className="mt-2 font-display text-fluid-3xl font-bold text-forest-800">
            Hybrid Seeds by Crop
          </h2>
          <p className="mt-3 mx-auto max-w-2xl text-muted leading-relaxed">
            Five crop categories with specialised hybrid varieties bred for Indian
            farming conditions.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {productCategories.map((cat, index) => {
            const img = categoryImages[cat.slug];
            return (
              <Link
                key={cat.slug}
                to={`/products?category=${cat.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-forest-100 bg-white shadow-soft transition-all duration-200 hover:shadow-card hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="relative h-36 overflow-hidden sm:h-40">
                  <img
                    src={img?.url}
                    alt={img?.alt ?? cat.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-900/60 to-transparent" />
                  <h3 className="absolute bottom-2.5 left-3 font-display text-lg font-bold text-white">
                    {cat.name}
                  </h3>
                </div>
                <div className="flex flex-1 flex-col p-3.5">
                  <p className="text-xs leading-relaxed text-muted">{cat.shortLabel}</p>
                  <span className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-forest-600 transition-colors group-hover:text-forest-700">
                    View varieties
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
