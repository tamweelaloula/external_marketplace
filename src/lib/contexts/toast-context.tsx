"use client";

import Toast from "@/components/ui/Toast";
import React, { createContext, useCallback, useState, ReactNode } from "react";

export type ToastType = "success" | "destructive" | "info" | "warning";

export interface ToastItem {
  id: number;
  title?: string;
  description?: string;
  type?: ToastType;
}

interface ToastContextType {
  toast: (toast: Omit<ToastItem, "id">) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined
);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const toast = useCallback((toastData: Omit<ToastItem, "id">) => {
    const id = Date.now();

    setToasts((prev) => [...prev, { id, ...toastData }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 6000);
  }, []);

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      <div className="fixed right-4 top-4 z-50 space-y-2">
        {toasts.map((t) => (
          <Toast
            key={t.id}
            title={t.title || ""}
            type={t.type}
            onClose={() => removeToast(t.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
