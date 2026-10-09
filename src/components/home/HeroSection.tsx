import { Link } from 'react-router-dom';
import { ArrowRight, Phone, MessageCircle, Sprout } from 'lucide-react';
import { businessSettings } from '@/config/business';
import { heroImageUrl, heroImageAlt } from '@/lib/images';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-forest-800">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImageUrl}
          alt={heroImageAlt}
          className="h-full w-full object-cover opacity-30"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-900 via-forest-900/85 to-forest-800/40" />
      </div>

      {/* Decorative leaves */}
      <div className="pointer-events-none absolute -right-12 top-1/2 hidden -translate-y-1/2 lg:block">
        <Sprout className="h-80 w-80 text-leaf-400/10" strokeWidth={1} />
      </div>

      <div className="container-page relative py-16 sm:py-20 lg:py-28">
        <div className="max-w-2xl">
          <span className="badge bg-leaf-400/20 text-leaf-200 backdrop-blur-sm mb-5">
            <Sprout className="h-3.5 w-3.5" />
            Hybrid Seed Innovation
          </span>

          <h1 className="font-display text-fluid-4xl font-extrabold leading-[1.1] text-white text-balance">
            Quality Seeds for
            <span className="block text-leaf-300">Prosperous Farming</span>
          </h1>

          <p className="mt-5 max-w-xl text-fluid-base leading-relaxed text-forest-100/90">
            Discover hybrid vegetable varieties developed to support farmers with
            crop-focused seed solutions for diverse agricultural needs.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link to="/products" className="btn-accent">
              Explore Our Seeds
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/dealer-enquiry" className="btn-outline border-leaf-300/30 bg-white/10 text-white hover:bg-white/20 hover:border-leaf-300/50">
              Dealer Enquiry
            </Link>
            <a
              href={`tel:${businessSettings.phone.replace(/\s/g, '')}`}
              className="btn-ghost text-leaf-200 hover:bg-white/10"
            >
              <Phone className="h-4 w-4" />
              Talk to Our Team
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-forest-200/70">
            <span className="flex items-center gap-1.5">
              <MessageCircle className="h-4 w-4 text-leaf-300" />
              WhatsApp: {businessSettings.whatsapp}
            </span>
            <span className="hidden sm:inline text-forest-300/40">•</span>
            <span>Indore, Madhya Pradesh, India</span>
          </div>
        </div>
      </div>
    </section>
  );
}
