import { Trophy, BookOpen, Clock, Flame } from "lucide-react";

const ProgressPage = () => {
  const progress = {
    streak: 7,
    studyTime: 12, // hours this week
    completed: 45, // topics
    goal: 60, // total goal
  };

  const percent = Math.round((progress.completed / progress.goal) * 100);

  return (
    <div className="min-h-screen p-6 bg-white text-gray-900">
      <h1 className="text-2xl font-bold mb-6">📈 Your Progress</h1>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-100 p-4 rounded-2xl flex flex-col items-center shadow">
          <Flame className="w-8 h-8 text-orange-500 mb-2" />
          <span className="text-lg font-semibold">{progress.streak} days</span>
          <p className="text-sm text-gray-600">Study Streak</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-2xl flex flex-col items-center shadow">
          <Clock className="w-8 h-8 text-blue-500 mb-2" />
          <span className="text-lg font-semibold">
            {progress.studyTime} hrs
          </span>
          <p className="text-sm text-gray-600">This Week</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-2xl flex flex-col items-center shadow">
          <BookOpen className="w-8 h-8 text-green-500 mb-2" />
          <span className="text-lg font-semibold">{progress.completed}</span>
          <p className="text-sm text-gray-600">Topics Done</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-2xl flex flex-col items-center shadow">
          <Trophy className="w-8 h-8 text-yellow-500 mb-2" />
          <span className="text-lg font-semibold">{progress.goal}</span>
          <p className="text-sm text-gray-600">Goal</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-100 p-6 rounded-2xl shadow">
        <h2 className="text-lg font-semibold mb-4">🎯 Goal Progress</h2>
        <div className="w-full bg-gray-300 h-4 rounded-full overflow-hidden">
          <div
            className="h-4 bg-blue-500 rounded-full"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {progress.completed} / {progress.goal} topics completed ({percent}%)
        </p>
      </div>
    </div>
  );
};

export default ProgressPage;
