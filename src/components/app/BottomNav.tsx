import { Home, BookOpen, Trophy, Settings, Brain } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import useSound from "@/hooks/useSound";

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { playSend } = useSound();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: BookOpen, label: "Subjects", path: "/subjects" },
    { icon: Brain, label: "Quiz", path: "/quick-quiz" },
    { icon: Trophy, label: "Results", path: "/results" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const handleNav = (path: string) => {
    playSend();
    navigate(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-800/50 safe-area-bottom">
      <div className="max-w-lg mx-auto px-2">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "text-primary scale-105"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 active:scale-95"
                }`}
              >
                <div className="relative">
                  <Icon
                    className={`w-5 h-5 ${isActive ? "animate-bounce-subtle" : ""}`}
                  />
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                  )}
                </div>
                <span
                  className={`text-[10px] font-medium ${isActive ? "font-semibold" : ""}`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <style>{`
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 1s ease-in-out infinite;
        }
        .safe-area-bottom {
          padding-bottom: env(safe-area-inset-bottom);
        }
      `}</style>
    </nav>
  );
};

export default BottomNav;
