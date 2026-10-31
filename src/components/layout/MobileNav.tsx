'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { useAppShellStore } from '@/stores/useAppShellStore';
import { NavLinks } from './NavLinks';

export function MobileNav() {
  const open = useAppShellStore((s) => s.isMobileNavOpen);
  const setOpen = useAppShellStore((s) => s.setMobileNavOpen);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-slate-900/40 md:hidden" />
        <Dialog.Content
          aria-describedby={undefined}
          className="drawer-slide-in fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col bg-white shadow-xl md:hidden"
        >
          <div className="flex h-15 items-center justify-between border-b border-slate-200 px-4">
            <Dialog.Title className="text-lg font-bold text-brand-700">PROBE 교육문의</Dialog.Title>
            <Dialog.Close
              aria-label="메뉴 닫기"
              className="flex size-11 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
            >
              <X className="size-5" />
            </Dialog.Close>
          </div>
          <nav aria-label="모바일 메뉴" className="flex-1 p-2">
            <NavLinks onNavigate={() => setOpen(false)} />
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
