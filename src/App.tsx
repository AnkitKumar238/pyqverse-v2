/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { UploadModal } from './components/UploadModal';
import { ToastContainer } from './components/ToastContainer';

// Pages
import { HomePage } from './pages/HomePage';
import { PyqExplorerPage } from './pages/PyqExplorerPage';
import { PdfViewerPage } from './pages/PdfViewerPage';
import { QuizzesPage } from './pages/QuizzesPage';
import { QuizAttemptPage } from './pages/QuizAttemptPage';
import { QuizResultsPage } from './pages/QuizResultsPage';
import { SubjectsPage } from './pages/SubjectsPage';
import { AboutPage } from './pages/AboutPage';
import { AuthPage } from './pages/AuthPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { ProgressPage } from './pages/ProgressPage';
import { FeedbackPage } from './pages/FeedbackPage';

// Helper to scroll to top on page navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#faf8ff] text-[#131b2e] font-sans antialiased selection:bg-[#eaedff] selection:text-[#2a14b4]">
          {/* Global Application Navbar */}
          <Navbar />

          {/* Main Route Content */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/pyqs" element={<PyqExplorerPage />} />
              <Route path="/pdf-viewer/:paperId" element={<PdfViewerPage />} />
              <Route path="/pdf-viewer" element={<PdfViewerPage />} />
              <Route path="/quizzes" element={<QuizzesPage />} />
              <Route path="/quiz/:quizId" element={<QuizAttemptPage />} />
              <Route path="/quiz-results/:quizId" element={<QuizResultsPage />} />
              <Route path="/subjects" element={<SubjectsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/feedback" element={<FeedbackPage />} />
              {/* Fallback to Home */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>

          {/* Global Application Footer */}
          <Footer />

          {/* Global Popups and Modals */}
          <GlobalSearchModal />
          <UploadModal />
          <ToastContainer />
        </div>
      </AppProvider>
    </BrowserRouter>
  );
}
