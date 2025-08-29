import { ChevronRight, Plus, Search, Trophy, User } from "lucide-react";
import DesktopSidebar from "../components/DesktopSidebar";
import { act, useEffect, useState } from "react";
import { SubjectSelectionModal } from "../modals/SelectSubjectModal";
import { useStateStore } from "../store/stateStore";
import MobileBottombar from "../components/MobileBottombar";

interface MainTypes {
  name: string;
  age: string;
  grade: string;
  theme: string;
}

const HomePage = () => {
  const { user, setUser } = useStateStore();
  const [userData, setUserData] = useState<MainTypes>();
  const [greeting, setGreeting] = useState("");
  const [showSelectSubjectModal, setShowSubjectModal] = useState(false);
  const greetings = [
    "Hi",
    "Hey",
    "Hello",
    "Hola",
    "Sup",
    "Greetings",
    "Howdy",
    "Salutations",
    "Hey there",
    "Welcome",
    "Yoho",
    "Ahoy",
    "Bonjour",
    "Ciao",
    "Halla",
    "Hiya",
    "Namaste",
    "Shalom",
    "Aloha",
    "G'day",
  ];

  // Randomize the greetings
  useEffect(() => {
    const Randomize = () => {
      const random = Math.floor(Math.random() * 19);
      setGreeting(greetings[random]);
    };

    Randomize();
  }, []);

  // Load data
  useEffect(() => {
    const LoadData = () => {
      const data = localStorage.getItem("userData");
      if (data) {
        setUserData(JSON.parse(data));
        setUser(JSON.parse(data));
      }
    };
    LoadData();
  }, []);

  const subjects = [
    { name: "Mathematics", icon: "🧮", gradient: "from-blue-500 to-cyan-500" },
    { name: "Science", icon: "🔬", gradient: "from-green-500 to-emerald-500" },
    { name: "English", icon: "📖", gradient: "from-purple-500 to-violet-500" },
    { name: "History", icon: "🏛️", gradient: "from-orange-500 to-red-500" },
  ];

  const quickActions = [
    {
      title: "Start Quiz",
      icon: "⚡",
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      title: "Study Notes",
      icon: "📝",
      gradient: "from-blue-500 to-purple-500",
    },
    { title: "Practice", icon: "🎯", gradient: "from-green-500 to-teal-500" },
    { title: "Progress", icon: "📊", gradient: "from-pink-500 to-rose-500" },
  ];

  // Handle Quick Actions
  const HandleQuickActions = (action: string) => {
    if (action === "Start Quiz" || action === "Study Notes") {
      setShowSubjectModal(true);
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex`}
    >
      <DesktopSidebar />
      <MobileBottombar/>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col lg:ml-80`}>
        {/* Header */}
        <div
          className={`bg-white/80 backdrop-blur-xl px-6 lg:px-8 py-6 lg:py-8 shadow-sm border-b border-gray-100/50`}
        >
          <div className={`flex items-center justify-between `}>
            <div className={`flex items-center space-x-4`}>
              <div>
                <h1
                  className={`text-2xl lg:text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent`}
                >
                  {greeting} {userData?.name.split(" ")[0] || "guest"}
                </h1>
                <p className={`text-gray-600 lg:text-lg mt-1`}>
                  Ready to elevate your learning?
                </p>
              </div>
            </div>

            <div className={`flex items-center space-x-3`}>
              <div
                className={`hidden lg:flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl`}
              >
                <Trophy className={`w-5 h-5 text-indigo-600`} />
                <span className={`font-semibold text-indigo-600`}>Level 5</span>
              </div>
              <button
                className={`lg:hidden p-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg hover:scale-110 transition-transform`}
              >
                <User className={`w-5 h-5 text-white`} />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {/* <div className={`relative max-w-2xl`}>
            <Search
              className={`absolute left-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400`}
            />
            <input
              type="text"
              placeholder="Search anything you want to learn..."
              className={`w-full pl-14 pr-6 py-4 bg-gray-50/80 backdrop-blur-sm rounded-2xl border-2 border-transparent focus:border-indigo-300 focus:bg-white transition-all outline-none text-lg`}
            />
          </div> */}
        </div>

        {/* Main Dashboard */}
        <div className={`flex-1 px-6 lg:px-8 py-8`}>
          <div className={`max-w-7xl mx-auto`}>
            {/* Quick Actions */}
            <div className={`mb-12`}>
              <h2
                className={`text-2xl lg:text-3xl font-bold text-gray-900 mb-6`}
              >
                Quick Start
              </h2>
              <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6`}>
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => HandleQuickActions(action.title)}
                    className={`group relative p-6 lg:p-8 rounded-3xl bg-gradient-to-r ${action.gradient} text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 hover:-translate-y-2`}
                  >
                    <div
                      className={`absolute inset-0 bg-white/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity`}
                    ></div>
                    <div className={`relative`}>
                      <div className={`text-3xl lg:text-4xl mb-3`}>
                        {action.icon}
                      </div>
                      <div className={`font-bold text-lg lg:text-xl`}>
                        {action.title}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8`}>
              {/* Subjects */}
              <div className={`lg:col-span-2`}>
                <div className={`flex items-center justify-between mb-6`}>
                  <h2
                    className={`text-2xl lg:text-3xl font-bold text-gray-900`}
                  >
                    Your Subjects
                  </h2>
                  <button
                    className={`flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105`}
                  >
                    <Plus className={`w-5 h-5`} />
                    <span className={`font-semibold`}>Add Subject</span>
                  </button>
                </div>

                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6`}>
                  {subjects.map((subject, index) => (
                    <div
                      key={index}
                      className={`group bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer border border-gray-100`}
                    >
                      <div className={`flex items-center justify-between`}>
                        <div className={`flex items-center space-x-4`}>
                          <div
                            className={`w-16 h-16 bg-gradient-to-r ${subject.gradient} rounded-3xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform`}
                          >
                            {subject.icon}
                          </div>
                          <div>
                            <h3 className={`font-bold text-xl text-gray-900`}>
                              {subject.name}
                            </h3>
                            <p className={`text-gray-500`}>
                              Start learning now
                            </p>
                          </div>
                        </div>
                        <ChevronRight
                          className={`w-6 h-6 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Today's Progress */}
              <div className={`space-y-6`}>
                <div
                  className={`bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl hover:shadow-3xl transition-all hover:scale-105`}
                >
                  <div className={`flex items-center justify-between mb-6`}>
                    <h3 className={`text-xl font-bold`}>Today's Goal</h3>
                    <div
                      className={`w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center`}
                    >
                      <Trophy className={`w-6 h-6`} />
                    </div>
                  </div>
                  <p className={`text-indigo-100 mb-6 text-lg`}>
                    Study for 1 hour
                  </p>
                  <div className={`bg-white/20 rounded-full h-4 mb-3`}>
                    <div
                      className={`bg-white rounded-full h-4 w-1/4 shadow-lg`}
                    ></div>
                  </div>
                  <p className={`text-sm text-indigo-100`}>
                    15 / 60 minutes completed
                  </p>
                </div>

                {/* Achievement */}
                <div
                  className={`bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-gray-100 hover:scale-105 transition-transform`}
                >
                  <div className={`text-center`}>
                    <div
                      className={`w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                    >
                      <span className={`text-2xl`}>🏆</span>
                    </div>
                    <h3 className={`font-bold text-lg text-gray-900 mb-2`}>
                      Keep Going!
                    </h3>
                    <p className={`text-gray-500`}>
                      You're doing amazing. Complete today's goal to unlock
                      rewards!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODALS */}
      {showSelectSubjectModal && <SubjectSelectionModal />}
    </div>
  );
};

export default HomePage;
