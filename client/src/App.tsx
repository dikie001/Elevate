import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WelcomePage from "./pages/WelcomePage";
import SettingsPage from "./pages/SettingsPage";
import NotesPage from "./pages/NotesPage";
import TriviaPage from "./pages/TriviaPage";
import { Toaster } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import LoadingModal from "./components/LoadingModal";

// interface MainTypes {
//   name: string;
//   age: string;
//   grade: string;
//   theme: string;
// }

const App = () => {
  const [isFirstVisit, setIsFirstVisit] = useState<string | null>('');

  useEffect(() => {
    loadUserData();
  }, []);

  // Load user data from local storage
  const loadUserData = () => {
    const visitStat = localStorage.getItem("isFirstVisit");
    console.log(visitStat);
    setIsFirstVisit(visitStat);
  };

  return (
    <>
      <Toaster />
      <Router>
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
        </Routes>
      </Router>
    </>
  );
};

export default App;
