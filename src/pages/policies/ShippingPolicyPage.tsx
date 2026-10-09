import { PolicyPage } from './PolicyPage';
import { businessSettings } from '@/config/business';

export function ShippingPolicyPage() {
  return (
    <PolicyPage title="Shipping Policy" breadcrumb="Shipping Policy">
      <section>
        <h2 className="font-display text-lg font-bold text-forest-800 mb-3">1. Order Processing</h2>
        <p>
          Orders are processed during our business hours. Once an order is confirmed and
          payment is verified, we will dispatch the seeds to the delivery address provided.
        </p>
        <p className="mt-2">
          <em className="text-accent-700">
            [Specific order processing times need to be confirmed by the company.]
          </em>
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-bold text-forest-800 mb-3">2. Delivery Areas</h2>
        <p>
          We currently deliver across India. Delivery to remote or specific regions may be
          subject to additional confirmation. If we are unable to deliver to your location,
          we will inform you and arrange an alternative or refund.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-bold text-forest-800 mb-3">3. Delivery Charges</h2>
        <p>
          Delivery charges are not included in the product price and will be confirmed at the
          time of order processing. The final amount including delivery will be communicated
          to you before payment confirmation.
        </p>
        <p className="mt-2">
          <em className="text-accent-700">
            [Delivery fee structure — free shipping thresholds, courier charges, etc. — needs to be confirmed by the company.]
          </em>
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-bold text-forest-800 mb-3">4. Estimated Delivery Time</h2>
        <p>
          Delivery times vary depending on your location and courier availability. You will
          receive an estimated delivery timeline once your order is dispatched.
        </p>
        <p className="mt-2">
          <em className="text-accent-700">
            [Specific delivery timelines — e.g., 3–5 business days metro, 7–10 days regional — need to be confirmed by the company.]
          </em>
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-bold text-forest-800 mb-3">5. Packaging</h2>
        <p>
          Seeds are packaged to maintain quality during transit. Each pack is sealed and
          labelled with variety name, pack size, and relevant information.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-bold text-forest-800 mb-3">6. Delivery Issues</h2>
        <p>
          If you experience any issues with delivery, such as damaged packaging or non-delivery,
          please contact us immediately at{' '}
          <a href={`mailto:${businessSettings.email}`} className="text-forest-600 font-medium">
            {businessSettings.email}
          </a>
          {' '}or on WhatsApp at {businessSettings.whatsapp}.
        </p>
      </section>
    </PolicyPage>
  );
}
