import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  PYQPaper, 
  QuizAttemptRecord, 
  UserProfile, 
  InProgressQuizAttempt, 
  FeedbackSubmission, 
  UserSettings, 
  RegisteredAccount 
} from '../types';
import { MOCK_PAPERS } from '../data/mockData';

export const CURATED_AVATARS = [
  { id: 'av-1', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', label: 'Scholar 1' },
  { id: 'av-2', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80', label: 'Scholar 2' },
  { id: 'av-3', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', label: 'Scholar 3' },
  { id: 'av-4', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', label: 'Scholar 4' },
  { id: 'av-5', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', label: 'Scholar 5' },
  { id: 'av-6', url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80', label: 'Default Aspirant' },
];

export const DEFAULT_USER_SETTINGS: UserSettings = {
  dailyReminders: true,
  examAlerts: true,
  showTimerAnimations: true,
  multiDeviceCloudSync: true,
  preferredLanguage: 'English',
  soundEffects: false
};

const DEFAULT_GUEST_USER: UserProfile = {
  id: 'guest_user',
  name: 'Guest Aspirant',
  email: '',
  targetExam: 'UPSC Civil Services',
  targetYear: 2025,
  avatarUrl: CURATED_AVATARS[5].url,
  bio: 'Exploring national competitive exam past papers and mock tests as a guest.',
  joinedDate: new Date().toISOString(),
  isLoggedIn: false,
  savedPaperIds: ['upsc-cse-prelims-2024-gs1', 'gate-cs-2024-shift1'],
  quizHistory: [],
  attemptedPapersCount: 2,
  settings: DEFAULT_USER_SETTINGS
};

// Default seed accounts for multi-user simulation
const SEED_ACCOUNTS: Record<string, RegisteredAccount> = {
  'aditya.upsc@aspirant.in': {
    id: 'usr_aditya_upsc',
    email: 'aditya.upsc@aspirant.in',
    profile: {
      id: 'usr_aditya_upsc',
      name: 'Aditya Verma',
      email: 'aditya.upsc@aspirant.in',
      targetExam: 'UPSC Civil Services',
      targetYear: 2025,
      avatarUrl: CURATED_AVATARS[2].url,
      bio: 'Preparing for UPSC CSE 2025 with History Optional. Targeting top rank in General Studies.',
      joinedDate: '2024-11-12T00:00:00.000Z',
      isLoggedIn: true,
      savedPaperIds: ['upsc-cse-prelims-2024-gs1', 'upsc-cse-prelims-2023-gs1'],
      quizHistory: [
        {
          quizId: 'upsc-gs1-daily-sprint',
          quizTitle: 'UPSC General Studies Practice',
          completedAt: new Date(Date.now() - 172800000).toISOString(),
          score: 15.34,
          totalMarks: 20,
          percentage: 77,
          timeSpentSeconds: 680,
          totalTimeSeconds: 900,
          answers: { 'upsc-q1': 0, 'upsc-q2': 1, 'upsc-q3': 3 },
          markedQuestions: [],
          correctCount: 8,
          incorrectCount: 1,
          unattemptedCount: 1,
          negativeDeductions: 0.66
        }
      ],
      attemptedPapersCount: 5,
      settings: DEFAULT_USER_SETTINGS
    },
    bookmarks: ['upsc-cse-prelims-2024-gs1', 'upsc-cse-prelims-2023-gs1'],
    quizHistory: [
      {
        quizId: 'upsc-gs1-daily-sprint',
        quizTitle: 'UPSC General Studies Practice',
        completedAt: new Date(Date.now() - 172800000).toISOString(),
        score: 15.34,
        totalMarks: 20,
        percentage: 77,
        timeSpentSeconds: 680,
        totalTimeSeconds: 900,
        answers: { 'upsc-q1': 0, 'upsc-q2': 1, 'upsc-q3': 3 },
        markedQuestions: [],
        correctCount: 8,
        incorrectCount: 1,
        unattemptedCount: 1,
        negativeDeductions: 0.66
      }
    ],
    inProgressQuizzes: {},
    createdAt: '2024-11-12T00:00:00.000Z',
    lastLoginAt: new Date().toISOString()
  },
  'priya.ssc@aspirant.in': {
    id: 'usr_priya_ssc',
    email: 'priya.ssc@aspirant.in',
    profile: {
      id: 'usr_priya_ssc',
      name: 'Priya Sharma',
      email: 'priya.ssc@aspirant.in',
      targetExam: 'SSC CGL',
      targetYear: 2025,
      avatarUrl: CURATED_AVATARS[0].url,
      bio: 'SSC CGL aspirant focusing on Quantitative Aptitude and Logical Reasoning.',
      joinedDate: '2025-01-05T00:00:00.000Z',
      isLoggedIn: true,
      savedPaperIds: ['ssc-cgl-tier1-2024-shift1'],
      quizHistory: [
        {
          quizId: 'ssc-cgl-quant-sprint',
          quizTitle: 'SSC CGL Quantitative Aptitude Mock Test',
          completedAt: new Date(Date.now() - 86400000).toISOString(),
          score: 16.0,
          totalMarks: 20,
          percentage: 80,
          timeSpentSeconds: 520,
          totalTimeSeconds: 900,
          answers: { 'ssc-q1': 0, 'ssc-q2': 1, 'ssc-q3': 2 },
          markedQuestions: [],
          correctCount: 8,
          incorrectCount: 1,
          unattemptedCount: 1,
          negativeDeductions: 0.5
        }
      ],
      attemptedPapersCount: 8,
      settings: DEFAULT_USER_SETTINGS
    },
    bookmarks: ['ssc-cgl-tier1-2024-shift1'],
    quizHistory: [
      {
        quizId: 'ssc-cgl-quant-sprint',
        quizTitle: 'SSC CGL Quantitative Aptitude Mock Test',
        completedAt: new Date(Date.now() - 86400000).toISOString(),
        score: 16.0,
        totalMarks: 20,
        percentage: 80,
        timeSpentSeconds: 520,
        totalTimeSeconds: 900,
        answers: { 'ssc-q1': 0, 'ssc-q2': 1, 'ssc-q3': 2 },
        markedQuestions: [],
        correctCount: 8,
        incorrectCount: 1,
        unattemptedCount: 1,
        negativeDeductions: 0.5
      }
    ],
    inProgressQuizzes: {},
    createdAt: '2025-01-05T00:00:00.000Z',
    lastLoginAt: new Date().toISOString()
  }
};

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface AppContextType {
  user: UserProfile;
  selectedExamCategory: string;
  setSelectedExamCategory: (catId: string) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  updateUserTarget: (targetExam: string, targetYear: number | string) => void;
  updateUserSettings: (settings: Partial<UserSettings>) => void;
  bookmarks: string[];
  toggleBookmark: (paperId: string) => void;
  isBookmarked: (paperId: string) => boolean;
  downloadPaper: (paper: PYQPaper) => void;
  quizAttempts: QuizAttemptRecord[];
  saveQuizAttempt: (attempt: QuizAttemptRecord) => void;
  inProgressQuizzes: Record<string, InProgressQuizAttempt>;
  saveInProgressQuiz: (attempt: InProgressQuizAttempt) => void;
  clearInProgressQuiz: (quizId: string) => void;
  getInProgressQuiz: (quizId: string) => InProgressQuizAttempt | undefined;
  feedbackSubmissions: FeedbackSubmission[];
  submitFeedback: (feedback: Omit<FeedbackSubmission, 'id' | 'submittedAt' | 'isGuest'>) => void;
  searchModalOpen: boolean;
  setSearchModalOpen: (open: boolean) => void;
  uploadModalOpen: boolean;
  setUploadModalOpen: (open: boolean) => void;
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  dismissToast: (id: string) => void;
  login: (credentials: { email: string; name?: string; targetExam?: string; targetYear?: number | string; bio?: string; avatarUrl?: string }) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Account registry for multi-user / multi-device simulation
  const [accountsRegistry, setAccountsRegistry] = useState<Record<string, RegisteredAccount>>(() => {
    const saved = localStorage.getItem('pyqverse_accounts_registry');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return SEED_ACCOUNTS;
  });

  // Current active user
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('pyqverse_active_user');
    if (saved) {
      try { 
        const parsed = JSON.parse(saved);
        return parsed;
      } catch (e) { /* ignore */ }
    }
    return DEFAULT_GUEST_USER;
  });

  const [selectedExamCategory, setSelectedExamCategory] = useState<string>('all');

  // Bookmarks state (mapped to current user or guest)
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    const saved = localStorage.getItem('pyqverse_bookmarks');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return ['upsc-cse-prelims-2024-gs1', 'gate-cs-2024-shift1'];
  });

  // Quiz attempts state
  const [quizAttempts, setQuizAttempts] = useState<QuizAttemptRecord[]>(() => {
    const saved = localStorage.getItem('pyqverse_quiz_history');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [];
  });

  // In-progress quizzes state
  const [inProgressQuizzes, setInProgressQuizzes] = useState<Record<string, InProgressQuizAttempt>>(() => {
    const saved = localStorage.getItem('pyqverse_in_progress_quizzes');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return {};
  });

  const [feedbackSubmissions, setFeedbackSubmissions] = useState<FeedbackSubmission[]>(() => {
    const saved = localStorage.getItem('pyqverse_feedback_submissions');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [];
  });

  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync active user to local storage
  useEffect(() => {
    localStorage.setItem('pyqverse_active_user', JSON.stringify(user));
  }, [user]);

  // Sync accounts registry to local storage
  useEffect(() => {
    localStorage.setItem('pyqverse_accounts_registry', JSON.stringify(accountsRegistry));
  }, [accountsRegistry]);

  // Sync bookmarks, history, and in-progress attempts
  useEffect(() => {
    localStorage.setItem('pyqverse_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('pyqverse_quiz_history', JSON.stringify(quizAttempts));
  }, [quizAttempts]);

  useEffect(() => {
    localStorage.setItem('pyqverse_in_progress_quizzes', JSON.stringify(inProgressQuizzes));
  }, [inProgressQuizzes]);

  useEffect(() => {
    localStorage.setItem('pyqverse_feedback_submissions', JSON.stringify(feedbackSubmissions));
  }, [feedbackSubmissions]);

  // If user is logged in, sync their state back to their account in registry
  useEffect(() => {
    if (user.isLoggedIn && user.email) {
      setAccountsRegistry(prev => ({
        ...prev,
        [user.email.toLowerCase()]: {
          id: user.id,
          email: user.email.toLowerCase(),
          profile: user,
          bookmarks,
          quizHistory: quizAttempts,
          inProgressQuizzes,
          createdAt: prev[user.email.toLowerCase()]?.createdAt || new Date().toISOString(),
          lastLoginAt: new Date().toISOString()
        }
      }));
    }
  }, [user, bookmarks, quizAttempts, inProgressQuizzes]);

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setUser(prev => ({
      ...prev,
      ...updates
    }));
    showToast('Profile updated successfully!', 'success');
  };

  const updateUserTarget = (targetExam: string, targetYear: number | string) => {
    setUser(prev => ({
      ...prev,
      targetExam,
      targetYear
    }));
    showToast(`Target exam set to ${targetExam} (${targetYear})`, 'success');
  };

  const updateUserSettings = (settings: Partial<UserSettings>) => {
    setUser(prev => ({
      ...prev,
      settings: {
        ...(prev.settings || DEFAULT_USER_SETTINGS),
        ...settings
      }
    }));
    showToast('Preferences updated successfully!', 'success');
  };

  const toggleBookmark = (paperId: string) => {
    const paper = MOCK_PAPERS.find(p => p.id === paperId);
    const paperName = paper?.paper || paper?.examName || 'Paper';
    
    if (bookmarks.includes(paperId)) {
      setBookmarks(prev => prev.filter(id => id !== paperId));
      showToast(`Removed "${paperName}" from bookmarks`, 'info');
    } else {
      setBookmarks(prev => [...prev, paperId]);
      showToast(`Saved "${paperName}" to bookmarks`, 'success');
    }
  };

  const isBookmarked = (paperId: string) => bookmarks.includes(paperId);

  const downloadPaper = (paper: PYQPaper) => {
    const mockContent = `%PDF-1.4
%PyQVerse Competitive Exam Question Paper Archival
Exam: ${paper.examName} (${paper.examCategory})
Paper: ${paper.paper} | Subject: ${paper.subject}
Year: ${paper.year} | Stage: ${paper.stage}
Language: ${paper.language}
Total Marks: ${paper.totalMarks} | Time: ${paper.duration}
Negative Marking: ${paper.negativeMarking}
Archival Code: ${paper.archivalCode}
Verification: ${paper.verificationStatus}
Verified by: PyQVerse National Examination Archival Cell
Aspirant: ${user.isLoggedIn ? `${user.name} (${user.email})` : 'Guest User'}
`;
    const blob = new Blob([mockContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const safeName = `${paper.examCategory}_${paper.paper}_${paper.year}`.replace(/[^a-zA-Z0-9_-]/g, '_');
    link.download = `${safeName}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(`Downloaded ${paper.examName} - ${paper.paper} (${paper.fileSize})`, 'success');
  };

  const saveQuizAttempt = (attempt: QuizAttemptRecord) => {
    setQuizAttempts(prev => [attempt, ...prev.filter(a => a.quizId !== attempt.quizId)]);
    setUser(prev => ({
      ...prev,
      quizHistory: [attempt, ...prev.quizHistory.filter(a => a.quizId !== attempt.quizId)]
    }));

    setInProgressQuizzes(prev => {
      const updated = { ...prev };
      delete updated[attempt.quizId];
      return updated;
    });
  };

  const saveInProgressQuiz = (attempt: InProgressQuizAttempt) => {
    setInProgressQuizzes(prev => ({
      ...prev,
      [attempt.quizId]: attempt
    }));
  };

  const clearInProgressQuiz = (quizId: string) => {
    setInProgressQuizzes(prev => {
      const updated = { ...prev };
      delete updated[quizId];
      return updated;
    });
  };

  const getInProgressQuiz = (quizId: string) => {
    return inProgressQuizzes[quizId];
  };

  const submitFeedback = (data: Omit<FeedbackSubmission, 'id' | 'submittedAt' | 'isGuest'>) => {
    const submission: FeedbackSubmission = {
      ...data,
      id: 'fb-' + Math.random().toString(36).substring(2, 9),
      submittedAt: new Date().toISOString(),
      isGuest: !user.isLoggedIn
    };
    setFeedbackSubmissions(prev => [submission, ...prev]);
    showToast('Thank you! Your feedback has been received.', 'success');
  };

  // Real Account Login / Switcher
  const login = (credentials: { 
    email: string; 
    name?: string; 
    targetExam?: string; 
    targetYear?: number | string; 
    bio?: string; 
    avatarUrl?: string; 
  }) => {
    const emailKey = credentials.email.trim().toLowerCase();
    const existingAccount = accountsRegistry[emailKey];

    if (existingAccount) {
      // Restore existing account profile and data
      const updatedProfile: UserProfile = {
        ...existingAccount.profile,
        isLoggedIn: true,
        ...(credentials.name ? { name: credentials.name } : {}),
        ...(credentials.targetExam ? { targetExam: credentials.targetExam } : {}),
        ...(credentials.targetYear ? { targetYear: credentials.targetYear } : {})
      };
      setUser(updatedProfile);
      setBookmarks(existingAccount.bookmarks || []);
      setQuizAttempts(existingAccount.quizHistory || []);
      setInProgressQuizzes(existingAccount.inProgressQuizzes || {});
      showToast(`Welcome back, ${updatedProfile.name}! Multi-device profile loaded.`, 'success');
    } else {
      // Create fresh user account
      const userId = 'usr_' + Math.random().toString(36).substring(2, 10);
      const newName = credentials.name?.trim() || emailKey.split('@')[0] || 'Aspirant';
      const newProfile: UserProfile = {
        id: userId,
        name: newName,
        email: emailKey,
        targetExam: credentials.targetExam || 'UPSC Civil Services',
        targetYear: credentials.targetYear || 2025,
        avatarUrl: credentials.avatarUrl || CURATED_AVATARS[0].url,
        bio: credentials.bio || `Preparing for ${credentials.targetExam || 'competitive examinations'}.`,
        joinedDate: new Date().toISOString(),
        isLoggedIn: true,
        savedPaperIds: ['upsc-cse-prelims-2024-gs1'],
        quizHistory: [],
        attemptedPapersCount: 0,
        settings: DEFAULT_USER_SETTINGS
      };

      const newAccount: RegisteredAccount = {
        id: userId,
        email: emailKey,
        profile: newProfile,
        bookmarks: ['upsc-cse-prelims-2024-gs1'],
        quizHistory: [],
        inProgressQuizzes: {},
        createdAt: new Date().toISOString(),
        lastLoginAt: new Date().toISOString()
      };

      setAccountsRegistry(prev => ({
        ...prev,
        [emailKey]: newAccount
      }));

      setUser(newProfile);
      setBookmarks(newAccount.bookmarks);
      setQuizAttempts([]);
      setInProgressQuizzes({});
      showToast(`Account created for ${newName}! Multi-device cloud sync enabled.`, 'success');
    }
  };

  const logout = () => {
    setUser(DEFAULT_GUEST_USER);
    // Restore generic guest bookmarks/attempts
    setBookmarks(['upsc-cse-prelims-2024-gs1', 'gate-cs-2024-shift1']);
    setQuizAttempts([]);
    setInProgressQuizzes({});
    showToast('Signed out. Continuing in Guest Mode (No content locked).', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        user,
        selectedExamCategory,
        setSelectedExamCategory,
        updateUserProfile,
        updateUserTarget,
        updateUserSettings,
        bookmarks,
        toggleBookmark,
        isBookmarked,
        downloadPaper,
        quizAttempts,
        saveQuizAttempt,
        inProgressQuizzes,
        saveInProgressQuiz,
        clearInProgressQuiz,
        getInProgressQuiz,
        feedbackSubmissions,
        submitFeedback,
        searchModalOpen,
        setSearchModalOpen,
        uploadModalOpen,
        setUploadModalOpen,
        toasts,
        showToast,
        dismissToast,
        login,
        logout
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
