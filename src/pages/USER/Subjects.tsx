import React from "react";
import Navbar from "@/components/app/Navbar";
import Footer from "@/components/app/Footer";
import { subjects } from "@/jsons/subjects";
import { useNavigate } from "react-router-dom";

const SubjectsPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex flex-col">
      <Navbar currentPage="Subjects" />
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-24">
        <h1 className="text-3xl font-bold mb-8 text-center">Subjects</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {subjects.map((subject) => (
            <button
              key={subject}
              onClick={() =>
                navigate(`/subject/${encodeURIComponent(subject)}`)
              }
              className="rounded-2xl p-6 bg-white dark:bg-gray-900 shadow hover:shadow-lg border border-gray-100 dark:border-gray-800 text-lg font-semibold text-indigo-700 dark:text-indigo-200 transition-all"
            >
              {subject}
            </button>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SubjectsPage;
