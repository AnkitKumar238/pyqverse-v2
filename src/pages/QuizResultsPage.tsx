import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  RotateCcw, 
  Share2, 
  ArrowRight, 
  TrendingUp, 
  BookOpen, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  HelpCircle, 
  BarChart3, 
  Target, 
  MinusCircle, 
  AlertTriangle,
  UserPlus,
  UserX,
  X
} from 'lucide-react';
import { MOCK_QUIZZES, MOCK_PAPERS } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { QuizAttemptRecord } from '../types';

export const QuizResultsPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { user, quizAttempts, showToast } = useApp();

  const quiz = MOCK_QUIZZES.find(q => q.id === quizId) || MOCK_QUIZZES[0];

  const [guestPromptDismissed, setGuestPromptDismissed] = useState(false);

  // Retrieve saved record or fallback
  const savedRecord: QuizAttemptRecord | null = React.useMemo(() => {
    const raw = sessionStorage.getItem(`quiz_result_${quiz.id}`);
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch (e) {
        console.error(e);
      }
    }
    const foundInContext = quizAttempts.find(a => a.quizId === quiz.id);
    if (foundInContext) return foundInContext;

    // Default realistic fallback
    return {
      quizId: quiz.id,
      quizTitle: quiz.title,
      completedAt: new Date().toISOString(),
      score: 16.68,
      totalMarks: 20,
      percentage: 83,
      timeSpentSeconds: 620,
      totalTimeSeconds: 900,
      answers: {
        'upsc-q1': 0,
        'upsc-q2': 1,
        'upsc-q3': 1
      },
      markedQuestions: [],
      correctCount: 2,
      incorrectCount: 1,
      unattemptedCount: 0,
      negativeDeductions: 0.66
    };
  }, [quiz.id, quizAttempts]);

  const [filterReview, setFilterReview] = useState<'all' | 'correct' | 'incorrect' | 'unattempted'>('all');
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (savedRecord && savedRecord.percentage >= 65) {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [savedRecord]);

  const toggleSolution = (qId: string) => {
    setExpandedSolutions(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Scorecard link copied to clipboard!', 'success');
  };

  if (!savedRecord) return null;

  const minutesSpent = Math.floor(savedRecord.timeSpentSeconds / 60);
  const secondsSpent = savedRecord.timeSpentSeconds % 60;

  const isCutoffCleared = savedRecord.percentage >= 50;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* 1. TOP RESULT SUMMARY HERO */}
      <div className="bg-white rounded-3xl border border-[#dae2fd] shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#1e1464] via-[#2a14b4] to-[#0284c7] p-6 sm:p-10 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-bold uppercase tracking-wider backdrop-blur-xs mb-3">
                <Target className="w-3.5 h-3.5 text-amber-300" />
                <span>{quiz.examCategory} Evaluation Scorecard</span>
              </div>
              <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
                {quiz.title}
              </h1>
              <p className="text-xs sm:text-sm text-blue-100 mt-1">
                Completed on {new Date(savedRecord.completedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} • Verified Commission Marking Scheme
              </p>
            </div>

            {/* Score Pill */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/20 text-center shrink-0">
              <span className="text-xs text-blue-200 block uppercase font-bold tracking-wider">
                Net Scaled Score
              </span>
              <div className="font-display font-black text-3xl sm:text-4xl text-white mt-0.5">
                {savedRecord.score} <span className="text-lg text-blue-200 font-medium">/ {savedRecord.totalMarks}</span>
              </div>
              <span className={`inline-block mt-2 px-2.5 py-0.5 text-xs font-bold rounded-full ${
                isCutoffCleared ? 'bg-emerald-400 text-emerald-950' : 'bg-amber-300 text-amber-950'
              }`}>
                {isCutoffCleared ? '✓ Cleared Expected Cutoff' : 'Below Cutoff Threshold'}
              </span>
            </div>
          </div>
        </div>

        {/* 4 Performance Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:p-8 bg-[#fafcff] border-b border-[#dae2fd]">
          <div className="p-4 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-[#64748b] font-medium">Accuracy Score</span>
              <TrendingUp className="w-4 h-4 text-indigo-600" />
            </div>
            <p className="font-display font-black text-2xl text-[#1e1b4b]">{savedRecord.percentage}%</p>
            <span className="text-[11px] text-[#64748b]">Based on net marks</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-[#64748b] font-medium">Correct Answers</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="font-display font-black text-2xl text-emerald-600">
              {savedRecord.correctCount || 0} Qs
            </p>
            <span className="text-[11px] text-[#64748b]">Awarded full marks</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-[#64748b] font-medium">Negative Deductions</span>
              <MinusCircle className="w-4 h-4 text-rose-600" />
            </div>
            <p className="font-display font-black text-2xl text-rose-600">
              -{savedRecord.negativeDeductions || 0} Marks
            </p>
            <span className="text-[11px] text-[#64748b]">{savedRecord.incorrectCount || 0} incorrect attempts</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#e2e8f0] shadow-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-[#64748b] font-medium">Time Taken</span>
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
            <p className="font-display font-black text-2xl text-[#1e1b4b]">
              {minutesSpent}m {secondsSpent}s
            </p>
            <span className="text-[11px] text-[#64748b]">Total allowed: {quiz.durationMinutes}m</span>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="p-4 sm:px-8 flex flex-wrap items-center justify-between gap-3 bg-white">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate(`/quiz/${quiz.id}`)}
              className="px-4 py-2 rounded-xl border border-[#cbd5e1] hover:bg-[#f8fafc] text-xs font-bold text-[#1e293b] flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Test</span>
            </button>
            <button
              onClick={handleShare}
              className="px-4 py-2 rounded-xl border border-[#cbd5e1] hover:bg-[#f8fafc] text-xs font-bold text-[#1e293b] flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Score</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/pyqs?exam=${encodeURIComponent(quiz.examCategory)}`}
              className="px-4 py-2 rounded-xl bg-[#eaedff] text-[#2a14b4] hover:bg-[#dae2fd] text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Explore {quiz.examCategory} PYQ Papers</span>
            </Link>
            <Link
              to="/quizzes"
              className="px-4 py-2 rounded-xl bg-[#2a14b4] hover:bg-[#200e8f] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <span>More Practice Tests</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* 2. OPTIONAL LOGIN PROMPT (For Guest Users Only) */}
      {!user.isLoggedIn && !guestPromptDismissed && (
        <div className="bg-[#fffbeb] border-2 border-amber-300 rounded-3xl p-6 sm:p-8 text-amber-950 shadow-sm relative animate-in fade-in slide-in-from-top-2">
          <button
            onClick={() => setGuestPromptDismissed(true)}
            className="absolute top-4 right-4 p-1.5 text-amber-800 hover:text-amber-950 rounded-lg hover:bg-amber-200/50 transition-colors"
            title="Dismiss prompt"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pr-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-200 text-amber-900 flex items-center justify-center shrink-0 border border-amber-300">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-extrabold text-lg text-amber-950">
                  Want to save your progress across devices?
                </h3>
                <p className="text-xs sm:text-sm text-amber-800 leading-relaxed max-w-xl">
                  Create a free account to permanently sync your mock scores, track weak topic analysis, and resume your preparation seamlessly on any computer, tablet, or phone.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                to="/auth?mode=signup"
                className="px-4 py-2.5 bg-[#2a14b4] hover:bg-[#200e8f] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Create Account</span>
              </Link>
              <button
                onClick={() => setGuestPromptDismissed(true)}
                className="px-4 py-2.5 bg-white hover:bg-amber-100/60 border border-amber-300 text-amber-900 text-xs font-bold rounded-xl transition-colors"
              >
                Continue as Guest
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. QUESTION-BY-QUESTION REVIEW SECTION */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-display font-extrabold text-xl text-[#131b2e]">
              Detailed Question Analysis & Official Explanations
            </h2>
            <p className="text-xs text-[#5e6278] mt-0.5">
              Review your answers alongside official commission keys and high-yield study notes.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1 rounded-xl">
            {(['all', 'correct', 'incorrect', 'unattempted'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilterReview(tab)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg capitalize transition-colors ${
                  filterReview === tab
                    ? 'bg-white text-[#2a14b4] shadow-xs'
                    : 'text-[#64748b] hover:text-[#131b2e]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Questions Cards */}
        <div className="space-y-4">
          {quiz.questions.map((q, idx) => {
            const userChoice = savedRecord.answers[q.id];
            const isCorrect = userChoice === q.correctAnswerIndex;
            const isUnattempted = userChoice === undefined;

            if (filterReview === 'correct' && !isCorrect) return null;
            if (filterReview === 'incorrect' && (isCorrect || isUnattempted)) return null;
            if (filterReview === 'unattempted' && !isUnattempted) return null;

            const isExpanded = expandedSolutions[q.id] ?? true;

            return (
              <div
                key={q.id}
                className="bg-white rounded-3xl border border-[#dae2fd] shadow-sm overflow-hidden p-6 space-y-4"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs px-2.5 py-1 rounded-lg bg-[#f1f5f9] text-[#1e293b]">
                      Question {idx + 1}
                    </span>
                    <span className="text-xs text-[#64748b]">
                      {q.marks} Marks
                    </span>
                  </div>

                  <div>
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Correct (+{q.marks} Marks)
                      </span>
                    ) : isUnattempted ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                        Unattempted (0 Marks)
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                        <XCircle className="w-3.5 h-3.5" />
                        Incorrect (-{q.negativeMarks || quiz.negativeMarkingPerWrong || 0.66})
                      </span>
                    )}
                  </div>
                </div>

                {/* Question Text */}
                <p className="text-sm font-semibold text-[#1e293b] leading-relaxed whitespace-pre-line">
                  {q.question}
                </p>

                {/* Options List */}
                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const isUserPick = userChoice === optIdx;
                    const isOfficialCorrect = q.correctAnswerIndex === optIdx;

                    let rowStyle = "bg-white border-slate-200 text-slate-700";
                    if (isOfficialCorrect) {
                      rowStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold";
                    } else if (isUserPick) {
                      rowStyle = "bg-rose-50 border-rose-500 text-rose-950 line-through";
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-xl border text-xs sm:text-sm flex items-center justify-between ${rowStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full border font-bold text-xs flex items-center justify-center shrink-0">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {isOfficialCorrect && (
                          <span className="text-xs font-bold text-emerald-700 shrink-0">
                            ✓ Official Commission Key
                          </span>
                        )}
                        {isUserPick && !isOfficialCorrect && (
                          <span className="text-xs font-bold text-rose-700 shrink-0">
                            Your Choice
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Solution Accordion Toggle */}
                <div className="pt-2">
                  <button
                    onClick={() => toggleSolution(q.id)}
                    className="text-xs font-bold text-[#2a14b4] hover:underline flex items-center gap-1"
                  >
                    <span>{isExpanded ? 'Hide Official Explanation' : 'View Official Explanation'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {isExpanded && (
                    <div className="mt-3 p-4 rounded-2xl bg-[#f0fdf4] border border-emerald-200 text-xs sm:text-sm text-emerald-900 leading-relaxed">
                      <strong className="block mb-1 text-emerald-950 font-bold">
                        Detailed Commission Rationale & Background:
                      </strong>
                      {q.explanation}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
