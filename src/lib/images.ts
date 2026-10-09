/**
 * Centralized image URLs for crop categories and hero imagery.
 * Images sourced from Pexels (license-free). Replace with official
 * product photography when available.
 */

export const heroImageUrl =
  'https://images.pexels.com/photos/39198174/pexels-photo-39198174.jpeg?auto=compress&cs=tinysrgb&w=1600';

export const heroImageAlt =
  'Vibrant green agricultural fields in rural India under a clear blue sky';

export const aboutImageUrl =
  'https://images.pexels.com/photos/28240873/pexels-photo-28240873.jpeg?auto=compress&cs=tinysrgb&w=1200';

export const categoryImages: Record<string, { url: string; alt: string }> = {
  chilli: {
    url: 'https://images.pexels.com/photos/14008249/pexels-photo-14008249.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Vibrant green chilli peppers growing on a plant',
  },
  cucumber: {
    url: 'https://images.pexels.com/photos/31737298/pexels-photo-31737298.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Fresh cucumber on the vine in a garden',
  },
  tomato: {
    url: 'https://images.pexels.com/photos/5685910/pexels-photo-5685910.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Red tomatoes on the vine in a garden',
  },
  brinjal: {
    url: 'https://images.pexels.com/photos/35116491/pexels-photo-35116491.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Fresh purple eggplants among green leaves',
  },
  'sweet-corn': {
    url: 'https://images.pexels.com/photos/7877994/pexels-photo-7877994.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Fresh yellow corn cobs',
  },
};

export const dealerCtaImageUrl =
  'https://images.pexels.com/photos/29277511/pexels-photo-29277511.jpeg?auto=compress&cs=tinysrgb&w=1200';
