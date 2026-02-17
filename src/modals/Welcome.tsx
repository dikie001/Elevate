import { trackDailyLogin } from "@/lib/trackDailyLogin";
import { saveUserDetails } from "@/utils/firebaseFunctions";
import {
  User,
  Hash,
  Lock,
  Loader2,
  ArrowRight,
  ChevronLeft,
  Eye,
  EyeOff,
  ChevronDown,
  Sparkles,
  LogIn,
  UserPlus,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";

// Shadcn Imports
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle, // Kept import, though removed from body usage
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

export interface LearnerInfo {
  id: string;
  name: string;
  grade: string;
  username: string;
  pin: string;
  loginCount: number;
}

interface MainProps {
  onClose: () => void;
}

const USER = "user-info";

// Animation utility classes
const FADE_IN = "animate-in fade-in zoom-in-95 duration-500 ease-out";
const SLIDE_UP =
  "animate-in slide-in-from-bottom-8 fade-in duration-700 ease-out";

const LearnerModal = ({ onClose }: MainProps) => {
  // Views: 'welcome' | 'login' | 'register-1' | 'register-2' | 'success'
  const [view, setView] = useState<string>("welcome");
  const [loading, setLoading] = useState(false);
  const [showPin, setShowPin] = useState(false);

  // Registration Data
  const [formData, setFormData] = useState<LearnerInfo>({
    id: uuid(),
    name: "",
    grade: "",
    username: "",
    pin: "",
    loginCount: 1,
  });

  // Login Data
  const [loginData, setLoginData] = useState({ username: "", pin: "" });

  // Auto-generate username for registration
  useEffect(() => {
    if (view === "register-1" && formData.name.length > 2) {
      const cleanName = formData.name
        .split(" ")[0]
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");
      const randomSuffix = Math.floor(Math.random() * 900) + 100;
      setFormData((prev) => ({
        ...prev,
        username: `${cleanName}${randomSuffix}`,
      }));
    }
  }, [formData.name, view]);

  const handleInputChange = (field: keyof LearnerInfo, value: string) => {
    if (field === "pin") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 4) return;
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLoginChange = (field: "username" | "pin", value: string) => {
    if (field === "pin") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 4) return;
    }
    setLoginData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || formData.name.length < 3)
      return toast.error("Enter your real name");
    if (!formData.grade) return toast.error("Select your Grade");
    setView("register-2");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.pin.length !== 4)
      return toast.error("PIN must be exactly 4 digits");

    setLoading(true);
    try {
      localStorage.setItem(USER, JSON.stringify(formData));
      localStorage.setItem("first-time", "false");

      // Simulating async save
      await saveUserDetails(formData);
      await trackDailyLogin(formData.id);

      setTimeout(() => {
        setLoading(false);
        setView("success");
      }, 1000);
    } catch (err) {
      setLoading(false);
      toast.error("Setup failed. Try again.");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.username || loginData.pin.length !== 4)
      return toast.error("Invalid credentials");

    setLoading(true);
    try {
      // NOTE: In a real app, you would verify against DB here.
      // For now, we simulate a successful login if fields are filled.

      const mockUser = { ...formData, ...loginData, id: "returning-user" }; // Mock
      localStorage.setItem(USER, JSON.stringify(mockUser));
      trackDailyLogin(mockUser.id);

      setTimeout(() => {
        setLoading(false);
        setView("success");
      }, 1000);
    } catch (err) {
      setLoading(false);
      toast.error("Login failed.");
    }
  };

  const handleClose = () => {
    onClose();
  };

  const grades = {
    jss: ["Grade 7", "Grade 8", "Grade 9"],
    sss: ["Grade 10", "Grade 11", "Grade 12"],
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <Card
        className={`w-full max-w-md border shadow-2xl overflow-hidden transition-all duration-500 rounded-3xl ${view === "success" ? "scale-105 border-primary/50" : ""}`}
      >
        {/* Header - Only show on non-success/non-welcome pages for navigation */}
        {view !== "welcome" && view !== "success" && (
          <div className="bg-muted/30 p-5 -mt-6 flex items-center gap-3 border-b">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                if (view === "register-2") setView("register-1");
                else setView("welcome");
              }}
              className="h-10 w-10 rounded-full hover:bg-background"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-lg font-semibold tracking-tight">
              {view === "register-1" && "About You"}
              {view === "register-2" && "Create Login"}
              {view === "login" && "Welcome Back"}
            </h1>
          </div>
        )}

        <div className="p-6">
          {/* VIEW: WELCOME */}
          {view === "welcome" && (
            <div className={`space-y-8 py-4 text-center ${FADE_IN}`}>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
                  <img
                    src="/images/logo.png"
                    alt="Brillia"
                    className="w-20 h-20 object-contain relative z-10 duration-3000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight">
                  Welcome to Brillia
                </h2>
                <p className="text-muted-foreground">
                  Are you a new explorer or returning hero?
                </p>
              </div>

              <div className="grid gap-4">
                <Button
                  size="lg"
                  onClick={() => setView("register-1")}
                  className="w-full h-14 text-lg font-semibold group relative overflow-hidden rounded-2xl"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <UserPlus className="mr-2 h-5 w-5" />
                  I'm New Here
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setView("login")}
                  className="w-full h-14 text-lg hover:bg-accent/50 group rounded-2xl"
                >
                  <LogIn className="mr-2 h-5 w-5 group-hover:text-primary transition-colors" />
                  I Have an Account
                </Button>
              </div>
            </div>
          )}

          {/* VIEW: REGISTER STEP 1 */}
          {view === "register-1" && (
            <div className={SLIDE_UP}>
              <CardHeader className="px-0 pt-0 -mt-8">
                <CardDescription >
                  Let's personalize your learning journey.
                </CardDescription>
              </CardHeader>
              <form onSubmit={validateStep1} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-4 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="name"
                      autoFocus
                      placeholder="e.g. Kamau Juma"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="pl-9 h-12 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Grade Level</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-between h-12 px-3 rounded-xl ${!formData.grade && "text-muted-foreground"}`}
                      >
                        {formData.grade || "Select Grade"}
                        <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-[300px] rounded-xl">
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>Junior Secondary</DropdownMenuLabel>
                        {grades.jss.map((g) => (
                          <DropdownMenuItem
                            key={g}
                            onClick={() => handleInputChange("grade", g)}
                            className="rounded-lg cursor-pointer"
                          >
                            {g}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuLabel>Senior Secondary</DropdownMenuLabel>
                        {grades.sss.map((g) => (
                          <DropdownMenuItem
                            key={g}
                            onClick={() => handleInputChange("grade", g)}
                            className="rounded-lg cursor-pointer"
                          >
                            {g}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full mt-4 group rounded-xl h-14 text-lg"
                >
                  Continue{" "}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>
          )}

          {/* VIEW: REGISTER STEP 2 */}
          {view === "register-2" && (
            <div className={SLIDE_UP}>
              <CardHeader className="px-0 pt-0 -mt-8">
                <CardDescription>
                  Secure your account
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleRegister} className="space-y-6">
                <div className="space-y-2">
                  <Label>Username </Label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-4 w-4 h-4 text-emerald-500" />
                    <Input
                      value={formData.username}
                      onChange={(e) =>
                        handleInputChange("username", e.target.value)
                      }
                      className="pl-9 h-12 border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="pin">Create 4-Digit PIN</Label>
                    <span className="text-xs text-primary font-medium">
                      Required for Login
                    </span>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-4 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="pin"
                      type={showPin ? "text" : "password"}
                      inputMode="numeric"
                      maxLength={4}
                      placeholder="****"
                      value={formData.pin}
                      onChange={(e) => handleInputChange("pin", e.target.value)}
                      className="pl-9 pr-10 font-mono text-lg tracking-[0.5em] h-12 rounded-xl"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowPin(!showPin)}
                      className="absolute right-0 top-0 h-11 w-11 hover:bg-transparent rounded-r-xl"
                    >
                      {showPin ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground bg-muted p-2 rounded-lg flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    Remember this! You need it to access your account.
                  </p>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full mt-4 rounded-xl h-14 text-lg"
                  disabled={loading || formData.pin.length !== 4}
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Complete Setup
                </Button>
              </form>
            </div>
          )}

          {/* VIEW: LOGIN */}
          {view === "login" && (
            <div className={SLIDE_UP}>
              <CardHeader className="px-0 pt-0">
                <CardDescription>
                  Enter your credentials to continue.
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-user">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-4 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="login-user"
                      placeholder="e.g. kamau123"
                      value={loginData.username}
                      onChange={(e) =>
                        handleLoginChange("username", e.target.value)
                      }
                      className="pl-9 h-12 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-pin">4-Digit PIN</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-4 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="login-pin"
                      type={showPin ? "text" : "password"}
                      inputMode="numeric"
                      maxLength={4}
                      placeholder="****"
                      value={loginData.pin}
                      onChange={(e) => handleLoginChange("pin", e.target.value)}
                      className="pl-9 pr-10 font-mono text-lg tracking-[0.5em] h-12 rounded-xl"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowPin(!showPin)}
                      className="absolute right-0 top-0 h-11 w-11 rounded-r-xl"
                    >
                      {showPin ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full mt-4 rounded-xl h-14 text-lg"
                  disabled={loading || loginData.pin.length !== 4}
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Log In
                </Button>
              </form>
            </div>
          )}

          {/* VIEW: SUCCESS */}
          {view === "success" && (
            <div className={`text-center py-8 space-y-6 ${FADE_IN}`}>
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full animate-pulse" />
                <div className="relative bg-green-100 dark:bg-green-900/30 p-4 rounded-full">
                  <Sparkles className="w-12 h-12 text-green-600 dark:text-green-400 animate-[spin_3s_linear_infinite]" />
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  You're In!
                </h2>
                <p className="text-muted-foreground text-lg">
                  Welcome to the Brillia family, <br />
                  <span className="font-semibold text-foreground">
                    {formData.name || loginData.username}
                  </span>
                  !
                </p>
              </div>

              <div className="pt-4">
                <Button
                  onClick={handleClose}
                  size="lg"
                  className="w-full text-lg  rounded-xl h-14"
                >
                  Start Learning
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default LearnerModal;
