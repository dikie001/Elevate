import { useLocation, useNavigate, Link } from "react-router-dom";
import { communityNavItems } from "../navConfig";
import useSound from "@/hooks/useSound";
import { ArrowLeft, LogOut } from "lucide-react";

export default function CommunitySidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { playSend } = useSound();

  const isActive = (path: string) => {
    if (path === "/community") return location.pathname === "/community";
    return location.pathname.startsWith(path) && path !== "/community";
  };

  const handleNav = (path: string) => {
    playSend();
    navigate(path);
  };

  return (
    <aside className="hidden lg:flex w-64 flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 fixed top-0 left-0 h-screen">
      {/* Community Header */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-800 mb-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-wider text-[10px]">
            Back to Dashboard
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
            <span className="text-xl">🤝</span>
          </div>
          <div>
            <h1 className="text-lg font-black leading-none">Community</h1>
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tighter mt-1">
              Brillia Network
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {communityNavItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-left group ${
                active
                  ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400"
                  : "text-muted-foreground hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-foreground"
              }`}
            >
              <Icon
                className={`w-5 h-5 flex-shrink-0 transition-colors ${active ? "text-purple-600 dark:text-purple-400" : "group-hover:text-purple-500"}`}
              />
              <span className="text-sm">{item.label}</span>
              {active && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-600 dark:bg-purple-400 shadow-[0_0_8px_rgba(147,51,234,0.5)]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-4 mt-auto">
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-4 border border-gray-100 dark:border-gray-700/50">
          <p className="text-[10px] font-bold text-muted-foreground uppercase mb-2">
            My Stats
          </p>
          <div className="flex justify-between items-end">
            <div>
              <p className="text-lg font-black">2.4k</p>
              <p className="text-[10px] text-muted-foreground">Followers</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-black">128</p>
              <p className="text-[10px] text-muted-foreground">Posts</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
