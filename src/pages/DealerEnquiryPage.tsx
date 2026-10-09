import { useState, type FormEvent } from 'react';
import { Send, Loader2, CheckCircle2, MessageCircle, Handshake, Store, Truck } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { businessSettings } from '@/config/business';
import { productCategories } from '@/data/categories';
import { submitDealerEnquiry, buildWhatsAppGeneralLink } from '@/services/api';
import type { DealerEnquiryData, BusinessType, CropCategory } from '@/types';

const businessTypes: BusinessType[] = ['Dealer', 'Distributor', 'Retailer', 'Other'];

const benefits = [
  {
    icon: Handshake,
    title: 'Partnership Opportunity',
    description: 'Join our network of dealers and distributors bringing quality hybrid seeds to farmers.',
  },
  {
    icon: Store,
    title: 'Product Range',
    description: 'Access our full catalogue of 21 hybrid vegetable seed varieties across five crop categories.',
  },
  {
    icon: Truck,
    title: 'Supply Support',
    description: 'We work with our partners to support seed availability in their service areas.',
  },
];

export function DealerEnquiryPage() {
  const [form, setForm] = useState<DealerEnquiryData>({
    fullName: '',
    businessName: '',
    phone: '',
    email: '',
    state: '',
    city: '',
    businessType: 'Dealer',
    interestedCrops: [],
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ ref: string; message: string } | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof DealerEnquiryData, string>>>({});

  const validate = (): boolean => {
    const e: Partial<Record<keyof DealerEnquiryData, string>> = {};
    if (!form.fullName.trim()) e.fullName = 'Please enter your full name';
    if (!form.businessName.trim()) e.businessName = 'Please enter your business name';
    if (!form.phone.trim()) e.phone = 'Please enter your phone number';
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, '')))
      e.phone = 'Please enter a valid 10-digit Indian mobile number';
    if (!form.state.trim()) e.state = 'Please select your state';
    if (!form.city.trim()) e.city = 'Please enter your city';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const res = await submitDealerEnquiry(form);
    setSubmitting(false);
    setResult({ ref: res.referenceId, message: res.message });
  };

  const update = (field: keyof DealerEnquiryData, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const toggleCrop = (crop: CropCategory) => {
    setForm((f) => ({
      ...f,
      interestedCrops: f.interestedCrops.includes(crop)
        ? f.interestedCrops.filter((c) => c !== crop)
        : [...f.interestedCrops, crop],
    }));
  };

  if (result) {
    return (
      <div className="py-8 lg:py-12">
        <div className="container-page">
          <Breadcrumbs items={[{ label: 'Dealer Enquiry' }]} />
          <div className="mx-auto max-w-lg text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-leaf-100 text-leaf-600">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h1 className="font-display text-fluid-2xl font-bold text-forest-800">
              Enquiry Received
            </h1>
            <p className="mt-3 text-muted leading-relaxed">{result.message}</p>
            <p className="mt-3 text-xs font-medium text-muted">
              Reference: <span className="text-forest-700">{result.ref}</span>
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
              <a
                href={buildWhatsAppGeneralLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <MessageCircle className="h-4 w-4" />
                Continue on WhatsApp
              </a>
              <button
                onClick={() => {
                  setResult(null);
                  setForm({
                    fullName: '', businessName: '', phone: '', email: '',
                    state: '', city: '', businessType: 'Dealer',
                    interestedCrops: [], message: '',
                  });
                }}
                className="btn-outline"
              >
                Submit Another
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 lg:py-12">
      <div className="container-page">
        <Breadcrumbs items={[{ label: 'Dealer Enquiry' }]} />

        <div className="mb-8">
          <span className="section-eyebrow">Partnership</span>
          <h1 className="mt-2 font-display text-fluid-3xl font-bold text-forest-800">
            Become a Dealer or Distributor
          </h1>
          <p className="mt-3 max-w-2xl text-muted leading-relaxed">
            Interested in partnering with Synergy Seeds? Fill out the form below and our
            team will get in touch to discuss dealership and distribution opportunities.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Form */}
          <form onSubmit={handleSubmit} className="card p-6 space-y-5" noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="dlr-name" className="label-field">
                  Full name <span className="text-red-500">*</span>
                </label>
                <input
                  id="dlr-name"
                  type="text"
                  value={form.fullName}
                  onChange={(e) => update('fullName', e.target.value)}
                  className="input-field"
                  placeholder="Your name"
                  aria-invalid={!!errors.fullName}
                />
                {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
              </div>
              <div>
                <label htmlFor="dlr-business" className="label-field">
                  Business name <span className="text-red-500">*</span>
                </label>
                <input
                  id="dlr-business"
                  type="text"
                  value={form.businessName}
                  onChange={(e) => update('businessName', e.target.value)}
                  className="input-field"
                  placeholder="Shop / company name"
                  aria-invalid={!!errors.businessName}
                />
                {errors.businessName && <p className="mt-1 text-xs text-red-500">{errors.businessName}</p>}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="dlr-phone" className="label-field">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  id="dlr-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value)}
                  className="input-field"
                  placeholder="10-digit mobile"
                  maxLength={10}
                  aria-invalid={!!errors.phone}
                />
                {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="dlr-email" className="label-field">
                  Email <span className="text-muted font-normal">(optional)</span>
                </label>
                <input
                  id="dlr-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update('email', e.target.value)}
                  className="input-field"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="dlr-state" className="label-field">
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  id="dlr-state"
                  value={form.state}
                  onChange={(e) => update('state', e.target.value)}
                  className="input-field"
                  aria-invalid={!!errors.state}
                >
                  <option value="">Select state</option>
                  {businessSettings.states.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.state && <p className="mt-1 text-xs text-red-500">{errors.state}</p>}
              </div>
              <div>
                <label htmlFor="dlr-city" className="label-field">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  id="dlr-city"
                  type="text"
                  value={form.city}
                  onChange={(e) => update('city', e.target.value)}
                  className="input-field"
                  placeholder="Your city"
                  aria-invalid={!!errors.city}
                />
                {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
              </div>
            </div>

            <div>
              <span className="label-field">Business type</span>
              <div className="flex flex-wrap gap-2">
                {businessTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => update('businessType', type)}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                      form.businessType === type
                        ? 'border-forest-500 bg-forest-500 text-white'
                        : 'border-forest-200 bg-white text-charcoal hover:border-forest-400'
                    }`}
                    aria-pressed={form.businessType === type}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="label-field">Crop interests <span className="text-muted font-normal">(optional)</span></span>
              <div className="flex flex-wrap gap-2">
                {productCategories.map((cat) => (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => toggleCrop(cat.slug)}
                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition-all ${
                      form.interestedCrops.includes(cat.slug)
                        ? 'border-leaf-400 bg-leaf-400 text-white'
                        : 'border-forest-200 bg-white text-charcoal hover:border-forest-400'
                    }`}
                    aria-pressed={form.interestedCrops.includes(cat.slug)}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="dlr-message" className="label-field">
                Message <span className="text-muted font-normal">(optional)</span>
              </label>
              <textarea
                id="dlr-message"
                value={form.message}
                onChange={(e) => update('message', e.target.value)}
                className="input-field min-h-20 resize-y"
                placeholder="Tell us about your business and requirements"
              />
            </div>

            <button type="submit" disabled={submitting} className="btn-primary w-full">
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              Submit Dealer Enquiry
            </button>
            <p className="text-xs text-muted/70 text-center">
              Demo mode — submissions are not yet saved to a live database. Please use WhatsApp for urgent enquiries.
            </p>
          </form>

          {/* Sidebar */}
          <aside className="space-y-4">
            <div className="card p-6">
              <h2 className="font-display text-base font-bold text-forest-800 mb-4">
                Why Partner With Us
              </h2>
              <div className="space-y-4">
                {benefits.map((b) => (
                  <div key={b.title} className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-forest-50 text-forest-500">
                      <b.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-forest-700">{b.title}</p>
                      <p className="mt-0.5 text-xs text-muted leading-relaxed">{b.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <h2 className="font-display text-base font-bold text-forest-800 mb-3">
                Prefer to Talk?
              </h2>
              <p className="text-sm text-muted leading-relaxed mb-4">
                Reach us directly on WhatsApp or by phone for immediate assistance.
              </p>
              <a
                href={buildWhatsAppGeneralLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full mb-2"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Us
              </a>
              <a
                href={`tel:${businessSettings.phone.replace(/\s/g, '')}`}
                className="btn-outline w-full"
              >
                {businessSettings.phone}
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
