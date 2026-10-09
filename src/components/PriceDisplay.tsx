import { IndianRupee, Clock } from 'lucide-react';

interface PriceDisplayProps {
  price: number | null;
  purchasable: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function PriceDisplay({ price, purchasable, size = 'md' }: PriceDisplayProps) {
  const sizeClasses = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  if (price === null || !purchasable) {
    return (
      <div className="inline-flex items-center gap-1.5 rounded-md bg-accent-50 px-2.5 py-1 text-xs font-medium text-accent-700">
        <Clock className="h-3.5 w-3.5" />
        Price to be confirmed
      </div>
    );
  }

  return (
    <div className={`flex items-center font-display font-bold text-forest-800 ${sizeClasses[size]}`}>
      <IndianRupee className={size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'} />
      <span>{price.toLocaleString('en-IN')}</span>
    </div>
  );
}
