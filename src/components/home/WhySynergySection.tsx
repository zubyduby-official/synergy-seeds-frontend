import { Link } from 'react-router-dom';
import { ArrowRight, Dna, Sprout, Shield, TrendingUp } from 'lucide-react';
import { corePillars } from '@/config/business';

const pillarIcons = [Dna, Sprout, Shield, TrendingUp];

export function WhySynergySection() {
  return (
    <section className="bg-botanical py-16 lg:py-22">
      <div className="container-page">
        <div className="mb-10 text-center">
          <span className="section-eyebrow">Our Core Pillars</span>
          <h2 className="mt-2 font-display text-fluid-3xl font-bold text-forest-800">
            Why Synergy Seeds
          </h2>
          <p className="mt-3 mx-auto max-w-2xl text-muted leading-relaxed">
            Four focus areas that guide our hybrid seed development programme.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {corePillars.map((pillar, index) => {
            const Icon = pillarIcons[index];
            return (
              <div
                key={pillar.title}
                className="card p-6 text-center transition-all duration-200 hover:shadow-card hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-forest-50 text-forest-500">
                  <Icon className="h-7 w-7" strokeWidth={1.8} />
                </div>
                <h3 className="font-display text-base font-bold text-forest-800">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function DealerCTASection() {
  return (
    <section className="py-16 lg:py-22">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-2xl bg-forest-800 px-6 py-12 sm:px-12 lg:py-16">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-leaf-400/10" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-accent-400/10" />
          <div className="relative max-w-xl">
            <h2 className="font-display text-fluid-2xl font-bold text-white">
              Partner with Synergy Seeds
            </h2>
            <p className="mt-3 text-forest-100/90 leading-relaxed">
              Connect with us for dealership, distribution, and agricultural
              product enquiries.
            </p>
            <Link to="/dealer-enquiry" className="btn-accent mt-6">
              Become a Dealer
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
