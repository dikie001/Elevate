import { Menu, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import { shortQuotes } from "./Quotes";
import { useStateStore } from "../store/stateStore";

interface MainTypes {
  name: string;
  age: string;
  grade: string;
  theme: string;
}

const Navbar = () => {
  const [userData, setUserData] = useState<MainTypes>();
  const [quote, setQuote] = useState("");
  const { greeting, setOpenMobileMenu, openMobileMenu } = useStateStore();

  // Load user data
  useEffect(() => {
    const LoadData = () => {
      const data = localStorage.getItem("userData");
      if (data) {
        setUserData(JSON.parse(data));
      }
    };
    LoadData();
  }, []);

  // Randomize the greetings
  useEffect(() => {
    const Randomize = () => {
      const randomQ = Math.floor(Math.random() * shortQuotes.length);
      setQuote(shortQuotes[randomQ]);
    };

    Randomize();
  }, []);
  return (
    <div
      className={`bg-white/80 backdrop-blur-xl px-6 lg:px-8 py-4 lg:py-4 shadow-sm border-b border-gray-100/50`}
    >
      <div className={`flex items-center justify-between `}>
        <div className={`flex items-center space-x-4`}>
          <div>
            <h1
              className={`text-2xl lg:text-4xl font-black bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent`}
            >
              {greeting} {userData?.name.split(" ")[0] || "guest"}
            </h1>
            <p className={`text-gray-600 lg:text-lg mt-1`}>{quote}</p>
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
            onClick={() => setOpenMobileMenu(true)}
            className={`lg:hidden cursor-pointer p-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg active:scale-95`}
          >
            <Menu className={`w-5 h-5 text-white`} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
