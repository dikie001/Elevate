import Sidebar from "@/components/app/Sidebar";
import BottomNav from "@/components/app/BottomNav";
import { useParams, useNavigate } from "react-router-dom";
import { BookOpen, Brain, ArrowRight } from "lucide-react";

const SubjectPage: React.FC = () => {
  const { subject } = useParams<{ subject: string }>();
  const navigate = useNavigate();

  return (
    <Sidebar>
      <div className="min-h-screen bg-gradient-to-br from-purple-50/50 via-white to-blue-50/50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 pb-24 lg:pb-8">
        <header className="px-5 lg:px-8 py-6 border-b border-gray-200/50 dark:border-gray-800/50">
          <div className="flex items-center gap-3">
            <BookOpen className="w-7 h-7 text-purple-500" />
            <h1 className="text-xl lg:text-2xl font-bold">{subject}</h1>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-5 lg:px-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              onClick={() =>
                navigate(
                  `/quick-quiz?subject=${encodeURIComponent(subject || "")}`,
                )
              }
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500 p-6 text-left shadow-2xl shadow-purple-300/50 dark:shadow-none active:scale-95 transition-transform flex flex-col items-start"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-8 translate-x-8" />
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">Take Quiz</h3>
                <p className="text-xs text-purple-100">Test your knowledge</p>
                <div className="mt-4 flex items-center gap-1 text-white">
                  <span className="text-xs font-semibold">Start Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
            <button
              onClick={() =>
                navigate(`/short-notes/${encodeURIComponent(subject || "")}`)
              }
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500 p-6 text-left shadow-2xl shadow-emerald-300/50 dark:shadow-none active:scale-95 transition-transform flex flex-col items-start"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-8 translate-x-8" />
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-1">
                  View Short Notes
                </h3>
                <p className="text-xs text-emerald-100">Study by subject</p>
                <div className="mt-4 flex items-center gap-1 text-white">
                  <span className="text-xs font-semibold">Explore</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          </div>
        </main>
        <div className="lg:hidden">
          <BottomNav />
        </div>
      </div>
    </Sidebar>
  );
};

export default SubjectPage;
