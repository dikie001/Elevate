import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Gamepad2,
  Moon,
  Palette,
  Sparkles,
  Star,
  Sun,
  Trees,
  Waves,
} from "lucide-react";
import React, { useState } from "react";
import { useThemeStore } from "../store/ThemeStore";
import toast from "react-hot-toast";

interface UserData {
  name: string;
  age: string;
  grade: string;
  theme: string;
}

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
  const [currentStep, setCurrentStep] = useState(4);
  const [errorMsg, setErrorMsg] = useState("");
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    name: "",
    age: "",
    grade: "",
    theme: "",
  });
  const { setTheme, theme } = useThemeStore();

  const themes: {
    id: Theme;
    name: string;
    icon: any;
    preview: string;
  }[] = [
    {
      id: "ocean",
      name: "Ocean Blue",
      icon: Waves,
      preview: "bg-blue-400 text-cyan-300",
    },
    {
      id: "forest",
      name: "Forest Green",
      icon: Trees,
      preview: "bg-green-600 text-lime-400",
    },
    {
      id: "solarized",
      name: "Solarized ",
      icon: Sun,
      preview: "bg-teal-500 text-slate-600",
    },
    {
      id: "cyberpunk",
      name: "Cyberpunk",
      icon: Gamepad2,
      preview: "bg-gray-800 text-fuchsia-500",
    },
    {
      id: "dracula",
      name: "Dracula ",
      icon: Sparkles,
      preview: "bg-zinc-600 text-purple-300",
    },
    {
      id: "light",
      name: "Light Mode",
      icon: BookOpen,
      preview: "bg-white text-black",
    },
    {
      id: "dark",
      name: "Dark Mode",
      icon: Moon,
      preview: "bg-gray-950 text-gray-100",
    },
    {
      id: "fancy",
      name: "Fancy Theme",
      icon: Star,
      preview:
        "bg-gradient-to-bl from-cyan-600 via-purple-700 to-blue-600 text-white",
    },
  ];

  const handleNext = () => {
    if (currentStep === 2) {
      if (userData.name.length < 3) {
        toast.error("That's not a name, that's a typo. Add more letters", {
          id: "err1",
        });
        return;
      } else if (userData.name.length > 20) {
        toast.error("Whoa, that's a long name! Keep it under 20 characters", {
          id: "err2",
        });
        return;
      }
      const Age = Number(userData.age);
      if (Age < 10) {
        toast.error(
          "Sorry kiddo, you gotta be atleast 10 years old to roll with us",
          {
            id: "err3",
          }
        );

        return;
      }
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleInputChange = (field: keyof UserData, value: string) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleThemeSelect = (themeId: Theme) => {
    setTheme(themeId);
    setUserData((prev) => ({
      ...prev,
      theme: themeId,
    }));
    console.log(userData);
  };

  const handleComplete = () => {
    setShowCompletionMessage(true);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return true;
      case 2:
        return userData.name.trim() !== "" && userData.age.trim() !== "";
      case 3:
        return userData.grade.trim() !== "";
      case 4:
        return userData.theme !== "";
      default:
        return false;
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4`}>
      <div className={`w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden`}>
        {/* Progress Bar */}
        <div className={`h-2 bg-gray-100`}>
          <div
            className={`h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out`}
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>
        {currentStep > 1 && (
          <div
            className="flex gap-2 mt-5 ml-5 hover:text-blue-900 cursor-pointer w-fit active:ring-2 p-2 rounded-2xl"
            onClick={() =>
              setCurrentStep(currentStep > 1 ? currentStep - 1 : 1)
            }
          >
            <ChevronLeft className="" size={20} />
            <p className="font-medium">back</p>
          </div>
        )}

        <div className={`px-8 py-4`}>
          {/* Step 1: Welcome */}
          {currentStep === 1 && (
            <div className={`text-center space-y-6`}>
              <div className={`relative`}>
                <Sparkles
                  className={`w-20 h-20 mx-auto text-indigo-500 animate-pulse`}
                />
                <div
                  className={`absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full animate-bounce`}
                />
              </div>
              <h1 className={`text-4xl font-bold text-gray-800 mb-2`}>
                Welcome to Elevate!
              </h1>
              <p className={`text-lg text-gray-600 leading-relaxed`}>
                Your personal learning companion that adapts to your unique
                style and helps you reach new heights in your education journey.
              </p>
              <div className={`flex justify-center space-x-4 text-2xl mt-8`}>
                <span className={`animate-bounce delay-100`}>📚</span>
                <span className={`animate-bounce delay-200`}>🚀</span>
                <span className={`animate-bounce delay-300`}>⭐</span>
              </div>
            </div>
          )}

          {/* Step 2: Name and Age */}
          {currentStep === 2 && (
            <div className={`space-y-6`}>
              <div className={`text-center mb-6`}>
                <h2 className={`text-3xl font-bold text-gray-800 mb-2`}>
                  Let's get to know you!
                </h2>
                <p className={`text-gray-600`}>Tell us a bit about yourself</p>
              </div>

              <div className={`space-y-4`}>
                <div>
                  <label
                    className={`block text-sm font-medium text-gray-700 mb-2`}
                  >
                    What's your name?
                  </label>
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`w-full px-4 py-3 border border-gray-300 focus:outline-0 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium text-gray-700 mb-2`}
                  >
                    How old are you?
                  </label>
                  <input
                    type="number"
                    value={userData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                    className={`w-full px-4 py-3 border focus:outline-0 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                    placeholder="Enter your age"
                    min="1"
                    max="100"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Grade */}
          {currentStep === 3 && (
            <div className={`space-y-6`}>
              <div className={`text-center mb-8`}>
                <BookOpen
                  className={`w-16 h-16 mx-auto text-indigo-500 mb-4`}
                />
                <h2 className={`text-3xl font-bold text-gray-800 mb-2`}>
                  What grade are you in?
                </h2>
                <p className={`text-gray-600`}>
                  This helps us customize your learning experience
                </p>
              </div>

              <div className={`grid grid-cols-2 gap-3`}>
                {["6th", "7th", "8th", "9th", "10th", "11th", "12th"].map(
                  (grade) => (
                    <button
                      key={grade}
                      onClick={() => handleInputChange("grade", grade)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        userData.grade === grade
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                          : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-25"
                      }`}
                    >
                      {grade}
                    </button>
                  )
                )}
              </div>
            </div>
          )}

          {/* Step 4: Theme Selection */}
          {currentStep === 4 && (
            <div className={`space-y-6`}>
              <div className={`text-center mb-8`}>
                <Palette className={`w-16 h-16 mx-auto text-indigo-500 mb-4`} />
                <h2 className={`text-3xl font-bold text-gray-800 mb-2`}>
                  Choose your theme
                </h2>
                <p className={`text-gray-600`}>
                  Pick a color scheme that inspires you
                </p>
              </div>

              <div className={`grid grid-cols-2 gap-4`}>
                {themes.map((theme) => {
                  const Icon = theme.icon;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => handleThemeSelect(theme.id as Theme)}
                      className={`p-4 rounded-2xl border-2 transition-all transform hover:scale-105 ${
                        userData.theme === theme.id
                          ? "border-indigo-500 shadow-lg"
                          : "border-gray-200 hover:border-indigo-300"
                      }`}
                    >
                      <div
                        className={`${theme.preview} h-16 rounded-lg mb-3 flex items-center justify-center text-2xl`}
                      >
                        <Icon className={`w-8 h-8 `} />
                      </div>
                      <h3 className={`font-semibold text-gray-800`}>
                        {theme.name}
                      </h3>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation Button */}
          <div className={`mt-8 flex justify-center`}>
            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className={`px-8 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-all ${
                  isStepValid()
                    ? "bg-indigo-500 text-white hover:bg-indigo-600 transform hover:scale-105"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <span>Continue</span>
                <ChevronRight className={`w-5 h-5 `} />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                disabled={!isStepValid()}
                className={`px-8 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-all ${
                  isStepValid()
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 transform hover:scale-105"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <span>Get Started</span>
                <Sparkles className={`w-5 h-5`} />
              </button>
            )}
          </div>

          {/* Step Indicator */}
          <div className={`flex justify-center mt-6 space-x-2`}>
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`w-2 h-2 rounded-full transition-all ${
                  step === currentStep
                    ? "bg-indigo-500 w-8"
                    : step < currentStep
                    ? "bg-indigo-300"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      {/* INTERNAL MODALS */}
      {showCompletionMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/60" onClick={()=>setShowCompletionMessage(false)}></div>

          <div className="relative bg-white  p-6 rounded-2xl shadow-xl max-w-md w-full text-center z-10">
            <h2 className="text-2xl font-bold mb-4">Setup Complete!</h2>
            <p className="mb-6 font-medium text-gray-700">
              You're all set, {userData.name.split(" ")[0]}! Dive in and start your learning
              adventure with Elevate.
            </p>
            <button
              onClick={() => setShowCompletionMessage(false)}
              className="px-6 py-3 font-medium bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Let's Go!
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default WelcomePage;
