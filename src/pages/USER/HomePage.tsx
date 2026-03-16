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
    color: "from-zinc-500 to-zinc-600",
    bg: "bg-muted",
  },
  English: {
    icon: <Pencil className="w-5 h-5" />,
    color: "from-zinc-500 to-zinc-600",
    bg: "bg-muted",
  },
  Kiswahili: {
    icon: <Globe className="w-5 h-5" />,
    color: "from-zinc-500 to-zinc-600",
    bg: "bg-muted",
  },
  Science: {
    icon: <FlaskConical className="w-5 h-5" />,
    color: "from-zinc-500 to-zinc-600",
    bg: "bg-muted",
  },
  "Social Studies": {
    icon: <Globe className="w-5 h-5" />,
    color: "from-zinc-500 to-zinc-600",
    bg: "bg-muted",
  },
  Agriculture: {
    icon: <Sprout className="w-5 h-5" />,
    color: "from-zinc-500 to-zinc-600",
    bg: "bg-muted",
  },
  "Home Science": {
    icon: <Utensils className="w-5 h-5" />,
    color: "from-zinc-500 to-zinc-600",
    bg: "bg-muted",
  },
  "Creative Arts": {
    icon: <Palette className="w-5 h-5" />,
    color: "from-zinc-500 to-zinc-600",
    bg: "bg-muted",
  },
  "Pre-Technical Studies": {
    icon: <Wrench className="w-5 h-5" />,
    color: "from-zinc-500 to-zinc-600",
    bg: "bg-muted",
  },
  "Sports & Physical Education": {
    icon: <Mic2 className="w-5 h-5" />,
    color: "from-zinc-500 to-zinc-600",
    bg: "bg-muted",
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
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        <div className="flex-1 min-h-screen relative flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-40 glass !bg-background/40 backdrop-blur-2xl border-b border-border transition-all duration-500">
            <div className="max-w-7xl mx-auto px-5 py-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="lg:hidden w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary font-bold text-xl border border-primary/20 shadow-inner">
                  {firstName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-xs font-semibold text-primary/70 uppercase tracking-widest mb-0.5">
                    {getGreeting()}
                  </p>
                  <h1 className="text-xl md:text-2xl font-black tracking-tight">
                    Hey, {firstName}{" "}
                    <span className="inline-block animate-[wave_2s_ease-in-out_infinite] origin-bottom-right">
                      👋
                    </span>
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Search Bar - Desktop Only */}
                <div className="hidden md:flex items-center bg-muted/50 border border-border/50 px-4 py-2.5 rounded-xl w-72 focus-within:w-80 focus-within:ring-2 ring-primary/20 transition-all duration-300">
                  <Search className="w-4 h-4 text-muted-foreground mr-2" />
                  <input
                    placeholder="Search for a topic..."
                    className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground/50"
                  />
                </div>

                {user?.grade && (
                  <div className="px-4 py-2 rounded-xl bg-primary/10 border border-primary/20 shadow-sm">
                    <span className="text-xs font-black text-primary">
                      {user.grade}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </header>

          <main className="flex-1 max-w-7xl mx-auto px-5 pt-6 pb-24 md:pb-10 w-full space-y-8">
            <div className=" space-y-8">
              {/* Left Column: Stats & Main Actions */}
              <div className="space-y-8">
                {/* Hero Stats Cards */}
                <div className="grid grid-cols-3 gap-6">
                  <div
                    onClick={() => handleNav("/results")}
                    className="group glass relative overflow-hidden rounded-[2rem] p-6 cursor-pointer active:scale-95 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1.5 border-border/50"
                  >
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                        <Target className="w-7 h-7 text-primary" />
                      </div>
                      <p className="text-4xl font-black tracking-tighter text-foreground">
                        {totalTests}
                      </p>
                      <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mt-1.5 opacity-70">
                        Tests Taken
                      </p>
                    </div>
                    <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
                  </div>

                  <div
                    onClick={() => handleNav("/results")}
                    className="group glass relative overflow-hidden rounded-[2rem] p-6 cursor-pointer active:scale-95 transition-all duration-500 hover:shadow-2xl hover:shadow-chart-2/10 hover:-translate-y-1.5 border-border/50"
                  >
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-chart-2/10 flex items-center justify-center mb-6 border border-chart-2/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                        <Trophy className="w-7 h-7 text-chart-2" />
                      </div>
                      <p className="text-4xl font-black tracking-tighter text-foreground">
                        {avgScore}%
                      </p>
                      <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mt-1.5 opacity-70">
                        Average Score
                      </p>
                    </div>
                    <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-chart-2/5 rounded-full blur-3xl group-hover:bg-chart-2/10 transition-colors" />
                  </div>

                  <div className="group glass relative overflow-hidden rounded-[2rem] p-6 transition-all duration-500 hover:shadow-2xl hover:shadow-chart-4/10 hover:-translate-y-1.5 border-border/50">
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-chart-4/10 flex items-center justify-center mb-6 border border-chart-4/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                        <Flame className="w-7 h-7 text-chart-4" />
                      </div>
                      <p className="text-4xl font-black tracking-tighter text-foreground">
                        {streak}
                      </p>
                      <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mt-1.5 opacity-70">
                        Day Streak
                      </p>
                    </div>
                    <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-chart-4/5 rounded-full blur-3xl group-hover:bg-chart-4/10 transition-colors" />
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <button
                    onClick={() => handleNav("/quick-quiz")}
                    className="group relative overflow-hidden rounded-[2.5rem] bg-primary text-primary-foreground p-10 text-left shadow-2xl hover:shadow-primary/30 transition-all duration-500 active:scale-[0.98] border border-primary/20"
                  >
                    <div className="absolute inset-0 mesh-gradient opacity-30 group-hover:opacity-50 transition-opacity" />
                    <div className="relative flex items-center justify-between z-10">
                      <div>
                        <div className="w-16 h-16 rounded-[1.5rem] bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 text-white border border-white/20 shadow-2xl group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">
                          <Brain className="w-8 h-8" />
                        </div>
                        <h3 className="text-3xl font-black mb-1 leading-none tracking-tight">Quick Quiz</h3>
                        <p className="text-sm font-black uppercase tracking-widest opacity-70">
                          Instant Challenge
                        </p>
                      </div>
                      <div className="h-16 w-16 rounded-full border-2 border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-all duration-500">
                        <ArrowRight className="w-8 h-8 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNav("/subjects")}
                    className="group relative overflow-hidden rounded-[2.5rem] glass p-10 text-left transition-all duration-500 active:scale-[0.98] hover:shadow-2xl hover:shadow-black/5 border-border/50"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative flex items-center justify-between z-10">
                      <div>
                        <div className="w-16 h-16 rounded-[1.5rem] bg-muted flex items-center justify-center mb-6 text-foreground border border-border shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                          <BookOpen className="w-8 h-8" />
                        </div>
                        <h3 className="text-3xl font-black mb-1 leading-none tracking-tight">Study Mode</h3>
                        <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">
                          Explore Subjects
                        </p>
                      </div>
                      <div className="h-16 w-16 rounded-full border-2 border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground transition-all duration-500">
                        <ArrowRight className="w-8 h-8 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                      </div>
                    </div>
                  </button>
                </div>

                {/* Popular Subjects Grid */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-primary" />
                      Popular Subjects
                    </h2>
                    <button
                      onClick={() => handleNav("/subjects")}
                      className="text-sm font-semibold text-primary hover:bg-accent px-3 py-1.5 rounded-lg transition-all"
                    >
                      View All
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 md:gap-6">
                    {subjects.slice(0, 6).map((sub) => {
                      const meta = subjectMeta[sub] || {
                        icon: <Lightbulb className="w-5 h-5" />,
                        color: "from-zinc-500 to-zinc-600",
                        bg: "bg-muted",
                      };
                      const quizCount = subjectStats[sub] || 0;

                      return (
                        <button
                          key={sub}
                          onClick={() =>
                            handleNav(`/subject/${encodeURIComponent(sub)}`)
                          }
                          className="group glass relative overflow-hidden rounded-[2rem] p-6 transition-all duration-500 text-left hover:shadow-2xl hover:-translate-y-2 active:scale-95 border-border/50"
                        >
                          <div
                            className={`w-16 h-16 rounded-[1.25rem] ${meta.bg}/50 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm border border-border/50`}
                          >
                            {React.cloneElement(
                              meta.icon as React.ReactElement<{
                                className?: string;
                              }>,
                              {
                                className: "w-8 h-8 text-foreground",
                              },
                            )}
                          </div>
                          <p className="font-black text-base md:text-lg leading-tight mb-4 h-14 flex items-center tracking-tight text-foreground">
                            {sub}
                          </p>
                          {quizCount > 0 ? (
                            <div className="flex items-center gap-2 text-[10px] text-primary font-black bg-primary/10 px-4 py-2 rounded-xl w-fit border border-primary/20 uppercase tracking-widest">
                              <Zap className="w-3 h-3 fill-current" />
                              <span>{quizCount} Sessions</span>
                            </div>
                          ) : (
                            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest bg-muted/50 px-4 py-2 rounded-xl border border-border/50">
                              New Path
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Sidebar content */}
              <div className="space-y-6">
                {/* Achievement Banner */}
                {bestScore > 0 && (
                  <div className="relative overflow-hidden rounded-xl bg-card border border-border p-5 flex items-center gap-4 shadow-sm">
                    <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-primary flex items-center justify-center shadow-sm">
                      <Medal className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current text-primary" />
                        Personal Best
                      </p>
                      <p className="text-3xl font-black text-foreground">
                        {bestScore}%
                      </p>
                    </div>
                  </div>
                )}

                {/* Recent Activity List */}
                {recentResults.length > 0 && (
                  <div className="bg-card text-card-foreground rounded-xl p-5 border border-border mt-8">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-base font-bold flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        Recent Activity
                      </h2>
                    </div>

                    <div className="space-y-3">
                      {recentResults.map((r, i) => {
                        const scoreColor =
                          r.percentage >= 80
                            ? "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
                            : r.percentage >= 50
                              ? "text-amber-500 bg-amber-500/10 border-amber-500/20"
                              : "text-destructive bg-destructive/10 border-destructive/20";
                        return (
                          <div
                            key={i}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors cursor-default"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                {subjectMeta[r.subject]?.icon || (
                                  <BookOpen className="w-5 h-5 text-muted-foreground" />
                                )}
                              </div>
                              <div>
                                <p className="font-bold text-xs md:text-sm line-clamp-1">
                                  {r.subject}
                                </p>
                                <p className="text-[10px] text-muted-foreground">
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
