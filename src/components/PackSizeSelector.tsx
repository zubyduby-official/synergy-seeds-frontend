import type { PackSize } from '@/types';
import { AlertCircle } from 'lucide-react';

interface PackSizeSelectorProps {
  sizes: PackSize[];
  selected: string;
  onSelect: (label: string) => void;
  disabled?: boolean;
}

export function PackSizeSelector({ sizes, selected, onSelect, disabled }: PackSizeSelectorProps) {
  if (sizes.length === 0) return null;

  const hasProvisional = sizes.some((s) => s.provisional);

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="label-field mb-0">Pack size</span>
        {hasProvisional && (
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-accent-700">
            <AlertCircle className="h-3 w-3" />
            Provisional
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <button
            key={size.label}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(size.label)}
            className={`rounded-lg border px-3.5 py-2 text-sm font-medium transition-all ${
              selected === size.label
                ? 'border-forest-500 bg-forest-500 text-white'
                : 'border-forest-200 bg-white text-charcoal hover:border-forest-400'
            } disabled:opacity-50`}
            aria-pressed={selected === size.label}
          >
            {size.label}
          </button>
        ))}
      </div>
    </div>
  );
}
