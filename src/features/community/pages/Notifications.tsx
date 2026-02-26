import {
  Bell,
  Heart,
  MessageCircle,
  UserPlus,
  Star,
  ChevronRight,
} from "lucide-react";
import CommunityLayout from "../components/CommunityLayout";

const NOTIFICATIONS = [
  {
    id: 1,
    type: "like",
    user: "Sarah Jenkins",
    content: "liked your post about Quantum Computing",
    time: "2m ago",
    read: false,
    icon: <Heart className="w-4 h-4 text-red-500" />,
    iconBg: "bg-red-500/10",
  },
  {
    id: 2,
    type: "comment",
    user: "Alex Rivera",
    content: "commented: 'This is exactly what I was looking for!'",
    time: "15m ago",
    read: false,
    icon: <MessageCircle className="w-4 h-4 text-blue-500" />,
    iconBg: "bg-blue-500/10",
  },
  {
    id: 3,
    type: "follow",
    user: "Brillia AI",
    content: "started following you",
    time: "1h ago",
    read: true,
    icon: <UserPlus className="w-4 h-4 text-purple-500" />,
    iconBg: "bg-purple-500/10",
  },
  {
    id: 4,
    type: "mention",
    user: "Physics Study Group",
    content: "mentioned you in a new discussion",
    time: "3h ago",
    read: true,
    icon: <Star className="w-4 h-4 text-amber-500" />,
    iconBg: "bg-amber-500/10",
  },
];

export default function Notifications() {
  return (
    <CommunityLayout>
      <div className="min-h-screen bg-muted/30 dark:bg-zinc-950/20 transition-colors duration-500 pb-20 lg:pb-10">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <header className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
                <Bell className="w-8 h-8 text-primary" />
                Notifications
              </h1>
              <p className="text-muted-foreground">
                Keep track of your community engagement
              </p>
            </div>
            <button className="text-xs font-black uppercase tracking-widest text-primary hover:underline">
              Mark all as read
            </button>
          </header>

          <div className="space-y-3">
            {NOTIFICATIONS.map((notification) => (
              <div
                key={notification.id}
                className={`group p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center gap-4 ${
                  notification.read
                    ? "bg-card border-border hover:border-primary/30"
                    : "bg-primary/5 border-primary/20 hover:border-primary shadow-sm"
                }`}
              >
                <div
                  className={`w-12 h-12 flex-shrink-0 rounded-xl ${notification.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  {notification.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-tight">
                    <span className="font-black">{notification.user}</span>{" "}
                    <span className="text-muted-foreground">
                      {notification.content}
                    </span>
                  </p>
                  <p className="text-[10px] font-bold text-primary/60 uppercase tracking-tighter mt-1">
                    {notification.time}
                  </p>
                </div>

                {!notification.read && (
                  <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]" />
                )}

                <ChevronRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-border flex flex-col items-center">
            <p className="text-muted-foreground text-sm mb-4">
              No more notifications to show
            </p>
            <button className="px-8 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-xl font-bold transition-colors">
              Load Older
            </button>
          </div>
        </div>
      </div>
    </CommunityLayout>
  );
}
