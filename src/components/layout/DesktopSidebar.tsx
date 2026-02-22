import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sparkles, X } from "lucide-react";
import { sidebarNavItems } from "./navConfig";
import useSound from "@/hooks/useSound";

export default function DesktopSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { playSend } = useSound();
  const [showProCard, setShowProCard] = useState(true);

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
      {showProCard && (
        <div className="p-4">
          <div
            className="relative rounded-2xl p-4 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #1a1108 0%, #2d1f06 40%, #1c1508 100%)",
              boxShadow: "0 0 0 1px rgba(212,175,55,0.25), 0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(212,175,55,0.15)",
            }}
          >
            {/* Subtle gold shimmer overlay */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none rounded-2xl"
              style={{
                background:
                  "radial-gradient(ellipse at 20% 20%, rgba(212,175,55,0.5) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(184,134,11,0.3) 0%, transparent 60%)",
              }}
            />

            {/* Dismiss button */}
            <button
              onClick={() => setShowProCard(false)}
              className="absolute top-3 right-3 p-0.5 rounded-md transition-colors z-10"
              style={{ color: "rgba(212,175,55,0.5)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(212,175,55,0.9)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(212,175,55,0.5)")}
              aria-label="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Content */}
            <div className="relative z-10">
              {/* Icon */}
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                style={{
                  background: "linear-gradient(135deg, rgba(212,175,55,0.2), rgba(184,134,11,0.1))",
                  border: "1px solid rgba(212,175,55,0.3)",
                }}
              >
                <Sparkles className="w-4 h-4" style={{ color: "#D4AF37" }} />
              </div>

              {/* Text */}
              <p
                className="font-bold text-sm mb-1 tracking-wide"
                style={{ color: "#F0D060" }}
              >
                Go Pro
              </p>
              <p className="text-xs mb-4 leading-relaxed" style={{ color: "rgba(212,175,55,0.55)" }}>
                Unlock unlimited access to all subjects and premium features.
              </p>

              {/* CTA Button */}
              <button
                className="w-full text-xs font-bold py-2 rounded-lg transition-all tracking-wide"
                style={{
                  background: "linear-gradient(135deg, #C9A227 0%, #F0D060 50%, #B8860B 100%)",
                  color: "#1a1108",
                  boxShadow: "0 2px 12px rgba(212,175,55,0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 4px 20px rgba(212,175,55,0.5), inset 0 1px 0 rgba(255,255,255,0.2)";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    "0 2px 12px rgba(212,175,55,0.3), inset 0 1px 0 rgba(255,255,255,0.2)";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                }}
              >
                Upgrade Now ✦
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}