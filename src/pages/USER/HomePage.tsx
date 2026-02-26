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
          <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border lg:top-0">
            <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="lg:hidden w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                  {firstName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    {getGreeting()}
                  </p>
                  <h1 className="text-lg md:text-xl font-bold">
                    {firstName}{" "}
                    <span className="inline-block animate-[wave_1.5s_ease-in-out_infinite]">
                      👋
                    </span>
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Search Bar - Desktop Only */}
                <div className="hidden md:flex items-center bg-muted px-4 py-2.5 rounded-lg w-64 ring-offset-background focus-within:ring-2 ring-ring transition-all">
                  <Search className="w-4 h-4 text-muted-foreground mr-2" />
                  <input
                    placeholder="Search for a topic..."
                    className="bg-transparent border-none outline-none text-sm w-full"
                  />
                </div>

                {user?.grade && (
                  <div className="px-3 py-1.5 rounded-full bg-muted border border-border">
                    <span className="text-xs font-bold text-foreground">
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
                <div className="grid grid-cols-3 gap-3 md:gap-5">
                  <div
                    onClick={() => handleNav("/results")}
                    className="group bg-card text-card-foreground border border-border rounded-xl p-4 md:p-6 shadow-sm cursor-pointer active:scale-95 transition-all hover:bg-accent"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-muted flex items-center justify-center mb-3">
                      <Target className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
                    </div>
                    <p className="text-2xl md:text-3xl font-black">
                      {totalTests}
                    </p>
                    <p className="text-xs md:text-sm font-medium text-muted-foreground mt-0.5">
                      Tests Taken
                    </p>
                  </div>

                  <div
                    onClick={() => handleNav("/results")}
                    className="group bg-card text-card-foreground border border-border rounded-xl p-4 md:p-6 shadow-sm cursor-pointer active:scale-95 transition-all hover:bg-accent"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-muted flex items-center justify-center mb-3">
                      <Trophy className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
                    </div>
                    <p className="text-2xl md:text-3xl font-black">
                      {avgScore}%
                    </p>
                    <p className="text-xs md:text-sm font-medium text-muted-foreground mt-0.5">
                      Avg Score
                    </p>
                  </div>

                  <div className="group bg-card text-card-foreground border border-border rounded-xl p-4 md:p-6 shadow-sm">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-muted flex items-center justify-center mb-3">
                      <Flame className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
                    </div>
                    <p className="text-2xl md:text-3xl font-black">{streak}</p>
                    <p className="text-xs md:text-sm font-medium text-muted-foreground mt-0.5">
                      Day Streak
                    </p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                  <button
                    onClick={() => handleNav("/quick-quiz")}
                    className="group relative overflow-hidden rounded-xl bg-primary text-primary-foreground p-6 md:p-8 text-left shadow-sm hover:opacity-90 transition-all active:scale-[0.98]"
                  >
                    <div className="relative flex items-center justify-between">
                      <div>
                        <div className="w-12 h-12 rounded-lg bg-primary-foreground/10 flex items-center justify-center mb-4 text-primary-foreground">
                          <Brain className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-1">Quick Quiz</h3>
                        <p className="text-sm opacity-80">
                          Test your knowledge now
                        </p>
                      </div>
                      <div className="h-12 w-12 rounded-full border border-primary-foreground/20 flex items-center justify-center group-hover:bg-primary-foreground/10 transition-colors">
                        <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNav("/subjects")}
                    className="group relative overflow-hidden rounded-xl bg-card text-card-foreground border border-border p-6 md:p-8 text-left shadow-sm hover:bg-accent transition-all active:scale-[0.98]"
                  >
                    <div className="relative flex items-center justify-between">
                      <div>
                        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4 text-foreground">
                          <BookOpen className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold mb-1">Study Mode</h3>
                        <p className="text-sm text-muted-foreground">
                          Explore all subjects
                        </p>
                      </div>
                      <div className="h-12 w-12 rounded-full border border-border flex items-center justify-center group-hover:bg-muted transition-colors">
                        <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
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

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3 md:gap-4">
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
                          className="group bg-card text-card-foreground rounded-xl p-4 border border-border shadow-sm hover:shadow-md hover:border-primary transition-all text-left"
                        >
                          <div
                            className={`w-12 h-12 rounded-lg ${meta.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
                          >
                            {React.cloneElement(
                              meta.icon as React.ReactElement<{
                                className?: string;
                              }>,
                              {
                                className: "w-6 h-6 text-foreground",
                              },
                            )}
                          </div>
                          <p className="font-bold text-sm leading-tight line-clamp-2 mb-2 h-10 flex items-center">
                            {sub}
                          </p>
                          {quizCount > 0 ? (
                            <div className="flex items-center gap-1.5 text-xs text-primary font-bold bg-muted px-2 py-1 rounded-md w-fit">
                              <Zap className="w-3 h-3 fill-current" />
                              <span>{quizCount}</span>
                            </div>
                          ) : (
                            <div className="text-xs text-muted-foreground px-2 py-1">
                              Start
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
                              <div
                                className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center"
                              >
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
