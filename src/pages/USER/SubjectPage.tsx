import Sidebar from "@/components/app/Sidebar";
import { BackButton } from "@/components/layout";
import { useParams, useNavigate } from "react-router-dom";
import { BookOpen, Brain, ArrowRight } from "lucide-react";

const SubjectPage: React.FC = () => {
  const { subject } = useParams<{ subject: string }>();
  const navigate = useNavigate();

  return (
    <Sidebar>
      <div className="min-h-screen bg-background pb-24 lg:pb-8 transition-colors duration-500">
        <header className="sticky top-0 z-40 glass !bg-background/40 backdrop-blur-2xl border-b border-border transition-all duration-500">
          <div className="max-w-7xl mx-auto px-5 lg:px-8 py-6 flex items-center gap-4">
            <BackButton />
            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary border border-primary/20 shadow-inner">
              <BookOpen className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl lg:text-3xl font-black tracking-tight">
                {subject}
              </h1>
              <p className="text-xs font-bold text-primary/70 uppercase tracking-widest mt-0.5">
                Subject Track
              </p>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-5 lg:px-8 pt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <button
              onClick={() =>
                navigate(
                  `/quick-quiz?subject=${encodeURIComponent(subject || "")}`,
                )
              }
              className="group relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-8 text-left shadow-xl hover:shadow-primary/20 transition-all duration-300 active:scale-95 flex flex-col items-start"
            >
              <div className="absolute inset-0 mesh-gradient opacity-20 group-hover:opacity-30 transition-opacity" />

              <div className="relative z-10 w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 text-white border border-white/20 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                <Brain className="w-8 h-8" />
              </div>

              <div className="relative z-10 space-y-2 mb-8">
                <h3 className="text-2xl font-black tracking-tight">
                  Take Quiz
                </h3>
                <p className="text-sm font-medium opacity-80 leading-relaxed">
                  Challenge yourself with 10 random questions on {subject}.
                </p>
              </div>

              <div className="relative z-10 flex items-center gap-2 text-xs font-black bg-white/10 px-4 py-2 rounded-xl border border-white/10 group-hover:bg-white group-hover:text-primary transition-all duration-300">
                <span className="uppercase tracking-widest">Start Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <button
              onClick={() =>
                navigate(`/short-notes/${encodeURIComponent(subject || "")}`)
              }
              className="group glass relative overflow-hidden rounded-3xl p-8 text-left transition-all duration-300 active:scale-95 flex flex-col items-start hover:shadow-2xl hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10 w-16 h-16 rounded-2xl bg-muted/50 border border-border/50 flex items-center justify-center mb-6 text-foreground group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500 shadow-sm">
                <BookOpen className="w-8 h-8 text-foreground" />
              </div>

              <div className="relative z-10 space-y-2 mb-8">
                <h3 className="text-2xl font-black tracking-tight text-foreground">
                  Short Notes
                </h3>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                  Quick summaries and key points for fast revision.
                </p>
              </div>

              <div className="relative z-10 flex items-center gap-2 text-xs font-black text-primary bg-primary/10 px-4 py-2 rounded-xl border border-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                <span className="uppercase tracking-widest">Explore Notes</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>

              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
            </button>
          </div>
        </main>
      </div>
    </Sidebar>
  );
};

export default SubjectPage;
