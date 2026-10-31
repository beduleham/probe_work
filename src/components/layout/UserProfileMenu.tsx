'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDown, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ROLE_LABELS, useCurrentUser } from '@/hooks/useCurrentUser';

export function UserProfileMenu() {
  const { user } = useCurrentUser();
  const router = useRouter();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger
        className="flex min-h-11 items-center gap-2 rounded-lg px-2 hover:bg-slate-100"
        aria-label="사용자 메뉴"
      >
        <span className="flex size-8 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
          {user.name.slice(0, 1)}
        </span>
        <span className="hidden text-sm font-medium text-slate-800 sm:inline">{user.name}</span>
        <span className="hidden rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-600 sm:inline">
          {ROLE_LABELS[user.role]}
        </span>
        <ChevronDown className="size-4 text-slate-400" aria-hidden="true" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={6}
          className="z-50 min-w-48 rounded-lg border border-slate-200 bg-white p-1 shadow-lg"
        >
          <div className="px-3 py-2">
            <p className="text-sm font-medium text-slate-900">{user.name}</p>
            <p className="text-xs text-slate-500">{user.email}</p>
            <p className="mt-1 inline-block rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-600">
              {ROLE_LABELS[user.role]}
            </p>
          </div>
          <DropdownMenu.Separator className="my-1 h-px bg-slate-200" />
          <DropdownMenu.Item
            onSelect={() => router.push('/login')}
            className="flex min-h-11 cursor-pointer items-center gap-2 rounded px-3 text-sm text-slate-700 outline-none data-highlighted:bg-slate-100"
          >
            <LogOut className="size-4" aria-hidden="true" />
            로그아웃
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
