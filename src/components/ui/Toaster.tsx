'use client';

import * as Toast from '@radix-ui/react-toast';
import { create } from 'zustand';

interface ToastMessage {
  id: number;
  title: string;
  description?: string;
}

interface ToastState {
  toasts: ToastMessage[];
  push: (toast: Omit<ToastMessage, 'id'>) => void;
  dismiss: (id: number) => void;
}

let nextId = 1;

export const useToastStore = create<ToastState>()((set) => ({
  toasts: [],
  push: (toast) => set((s) => ({ toasts: [...s.toasts, { ...toast, id: nextId++ }] })),
  dismiss: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));

export function Toaster() {
  const toasts = useToastStore((s) => s.toasts);
  const dismiss = useToastStore((s) => s.dismiss);

  return (
    <>
      {toasts.map((t) => (
        <Toast.Root
          key={t.id}
          duration={4000}
          onOpenChange={(open) => {
            if (!open) dismiss(t.id);
          }}
          className="rounded-lg border border-slate-200 bg-white p-4 shadow-lg"
        >
          <Toast.Title className="text-sm font-semibold text-slate-900">{t.title}</Toast.Title>
          {t.description ? (
            <Toast.Description className="mt-1 text-sm text-slate-600">{t.description}</Toast.Description>
          ) : null}
        </Toast.Root>
      ))}
      <Toast.Viewport className="fixed right-0 bottom-0 z-[100] flex w-full max-w-sm flex-col gap-2 p-4" />
    </>
  );
}
