import type { ReactNode } from 'react';
import { Sidebar, type SidebarItem } from './sidebar';
import { TopBar } from './top-bar';

interface AppShellProps {
  sidebarItems: SidebarItem[];
  activeKey: string;
  userName?: string;
  userEmail?: string;
  children: ReactNode;
}

export function AppShell({
  sidebarItems,
  activeKey,
  userName,
  userEmail,
  children,
}: AppShellProps) {
  return (
    <div className="min-h-screen flex bg-canvas text-fg">
      <Sidebar items={sidebarItems} activeKey={activeKey} />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar userName={userName} userEmail={userEmail} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
