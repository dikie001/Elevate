import { useLocation, useNavigate } from "react-router-dom";
import { sidebarNavItems } from "./navConfig";
import useSound from "@/hooks/useSound";

export default function DesktopSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { playSend } = useSound();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const handleNav = (path: string) => {
    playSend();
    navigate(path);
  };

  return (
    <aside className="hidden lg:flex w-64 flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 fixed top-0 left-0 h-screen">
      {/* Logo */}
      <div className="p-6">
        <h1 className="text-2xl font-black text-foreground">
          Brillia<span className="text-primary">.</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {sidebarNavItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-left ${
                active
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
