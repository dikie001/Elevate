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
      <div className="min-h-screen bg-gradient-to-br from-purple-50/50 via-white to-blue-50/50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 pb-24 lg:pb-8">
        <header className="px-5 lg:px-8 py-6 border-b border-gray-200/50 dark:border-gray-800/50">
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
              <p className="text-gray-500 dark:text-gray-400">
                No notes available for this subject.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="rounded-2xl bg-white dark:bg-gray-800/50 shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100 dark:border-gray-800"
                >
                  <h2 className="text-lg font-bold mb-3 text-purple-600 dark:text-purple-400">
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
