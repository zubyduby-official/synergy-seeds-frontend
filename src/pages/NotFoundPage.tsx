import { Link } from 'react-router-dom';
import { Home, Search, ArrowRight, Sprout } from 'lucide-react';

export function NotFoundPage() {
  return (
    <div className="py-16 lg:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-forest-50 text-forest-500">
            <Sprout className="h-10 w-10" strokeWidth={1.5} />
          </div>

          <h1 className="font-display text-fluid-4xl font-extrabold text-forest-800">
            404
          </h1>
          <h2 className="mt-2 font-display text-fluid-xl font-bold text-forest-700">
            Page Not Found
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            The page you're looking for doesn't exist or may have been moved. Try browsing
            our products or head back to the home page.
          </p>

          <div className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
            <Link to="/" className="btn-primary">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
            <Link to="/products" className="btn-outline">
              <Search className="h-4 w-4" />
              Browse Products
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
