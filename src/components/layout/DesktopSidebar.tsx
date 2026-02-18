import { useLocation, useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
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
        <h1 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Brillia<span className="text-purple-600">.</span>
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
                  ? "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-300"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Go Pro Card */}
      <div className="p-4">
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-4 text-white">
          <Sparkles className="w-5 h-5 mb-2" />
          <p className="font-bold text-sm mb-1">Go Pro</p>
          <p className="text-xs text-purple-100 mb-3">
            Get unlimited access to all subjects.
          </p>
          <button className="w-full bg-white text-purple-600 text-xs font-bold py-2 rounded-lg hover:bg-purple-50 transition-colors">
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
}
