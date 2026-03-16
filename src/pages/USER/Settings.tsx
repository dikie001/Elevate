import Sidebar from "@/components/app/Sidebar";
import { BackButton } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ADMIN_PASSWORD } from "@/constants";
import { useTheme } from "@/hooks/useHook";
import useSound from "@/hooks/useSound";
import {
  Bell,
  Edit2,
  Lock,
  Moon,
  RotateCcw,
  ShieldAlert,
  Smartphone,
  Sparkles,
  Sun,
  Trash2,
  Volume2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const { playSend } = useSound();
  const navigate = useNavigate();

  // State
  const [soundsEnabled, setSoundsEnabled] = useState(true);
  const [name, setName] = useState("");
  const [hobby, setHobby] = useState("");
  const [subject, setSubject] = useState("");

  // Admin State
  const [adminPassword, setAdminPassword] = useState("");
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);

  // Edit Dialog State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tempName, setTempName] = useState("");
  const [tempHobby, setTempHobby] = useState("");
  const [tempSubject, setTempSubject] = useState("");

  const PASSWORD = ADMIN_PASSWORD;

  useEffect(() => {
    // Load User Data
    const savedSounds = localStorage.getItem("soundsEnabled") === "true";
    setSoundsEnabled(savedSounds);

    const userInfo = localStorage.getItem("user-info");
    if (userInfo) {
      const parsed = JSON.parse(userInfo);
      setName(parsed.name || "");
      setHobby(parsed.hobby || "");
      setSubject(parsed.subject || "");
    }
  }, []);

  const handleSoundToggle = (checked: boolean) => {
    setSoundsEnabled(checked);
    localStorage.setItem("soundsEnabled", checked.toString());
    if (checked) playSend();
    toast.success(`Sounds ${checked ? "enabled" : "muted"}`);
  };

  const handleSaveProfile = () => {
    playSend();
    const newData = { name: tempName, hobby: tempHobby, subject: tempSubject };
    localStorage.setItem("user-info", JSON.stringify(newData));
    setName(tempName);
    setHobby(tempHobby);
    setSubject(tempSubject);
    setIsDialogOpen(false);
    toast.success("Profile updated successfully");
  };

  const handleAdminUnlock = () => {
    playSend();
    if (adminPassword === PASSWORD) {
      setIsAdminUnlocked(true);
      toast.success("Admin access granted");
      setAdminPassword("");
    } else {
      toast.error("Incorrect password");
    }
  };

  const handleResetToDefaults = () => {
    playSend();
    setSoundsEnabled(true);
    localStorage.setItem("soundsEnabled", "true");
    toast.success("Settings reset to default");
  };

  const handleClearAllData = () => {
    if (
      window.confirm("Are you absolutely sure? This will wipe all progress.")
    ) {
      playSend();
      localStorage.clear();
      setSoundsEnabled(true);
      setName("");
      setHobby("");
      setSubject("");
      setIsAdminUnlocked(false);
      toast.success("System wiped clean");
      navigate("/");
    }
  };

  return (
    <Sidebar>
      <div className="min-h-screen bg-background pb-24 lg:pb-8 transition-colors duration-500 overflow-hidden">
        <Toaster richColors position="top-center" />

        <header className="sticky top-0 z-40 glass !bg-background/40 backdrop-blur-2xl border-b border-border transition-all duration-500">
          <div className="max-w-7xl mx-auto px-5 lg:px-8 py-6 flex items-center gap-4">
            <BackButton />
            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary border border-primary/20 shadow-inner">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl lg:text-3xl font-black tracking-tight text-foreground">
                Settings
              </h1>
              <p className="text-xs font-bold text-primary/70 uppercase tracking-widest mt-0.5">
                Personalization Hub
              </p>
            </div>
          </div>
        </header>

        {/* Background Decor */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px]" />
        </div>

        <main className="relative max-w-5xl mx-auto px-5 lg:px-8 py-10 z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* LEFT COLUMN: Profile Card */}
            <div className="lg:col-span-4 space-y-8">
              <Card className="rounded-[2.5rem] border-border/50 shadow-2xl overflow-hidden glass transition-all duration-500">
                {/* Artistic Header */}
                <div className="h-32 relative overflow-hidden">
                  <div className="absolute inset-0 mesh-gradient opacity-80" />
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
                </div>

                <CardContent className="px-8 pb-10 relative">
                  {/* Avatar */}
                  <div className="relative -mt-14 mb-6 flex justify-between items-end">
                    <div className="h-28 w-28 rounded-[2rem] border-4 border-background bg-card shadow-2xl overflow-hidden p-1 transition-transform hover:scale-105 duration-500">
                      <img
                        src="/images/icon.png"
                        alt="User"
                        className="w-full h-full object-cover rounded-[1.75rem]"
                      />
                    </div>
                    <Button
                      size="icon"
                      variant="secondary"
                      className="rounded-2xl w-12 h-12 glass shadow-xl hover:bg-primary/20 transition-all active:scale-90"
                      onClick={() => navigate("/edit-profile")}
                    >
                      <Edit2 className="w-5 h-5 text-primary" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-3xl font-black text-foreground tracking-tight leading-none">
                      {name || "Guest User"}
                    </h2>
                    <p className="text-muted-foreground font-black text-xs flex items-center gap-2 uppercase tracking-widest bg-primary/5 w-fit px-3 py-1 rounded-full border border-primary/5">
                      <Sparkles className="w-3 h-3 text-primary" />
                      {hobby || "Explorer"}
                    </p>
                  </div>

                  <div className="mt-8">
                    {subject ? (
                      <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-primary/10 text-primary border border-primary/10 shadow-sm w-fit">
                        <Badge
                          variant="secondary"
                          className="bg-transparent text-primary p-0 border-0 text-sm font-black uppercase tracking-tight"
                        >
                          {subject}
                        </Badge>
                      </div>
                    ) : (
                      <Badge
                        variant="outline"
                        className="rounded-xl opacity-30 border-dashed border-2 py-2 px-4"
                      >
                        No Subject Selected
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* App Info Widget */}
              <div className="glass rounded-3xl p-6 flex items-center justify-between border border-border shadow-lg transition-transform hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/10">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-black text-foreground tracking-tight">
                      Version
                    </p>
                    <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest">
                      v1.2.0 Production
                    </p>
                  </div>
                </div>
                <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              </div>
            </div>

            {/* RIGHT COLUMN: Settings List */}
            <div className="lg:col-span-8 space-y-8">
              {/* Preferences Group */}
              <Card className="rounded-[2.5rem] border-border/50 shadow-xl glass overflow-hidden">
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-2xl font-black tracking-tight flex items-center gap-3">
                    Preferences
                  </CardTitle>
                  <CardDescription className="text-sm font-medium">
                    Customize your experience across the platform.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-4 space-y-8">
                  {/* Theme Row */}
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-5">
                      <div className="p-4 rounded-2xl bg-primary/10 text-primary border border-primary/10 transition-transform group-hover:rotate-12 duration-300">
                        {theme === "light" ? (
                          <Sun className="w-6 h-6" />
                        ) : (
                          <Moon className="w-6 h-6" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <Label className="text-lg font-black tracking-tight">
                          Appearance
                        </Label>
                        <p className="text-xs text-muted-foreground font-black uppercase tracking-widest">
                          {theme === "light" ? "Light Mode" : "Dark Mode"}{" "}
                          enabled
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => {
                        playSend();
                        toggleTheme();
                      }}
                      className="rounded-2xl border-border/50 hover:bg-primary/10 hover:border-primary/50 font-black uppercase tracking-widest h-12 px-6 text-xs transition-all active:scale-95"
                    >
                      Change Theme
                    </Button>
                  </div>

                  <Separator className="bg-border/30" />

                  {/* Sound Row */}
                  <div className="flex items-center justify-between group">
                    <div className="flex items-center gap-5">
                      <div
                        className={`p-4 rounded-2xl transition-all duration-300 group-hover:scale-110 ${soundsEnabled ? "bg-primary/10 text-primary border border-primary/10" : "bg-muted text-muted-foreground"}`}
                      >
                        <Volume2 className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <Label
                          htmlFor="sound-mode"
                          className="text-lg font-black tracking-tight"
                        >
                          Sound Effects
                        </Label>
                        <p className="text-xs text-muted-foreground font-black uppercase tracking-widest">
                          Haptic UI Feedback
                        </p>
                      </div>
                    </div>
                    <Switch
                      id="sound-mode"
                      checked={soundsEnabled}
                      onCheckedChange={handleSoundToggle}
                      className="data-[state=checked]:bg-primary h-7 w-12"
                    />
                  </div>

                  <Separator className="bg-border/30" />

                  {/* Notifications (Dummy) */}
                  <div className="flex items-center justify-between opacity-40 group grayscale hover:grayscale-0 transition-all duration-500">
                    <div className="flex items-center gap-5">
                      <div className="p-4 rounded-2xl bg-muted text-muted-foreground">
                        <Bell className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-lg font-black tracking-tight">
                          Email Alerts
                        </Label>
                        <p className="text-xs text-muted-foreground font-black uppercase tracking-widest">
                          Feature Coming Soon
                        </p>
                      </div>
                    </div>
                    <div className="w-12 h-7 bg-muted rounded-full cursor-not-allowed" />
                  </div>
                </CardContent>
              </Card>

              {/* Danger Zone */}
              <Card
                className={`rounded-[2.5rem] border-2 shadow-2xl transition-all duration-500 relative overflow-hidden ${isAdminUnlocked ? "border-destructive bg-destructive/5" : "border-dashed border-border glass"}`}
              >
                {isAdminUnlocked && (
                  <div className="absolute inset-0 bg-destructive/5 animate-pulse" />
                )}

                <CardHeader className="p-8 pb-4 relative z-10">
                  <CardTitle
                    className={`text-xl font-black tracking-tight flex items-center gap-3 ${isAdminUnlocked ? "text-destructive" : "text-muted-foreground/60"}`}
                  >
                    {isAdminUnlocked ? (
                      <ShieldAlert className="w-6 h-6 animate-bounce" />
                    ) : (
                      <Lock className="w-6 h-6" />
                    )}
                    {isAdminUnlocked
                      ? "Critical Controls Active"
                      : "Restricted Access"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-4 relative z-10">
                  {!isAdminUnlocked ? (
                    <div className="flex flex-col sm:flex-row gap-4 items-center mt-2">
                      <div className="relative flex-1 w-full group">
                        <Input
                          type="password"
                          placeholder="Admin Passcode..."
                          className="rounded-2xl pl-12 h-14 bg-background/50 border-border group-hover:border-primary/30 transition-all font-black tracking-widest"
                          value={adminPassword}
                          onChange={(e) => setAdminPassword(e.target.value)}
                          onKeyDown={(e) =>
                            e.key === "Enter" && handleAdminUnlock()
                          }
                        />
                        <Lock className="w-5 h-5 absolute left-4 top-[18px] text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <Button
                        onClick={handleAdminUnlock}
                        className="w-full sm:w-auto rounded-2xl h-14 px-8 font-black uppercase tracking-widest active:scale-95 transition-all shadow-xl"
                      >
                        Unlock
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                      <Button
                        variant="outline"
                        onClick={handleResetToDefaults}
                        className="h-auto py-6 justify-start px-6 rounded-2xl border-border/50 hover:bg-background/80 hover:shadow-xl transition-all active:scale-[0.98]"
                      >
                        <div className="p-3 bg-muted rounded-xl mr-5">
                          <RotateCcw className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div className="text-left">
                          <span className="block font-black text-foreground tracking-tight">
                            Restore Defaults
                          </span>
                          <span className="block text-xs text-muted-foreground font-black uppercase tracking-widest mt-1">
                            Reset UI State
                          </span>
                        </div>
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={handleClearAllData}
                        className="h-auto py-6 justify-start px-6 rounded-2xl shadow-xl transition-all active:scale-[0.98] group"
                      >
                        <div className="p-3 bg-white/10 rounded-xl mr-5 group-hover:bg-white/20 transition-colors">
                          <Trash2 className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-left">
                          <span className="block font-black text-white tracking-tight">
                            System Wipe
                          </span>
                          <span className="block text-xs text-white/70 font-black uppercase tracking-widest mt-1">
                            Clear Memory
                          </span>
                        </div>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        {/* Internal Dialog for Editing Profile - Ensures no import errors */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px] rounded-3xl bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-900">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                Edit Profile
              </DialogTitle>
              <DialogDescription>
                Make changes to your public profile here.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-slate-500">
                  Display Name
                </Label>
                <Input
                  id="name"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="rounded-xl border-slate-200 dark:border-slate-800 focus-visible:ring-indigo-500"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="hobby" className="text-slate-500">
                  Hobby / Tagline
                </Label>
                <Input
                  id="hobby"
                  value={tempHobby}
                  onChange={(e) => setTempHobby(e.target.value)}
                  className="rounded-xl border-slate-200 dark:border-slate-800 focus-visible:ring-indigo-500"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subject" className="text-slate-500">
                  Favorite Subject
                </Label>
                <Input
                  id="subject"
                  value={tempSubject}
                  onChange={(e) => setTempSubject(e.target.value)}
                  className="rounded-xl border-slate-200 dark:border-slate-800 focus-visible:ring-indigo-500"
                  placeholder="e.g. Math, Science"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="rounded-xl"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveProfile}
                className="rounded-xl bg-purple-600 hover:bg-purple-700 text-white"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Sidebar>
  );
}
