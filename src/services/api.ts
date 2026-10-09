import type {
  Product,
  CartItemData,
  CheckoutData,
  OrderSummary,
  EnquiryData,
  DealerEnquiryData,
  ContactFormData,
} from '@/types';
import { businessSettings } from '@/config/business';
import { products as allProducts } from '@/data/products';

/**
 * API service abstraction layer.
 *
 * During frontend development this module returns clearly-labelled mock/demo
 * responses. When WordPress/WooCommerce integration is ready, replace each
 * function body with the corresponding API call — the function signatures
 * and return types are designed to stay the same so components do not change.
 */

const DEMO_LATENCY = 600;

function delay<T>(value: T, ms = DEMO_LATENCY): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  source: 'mock' | 'api';
}

export async function fetchProducts(): Promise<ProductListResponse> {
  return delay({
    products: allProducts,
    total: allProducts.length,
    source: 'mock',
  });
}

export interface EnquirySubmissionResult {
  success: boolean;
  referenceId: string;
  source: 'demo' | 'api';
  message: string;
}

export async function submitEnquiry(data: EnquiryData): Promise<EnquirySubmissionResult> {
  const ref = `ENQ-${Date.now().toString(36).toUpperCase()}`;
  return delay({
    success: true,
    referenceId: ref,
    source: 'demo',
    message: 'Your enquiry has been received in demo mode. Our team will contact you once the backend is connected.',
  });
}

export async function submitDealerEnquiry(data: DealerEnquiryData): Promise<EnquirySubmissionResult> {
  const ref = `DLR-${Date.now().toString(36).toUpperCase()}`;
  return delay({
    success: true,
    referenceId: ref,
    source: 'demo',
    message: 'Your dealer enquiry has been received in demo mode. Our team will contact you once the backend is connected.',
  });
}

export async function submitContactForm(data: ContactFormData): Promise<EnquirySubmissionResult> {
  const ref = `CTC-${Date.now().toString(36).toUpperCase()}`;
  return delay({
    success: true,
    referenceId: ref,
    source: 'demo',
    message: 'Your message has been received in demo mode. We will respond once the backend is connected.',
  });
}

export interface OrderSubmissionResult {
  success: boolean;
  orderId: string;
  source: 'demo' | 'api';
  message: string;
}

export async function submitOrder(
  items: CartItemData[],
  checkout: CheckoutData
): Promise<OrderSubmissionResult> {
  const orderId = `SS-${Date.now().toString(36).toUpperCase()}`;
  return delay({
    success: true,
    orderId,
    source: 'demo',
    message: 'Order placed in demo mode. No real order has been created until the backend is connected.',
  });
}

export function buildOrderSummary(
  orderId: string,
  items: CartItemData[],
  deliveryCharge: number | null
): OrderSummary {
  const subtotal = items.reduce(
    (sum, item) => sum + (item.price ?? 0) * item.quantity,
    0
  );
  return {
    orderId,
    items,
    subtotal,
    deliveryCharge,
    total: subtotal + (deliveryCharge ?? 0),
  };
}

export function buildWhatsAppPaymentLink(orderId: string, amount: number): string {
  const msg = `Hello Synergy Seeds, I have made a UPI payment for Order ${orderId} of ₹${amount}. I am sharing the payment screenshot for verification.`;
  return `https://wa.me/${businessSettings.whatsappNumber}?text=${encodeURIComponent(msg)}`;
}

export function buildWhatsAppEnquiryLink(productName: string): string {
  const msg = `Hello Synergy Seeds, I would like to enquire about the ${productName} hybrid seed variety.`;
  return `https://wa.me/${businessSettings.whatsappNumber}?text=${encodeURIComponent(msg)}`;
}

export function buildWhatsAppGeneralLink(): string {
  return `https://wa.me/${businessSettings.whatsappNumber}?text=${encodeURIComponent(businessSettings.whatsappDefaultMessage)}`;
}
