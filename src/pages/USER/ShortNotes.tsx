import React from "react";
import Navbar from "@/components/app/Navbar";
import Footer from "@/components/app/Footer";
import { shortNotes } from "@/jsons/shortNotes";
import { useParams } from "react-router-dom";

const ShortNotesPage: React.FC = () => {
  const { subject } = useParams<{ subject: string }>();
  const notes = shortNotes.filter(
    (note) => note.subject === decodeURIComponent(subject || ""),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex flex-col">
      <Navbar currentPage="Short Notes" />
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-24">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Short Notes: {subject}
        </h1>
        {notes.length === 0 ? (
          <p className="text-center text-gray-500">
            No notes available for this subject.
          </p>
        ) : (
          <div className="space-y-6">
            {notes.map((note) => (
              <div
                key={note.id}
                className="rounded-xl bg-white dark:bg-gray-900 shadow p-6 border border-gray-100 dark:border-gray-800"
              >
                <h2 className="text-lg font-semibold mb-2">{note.title}</h2>
                <p className="text-gray-700 dark:text-gray-200">
                  {note.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ShortNotesPage;
