import { useState, useEffect, type FormEvent } from 'react';
import { X, Send, Loader2, CheckCircle2, MessageCircle } from 'lucide-react';
import type { Product, EnquiryData } from '@/types';
import { businessSettings } from '@/config/business';
import { categoryName } from '@/data/categories';
import { submitEnquiry, buildWhatsAppEnquiryLink } from '@/services/api';

interface ProductEnquiryModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductEnquiryModal({ product, isOpen, onClose }: ProductEnquiryModalProps) {
  const [form, setForm] = useState<EnquiryData>({
    name: '',
    phone: '',
    state: '',
    cropInterest: product ? categoryName(product.category) : '',
    product: product?.name ?? '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ ref: string; message: string } | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryData, string>>>({});

  useEffect(() => {
    if (product) {
      setForm((f) => ({
        ...f,
        cropInterest: categoryName(product.category),
        product: product.name,
      }));
    }
  }, [product]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setResult(null);
      setErrors({});
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const e: Partial<Record<keyof EnquiryData, string>> = {};
    if (!form.name.trim()) e.name = 'Please enter your name';
    if (!form.phone.trim()) e.phone = 'Please enter your phone number';
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, '')))
      e.phone = 'Please enter a valid 10-digit Indian mobile number';
    if (!form.state.trim()) e.state = 'Please select your state';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const res = await submitEnquiry(form);
    setSubmitting(false);
    setResult({ ref: res.referenceId, message: res.message });
  };

  const update = (field: keyof EnquiryData, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-charcoal/50 backdrop-blur-sm sm:items-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-modal-title"
    >
      <div
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-t-2xl bg-cream shadow-lift animate-scale-in sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-forest-100 bg-cream px-6 py-4">
          <div>
            <h2 id="enquiry-modal-title" className="font-display text-lg font-bold text-forest-800">
              Product Enquiry
            </h2>
            {product && (
              <p className="text-sm text-muted">
                {product.name} — {categoryName(product.category)}
              </p>
            )}
          </div>
          <button onClick={onClose} className="btn-ghost p-2" aria-label="Close enquiry form">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-5">
          {result ? (
            <div className="text-center py-6">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-leaf-100 text-leaf-600">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h3 className="font-display text-lg font-bold text-forest-800">Enquiry Submitted</h3>
              <p className="mt-2 text-sm text-muted leading-relaxed">{result.message}</p>
              <p className="mt-3 text-xs font-medium text-muted">
                Reference: <span className="text-forest-700">{result.ref}</span>
              </p>
              <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
                {product && (
                  <a
                    href={buildWhatsAppEnquiryLink(product.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Continue on WhatsApp
                  </a>
                )}
                <button onClick={onClose} className="btn-outline">
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label htmlFor="enq-name" className="label-field">
                  Full name <span className="text-red-500">*</span>
                </label>
                <input
                  id="enq-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  className="input-field"
                  placeholder="Your name"
                  aria-invalid={!!errors.name}
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="enq-phone" className="label-field">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="enq-phone"
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
                  <label htmlFor="enq-state" className="label-field">
                    State <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="enq-state"
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
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="enq-crop" className="label-field">Crop interest</label>
                  <input
                    id="enq-crop"
                    type="text"
                    value={form.cropInterest}
                    onChange={(e) => update('cropInterest', e.target.value)}
                    className="input-field"
                  />
                </div>
                <div>
                  <label htmlFor="enq-product" className="label-field">Product</label>
                  <input
                    id="enq-product"
                    type="text"
                    value={form.product}
                    onChange={(e) => update('product', e.target.value)}
                    className="input-field"
                    readOnly={!!product}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="enq-message" className="label-field">Message (optional)</label>
                <textarea
                  id="enq-message"
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  className="input-field min-h-20 resize-y"
                  placeholder="Any specific questions or requirements"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button type="submit" disabled={submitting} className="btn-primary flex-1">
                  {submitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  Submit Enquiry
                </button>
                {product && (
                  <a
                    href={buildWhatsAppEnquiryLink(product.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                )}
              </div>
              <p className="text-xs text-muted/70 text-center">
                Demo mode — submissions are not yet saved to a live database.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
