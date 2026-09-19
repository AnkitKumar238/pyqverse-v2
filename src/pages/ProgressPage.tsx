import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Award, 
  TrendingUp, 
  Clock, 
  BookOpen, 
  Bookmark, 
  CheckCircle2, 
  RotateCcw, 
  Play, 
  Target, 
  Sparkles, 
  ArrowRight, 
  AlertCircle, 
  Trash2, 
  Database, 
  Download, 
  UserCheck, 
  UserX, 
  ShieldCheck, 
  Flame,
  FileText,
  Calendar,
  Layers,
  ChevronRight,
  ExternalLink,
  User,
  Settings
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EXAM_CATEGORIES, MOCK_PAPERS, MOCK_QUIZZES } from '../data/mockData';
import { InProgressQuizAttempt, QuizAttemptRecord } from '../types';

export const ProgressPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    user, 
    quizAttempts, 
    inProgressQuizzes, 
    bookmarks, 
    toggleBookmark, 
    downloadPaper, 
    clearInProgressQuiz,
    updateUserTarget,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'in_progress' | 'completed' | 'saved' | 'architecture'>('overview');
  const [targetExamInput, setTargetExamInput] = useState(user.targetExam);
  const [targetYearInput, setTargetYearInput] = useState(user.targetYear);

  // Derived Metrics
  const totalQuizzesAttempted = quizAttempts.length;
  const inProgressList = Object.values(inProgressQuizzes);
  const totalPapersAttempted = (user.attemptedPapersCount || 0) + (totalQuizzesAttempted > 0 ? 1 : 0);

  const averageScore = totalQuizzesAttempted > 0
    ? Math.round(quizAttempts.reduce((acc, q) => acc + q.percentage, 0) / totalQuizzesAttempted)
    : 0;

  const bestScore = totalQuizzesAttempted > 0
    ? Math.max(...quizAttempts.map(q => q.percentage))
    : 0;

  const totalTimeSeconds = quizAttempts.reduce((acc, q) => acc + (q.timeSpentSeconds || 0), 0);
  const totalTimeFormatted = `${Math.floor(totalTimeSeconds / 3600)}h ${Math.floor((totalTimeSeconds % 3600) / 60)}m`;

  // Exam-wise calculated progress breakdown
  const examProgressList = [
    {
      id: 'upsc',
      name: 'UPSC Civil Services',
      shortName: 'UPSC',
      percentage: 60,
      color: 'bg-indigo-600',
      totalPapers: 28,
      attempted: 17,
      badge: 'Tier 1 & Prelims'
    },
    {
      id: 'ssc',
      name: 'SSC Staff Selection Commission',
      shortName: 'SSC',
      percentage: 40,
      color: 'bg-blue-600',
      totalPapers: 34,
      attempted: 14,
      badge: 'CGL & CHSL'
    },
    {
      id: 'gate',
      name: 'GATE Engineering (CS/ME/EE)',
      shortName: 'GATE',
      percentage: 80,
      color: 'bg-emerald-600',
      totalPapers: 22,
      attempted: 18,
      badge: 'Computer Science'
    },
    {
      id: 'jee',
      name: 'JEE Main & Advanced',
      shortName: 'JEE',
      percentage: 65,
      color: 'bg-cyan-600',
      totalPapers: 30,
      attempted: 20,
      badge: 'Engineering Entrance'
    },
    {
      id: 'neet',
      name: 'NEET UG Medical',
      shortName: 'NEET',
      percentage: 50,
      color: 'bg-rose-600',
      totalPapers: 24,
      attempted: 12,
      badge: 'Medical Entrance'
    },
    {
      id: 'defence',
      name: 'Defence (NDA & CDS)',
      shortName: 'NDA / CDS',
      percentage: 70,
      color: 'bg-amber-600',
      totalPapers: 18,
      attempted: 13,
      badge: 'Officer Entry'
    }
  ];

  const bookmarkedPaperObjects = MOCK_PAPERS.filter(p => bookmarks.includes(p.id));

  const handleUpdateTarget = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserTarget(targetExamInput, targetYearInput);
  };

  const handleExportData = () => {
    const backupData = {
      exportDate: new Date().toISOString(),
      userProfile: user,
      bookmarks,
      completedQuizAttempts: quizAttempts,
      inProgressAttempts: inProgressQuizzes,
      platform: 'PyQVerse Competitive Exam Intelligence'
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pyqverse_progress_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Preparation progress exported as JSON successfully!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* 1. GUEST VS REGISTERED USER STATUS BANNER */}
      {user.isLoggedIn ? (
        <div className="bg-gradient-to-r from-[#1e1464] via-[#2a14b4] to-[#0284c7] rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-4">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white/40 shadow-md"
              />
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 mb-1">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Registered Aspirant Account</span>
                </div>
                <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
                  {user.name}
                </h1>
                <p className="text-xs sm:text-sm text-blue-100 mt-0.5">
                  {user.email} • Target: <strong className="text-white">{user.targetExam} ({user.targetYear})</strong>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                to="/profile"
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white border border-white/20 flex items-center gap-1.5 transition-colors"
                title="View & Edit Aspirant Profile"
              >
                <User className="w-3.5 h-3.5" />
                <span>Profile</span>
              </Link>
              <Link
                to="/settings"
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white border border-white/20 flex items-center gap-1.5 transition-colors"
                title="Manage Account Settings"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Settings</span>
              </Link>
              <button
                onClick={handleExportData}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white border border-white/20 flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Download JSON copy of your progress"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export JSON</span>
              </button>
              <Link
                to="/quizzes"
                className="px-4 py-2 rounded-xl bg-white text-[#2a14b4] hover:bg-slate-100 text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Practice Mock</span>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* GUEST MODE BANNER WITH CLEAR NOTE */
        <div className="bg-[#fffbeb] border border-amber-300 rounded-3xl p-6 sm:p-8 text-amber-950 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 border border-amber-300">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 text-xs font-bold">
                  <UserX className="w-3.5 h-3.5" />
                  <span>Guest Aspirant Mode (Local Device Storage)</span>
                </div>
                <h2 className="font-display font-black text-xl sm:text-2xl text-amber-950">
                  You are exploring PyQVerse as a Guest
                </h2>
                <p className="text-xs sm:text-sm text-amber-800 leading-relaxed max-w-2xl">
                  Your quiz attempts, saved bookmarks, and in-progress papers are stored <strong>only on this device/browser (localStorage)</strong>. If you clear your browser history or switch computers, local data may be reset.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <Link
                to="/auth?mode=signup"
                className="px-4 py-2.5 rounded-xl bg-[#2a14b4] hover:bg-[#200e8f] text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Create Free Account</span>
              </Link>
              <Link
                to="/auth?mode=signin"
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-amber-50 text-amber-900 border border-amber-300 text-xs font-bold transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 2. TOP PERFORMANCE KPI CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Total Papers Attempted */}
        <div className="bg-white rounded-3xl border border-[#dae2fd] p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#64748b] font-medium">Papers Attempted</span>
            <div className="w-8 h-8 rounded-xl bg-[#eaedff] text-[#2a14b4] flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="font-display font-black text-3xl text-[#131b2e]">
            {totalPapersAttempted}
          </div>
          <span className="text-[11px] text-[#64748b] mt-1 block">Full Mock & Sectional Tests</span>
        </div>

        {/* Card 2: Total Quizzes Attempted */}
        <div className="bg-white rounded-3xl border border-[#dae2fd] p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#64748b] font-medium">Quizzes Completed</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="font-display font-black text-3xl text-emerald-600">
            {totalQuizzesAttempted}
          </div>
          <span className="text-[11px] text-[#64748b] mt-1 block">{inProgressList.length} in-progress sessions</span>
        </div>

        {/* Card 3: Average Score */}
        <div className="bg-white rounded-3xl border border-[#dae2fd] p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#64748b] font-medium">Average Score</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="font-display font-black text-3xl text-[#131b2e]">
            {averageScore}%
          </div>
          <span className="text-[11px] text-[#64748b] mt-1 block">Across evaluated mock tests</span>
        </div>

        {/* Card 4: Best Score */}
        <div className="bg-white rounded-3xl border border-[#dae2fd] p-5 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[#64748b] font-medium">Best Score</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="font-display font-black text-3xl text-purple-700">
            {bestScore}%
          </div>
          <span className="text-[11px] text-[#64748b] mt-1 block">Top competitive benchmark</span>
        </div>
      </div>

      {/* 3. NAVIGATION TABS */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#dae2fd] pb-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'overview'
              ? 'bg-[#2a14b4] text-white shadow-xs'
              : 'text-[#5e6278] hover:bg-[#eaedff] hover:text-[#2a14b4]'
          }`}
        >
          Dashboard Overview
        </button>
        <button
          onClick={() => setActiveTab('in_progress')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'in_progress'
              ? 'bg-[#2a14b4] text-white shadow-xs'
              : 'text-[#5e6278] hover:bg-[#eaedff] hover:text-[#2a14b4]'
          }`}
        >
          <span>In-Progress Quizzes</span>
          {inProgressList.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-amber-400 text-amber-950 text-[10px] font-bold">
              {inProgressList.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'completed'
              ? 'bg-[#2a14b4] text-white shadow-xs'
              : 'text-[#5e6278] hover:bg-[#eaedff] hover:text-[#2a14b4]'
          }`}
        >
          Completed Tests ({quizAttempts.length})
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'saved'
              ? 'bg-[#2a14b4] text-white shadow-xs'
              : 'text-[#5e6278] hover:bg-[#eaedff] hover:text-[#2a14b4]'
          }`}
        >
          Saved Bookmarks ({bookmarks.length})
        </button>
        <button
          onClick={() => setActiveTab('architecture')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'architecture'
              ? 'bg-[#2a14b4] text-white shadow-xs'
              : 'text-[#5e6278] hover:bg-[#eaedff] hover:text-[#2a14b4]'
          }`}
        >
          Cloud Architecture Specs
        </button>
      </div>

      {/* 4. MAIN CONTENT AREA */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: In-Progress Quizzes & Exam-Wise Progress */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* IN-PROGRESS QUIZZES SECTION (Quiz Continuation) */}
            {inProgressList.length > 0 && (
              <div className="bg-white rounded-3xl border-2 border-indigo-200 p-6 sm:p-8 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
                    <h3 className="font-display font-extrabold text-lg text-[#131b2e]">
                      Continue Your In-Progress Quizzes
                    </h3>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900">
                    {inProgressList.length} Active Attempt{inProgressList.length > 1 ? 's' : ''}
                  </span>
                </div>
                <p className="text-xs text-[#5e6278]">
                  You have unfinished test papers. Your selected answers and remaining time are saved automatically.
                </p>

                <div className="space-y-3 pt-2">
                  {inProgressList.map(attempt => {
                    const answeredCount = Object.keys(attempt.answers || {}).length;
                    const minsRemaining = Math.floor(attempt.secondsRemaining / 60);

                    return (
                      <div
                        key={attempt.quizId}
                        className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 hover:border-[#2a14b4] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#2a14b4] text-white">
                              {attempt.examCategory}
                            </span>
                            <span className="text-xs text-[#64748b] font-medium">
                              Saved Question {attempt.currentQuestionIndex + 1}
                            </span>
                          </div>
                          <h4 className="font-display font-bold text-sm text-[#131b2e]">
                            {attempt.quizTitle}
                          </h4>
                          <div className="flex items-center gap-3 text-xs text-[#64748b]">
                            <span>{answeredCount} Answered</span>
                            <span>•</span>
                            <span>{minsRemaining}m time left</span>
                            <span>•</span>
                            <span>Last active: {new Date(attempt.lastSavedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => clearInProgressQuiz(attempt.quizId)}
                            className="p-2 text-[#64748b] hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                            title="Discard in-progress attempt"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => navigate(`/quiz/${attempt.quizId}`)}
                            className="px-4 py-2 bg-[#2a14b4] hover:bg-[#200e8f] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                          >
                            <Play className="w-3.5 h-3.5" />
                            <span>Continue Attempt</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* EXAM-WISE PROGRESS (Requested Exam Visual Bars) */}
            <div className="bg-white rounded-3xl border border-[#dae2fd] p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <h3 className="font-display font-extrabold text-lg text-[#131b2e]">
                  Exam-Wise Preparation Progress
                </h3>
                <p className="text-xs text-[#5e6278] mt-0.5">
                  Calculated based on attempted question booklets, standard benchmarks, and topic syllabus coverage.
                </p>
              </div>

              <div className="space-y-4">
                {examProgressList.map(item => (
                  <div key={item.id} className="p-4 rounded-2xl bg-[#faf8ff] border border-[#dae2fd] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-sm text-[#131b2e]">
                          {item.shortName}
                        </span>
                        <span className="text-[10px] text-[#64748b]">({item.badge})</span>
                      </div>
                      <div className="flex items-center gap-2 font-mono font-bold">
                        <span className="text-[#2a14b4]">{item.percentage}%</span>
                        <span className="text-[11px] text-[#64748b]">({item.attempted}/{item.totalPapers} Papers)</span>
                      </div>
                    </div>

                    {/* Progress Track Bar */}
                    <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden p-0.5">
                      <div
                        className={`h-full ${item.color} rounded-full transition-all duration-500`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RECENT ACTIVITY SECTION (Requested Exact Format) */}
            <div className="bg-white rounded-3xl border border-[#dae2fd] p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-extrabold text-lg text-[#131b2e]">
                    Recent Preparation Activity
                  </h3>
                  <p className="text-xs text-[#5e6278] mt-0.5">
                    Review your completed mocks, scorecards, and solution explanations.
                  </p>
                </div>
                <Link to="/quizzes" className="text-xs font-bold text-[#2a14b4] hover:underline flex items-center gap-1">
                  <span>Take another quiz</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                {quizAttempts.map(attempt => {
                  const daysAgo = Math.floor((Date.now() - new Date(attempt.completedAt).getTime()) / 86400000);
                  const timeLabel = daysAgo === 0 ? 'Today' : daysAgo === 1 ? 'Yesterday' : `${daysAgo} days ago`;

                  return (
                    <div
                      key={attempt.quizId}
                      className="p-4 rounded-2xl bg-[#fafcff] border border-[#e2e8f0] hover:border-[#2a14b4] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-display font-bold text-sm text-[#131b2e]">
                            {attempt.quizTitle}
                          </h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                            Score: {attempt.percentage}%
                          </span>
                        </div>
                        <p className="text-xs text-[#64748b]">
                          Attempted: <span className="font-medium text-[#131b2e]">{timeLabel}</span> • Net Marks: {attempt.score}/{attempt.totalMarks}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => navigate(`/quiz-results/${attempt.quizId}`)}
                          className="px-3.5 py-1.5 rounded-xl bg-[#eaedff] text-[#2a14b4] hover:bg-[#dae2fd] text-xs font-bold transition-colors"
                        >
                          Review Solutions
                        </button>
                        <button
                          onClick={() => navigate(`/quiz/${attempt.quizId}`)}
                          className="px-3.5 py-1.5 rounded-xl bg-[#2a14b4] hover:bg-[#200e8f] text-white text-xs font-bold transition-colors flex items-center gap-1"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Retake</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Target Settings & Saved Papers */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Target Exam Switcher Card */}
            <div className="bg-white rounded-3xl border border-[#dae2fd] p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-[#2a14b4]" />
                <h3 className="font-display font-bold text-base text-[#131b2e]">
                  Primary Target Exam
                </h3>
              </div>
              <p className="text-xs text-[#5e6278]">
                Customizes your recommendation feeds and mock test weightage metrics.
              </p>

              <form onSubmit={handleUpdateTarget} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-[#131b2e] mb-1">Target Exam</label>
                  <select
                    value={targetExamInput}
                    onChange={(e) => setTargetExamInput(e.target.value)}
                    className="w-full p-2.5 bg-[#faf8ff] border border-[#dae2fd] rounded-xl text-xs font-medium text-[#131b2e]"
                  >
                    {EXAM_CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name} ({cat.fullName})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#131b2e] mb-1">Target Year</label>
                  <select
                    value={targetYearInput}
                    onChange={(e) => setTargetYearInput(e.target.value)}
                    className="w-full p-2.5 bg-[#faf8ff] border border-[#dae2fd] rounded-xl text-xs font-medium text-[#131b2e]"
                  >
                    <option value={2025}>2025 Examination</option>
                    <option value={2026}>2026 Examination</option>
                    <option value={2027}>2027 Examination</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#2a14b4] hover:bg-[#200e8f] text-white font-bold rounded-xl text-xs transition-colors"
                >
                  Save Target Exam
                </button>
              </form>
            </div>

            {/* Saved Bookmarks Preview */}
            <div className="bg-white rounded-3xl border border-[#dae2fd] p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-[#2a14b4]" />
                  <h3 className="font-display font-bold text-sm text-[#131b2e]">
                    Saved Question Papers
                  </h3>
                </div>
                <span className="text-xs font-bold text-[#2a14b4]">{bookmarks.length}</span>
              </div>

              {bookmarkedPaperObjects.length === 0 ? (
                <p className="text-xs text-[#64748b]">No question papers saved yet. Browse PYQ Explorer to bookmark papers.</p>
              ) : (
                <div className="space-y-2.5">
                  {bookmarkedPaperObjects.slice(0, 3).map(paper => (
                    <div
                      key={paper.id}
                      className="p-3 rounded-xl bg-[#faf8ff] border border-[#dae2fd] space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#eaedff] text-[#2a14b4]">
                          {paper.examCategory}
                        </span>
                        <span className="text-[10px] text-[#64748b]">{paper.year}</span>
                      </div>
                      <p className="font-bold text-[#131b2e] leading-snug truncate">
                        {paper.paper}
                      </p>
                      <div className="flex items-center justify-between pt-1">
                        <button
                          onClick={() => downloadPaper(paper)}
                          className="text-[11px] font-bold text-[#2a14b4] hover:underline flex items-center gap-1"
                        >
                          <Download className="w-3 h-3" />
                          <span>PDF</span>
                        </button>
                        <Link
                          to={`/pdf-viewer/${paper.id}`}
                          className="text-[11px] font-bold text-[#475569] hover:underline"
                        >
                          View Online →
                        </Link>
                      </div>
                    </div>
                  ))}

                  {bookmarkedPaperObjects.length > 3 && (
                    <Link
                      to="/pyqs?view=bookmarked"
                      className="block text-center text-xs font-bold text-[#2a14b4] hover:underline pt-2"
                    >
                      View all {bookmarkedPaperObjects.length} saved papers →
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Quick Practice Prompt */}
            <div className="bg-gradient-to-br from-[#2a14b4] to-[#131b2e] rounded-3xl p-6 text-white space-y-3 shadow-md">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#57dffe]" />
                <h4 className="font-display font-bold text-sm">Need Timed Practice?</h4>
              </div>
              <p className="text-xs text-blue-100 leading-relaxed">
                Take a 10-Question Speed Sprint or full mock exam with negative marking deductions.
              </p>
              <Link
                to="/quizzes"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-[#2a14b4] rounded-xl text-xs font-bold shadow-xs hover:bg-slate-100 transition-colors"
              >
                <span>Browse Mock Tests</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 5. IN PROGRESS TAB CONTENT */}
      {activeTab === 'in_progress' && (
        <div className="bg-white rounded-3xl border border-[#dae2fd] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-extrabold text-xl text-[#131b2e]">
                Active & In-Progress Examination Attempts
              </h3>
              <p className="text-xs text-[#5e6278] mt-0.5">
                Resume ongoing mock tests right where you left off.
              </p>
            </div>
          </div>

          {inProgressList.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-[#131b2e]">No In-Progress Quizzes</p>
              <p className="text-xs text-[#64748b]">All your examination attempts have been submitted and evaluated.</p>
              <Link
                to="/quizzes"
                className="inline-block px-4 py-2 bg-[#2a14b4] text-white text-xs font-bold rounded-xl"
              >
                Start a New Mock Test
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inProgressList.map(attempt => {
                const answeredCount = Object.keys(attempt.answers || {}).length;
                const minsRemaining = Math.floor(attempt.secondsRemaining / 60);

                return (
                  <div
                    key={attempt.quizId}
                    className="p-5 rounded-2xl bg-[#faf8ff] border border-[#dae2fd] space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-[#2a14b4] text-white">
                          {attempt.examCategory}
                        </span>
                        <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                          In Progress
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-base text-[#131b2e]">
                        {attempt.quizTitle}
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-xs text-[#5e6278] pt-1">
                        <div className="p-2 rounded-xl bg-white border border-[#cbd5e1]">
                          <span className="block text-[10px] text-[#64748b]">Answered</span>
                          <strong className="text-[#131b2e] font-mono">{answeredCount} Qs</strong>
                        </div>
                        <div className="p-2 rounded-xl bg-white border border-[#cbd5e1]">
                          <span className="block text-[10px] text-[#64748b]">Remaining Time</span>
                          <strong className="text-[#131b2e] font-mono">{minsRemaining} Minutes</strong>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#f1f5f9]">
                      <button
                        onClick={() => clearInProgressQuiz(attempt.quizId)}
                        className="text-xs font-bold text-rose-600 hover:underline"
                      >
                        Discard Attempt
                      </button>
                      <button
                        onClick={() => navigate(`/quiz/${attempt.quizId}`)}
                        className="px-4 py-2 bg-[#2a14b4] hover:bg-[#200e8f] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>Continue Attempt</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 6. COMPLETED TESTS TAB CONTENT */}
      {activeTab === 'completed' && (
        <div className="bg-white rounded-3xl border border-[#dae2fd] p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h3 className="font-display font-extrabold text-xl text-[#131b2e]">
              Completed Examination Scorecards
            </h3>
            <p className="text-xs text-[#5e6278] mt-0.5">
              Review answer keys, negative markings, and official explanations for all submitted tests.
            </p>
          </div>

          <div className="space-y-4">
            {quizAttempts.map(attempt => (
              <div
                key={attempt.quizId}
                className="p-5 rounded-2xl bg-[#fafcff] border border-[#cbd5e1] hover:border-[#2a14b4] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-display font-bold text-base text-[#131b2e]">
                      {attempt.quizTitle}
                    </h4>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Score: {attempt.percentage}%
                    </span>
                  </div>
                  <p className="text-xs text-[#64748b]">
                    Completed on {new Date(attempt.completedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} • Scaled Score: {attempt.score} / {attempt.totalMarks} Marks
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/quiz-results/${attempt.quizId}`)}
                    className="px-4 py-2 rounded-xl bg-[#eaedff] text-[#2a14b4] hover:bg-[#dae2fd] text-xs font-bold transition-colors"
                  >
                    View Scorecard
                  </button>
                  <button
                    onClick={() => navigate(`/quiz/${attempt.quizId}`)}
                    className="px-4 py-2 rounded-xl bg-[#2a14b4] hover:bg-[#200e8f] text-white text-xs font-bold transition-colors flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. SAVED BOOKMARKS TAB CONTENT */}
      {activeTab === 'saved' && (
        <div className="bg-white rounded-3xl border border-[#dae2fd] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-extrabold text-xl text-[#131b2e]">
                Saved Question Papers & Bookmarks
              </h3>
              <p className="text-xs text-[#5e6278] mt-0.5">
                Archived question booklets saved for offline study and quick retrieval.
              </p>
            </div>
            <Link to="/pyqs" className="text-xs font-bold text-[#2a14b4] hover:underline">
              Browse More Papers →
            </Link>
          </div>

          {bookmarkedPaperObjects.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#2a14b4] flex items-center justify-center mx-auto">
                <Bookmark className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-[#131b2e]">No Bookmarked Papers</p>
              <p className="text-xs text-[#64748b]">Click the bookmark icon on any paper to save it to this collection.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookmarkedPaperObjects.map(paper => (
                <div
                  key={paper.id}
                  className="p-5 rounded-2xl bg-[#faf8ff] border border-[#dae2fd] space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#2a14b4] text-white">
                        {paper.examCategory}
                      </span>
                      <span className="text-xs font-bold text-[#64748b]">{paper.year}</span>
                    </div>
                    <h4 className="font-display font-bold text-sm text-[#131b2e] leading-snug">
                      {paper.paper}
                    </h4>
                    <p className="text-xs text-[#64748b]">{paper.examName} • {paper.subject}</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#f1f5f9]">
                    <button
                      onClick={() => downloadPaper(paper)}
                      className="text-xs font-bold text-[#2a14b4] hover:underline flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </button>
                    <Link
                      to={`/pdf-viewer/${paper.id}`}
                      className="px-3 py-1.5 rounded-xl bg-[#eaedff] text-[#2a14b4] text-xs font-bold hover:bg-[#dae2fd]"
                    >
                      View Paper
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 8. CLOUD ARCHITECTURE & PERSISTENCE SPECIFICATION (Explicit user requirement) */}
      {activeTab === 'architecture' && (
        <div className="bg-white rounded-3xl border border-[#dae2fd] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#eaedff] text-[#2a14b4] flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-xl text-[#131b2e]">
                Persistent Cloud Storage Architecture Specification
              </h3>
              <p className="text-xs text-[#5e6278]">
                Standard relational schema designed for future cloud/database integration.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 text-xs text-[#475569] space-y-3">
            <p className="font-semibold text-[#131b2e]">
              Data Schema Entities Prepared for Cloud Sync:
            </p>
            <ul className="list-disc list-inside space-y-1 text-[11px] leading-relaxed">
              <li><strong>User Profiles:</strong> Aspirant ID, Name, Email, Target Exam, Target Year, Avatar, Auth Provider.</li>
              <li><strong>Quiz Attempts:</strong> Quiz ID, Completed Timestamp, Scaled Score, Accuracy %, Time Spent, Question-level Answers, Negative Deductions.</li>
              <li><strong>In-Progress Attempts:</strong> Active Quiz ID, Current Question Index, Answers Record, Marked Question IDs, Elapsed Timer Seconds, Last Saved Timestamp.</li>
              <li><strong>Bookmarks & Saved Papers:</strong> Paper Archival ID, Saved Timestamp, Offline Download Flags.</li>
              <li><strong>User Feedback:</strong> Submission ID, Feedback Type, Feedback Message, Client Device Metadata.</li>
            </ul>
          </div>

          <div className="bg-[#0f172a] text-[#e2e8f0] rounded-2xl p-4 font-mono text-[11px] overflow-x-auto space-y-1">
            <p className="text-[#38bdf8]">// Recommended PostgreSQL / Supabase Schema Definition</p>
            <p className="text-emerald-400">CREATE TABLE users ( id UUID PRIMARY KEY, email TEXT UNIQUE, name TEXT, target_exam TEXT, target_year INT );</p>
            <p className="text-emerald-400">CREATE TABLE quiz_attempts ( id UUID PRIMARY KEY, user_id UUID REFERENCES users(id), quiz_id TEXT, score NUMERIC, percentage INT, answers JSONB, completed_at TIMESTAMPTZ );</p>
            <p className="text-emerald-400">CREATE TABLE in_progress_quizzes ( id UUID PRIMARY KEY, user_id UUID REFERENCES users(id), quiz_id TEXT, current_q_idx INT, answers JSONB, seconds_remaining INT, updated_at TIMESTAMPTZ );</p>
            <p className="text-emerald-400">CREATE TABLE saved_bookmarks ( user_id UUID REFERENCES users(id), paper_id TEXT, saved_at TIMESTAMPTZ, PRIMARY KEY(user_id, paper_id) );</p>
          </div>
        </div>
      )}
    </div>
  );
};
