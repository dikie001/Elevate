import { create } from "zustand";

type Theme = "solar" | "aurora" | "cyberpunk" | "forest" | "classic" | "ocean";

interface ThemeState {
  // THEME
  theme: Theme;
  setTheme: (theme: Theme) => void;
  bgThemeStyles: Record<Theme, string>; // mapping of theme
  textThemeColors: Record<Theme, string>;
  cardThemeStyles: Record<Theme, any>;
  primaryButtonThemeStyles: Record<Theme, any>;
  secondaryButtonThemeStyles: Record<Theme, any>;
  subTextThemeColors: Record<Theme, string>;
}

export const useThemeStore = create<ThemeState>((set) => ({
  // THEME
  theme: "cyberpunk", // default
  setTheme: (theme) => set({ theme }),

  // BG THEME COLORS
  bgThemeStyles: {
    ocean:
      "bg-gradient-to-br from-blue-950 via-blue-900 to-sky-800 text-sky-300",
      light:'bg-white text-black',
    forest:
      "bg-gradient-to-br from-green-950 via-emerald-900 to-lime-800 text-emerald-300",
    solar:
      "bg-gradient-to-br from-amber-900 via-yellow-800 to-orange-700 text-yellow-300",
    aurora:
      "bg-gradient-to-br from-cyan-900 via-teal-800 to-emerald-900 text-teal-300",
    cyberpunk:
      "bg-gradient-to-br from-gray-950 via-fuchsia-800 to-indigo-900 text-lime-400",
    classic:
      "bg-gradient-to-br from-zinc-900 via-neutral-800 to-gray-700 text-zinc-300",
  },

  //TEXT THEME COLORS
  textThemeColors: {
    ocean: "text-sky-300",
    forest: "text-emerald-300",
    solar: "text-yellow-300",
    aurora: "text-teal-300",
    cyberpunk: "text-lime-400",
    classic: "text-zinc-300",
  },

  // SUBTEXT THEME COLORS
  subTextThemeColors: {
    ocean: "text-sky-200",
    forest: "text-emerald-200",
    solar: "text-yellow-200",
    aurora: "text-teal-200",
    cyberpunk: "text-lime-300",
    classic: "text-zinc-400",
  },

  // CARD THEME COLORS
  cardThemeStyles: {
    ocean: {
      base: "bg-blue-900 text-sky-300 shadow-lg",
      hover: "hover:shadow-xl",
      active: "active:scale-95",
      focus: "focus:outline-none focus:ring focus:ring-sky-300/30",
      disabled:
        "bg-blue-800 text-sky-200 shadow-md cursor-not-allowed opacity-70",
    },
    light: {
      base: "bg-white text-black shadow-lg",
      hover: "hover:shadow-xl",
      active: "active:scale-95",
      focus: "focus:outline-none focus:ring focus:ring-gray-300/30",
      disabled:
        "bg-gray-100 text-gray-500 shadow-md cursor-not-allowed opacity-70",
    },
    cards: {
      base: "bg-black text-white shadow-lg",
      hover: "hover:shadow-xl",
      active: "active:scale-95",
      focus: "focus:outline-none focus:ring focus:ring-white/20",
      disabled:
        "bg-gray-900 text-gray-500 shadow-md cursor-not-allowed opacity-70",
    },
    forest: {
      base: "bg-green-950 text-emerald-300 shadow-lg",
      hover: "hover:shadow-xl",
      active: "active:scale-95",
      focus: "focus:outline-none focus:ring focus:ring-emerald-300/30",
      disabled:
        "bg-green-900 text-emerald-200 shadow-md cursor-not-allowed opacity-70",
    },
    solar: {
      base: "bg-amber-900 text-yellow-300 shadow-lg",
      hover: "hover:shadow-xl",
      active: "active:scale-95",
      focus: "focus:outline-none focus:ring focus:ring-yellow-300/30",
      disabled:
        "bg-amber-800 text-yellow-200 shadow-md cursor-not-allowed opacity-70",
    },
    aurora: {
      base: "bg-cyan-950 text-teal-300 shadow-lg",
      hover: "hover:shadow-xl",
      active: "active:scale-95",
      focus: "focus:outline-none focus:ring focus:ring-teal-300/30",
      disabled:
        "bg-cyan-900 text-teal-200 shadow-md cursor-not-allowed opacity-70",
    },
    cyberpunk: {
      base: "bg-gray-950 text-lime-400 border border-fuchsia-600 shadow-fuchsia-800/40 shadow-lg",
      hover: "hover:shadow-xl",
      active: "active:scale-95",
      focus: "focus:outline-none focus:ring focus:ring-lime-300/30",
      disabled:
        "bg-gray-900 text-lime-300 border border-fuchsia-500 shadow-md cursor-not-allowed opacity-70",
    },
    classic: {
      base: "bg-zinc-900 text-zinc-300 shadow-lg",
      hover: "hover:shadow-xl",
      active: "active:scale-95",
      focus: "focus:outline-none focus:ring focus:ring-zinc-300/30",
      disabled:
        "bg-zinc-800 text-zinc-300 shadow-md cursor-not-allowed opacity-70",
    },
  },

  // PRIMARY BUTTON THEME COLORS
  primaryButtonThemeStyles: {
    ocean: {
      base: "bg-blue-950 text-sky-300 border border-sky-500",
      hover: "hover:bg-blue-900",
      active: "active:scale-95",
      focus: "focus:outline-none focus:ring focus:ring-sky-300/30",
      disabled:
        "bg-blue-900 text-sky-200 border border-sky-400 cursor-not-allowed opacity-70",
    },
    light: {
      base: "bg-white text-black border border-gray-300",
      hover: "hover:bg-gray-100",
      active: "active:scale-95",
      focus: "focus:outline-none focus:ring focus:ring-gray-300/30",
      disabled:
        "bg-purple-600 text-gray-510 border border-gray-300 cursor-not-allowed opacity-70",
    },
    
    forest: {
      base: "bg-green-950 text-emerald-300 border border-emerald-500",
      hover: "hover:bg-green-900",
      active: "active:scale-95",
      focus: "focus:outline-none focus:ring focus:ring-emerald-300/30",
      disabled:
        "bg-green-900 text-emerald-200 border border-emerald-400 cursor-not-allowed opacity-70",
    },
    solar: {
      base: "bg-amber-900 text-yellow-300 border border-yellow-500",
      hover: "hover:bg-amber-800",
      active: "active:scale-95",
      focus: "focus:outline-none focus:ring focus:ring-yellow-300/30",
      disabled:
        "bg-amber-800 text-yellow-200 border border-yellow-400 cursor-not-allowed opacity-70",
    },
    aurora: {
      base: "bg-cyan-950 text-teal-300 border border-teal-500",
      hover: "hover:bg-cyan-900",
      active: "active:scale-95",
      focus: "focus:outline-none focus:ring focus:ring-teal-300/30",
      disabled:
        "bg-cyan-900 text-teal-200 border border-teal-400 cursor-not-allowed opacity-70",
    },
    cyberpunk: {
      base: "bg-gray-950 text-lime-400 border border-fuchsia-600",
      hover: "hover:bg-gray-900",
      active: "active:scale-95 active:shadow-[0_0_10px_#f0f]",
      focus: "focus:outline-none focus:ring focus:ring-lime-300/30",
      disabled:
        "bg-gray-900 text-lime-300 border border-fuchsia-500 cursor-not-allowed opacity-70",
    },
    classic: {
      base: "bg-zinc-900 text-zinc-300 border border-zinc-500",
      hover: "hover:bg-zinc-800",
      active: "active:scale-95",
      focus: "focus:outline-none focus:ring focus:ring-zinc-300/30",
      disabled:
        "bg-zinc-800 text-zinc-300 border border-zinc-400 cursor-not-allowed opacity-70",
    },
  },

  // SECONDARY BUTTON THEME COLORS
  secondaryButtonThemeStyles: {
    ocean: {
      base: "bg-blue-800 text-sky-200 border border-sky-400",
      hover: "hover:bg-blue-700",
      active: "active:scale-95",
      focus: "focus:outline-none focus:ring focus:ring-sky-300/30",
      disabled:
        "bg-blue-700 text-sky-300 border border-sky-500 cursor-not-allowed opacity-70",
    },
    light: {
      base: "bg-gray-100 text-black border border-gray-300",
      hover: "hover:bg-gray-200",
      active: "active:scale-95",
      focus: "focus:outline-none focus:ring focus:ring-gray-300/30",
      disabled:
        "bg-gray-50 text-gray-400 border border-gray-200 cursor-not-allowed opacity-70",
    },

    forest: {
      base: "bg-green-800 text-emerald-200 border border-emerald-400",
      hover: "hover:bg-green-700",
      active: "active:scale-95",
      focus: "focus:outline-none focus:ring focus:ring-emerald-300/30",
      disabled:
        "bg-green-700 text-emerald-300 border border-emerald-500 cursor-not-allowed opacity-70",
    },
    solar: {
      base: "bg-amber-800 text-yellow-200 border border-yellow-400",
      hover: "hover:bg-amber-700",
      active: "active:scale-95",
      focus: "focus:outline-none focus:ring focus:ring-yellow-300/30",
      disabled:
        "bg-amber-700 text-yellow-300 border border-yellow-500 cursor-not-allowed opacity-70",
    },
    aurora: {
      base: "bg-cyan-800 text-teal-200 border border-teal-400",
      hover: "hover:bg-cyan-700",
      active: "active:scale-95",
      focus: "focus:outline-none focus:ring focus:ring-teal-300/30",
      disabled:
        "bg-cyan-700 text-teal-300 border border-teal-500 cursor-not-allowed opacity-70",
    },
    cyberpunk: {
      base: "bg-gray-800 text-lime-300 border border-fuchsia-500",
      hover: "hover:bg-gray-700",
      active: "active:scale-95 active:shadow-[0_0_8px_#f0f]",
      focus: "focus:outline-none focus:ring focus:ring-lime-300/30",
      disabled:
        "bg-gray-700 text-lime-200 border border-fuchsia-400 cursor-not-allowed opacity-70",
    },
    classic: {
      base: "bg-zinc-800 text-zinc-400 border border-zinc-500",
      hover: "hover:bg-zinc-700",
      active: "active:scale-95",
      focus: "focus:outline-none focus:ring focus:ring-zinc-300/30",
      disabled:
        "bg-zinc-700 text-zinc-300 border border-zinc-400 cursor-not-allowed opacity-70",
    },
  },
}));
