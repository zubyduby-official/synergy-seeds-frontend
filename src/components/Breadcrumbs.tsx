import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const location = useLocation();

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm">
        <li>
          <Link
            to="/"
            className="flex items-center gap-1 text-muted transition-colors hover:text-forest-600"
          >
            <Home className="h-3.5 w-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 text-forest-200" />
            {item.path && item.path !== location.pathname ? (
              <Link
                to={item.path}
                className="text-muted transition-colors hover:text-forest-600"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-medium text-forest-700" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
