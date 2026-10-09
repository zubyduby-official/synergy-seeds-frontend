import { PolicyPage } from './PolicyPage';
import { businessSettings } from '@/config/business';

export function CancellationPolicyPage() {
  return (
    <PolicyPage title="Cancellation Policy" breadcrumb="Cancellation Policy">
      <section>
        <h2 className="font-display text-lg font-bold text-forest-800 mb-3">1. Order Cancellation Before Payment</h2>
        <p>
          You may cancel an order at any time before payment has been made. Since orders are
          placed first and payment is made via UPI afterwards, simply do not proceed with the
          payment and inform us that you wish to cancel.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-bold text-forest-800 mb-3">2. Order Cancellation After Payment</h2>
        <p>
          If you have already made the UPI payment and wish to cancel, please contact us
          immediately. Cancellation after payment is subject to the following conditions:
        </p>
        <ul className="mt-2 list-disc pl-5 space-y-1">
          <li>If the order has not yet been dispatched, we will process the cancellation and refund the full amount.</li>
          <li>If the order has already been dispatched, cancellation may not be possible. Please refer to our Return & Refund Policy for received orders.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-lg font-bold text-forest-800 mb-3">3. Cancellation by the Company</h2>
        <p>
          {businessSettings.companyName} reserves the right to cancel an order in the following
          circumstances:
        </p>
        <ul className="mt-2 list-disc pl-5 space-y-1">
          <li>The product is out of stock or unavailable.</li>
          <li>Pricing or product information was displayed incorrectly.</li>
          <li>The order could not be delivered to the specified location.</li>
          <li>Payment could not be verified.</li>
        </ul>
        <p className="mt-2">
          In such cases, any payment already made will be refunded in full.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-bold text-forest-800 mb-3">4. Refund for Cancelled Orders</h2>
        <p>
          Refunds for cancelled orders will be processed back to the original payment method
          (UPI). The time for the refund to reflect in your account may vary depending on
          your bank or UPI service provider.
        </p>
        <p className="mt-2">
          <em className="text-accent-700">
            [Specific refund processing timelines need to be confirmed by the company.]
          </em>
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-bold text-forest-800 mb-3">5. How to Cancel</h2>
        <p>
          To cancel an order, please contact us with your order reference:
        </p>
        <ul className="mt-2 list-disc pl-5 space-y-1">
          <li>Email: <a href={`mailto:${businessSettings.email}`} className="text-forest-600 font-medium">{businessSettings.email}</a></li>
          <li>Phone: {businessSettings.phone}</li>
          <li>WhatsApp: {businessSettings.whatsapp}</li>
        </ul>
      </section>
    </PolicyPage>
  );
}
