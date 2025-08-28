import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WelcomePage from "./pages/WelcomePage";
import SettingsPage from "./pages/SettingsPage";
import NotesPage from "./pages/NotesPage";
import TriviaPage from "./pages/TriviaPage";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
    <Toaster/>
    
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/trivia" element={<TriviaPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
