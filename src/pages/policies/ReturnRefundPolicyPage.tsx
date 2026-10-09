import { PolicyPage } from './PolicyPage';
import { businessSettings } from '@/config/business';

export function ReturnRefundPolicyPage() {
  return (
    <PolicyPage title="Return & Refund Policy" breadcrumb="Return & Refund Policy">
      <section>
        <h2 className="font-display text-lg font-bold text-forest-800 mb-3">1. General Principle</h2>
        <p>
          {businessSettings.companyName} is committed to customer satisfaction. Given the nature
          of agricultural seeds, we have specific guidelines for returns and refunds to ensure
          product integrity.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-bold text-forest-800 mb-3">2. Return Eligibility</h2>
        <p>
          Seeds may be eligible for return only if:
        </p>
        <ul className="mt-2 list-disc pl-5 space-y-1">
          <li>The product is received in damaged condition.</li>
          <li>The wrong variety or pack size was delivered.</li>
          <li>The packaging seal is broken or tampered with on arrival.</li>
        </ul>
        <p className="mt-2">
          Returns must be reported within a reasonable time of receiving the product.
          Please contact us with your order reference and a description of the issue.
        </p>
        <p className="mt-2">
          <em className="text-accent-700">
            [The specific return window — e.g., 48 hours, 3 days — needs to be confirmed by the company.]
          </em>
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-bold text-forest-800 mb-3">3. Non-Returnable Items</h2>
        <p>
          Seeds cannot be returned once the original packaging has been opened, except where
          the product was damaged on arrival. This is to maintain seed quality and prevent
          contamination.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-bold text-forest-800 mb-3">4. Refund Process</h2>
        <p>
          Approved refunds will be processed back to the original payment method. The time
          for the refund to reflect in your account may vary depending on your bank or UPI
          service provider.
        </p>
        <p className="mt-2">
          <em className="text-accent-700">
            [Refund processing timelines need to be confirmed by the company.]
          </em>
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-bold text-forest-800 mb-3">5. Replacement</h2>
        <p>
          In case of wrong or damaged delivery, we will arrange a replacement at no additional
          cost, subject to stock availability. If a replacement is not available, a full refund
          will be issued.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-bold text-forest-800 mb-3">6. How to Request a Return or Refund</h2>
        <p>
          To request a return or refund, please contact us with your order reference, a
          description of the issue, and photographs if applicable:
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
