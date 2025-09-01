import { BookOpen, Home, Settings, Trophy, UploadCloud, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStateStore } from "../store/stateStore";

// interface MainTypes {
//   name: string;
//   age: string;
//   grade: string;
//   theme: string;
// }
const DesktopSidebar = () => {
  const { user,currentRoute,setCurrentRoute } = useStateStore();
  const navigate = useNavigate();

  const links = [
    { name: "Dashboard", icon: Home, to: "/" },
    { name: "Subjects", icon: BookOpen, to: "/subjects" },
    { name: "Progress", icon: Trophy, to: "/progress" },
    { name: "Upload files", icon: UploadCloud, to: "/upload" },
    { name: "Settings", icon: Settings, to: "/settings" },
  ];

  // Handle Link clicking
  const HandleLinkClick = (params:string) => {
    navigate(params)
    setCurrentRoute(params)
  };
  return (
    <div>
      {/* Desktop Sidebar */}
      <div className=" hidden lg:flex lg:flex-col lg:w-70 left-0 top-0 h-dvh fixed bg-white/80 backdrop-blur-xl shadow-xl border-r border-gray-200/50">
        <div className="p-7 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <div className=" ">
              <img
                src="/images/elevate-logo.png"
                alt="elevate logo"
                height={50}
                width={50}
              />
            </div>
            <span className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Elevate
            </span>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-4">
          {links.map((link, index) => {
            const Icon = link.icon;
            return (
              <button
                key={index}
                onClick={() => HandleLinkClick(link.to)}
                className={`${currentRoute === link.to && 'ring-2 ring-blue-500'} w-full flex items-center space-x-4 px-4 py-3 rounded-2xl text-gray-600 hover:bg-gray-50`}
              >
                <Icon />
                <p>{link.name}</p>
              </button>
            );
          })}
        </div>
        <div className="p-6 border-t border-gray-100 ">
          <div className="flex items-center space-x-4 p-4 rounded-2xl hover:bg-gray-50 cursor-pointer ">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">{user?.name}</p>
              <p className="text-sm text-gray-500">
                {" "}
                Grade {user?.grade.slice(0, -2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopSidebar;
