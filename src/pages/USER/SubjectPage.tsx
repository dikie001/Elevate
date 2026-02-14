import React from "react";
import Navbar from "@/components/app/Navbar";
import Footer from "@/components/app/Footer";
import { useParams, useNavigate } from "react-router-dom";

const SubjectPage: React.FC = () => {
  const { subject } = useParams<{ subject: string }>();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex flex-col">
      <Navbar currentPage={subject || "Subject"} />
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-24">
        <h1 className="text-2xl font-bold mb-8 text-center">{subject}</h1>
        <div className="flex flex-col gap-6 items-center">
          <button
            onClick={() =>
              navigate(
                `/quick-quiz?subject=${encodeURIComponent(subject || "")}`,
              )
            }
            className="rounded-xl px-8 py-4 bg-indigo-600 text-white font-semibold text-lg shadow hover:bg-indigo-700 transition-all"
          >
            Take Quiz
          </button>
          <button
            onClick={() =>
              navigate(`/short-notes/${encodeURIComponent(subject || "")}`)
            }
            className="rounded-xl px-8 py-4 bg-white dark:bg-gray-900 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-200 font-semibold text-lg shadow hover:bg-indigo-50 dark:hover:bg-gray-800 transition-all"
          >
            View Short Notes
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SubjectPage;
