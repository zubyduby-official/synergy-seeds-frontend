import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import { Layout } from '@/components/Layout';
import { HomePage } from '@/pages/HomePage';
import { AboutPage } from '@/pages/AboutPage';
import { ProductsPage } from '@/pages/ProductsPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { CartPage } from '@/pages/CartPage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { PaymentPage } from '@/pages/PaymentPage';
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
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}
