import {
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Play,
  RotateCcw,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  XCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";

import Footer from "@/components/app/Footer";
import Navbar from "@/components/app/Navbar";
import Sidebar from "@/components/app/Sidebar";
import { STORAGE_KEYS } from "@/constants";
import quizData from "@/jsons/quizData";
import ResetModal from "@/modals/Delete";
import { useNavigate } from "react-router-dom";
import useSound from "../../hooks/useSound";

type Options = {
  A: string;
  B: string;
  C: string;
  D: string;
};

export interface QuizType {
  id: number;
  question: string;
  subject: string;
  options: Options;
  correctAnswer: keyof Options;
  explanation: string;
}

interface TestResult {
  testNumber: number;
  score: number;
  totalQuestions: number;
  percentage: number;
  date: string;
  subject: string;
  timeTaken?: number;
}

interface QuizAppState {
  currentTest: number;
  currentQuestion: number;
  selectedAnswer: string;
  showFeedback: boolean;
  testResults: TestResult[];
  gameState: "home" | "quiz" | "results";
  score: number;
  loading: boolean;
  startTime?: number;
  quizData: QuizType[];
  error: string | null;
}

const QuizApp: React.FC = () => {
  const [state, setState] = useState<QuizAppState>({
    currentTest: 0,
    currentQuestion: 0,
    selectedAnswer: "",
    showFeedback: false,
    testResults: [],
    gameState: "home",
    score: 0,
    loading: true,
    quizData: [],
    error: null,
  });

  const [openResetModal, setOpenResetModal] = useState(false);
  const navigate = useNavigate();

  const { playSend, playSuccess, playError } = useSound();

  useEffect(() => {
    const loadData = async () => {
      try {
        // Use local data from quizData json
        const data = quizData as QuizType[];

        // Load results from localStorage
        const savedResults = localStorage.getItem(STORAGE_KEYS.TEST_RESULTS);
        const results = savedResults ? JSON.parse(savedResults) : [];

        setState((prev) => ({
          ...prev,
          quizData: data,
          testResults: results,
          currentTest: results.length,
          loading: false,
        }));
      } catch (err) {
        setState((prev) => ({
          ...prev,
          error: "Failed to load quiz data",
          loading: false,
        }));
      }
    };
    loadData();
  }, []);

  const setGameState = (gameState: "home" | "quiz" | "results") => {
    setState((prev) => ({ ...prev, gameState }));
  };

  const getTotalTests = () => {
    const questionsPerTest = 10;
    return Math.ceil(state.quizData.length / questionsPerTest);
  };

  const getCurrentTestQuestions = () => {
    const questionsPerTest = 10;
    const startIdx = state.currentTest * questionsPerTest;
    return state.quizData.slice(startIdx, startIdx + questionsPerTest);
  };

  const startTest = (testIdx: number) => {
    playSend();
    setState((prev) => ({
      ...prev,
      currentTest: testIdx,
      currentQuestion: 0,
      score: 0,
      selectedAnswer: "",
      showFeedback: false,
      gameState: "quiz",
      startTime: Date.now(),
    }));
  };

  const handleAnswerSelect = (answer: string) => {
    if (state.showFeedback) return;

    const currentQuestions = getCurrentTestQuestions();
    const currentQ = currentQuestions[state.currentQuestion];
    const isCorrect = answer === currentQ.correctAnswer;

    if (isCorrect) playSuccess();
    else playError();

    setState((prev) => ({
      ...prev,
      selectedAnswer: answer,
      showFeedback: true,
      score: isCorrect ? prev.score + 1 : prev.score,
    }));
  };

  const handleNext = () => {
    const currentQuestions = getCurrentTestQuestions();

    if (state.currentQuestion < currentQuestions.length - 1) {
      setState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        selectedAnswer: "",
        showFeedback: false,
      }));
    } else {
      completeTest();
    }
  };

  const completeTest = () => {
    const currentQuestions = getCurrentTestQuestions();
    const timeTaken = state.startTime
      ? Math.floor((Date.now() - state.startTime) / 1000)
      : 0;

    const newResult: TestResult = {
      testNumber: state.currentTest + 1,
      score: state.score,
      totalQuestions: currentQuestions.length,
      percentage: Math.round((state.score / currentQuestions.length) * 100),
      date: new Date().toLocaleDateString(),
      subject: currentQuestions[0]?.subject || "General",
      timeTaken: timeTaken,
    };

    const updatedResults = [...state.testResults, newResult];
    localStorage.setItem(
      STORAGE_KEYS.TEST_RESULTS,
      JSON.stringify(updatedResults),
    );

    setState((prev) => ({
      ...prev,
      testResults: updatedResults,
      gameState: "results",
    }));
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getPerformanceMessage = (percentage: number): string => {
    if (percentage >= 90) return "Outstanding! Master level achievement! 🌟";
    if (percentage >= 80) return "Excellent work! You're brilliant! 🎉";
    if (percentage >= 70) return "Great job! Keep the momentum going! 👏";
    if (percentage >= 60) return "Good effort! Practice makes perfect! 💪";
    return "Keep studying! You'll get it next time! 📚";
  };

  if (state.loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="bg-card rounded-3xl p-8 border border-border flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4"></div>
          <p className="text-foreground font-bold text-lg">Loading Quiz...</p>
        </div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-card rounded-3xl p-10 border border-border max-w-md text-center">
          <XCircle className="w-16 h-16 text-destructive mx-auto mb-6" />
          <h2 className="text-2xl font-black text-foreground mb-2 text-center">
            Load Error
          </h2>
          <p className="text-muted-foreground mb-8 text-center">
            {state.error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-primary text-primary-foreground font-black py-4 rounded-xl shadow-lg hover:opacity-90 transition-all active:scale-95"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (state.gameState === "home") {
    return (
      <Sidebar>
        <div className="min-h-screen bg-background flex flex-col">
          <Navbar currentPage="Quick Quiz" />
          <main className="flex-1 max-w-5xl mx-auto w-full px-6 pt-24 pb-12">
            {openResetModal && (
              <ResetModal open={openResetModal} setOpen={setOpenResetModal} />
            )}

            <div className="text-center mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted border border-border text-primary text-xs font-black uppercase tracking-widest">
                <Sparkles className="w-4 h-4" />
                <span>Assessment Hub</span>
              </div>
              <h1 className="text-4xl sm:text-6xl font-black text-foreground tracking-tight">
                Master Your{" "}
                <span className="text-primary border-b-4 border-primary/20">
                  Studies
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
                Take timed tests, track your scores, and identify areas for
                improvement.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              {[
                {
                  icon: <BookOpen />,
                  label: "Questions",
                  value: state.quizData.length,
                },
                {
                  icon: <Target />,
                  label: "Total Tests",
                  value: getTotalTests(),
                },
                {
                  icon: <Trophy />,
                  label: "Completed",
                  value: state.testResults.length,
                },
                {
                  icon: <TrendingUp />,
                  label: "Avg Score",
                  value:
                    state.testResults.length > 0
                      ? Math.round(
                          state.testResults.reduce(
                            (a, b) => a + b.percentage,
                            0,
                          ) / state.testResults.length,
                        )
                      : 0,
                  unit: "%",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col items-center text-center transition-all hover:border-primary/50"
                >
                  <div className="mb-4 p-3 rounded-xl bg-muted text-primary">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-black text-foreground">
                    {stat.value}
                    {stat.unit}
                  </div>
                  <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-2">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="max-w-xl mx-auto space-y-6">
              {state.currentTest < getTotalTests() ? (
                <button
                  onClick={() => startTest(state.currentTest)}
                  className="w-full bg-primary text-primary-foreground p-6 rounded-2xl shadow-xl hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-between group"
                >
                  <div className="text-left">
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-80">
                      Next Session
                    </p>
                    <p className="text-2xl font-black">
                      Test {state.currentTest + 1}
                    </p>
                  </div>
                  <div className="bg-primary-foreground/20 p-4 rounded-full group-hover:bg-primary-foreground/30 transition-all">
                    <Play className="fill-current w-6 h-6" />
                  </div>
                </button>
              ) : (
                <div className="w-full bg-muted p-6 rounded-2xl border border-border text-center">
                  <p className="text-xl font-black text-muted-foreground">
                    All tests completed!
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => navigate("/results")}
                  className="flex items-center justify-center gap-3 p-4 bg-secondary text-foreground rounded-xl font-bold border border-border hover:bg-secondary/80 transition-all"
                >
                  <Trophy className="w-5 h-5 text-primary" /> Analytics
                </button>
                <button
                  onClick={() => setOpenResetModal(true)}
                  className="flex items-center justify-center gap-3 p-4 bg-secondary text-destructive rounded-xl font-bold border border-border hover:bg-destructive/5 transition-all"
                >
                  <RotateCcw className="w-5 h-5" /> Reset
                </button>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </Sidebar>
    );
  }

  if (state.gameState === "quiz") {
    const currentQuestions = getCurrentTestQuestions();
    const currentQ = currentQuestions[state.currentQuestion];

    if (!currentQ) return null;

    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar currentPage="Live Quiz" />
        <main className="flex-1 max-w-4xl mx-auto w-full px-6 pt-24 pb-12">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => setGameState("home")}
              className="flex items-center text-muted-foreground hover:text-foreground font-black text-sm"
            >
              <ChevronLeft className="w-5 h-5 mr-1" /> EXIT
            </button>
            <div className="text-center">
              <h2 className="text-2xl font-black">
                Test {state.currentTest + 1}
              </h2>
              <p className="text-[10px] font-black uppercase text-primary tracking-widest">
                {currentQ.subject}
              </p>
            </div>
            <div className="text-right">
              <p className="text-foreground font-black text-sm">
                Q{state.currentQuestion + 1}/{currentQuestions.length}
              </p>
              {state.startTime && (
                <p className="text-muted-foreground text-xs font-bold tabular-nums">
                  {formatTime(
                    Math.floor((Date.now() - state.startTime) / 1000),
                  )}
                </p>
              )}
            </div>
          </div>

          <div className="bg-muted h-2 rounded-full mb-12 overflow-hidden border border-border">
            <div
              className="bg-primary h-full transition-all duration-500 ease-out"
              style={{
                width: `${((state.currentQuestion + 1) / currentQuestions.length) * 100}%`,
              }}
            />
          </div>

          <div className="bg-card p-8 md:p-12 rounded-3xl border border-border shadow-xl relative overflow-hidden">
            <h3 className="text-2xl md:text-3xl font-black text-foreground leading-tight mb-10">
              {currentQ.question}
            </h3>

            <div className="grid gap-4">
              {Object.entries(currentQ.options).map(([key, value]) => {
                const isSelected = state.selectedAnswer === key;
                const isCorrect = key === currentQ.correctAnswer;

                let btnStyle =
                  "w-full p-5 rounded-xl text-left font-bold border-2 transition-all flex items-center group ";

                if (!state.showFeedback) {
                  btnStyle += isSelected
                    ? "bg-primary border-primary text-primary-foreground shadow-lg"
                    : "bg-muted/50 border-border text-foreground hover:border-primary/50 hover:bg-accent";
                } else {
                  if (isCorrect)
                    btnStyle +=
                      "bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400";
                  else if (isSelected)
                    btnStyle +=
                      "bg-destructive/10 border-destructive text-destructive";
                  else
                    btnStyle +=
                      "bg-muted/20 border-border text-muted-foreground opacity-50";
                }

                return (
                  <button
                    key={key}
                    onClick={() => handleAnswerSelect(key)}
                    disabled={state.showFeedback}
                    className={btnStyle}
                  >
                    <span
                      className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center mr-4 text-xs font-black transition-colors ${
                        isSelected && !state.showFeedback
                          ? "bg-primary-foreground text-primary border-primary-foreground"
                          : "bg-background border-border"
                      }`}
                    >
                      {key}
                    </span>
                    <span className="flex-1">{value}</span>
                    {state.showFeedback && isCorrect && (
                      <CheckCircle2 className="w-6 h-6 ml-2 text-emerald-500" />
                    )}
                    {state.showFeedback && isSelected && !isCorrect && (
                      <XCircle className="w-6 h-6 ml-2 text-destructive" />
                    )}
                  </button>
                );
              })}
            </div>

            {state.showFeedback && (
              <button
                onClick={handleNext}
                className="w-full mt-10 bg-primary text-primary-foreground font-black py-5 rounded-2xl shadow-xl flex items-center justify-center gap-2 text-lg hover:opacity-90 active:scale-[0.98] transition-all"
              >
                {state.currentQuestion < currentQuestions.length - 1
                  ? "Next Question"
                  : "View Results"}
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {state.showFeedback && (
            <div className="mt-8 animate-in slide-in-from-bottom-4 duration-300">
              <div className="bg-card p-6 rounded-2xl border border-border shadow-md">
                <div className="flex gap-4">
                  <div
                    className={`p-2 rounded-full h-fit ${state.selectedAnswer === currentQ.correctAnswer ? "bg-emerald-500/10 text-emerald-600" : "bg-destructive/10 text-destructive"}`}
                  >
                    {state.selectedAnswer === currentQ.correctAnswer ? (
                      <CheckCircle2 />
                    ) : (
                      <XCircle />
                    )}
                  </div>
                  <div>
                    <h4
                      className={`font-black mb-1 ${state.selectedAnswer === currentQ.correctAnswer ? "text-emerald-600" : "text-destructive"}`}
                    >
                      {state.selectedAnswer === currentQ.correctAnswer
                        ? "CORRECT"
                        : "INCORRECT"}
                    </h4>
                    <p className="text-muted-foreground font-medium leading-relaxed">
                      {currentQ.explanation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }

  if (state.gameState === "results") {
    const latestResult = state.testResults[state.testResults.length - 1];
    if (!latestResult) return null;

    const isExcellent = latestResult.percentage >= 80;

    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar currentPage="Results" />
        <main className="flex-1 flex items-center justify-center p-6 pt-24 pb-12">
          <div className="w-full max-w-md bg-card rounded-3xl border border-border shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500">
            <div className="p-10 text-center">
              <div className="w-24 h-24 rounded-full bg-muted mx-auto mb-6 flex items-center justify-center text-primary">
                {isExcellent ? (
                  <Trophy className="w-12 h-12" />
                ) : (
                  <CheckCircle2 className="w-12 h-12" />
                )}
              </div>
              <h2 className="text-3xl font-black text-foreground mb-1">
                {isExcellent ? "Heroic Effort!" : "Test Complete!"}
              </h2>
              <p className="text-muted-foreground font-bold">
                Session #{latestResult.testNumber} • {latestResult.subject}
              </p>
            </div>

            <div className="px-10 pb-10 text-center border-b border-border">
              <span className="text-8xl font-black tracking-tighter text-primary">
                {latestResult.percentage}%
              </span>
              <div className="mt-6 px-4 py-2 rounded-full bg-muted border border-border text-[10px] font-black uppercase tracking-widest">
                {getPerformanceMessage(latestResult.percentage)}
              </div>
              <p className="mt-6 font-bold text-muted-foreground">
                {latestResult.score} / {latestResult.totalQuestions} Correct
                Answers
              </p>
            </div>

            <div className="grid grid-cols-2 divide-x divide-border bg-muted/20">
              <div className="p-6 text-center">
                <Clock className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">
                  Duration
                </p>
                <p className="font-black">
                  {formatTime(latestResult.timeTaken || 0)}
                </p>
              </div>
              <div className="p-6 text-center">
                <Calendar className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">
                  Date
                </p>
                <p className="font-black">{latestResult.date}</p>
              </div>
            </div>

            <div className="p-8 space-y-4">
              <button
                onClick={() =>
                  startTest(
                    state.currentTest < getTotalTests() ? state.currentTest : 0,
                  )
                }
                className="w-full bg-primary text-primary-foreground font-black h-16 rounded-2xl shadow-xl flex items-center justify-center gap-3 hover:opacity-90 active:scale-[0.98] transition-all"
              >
                {state.currentTest < getTotalTests()
                  ? "Begin Next Test"
                  : "Retake All Tests"}{" "}
                <Play className="fill-current w-4 h-4" />
              </button>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setGameState("home")}
                  className="bg-secondary text-foreground font-bold h-12 rounded-xl border border-border flex items-center justify-center gap-2 hover:bg-secondary/80 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" /> Menu
                </button>
                <button
                  onClick={() => navigate("/results")}
                  className="bg-secondary text-foreground font-bold h-12 rounded-xl border border-border flex items-center justify-center gap-2 hover:bg-secondary/80 transition-all"
                >
                  <Trophy className="w-4 h-4" /> History
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return null;
};

export default QuizApp;
