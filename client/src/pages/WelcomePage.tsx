import emailjs from "@emailjs/browser";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Gamepad2,
  Moon,
  Palette,
  Rocket,
  Sparkles,
  Star,
  Sun,
  Trees,
  Waves,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useThemeStore } from "../store/ThemeStore";

// Environment variables for EmailJS configuration
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;
const TEMPLATE_KEY = import.meta.env.VITE_TEMPLATE_KEY;
const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;

// User data interface for type safety
interface UserData {
  user_id: string;
  name: string;
  age: string;
  grade: string;
  theme: string;
  school: string;
}

// Theme type definition for better type checking
type Theme =
  | "light"
  | "dark"
  | "fancy"
  | "solarized"
  | "cyberpunk"
  | "forest"
  | "ocean"
  | "dracula";

const WelcomePage: React.FC = () => {
  // State management for current step and user data
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData>({
    user_id: "",
    name: "",
    age: "",
    grade: "9th",
    theme: "dark",
    school: "",
  });

  // Theme store hook for global theme management
  const { setTheme } = useThemeStore();

  // Theme configuration with enhanced visual styling
  const themes: {
    id: Theme;
    name: string;
    icon: any;
    preview: string;
    description: string;
  }[] = [
    {
      id: "ocean",
      name: "Ocean Blue",
      icon: Waves,
      preview: "bg-gradient-to-br from-blue-400 to-cyan-500 text-white",
      description: "Calm and focused like deep waters",
    },
    {
      id: "forest",
      name: "Forest Green",
      icon: Trees,
      preview: "bg-gradient-to-br from-green-500 to-emerald-600 text-white",
      description: "Natural and refreshing",
    },
    {
      id: "solarized",
      name: "Solarized",
      icon: Sun,
      preview: "bg-gradient-to-br from-amber-400 to-orange-500 text-white",
      description: "Warm and energizing",
    },
    {
      id: "cyberpunk",
      name: "Cyberpunk",
      icon: Gamepad2,
      preview: "bg-gradient-to-br from-gray-800 to-black text-fuchsia-400",
      description: "Futuristic and bold",
    },
    {
      id: "dracula",
      name: "Dracula",
      icon: Sparkles,
      preview:
        "bg-gradient-to-br from-purple-800 to-indigo-900 text-purple-300",
      description: "Dark and mysterious",
    },
    {
      id: "light",
      name: "Light Mode",
      icon: BookOpen,
      preview:
        "bg-gradient-to-br from-gray-50 to-white text-gray-800 border border-gray-200",
      description: "Clean and classic",
    },
    {
      id: "dark",
      name: "Dark Mode",
      icon: Moon,
      preview: "bg-gradient-to-br from-gray-800 to-gray-900 text-gray-100",
      description: "Easy on the eyes",
    },
    {
      id: "fancy",
      name: "Fancy Theme",
      icon: Star,
      preview:
        "bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 text-white",
      description: "Vibrant and creative",
    },
  ];

  // Auto-advance from welcome screen after 3 seconds
  useEffect(() => {
    if (currentStep === 1) {
      const timer = setTimeout(() => {
        setCurrentStep(2);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  // Enhanced email sending with loading state and error handling
  const sendEmail = async () => {
    setIsLoading(true);
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_KEY,
        {
          user_name: userData.name,
          user_age: userData.age,
          user_grade: userData.grade,
          login_time: new Date().toLocaleTimeString(),
          login_date: new Date().toDateString(),
          user_theme: userData.theme,
        },
        PUBLIC_KEY
      );
    } catch (err) {
      console.error("Email sending failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced navigation with smooth transitions
  const handleNext = () => {
    // Validation for step 2 (name,school and age)
    if (currentStep === 2) {
      if (userData.name.length < 3) {
        toast.error("Please enter a valid name (at least 2 characters)", {
          id: "name-error",
          icon: "📝",
        });
        return;
      } else if (userData.name.length > 25) {
        toast.error("Name is too long! Please keep it under 25 characters", {
          id: "name-long-error",
          icon: "✂️",
        });
        return;
      }

      if (userData.school.length < 3) {
        toast.error("Please enter a valid name (at least 2 characters)", {
          id: "school-error",
          icon: "📝",
        });
        return;
      } else if (userData.school.length > 50) {
        toast.error("Name is too long! Please keep it under 50 characters", {
          id: "school-long-error",
          icon: "✂️",
        });
        return;
      }

      const age = Number(userData.age);
      if (age < 10) {
        toast.error("You need to be at least 10 years old to use Elevate", {
          id: "age-min-error",
          icon: "👶",
        });
        return;
      } else if (age > 100 || age === 0 || isNaN(age)) {
        toast.error("Please enter a valid age", {
          id: "age-invalid-error",
          icon: "🔢",
        });
        return;
      }
    }

    // Advance to next step with animation
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Enhanced input validation with better UX
  const handleInputChange = (field: keyof UserData, value: string) => {
    // Special validation for name field
    if (field === "name") {
      const hasNumbers = /\d/.test(value);
      const hasSpecialChars = /[^a-zA-Z\s']/.test(value);

      if (hasNumbers) {
        toast.error("Names can't contain numbers!", {
          id: "name-numbers-error",
          icon: "🚫",
        });
        return;
      }
      if (hasSpecialChars) {
        toast.error(
          "Names can only contain letters, spaces, and apostrophes!",
          {
            id: "name-special-error",
            icon: "🚫",
          }
        );
        return;
      }
    }

    // Update user data
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Enhanced theme selection with immediate feedback
  const handleThemeSelect = (themeId: Theme) => {
    setTheme(themeId);
    setUserData((prev) => ({
      ...prev,
      theme: themeId,
    }));

    // Provide immediate feedback
    toast.success(
      `${themes.find((t) => t.id === themeId)?.name} theme selected!`,
      {
        duration: 2000,
      }
    );
  };

  // Enhanced completion handler with loading state
  const handleComplete = async () => {
    const formData = new FormData();
    formData.append("new_user", JSON.stringify(userData));
    setIsLoading(true);
    console.log(userData);

    try {
      const response = await fetch("http://localhost:4000/api/auth", {
        method: "POST",
        body: formData,
      });
      const res = await response.json();
      console.log(res);
      if (res.message === "user created successfully") {
        toast.success("Account created successfully!", {
          id: "account-created",
        });
        // await sendEmail();
        userData.user_id = res.user_id;
        console.log(res)
        
        localStorage.setItem("isFirstVisit", "false");
        localStorage.setItem("userData", JSON.stringify(userData));
        setIsLoading(false);
        window.location.reload();
      } else if (res.message !== "user created successfully") {
        toast("Network error, connect to internet", { id: "internet_err" });
        setIsLoading(false);
        return;
      }
    } catch (err) {
      toast.error("Error signing up, please try again", { id: "err-signing" });
    } finally {
      setIsLoading(false);
    }
  };

  // Enhanced step validation
  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return true;
      case 2:
        return (
          userData.name.trim().length >= 2 &&
          userData.age.trim() !== "" &&
          Number(userData.age) >= 10 &&
          Number(userData.age) <= 100
        );
      case 3:
        return userData.grade.trim() !== "";
      case 4:
        return userData.theme !== "";
      default:
        return false;
    }
  };

  // Navigate to previous step
  const handlePrevious = () => {
    setCurrentStep(currentStep > 1 ? currentStep - 1 : 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div
        className={`w-full max-w-2xl ${
          currentStep === 4 && "max-w-3xl"
        } bg-white rounded-3xl shadow-2xl overflow-hidden backdrop-blur-sm border border-white/20`}
      >
        {/* Enhanced Progress Bar with Glow Effect */}
        <div className="h-3 bg-gray-100 relative overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-700 ease-out relative"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
          </div>
        </div>

        {/* Enhanced Back Button with Better Styling */}
        {currentStep > 1 && (
          <div
            className="flex items-center gap-2 mt-6 ml-6 text-gray-600 hover:text-indigo-600 cursor-pointer w-fit p-2 rounded-xl hover:bg-indigo-50 transition-all duration-300 group"
            onClick={handlePrevious}
          >
            <ChevronLeft
              className="transition-transform group-hover:-translate-x-1"
              size={20}
            />
            <p className="font-medium">Back</p>
          </div>
        )}

        <div className="px-8 py-8">
          {/* Step 1: Enhanced Welcome Screen */}
          {currentStep === 1 && (
            <div className="text-center space-y-8 py-4">
              <div className="relative">
                {/* Animated background elements */}
                <div className="absolute inset-0 animate-pulse">
                  <div className="w-32 h-32 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full mx-auto opacity-20 animate-spin-slow"></div>
                </div>
                <Sparkles className="relative w-24 h-24 mx-auto text-indigo-500 animate-bounce" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-bounce delay-300"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-bounce delay-500"></div>
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Welcome to Elevate!
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg mx-auto">
                  Your personal learning companion that adapts to your unique
                  style and helps you reach new heights in your education
                  journey.
                </p>
              </div>

              {/* Auto-advance indicator */}
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                <span>Setting up your experience...</span>
              </div>
            </div>
          )}

          {/* Step 2: Enhanced Name and Age Collection */}
          {currentStep === 2 && (
            <div className="space-y-8 animate-fade-in">
              <div className="text-center mb-6">
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full w-20 h-20 mx-auto opacity-20 animate-pulse"></div>
                  <Rocket className="relative w-16 h-16 mx-auto text-indigo-500 mb-4 drop-shadow-sm" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-3">
                  Let's get to know you!
                </h2>
                <p className="text-lg text-gray-600">
                  Tell us a bit about yourself to personalize your experience
                </p>
              </div>

              <div className="space-y-4">
                {/* Enhanced Name Input */}
                <div className="space-y-2">
                  <label className="block  font-medium text-gray-700">
                    What's your name champ?
                  </label>
                  <input
                    type="text"
                    autoFocus
                    value={userData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full px-6 py-4 border-2 border-gray-200 focus:outline-none rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-300 text-lg placeholder-gray-400"
                    placeholder="Enter your awesome name"
                    maxLength={25}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Minimum 3 characters</span>
                    <span>{userData.name.length}/25</span>
                  </div>
                </div>

                {/* Enhanced Age Input */}
                <div className="space-y-2">
                  <label className="block font-medium text-gray-700">
                    How old are you?
                  </label>
                  <input
                    type="number"
                    value={userData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    className="w-full px-6 py-4 border-2  border-gray-200 focus:outline-none rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-300 text-lg placeholder-gray-400"
                    placeholder="Enter your age"
                    min="10"
                    max="100"
                  />
                  <p className="text-xs text-gray-500">
                    Must be above 10 years old
                  </p>
                </div>

                {/* School input */}
                <div className="space-y-2">
                  <label className="block  font-medium text-gray-700">
                    Whats the name of your school?
                  </label>
                  <input
                    type="text"
                    value={userData.school}
                    onChange={(e) =>
                      handleInputChange("school", e.target.value)
                    }
                    className="w-full px-6 py-4 border-2 border-gray-200 focus:outline-none rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all duration-300 text-lg placeholder-gray-400"
                    placeholder="Your school's name"
                    min="10"
                    max="100"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Enhanced Grade Selection (keeping your improved version) */}
          {currentStep === 3 && (
            <div className="space-y-8 max-w-2xl mx-auto animate-fade-in">
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full w-20 h-20 mx-auto opacity-20 animate-pulse"></div>
                  <BookOpen className="relative w-16 h-16 mx-auto text-indigo-500 mb-4 drop-shadow-sm" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
                  What grade are you in {userData.name.split(" ")[0]}?
                </h2>
                <p className="text-lg text-gray-600 max-w-md mx-auto">
                  This helps us customize your learning experience perfectly for
                  you
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
                {["9th", "10th", "11th", "12th"].map((grade, index) => (
                  <button
                    key={grade}
                    onClick={() => handleInputChange("grade", grade)}
                    className={`group relative p-4 shadow-lg shadow-black/20 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                      userData.grade === grade
                        ? "border-indigo-500 bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-700 shadow-md"
                        : "border-gray-200 hover:border-indigo-300 hover:bg-gradient-to-br hover:from-indigo-25 hover:to-white bg-white"
                    }`}
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    <div className="flex flex-col items-center space-y-1">
                      <span className="text-2xl font-bold">{grade}</span>
                      <span className="text-xs text-gray-500 uppercase tracking-wider">
                        Grade
                      </span>
                    </div>
                    {userData.grade === grade && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center animate-bounce">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Enhanced Theme Selection */}
          {currentStep === 4 && (
            <div className="space-y-4 max-w-4xl mx-auto animate-fade-in">
              <div className="text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full w-20 h-20 mx-auto opacity-20 animate-pulse"></div>
                  <Palette className="relative w-16 h-16 mx-auto text-indigo-500 mb-4 drop-shadow-sm" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                  Choose your theme
                </h2>
                <p className="text-lg text-gray-600 max-w-md mx-auto">
                  Pick a color scheme that inspires your learning journey
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 ">
                {themes.map((theme, index) => {
                  const Icon = theme.icon;
                  const isSelected = userData.theme === theme.id;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => handleThemeSelect(theme.id as Theme)}
                      className={`group relative p-4 md:p-6 rounded-3xl border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
                        isSelected
                          ? "border-indigo-500 shadow-2xl bg-white ring-4 ring-indigo-100"
                          : "border-gray-200 hover:border-indigo-300 bg-white hover:shadow-lg"
                      }`}
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      {/* Selection indicator with enhanced animation */}
                      {isSelected && (
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}

                      {/* Enhanced theme preview */}
                      <div
                        className={`${theme.preview} h-20 rounded-2xl mb-4 flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-105 relative overflow-hidden`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                        <Icon className="w-10 h-10 relative z-10 drop-shadow-sm" />

                        {/* Animated sparkles for selected theme */}
                        {isSelected && (
                          <>
                            <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full animate-ping"></div>
                            <div
                              className="absolute bottom-2 left-2 w-1 h-1 bg-white rounded-full animate-pulse"
                              style={{ animationDelay: "0.5s" }}
                            ></div>
                            <div
                              className="absolute top-4 left-4 w-1.5 h-1.5 bg-white rounded-full animate-pulse"
                              style={{ animationDelay: "1s" }}
                            ></div>
                          </>
                        )}
                      </div>

                      {/* Enhanced theme information */}
                      <div className="text-center space-y-2">
                        <h3
                          className={`font-bold text-lg transition-colors ${
                            isSelected
                              ? "text-indigo-700"
                              : "text-gray-800 group-hover:text-indigo-600"
                          }`}
                        >
                          {theme.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {theme.description}
                        </p>
                      </div>

                      {/* Subtle accent bar */}
                      <div className="mt-4 h-1 bg-gradient-to-r opacity-30 rounded-full transition-opacity group-hover:opacity-50">
                        <div
                          className={`${theme.preview} h-full rounded-full`}
                        ></div>
                      </div>

                      {/* Enhanced glow effect */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-400/0 to-purple-400/0 group-hover:from-indigo-400/5 group-hover:to-purple-400/5 transition-all duration-300 pointer-events-none"></div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Enhanced Navigation Buttons */}
          <div className="mt-6 flex justify-center">
            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className={`px-8 py-3 rounded-2xl font-bold flex items-center space-x-3 transition-all duration-300 text-lg ${
                  isStepValid()
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <span>Continue</span>
                <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                disabled={!isStepValid() || isLoading}
                className={`px-10 py-4 rounded-2xl font-bold flex items-center space-x-3 transition-all duration-300 text-lg relative overflow-hidden ${
                  isStepValid() && !isLoading
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Setting up...</span>
                  </>
                ) : (
                  <>
                    <span>Get Started</span>
                    <Sparkles className="w-5 h-5" />
                  </>
                )}
              </button>
            )}
          </div>

          {/* Enhanced Step Indicator */}
          <div className="flex justify-center mt-6 space-x-3">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`h-3 rounded-full transition-all duration-500 ${
                  step === currentStep
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 w-12 shadow-lg"
                    : step < currentStep
                    ? "bg-gradient-to-r from-green-400 to-emerald-500 w-3"
                    : "bg-gray-300 w-3"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }

        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default WelcomePage;
