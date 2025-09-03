import {
  Bell,
  Clock,
  LogOut,
  Moon,
  Sparkles,
  Star,
  Sun,
  Trees,
  User,
  Waves,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useThemeStore } from "../store/ThemeStore";
import DesktopSidebar from "../components/DesktopSidebar";
import Topbar from "../components/Navbar";
import toast from "react-hot-toast";

type Theme =
  | "light"
  | "dark"
  | "fancy"
  | "solarized"
  | "cyberpunk"
  | "forest"
  | "ocean"
  | "dracula";

const themes = [
  {
    id: "light",
    name: "Light",
    color: "text-gray-800",
    preview: "bg-gradient-to-br from-white to-gray-200",
    icon: Sun,
  },
  {
    id: "dark",
    name: "Dark",
    color: "text-gray-700",
    preview: "bg-gradient-to-br from-gray-800 to-black",
    icon: Moon,
  },
  {
    id: "fancy",
    name: "Fancy",
    color: "text-purple-600",
    preview: "bg-gradient-to-br from-pink-300 to-purple-600",
    icon: Sparkles,
  },
  {
    id: "solarized",
    name: "Solarized",
    color: "text-yellow-700",
    preview: "bg-gradient-to-br from-yellow-100 to-yellow-400",
    icon: Star,
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    color: "text-pink-500",
    preview: "bg-gradient-to-br from-yellow-400 to-pink-600",
    icon: Sparkles,
  },
  {
    id: "forest",
    name: "Forest",
    color: "text-green-700",
    preview: "bg-gradient-to-br from-green-300 to-green-700",
    icon: Trees,
  },
  {
    id: "ocean",
    name: "Ocean",
    color: "text-blue-700",
    preview: "bg-gradient-to-br from-sky-300 to-blue-600",
    icon: Waves,
  },
  {
    id: "dracula",
    name: "Dracula",
    color: "text-pink-600",
    preview: "bg-gradient-to-br from-purple-900 to-black",
    icon: Moon,
  },
];
interface SettingsType {
  theme: string;
  allowNotifications: boolean;
  focusTimer: number;
  profileSettings: ProfileType;
  studyPreferences: string;
}
interface ProfileType {
  name: string;
  passcode: string;
  school: string;
  nickName: string;
}
interface UserTypes {
  age: string;
  grade: string;
  name: string;
  school: string;
  theme: string;
}

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();
  const [selected, setSelected] = useState<any>(theme);
  const [settings, setSettings] = useState<SettingsType>({
    theme: "",
    allowNotifications: false,
    focusTimer: 25,
    studyPreferences: "medium",
    profileSettings: {
      name: "",
      passcode: "",
      school: "",
      nickName: "",
    },
  });
  const [notifications, setNotifications] = useState(true);
  const [focusTime, setFocusTime] = useState(25);
  const [difficulty, setDifficulty] = useState("normal");
  const [userData, setUserData] = useState<UserTypes>([]);

  useEffect(() => {
    const LoadUserData = () => {
      try {
        const rawData = localStorage.getItem("userData");
        const parsed = rawData ? JSON.parse(rawData) : [];
        setUserData(parsed);
      } catch (err) {
        toast.error("Ran into an error", { id: "error" });
        console.error(err);
        window.location.reload();
      }
    };
  }, []);

  return (
    <div className="min-h-screen lg:ml-70  bg-white text-gray-900">
      <DesktopSidebar />
      <Topbar />
      <div className="p-6">
        {/* THEME SETTINGS */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">🎨 App Theme</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 md:gap-4">
            {themes.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setSelected(t.id);
                    setTheme(t.id as Theme);
                  }}
                  className={`flex flex-col items-center justify-center p-2 rounded-2xl shadow-md border-2 transition ${
                    selected === t.id
                      ? "border-blue-500 scale-105"
                      : "border-gray-200 hover:scale-105"
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-xl ${t.preview} mb-2`}
                  ></div>
                  <Icon className={`w-5 h-5 ${t.color}`} />
                  <span className="text-sm mt-1">{t.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* NOTIFICATIONS */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">🔔 Notifications</h2>
          <div className="flex items-center justify-between bg-gray-100 p-4 rounded-2xl">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-blue-500" />
              <span>Study Reminders</span>
            </div>
            <button
              onClick={() => {
                setNotifications(!notifications);
                setSettings((prev) => ({
                  ...prev,
                  allowNotifications: notifications,
                }));
                console.log(settings);
              }}
              className={`px-4 py-1 rounded-full text-sm ${
                notifications
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {notifications ? "On" : "Off"}
            </button>
          </div>
        </section>

        {/* FOCUS TIMER */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">⏱️ Focus Timer</h2>
          <div className="flex items-center justify-between bg-gray-100 p-4 rounded-2xl">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-yellow-500" />
              <span>Default Session</span>
            </div>
            <select
              value={focusTime}
              onChange={(e) => {
                setSettings((prev) => ({
                  ...prev,
                  focusTimer: Number(e.target.value),
                }));
              }}
              className="bg-white border rounded-lg px-3 py-1 text-sm"
            >
              {[15, 25, 30, 45, 60].map((t) => (
                <option key={t} value={t}>
                  {t} min
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* STUDY PREFERENCES */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">📚 Study Preferences</h2>
          <div className="flex items-center justify-between bg-gray-100 p-4 rounded-2xl">
            <span>Difficulty</span>
            <select
              value={difficulty}
              onChange={(e) => {
                setDifficulty(e.target.value);
                setSettings((prev) => ({
                  ...prev,
                  studyPreferences: e.target.value,
                }));
              }}
              className="bg-white border rounded-lg px-3 py-1 text-sm"
            >
              <option value="easy">Easy</option>
              <option value="normal">Normal</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </section>

        {/* ACCOUNT */}
        <section>
          <h2 className="text-lg font-semibold mb-4">👤 Account</h2>
          <div className="flex flex-col gap-3">
            <button className="flex items-center gap-2 p-4 bg-gray-100 rounded-2xl hover:bg-gray-200 transition">
              <User className="w-5 h-5 text-blue-500" />
              <span>Manage Account</span>
            </button>
            <button className="flex items-center gap-2 p-4 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition">
              <LogOut className="w-5 h-5" />
              <span>Log Out</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
