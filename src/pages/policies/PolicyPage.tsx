import type { ReactNode } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { businessSettings } from '@/config/business';
import { AlertTriangle } from 'lucide-react';

interface PolicyPageProps {
  title: string;
  breadcrumb: string;
  children: ReactNode;
}

export function PolicyPage({ title, breadcrumb, children }: PolicyPageProps) {
  return (
    <div className="py-8 lg:py-12">
      <div className="container-page">
        <Breadcrumbs items={[{ label: breadcrumb }]} />

        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-fluid-3xl font-bold text-forest-800 mb-2">
            {title}
          </h1>
          <p className="text-sm text-muted mb-8">
            Last updated: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>

          <div className="prose-clean space-y-6">
            {children}
          </div>

          <div className="mt-10 rounded-lg bg-accent-50 px-4 py-4">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="h-5 w-5 shrink-0 text-accent-600 mt-0.5" />
              <p className="text-xs text-accent-700 leading-relaxed">
                This is a draft policy prepared for review by {businessSettings.companyName}.
                It should be reviewed and approved by the company's legal advisor before
                publication. Specific terms such as fees, timelines, and procedures need
                to be confirmed and may require customisation.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-lg bg-botanical p-5 text-sm text-muted leading-relaxed">
            <p className="font-medium text-forest-700 mb-1">Questions about this policy?</p>
            <p>
              Contact us at{' '}
              <a href={`mailto:${businessSettings.email}`} className="font-medium text-forest-600 hover:text-forest-700">
                {businessSettings.email}
              </a>
              {' '}or call{' '}
              <a href={`tel:${businessSettings.phone.replace(/\s/g, '')}`} className="font-medium text-forest-600 hover:text-forest-700">
                {businessSettings.phone}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
