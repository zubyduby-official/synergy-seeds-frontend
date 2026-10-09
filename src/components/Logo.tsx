import { Sprout } from 'lucide-react';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-forest-500 text-white shadow-sm">
        <Sprout className="h-5 w-5" strokeWidth={2.2} />
      </div>
      <div className="leading-tight">
        <span className="block font-display text-base font-extrabold text-forest-800">
          Synergy Seeds
        </span>
        <span className="block text-[11px] font-medium tracking-wide text-muted">
          India Pvt. Ltd.
        </span>
      </div>
    </div>
  );
}
