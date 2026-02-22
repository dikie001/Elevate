import { type ReactNode, useState } from "react";
import BottomNav from "./BottomNav";
import DesktopSidebar from "./DesktopSidebar";
import MobileHeader from "./MobileHeader";
import MobileSidebar from "./MobileSidebar";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Mobile Header - Only visible on mobile */}
      <MobileHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Mobile Sidebar Overlay */}
      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="lg:pl-64">
        {/* Desktop Sidebar - Hidden on mobile */}
        <DesktopSidebar />

        {/* Main Content */}
        <main className="min-h-screen pt-14 pb-20 lg:pt-0 lg:pb-0">
          {children}
        </main>
      </div>

      {/* Bottom Navigation - Only visible on mobile */}
      <BottomNav />
    </div>
  );
}
