import { Phone, Mail, MapPin, MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { businessSettings } from '@/config/business';
import { buildWhatsAppGeneralLink } from '@/services/api';

export function ContactSection() {
  return (
    <section className="bg-forest-800 py-16 lg:py-22">
      <div className="container-page">
        <div className="mb-10 text-center">
          <span className="section-eyebrow text-leaf-300">Get In Touch</span>
          <h2 className="mt-2 font-display text-fluid-3xl font-bold text-white">
            We're Here to Help
          </h2>
          <p className="mt-3 mx-auto max-w-2xl text-forest-100/80 leading-relaxed">
            Reach out for product information, dealer opportunities, or any
            questions about our hybrid seed varieties.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <a
            href={`tel:${businessSettings.phone.replace(/\s/g, '')}`}
            className="group flex flex-col items-center gap-3 rounded-xl bg-forest-700/50 p-6 text-center transition-all hover:bg-forest-700"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-leaf-400/20 text-leaf-300">
              <Phone className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-forest-200">Call us</p>
              <p className="mt-1 font-display text-sm font-bold text-white">{businessSettings.phone}</p>
            </div>
          </a>

          <a
            href={buildWhatsAppGeneralLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 rounded-xl bg-forest-700/50 p-6 text-center transition-all hover:bg-forest-700"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-leaf-400/20 text-leaf-300">
              <MessageCircle className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-forest-200">WhatsApp</p>
              <p className="mt-1 font-display text-sm font-bold text-white">{businessSettings.whatsapp}</p>
            </div>
          </a>

          <a
            href={`mailto:${businessSettings.email}`}
            className="group flex flex-col items-center gap-3 rounded-xl bg-forest-700/50 p-6 text-center transition-all hover:bg-forest-700"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-leaf-400/20 text-leaf-300">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-forest-200">Email</p>
              <p className="mt-1 font-display text-sm font-bold text-white">{businessSettings.email}</p>
            </div>
          </a>

          <div className="flex flex-col items-center gap-3 rounded-xl bg-forest-700/50 p-6 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-leaf-400/20 text-leaf-300">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-forest-200">Office</p>
              <p className="mt-1 text-xs text-forest-100/80 leading-snug">
                Shell Tower, Sapna Sangeeta, Indore, MP
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link to="/contact" className="btn-accent">
            Contact Us
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
