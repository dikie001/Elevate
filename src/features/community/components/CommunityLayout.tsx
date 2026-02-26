import { type ReactNode, useState } from "react";
import BottomNav from "@/components/layout/BottomNav";
import CommunitySidebar from "./CommunitySidebar";
import MobileHeader from "@/components/layout/MobileHeader";
import MobileSidebar from "@/components/layout/MobileSidebar";
import { bottomCommunityNavItems } from "../navConfig";

interface CommunityLayoutProps {
  children: ReactNode;
}

export default function CommunityLayout({ children }: CommunityLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header - Only visible on mobile */}
      <MobileHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Mobile Sidebar Overlay */}
      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="lg:pl-64">
        {/* Community Desktop Sidebar - Hidden on mobile */}
        <CommunitySidebar />

        {/* Main Content */}
        <main className="min-h-screen pt-14 pb-20 lg:pt-0 lg:pb-0">
          {children}
        </main>
      </div>

      {/* Bottom Navigation - Only visible on mobile */}
      {/* Note: We could pass community specific items to BottomNav if it supports it, 
          but for now we'll use the default one or a community specialized version if needed later */}
      <BottomNav />
    </div>
  );
}
