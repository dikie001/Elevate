import { useLocation, useNavigate } from "react-router-dom";
import { bottomNavItems } from "./navConfig";
import useSound from "@/hooks/useSound";

export default function BottomNav() {
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
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-800/50 safe-area-bottom">
      <div className="flex items-center justify-around py-2 px-2">
        {bottomNavItems.map((item) => {
          const active = isActive(item.path);
          const Icon = item.icon;

          return (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
              className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] py-2 px-3 rounded-xl transition-all ${
                active
                  ? "text-purple-600 dark:text-purple-400"
                  : "text-gray-500 dark:text-gray-400 active:scale-95"
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? "scale-110" : ""}`} />
              <span className={`text-[10px] font-medium ${active ? "font-semibold" : ""}`}>
                {item.label}
              </span>
              {active && (
                <div className="absolute bottom-1.5 w-1 h-1 bg-purple-600 dark:bg-purple-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      <style>{`
        .safe-area-bottom {
          padding-bottom: env(safe-area-inset-bottom);
        }
      `}</style>
    </nav>
  );
}
