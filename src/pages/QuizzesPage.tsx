import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Sparkles, 
  Clock, 
  Flame, 
  TrendingUp, 
  Search, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  RotateCcw,
  Zap,
  Target,
  FileCheck2
} from 'lucide-react';
import { MOCK_QUIZZES, EXAM_CATEGORIES } from '../data/mockData';
import { Quiz } from '../types';

export const QuizzesPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paramExam = searchParams.get('exam') || 'All';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExam, setSelectedExam] = useState(paramExam);
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  // Countdown timer for daily national sprint
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 24, seconds: 18 });

  useEffect(() => {
    if (paramExam && paramExam !== 'All') {
      setSelectedExam(paramExam);
    }
  }, [paramExam]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const examOptions = ['All', ...EXAM_CATEGORIES.map(c => c.name)];
  const subjects = ['All', 'General Studies', 'Quantitative Aptitude', 'Reasoning', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'English', 'Computer Science'];
  const difficulties = ['All', 'Moderate', 'Competitive Standard', 'Commission High-Difficulty', 'Advanced'];

  const filteredQuizzes = useMemo(() => {
    return MOCK_QUIZZES.filter(quiz => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = quiz.title.toLowerCase().includes(q);
        const matchExam = quiz.examName.toLowerCase().includes(q) || quiz.examCategory.toLowerCase().includes(q);
        const matchSub = quiz.subject.toLowerCase().includes(q);
        if (!matchTitle && !matchExam && !matchSub) return false;
      }

      if (selectedExam !== 'All') {
        if (quiz.examCategory.toLowerCase() !== selectedExam.toLowerCase()) return false;
      }

      if (selectedSubject !== 'All') {
        if (!quiz.subject.toLowerCase().includes(selectedSubject.toLowerCase())) return false;
      }

      if (selectedDifficulty !== 'All') {
        if (quiz.difficulty !== selectedDifficulty) return false;
      }

      return true;
    });
  }, [searchQuery, selectedExam, selectedSubject, selectedDifficulty]);

  const dailyQuiz = MOCK_QUIZZES.find(q => q.isDailyChallenge) || MOCK_QUIZZES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* 1. QUIZ MASTERY ENGINE HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-[#dae2fd]">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eaedff] text-xs font-bold text-[#2a14b4] border border-[#c7d2fe]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE COMPETITIVE EXAM MASTERY ENGINE</span>
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#131b2e] tracking-tight">
            Timed Practice Tests & Sectional Drills
          </h1>

          <p className="text-sm sm:text-base text-[#464554] leading-relaxed">
            Practice authentic question papers with negative marking, instant official answer keys, and sectional accuracy analytics for UPSC, SSC, Defence, GATE, JEE, NEET, and Banking.
          </p>
        </div>

        {/* Global Live Stat Pill */}
        <div className="bg-gradient-to-br from-[#1e1b4b] to-[#0f172a] text-white p-5 rounded-2xl shadow-xl flex items-center gap-4 shrink-0">
          <div className="w-12 h-12 rounded-xl bg-[#2a14b4] flex items-center justify-center">
            <Flame className="w-6 h-6 text-amber-400 animate-bounce" />
          </div>
          <div>
            <span className="text-xs text-slate-300">Live Active Test Takers</span>
            <p className="font-display font-black text-2xl text-white">4,890+ Aspirants</p>
            <span className="text-[11px] text-emerald-400">All India Ranks updating in real time</span>
          </div>
        </div>
      </div>

      {/* 2. DAILY ASPIRANT CHALLENGE BANNER */}
      <div className="mt-8 bg-gradient-to-r from-[#2a14b4] via-[#3b82f6] to-[#0284c7] rounded-2xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
                All India Daily Sprint
              </span>
              <span className="text-xs text-blue-100 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Resets in {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
              </span>
            </div>

            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              {dailyQuiz.title}
            </h2>

            <p className="text-xs sm:text-sm text-blue-50 leading-relaxed">
              {dailyQuiz.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
              <span className="flex items-center gap-1.5 font-semibold">
                <FileCheck2 className="w-4 h-4 text-emerald-300" />
                {dailyQuiz.questions.length} Questions
              </span>
              <span className="flex items-center gap-1.5 font-semibold">
                <Clock className="w-4 h-4 text-amber-300" />
                {dailyQuiz.durationMinutes} Minutes
              </span>
              <span className="flex items-center gap-1.5 font-semibold">
                <Award className="w-4 h-4 text-purple-300" />
                Negative: -{dailyQuiz.negativeMarkingPerWrong} marks
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate(`/quiz/${dailyQuiz.id}`)}
            className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-[#2a14b4] font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 shrink-0 group"
          >
            <span>Attempt Daily Sprint</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* 3. FILTERS & SEARCH TOOLBAR */}
      <div className="mt-10 bg-white rounded-2xl border border-[#dae2fd] shadow-sm p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#2a14b4] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search quiz by exam name, paper, or subject..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#faf8ff] border border-[#cbd5e1] rounded-xl text-xs sm:text-sm text-[#131b2e] placeholder-[#777586] focus:outline-hidden focus:border-[#2a14b4]"
            />
          </div>

          {(selectedExam !== 'All' || selectedSubject !== 'All' || selectedDifficulty !== 'All' || searchQuery) && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedExam('All');
                setSelectedSubject('All');
                setSelectedDifficulty('All');
              }}
              className="px-3.5 py-2 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors flex items-center gap-1 shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-[#f1f5f9]">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#64748b] mb-1">
              Filter by Exam
            </label>
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="w-full text-xs bg-white border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#1e293b] focus:outline-hidden focus:border-[#2a14b4]"
            >
              {examOptions.map(ex => (
                <option key={ex} value={ex}>{ex}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#64748b] mb-1">
              Filter by Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full text-xs bg-white border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#1e293b] focus:outline-hidden focus:border-[#2a14b4]"
            >
              {subjects.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#64748b] mb-1">
              Difficulty Level
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full text-xs bg-white border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#1e293b] focus:outline-hidden focus:border-[#2a14b4]"
            >
              {difficulties.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 4. QUIZ CARDS LIST */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4 text-xs font-semibold text-[#5e6278]">
          <span>Available Tests: <strong>{filteredQuizzes.length}</strong></span>
          <span>Negative Marking & Detailed Explanations Included</span>
        </div>

        {filteredQuizzes.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-[#cbd5e1] p-12 text-center">
            <Target className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="font-display font-bold text-base text-[#131b2e]">No tests found matching filters</h3>
            <p className="text-xs text-[#5e6278] mt-1 mb-4">Try selecting another competitive exam category or resetting filters.</p>
            <button
              onClick={() => {
                setSelectedExam('All');
                setSelectedSubject('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 text-xs font-bold text-white bg-[#2a14b4] rounded-xl"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-white rounded-2xl border border-[#dae2fd] p-6 shadow-sm hover:shadow-md hover:border-[#2a14b4] transition-all flex flex-col justify-between group relative"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-[#eaedff] text-[#2a14b4] border border-[#cbd5e1]">
                      {quiz.examCategory}
                    </span>
                    <span className="text-xs font-semibold text-[#64748b] bg-slate-100 px-2 py-0.5 rounded">
                      {quiz.difficulty}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base text-[#131b2e] group-hover:text-[#2a14b4] transition-colors mb-1.5">
                    {quiz.title}
                  </h3>

                  <p className="text-xs text-[#5e6278] line-clamp-2 leading-relaxed mb-4">
                    {quiz.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-[#475569] mb-4 p-2.5 rounded-xl bg-[#f8fafc] border border-slate-100">
                    <div>
                      <span className="text-[#94a3b8] block">Questions:</span>
                      <strong className="text-[#131b2e]">{quiz.questions.length} Qs</strong>
                    </div>
                    <div>
                      <span className="text-[#94a3b8] block">Duration:</span>
                      <strong className="text-[#131b2e]">{quiz.durationMinutes} Mins</strong>
                    </div>
                    <div>
                      <span className="text-[#94a3b8] block">Total Marks:</span>
                      <strong className="text-[#131b2e]">{quiz.maxBenchmark || (quiz.questions.length * (quiz.questions[0]?.marks || 2))} Marks</strong>
                    </div>
                    <div>
                      <span className="text-[#94a3b8] block">Penalty:</span>
                      <strong className="text-rose-600">-{quiz.negativeMarkingPerWrong} marks</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#f1f5f9] flex items-center justify-between">
                  <span className="text-[11px] text-[#64748b]">
                    {quiz.format}
                  </span>
                  <button
                    onClick={() => navigate(`/quiz/${quiz.id}`)}
                    className="px-4 py-2 rounded-xl bg-[#2a14b4] hover:bg-[#200e8f] text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <span>Start Test</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
