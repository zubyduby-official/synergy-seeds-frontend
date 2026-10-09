import { Sprout } from 'lucide-react';
import type { CropCategory } from '@/types';

const categoryColors: Record<CropCategory, string> = {
  chilli: 'from-red-100 to-orange-50 text-red-600',
  cucumber: 'from-green-100 to-lime-50 text-green-600',
  tomato: 'from-red-100 to-rose-50 text-red-500',
  brinjal: 'from-purple-100 to-violet-50 text-purple-600',
  'sweet-corn': 'from-yellow-100 to-amber-50 text-amber-600',
};

const categoryLabels: Record<CropCategory, string> = {
  chilli: 'Chilli',
  cucumber: 'Cucumber',
  tomato: 'Tomato',
  brinjal: 'Brinjal',
  'sweet-corn': 'Sweet Corn',
};

interface ProductImageProps {
  imageRef: string;
  alt: string;
  category: CropCategory;
  className?: string;
  size?: 'card' | 'detail' | 'thumb';
}

/**
 * Displays a product image. Since official product photos are not yet available,
 * this renders a styled placeholder with the crop category name. When real
 * images are added to public/assets/products/, replace the placeholder logic
 * with an <img> tag using the imageRef filename.
 */
export function ProductImage({ imageRef, alt, category, className = '', size = 'card' }: ProductImageProps) {
  const colorClass = categoryColors[category] ?? 'from-forest-50 to-botanical text-forest-500';

  // Future: check if image file exists and render <img> instead
  // const imagePath = `/assets/products/${imageRef}`;
  // For now, use placeholder

  const sizeClasses = {
    card: 'h-48 w-full',
    detail: 'h-full w-full min-h-[340px]',
    thumb: 'h-16 w-16',
  };

  return (
    <div
      className={`relative flex items-center justify-center bg-gradient-to-br ${colorClass} ${sizeClasses[size]} ${className}`}
      role="img"
      aria-label={alt}
    >
      <div className="flex flex-col items-center gap-2 opacity-60">
        <Sprout className={size === 'thumb' ? 'h-6 w-6' : 'h-10 w-10'} strokeWidth={1.5} />
        {size !== 'thumb' && (
          <span className="text-xs font-semibold uppercase tracking-wide">
            {categoryLabels[category]}
          </span>
        )}
      </div>
      {/* Image filename reference for future use */}
      <span className="sr-only">Image: {imageRef}</span>
    </div>
  );
}
