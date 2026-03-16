/* eslint-disable @typescript-eslint/no-explicit-any */
import Sidebar from "@/components/app/Sidebar";
import { BackButton } from "@/components/layout";
import { TEST_RESULTS } from "@/constants";
import { FileCheck, Loader2, TrendingUp, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// --- TYPES ---
interface TestResult {
  percentage: number;
  totalQuestions: number;
  date?: string;
  score: number;
}

interface UserStats {
  testsDone: number;
  averageScore: number;
}

// --- THEME UTILS ---
const getColorForScore = (score: number) => {
  if (score >= 90) return "#10b981"; // emerald-500
  if (score >= 70) return "#18181b"; // zinc-900 (Primary)
  if (score >= 50) return "#f59e0b"; // amber-500
  return "#ef4444"; // destructive
};

const Results = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<UserStats>({
    testsDone: 0,
    averageScore: 0,
  });
  const [graphData, setGraphData] = useState<unknown[]>([]);

  useEffect(() => {
    // 1. Fetch Data from LocalStorage
    const rawResults = localStorage.getItem(TEST_RESULTS);

    // 2. Parse Data
    const results: TestResult[] = rawResults ? JSON.parse(rawResults) : [];

    // 3. Calculate Stats
    const totalTests = results.length;

    // Calculate Average
    const totalScoreSum = results.reduce(
      (sum, item) => sum + item.percentage,
      0,
    );
    const avgScore =
      totalTests > 0 ? Math.round(totalScoreSum / totalTests) : 0;

    setStats({
      testsDone: totalTests,
      averageScore: avgScore,
    });

    // 4. Format Graph Data (Test 1, Test 2...)
    const formattedGraphData = results.map((result, index) => ({
      name: `Test ${index + 1}`, // Auto-generates Test 1, Test 2, etc.
      score: result.percentage,
      date: result.date,
      fullDate: result.date
        ? new Date(result.date).toLocaleDateString()
        : "N/A",
    }));

    setGraphData(formattedGraphData);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Sidebar>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <div className="min-h-screen bg-background pb-24 lg:pb-8 transition-colors duration-500">
        <header className="sticky top-0 z-40 glass !bg-background/40 backdrop-blur-2xl border-b border-border transition-all duration-500">
          <div className="max-w-7xl mx-auto px-5 lg:px-8 py-6 flex items-center gap-4">
            <BackButton />
            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary border border-primary/20 shadow-inner">
              <Trophy className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl lg:text-3xl font-black tracking-tight text-foreground">
                Analytics
              </h1>
              <p className="text-xs font-bold text-primary/70 uppercase tracking-widest mt-0.5">
                Your Performance Hub
              </p>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-5 lg:px-8 pt-10">
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-4xl sm:text-6xl font-black text-foreground tracking-tight leading-[1.1]">
              Learning <span className="text-primary">Results</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg font-medium max-w-2xl">
              Track your growth, celebrate your milestones, and keep pushing
              your boundaries.
            </p>
          </div>

          {/* --- STATS ROW --- */}
          <div className="grid grid-cols-2 gap-6 md:gap-8 mb-12">
            <StatCard
              title="Tests Completed"
              value={stats.testsDone}
              icon={FileCheck}
            />
            <StatCard
              title="Average Score"
              value={`${stats.averageScore}%`}
              icon={Trophy}
              isPrimary
            />
          </div>

          {/* --- MAIN GRAPH: MARKS PER TEST --- */}
          <div className="glass rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-border relative overflow-hidden">
            <div className="absolute inset-0 mesh-gradient opacity-5" />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-6">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-primary/10 rounded-2xl border border-primary/10 transition-transform hover:scale-110">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-foreground tracking-tight">
                    Performance History
                  </h3>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">
                    Consistency is key
                  </p>
                </div>
              </div>

              {/* Legend for color coding */}
              <div className="flex flex-wrap gap-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground bg-muted/30 p-4 rounded-2xl border border-border/50">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-md bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]" />{" "}
                  Excellent
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-md bg-primary shadow-[0_0_10px_rgba(var(--primary),0.3)]" />{" "}
                  Good
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-md bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.3)]" />{" "}
                  Average
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-md bg-destructive shadow-[0_0_10px_rgba(239,68,68,0.3)]" />{" "}
                  Critical
                </div>
              </div>
            </div>

            {/* SCROLL WRAPPER START */}
            <div className="relative z-10 w-full overflow-x-auto pb-6 scrollbar-hide">
              <div
                className="h-[450px]"
                style={{
                  width:
                    graphData.length > 8
                      ? `${graphData.length * 80}px`
                      : "100%",
                  minWidth: "100%",
                }}
              >
                {graphData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={graphData as any}
                      margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                    >
                      <CartesianGrid
                        strokeDasharray="4 4"
                        vertical={false}
                        stroke="currentColor"
                        className="text-border/50"
                      />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "currentColor",
                          fontSize: 10,
                          fontWeight: 900,
                        }}
                        className="text-muted-foreground uppercase tracking-widest"
                        dy={15}
                        interval={0}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fill: "currentColor",
                          fontSize: 10,
                          fontWeight: 900,
                        }}
                        className="text-muted-foreground uppercase tracking-widest"
                        domain={[0, 100]}
                      />
                      <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ fill: "rgba(0,0,0,0.03)" }}
                      />
                      <ReferenceLine
                        y={50}
                        stroke="currentColor"
                        className="text-destructive/30"
                        strokeDasharray="6 6"
                      />
                      <Bar
                        dataKey="score"
                        radius={[12, 12, 12, 12]}
                        barSize={45}
                        animationDuration={2000}
                      >
                        {graphData.map((entry: any, index: number) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={getColorForScore(entry.score)}
                            className="hover:opacity-80 transition-opacity cursor-pointer shadow-xl"
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-muted-foreground/30">
                    <div className="w-24 h-24 rounded-full bg-muted/30 flex items-center justify-center mb-6">
                      <FileCheck className="w-12 h-12" />
                    </div>
                    <p className="text-xl font-black uppercase tracking-widest">
                      No Data Available
                    </p>
                  </div>
                )}
              </div>
            </div>
            {/* SCROLL WRAPPER END */}
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

// --- SUB-COMPONENTS ---

const StatCard = ({ title, value, icon: Icon }: any) => {
  return (
    <div className="relative overflow-hidden rounded-xl p-6 transition-all duration-300 border bg-card border-border shadow-sm hover:border-primary/50 group">
      <div className="relative flex flex-col items-center text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-muted rounded-xl mb-4 transition-transform duration-300 group-hover:scale-110">
          <Icon className="w-6 h-6 text-primary" />
        </div>

        <div className="text-3xl font-black text-foreground tracking-tight mb-1">
          {value}
        </div>

        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
          {title}
        </p>
      </div>
    </div>
  );
};
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const score = payload[0].value;
    return (
      <div className="bg-card p-4 rounded-xl shadow-xl border border-border text-center min-w-[150px]">
        <p className="text-muted-foreground text-xs font-black uppercase tracking-widest mb-1">
          {label}
        </p>
        <p className="text-3xl font-black text-foreground mb-1">{score}%</p>
        <span
          className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${
            score >= 90
              ? "bg-emerald-500/10 text-emerald-600"
              : score >= 70
                ? "bg-primary/10 text-primary"
                : "bg-destructive/10 text-destructive"
          }`}
        >
          {score >= 90
            ? "Excellent!"
            : score >= 70
              ? "Good Job"
              : "Keep Trying"}
        </span>
      </div>
    );
  }
  return null;
};

export default Results;
