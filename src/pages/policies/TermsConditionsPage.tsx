import { PolicyPage } from './PolicyPage';
import { businessSettings } from '@/config/business';

export function TermsConditionsPage() {
  return (
    <PolicyPage title="Terms & Conditions" breadcrumb="Terms & Conditions">
      <section>
        <h2 className="font-display text-lg font-bold text-forest-800 mb-3">1. Acceptance of Terms</h2>
        <p>
          By accessing and using this website, you accept and agree to be bound by these
          Terms & Conditions. If you do not agree, please do not use the website.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-bold text-forest-800 mb-3">2. About Us</h2>
        <p>
          This website is operated by {businessSettings.companyName}, headquartered at{' '}
          {businessSettings.address}. Our GST number is {businessSettings.gst}.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-bold text-forest-800 mb-3">3. Product Information</h2>
        <p>
          We strive to provide accurate information about our hybrid seed varieties, including
          specifications and pack sizes. However, some details such as pricing, pack sizes, and
          availability are provisional and subject to final confirmation by the company.
        </p>
        <p>
          Seed performance may vary depending on growing conditions, farming practices, weather,
          and other factors beyond our control. We recommend following recommended cultivation
          practices for best results.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-bold text-forest-800 mb-3">4. Orders and Payment</h2>
        <p>
          Orders placed through this website are subject to acceptance and confirmation by our
          team. Payment is currently handled via UPI — please refer to our Payment process for
          details. We do not offer Cash on Delivery (COD) at this time.
        </p>
        <p>
          Orders for items with unconfirmed pricing will be reviewed by our team before final
          confirmation. The final amount will be communicated to you before payment.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-bold text-forest-800 mb-3">5. Enquiries and Communication</h2>
        <p>
          When you submit an enquiry or contact form, our team will endeavour to respond in a
          timely manner. Response times may vary depending on the volume of enquiries received.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-bold text-forest-800 mb-3">6. Intellectual Property</h2>
        <p>
          All content on this website, including text, graphics, logos, and product names, is
          the property of {businessSettings.companyName} unless otherwise stated. You may not
          reproduce or distribute content without prior written permission.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-bold text-forest-800 mb-3">7. Limitation of Liability</h2>
        <p>
          {businessSettings.companyName} shall not be liable for any indirect, incidental, or
          consequential damages arising from the use of this website or our products. Our
          liability is limited to the value of the products purchased.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-bold text-forest-800 mb-3">8. Changes to These Terms</h2>
        <p>
          We may update these Terms & Conditions from time to time. Updated terms will be posted
          on this page with a revised date.
        </p>
      </section>

      <section>
        <h2 className="font-display text-lg font-bold text-forest-800 mb-3">9. Governing Law</h2>
        <p>
          These terms are governed by the laws of India. Any disputes shall be subject to the
          jurisdiction of the courts in Indore, Madhya Pradesh, unless otherwise agreed.
        </p>
      </section>
    </PolicyPage>
  );
}
