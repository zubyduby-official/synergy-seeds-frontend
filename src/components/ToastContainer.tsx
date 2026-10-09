import type { Toast } from '@/hooks/useToasts';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

interface ToastContainerProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

export function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 sm:bottom-6 sm:right-6">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="flex items-start gap-3 rounded-lg bg-white px-4 py-3 shadow-lift animate-fade-in-up max-w-sm"
          role="alert"
        >
          {toast.type === 'success' && (
            <CheckCircle2 className="h-5 w-5 shrink-0 text-leaf-500" />
          )}
          {toast.type === 'error' && (
            <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
          )}
          {toast.type === 'info' && (
            <Info className="h-5 w-5 shrink-0 text-forest-500" />
          )}
          <p className="flex-1 text-sm text-charcoal leading-snug">{toast.message}</p>
          <button
            onClick={() => onDismiss(toast.id)}
            className="shrink-0 text-muted hover:text-charcoal"
            aria-label="Dismiss notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
