import { Icon } from '@vision/ui';
import type { SidebarItem } from '@vision/ui';

export const hubNav: SidebarItem[] = [
  { key: 'home',          label: 'Ana Sayfa',       href: '/',              icon: <Icon.Home /> },
  { key: 'opportunities', label: 'Fırsatlar',       href: '/opportunities', icon: <Icon.Briefcase /> },
  { key: 'projects',      label: 'Projeler',        href: '/projects',      icon: <Icon.Rocket /> },
  { key: 'applications',  label: 'Başvurular',      href: '/applications',  icon: <Icon.FileText /> },
  { key: 'academy',       label: 'Academy',         href: '/academy',       icon: <Icon.GraduationCap /> },
  { key: 'companies',     label: 'Şirketler',       href: '/companies',     icon: <Icon.Building /> },
  { key: 'universities',  label: 'Üniversiteler',   href: '/universities',  icon: <Icon.School /> },
  { key: 'events',        label: 'Etkinlikler',     href: '/events',        icon: <Icon.Calendar /> },
  { key: 'profile',       label: 'Profil',          href: '/profile',       icon: <Icon.User /> },
];
