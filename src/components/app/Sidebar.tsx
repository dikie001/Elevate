import { AppLayout } from "@/components/layout";

interface SidebarProps {
  children: React.ReactNode;
}

/**
 * @deprecated Use AppLayout from @/components/layout instead
 * This component is kept for backwards compatibility
 */
const Sidebar = ({ children }: SidebarProps) => {
  return <AppLayout>{children}</AppLayout>;
};

export default Sidebar;
