import { useState } from 'react';
import { Link } from 'react-router-dom';
import { QrCode, MessageCircle, Clock, AlertCircle, Copy, Check, Package, ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { EmptyState } from '@/components/States';
import { businessSettings } from '@/config/business';
import { buildWhatsAppPaymentLink } from '@/services/api';
import type { OrderSummary } from '@/types';

interface PaymentPageProps {
  order: OrderSummary | null;
}

export function PaymentPage({ order }: PaymentPageProps) {
  const [copied, setCopied] = useState(false);

  if (!order) {
    return (
      <div className="py-8 lg:py-12">
        <div className="container-page">
          <Breadcrumbs items={[{ label: 'Payment' }]} />
          <EmptyState
            icon={Package}
            title="No order to display"
            message="Place an order from the checkout page to see payment instructions here."
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

  const whatsappLink = buildWhatsAppPaymentLink(order.orderId, order.total);
  const hasUnpriced = order.items.some((i) => i.price === null);

  const upiId = businessSettings.upiId;

  const copyUpiId = () => {
    if (!upiId) return;
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-8 lg:py-12">
      <div className="container-page">
        <Breadcrumbs items={[
          { label: 'Cart', path: '/cart' },
          { label: 'Checkout', path: '/checkout' },
          { label: 'Payment' },
        ]} />

        <div className="max-w-3xl mx-auto">
          {/* Order reference */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-forest-50 text-forest-500">
              <Package className="h-8 w-8" />
            </div>
            <h1 className="font-display text-fluid-2xl font-bold text-forest-800">
              Order Placed
            </h1>
            <p className="mt-2 text-muted">
              Your order reference is{' '}
              <span className="font-display font-bold text-forest-700">{order.orderId}</span>
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent-50 px-3 py-1 text-sm font-medium text-accent-700">
              <Clock className="h-4 w-4" />
              Payment Pending
            </div>
          </div>

          {hasUnpriced && (
            <div className="mb-6 flex items-start gap-2.5 rounded-lg border border-accent-200 bg-accent-50 px-4 py-3 text-sm text-accent-700">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Pricing confirmation required</p>
                <p className="mt-0.5 text-xs">
                  Some items in your order have unconfirmed pricing. Our team will
                  confirm the final amount with you before payment. Please contact us
                  on WhatsApp for the confirmed total.
                </p>
              </div>
            </div>
          )}

          {/* Payment instructions */}
          <div className="card p-6 sm:p-8 mb-6">
            <h2 className="font-display text-lg font-bold text-forest-800 mb-1">
              UPI Payment Instructions
            </h2>
            <p className="text-sm text-muted mb-6">
              Complete your payment using any UPI app, then share the screenshot on WhatsApp.
            </p>

            {upiId ? (
            <div className="grid gap-6 sm:grid-cols-[200px_1fr]">
              {/* QR placeholder */}
              <div className="flex flex-col items-center">
                <div className="flex h-48 w-48 items-center justify-center rounded-xl border-2 border-dashed border-forest-200 bg-botanical">
                  <div className="flex flex-col items-center gap-2 text-muted">
                    <QrCode className="h-16 w-16" strokeWidth={1} />
                    <span className="text-xs text-center">UPI QR Code<br />(to be added)</span>
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted text-center">
                  Scan with any UPI app
                </p>
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted mb-1">
                    Order Reference
                  </p>
                  <p className="font-display text-lg font-bold text-forest-700">
                    {order.orderId}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted mb-1">
                    Payable Amount
                  </p>
                  <p className="font-display text-2xl font-extrabold text-forest-800">
                    ₹{order.total.toLocaleString('en-IN')}
                    {hasUnpriced && (
                      <span className="text-sm font-medium text-accent-700 ml-2">(to be confirmed)</span>
                    )}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted mb-1">
                    UPI ID
                  </p>
                  <div className="flex items-center gap-2">
                    <code className="rounded-lg bg-botanical px-3 py-2 text-sm font-medium text-forest-700">
                      {upiId}
                    </code>
                    <button
                      onClick={copyUpiId}
                      className="btn-ghost p-2"
                      aria-label="Copy UPI ID"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-leaf-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted mb-1">
                    Pay To
                  </p>
                  <p className="text-sm font-medium text-charcoal">
                    {businessSettings.companyName}
                  </p>
                  <p className="text-xs text-muted">{businessSettings.phone}</p>
                </div>
              </div>
            </div>
            ) : (
            <div className="rounded-lg bg-accent-50 px-4 py-6 text-center">
              <AlertCircle className="mx-auto mb-3 h-8 w-8 text-accent-600" />
              <p className="text-sm font-medium text-accent-700">UPI payment details pending</p>
              <p className="mt-1 text-xs text-accent-700/80 leading-relaxed">
                Our UPI ID and QR code will be displayed here once officially provided.
                Please contact us on WhatsApp to arrange payment for this order.
              </p>
            </div>
            )}

            {upiId && (
            <div className="mt-6 rounded-lg bg-botanical p-4">
              <h3 className="font-display text-sm font-bold text-forest-700 mb-3">
                How to complete your payment
              </h3>
              <ol className="space-y-2 text-sm text-muted">
                <li className="flex gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest-500 text-white text-xs font-bold">1</span>
                  <span>Open your UPI app (PhonePe, Google Pay, Paytm, etc.)</span>
                </li>
                <li className="flex gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest-500 text-white text-xs font-bold">2</span>
                  <span>Scan the QR code or enter the UPI ID shown above</span>
                </li>
                <li className="flex gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest-500 text-white text-xs font-bold">3</span>
                  <span>Complete the UPI transfer for the payable amount</span>
                </li>
                <li className="flex gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest-500 text-white text-xs font-bold">4</span>
                  <span>Take a screenshot of the payment confirmation</span>
                </li>
                <li className="flex gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest-500 text-white text-xs font-bold">5</span>
                  <span>Click the WhatsApp button below and attach the screenshot</span>
                </li>
              </ol>
            </div>
            )}

            {/* WhatsApp button */}
            <div className="mt-6">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary w-full"
              >
                <MessageCircle className="h-5 w-5" />
                Send Payment Screenshot on WhatsApp
              </a>
              <p className="mt-2 text-center text-xs text-muted">
                This opens WhatsApp with a pre-filled message. You must manually attach
                the payment screenshot in WhatsApp before sending.
              </p>
            </div>
          </div>

          {/* Order summary */}
          <div className="card p-6 mb-6">
            <h2 className="font-display text-lg font-bold text-forest-800 mb-4">
              Order Details
            </h2>
            <div className="space-y-2 text-sm">
              {order.items.map((item) => (
                <div
                  key={`${item.productId}-${item.packSizeLabel}`}
                  className="flex justify-between border-b border-forest-50 pb-2 last:border-0"
                >
                  <span className="text-charcoal">
                    {item.name} — {item.packSizeLabel} × {item.quantity}
                  </span>
                  <span className="font-medium text-forest-700">
                    {item.price !== null
                      ? `₹${(item.price * item.quantity).toLocaleString('en-IN')}`
                      : 'TBC'}
                  </span>
                </div>
              ))}
              <div className="flex justify-between pt-2">
                <span className="font-semibold text-forest-700">Total</span>
                <span className="font-display font-bold text-forest-800">
                  ₹{order.total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>

          {/* Payment status info */}
          <div className="rounded-lg bg-forest-50 p-4 text-center">
            <p className="text-sm text-forest-700">
              <strong>Payment status: Pending</strong>
            </p>
            <p className="mt-1 text-xs text-muted leading-relaxed">
              Your order will be marked as "Paid" only after we verify the transaction.
              Sharing the screenshot on WhatsApp helps us verify your payment faster.
              This does not automatically confirm payment — verification is done manually
              by our team.
            </p>
          </div>

          <div className="mt-6 text-center">
            <Link to="/products" className="btn-outline">
              Continue Shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

