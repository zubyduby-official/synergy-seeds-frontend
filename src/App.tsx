import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import { Layout } from '@/components/Layout';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { ProductsPage } from '@/pages/ProductsPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { CartPage } from '@/pages/CartPage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { PaymentPage } from '@/pages/PaymentPage';
import { DealerEnquiryPage } from '@/pages/DealerEnquiryPage';
import { ContactPage } from '@/pages/ContactPage';
import { CataloguePage } from '@/pages/CataloguePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { PrivacyPolicyPage } from '@/pages/policies/PrivacyPolicyPage';
import { TermsConditionsPage } from '@/pages/policies/TermsConditionsPage';
import { ShippingPolicyPage } from '@/pages/policies/ShippingPolicyPage';
import { ReturnRefundPolicyPage } from '@/pages/policies/ReturnRefundPolicyPage';
import { CancellationPolicyPage } from '@/pages/policies/CancellationPolicyPage';
import type { Product, OrderSummary } from '@/types';

export default function App() {
  const [enquiryProduct, setEnquiryProduct] = useState<Product | null>(null);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [orderSummary, setOrderSummary] = useState<OrderSummary | null>(null);

  const handleEnquire = useCallback((product: Product) => {
    setEnquiryProduct(product);
    setIsEnquiryOpen(true);
  }, []);

  const handleEnquiryClose = useCallback(() => {
    setIsEnquiryOpen(false);
  }, []);

  const handleOrderCreated = useCallback((summary: OrderSummary) => {
    setOrderSummary(summary);
  }, []);

  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route
              path="/products"
              element={<ProductsPage onEnquire={handleEnquire} />}
            />
            <Route
              path="/products/:slug"
              element={
                <ProductDetailPage
                  onEnquire={handleEnquire}
                  enquiryProduct={enquiryProduct}
                  isEnquiryOpen={isEnquiryOpen}
                  onEnquiryClose={handleEnquiryClose}
                  onAddToCartToast={(name) => {
                    setEnquiryProduct(null);
                    setIsEnquiryOpen(false);
                    void name;
                  }}
                />
              }
            />
            <Route path="/cart" element={<CartPage />} />
            <Route
              path="/checkout"
              element={<CheckoutPage onOrderCreated={handleOrderCreated} />}
            />
            <Route path="/payment" element={<PaymentPage order={orderSummary} />} />
            <Route path="/dealer-enquiry" element={<DealerEnquiryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/catalogue" element={<CataloguePage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-conditions" element={<TermsConditionsPage />} />
            <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
            <Route path="/return-refund-policy" element={<ReturnRefundPolicyPage />} />
            <Route path="/cancellation-policy" element={<CancellationPolicyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}
