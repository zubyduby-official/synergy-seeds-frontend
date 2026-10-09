import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle, Download } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { navLinks, footerPolicyLinks, businessSettings } from '@/config/business';
import { productCategories } from '@/data/categories';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-forest-800 text-forest-100">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Company */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Logo className="[&_span:first-child]:text-white [&_span:last-child]:text-forest-200" />
            </div>
            <p className="text-sm leading-relaxed text-forest-200/80">
              Hybrid vegetable seed varieties for chilli, cucumber, tomato, brinjal, and sweet corn.
              Headquartered in Indore, Madhya Pradesh.
            </p>
            <p className="mt-4 text-xs text-forest-300/60">GST: {businessSettings.gst}</p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-forest-100">
              Company
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-forest-200/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/catalogue"
                  className="text-sm text-forest-200/80 transition-colors hover:text-white"
                >
                  Download Catalogue
                </Link>
              </li>
            </ul>
          </div>

          {/* Crop categories */}
          <div>
            <h4 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-forest-100">
              Crop Categories
            </h4>
            <ul className="space-y-2.5">
              {productCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to={`/products?category=${cat.slug}`}
                    className="text-sm text-forest-200/80 transition-colors hover:text-white"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-display text-sm font-bold uppercase tracking-wider text-forest-100">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${businessSettings.phone.replace(/\s/g, '')}`}
                  className="flex items-start gap-2.5 text-sm text-forest-200/80 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0 mt-0.5" />
                  {businessSettings.phone}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${businessSettings.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-sm text-forest-200/80 transition-colors hover:text-white"
                >
                  <MessageCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  WhatsApp: {businessSettings.whatsapp}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${businessSettings.email}`}
                  className="flex items-start gap-2.5 text-sm text-forest-200/80 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0 mt-0.5" />
                  {businessSettings.email}
                </a>
              </li>
              <li>
                <span className="flex items-start gap-2.5 text-sm text-forest-200/80">
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                  {businessSettings.address}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Policy links */}
        <div className="mt-10 border-t border-forest-700/50 pt-6">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {footerPolicyLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-xs text-forest-300/70 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col items-start justify-between gap-2 border-t border-forest-700/50 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-forest-300/60">
            © {year} {businessSettings.companyName}. All rights reserved.
          </p>
          <p className="text-xs text-forest-300/50">
            {businessSettings.domain}
          </p>
        </div>
      </div>
    </footer>
  );
}
