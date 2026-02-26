import { useState, useRef, useEffect } from "react";
import { Heart, ThumbsUp, Lightbulb, Ghost, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const REACTIONS = [
  {
    type: "like",
    icon: ThumbsUp,
    color: "text-blue-500",
    label: "Like",
    emoji: "👍",
  },
  {
    type: "love",
    icon: Heart,
    color: "text-red-500",
    label: "Love",
    emoji: "❤️",
  },
  {
    type: "insightful",
    icon: Lightbulb,
    color: "text-amber-500",
    label: "Insightful",
    emoji: "💡",
  },
  {
    type: "help",
    icon: MessageSquare,
    color: "text-purple-500",
    label: "Help",
    emoji: "🙋",
  },
  {
    type: "sad",
    icon: Ghost,
    color: "text-gray-500",
    label: "Sad",
    emoji: "😢",
  },
];

interface ReactionButtonProps {
  currentReaction?: string;
  onReact: (type: string) => void;
  isLiked?: boolean; // legacy support for simple likes
}

export default function ReactionButton({
  currentReaction,
  onReact,
  isLiked,
}: ReactionButtonProps) {
  const [showMenu, setShowMenu] = useState(false);
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeReaction =
    REACTIONS.find((r) => r.type === currentReaction) ||
    (isLiked ? REACTIONS[0] : null);

  const handleMouseEnter = () => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    menuTimeoutRef.current = setTimeout(() => setShowMenu(true), 400);
  };

  const handleMouseLeave = () => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    menuTimeoutRef.current = setTimeout(() => setShowMenu(false), 500);
  };

  useEffect(() => {
    return () => {
      if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    };
  }, []);

  return (
    <div
      className="relative flex-1"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() =>
          onReact(activeReaction?.type === "like" && isLiked ? "like" : "like")
        }
        className={`w-full flex items-center justify-center gap-2 py-2 rounded-md transition-colors ${
          activeReaction
            ? activeReaction.color + " bg-accent/20"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        }`}
      >
        {activeReaction ? (
          <>
            <activeReaction.icon
              className={`h-5 w-5 ${activeReaction.type === "love" || activeReaction.type === "like" ? "fill-current" : ""}`}
            />
            <span className="text-sm font-semibold">
              {activeReaction.label}
            </span>
          </>
        ) : (
          <>
            <ThumbsUp className="h-5 w-5" />
            <span className="text-sm font-semibold">Like</span>
          </>
        )}
      </button>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="absolute bottom-full left-0 mb-2 p-1 bg-card border border-border rounded-full shadow-xl flex items-center gap-1 z-50 sticky-nav"
            onMouseEnter={() => {
              if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
            }}
          >
            {REACTIONS.map((reaction, index) => (
              <motion.button
                key={reaction.type}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.3 }}
                onClick={() => {
                  onReact(reaction.type);
                  setShowMenu(false);
                }}
                className={`p-2 rounded-full hover:bg-muted transition-colors flex flex-col items-center group relative`}
                title={reaction.label}
              >
                <span className="text-2xl mb-1">{reaction.emoji}</span>
                <span className="absolute -top-8 px-2 py-1 bg-foreground text-background text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-bold">
                  {reaction.label}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
