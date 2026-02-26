import Sidebar from "@/components/app/Sidebar";
import { subjects } from "@/jsons/subjects";
import { useNavigate } from "react-router-dom";
import { GraduationCap, BookOpen, Lightbulb, ArrowRight } from "lucide-react";

const SubjectsPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Sidebar>
      <div className="min-h-screen bg-background text-foreground pb-24 lg:pb-8">
        <header className="px-5 lg:px-8 py-6 border-b border-border">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-7 h-7 text-primary" />
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
                className="group bg-card text-card-foreground rounded-lg p-6 border border-border shadow-sm hover:bg-accent transition-all text-left flex flex-col items-start"
                style={{ animationDelay: `${idx * 40}ms` }}
              >
                <div className="mb-3 w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-foreground" />
                </div>
                <p className="font-bold text-base leading-tight mb-1">
                  {subject}
                </p>
                <div className="flex items-center gap-1 text-xs text-primary font-semibold mt-auto">
                  <Lightbulb className="w-3 h-3" />
                  <span>Learn</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            ))}
          </div>
        </main>
      </div>
    </Sidebar>
  );
};

export default SubjectsPage;
