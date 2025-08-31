import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoadingModal from "./components/LoadingModal";
import HomePage from "./pages/HomePage";
import NotesPage from "./pages/NotesPage";
import SettingsPage from "./pages/SettingsPage";
import TriviaPage from "./pages/TriviaPage";
import WelcomePage from "./pages/WelcomePage";
import SubjectsPage from "./pages/SubjectsPage";
import ProgressPage from "./pages/ProgressPage";
import { useStateStore } from "./store/stateStore";
import MobileMenu from "./components/MobileMenu";
import TriviaGame from "./pages/TriviaGame";
import AuthPage from "./pages/AuthPage";

const App = () => {
  const [isFirstVisit, setIsFirstVisit] = useState<string | null>("");
  const { setGreeting, openMobileMenu } = useStateStore();
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

  useEffect(() => {
    loadUserData();

    // Randomize greetings
    const random = Math.floor(Math.random() * 19);
    setGreeting(greetings[random]);
  }, []);

  // Load user data from local storage
  const loadUserData = () => {
    const visitStat = localStorage.getItem("isFirstVisit");
    setIsFirstVisit(visitStat);
  };

  return (
    <>
      <Toaster />
      <Router>
        {openMobileMenu && <MobileMenu />}

        <Routes>
          <Route
            path="/"
            element={
              isFirstVisit === "false" ? (
                <HomePage />
              ) : isFirstVisit === null ? (
                <WelcomePage />
              ) : (
                <LoadingModal />
              )
            }
          />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/trivia" element={<TriviaPage />} />
          <Route path="/subjects" element={<SubjectsPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/trivia-game" element={<TriviaGame />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
