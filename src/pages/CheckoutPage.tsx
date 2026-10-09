import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Loader2, ShoppingBag, Lock } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { EmptyState } from '@/components/States';
import { ProductImage } from '@/components/ProductImage';
import { useCart } from '@/context/CartContext';
import { businessSettings } from '@/config/business';
import { categoryName } from '@/data/categories';
import { submitOrder } from '@/services/api';
import type { CheckoutData, OrderSummary } from '@/types';

interface CheckoutPageProps {
  onOrderCreated: (summary: OrderSummary) => void;
}

export function CheckoutPage({ onOrderCreated }: CheckoutPageProps) {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<CheckoutData>({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutData, string>>>({});

  if (items.length === 0) {
    return (
      <div className="py-8 lg:py-12">
        <div className="container-page">
          <Breadcrumbs items={[{ label: 'Checkout' }]} />
          <EmptyState
            icon={ShoppingBag}
            title="Your cart is empty"
            message="Add products to your cart before proceeding to checkout."
            action={
              <Link to="/products" className="btn-primary">
                Browse Products
                <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />
        </div>
      </div>
    );
  }

  const validate = (): boolean => {
    const e: Partial<Record<keyof CheckoutData, string>> = {};
    if (!form.fullName.trim()) e.fullName = 'Please enter your full name';
    if (!form.phone.trim()) e.phone = 'Please enter your phone number';
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, '')))
      e.phone = 'Please enter a valid 10-digit Indian mobile number';
    if (!form.address.trim()) e.address = 'Please enter your delivery address';
    if (!form.city.trim()) e.city = 'Please enter your city';
    if (!form.state.trim()) e.state = 'Please select your state';
    if (!form.pincode.trim()) e.pincode = 'Please enter your PIN code';
    else if (!/^\d{6}$/.test(form.pincode)) e.pincode = 'PIN code must be 6 digits';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const result = await submitOrder(items, form);
    setSubmitting(false);
    if (result.success) {
      const summary: OrderSummary = {
        orderId: result.orderId,
        items: [...items],
        subtotal,
        deliveryCharge: null,
        total: subtotal,
      };
      clearCart();
      onOrderCreated(summary);
      navigate('/payment');
    }
  };

  const update = (field: keyof CheckoutData, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <div className="py-8 lg:py-12">
      <div className="container-page">
        <Breadcrumbs items={[{ label: 'Cart', path: '/cart' }, { label: 'Checkout' }]} />

        <h1 className="font-display text-fluid-2xl font-bold text-forest-800 mb-6">
          Checkout
        </h1>

        <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_360px]" noValidate>
          {/* Form fields */}
          <div className="space-y-6">
            <div className="card p-6">
              <h2 className="font-display text-lg font-bold text-forest-800 mb-4">
                Delivery Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="ck-name" className="label-field">
                    Full name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="ck-name"
                    type="text"
                    value={form.fullName}
                    onChange={(e) => update('fullName', e.target.value)}
                    className="input-field"
                    placeholder="Your full name"
                    aria-invalid={!!errors.fullName}
                  />
                  {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="ck-phone" className="label-field">
                      Phone number <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="ck-phone"
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
                    <label htmlFor="ck-email" className="label-field">
                      Email <span className="text-muted font-normal">(optional)</span>
                    </label>
                    <input
                      id="ck-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      className="input-field"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="ck-address" className="label-field">
                    Delivery address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="ck-address"
                    value={form.address}
                    onChange={(e) => update('address', e.target.value)}
                    className="input-field min-h-20 resize-y"
                    placeholder="House no, street, area, landmark"
                    aria-invalid={!!errors.address}
                  />
                  {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label htmlFor="ck-city" className="label-field">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="ck-city"
                      type="text"
                      value={form.city}
                      onChange={(e) => update('city', e.target.value)}
                      className="input-field"
                      placeholder="City"
                      aria-invalid={!!errors.city}
                    />
                    {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
                  </div>

                  <div>
                    <label htmlFor="ck-state" className="label-field">
                      State <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="ck-state"
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
                    <label htmlFor="ck-pin" className="label-field">
                      PIN code <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="ck-pin"
                      type="text"
                      inputMode="numeric"
                      value={form.pincode}
                      onChange={(e) => update('pincode', e.target.value)}
                      className="input-field"
                      placeholder="6-digit PIN"
                      maxLength={6}
                      aria-invalid={!!errors.pincode}
                    />
                    {errors.pincode && <p className="mt-1 text-xs text-red-500">{errors.pincode}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="ck-notes" className="label-field">
                    Order notes <span className="text-muted font-normal">(optional)</span>
                  </label>
                  <textarea
                    id="ck-notes"
                    value={form.notes}
                    onChange={(e) => update('notes', e.target.value)}
                    className="input-field min-h-16 resize-y"
                    placeholder="Any special instructions for delivery"
                  />
                </div>
              </div>
            </div>

            <Link
              to="/cart"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-forest-600"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to cart
            </Link>
          </div>

          {/* Order summary */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="card p-6">
              <h2 className="font-display text-lg font-bold text-forest-800 mb-4">
                Order Summary
              </h2>

              <div className="max-h-64 space-y-3 overflow-y-auto mb-4 pr-1">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.packSizeLabel}`}
                    className="flex items-center gap-3 text-sm"
                  >
                    <ProductImage
                      imageRef={item.imageRef}
                      alt={item.name}
                      category={item.category}
                      size="thumb"
                      className="rounded-md shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-charcoal truncate">{item.name}</p>
                      <p className="text-xs text-muted">
                        {item.packSizeLabel} × {item.quantity}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      {item.price !== null ? (
                        <span className="font-medium text-forest-700">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      ) : (
                        <span className="text-xs text-accent-700">TBC</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-forest-100 pt-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Delivery</span>
                  <span className="text-muted text-xs">To be confirmed</span>
                </div>
                <div className="flex justify-between border-t border-forest-100 pt-2">
                  <span className="font-semibold text-forest-700">Total</span>
                  <span className="font-display font-bold text-forest-800 text-lg">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button type="submit" disabled={submitting} className="btn-primary w-full mt-5">
                {submitting ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    Place Order
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted">
                <Lock className="h-3 w-3" />
                No COD — payment via UPI after order
              </div>
              <p className="mt-2 text-center text-xs text-muted/70">
                Demo mode — no real order is created yet.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
