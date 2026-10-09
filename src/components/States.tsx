import { SearchX, PackageOpen, AlertTriangle, Loader2 } from 'lucide-react';

export function EmptyState({
  icon: Icon = SearchX,
  title,
  message,
  action,
}: {
  icon?: typeof SearchX;
  title: string;
  message: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-forest-200 bg-botanical/40 px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-forest-50 text-forest-400">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="mb-1.5 font-display text-lg font-bold text-forest-800">{title}</h3>
      <p className="mb-5 max-w-sm text-sm text-muted leading-relaxed">{message}</p>
      {action}
    </div>
  );
}

export function LoadingState({ message = 'Loading…' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <Loader2 className="h-8 w-8 animate-spin text-forest-400" />
      <p className="mt-3 text-sm text-muted">{message}</p>
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50 px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-500">
        <AlertTriangle className="h-7 w-7" />
      </div>
      <h3 className="mb-1.5 font-display text-lg font-bold text-red-800">Something went wrong</h3>
      <p className="mb-5 max-w-sm text-sm text-red-700/80 leading-relaxed">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="btn-outline">
          Try again
        </button>
      )}
    </div>
  );
}

export function ProductEmptyState({ message }: { message: string }) {
  return (
    <EmptyState
      icon={PackageOpen}
      title="No products found"
      message={message}
    />
  );
}
