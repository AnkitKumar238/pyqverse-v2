export interface ExamCategory {
  id: string; // 'upsc' | 'ssc' | 'nda' | 'cds' | 'gate' | 'jee' | 'neet' | 'cat' | 'banking' | 'railways' | 'afcat'
  name: string; // e.g. 'UPSC', 'SSC', 'NDA', 'CDS', 'GATE', 'JEE', 'NEET', 'CAT', 'Banking', 'Railways', 'AFCAT'
  fullName: string; // e.g. 'Union Public Service Commission (CSE)'
  shortDescription: string;
  badge: string; // e.g. 'Civil Services', 'Graduate Level', 'Officer Entry'
  paperCount: number;
  questionCount: number;
  stages: string[]; // e.g. ['Prelims', 'Mains']
  subExams: string[]; // e.g. ['Civil Services (CSE)', 'Prelims GS 1', 'CSAT Paper 2']
  popularSubjects: string[];
  iconName: string;
  colorScheme: 'indigo' | 'blue' | 'emerald' | 'amber' | 'rose' | 'purple' | 'cyan';
}

export interface PYQPaper {
  id: string;
  examCategory: string; // 'UPSC' | 'SSC' | 'NDA' | 'CDS' | 'GATE' | 'JEE' | 'NEET' | 'CAT' | 'Banking' | 'Railways' | 'AFCAT'
  examName: string; // e.g. 'UPSC Civil Services', 'SSC CGL', 'NDA & NA', 'GATE CS', 'JEE Main', 'NEET UG'
  paper: string; // e.g. 'General Studies Paper 1', 'Quantitative Aptitude', 'Mathematics', 'Physics & Chemistry'
  subject: string; // e.g. 'General Studies', 'Quantitative Aptitude', 'Mathematics', 'Physics', 'Biology', 'Reasoning'
  year: number; // 2025, 2024, 2023, 2022, 2021, 2020...
  stage: string; // e.g. 'Prelims', 'Mains', 'Tier 1', 'Tier 2', 'CBT 1', 'Shift 1'
  shift?: string; // e.g. 'Morning Shift (9:30 AM)', 'Afternoon Session'
  language: 'English' | 'Hindi' | 'Bilingual';
  fileSize: string;
  downloadCount: number;
  rating: number;
  totalMarks: number;
  totalQuestions: number;
  duration: string;
  negativeMarking: string;
  totalPages: number;
  syllabusTopics: string[];
  archivalCode: string;
  description: string;
  verificationStatus: 'Official Answer Key Verified' | 'Complete Step-by-Step Solutions' | 'Official Question Paper' | 'Curated Solution Matrix';
  sampleQuestions: {
    section: string;
    sectionTitle: string;
    marksAllocation: string;
    negativeMarkingNote?: string;
    questions: {
      qNum: string;
      text: string;
      marks: number;
      negativeMarks?: number;
      topic: string;
      difficulty?: 'Easy' | 'Medium' | 'Hard';
      options?: string[];
      correctOption?: number;
      codeSnippet?: string;
      diagramType?: 'flow' | 'circuit' | 'graph' | 'formula' | 'code' | 'map';
      answerExplanation?: string;
    }[];
  }[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  text?: string;
  codeSnippet?: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  topic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  marks: number;
  negativeMarks: number;
  examRef?: string;
}

export interface Quiz {
  id: string;
  title: string;
  examCategory: string; // 'UPSC' | 'SSC' | 'NDA' | 'CDS' | 'GATE' | 'JEE' | 'NEET' | 'CAT' | 'Banking' | 'Railways' | 'AFCAT'
  examName: string;
  stage: string;
  subject: string;
  format: '10-Q Speed Sprint' | '25-Q Sectional Test' | 'Full Mock (50-Q)' | 'Official PYQ Shift';
  difficulty: 'Beginner' | 'Medium' | 'Exam Standard' | 'Advanced';
  questionCount: number;
  durationMinutes: number;
  negativeMarkingPerWrong: number;
  negativeMarking?: string;
  totalMarks?: number;
  passRatePercentage: number;
  averageBenchmark: number;
  maxBenchmark: number;
  description: string;
  isDailyChallenge?: boolean;
  questions: QuizQuestion[];
}

export interface Subject {
  id: string;
  examCategory: string; // 'UPSC' | 'SSC' | 'NDA' | 'CDS' | 'GATE' | 'JEE' | 'NEET' | 'CAT' | 'Banking' | 'Railways' | 'AFCAT'
  examName: string;
  name: string;
  paperCount: number;
  totalPapers?: number;
  quizCount: number;
  weightage: string; // e.g. '100 Marks (50 Questions)' or '25% of Tier-1'
  description: string;
  iconName: string;
  colorScheme: 'primary' | 'secondary' | 'tertiary' | 'high';
  topics: string[];
}

export interface QuizAttemptRecord {
  quizId: string;
  quizTitle: string;
  completedAt: string;
  score: number;
  totalMarks: number;
  percentage: number;
  timeSpentSeconds: number;
  totalTimeSeconds: number;
  answers: Record<string, number>; // questionId -> selectedIndex
  markedQuestions: string[];
  correctCount?: number;
  incorrectCount?: number;
  unattemptedCount?: number;
  negativeDeductions?: number;
}

export interface InProgressQuizAttempt {
  quizId: string;
  quizTitle: string;
  examCategory: string;
  subject?: string;
  currentQuestionIndex: number;
  answers: Record<string, number>;
  markedQuestions: string[];
  secondsRemaining: number;
  totalTimeSeconds: number;
  startedAt: string;
  lastSavedAt: string;
}

export type FeedbackType = 
  | 'General Feedback' 
  | 'Report an Error' 
  | 'Request a PYQ' 
  | 'Suggest an Exam' 
  | 'Report a Broken Link' 
  | 'Other';

export interface FeedbackSubmission {
  id: string;
  name: string;
  email: string;
  feedbackType: FeedbackType;
  message: string;
  submittedAt: string;
  isGuest: boolean;
}

export interface UserSettings {
  dailyReminders: boolean;
  examAlerts: boolean;
  showTimerAnimations: boolean;
  multiDeviceCloudSync: boolean;
  preferredLanguage: 'English' | 'Hindi' | 'Bilingual';
  soundEffects: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  targetExam: string;
  targetYear: number | string;
  avatarUrl: string;
  bio?: string;
  joinedDate: string;
  isLoggedIn: boolean;
  savedPaperIds: string[];
  quizHistory: QuizAttemptRecord[];
  inProgressQuizzes?: InProgressQuizAttempt[];
  attemptedPapersCount?: number;
  settings?: UserSettings;
}

export interface RegisteredAccount {
  id: string;
  email: string;
  profile: UserProfile;
  bookmarks: string[];
  quizHistory: QuizAttemptRecord[];
  inProgressQuizzes: Record<string, InProgressQuizAttempt>;
  createdAt: string;
  lastLoginAt: string;
}


