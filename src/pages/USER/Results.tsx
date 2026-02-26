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
      <div className="min-h-screen bg-background pb-24 lg:pb-8">
        <div className="px-5 lg:px-8 py-6 border-b border-border">
          <div className="flex items-center gap-3">
            <BackButton />
            <Trophy className="w-7 h-7 text-primary" />
            <h1 className="text-xl lg:text-2xl font-bold">Learning Results</h1>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-5 lg:px-8 pt-10 md:pt-16">
          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight">
              Learning Results
            </h1>
            <p className="mt-2 text-muted-foreground text-lg">
              Overview of your tests and reading milestones.
            </p>
          </div>

          {/* --- STATS ROW --- */}
          <div className="grid grid-cols-2 gap-4 md:gap-6 mb-12">
            <StatCard
              title="Tests Completed"
              value={stats.testsDone}
              icon={FileCheck}
              color="indigo"
            />
            <StatCard
              title="Average Score"
              value={`${stats.averageScore}%`}
              icon={Trophy}
              color="amber"
            />
          </div>

          {/* --- MAIN GRAPH: MARKS PER TEST --- */}
          <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-sm border border-border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  Performance History
                </h2>
              </div>

              {/* Legend for color coding */}
              <div className="flex flex-wrap gap-4 text-xs font-bold text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />{" "}
                  Excellent
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" /> Good
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />{" "}
                  Average
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-destructive" />{" "}
                  Low
                </div>
              </div>
            </div>

            {/* SCROLL WRAPPER START */}
            <div className="w-full overflow-x-auto pb-4">
              <div
                className="h-[400px]"
                // Dynamic width: If > 6 items, use 60px per item. Else, fit to screen (100%).
                style={{
                  width:
                    graphData.length > 6
                      ? `${graphData.length * 60}px`
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
                        strokeDasharray="3 3"
                        vertical={false}
                        strokeOpacity={0.1}
                      />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#6b7280", fontSize: 12 }}
                        dy={10}
                        interval={0} // Forces all labels to show
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#6b7280", fontSize: 12 }}
                        domain={[0, 100]}
                      />
                      <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ fill: "transparent" }}
                      />
                      <ReferenceLine
                        y={50}
                        stroke="#ef4444"
                        strokeDasharray="3 3"
                        strokeOpacity={0.5}
                      />
                      <Bar
                        dataKey="score"
                        radius={[8, 8, 8, 8]}
                        barSize={40} // Fixed bar size looks better when scrolling
                        animationDuration={1500}
                      >
                        {graphData.map((entry: any, index: number) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={getColorForScore(entry.score)}
                            className="hover:opacity-80 transition-opacity cursor-pointer"
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400">
                    <FileCheck className="w-12 h-12 mb-2 opacity-20" />
                    <p>No tests taken yet.</p>
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
