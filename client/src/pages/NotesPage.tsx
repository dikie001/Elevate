import {
  BookOpen,
  Calendar,
  Clock,
  Edit3,
  Eye,
  FileText,
  Home,
  Menu,
  Plus,
  Search,
  Star,
  Trash2,
  Trophy,
  User,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";

const NotesPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [quickAction, setQuickActio] = useState("");

  const subjects = [
    { name: "All", icon: "📚", color: "gray" },
    { name: "Mathematics", icon: "🧮", color: "blue" },
    { name: "Science", icon: "🔬", color: "green" },
    { name: "English", icon: "📖", color: "purple" },
    { name: "History", icon: "🏛️", color: "orange" },
  ];

  const notes = [
    {
      id: 1,
      title: "Quadratic Equations",
      subject: "Mathematics",
      content:
        "Notes on solving quadratic equations using the quadratic formula and factoring methods...",
      date: "2024-01-15",
      time: "2:30 PM",
      starred: true,
      color: "blue",
    },
    {
      id: 2,
      title: "Photosynthesis Process",
      subject: "Science",
      content:
        "Detailed explanation of how plants convert sunlight, water, and CO2 into glucose...",
      date: "2024-01-14",
      time: "10:15 AM",
      starred: false,
      color: "green",
    },
    {
      id: 3,
      title: "Shakespeare's Hamlet",
      subject: "English",
      content:
        "Character analysis and themes in Hamlet. Key quotes and their significance...",
      date: "2024-01-13",
      time: "4:45 PM",
      starred: true,
      color: "purple",
    },
    {
      id: 4,
      title: "World War II Timeline",
      subject: "History",
      content:
        "Important dates and events during WWII, including major battles and turning points...",
      date: "2024-01-12",
      time: "11:20 AM",
      starred: false,
      color: "orange",
    },
    {
      id: 5,
      title: "Calculus Derivatives",
      subject: "Mathematics",
      content:
        "Rules for finding derivatives, including power rule, product rule, and chain rule...",
      date: "2024-01-11",
      time: "3:15 PM",
      starred: false,
      color: "blue",
    },
    {
      id: 6,
      title: "Chemical Bonding",
      subject: "Science",
      content:
        "Types of chemical bonds: ionic, covalent, and metallic bonds with examples...",
      date: "2024-01-10",
      time: "9:30 AM",
      starred: true,
      color: "green",
    },
  ];

  const filteredNotes = notes.filter((note) => {
    const matchesSubject =
      selectedSubject === "All" || note.subject === selectedSubject;
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  const getColorClasses = (color) => {
    const colorMap = {
      blue: "from-blue-500 to-cyan-500",
      green: "from-green-500 to-emerald-500",
      purple: "from-purple-500 to-violet-500",
      orange: "from-orange-500 to-red-500",
      gray: "from-gray-500 to-slate-500",
    };
    return colorMap[color] || colorMap.gray;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex">
      {/* Mobile Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
          <div className="absolute left-0 top-0 h-full w-80 bg-white/95 backdrop-blur-xl shadow-2xl transform transition-all duration-300">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Elevate
                  </span>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <button className="w-full flex items-center space-x-3 p-4 rounded-2xl text-gray-600 hover:bg-gray-50 transition-all hover:scale-105">
                  <Home className="w-5 h-5" />
                  <span className="font-semibold">Dashboard</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-4 rounded-2xl text-gray-600 hover:bg-gray-50 transition-all hover:scale-105">
                  <BookOpen className="w-5 h-5" />
                  <span className="font-semibold">Subjects</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 transition-all hover:scale-105">
                  <FileText className="w-5 h-5" />
                  <span className="font-semibold">Notes</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-4 rounded-2xl text-gray-600 hover:bg-gray-50 transition-all hover:scale-105">
                  <Trophy className="w-5 h-5" />
                  <span className="font-semibold">Progress</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-80 bg-white/80 backdrop-blur-xl shadow-xl border-r border-gray-200/50">
        <div className="p-8 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Elevate
            </span>
          </div>
        </div>

        <nav className="flex-1 p-6 space-y-3">
          <button className="w-full flex items-center space-x-4 px-6 py-4 rounded-2xl text-gray-600 hover:bg-gray-50 transition-all hover:scale-105">
            <Home className="w-6 h-6" />
            <span className="font-semibold text-lg">Dashboard</span>
          </button>
          <button className="w-full flex items-center space-x-4 px-6 py-4 rounded-2xl text-gray-600 hover:bg-gray-50 transition-all hover:scale-105">
            <BookOpen className="w-6 h-6" />
            <span className="font-semibold text-lg">Subjects</span>
          </button>
          <button className="w-full flex items-center space-x-4 px-6 py-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 transition-all hover:scale-105 shadow-sm">
            <FileText className="w-6 h-6" />
            <span className="font-semibold text-lg">Notes</span>
          </button>
          <button className="w-full flex items-center space-x-4 px-6 py-4 rounded-2xl text-gray-600 hover:bg-gray-50 transition-all hover:scale-105">
            <Trophy className="w-6 h-6" />
            <span className="font-semibold text-lg">Progress</span>
          </button>
        </nav>

        <div className="p-6 border-t border-gray-100">
          <div className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-gray-50 cursor-pointer transition-all hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">{}</p>
              <p className="text-sm text-gray-500">Grade 11</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl px-6 lg:px-8 py-6 lg:py-8 shadow-sm border-b border-gray-100/50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button
                className="lg:hidden p-3 rounded-2xl hover:bg-gray-100 transition-all hover:scale-110"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="w-6 h-6 text-gray-600" />
              </button>

              <div>
                <h1 className="text-2xl lg:text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  My Notes 📝
                </h1>
                <p className="text-gray-600 lg:text-lg mt-1">
                  All your study notes in one place
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <Plus className="w-5 h-5" />
                <span className="font-semibold hidden sm:block">New Note</span>
              </button>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4 bg-gray-50/80 backdrop-blur-sm rounded-2xl border-2 border-transparent focus:border-indigo-300 focus:bg-white transition-all outline-none text-lg"
              />
            </div>

            {/* Subject Filter */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 lg:pb-0">
              {subjects.map((subject) => (
                <button
                  key={subject.name}
                  onClick={() => setSelectedSubject(subject.name)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-2xl font-semibold transition-all hover:scale-105 whitespace-nowrap ${
                    selectedSubject === subject.name
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                      : "bg-white/80 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-sm">{subject.icon}</span>
                  <span>{subject.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notes Grid */}
        <div className="flex-1 px-6 lg:px-8 py-8">
          <div className="max-w-7xl mx-auto">
            {filteredNotes.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  No notes found
                </h3>
                <p className="text-gray-500 mb-8">
                  Try adjusting your search or create a new note
                </p>
                <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105 mx-auto">
                  <Plus className="w-5 h-5" />
                  <span className="font-semibold">Create Your First Note</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNotes.map((note) => (
                  <div
                    key={note.id}
                    className="group bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 cursor-pointer border border-gray-100"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-12 h-12 bg-gradient-to-r ${getColorClasses(
                          note.color
                        )} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                      >
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex items-center space-x-2">
                        {note.starred && (
                          <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        )}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                          <button className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
                            <Eye className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
                            <Edit3 className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2">
                      {note.title}
                    </h3>

                    <div className="flex items-center space-x-2 mb-3">
                      <span
                        className={`px-3 py-1 bg-gradient-to-r ${getColorClasses(
                          note.color
                        )} text-white text-sm font-semibold rounded-full`}
                      >
                        {note.subject}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {note.content}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{note.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{note.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredNotes.length > 0 && (
              <div className="text-center mt-12">
                <p className="text-gray-500">
                  Showing {filteredNotes.length} of {notes.length} notes
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesPage;
