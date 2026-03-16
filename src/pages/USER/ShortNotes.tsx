import React from "react";
import Sidebar from "@/components/app/Sidebar";
import { BackButton } from "@/components/layout";
import { shortNotes } from "@/jsons/shortNotes";
import { useParams } from "react-router-dom";
import { BookOpen, Sparkles } from "lucide-react";

const ShortNotesPage: React.FC = () => {
  const { subject } = useParams<{ subject: string }>();
  const notes = shortNotes.filter(
    (note) => note.subject === decodeURIComponent(subject || ""),
  );

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
              <h1 className="text-xl lg:text-3xl font-black tracking-tight text-foreground">
                {subject}
              </h1>
              <p className="text-xs font-bold text-primary/70 uppercase tracking-widest mt-0.5">
                Short Notes & Summaries
              </p>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-5 lg:px-8 pt-10">
          {notes.length === 0 ? (
            <div className="text-center py-20 glass rounded-[2.5rem] border border-dashed border-border/50">
              <BookOpen className="w-16 h-16 text-muted-foreground/20 mx-auto mb-6" />
              <p className="text-xl font-black text-muted-foreground uppercase tracking-widest">
                No notes found
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {notes.map((note, idx) => (
                <div
                  key={note.id}
                  className="glass rounded-[2rem] p-8 md:p-10 border border-border shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-primary/5 group"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="flex items-start justify-between mb-6">
                    <h2 className="text-2xl font-black tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {note.title}
                    </h2>
                    <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/10">
                      Module {idx + 1}
                    </div>
                  </div>
                  <p className="text-muted-foreground font-medium leading-relaxed text-lg">
                    {note.content}
                  </p>

                  <div className="mt-8 pt-8 border-t border-border/30 flex items-center justify-between">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                      Quick Revision Card
                    </span>
                    <div className="w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-primary border border-primary/10">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </Sidebar>
  );
};

export default ShortNotesPage;
