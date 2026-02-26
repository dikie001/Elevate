import React from "react";
import Sidebar from "@/components/app/Sidebar";
import { BackButton } from "@/components/layout";
import { shortNotes } from "@/jsons/shortNotes";
import { useParams } from "react-router-dom";

const ShortNotesPage: React.FC = () => {
  const { subject } = useParams<{ subject: string }>();
  const notes = shortNotes.filter(
    (note) => note.subject === decodeURIComponent(subject || ""),
  );

  return (
    <Sidebar>
      <div className="min-h-screen bg-background pb-24 lg:pb-8">
        <header className="px-5 lg:px-8 py-6 border-b border-border">
          <div className="flex items-center gap-3">
            <BackButton />
            <h1 className="text-xl lg:text-2xl font-bold">
              Short Notes: {subject}
            </h1>
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-5 lg:px-8 pt-8">
          {notes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No notes available for this subject.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="rounded-xl bg-card shadow-sm hover:shadow-md transition-shadow p-6 border border-border"
                >
                  <h2 className="text-lg font-bold mb-3 text-primary">
                    {note.title}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {note.content}
                  </p>
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
