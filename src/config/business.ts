import type { BusinessSettings } from '@/types';

export const businessSettings: BusinessSettings = {
  companyName: 'Synergy Seeds India Private Limited',
  tagline: 'Quality Seeds for Prosperous Farming',
  phone: '+91 9424554533',
  whatsapp: '+91 9424554533',
  whatsappNumber: '919424554533',
  email: 'contact@synergyseeds.in',
  secondaryEmail: 'info@synergyseeds.in',
  address:
    'OFFICE NO 203, 2nd Floor, Shell Tower, Sapna Sangeeta, Indore, Madhya Pradesh, India.',
  gst: '23ABHCS2885A1ZI',
  domain: 'www.synergyseeds.in',
  upiId: null,
  catalogueUrl: null,
  catalogueAvailable: false,
  whatsappDefaultMessage:
    'Hello Synergy Seeds, I would like to enquire about your hybrid seed varieties.',
  states: [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi',
    'Jammu and Kashmir', 'Ladakh', 'Puducherry', 'Chandigarh',
  ],
};

export const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Products', path: '/products' },
  { label: 'Dealer Enquiry', path: '/dealer-enquiry' },
  { label: 'Contact Us', path: '/contact' },
];

export const footerPolicyLinks = [
  { label: 'Privacy Policy', path: '/privacy-policy' },
  { label: 'Terms & Conditions', path: '/terms-conditions' },
  { label: 'Shipping Policy', path: '/shipping-policy' },
  { label: 'Return & Refund Policy', path: '/return-refund-policy' },
  { label: 'Cancellation Policy', path: '/cancellation-policy' },
];

export const corePillars = [
  {
    title: 'Genetic Purity',
    description:
      'Every variety is developed with careful attention to maintaining true-to-type genetic characteristics across generations.',
  },
  {
    title: 'Vigorous Germination',
    description:
      'Seed lines are selected for strong, uniform emergence — giving farmers a reliable start and healthy crop establishment.',
  },
  {
    title: 'Robust Disease Tolerance',
    description:
      'Hybrid varieties are bred with focus on natural tolerance to common crop diseases, reducing risk for growers.',
  },
  {
    title: 'High Yield & Returns',
    description:
      'Our breeding programme prioritises productive plant habits and market-preferred produce to support better farmer returns.',
  },
];
