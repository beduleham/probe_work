'use client';

import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useAppShellStore } from '@/stores/useAppShellStore';
import { NavLinks } from './NavLinks';

export function Sidebar() {
  const collapsed = useAppShellStore((s) => s.isSidebarCollapsed);
  const toggle = useAppShellStore((s) => s.toggleSidebarCollapsed);

  return (
    <aside
      data-testid="desktop-sidebar"
      className={cn(
        'hidden shrink-0 flex-col border-r border-slate-200 bg-white md:flex',
        collapsed ? 'w-16' : 'w-60',
      )}
    >
      <div className="flex h-15 items-center border-b border-slate-200 px-4">
        <span className="text-lg font-bold text-brand-700">{collapsed ? 'P' : 'PROBE 교육문의'}</span>
      </div>
      <nav aria-label="주요 메뉴" className="flex-1 p-2">
        <NavLinks collapsed={collapsed} />
      </nav>
      <button
        type="button"
        onClick={toggle}
        aria-label={collapsed ? '사이드바 펼치기' : '사이드바 접기'}
        className="flex min-h-11 items-center justify-center border-t border-slate-200 text-slate-500 hover:bg-slate-50"
      >
        {collapsed ? <ChevronsRight className="size-5" /> : <ChevronsLeft className="size-5" />}
      </button>
    </aside>
  );
}
