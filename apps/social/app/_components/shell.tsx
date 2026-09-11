import type { ReactNode } from 'react';
import { HoverSidebar } from './hover-sidebar';

/**
 * Social kabuğu. Ana içerik solda 68px offset ile başlar (sidebar kapalı hâli),
 * hover'da sidebar açılır ama içerik yerini değiştirmez (overlay davranışı).
 */
export function SocialShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-canvas text-fg">
      <HoverSidebar />
      <div className="pl-[68px]">{children}</div>
    </div>
  );
}
