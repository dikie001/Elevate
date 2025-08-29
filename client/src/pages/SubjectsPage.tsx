import React, { useState } from "react";
import {
  BookOpen,
  Users,
  Calculator,
  Microscope,
  Heart,
  Wrench,
  Globe,
  Church,
  Briefcase,
  Sprout,
  Lightbulb,
  Dumbbell,
  ChevronRight,
  Star,
} from "lucide-react";
import DesktopSidebar from "../components/DesktopSidebar";
import Topbar from "../components/Navbar";

const SubjectsPage: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [hoveredSubject, setHoveredSubject] = useState<string | null>(null);

  const subjects = [
    {
      name: "English",
      description:
        "Language arts, literature, communication skills, and creative writing",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      name: "Kiswahili ",
      description: "National language proficiency and cultural understanding",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      name: "Mathematics",
      description: "Numerical literacy, problem-solving, and logical reasoning",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      name: "Integrated Science",
      description: "Scientific inquiry, experimentation, and natural phenomena",
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-50",
      textColor: "text-cyan-600",
    },
    {
      name: "Health Education",
      description:
        "Physical wellness, nutrition, and personal health management",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      textColor: "text-red-600",
    },
    {
      name: "Pre-Technical and Pre-Career Education",
      description:
        "Technical skills, career exploration, and hands-on learning",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
    },
    {
      name: "Social Studies",
      description: "Geography, history, civics, and cultural awareness",
      color: "from-teal-500 to-teal-600",
      bgColor: "bg-teal-50",
      textColor: "text-teal-600",
    },
    {
      name: "Religious Education ",
      description: "Moral values, spiritual development, and ethical reasoning",
      color: "from-indigo-500 to-indigo-600",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
    },
    {
      name: "Business Studies",
      description:
        "Entrepreneurship, financial literacy, and business principles",
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
    {
      name: "Agriculture",
      description:
        "Farming techniques, environmental stewardship, and food security",
      color: "from-lime-500 to-lime-600",
      bgColor: "bg-lime-50",
      textColor: "text-lime-600",
    },
    {
      name: "Life Skills Education",
      description:
        "Personal development, social skills, and emotional intelligence",
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
    },
    {
      name: "Sports and Physical Education",
      description: "Physical fitness, teamwork, and recreational activities",
      color: "from-pink-500 to-pink-600",
      bgColor: "bg-pink-50",
      textColor: "text-pink-600",
    },
  ];

  const getSubjectIcon = (subject: string, color: string) => {
    const iconProps = { className: `w-7 h-7 ${color}` };

    switch (subject) {
      case "English":
        return <BookOpen {...iconProps} />;
      case "Kiswahili or Kenyan Sign Language":
        return <Users {...iconProps} />;
      case "Mathematics":
        return <Calculator {...iconProps} />;
      case "Integrated Science":
        return <Microscope {...iconProps} />;
      case "Health Education":
        return <Heart {...iconProps} />;
      case "Pre-Technical and Pre-Career Education":
        return <Wrench {...iconProps} />;
      case "Social Studies":
        return <Globe {...iconProps} />;
      case "Religious Education (CRE, IRE, or HRE)":
        return <Church {...iconProps} />;
      case "Business Studies":
        return <Briefcase {...iconProps} />;
      case "Agriculture":
        return <Sprout {...iconProps} />;
      case "Life Skills Education":
        return <Lightbulb {...iconProps} />;
      case "Sports and Physical Education":
        return <Dumbbell {...iconProps} />;
      default:
        return <BookOpen {...iconProps} />;
    }
  };

  const handleSubjectClick = (subjectName: string) => {
    setSelectedSubject(selectedSubject === subjectName ? null : subjectName);
  };

  return (
    <>
      <div
        className={`min-h-screen lg:ml-70 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 `}
      >
        <DesktopSidebar />
        <Topbar />
        <div className={`max-w-7xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:px-8`}>
          {/* Header */}
          <div className={`text-center mb-8 sm:mb-12`}>
            <div
              className={`inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-6`}
            >
              <Star className={`w-8 h-8 text-white`} />
            </div>
            <h1
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4`}
            >
              Kenyan Curriculum Subjects
            </h1>
            <p
              className={`text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed`}
            >
              Discover the comprehensive range of subjects in Kenya's
              Competency-Based Curriculum (CBC). Click on any subject to learn
              more about what students explore.
            </p>
          </div>

          {/* Subjects Grid */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 mb-12`}
          >
            {subjects.map((subject, index) => (
              <div
                key={index}
                onClick={() => handleSubjectClick(subject.name)}
                onMouseEnter={() => setHoveredSubject(subject.name)}
                onMouseLeave={() => setHoveredSubject(null)}
                className={`
                group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl 
                transition-all duration-300 cursor-pointer border border-gray-100
                transform hover:-translate-y-2 hover:scale-105 active:scale-95
                ${
                  selectedSubject === subject.name
                    ? "ring-4 ring-blue-500 ring-opacity-50 shadow-2xl"
                    : ""
                }
                ${hoveredSubject === subject.name ? "shadow-xl" : ""}
              `}
              >
                {/* Gradient overlay for selected state */}
                {selectedSubject === subject.name && (
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${subject.color} opacity-5 rounded-2xl`}
                  />
                )}

                <div className={`p-4 sm:p-6`}>
                  {/* Icon and Title */}
                  <div className={`flex items-start space-x-4 mb-4`}>
                    <div
                      className={`flex-shrink-0 p-3 ${subject.bgColor} rounded-xl group-hover:scale-110 transition-transform duration-200`}
                    >
                      {getSubjectIcon(subject.name, subject.textColor)}
                    </div>
                    <div className={`flex-1 min-w-0`}>
                      <h3
                        className={`text-lg sm:text-xl font-bold text-gray-900 leading-tight mb-2 group-hover:${subject.textColor} transition-colors duration-200`}
                      >
                        {subject.name}
                      </h3>
                      <div
                        className={`flex items-center text-xs sm:text-sm ${subject.textColor} font-medium`}
                      >
                        <span
                          className={`${subject.bgColor} px-2 py-1 rounded-full`}
                        >
                          Subject {index + 1}
                        </span>
                      </div>
                    </div>
                    <ChevronRight
                      className={`
                    w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-all duration-200
                    ${
                      selectedSubject === subject.name
                        ? "rotate-90 text-blue-500"
                        : "group-hover:translate-x-1"
                    }
                  `}
                    />
                  </div>

                  {/* Description - shown when selected */}
                  <div
                    className={`
                  overflow-hidden transition-all duration-400 ease-in-out
                  ${
                    selectedSubject === subject.name
                      ? "max-h-32 opacity-100 mt-4"
                      : "max-h-0 opacity-0"
                  }
                `}
                  >
                    <div className={`pt-4 border-t border-gray-100`}>
                      <p className={`text-sm text-gray-600 leading-relaxed`}>
                        {subject.description}
                      </p>
                    </div>
                    <div
                      className="mt-2  gap-4 flex absolute -translate-y-8 top-0 right-1/2 translate-x-1/2 "
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => alert("hey")}
                        className="bg-white px-4 py-3 ring-3 ring-blue-500 font-medium rounded-2xl shadow-lg"
                      >
                        Notes
                      </button>
                      <button className="ring-3 ring-blue-500 px-4 py-3 bg-white font-medium rounded-2xl shadow-lg">
                        Trivia
                      </button>
                    </div>
                  </div>

                  {/* Click indicator */}
                  <div
                    className={`
                  absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200
                  ${selectedSubject === subject.name ? "opacity-100" : ""}
                `}
                  >
                    <div
                      className={`w-2 h-2 bg-blue-500 rounded-full animate-pulse`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Statistics */}
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8`}>
            <div
              className={`bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100`}
            >
              <div className={`text-3xl font-bold text-blue-600 mb-2`}>
                {subjects.length}
              </div>
              <div className={`text-gray-600 font-medium`}>Core Subjects</div>
            </div>
            <div
              className={`bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100`}
            >
              <div className={`text-3xl font-bold text-green-600 mb-2`}>
                100%
              </div>
              <div className={`text-gray-600 font-medium`}>
                Competency-Based
              </div>
            </div>
            <div
              className={`bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100`}
            >
              <div className={`text-3xl font-bold text-purple-600 mb-2`}>
                CBC
              </div>
              <div className={`text-gray-600 font-medium`}>
                Curriculum System
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className={`text-center`}>
            <div
              className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100`}
            >
              <h2
                className={`text-xl sm:text-2xl font-bold text-gray-900 mb-4`}
              >
                Interactive Learning Experience
              </h2>
              <p
                className={`text-gray-600 leading-relaxed max-w-4xl mx-auto text-sm sm:text-base`}
              >
                Click on any subject card above to explore detailed information
                about what students learn. The CBC approach emphasizes practical
                skills, critical thinking, and real-world application across all
                these essential learning areas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubjectsPage;
