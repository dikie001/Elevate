import {
  Rss,
  Compass,
  User,
  Users,
  Bell,
  ArrowLeft,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface CommunityNavItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

export const communityNavItems: CommunityNavItem[] = [
  { icon: Rss, label: "Feed", path: "/community" },
  { icon: Compass, label: "Explore", path: "/community/explore" },
  { icon: Users, label: "My Classes", path: "/community/classes" },
  { icon: Bell, label: "Notifications", path: "/community/notifications" },
  { icon: User, label: "My Profile", path: "/community/profile/me" },
];

export const bottomCommunityNavItems: CommunityNavItem[] = [
  { icon: Rss, label: "Feed", path: "/community" },
  { icon: Compass, label: "Explore", path: "/community/explore" },
  { icon: Bell, label: "Alerts", path: "/community/notifications" },
  { icon: User, label: "Profile", path: "/community/profile/me" },
];
