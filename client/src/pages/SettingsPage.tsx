import React, { useState } from "react";
import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Volume2,
  Globe,
  HelpCircle,
  ChevronRight,
  Moon,
  Sun,
  Smartphone,
  Mail,
  Lock,
  Eye,
  Download,
  Trash2,
  LogOut,
  ArrowLeft,
} from "lucide-react";

const SettingsPage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentTheme, setCurrentTheme] = useState("ocean");

  const themes = [
    { id: "ocean", name: "Ocean Blue", color: "bg-blue-500" },
    { id: "forest", name: "Forest Green", color: "bg-green-500" },
    { id: "sunset", name: "Sunset Orange", color: "bg-orange-500" },
    { id: "purple", name: "Royal Purple", color: "bg-purple-500" },
  ];

  const SettingItem = ({
    icon: Icon,
    title,
    subtitle,
    rightElement,
    onClick = () => {},
  }: {
    icon: any;
    title: string;
    subtitle?: string;
    rightElement?: React.ReactNode;
    onClick?: () => void;
  }) => (
    <div
      className={`flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all cursor-pointer`}
      onClick={onClick}
    >
      <div className={`flex items-center space-x-4`}>
        <div className={`p-2 bg-indigo-50 rounded-lg`}>
          <Icon className={`w-5 h-5 text-indigo-600`} />
        </div>
        <div>
          <h3 className={`font-medium text-gray-900`}>{title}</h3>
          {subtitle && <p className={`text-sm text-gray-500`}>{subtitle}</p>}
        </div>
      </div>
      {rightElement || <ChevronRight className={`w-5 h-5 text-gray-400`} />}
    </div>
  );

  const ToggleSwitch = ({
    enabled,
    onToggle,
  }: {
    enabled: boolean;
    onToggle: () => void;
  }) => (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? "bg-indigo-600" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50`}
    >
      {/* Header */}
      <div className={`bg-white shadow-sm border-b border-gray-100`}>
        <div className={`max-w-4xl mx-auto px-4 py-6`}>
          <div className={`flex items-center space-x-4`}>
            <button
              className={`p-2 hover:bg-gray-100 rounded-lg transition-colors`}
            >
              <ArrowLeft className={`w-6 h-6 text-gray-600`} />
            </button>
            <div className={`flex items-center space-x-3`}>
              <div className={`p-2 bg-indigo-100 rounded-lg`}>
                <Settings className={`w-6 h-6 text-indigo-600`} />
              </div>
              <div>
                <h1 className={`text-2xl font-bold text-gray-900`}>Settings</h1>
                <p className={`text-gray-500`}>
                  Manage your Elevate experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`max-w-4xl mx-auto px-4 py-8 space-y-8`}>
        {/* Profile Section */}
        <div className={`space-y-4`}>
          <h2 className={`text-lg font-semibold text-gray-900`}>Profile</h2>
          <div className={`space-y-3`}>
            <SettingItem
              icon={User}
              title="Personal Information"
              subtitle="Update your name, age, and grade"
            />
            <SettingItem
              icon={Mail}
              title="Account Settings"
              subtitle="Email, password, and account preferences"
            />
            <SettingItem
              icon={Eye}
              title="Privacy Settings"
              subtitle="Control who can see your progress"
            />
          </div>
        </div>

        {/* Appearance Section */}
        <div className={`space-y-4`}>
          <h2 className={`text-lg font-semibold text-gray-900`}>Appearance</h2>
          <div className={`space-y-3`}>
            <SettingItem
              icon={darkMode ? Moon : Sun}
              title="Dark Mode"
              subtitle="Switch between light and dark themes"
              rightElement={
                <ToggleSwitch
                  enabled={darkMode}
                  onToggle={() => setDarkMode(!darkMode)}
                />
              }
            />
            <div className={`p-4 bg-white rounded-xl border border-gray-100`}>
              <div className={`flex items-center space-x-4 mb-4`}>
                <div className={`p-2 bg-indigo-50 rounded-lg`}>
                  <Palette className={`w-5 h-5 text-indigo-600`} />
                </div>
                <div>
                  <h3 className={`font-medium text-gray-900`}>App Theme</h3>
                  <p className={`text-sm text-gray-500`}>
                    Choose your preferred color scheme
                  </p>
                </div>
              </div>
              <div className={`grid grid-cols-2 gap-3`}>
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setCurrentTheme(theme.id)}
                    className={`flex items-center space-x-3 p-3 rounded-lg border transition-all ${
                      currentTheme === theme.id
                        ? "border-indigo-300 bg-indigo-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full ${theme.color}`} />
                    <span className={`text-sm font-medium`}>{theme.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className={`space-y-4`}>
          <h2 className={`text-lg font-semibold text-gray-900`}>
            Notifications
          </h2>
          <div className={`space-y-3`}>
            <SettingItem
              icon={Bell}
              title="Push Notifications"
              subtitle="Get notified about progress and reminders"
              rightElement={
                <ToggleSwitch
                  enabled={notifications}
                  onToggle={() => setNotifications(!notifications)}
                />
              }
            />
            <SettingItem
              icon={Mail}
              title="Email Notifications"
              subtitle="Weekly progress reports and updates"
            />
            <SettingItem
              icon={Smartphone}
              title="Mobile Alerts"
              subtitle="Study reminders and achievement notifications"
            />
          </div>
        </div>

        {/* Audio & Media Section */}
        <div className={`space-y-4`}>
          <h2 className={`text-lg font-semibold text-gray-900`}>
            Audio & Media
          </h2>
          <div className={`space-y-3`}>
            <SettingItem
              icon={Volume2}
              title="Sound Effects"
              subtitle="Enable sounds for interactions and achievements"
              rightElement={
                <ToggleSwitch
                  enabled={soundEnabled}
                  onToggle={() => setSoundEnabled(!soundEnabled)}
                />
              }
            />
            <SettingItem
              icon={Download}
              title="Offline Content"
              subtitle="Download lessons for offline study"
            />
          </div>
        </div>

        {/* Learning Preferences */}
        <div className={`space-y-4`}>
          <h2 className={`text-lg font-semibold text-gray-900`}>
            Learning Preferences
          </h2>
          <div className={`space-y-3`}>
            <SettingItem
              icon={Globe}
              title="Language"
              subtitle="English (US)"
            />
            <SettingItem
              icon={Settings}
              title="Difficulty Level"
              subtitle="Adjust challenge level for activities"
            />
            <SettingItem
              icon={Bell}
              title="Study Reminders"
              subtitle="Set daily study time notifications"
            />
          </div>
        </div>

        {/* Security Section */}
        <div className={`space-y-4`}>
          <h2 className={`text-lg font-semibold text-gray-900`}>
            Security & Privacy
          </h2>
          <div className={`space-y-3`}>
            <SettingItem
              icon={Lock}
              title="App Lock"
              subtitle="Require authentication to open app"
            />
            <SettingItem
              icon={Shield}
              title="Data & Privacy"
              subtitle="Manage how your data is used"
            />
            <SettingItem
              icon={Download}
              title="Export Data"
              subtitle="Download your learning progress data"
            />
          </div>
        </div>

        {/* Support Section */}
        <div className={`space-y-4`}>
          <h2 className={`text-lg font-semibold text-gray-900`}>
            Support & About
          </h2>
          <div className={`space-y-3`}>
            <SettingItem
              icon={HelpCircle}
              title="Help Center"
              subtitle="Get answers to common questions"
            />
            <SettingItem
              icon={Mail}
              title="Contact Support"
              subtitle="Reach out to our support team"
            />
            <SettingItem
              icon={Settings}
              title="App Version"
              subtitle="Elevate v2.1.0"
            />
          </div>
        </div>

        {/* Danger Zone */}
        <div className={`space-y-4`}>
          <h2 className={`text-lg font-semibold text-red-600`}>
            Account Actions
          </h2>
          <div className={`space-y-3`}>
            <div
              className={`flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100`}
            >
              <div className={`flex items-center space-x-4`}>
                <div className={`p-2 bg-red-100 rounded-lg`}>
                  <Trash2 className={`w-5 h-5 text-red-600`} />
                </div>
                <div>
                  <h3 className={`font-medium text-red-900`}>Reset Progress</h3>
                  <p className={`text-sm text-red-600`}>
                    Clear all learning data and start fresh
                  </p>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 text-red-400`} />
            </div>

            <div
              className={`flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100`}
            >
              <div className={`flex items-center space-x-4`}>
                <div className={`p-2 bg-gray-200 rounded-lg`}>
                  <LogOut className={`w-5 h-5 text-gray-600`} />
                </div>
                <div>
                  <h3 className={`font-medium text-gray-900`}>Sign Out</h3>
                  <p className={`text-sm text-gray-600`}>
                    Sign out of your account
                  </p>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 text-gray-400`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
