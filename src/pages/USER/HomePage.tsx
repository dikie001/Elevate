import Sidebar from "@/components/app/Sidebar";
import { TEST_RESULTS } from "@/constants";
import useSound from "@/hooks/useSound";
import { subjects } from "@/jsons/subjects";
import LearnerModal from "@/modals/Welcome";
import {
  ArrowRight,
  BookOpen,
  Brain,
  Calculator,
  Flame,
  FlaskConical,
  Globe,
  GraduationCap,
  Lightbulb,
  Medal,
  Mic2,
  Palette,
  Pencil,
  Search,
  Sparkles,
  Sprout,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Utensils,
  Wrench,
  Zap,
} from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

interface TestResult {
  testNumber: number;
  score: number;
  totalQuestions: number;
  percentage: number;
  date: string;
  subject: string;
}

interface UserInfo {
  name: string;
  grade?: string;
  hobby?: string;
}

const subjectMeta: Record<
  string,
  { icon: React.ReactNode; color: string; bg: string }
> = {
  Mathematics: {
    icon: <Calculator className="w-5 h-5" />,
    color: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
  English: {
    icon: <Pencil className="w-5 h-5" />,
    color: "from-emerald-500 to-teal-600",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  Kiswahili: {
    icon: <Globe className="w-5 h-5" />,
    color: "from-orange-500 to-red-600",
    bg: "bg-orange-50 dark:bg-orange-950/30",
  },
  Science: {
    icon: <FlaskConical className="w-5 h-5" />,
    color: "from-purple-500 to-violet-600",
    bg: "bg-purple-50 dark:bg-purple-950/30",
  },
  "Social Studies": {
    icon: <Globe className="w-5 h-5" />,
    color: "from-amber-500 to-yellow-600",
    bg: "bg-amber-50 dark:bg-amber-950/30",
  },
  Agriculture: {
    icon: <Sprout className="w-5 h-5" />,
    color: "from-green-500 to-lime-600",
    bg: "bg-green-50 dark:bg-green-950/30",
  },
  "Home Science": {
    icon: <Utensils className="w-5 h-5" />,
    color: "from-pink-500 to-rose-600",
    bg: "bg-pink-50 dark:bg-pink-950/30",
  },
  "Creative Arts": {
    icon: <Palette className="w-5 h-5" />,
    color: "from-fuchsia-500 to-pink-600",
    bg: "bg-fuchsia-50 dark:bg-fuchsia-950/30",
  },
  "Pre-Technical Studies": {
    icon: <Wrench className="w-5 h-5" />,
    color: "from-slate-500 to-zinc-600",
    bg: "bg-slate-100 dark:bg-slate-800/30",
  },
  "Sports & Physical Education": {
    icon: <Mic2 className="w-5 h-5" />,
    color: "from-cyan-500 to-sky-600",
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
  },
};

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { playSend } = useSound();
  const [openLearnerModal, setOpenLearnerModal] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [results, setResults] = useState<TestResult[]>([]);

  useEffect(() => {
    const isFirstTime = localStorage.getItem("first-time");
    if (!isFirstTime) setTimeout(() => setOpenLearnerModal(true), 1200);
  }, []);

  useEffect(() => {
    const raw = localStorage.getItem("user-info");
    if (raw) setUser(JSON.parse(raw));

    const rawResults = localStorage.getItem(TEST_RESULTS);
    if (rawResults) setResults(JSON.parse(rawResults));
  }, []);

  // Stats
  const totalTests = results.length;
  const avgScore =
    totalTests > 0
      ? Math.round(results.reduce((s, r) => s + r.percentage, 0) / totalTests)
      : 0;
  const bestScore =
    totalTests > 0 ? Math.max(...results.map((r) => r.percentage)) : 0;

  // Subjects with quiz counts
  const subjectStats = useMemo(() => {
    const map: Record<string, number> = {};
    results.forEach((r) => {
      map[r.subject] = (map[r.subject] || 0) + 1;
    });
    return map;
  }, [results]);

  // Recent results (last 4 for desktop balance)
  const recentResults = results.slice(-4).reverse();

  // Current streak
  const streak = useMemo(() => {
    if (results.length === 0) return 0;
    const dates = [
      ...new Set(
        results
          .filter((r) => r.date)
          .map((r) => new Date(r.date).toDateString()),
      ),
    ].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    let count = 1;
    for (let i = 0; i < dates.length - 1; i++) {
      const diff =
        (new Date(dates[i]).getTime() - new Date(dates[i + 1]).getTime()) /
        86400000;
      if (diff <= 1) count++;
      else break;
    }
    return count;
  }, [results]);

  const handleNav = (path: string) => {
    playSend();
    navigate(path);
  };

  const firstName = user?.name?.split(" ")[0] || "Learner";

  return (
    <Sidebar>
      <div className="min-h-screen bg-gradient-to-br from-purple-50/50 via-white to-blue-50/50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="flex-1 min-h-screen relative flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 lg:top-0">
            <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="lg:hidden w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {firstName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {getGreeting()}
                  </p>
                  <h1 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                    {firstName}{" "}
                    <span className="inline-block animate-[wave_1.5s_ease-in-out_infinite]">
                      👋
                    </span>
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Search Bar - Desktop Only */}
                <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-900 px-4 py-2.5 rounded-full w-64 focus-within:ring-2 ring-purple-500/20 transition-all">
                  <Search className="w-4 h-4 text-gray-400 mr-2" />
                  <input
                    placeholder="Search for a topic..."
                    className="bg-transparent border-none outline-none text-sm w-full"
                  />
                </div>

                {user?.grade && (
                  <div className="px-3 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800">
                    <span className="text-xs font-bold text-purple-700 dark:text-purple-300">
                      {user.grade}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </header>

          <main className="flex-1 max-w-7xl mx-auto px-5 pt-6 pb-24 md:pb-10 w-full space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
              {/* Left Column: Stats & Main Actions */}
              <div className="lg:col-span-8 space-y-8">
                {/* Hero Stats Cards */}
                <div className="grid grid-cols-3 gap-3 md:gap-5">
                  <div
                    onClick={() => handleNav("/results")}
                    className="group bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl p-4 md:p-6 shadow-xl shadow-purple-200/50 dark:shadow-none cursor-pointer active:scale-95 transition-transform"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
                      <Target className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <p className="text-2xl md:text-3xl font-black text-white">
                      {totalTests}
                    </p>
                    <p className="text-xs md:text-sm font-medium text-purple-100 mt-0.5">
                      Tests Taken
                    </p>
                  </div>

                  <div
                    onClick={() => handleNav("/results")}
                    className="group bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-4 md:p-6 shadow-xl shadow-blue-200/50 dark:shadow-none cursor-pointer active:scale-95 transition-transform"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
                      <Trophy className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <p className="text-2xl md:text-3xl font-black text-white">
                      {avgScore}%
                    </p>
                    <p className="text-xs md:text-sm font-medium text-blue-100 mt-0.5">
                      Avg Score
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-4 md:p-6 shadow-xl shadow-orange-200/50 dark:shadow-none">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
                      <Flame className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <p className="text-2xl md:text-3xl font-black text-white">
                      {streak}
                    </p>
                    <p className="text-xs md:text-sm font-medium text-orange-100 mt-0.5">
                      Day Streak
                    </p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                  <button
                    onClick={() => handleNav("/quick-quiz")}
                    className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900 p-6 md:p-8 text-left shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -translate-y-8 translate-x-8" />
                    <div className="relative flex items-center justify-between">
                      <div>
                        <div className="w-12 h-12 rounded-2xl bg-gray-800 dark:bg-gray-700 flex items-center justify-center mb-4 text-purple-400">
                          <Brain className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1">
                          Quick Quiz
                        </h3>
                        <p className="text-sm text-gray-400">
                          Test your knowledge now
                        </p>
                      </div>
                      <div className="h-12 w-12 rounded-full border border-gray-700 flex items-center justify-center group-hover:bg-purple-600 group-hover:border-purple-600 transition-colors">
                        <ArrowRight className="w-5 h-5 text-white -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNav("/subjects")}
                    className="group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 md:p-8 text-left shadow-sm hover:shadow-xl transition-all active:scale-[0.98]"
                  >
                    <div className="relative flex items-center justify-between">
                      <div>
                        <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-4 text-emerald-600 dark:text-emerald-400">
                          <BookOpen className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                          Study Mode
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Explore all subjects
                        </p>
                      </div>
                      <div className="h-12 w-12 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:border-emerald-600 group-hover:text-white transition-colors">
                        <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                      </div>
                    </div>
                  </button>
                </div>

                {/* Popular Subjects Grid */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                      <GraduationCap className="w-5 h-5 text-purple-500" />
                      Popular Subjects
                    </h2>
                    <button
                      onClick={() => handleNav("/subjects")}
                      className="text-sm font-semibold text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 px-3 py-1.5 rounded-lg transition-all"
                    >
                      View All
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 md:gap-4">
                    {subjects.slice(0, 6).map((sub) => {
                      const meta = subjectMeta[sub] || {
                        icon: <Lightbulb className="w-5 h-5" />,
                        color: "from-gray-500 to-gray-600",
                        bg: "bg-gray-100 dark:bg-gray-800",
                      };
                      const quizCount = subjectStats[sub] || 0;

                      return (
                        <button
                          key={sub}
                          onClick={() =>
                            handleNav(`/subject/${encodeURIComponent(sub)}`)
                          }
                          className="group bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg hover:border-purple-200 dark:hover:border-purple-800 transition-all text-left"
                        >
                          <div
                            className={`w-12 h-12 rounded-xl ${meta.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
                          >
                            {React.cloneElement(
                              meta.icon as React.ReactElement<{
                                className?: string;
                              }>,
                              {
                                className: "w-6 h-6",
                              },
                            )}
                          </div>
                          <p className="font-bold text-sm leading-tight line-clamp-2 mb-2 h-10 flex items-center">
                            {sub}
                          </p>
                          {quizCount > 0 ? (
                            <div className="flex items-center gap-1.5 text-xs text-purple-600 dark:text-purple-400 font-bold bg-purple-50 dark:bg-purple-900/20 px-2 py-1 rounded-md w-fit">
                              <Zap className="w-3 h-3 fill-current" />
                              <span>{quizCount}</span>
                            </div>
                          ) : (
                            <div className="text-xs text-gray-400 dark:text-gray-500 px-2 py-1">
                              Start
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Sidebar content on Desktop */}
              <div className="lg:col-span-4 space-y-6">
                {/* Achievement Banner */}
                {bestScore > 0 && (
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 p-[2px] shadow-xl">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl p-5 flex items-center gap-4">
                      <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg">
                        <Medal className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1">
                          <Star className="w-3 h-3 fill-current" />
                          Personal Best
                        </p>
                        <p className="text-3xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                          {bestScore}%
                        </p>
                      </div>
                      <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
                    </div>
                  </div>
                )}

                {/* Study Tip */}
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 rounded-3xl p-6 border border-purple-100 dark:border-purple-900/30">
                  <div className="flex gap-4 items-start">
                    <div className="flex-shrink-0 p-3 bg-purple-100 dark:bg-purple-900/30 rounded-2xl">
                      <Lightbulb className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-purple-700 dark:text-purple-300 mb-1">
                        Daily Tip
                      </p>
                      <p className="text-sm text-purple-600/80 dark:text-purple-300/70 leading-relaxed">
                        Consistency beats intensity. Just 15 minutes daily makes
                        a huge difference in retention!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recent Activity List */}
                {recentResults.length > 0 && (
                  <div className="bg-white dark:bg-gray-900/50 rounded-3xl p-5 border border-gray-100 dark:border-gray-800">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-base font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                        <TrendingUp className="w-4 h-4 text-purple-500" />
                        Recent Activity
                      </h2>
                    </div>

                    <div className="space-y-3">
                      {recentResults.map((r, i) => {
                        const scoreColor =
                          r.percentage >= 80
                            ? "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-100"
                            : r.percentage >= 50
                              ? "text-amber-500 bg-amber-50 dark:bg-amber-950/30 border-amber-100"
                              : "text-red-500 bg-red-50 dark:bg-red-950/30 border-red-100";
                        return (
                          <div
                            key={i}
                            className="flex items-center justify-between p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-default"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-10 h-10 rounded-xl flex items-center justify-center ${subjectMeta[r.subject]?.bg || "bg-gray-100 dark:bg-gray-800"}`}
                              >
                                {subjectMeta[r.subject]?.icon || (
                                  <BookOpen className="w-5 h-5 text-gray-500" />
                                )}
                              </div>
                              <div>
                                <p className="font-bold text-xs md:text-sm text-gray-900 dark:text-white line-clamp-1">
                                  {r.subject}
                                </p>
                                <p className="text-[10px] text-gray-500 dark:text-gray-400">
                                  {r.date
                                    ? new Date(r.date).toLocaleDateString(
                                        "en-GB",
                                        {
                                          day: "numeric",
                                          month: "short",
                                        },
                                      )
                                    : "—"}
                                </p>
                              </div>
                            </div>
                            <div
                              className={`px-2.5 py-1 rounded-lg border ${scoreColor}`}
                            >
                              <p className="font-bold text-xs">
                                {r.percentage}%
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>

        {openLearnerModal && (
          <LearnerModal
            onClose={() => {
              setOpenLearnerModal(false);
              navigate("/");
            }}
          />
        )}

        <style>{`
          @keyframes wave {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(20deg); }
            75% { transform: rotate(-10deg); }
          }
        `}</style>
      </div>
    </Sidebar>
  );
};

export default HomePage;
