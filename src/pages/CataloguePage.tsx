import { FileText, Clock, Download, Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { businessSettings } from '@/config/business';
import { productCategories } from '@/data/categories';
import { products } from '@/data/products';

export function CataloguePage() {
  const available = businessSettings.catalogueAvailable;
  const url = businessSettings.catalogueUrl;

  return (
    <div className="py-8 lg:py-12">
      <div className="container-page">
        <Breadcrumbs items={[{ label: 'Catalogue' }]} />

        <div className="mb-8">
          <span className="section-eyebrow">Product Catalogue</span>
          <h1 className="mt-2 font-display text-fluid-3xl font-bold text-forest-800">
            Seed Catalogue
          </h1>
          <p className="mt-3 max-w-2xl text-muted leading-relaxed">
            A complete overview of our {products.length} hybrid vegetable seed varieties with
            specifications, pack sizes, and crop information.
          </p>
        </div>

        {/* Download status */}
        <div className="card mb-8 overflow-hidden">
          <div className="grid items-center gap-8 p-8 lg:grid-cols-[auto_1fr_auto] lg:p-12">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-forest-50 text-forest-500">
              <FileText className="h-10 w-10" strokeWidth={1.5} />
            </div>

            <div>
              <h2 className="font-display text-fluid-xl font-bold text-forest-800">
                {available ? 'Catalogue Ready' : 'Catalogue Coming Soon'}
              </h2>
              <p className="mt-2 text-muted leading-relaxed">
                {available
                  ? 'The approved catalogue PDF is available for download.'
                  : 'The approved catalogue PDF will be available for download here once it has been finalised by the company.'}
              </p>
              {!available && (
                <p className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-accent-50 px-3 py-1.5 text-xs font-medium text-accent-700">
                  <Clock className="h-3.5 w-3.5" />
                  Pending approval — please check back soon.
                </p>
              )}
            </div>

            <div className="shrink-0">
              {available && url ? (
                <a href={url} download className="btn-accent" aria-label="Download catalogue PDF">
                  <Download className="h-5 w-5" />
                  Download PDF
                </a>
              ) : (
                <Link to="/products" className="btn-outline">
                  Browse Products Online
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Category overview */}
        <div className="mb-8">
          <h2 className="font-display text-fluid-xl font-bold text-forest-800 mb-6">
            What's Inside
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {productCategories.map((cat) => {
              const count = products.filter((p) => p.category === cat.slug).length;
              return (
                <Link
                  key={cat.slug}
                  to={`/products?category=${cat.slug}`}
                  className="card flex flex-col items-center gap-3 p-5 text-center transition-all hover:shadow-card hover:-translate-y-0.5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forest-50 text-forest-500">
                    <Sprout className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-display text-sm font-bold text-forest-800">{cat.name}</p>
                    <p className="mt-0.5 text-xs text-muted">{count} {count === 1 ? 'variety' : 'varieties'}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="rounded-lg bg-botanical p-5 text-center">
          <p className="text-sm text-muted leading-relaxed">
            Want to be notified when the catalogue is ready?{' '}
            <Link to="/contact" className="font-medium text-forest-600 hover:text-forest-700">
              Contact us
            </Link>
            {' '}and we'll let you know.
          </p>
        </div>
      </div>
    </div>
  );
}
