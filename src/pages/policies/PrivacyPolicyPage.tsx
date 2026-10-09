import { PolicyPage } from './PolicyPage';
import { businessSettings } from '@/config/business';

export function PrivacyPolicyPage() {
  return (
    <PolicyPage title="Privacy Policy" breadcrumb="Privacy Policy">
      <section>
        <h2 className="font-display text-lg font-bold text-forest-800 mb-3">1. Introduction</h2>
        <p>
          {businessSettings.companyName} ("we", "our", "us") respects your privacy and is
          committed to protecting your personal information. This Privacy Policy explains how
          we collect, use, and safeguard information when you visit our website or use our services.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-bold text-forest-800 mb-3">2. Information We Collect</h2>
        <p>
          We may collect the following types of information when you interact with our website:
        </p>
        <ul className="mt-2 list-disc pl-5 space-y-1">
          <li>Name, phone number, email address, and state when you submit an enquiry or contact form.</li>
          <li>Business details when you submit a dealer or distributor enquiry.</li>
          <li>Delivery address and contact information when you place an order.</li>
          <li>Browsing data such as pages visited, which we may use to improve the website.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-lg font-bold text-forest-800 mb-3">3. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul className="mt-2 list-disc pl-5 space-y-1">
          <li>Respond to your enquiries and provide product information.</li>
          <li>Process orders and arrange delivery.</li>
          <li>Communicate with dealers, distributors, and partners.</li>
          <li>Improve our website and services.</li>
        </ul>
      </section>

      <section>
        <h2 className="font-display text-lg font-bold text-forest-800 mb-3">4. Information Sharing</h2>
        <p>
          We do not sell or rent your personal information to third parties. We may share
          information with service providers who assist us in operating our business (such
          as delivery partners), only to the extent necessary to fulfil your requests.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-bold text-forest-800 mb-3">5. Data Security</h2>
        <p>
          We take reasonable measures to protect your personal information against unauthorised
          access, alteration, or disclosure. However, no method of transmission over the
          internet is completely secure.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-bold text-forest-800 mb-3">6. Your Rights</h2>
        <p>
          You may request access to, correction of, or deletion of your personal information
          by contacting us using the details provided below.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-bold text-forest-800 mb-3">7. Contact</h2>
        <p>
          For privacy-related questions, please contact us at{' '}
          <a href={`mailto:${businessSettings.email}`} className="text-forest-600 font-medium">
            {businessSettings.email}
          </a>
          {' '}or at our registered office: {businessSettings.address}
        </p>
      </section>
    </PolicyPage>
  );
}
