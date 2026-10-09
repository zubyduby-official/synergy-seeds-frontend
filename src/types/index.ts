export type CropCategory = 'chilli' | 'cucumber' | 'tomato' | 'brinjal' | 'sweet-corn';

export type BusinessType = 'Dealer' | 'Distributor' | 'Retailer' | 'Other';

export interface PackSize {
  label: string;
  grams: number;
  provisional: boolean;
}

export interface ProductSpecifications {
  plantHabit: string;
  fruitCharacteristics: string;
  fruitColour: string;
  pungency: string;
  maturityDays: string;
  keyFeatures: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: CropCategory;
  description: string;
  specifications: ProductSpecifications;
  retailPackSize: PackSize | null;
  bulkPackSizes: PackSize[];
  imageRef: string;
  imageAlt: string;
  price: number | null;
  stock: 'in-stock' | 'out-of-stock' | 'unconfigured' | null;
  purchasable: boolean;
}

export interface ProductCategoryInfo {
  slug: CropCategory;
  name: string;
  shortLabel: string;
  description: string;
  imageQuery: string;
}

export interface CartItemData {
  productId: string;
  slug: string;
  name: string;
  category: CropCategory;
  packSizeLabel: string;
  quantity: number;
  price: number | null;
  imageRef: string;
}

export interface CheckoutData {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes: string;
}

export interface OrderSummary {
  orderId: string;
  items: CartItemData[];
  subtotal: number;
  deliveryCharge: number | null;
  total: number;
}

export interface EnquiryData {
  name: string;
  phone: string;
  state: string;
  cropInterest: string;
  product: string;
  message: string;
}

export interface DealerEnquiryData {
  fullName: string;
  businessName: string;
  phone: string;
  email: string;
  state: string;
  city: string;
  businessType: BusinessType;
  interestedCrops: CropCategory[];
  message: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

export interface BusinessSettings {
  companyName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  whatsappNumber: string;
  email: string;
  secondaryEmail: string;
  address: string;
  gst: string;
  domain: string;
  upiId: string;
  catalogueUrl: string | null;
  catalogueAvailable: boolean;
  whatsappDefaultMessage: string;
  states: string[];
}
