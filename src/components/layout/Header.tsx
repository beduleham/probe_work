'use client';

import { Menu, Plus } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { findActiveNavItem } from '@/config/navigation';
import { useAppShellStore } from '@/stores/useAppShellStore';
import { UserProfileMenu } from './UserProfileMenu';

export function Header() {
  const pathname = usePathname();
  const title = findActiveNavItem(pathname)?.title ?? '대시보드';
  const openMobileNav = useAppShellStore((s) => s.setMobileNavOpen);
  const openQuickConsultation = useAppShellStore((s) => s.setQuickConsultationOpen);

  return (
    <header className="flex h-15 shrink-0 items-center gap-2 border-b border-slate-200 bg-white px-3 md:px-6">
      <button
        type="button"
        onClick={() => openMobileNav(true)}
        aria-label="메뉴 열기"
        className="flex size-11 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 md:hidden"
      >
        <Menu className="size-5" />
      </button>
      <nav aria-label="현재 위치" className="min-w-0 flex-1">
        <ol className="flex items-center gap-1 text-sm">
          <li className="hidden text-slate-400 sm:block">PROBE /</li>
          <li>
            <h1 className="truncate text-base font-semibold text-slate-900">{title}</h1>
          </li>
        </ol>
      </nav>
      <button
        type="button"
        onClick={() => openQuickConsultation(true)}
        className="flex min-h-11 items-center gap-1 rounded-lg bg-brand-600 px-3 text-sm font-medium text-white hover:bg-brand-700"
      >
        <Plus className="size-4" aria-hidden="true" />
        <span>
          빠른 상담<span className="hidden sm:inline"> 등록</span>
        </span>
      </button>
      <UserProfileMenu />
    </header>
  );
}
