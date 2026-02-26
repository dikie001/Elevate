import Sidebar from "@/components/app/Sidebar";
import { BackButton } from "@/components/layout";
import { useParams, useNavigate } from "react-router-dom";
import { BookOpen, Brain, ArrowRight } from "lucide-react";

const SubjectPage: React.FC = () => {
  const { subject } = useParams<{ subject: string }>();
  const navigate = useNavigate();

  return (
    <Sidebar>
      <div className="min-h-screen bg-background pb-24 lg:pb-8">
        <header className="px-5 lg:px-8 py-6 border-b border-border">
          <div className="flex items-center gap-3">
            <BackButton />
            <BookOpen className="w-7 h-7 text-primary" />
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
              className="group relative overflow-hidden rounded-xl bg-primary p-6 text-left shadow-sm active:scale-95 transition-all flex flex-col items-start"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-primary-foreground/10 flex items-center justify-center mb-4 text-primary-foreground">
                  <Brain className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-primary-foreground mb-1">
                  Take Quiz
                </h3>
                <p className="text-xs text-primary-foreground/80">
                  Test your knowledge
                </p>
                <div className="mt-4 flex items-center gap-1 text-primary-foreground">
                  <span className="text-xs font-semibold">Start Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
            <button
              onClick={() =>
                navigate(`/short-notes/${encodeURIComponent(subject || "")}`)
              }
              className="group relative overflow-hidden rounded-xl bg-card border border-border p-6 text-left shadow-sm active:scale-95 transition-all flex flex-col items-start hover:bg-accent hover:border-primary/50"
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-4 text-foreground">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">
                  View Short Notes
                </h3>
                <p className="text-xs text-muted-foreground">
                  Study by subject
                </p>
                <div className="mt-4 flex items-center gap-1 text-primary font-semibold">
                  <span className="text-xs">Explore</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          </div>
        </main>
      </div>
    </Sidebar>
  );
};

export default SubjectPage;
