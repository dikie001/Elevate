import Sidebar from "@/components/app/Sidebar";
import { subjects } from "@/jsons/subjects";
import { useNavigate } from "react-router-dom";
import { GraduationCap, BookOpen, Lightbulb, ArrowRight } from "lucide-react";

const SubjectsPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Sidebar>
      <div className="min-h-screen bg-background text-foreground pb-24 lg:pb-8 transition-colors duration-500">
        <header className="sticky top-0 z-40 glass !bg-background/40 backdrop-blur-2xl border-b border-border transition-all duration-500">
          <div className="max-w-7xl mx-auto px-5 lg:px-8 py-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary border border-primary/20 shadow-inner">
                <GraduationCap className="w-7 h-7" />
              </div>
              <div>
                <h1 className="text-xl lg:text-3xl font-black tracking-tight">
                  Explore Subjects
                </h1>
                <p className="text-xs font-bold text-primary/70 uppercase tracking-widest mt-0.5">
                  Choose your path
                </p>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-5 lg:px-8 pt-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {subjects.map((subject, idx) => (
              <button
                key={subject}
                onClick={() =>
                  navigate(`/subject/${encodeURIComponent(subject)}`)
                }
                className="group glass relative overflow-hidden rounded-3xl p-7 transition-all duration-300 text-left hover:shadow-2xl hover:-translate-y-2 active:scale-95 flex flex-col items-start"
                style={{ animationDelay: `${idx * 40}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10 mb-6 w-14 h-14 rounded-2xl bg-muted/50 border border-border/50 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm">
                  <BookOpen className="w-7 h-7 text-foreground" />
                </div>

                <div className="relative z-10 space-y-2 mb-6">
                  <p className="font-black text-lg md:text-xl leading-tight tracking-tight">
                    {subject}
                  </p>
                  <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                    Master key concepts and ace your exams in {subject}.
                  </p>
                </div>

                <div className="relative z-10 mt-auto flex items-center gap-2 text-xs font-black text-primary bg-primary/10 px-4 py-2 rounded-xl border border-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span className="uppercase tracking-widest">
                    Start Learning
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>

                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
              </button>
            ))}
          </div>
        </main>
      </div>
    </Sidebar>
  );
};

export default SubjectsPage;
