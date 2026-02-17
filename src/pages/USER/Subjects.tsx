import Sidebar from "@/components/app/Sidebar";
import BottomNav from "@/components/app/BottomNav";
import { subjects } from "@/jsons/subjects";
import { useNavigate } from "react-router-dom";
import { GraduationCap, BookOpen, Lightbulb, ArrowRight } from "lucide-react";

const SubjectsPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Sidebar>
      <div className="min-h-screen bg-gradient-to-br from-purple-50/50 via-white to-blue-50/50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 pb-24 lg:pb-8">
        <header className="px-5 lg:px-8 py-6 border-b border-gray-200/50 dark:border-gray-800/50">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-7 h-7 text-purple-500" />
            <h1 className="text-xl lg:text-2xl font-bold">Subjects</h1>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-5 lg:px-8 pt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {subjects.map((subject, idx) => (
              <button
                key={subject}
                onClick={() =>
                  navigate(`/subject/${encodeURIComponent(subject)}`)
                }
                className="group bg-white dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg hover:scale-105 active:scale-95 transition-all text-left flex flex-col items-start"
                style={{ animationDelay: `${idx * 40}ms` }}
              >
                <div className="mb-3 w-10 h-10 rounded-xl bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-purple-500" />
                </div>
                <p className="font-bold text-base leading-tight mb-1">
                  {subject}
                </p>
                <div className="flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400 font-semibold mt-auto">
                  <Lightbulb className="w-3 h-3" />
                  <span>Learn</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            ))}
          </div>
        </main>
        <div className="lg:hidden">
          <BottomNav />
        </div>
      </div>
    </Sidebar>
  );
};

export default SubjectsPage;
