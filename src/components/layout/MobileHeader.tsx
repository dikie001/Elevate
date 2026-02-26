import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useHook";

interface MobileHeaderProps {
  onMenuClick: () => void;
}

export default function MobileHeader({ onMenuClick }: MobileHeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 rounded-lg hover:bg-accent transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="w-6 h-6 text-foreground" />
        </button>

        <h1 className="text-xl font-black text-foreground">
          Brillia<span className="text-primary">.</span>
        </h1>

        <button
          onClick={toggleTheme}
          className="p-2 -mr-2 rounded-lg hover:bg-accent transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5 text-foreground" />
          ) : (
            <Moon className="w-5 h-5 text-foreground" />
          )}
        </button>
      </div>
    </header>
  );
}
