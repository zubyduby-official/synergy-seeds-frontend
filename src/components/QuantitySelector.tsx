import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

export function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  max = 99,
  disabled,
}: QuantitySelectorProps) {
  return (
    <div className="inline-flex items-center rounded-lg border border-forest-200 bg-white">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, quantity - 1))}
        disabled={disabled || quantity <= min}
        className="flex h-9 w-9 items-center justify-center rounded-l-lg text-charcoal transition-colors hover:bg-botanical disabled:opacity-40"
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span
        className="flex h-9 min-w-10 items-center justify-center border-x border-forest-200 text-sm font-semibold text-charcoal"
        aria-live="polite"
      >
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={disabled || quantity >= max}
        className="flex h-9 w-9 items-center justify-center rounded-r-lg text-charcoal transition-colors hover:bg-botanical disabled:opacity-40"
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
