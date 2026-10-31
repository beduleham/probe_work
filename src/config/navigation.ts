import type { NavItemConfig } from '@/types/navigation';

export const MAIN_NAV_ITEMS: NavItemConfig[] = [
  { title: '자원 캘린더', href: '/calendar', iconName: 'calendar' },
  { title: '학교 이력 관리', href: '/schools', iconName: 'school' },
  { title: '교육 계획안', href: '/plans', iconName: 'file-text' },
  { title: '교구·차량 자원', href: '/resources', iconName: 'box' },
];

/** 현재 경로에 해당하는 네비게이션 항목을 찾는다 (하위 경로 포함). */
export function findActiveNavItem(pathname: string | null): NavItemConfig | undefined {
  if (!pathname) return undefined;
  return MAIN_NAV_ITEMS.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );
}
