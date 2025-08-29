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
          <Route path="/subjects" element={<SubjectsPage />} />
          <Route path="/trivia" element={<TriviaPage />} />
          <Route path="/trivia" element={<TriviaPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
