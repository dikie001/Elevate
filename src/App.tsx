import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "sonner";
import PWAInstallModal from "./components/PWAInstall";
import { USER_INFO } from "./constants";
import { useUpdateListener } from "./hooks/useUpdateListener";
import { syncQuizResultsToFirebase } from "./lib/syncQuizResultsToFirebase";
import { trackDailyLogin } from "./lib/trackDailyLogin";
import AdminDashboard from "./pages/ADMIN/AdminDashboard";
import AdminAuth from "./pages/ADMIN/Auth";
import AdminMessages from "./pages/ADMIN/Messages";
import AdminNotifications from "./pages/ADMIN/Notifications";
import AdminReports from "./pages/ADMIN/Reports";
import AdminSettings from "./pages/ADMIN/Settings";
import UsersPage from "./pages/ADMIN/Users";
import About from "./pages/SUPPORT/About";
import Help from "./pages/SUPPORT/Help";
import LoadingPage from "./pages/USER/LoadinPage";
import Results from "./pages/USER/Results";
import ShortNotesPage from "./pages/USER/ShortNotes";
import SubjectPage from "./pages/USER/SubjectPage";
import SubjectsPage from "./pages/USER/Subjects";
const HomePage = lazy(() => import("./pages/USER/HomePage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const QuizQuest = lazy(() => import("./pages/USER/QuickQuiz"));
const SettingsPage = lazy(() => import("./pages/USER/Settings"));
const ContactDeveloper = lazy(() => import("./pages/SUPPORT/ContactDeveloper"));

const App = () => {
  //Initialize the listener
  useUpdateListener();

  // Track daily logins
  useEffect(() => {
    const userData = localStorage.getItem(USER_INFO);
    if (!userData) return;

    const parsedData = userData ? JSON.parse(userData) : [];
    try {
      trackDailyLogin(parsedData.id);
      syncQuizResultsToFirebase(parsedData.id);
    } catch (err) {
      console.error(err);
    }
  }, []);
  return (
    <Router>
      <PWAInstallModal />
      <Toaster richColors position="top-center" />
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/subjects" element={<SubjectsPage />} />
          <Route path="/subject/:subject" element={<SubjectPage />} />
          <Route path="/short-notes/:subject" element={<ShortNotesPage />} />
          <Route path="/quick-quiz" element={<QuizQuest />} />
          <Route path="/results" element={<Results />} />
          <Route path="/contact-developer" element={<ContactDeveloper />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/help" element={<Help />} />
          <Route path="/admin-auth" element={<AdminAuth />} />
          <Route path="/admin/messages" element={<AdminMessages />} />
          <Route path="/admin/users" element={<UsersPage />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/reports" element={<AdminReports />} />
          <Route path="/admin/notifications" element={<AdminNotifications />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
