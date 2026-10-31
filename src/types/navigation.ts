export type NavRoutePath = '/calendar' | '/schools' | '/plans' | '/resources';

export interface NavItemConfig {
  title: string;
  href: NavRoutePath;
  iconName: 'calendar' | 'school' | 'file-text' | 'box';
  badgeKey?: 'pendingConsultations' | 'lowResources';
}

export interface UserSessionContext {
  id: string;
  email: string;
  name: string;
  role: 'STAFF' | 'ADMIN';
  avatarUrl?: string;
}
