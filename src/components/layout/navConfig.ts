import {
  LayoutDashboard,
  BookOpen,
  Brain,
  Users,
  Trophy,
  Settings,
  Home,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

// Desktop sidebar navigation
export const sidebarNavItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: BookOpen, label: "Subjects", path: "/subjects" },
  { icon: Brain, label: "Quick Quiz", path: "/quick-quiz" },
  { icon: Users, label: "Community", path: "/community" },
  { icon: Trophy, label: "Results", path: "/results" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

// Mobile bottom navigation (simplified)
export const bottomNavItems: NavItem[] = [
  { icon: Home, label: "Home", path: "/" },
  { icon: BookOpen, label: "Subjects", path: "/subjects" },
  { icon: Users, label: "Community", path: "/community" },
  { icon: Brain, label: "Quiz", path: "/quick-quiz" },
  { icon: Trophy, label: "Results", path: "/results" },
];
