import { Boxes, Calendar, FileText, GraduationCap, type LucideIcon } from 'lucide-react';
import type { NavItemConfig } from '@/types/navigation';

const ICONS: Record<NavItemConfig['iconName'], LucideIcon> = {
  calendar: Calendar,
  school: GraduationCap,
  'file-text': FileText,
  box: Boxes,
};

export function NavIcon({ name, className }: { name: NavItemConfig['iconName']; className?: string }) {
  const Icon = ICONS[name];
  return <Icon className={className} aria-hidden="true" />;
}
