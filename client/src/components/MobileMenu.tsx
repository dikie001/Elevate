import { BookOpen, Home, Settings, Trophy, User } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useStateStore } from "../store/stateStore";

const MobileMenu = () => {
  const {
    currentRoute,
    setCurrentRoute,
    user,
    openMobileMenu,
    setOpenMobileMenu,
  } = useStateStore();
  const navigate = useNavigate();

  const links = [
    { name: "Dashboard", icon: Home, to: "/" },
    { name: "Subjects", icon: BookOpen, to: "/subjects" },
    { name: "Progress", icon: Trophy, to: "/progress" },
    { name: "Settings", icon: Settings, to: "/settings" },
  ];

  const handleLinkClick = (path: string) => {
    setOpenMobileMenu(false);
    setCurrentRoute(path);
    navigate(path);
  };

  return (
    <div
      className="bg-black/60 inset-0 fixed  z-60   "
      onClick={() => setOpenMobileMenu(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${
          openMobileMenu ? "translate-x-10" : "-translate-x-full"
        } bg-white p-4 flex flex-col  rounded h-screen border-b border-gray-200 shadow-lg transition-all w-90 fixed right-0 duration-500 ease-in-out`}
      >
        <img
          src="/images/bot1.png"
          alt="Bot image"
          width={200}
          className="mx-auto   "
        />

        <div className="px-4 py-2 space-y-1  flex-1  ">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = currentRoute === link.to;

            return (
              <button
                key={link.to}
                onClick={() => handleLinkClick(link.to)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  isActive
                    ? "text-blue-600 bg-blue-50 font-semibold"
                    : "text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{link.name}</span>
              </button>
            );
          })}
        </div>

        <div className="p-4 border-t border-gray-100 ">
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

export default MobileMenu;
