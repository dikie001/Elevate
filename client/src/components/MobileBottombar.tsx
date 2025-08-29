import { BookOpen, Home, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MobileBottombar = () => {
  const navigate = useNavigate();

  return (
    <div className="lg:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg px-4">
      <div className="bg-white dark:bg-zinc-900 shadow-lg rounded-2xl flex items-center justify-around py-3">
        <button className="flex flex-col items-center text-purple-600  ">
          <Home className="w-6 h-6" />
          <span className="text-xs font-medium mt-1">Dashboard</span>
        </button>
        <button
          onClick={() => navigate("/subjects")}
          className="flex flex-col items-center text-gray-500 hover:text-purple-600  "
        >
          <BookOpen className="w-6 h-6" />
          <span className="text-xs font-medium mt-1">Subjects</span>
        </button>
        <button className="flex flex-col items-center text-gray-500 hover:text-purple-600  ">
          <Trophy className="w-6 h-6" />
          <span className="text-xs font-medium mt-1">Progress</span>
        </button>
      </div>
    </div>
  );
};

export default MobileBottombar;
