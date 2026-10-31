'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MAIN_NAV_ITEMS, findActiveNavItem } from '@/config/navigation';
import { cn } from '@/lib/cn';
import { NavIcon } from './NavIcon';

interface NavLinksProps {
  collapsed?: boolean;
  onNavigate?: () => void;
}

export function NavLinks({ collapsed = false, onNavigate }: NavLinksProps) {
  const pathname = usePathname();
  const active = findActiveNavItem(pathname);

  return (
    <ul className="flex flex-col gap-1">
      {MAIN_NAV_ITEMS.map((item) => {
        const isActive = active?.href === item.href;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={isActive ? 'page' : undefined}
              title={collapsed ? item.title : undefined}
              className={cn(
                'flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm transition-colors',
                isActive
                  ? 'bg-brand-50 font-semibold text-brand-700'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                collapsed && 'justify-center px-0',
              )}
            >
              <NavIcon name={item.iconName} className="size-5 shrink-0" />
              <span className={cn(collapsed && 'sr-only')}>{item.title}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
