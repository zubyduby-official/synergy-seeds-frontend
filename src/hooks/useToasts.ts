import { useState, useCallback } from 'react';

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

let toastCounter = 0;

export function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: Toast['type'] = 'success') => {
      const id = `toast-${++toastCounter}`;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => dismiss(id), 4000);
    },
    [dismiss]
  );

  return { toasts, showToast, dismiss };
}
