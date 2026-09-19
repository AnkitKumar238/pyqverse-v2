import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Clock, 
  Flag, 
  ChevronLeft, 
  ChevronRight, 
  AlertCircle, 
  Pause, 
  Play, 
  ArrowLeft, 
  Check, 
  RotateCcw,
  Target,
  Sparkles,
  HelpCircle,
  Save
} from 'lucide-react';
import { MOCK_QUIZZES } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { QuizAttemptRecord, InProgressQuizAttempt } from '../types';

export const QuizAttemptPage: React.FC = () => {
  const { quizId } = useParams<{ quizId: string }>();
  const navigate = useNavigate();
  const { 
    user, 
    saveQuizAttempt, 
    inProgressQuizzes, 
    saveInProgressQuiz, 
    clearInProgressQuiz, 
    showToast 
  } = useApp();

  const quiz = MOCK_QUIZZES.find(q => q.id === quizId) || MOCK_QUIZZES[0];

  const totalSeconds = quiz.durationMinutes * 60;

  // Test states
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [markedQuestions, setMarkedQuestions] = useState<string[]>([]);
  const [secondsRemaining, setSecondsRemaining] = useState(totalSeconds);
  const [isPaused, setIsPaused] = useState(false);
  const [confirmSubmitOpen, setConfirmSubmitOpen] = useState(false);
  const [startedAt, setStartedAt] = useState<string>(() => new Date().toISOString());

  // Prompt modal state for continuing existing session
  const [showContinuePrompt, setShowContinuePrompt] = useState(false);
  const [savedAttemptData, setSavedAttemptData] = useState<InProgressQuizAttempt | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const initializedRef = useRef(false);

  // Check for in-progress attempt on mount
  useEffect(() => {
    if (!initializedRef.current) {
      initializedRef.current = true;
      const existing = inProgressQuizzes[quiz.id];
      if (existing && (Object.keys(existing.answers || {}).length > 0 || existing.secondsRemaining < totalSeconds - 5)) {
        setSavedAttemptData(existing);
        setShowContinuePrompt(true);
      }
    }
  }, [quiz.id, inProgressQuizzes, totalSeconds]);

  // Handle continuing saved attempt
  const handleContinueSavedAttempt = () => {
    if (savedAttemptData) {
      setAnswers(savedAttemptData.answers || {});
      setMarkedQuestions(savedAttemptData.markedQuestions || []);
      setCurrentQuestionIndex(Math.min(savedAttemptData.currentQuestionIndex || 0, quiz.questions.length - 1));
      setSecondsRemaining(savedAttemptData.secondsRemaining > 0 ? savedAttemptData.secondsRemaining : totalSeconds);
      setStartedAt(savedAttemptData.startedAt || new Date().toISOString());
      setShowContinuePrompt(false);
      showToast('Resumed your previous attempt seamlessly!', 'success');
    }
  };

  // Handle starting fresh attempt
  const handleStartFreshAttempt = () => {
    clearInProgressQuiz(quiz.id);
    setAnswers({});
    setMarkedQuestions([]);
    setCurrentQuestionIndex(0);
    setSecondsRemaining(totalSeconds);
    setStartedAt(new Date().toISOString());
    setShowContinuePrompt(false);
    showToast('Started fresh mock test attempt.', 'info');
  };

  // Timer countdown
  useEffect(() => {
    if (!isPaused && !showContinuePrompt && secondsRemaining > 0) {
      timerRef.current = setInterval(() => {
        setSecondsRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, showContinuePrompt, secondsRemaining]);

  // Periodic and state-based in-progress save
  useEffect(() => {
    if (!showContinuePrompt) {
      const attempt: InProgressQuizAttempt = {
        quizId: quiz.id,
        quizTitle: quiz.title,
        examCategory: quiz.examCategory,
        subject: quiz.subject,
        currentQuestionIndex,
        answers,
        markedQuestions,
        secondsRemaining,
        totalTimeSeconds: totalSeconds,
        startedAt,
        lastSavedAt: new Date().toISOString()
      };
      saveInProgressQuiz(attempt);
    }
  }, [quiz.id, quiz.title, quiz.examCategory, quiz.subject, currentQuestionIndex, answers, markedQuestions, secondsRemaining, totalSeconds, startedAt, showContinuePrompt]);

  const currentQ = quiz.questions[currentQuestionIndex];
  const selectedOptionIndex = answers[currentQ.id];
  const isMarked = markedQuestions.includes(currentQ.id);

  const handleSelectOption = (optionIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: optionIndex
    }));
  };

  const handleClearSelection = () => {
    setAnswers(prev => {
      const updated = { ...prev };
      delete updated[currentQ.id];
      return updated;
    });
  };

  const handleToggleMark = () => {
    setMarkedQuestions(prev => 
      prev.includes(currentQ.id) 
        ? prev.filter(id => id !== currentQ.id)
        : [...prev, currentQ.id]
    );
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleAutoSubmit = () => {
    showToast('Time expired! Submitting your examination answers automatically...', 'warning');
    processSubmission();
  };

  const processSubmission = () => {
    let rawScore = 0;
    let totalMarks = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;
    let negativeDeductions = 0;

    const penaltyPerWrong = quiz.negativeMarkingPerWrong || 0.66;

    quiz.questions.forEach(q => {
      totalMarks += q.marks;
      const userAns = answers[q.id];
      if (userAns === undefined) {
        unattemptedCount++;
      } else if (userAns === q.correctAnswerIndex) {
        correctCount++;
        rawScore += q.marks;
      } else {
        incorrectCount++;
        const penalty = Number((q.negativeMarks || penaltyPerWrong).toFixed(2));
        negativeDeductions += penalty;
        rawScore -= penalty;
      }
    });

    const finalScore = Math.max(0, Number(rawScore.toFixed(2)));
    const percentage = Math.round((finalScore / totalMarks) * 100);
    const timeSpentSeconds = totalSeconds - secondsRemaining;

    const record: QuizAttemptRecord = {
      quizId: quiz.id,
      quizTitle: quiz.title,
      completedAt: new Date().toISOString(),
      score: finalScore,
      totalMarks,
      percentage,
      timeSpentSeconds,
      totalTimeSeconds: totalSeconds,
      answers,
      markedQuestions,
      correctCount,
      incorrectCount,
      unattemptedCount,
      negativeDeductions: Number(negativeDeductions.toFixed(2))
    };

    saveQuizAttempt(record);
    clearInProgressQuiz(quiz.id);
    sessionStorage.setItem(`quiz_result_${quiz.id}`, JSON.stringify(record));
    navigate(`/quiz-results/${quiz.id}`);
  };

  // Stats for palette
  const answeredCount = Object.keys(answers).length;
  const markedCount = markedQuestions.length;
  const unansweredCount = quiz.questions.length - answeredCount;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const isLowTime = secondsRemaining <= 180; // 3 mins

  return (
    <div className="bg-[#faf8ff] min-h-screen pb-16">
      
      {/* 1. CONTINUATION PROMPT MODAL */}
      {showContinuePrompt && savedAttemptData && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex justify-center items-center">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" />
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#dae2fd] p-6 sm:p-8 space-y-5 animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-[#eaedff] text-[#2a14b4] flex items-center justify-center">
              <RotateCcw className="w-6 h-6" />
            </div>

            <div className="space-y-1.5">
              <h3 className="font-display font-extrabold text-xl text-[#131b2e]">
                Continue Your Previous Attempt?
              </h3>
              <p className="text-xs text-[#5e6278] leading-relaxed">
                You have an unfinished attempt saved from <strong>{new Date(savedAttemptData.lastSavedAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</strong>.
              </p>
            </div>

            <div className="p-3.5 bg-[#faf8ff] rounded-2xl border border-[#dae2fd] text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#64748b]">Saved Position:</span>
                <strong className="text-[#131b2e]">Question {(savedAttemptData.currentQuestionIndex || 0) + 1} of {quiz.questions.length}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Answered Questions:</span>
                <span className="text-emerald-700 font-bold">{Object.keys(savedAttemptData.answers || {}).length} Answered</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#64748b]">Time Remaining:</span>
                <span className="font-mono font-bold text-[#2a14b4]">{formatTime(savedAttemptData.secondsRemaining)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleStartFreshAttempt}
                className="py-2.5 px-4 border border-[#cbd5e1] hover:bg-[#f8fafc] text-[#475569] text-xs font-bold rounded-xl transition-colors"
              >
                Start Again
              </button>
              <button
                onClick={handleContinueSavedAttempt}
                className="py-2.5 px-4 bg-[#2a14b4] hover:bg-[#200e8f] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Continue</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. TOP TEST NAVIGATION BAR */}
      <div className="bg-white border-b border-[#dae2fd] sticky top-16 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/quizzes"
              className="p-1.5 rounded-lg text-[#777586] hover:text-[#131b2e] hover:bg-[#f2f3ff]"
              title="Exit Test to Mock Test Directory"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#2a14b4] text-white">
                  {quiz.examCategory}
                </span>
                <span className="text-xs text-[#64748b] hidden sm:inline font-medium">
                  {quiz.subject}
                </span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-bold hidden md:inline-flex items-center gap-1">
                  <Save className="w-3 h-3" /> Auto-Saving
                </span>
              </div>
              <h2 className="font-display font-bold text-sm sm:text-base text-[#131b2e] truncate max-w-[240px] sm:max-w-md">
                {quiz.title}
              </h2>
            </div>
          </div>

          {/* Countdown Clock & Submit Button */}
          <div className="flex items-center gap-3">
            {/* Timer */}
            <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono font-bold text-sm border transition-colors ${
              isLowTime
                ? 'bg-rose-50 text-rose-600 border-rose-300 animate-pulse'
                : 'bg-[#faf8ff] text-[#131b2e] border-[#dae2fd]'
            }`}>
              <Clock className="w-4 h-4 text-[#2a14b4]" />
              <span>{formatTime(secondsRemaining)}</span>
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="ml-1 p-0.5 text-[#777586] hover:text-[#131b2e]"
                title={isPaused ? 'Resume Timer' : 'Pause Timer'}
              >
                {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-600" /> : <Pause className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Submit Quiz CTA */}
            <button
              onClick={() => setConfirmSubmitOpen(true)}
              className="px-4 py-2 bg-[#2a14b4] hover:bg-[#200e8f] text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
            >
              Submit Exam
            </button>
          </div>
        </div>
      </div>

      {/* 3. MAIN TEST WORKSPACE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Question Card Column */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-3xl border border-[#dae2fd] shadow-sm p-6 sm:p-8">
              {/* Question Header strip */}
              <div className="flex items-center justify-between pb-4 border-b border-[#f1f5f9] mb-6">
                <div className="flex items-center gap-2">
                  <span className="font-display font-extrabold text-sm sm:text-base text-[#131b2e]">
                    Question {currentQuestionIndex + 1} of {quiz.questions.length}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-[#f1f5f9] text-[#475569] font-medium">
                    {currentQ.marks} Marks
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                    Penalty: -{quiz.negativeMarkingPerWrong} marks
                  </span>
                  <button
                    onClick={handleToggleMark}
                    className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors ${
                      isMarked
                        ? 'bg-amber-100 text-amber-900 font-bold'
                        : 'text-[#64748b] hover:bg-[#f1f5f9]'
                    }`}
                  >
                    <Flag className={`w-3.5 h-3.5 ${isMarked ? 'fill-amber-600 text-amber-600' : ''}`} />
                    <span>{isMarked ? 'Review Marked' : 'Mark for Review'}</span>
                  </button>
                </div>
              </div>

              {/* Question Body */}
              <div className="mb-8">
                <p className="text-sm sm:text-base text-[#1e293b] font-medium leading-relaxed whitespace-pre-line">
                  {currentQ.question}
                </p>
              </div>

              {/* Multiple Choice Options */}
              <div className="space-y-3 mb-8">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOptionIndex === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between text-xs sm:text-sm ${
                        isSelected
                          ? 'bg-[#eaedff] border-[#2a14b4] text-[#131b2e] font-semibold shadow-xs'
                          : 'bg-white border-[#cbd5e1] text-[#334155] hover:border-[#94a3b8] hover:bg-[#fafcff]'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center shrink-0 border ${
                          isSelected
                            ? 'bg-[#2a14b4] text-white border-[#2a14b4]'
                            : 'bg-[#f1f5f9] text-[#64748b] border-[#cbd5e1]'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="leading-relaxed">{opt}</span>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-[#2a14b4] shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Action Bar (Clear, Prev, Next) */}
              <div className="pt-5 border-t border-[#f1f5f9] flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={handleClearSelection}
                  disabled={selectedOptionIndex === undefined}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-800 disabled:opacity-30 transition-colors"
                >
                  Clear Response
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrev}
                    disabled={currentQuestionIndex === 0}
                    className="px-4 py-2 rounded-xl border border-[#cbd5e1] text-xs font-bold text-[#475569] hover:bg-[#f1f5f9] disabled:opacity-30 transition-colors flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={currentQuestionIndex === quiz.questions.length - 1}
                    className="px-5 py-2 rounded-xl bg-[#2a14b4] hover:bg-[#200e8f] text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1 disabled:opacity-50"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Question Palette & Aspirant Telemetry */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl border border-[#dae2fd] shadow-sm p-6">
              <h3 className="font-display font-bold text-sm text-[#131b2e] mb-4 pb-2 border-b border-[#f1f5f9]">
                Question Status Palette
              </h3>

              {/* Status Counters */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs mb-6">
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200">
                  <span className="font-bold text-emerald-800 text-base block">{answeredCount}</span>
                  <span className="text-[10px] text-emerald-700 font-semibold">Answered</span>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200">
                  <span className="font-bold text-amber-800 text-base block">{markedCount}</span>
                  <span className="text-[10px] text-amber-700 font-semibold">Marked</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-bold text-slate-800 text-base block">{unansweredCount}</span>
                  <span className="text-[10px] text-slate-600 font-semibold">Remaining</span>
                </div>
              </div>

              {/* Questions Matrix Buttons */}
              <div className="grid grid-cols-5 gap-2 max-h-60 overflow-y-auto p-1">
                {quiz.questions.map((q, idx) => {
                  const isCurrent = idx === currentQuestionIndex;
                  const isAnswered = answers[q.id] !== undefined;
                  const isMarkedReview = markedQuestions.includes(q.id);

                  let btnStyle = "bg-white border-[#cbd5e1] text-[#475569] hover:bg-[#f8fafc]";
                  if (isCurrent) {
                    btnStyle = "bg-[#2a14b4] text-white border-[#2a14b4] ring-2 ring-[#c7d2fe]";
                  } else if (isMarkedReview) {
                    btnStyle = "bg-amber-400 text-amber-950 border-amber-500 font-bold";
                  } else if (isAnswered) {
                    btnStyle = "bg-emerald-600 text-white border-emerald-700 font-bold";
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIndex(idx)}
                      className={`h-9 rounded-lg border text-xs font-bold transition-all flex items-center justify-center ${btnStyle}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-6 pt-4 border-t border-[#f1f5f9] space-y-2 text-[11px] text-[#64748b]">
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded bg-emerald-600" />
                  <span>Answered Question</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded bg-amber-400" />
                  <span>Marked for Review</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded bg-[#2a14b4]" />
                  <span>Current Active Question</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 rounded bg-white border border-[#cbd5e1]" />
                  <span>Not Yet Answered</span>
                </div>
              </div>
            </div>

            {/* Negative Marking Rule Notice */}
            <div className="p-4 rounded-3xl bg-[#fff7ed] border border-amber-200 text-xs text-amber-900 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Negative Marking Reminder</span>
              </p>
              <p className="text-[11px] leading-relaxed">
                Incorrect attempts deduct -{quiz.negativeMarkingPerWrong} marks from your final scaled score. Unanswered questions do not attract penalties.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Submission Modal */}
      {confirmSubmitOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex justify-center items-center">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setConfirmSubmitOpen(false)} />
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#dae2fd] p-6 sm:p-8 space-y-4">
            <h3 className="font-display font-extrabold text-lg text-[#131b2e]">
              Confirm Examination Submission
            </h3>
            <p className="text-xs text-[#5e6278] leading-relaxed">
              Are you sure you want to finish this mock test? Once submitted, your answers will be evaluated with official commission answer keys and negative penalties.
            </p>

            <div className="p-3.5 bg-[#f8fafc] rounded-2xl border border-slate-200 text-xs space-y-1.5">
              <div className="flex justify-between font-semibold">
                <span>Answered Questions:</span>
                <span className="text-emerald-700 font-bold">{answeredCount}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Marked for Review:</span>
                <span className="text-amber-700 font-bold">{markedCount}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Unattempted Questions:</span>
                <span className="text-slate-600 font-bold">{unansweredCount}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setConfirmSubmitOpen(false)}
                className="px-4 py-2 text-xs font-bold text-[#64748b] hover:bg-[#f1f5f9] rounded-xl transition-colors"
              >
                Back to Test
              </button>
              <button
                onClick={processSubmission}
                className="px-5 py-2 text-xs font-bold text-white bg-[#2a14b4] hover:bg-[#200e8f] rounded-xl shadow-sm transition-colors"
              >
                Confirm & View Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
