import { useState, type FormEvent } from 'react';
import { Send, Loader2, CheckCircle2, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { businessSettings } from '@/config/business';
import { submitContactForm, buildWhatsAppGeneralLink } from '@/services/api';
import type { ContactFormData } from '@/types';

export function ContactPage() {
  const [form, setForm] = useState<ContactFormData>({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ ref: string; message: string } | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const validate = (): boolean => {
    const e: Partial<Record<keyof ContactFormData, string>> = {};
    if (!form.name.trim()) e.name = 'Please enter your name';
    if (!form.phone.trim()) e.phone = 'Please enter your phone number';
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, '')))
      e.phone = 'Please enter a valid 10-digit Indian mobile number';
    if (!form.message.trim()) e.message = 'Please enter your message';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const res = await submitContactForm(form);
    setSubmitting(false);
    setResult({ ref: res.referenceId, message: res.message });
  };

  const update = (field: keyof ContactFormData, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <div className="py-8 lg:py-12">
      <div className="container-page">
        <Breadcrumbs items={[{ label: 'Contact Us' }]} />

        <div className="mb-8">
          <span className="section-eyebrow">Contact</span>
          <h1 className="mt-2 font-display text-fluid-3xl font-bold text-forest-800">
            Get In Touch
          </h1>
          <p className="mt-3 max-w-2xl text-muted leading-relaxed">
            Have questions about our hybrid seed varieties or partnership opportunities?
            We're here to help.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
          {/* Contact details */}
          <aside className="space-y-4">
            <div className="card p-6">
              <h2 className="font-display text-base font-bold text-forest-800 mb-4">
                Contact Information
              </h2>
              <ul className="space-y-4">
                <li>
                  <a
                    href={`tel:${businessSettings.phone.replace(/\s/g, '')}`}
                    className="flex items-start gap-3 group"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-forest-50 text-forest-500">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-muted">Phone</p>
                      <p className="text-sm font-medium text-forest-700 group-hover:text-forest-500 transition-colors">
                        {businessSettings.phone}
                      </p>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href={buildWhatsAppGeneralLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 group"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-forest-50 text-forest-500">
                      <MessageCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-muted">WhatsApp</p>
                      <p className="text-sm font-medium text-forest-700 group-hover:text-forest-500 transition-colors">
                        {businessSettings.whatsapp}
                      </p>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${businessSettings.email}`}
                    className="flex items-start gap-3 group"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-forest-50 text-forest-500">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-muted">Email</p>
                      <p className="text-sm font-medium text-forest-700 group-hover:text-forest-500 transition-colors">
                        {businessSettings.email}
                      </p>
                    </div>
                  </a>
                </li>
                <li>
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-forest-50 text-forest-500">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-muted">Office</p>
                      <p className="text-sm text-charcoal leading-relaxed">
                        {businessSettings.address}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="rounded-xl bg-botanical p-5 border border-forest-100">
              <p className="text-xs text-muted leading-relaxed">
                You can also email us directly at{' '}
                <a
                  href={`mailto:${businessSettings.email}`}
                  className="font-medium text-forest-600 hover:text-forest-700"
                >
                  {businessSettings.email}
                </a>
                {' '}or{' '}
                <a
                  href={`mailto:${businessSettings.secondaryEmail}`}
                  className="font-medium text-forest-600 hover:text-forest-700"
                >
                  {businessSettings.secondaryEmail}
                </a>
                .
              </p>
            </div>
          </aside>

          {/* Form */}
          {result ? (
            <div className="card p-8 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-leaf-100 text-leaf-600">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h2 className="font-display text-fluid-xl font-bold text-forest-800">
                Message Received
              </h2>
              <p className="mt-3 text-muted leading-relaxed max-w-md mx-auto">{result.message}</p>
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
                    setForm({ name: '', phone: '', email: '', subject: '', message: '' });
                  }}
                  className="btn-outline"
                >
                  Send Another
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card p-6 space-y-5" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="ctc-name" className="label-field">
                    Full name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="ctc-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                    className="input-field"
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="ctc-phone" className="label-field">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="ctc-phone"
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
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="ctc-email" className="label-field">
                    Email <span className="text-muted font-normal">(optional)</span>
                  </label>
                  <input
                    id="ctc-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    className="input-field"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="ctc-subject" className="label-field">
                    Subject <span className="text-muted font-normal">(optional)</span>
                  </label>
                  <input
                    id="ctc-subject"
                    type="text"
                    value={form.subject}
                    onChange={(e) => update('subject', e.target.value)}
                    className="input-field"
                    placeholder="What is this about?"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="ctc-message" className="label-field">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="ctc-message"
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  className="input-field min-h-32 resize-y"
                  placeholder="Your message or question"
                  aria-invalid={!!errors.message}
                />
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
              </div>

              <button type="submit" disabled={submitting} className="btn-primary w-full">
                {submitting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                Send Message
              </button>
              <p className="text-xs text-muted/70 text-center">
                This form is not yet connected to an email delivery system. For urgent matters,
                please use WhatsApp or call us directly.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
