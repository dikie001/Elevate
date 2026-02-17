import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  BookOpen,
  Brain,
  Trophy,
  Settings,
  Menu,
  X,
  Moon,
  Sun,
  Sparkles,
  LayoutDashboard,
} from "lucide-react";
import { useTheme } from "@/hooks/useHook";
import useSound from "@/hooks/useSound";

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar = ({ children }: SidebarProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { playSend } = useSound();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: BookOpen, label: "Subjects", path: "/subjects" },
    { icon: Brain, label: "Quick Quiz", path: "/quick-quiz" },
    { icon: Trophy, label: "Results", path: "/results" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  const handleNav = (path: string) => {
    playSend();
    navigate(path);
    setIsSidebarOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50">
        <div className="flex items-center justify-between px-5 py-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isSidebarOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
          <h1 className="text-xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Brillia<span className="text-purple-600">.</span>
          </h1>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 sticky top-0 h-screen overflow-y-auto">
        {/* Logo/Branding */}
        <div className="p-6">
          <h1 className="text-2xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Brillia<span className="text-purple-600">.</span>
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                  active
                    ? "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-300"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Go Pro Card */}
        <div className="p-4 mt-auto">
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

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`lg:hidden fixed left-0 top-0 h-screen w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-50 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Brillia<span className="text-purple-600">.</span>
            </h1>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => handleNav(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                    active
                      ? "bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-300"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Go Pro Card */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
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

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">{children}</main>
    </div>
  );
};

export default Sidebar;
