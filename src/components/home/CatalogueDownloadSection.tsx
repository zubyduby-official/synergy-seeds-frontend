import { Download, FileText, Clock } from 'lucide-react';
import { businessSettings } from '@/config/business';
import { Link } from 'react-router-dom';

export function CatalogueDownloadSection() {
  const available = businessSettings.catalogueAvailable;
  const url = businessSettings.catalogueUrl;

  return (
    <section className="py-16 lg:py-22">
      <div className="container-page">
        <div className="card overflow-hidden">
          <div className="grid items-center gap-8 p-8 lg:grid-cols-[auto_1fr_auto] lg:p-12">
            {/* Icon / illustration */}
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-forest-50 text-forest-500">
              <FileText className="h-10 w-10" strokeWidth={1.5} />
            </div>

            {/* Text */}
            <div>
              <span className="section-eyebrow">Product Catalogue</span>
              <h2 className="mt-2 font-display text-fluid-2xl font-bold text-forest-800">
                Download Our Seed Catalogue
              </h2>
              <p className="mt-2 text-muted leading-relaxed">
                A complete overview of our 21 hybrid vegetable seed varieties with
                specifications, pack sizes, and crop information.
              </p>
              {!available && (
                <p className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-accent-50 px-3 py-1.5 text-xs font-medium text-accent-700">
                  <Clock className="h-3.5 w-3.5" />
                  Catalogue coming soon — the approved PDF will be available here once ready.
                </p>
              )}
            </div>

            {/* Action */}
            <div className="shrink-0">
              {available && url ? (
                <a href={url} download className="btn-accent" aria-label="Download catalogue PDF">
                  <Download className="h-5 w-5" />
                  Download PDF
                </a>
              ) : (
                <Link to="/catalogue" className="btn-outline">
                  View Details
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
