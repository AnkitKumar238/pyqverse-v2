import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Search, 
  CheckCircle2, 
  FileText, 
  BookOpen, 
  Download, 
  Clock, 
  Award, 
  TrendingUp, 
  ShieldCheck, 
  Layers, 
  Check, 
  Compass,
  Building2,
  Cpu,
  Flame,
  HeartPulse,
  Briefcase,
  Landmark,
  Train,
  Target,
  Shield,
  HelpCircle
} from 'lucide-react';
import { EXAM_CATEGORIES, MOCK_PAPERS, MOCK_QUIZZES, COMPETITIVE_STATS } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { downloadPaper, isBookmarked, toggleBookmark } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('All');

  // Interactive Live Question Trial state
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const sampleQuestion = {
    examName: 'UPSC Civil Services Examination',
    paper: 'General Studies Paper 1',
    year: 2024,
    stage: 'Prelims',
    text: 'With reference to the Monetary Policy Committee (MPC) of the Reserve Bank of India, which of the following statements is/are correct?\n1. It determines the policy repo rate to achieve the inflation target.\n2. It consists of 6 members including the RBI Governor who has a casting vote.\n3. The decisions of the MPC are binding upon the Reserve Bank.',
    options: [
      '1 and 2 only',
      '2 and 3 only',
      '1 and 3 only',
      '1, 2 and 3 (All correct)'
    ],
    correctIndex: 3,
    explanation: 'Under Section 45ZB of the RBI Act 1934, the 6-member MPC sets the binding benchmark repo rate, and the Governor has a casting vote in case of ties. All three statements are accurate.'
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      navigate('/pyqs');
      return;
    }
    navigate(`/pyqs?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleOptionClick = (idx: number) => {
    if (revealed) return;
    setSelectedOption(idx);
    setRevealed(true);
  };

  const resetTrialQuestion = () => {
    setSelectedOption(null);
    setRevealed(false);
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2': return <Building2 className="w-6 h-6 text-indigo-600" />;
      case 'Award': return <Award className="w-6 h-6 text-blue-600" />;
      case 'Shield': return <Shield className="w-6 h-6 text-amber-600" />;
      case 'Target': return <Target className="w-6 h-6 text-rose-600" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-purple-600" />;
      case 'Flame': return <Flame className="w-6 h-6 text-cyan-600" />;
      case 'HeartPulse': return <HeartPulse className="w-6 h-6 text-emerald-600" />;
      case 'Briefcase': return <Briefcase className="w-6 h-6 text-amber-600" />;
      case 'Landmark': return <Landmark className="w-6 h-6 text-blue-700" />;
      case 'Train': return <Train className="w-6 h-6 text-emerald-600" />;
      case 'Compass': return <Compass className="w-6 h-6 text-indigo-600" />;
      default: return <BookOpen className="w-6 h-6 text-[#2a14b4]" />;
    }
  };

  const filteredExamCards = selectedCategoryFilter === 'All'
    ? EXAM_CATEGORIES
    : EXAM_CATEGORIES.filter(c => {
        if (selectedCategoryFilter === 'Defence') return ['nda', 'cds', 'afcat'].includes(c.id);
        if (selectedCategoryFilter === 'Engineering & Medical') return ['gate', 'jee', 'neet'].includes(c.id);
        if (selectedCategoryFilter === 'Civil & Govt') return ['upsc', 'ssc', 'railways'].includes(c.id);
        if (selectedCategoryFilter === 'Banking & Management') return ['banking', 'cat'].includes(c.id);
        return true;
      });

  return (
    <div className="relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-[#e8ecff]/70 via-[#f5f7ff]/40 to-transparent pointer-events-none -z-10" />

      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16 pb-14">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eaedff] border border-[#c7d2fe] text-xs font-semibold text-[#2a14b4] shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>India's Dedicated Competitive Examination Repository</span>
            <span className="text-[#94a3b8]">•</span>
            <span className="text-[#4338ca] font-bold">2025–2026 Archive Live</span>
          </div>

          {/* User Requested Hero Headline */}
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#131b2e] tracking-tight leading-[1.15]">
            Prepare Smarter. Practice Previous Years.{' '}
            <span className="bg-gradient-to-r from-[#2a14b4] via-[#3b82f6] to-[#0284c7] bg-clip-text text-transparent">
              Crack Your Exam.
            </span>
          </h1>

          {/* User Requested Supporting Text */}
          <p className="text-base sm:text-lg text-[#464554] leading-relaxed max-w-2xl mx-auto">
            Previous year question papers, practice tests and exam-wise preparation resources for India's major competitive examinations.
          </p>

          {/* Prominent Search Box */}
          <div className="max-w-2xl mx-auto pt-2">
            <form onSubmit={handleSearchSubmit} className="relative group">
              <div className="relative flex items-center bg-white rounded-2xl shadow-xl shadow-indigo-500/5 border-2 border-[#cbd5e1] group-focus-within:border-[#2a14b4] transition-all p-1.5">
                <Search className="w-5 h-5 text-[#2a14b4] ml-3.5 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search an exam, subject, year or question paper..."
                  className="w-full px-3 py-3 text-sm sm:text-base text-[#131b2e] placeholder-[#64748b] bg-transparent focus:outline-hidden"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-[#2a14b4] hover:bg-[#200e8f] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 shrink-0"
                >
                  <span>Search</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            {/* Quick search exam pill suggestions */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 text-xs text-[#5e6278]">
              <span className="font-semibold text-[#131b2e]">Popular:</span>
              {['UPSC Prelims GS 1', 'SSC CGL Tier 1', 'GATE CS', 'JEE Main', 'NEET UG', 'NDA Maths', 'SBI PO'].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => navigate(`/pyqs?search=${encodeURIComponent(item)}`)}
                  className="px-2.5 py-1 rounded-lg bg-[#f1f5f9] hover:bg-[#eaedff] text-[#334155] hover:text-[#2a14b4] transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Primary & Secondary Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#exam-categories-section"
              className="px-6 py-3.5 rounded-xl bg-[#2a14b4] hover:bg-[#200e8f] text-white font-bold text-sm sm:text-base shadow-md hover:shadow-xl transition-all flex items-center gap-2"
            >
              <span>Explore Exams</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              to="/pyqs"
              className="px-6 py-3.5 rounded-xl bg-white hover:bg-[#f2f3ff] text-[#2a14b4] border-2 border-[#cbd5e1] hover:border-[#2a14b4] font-bold text-sm sm:text-base shadow-sm transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Practice PYQs</span>
            </Link>
          </div>
        </div>

        {/* User Journey Banner: Central Preparation Flow */}
        <div className="mt-14 max-w-5xl mx-auto bg-gradient-to-r from-[#1e1b4b] via-[#1e293b] to-[#0f172a] rounded-2xl p-6 sm:p-8 text-white shadow-xl">
          <p className="text-center text-xs uppercase tracking-widest text-[#93c5fd] font-bold mb-4">
            Aspirant Success Workflow
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="w-9 h-9 rounded-lg bg-[#3b82f6] text-white font-black flex items-center justify-center shrink-0">
                1
              </div>
              <div>
                <p className="text-xs text-[#93c5fd] font-semibold">Step 1</p>
                <p className="text-sm font-bold text-white">Choose Exam</p>
                <p className="text-[11px] text-slate-300">Target 11+ competitive categories</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="w-9 h-9 rounded-lg bg-[#6366f1] text-white font-black flex items-center justify-center shrink-0">
                2
              </div>
              <div>
                <p className="text-xs text-[#93c5fd] font-semibold">Step 2</p>
                <p className="text-sm font-bold text-white">Find PYQs</p>
                <p className="text-[11px] text-slate-300">Filter by year, stage & shift</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="w-9 h-9 rounded-lg bg-[#06b6d4] text-white font-black flex items-center justify-center shrink-0">
                3
              </div>
              <div>
                <p className="text-xs text-[#93c5fd] font-semibold">Step 3</p>
                <p className="text-sm font-bold text-white">Practice & Test</p>
                <p className="text-[11px] text-slate-300">Timed sectional sprint drills</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="w-9 h-9 rounded-lg bg-[#10b981] text-white font-black flex items-center justify-center shrink-0">
                4
              </div>
              <div>
                <p className="text-xs text-[#93c5fd] font-semibold">Step 4</p>
                <p className="text-sm font-bold text-white">Track Preparation</p>
                <p className="text-[11px] text-slate-300">Compare with official cutoffs</p>
              </div>
            </div>
          </div>
        </div>

        {/* User Requested Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-12 max-w-5xl mx-auto">
          <div className="p-5 rounded-2xl bg-white border border-[#e2e7ff] shadow-sm text-center">
            <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#2a14b4]">
              {COMPETITIVE_STATS.categories}
            </span>
            <p className="text-xs text-[#5e6278] font-medium mt-1">UPSC, SSC, Defence, GATE & more</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#e2e7ff] shadow-sm text-center">
            <span className="font-display font-extrabold text-2xl sm:text-3xl text-[#0284c7]">
              {COMPETITIVE_STATS.papers}
            </span>
            <p className="text-xs text-[#5e6278] font-medium mt-1">Official Commission Question Papers</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#e2e7ff] shadow-sm text-center">
            <span className="font-display font-extrabold text-2xl sm:text-3xl text-emerald-600">
              {COMPETITIVE_STATS.questions}
            </span>
            <p className="text-xs text-[#5e6278] font-medium mt-1">With Verified Explanations</p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#e2e7ff] shadow-sm text-center">
            <span className="font-display font-extrabold text-2xl sm:text-3xl text-amber-600">
              {COMPETITIVE_STATS.years}
            </span>
            <p className="text-xs text-[#5e6278] font-medium mt-1">Archived Examination Trends</p>
          </div>
        </div>
      </section>

      {/* 2. EXAM CATEGORIES SECTION (CENTRAL FOCUS) */}
      <section id="exam-categories-section" className="py-16 bg-[#f4f7ff] border-y border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eaedff] text-xs font-bold text-[#2a14b4] mb-2">
                <Target className="w-3.5 h-3.5" />
                <span>Central Exam Directory</span>
              </div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#131b2e]">
                Choose Your Competitive Exam
              </h2>
              <p className="text-sm sm:text-base text-[#5e6278] mt-1 max-w-xl">
                Browse official previous year papers, stage-wise answer keys, and timed sectional mock tests by category.
              </p>
            </div>

            {/* Quick Segment Filter */}
            <div className="flex flex-wrap gap-1.5">
              {['All', 'Civil & Govt', 'Defence', 'Engineering & Medical', 'Banking & Management'].map(segment => (
                <button
                  key={segment}
                  onClick={() => setSelectedCategoryFilter(segment)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    selectedCategoryFilter === segment
                      ? 'bg-[#2a14b4] text-white shadow-sm'
                      : 'bg-white text-[#475569] hover:bg-[#eaedff] border border-[#cbd5e1]'
                  }`}
                >
                  {segment}
                </button>
              ))}
            </div>
          </div>

          {/* Large Exam Category Cards: UPSC, SSC, NDA, CDS, GATE, JEE, NEET, CAT, Banking, Railways, AFCAT */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExamCards.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-2xl border border-[#dae2fd] p-6 hover:shadow-xl hover:border-[#2a14b4] transition-all flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Top Accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2a14b4] to-[#38bdf8] opacity-80 group-hover:h-1.5 transition-all" />

                <div>
                  {/* Category Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-[#f2f5ff] border border-[#dae2fd] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      {getCategoryIcon(category.iconName)}
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#eaedff] text-[#2a14b4] border border-[#c7d2fe]">
                      {category.badge}
                    </span>
                  </div>

                  {/* Exam Name */}
                  <h3 className="font-display font-extrabold text-xl text-[#131b2e] group-hover:text-[#2a14b4] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs font-medium text-[#64748b] mb-2">{category.fullName}</p>

                  {/* Short description */}
                  <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-4">
                    {category.shortDescription}
                  </p>

                  {/* Sub-exam tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {category.subExams.slice(0, 3).map((sub, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="pt-4 border-t border-[#f1f5f9] flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#131b2e]">
                      {category.paperCount}+ Available Papers
                    </span>
                    <span className="text-[10px] text-[#64748b]">
                      {category.questionCount.toLocaleString()} Practice Questions
                    </span>
                  </div>

                  {/* User Requested "View Papers" button */}
                  <button
                    onClick={() => navigate(`/pyqs?exam=${encodeURIComponent(category.name)}`)}
                    className="px-4 py-2 rounded-xl bg-[#eaedff] hover:bg-[#2a14b4] text-[#2a14b4] hover:text-white font-bold text-xs transition-colors flex items-center gap-1.5 shadow-2xs group/btn"
                  >
                    <span>View Papers</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FEATURED QUESTION PAPERS SHOWCASE */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-xs font-bold text-emerald-700 mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Latest 2024 Exam Shifts</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#131b2e]">
              High-Frequency Question Papers
            </h2>
            <p className="text-xs sm:text-sm text-[#5e6278]">
              Official papers with step solutions and answer keys published by exam authorities.
            </p>
          </div>
          <Link
            to="/pyqs"
            className="text-xs sm:text-sm font-bold text-[#2a14b4] hover:underline flex items-center gap-1 shrink-0"
          >
            <span>Explore All 1000+ Papers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_PAPERS.slice(0, 6).map((paper) => (
            <div
              key={paper.id}
              className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm hover:shadow-md hover:border-[#2a14b4] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#eaedff] text-[#2a14b4]">
                    {paper.examCategory}
                  </span>
                  <span className="text-xs font-bold text-[#64748b] bg-slate-100 px-2 py-0.5 rounded">
                    {paper.year}
                  </span>
                </div>

                <h3 className="font-display font-bold text-base text-[#131b2e] line-clamp-1 mb-1">
                  {paper.examName}
                </h3>
                <p className="text-xs font-semibold text-[#2a14b4] mb-2">{paper.paper}</p>

                <p className="text-xs text-[#5e6278] line-clamp-2 mb-3">
                  {paper.description}
                </p>

                <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#64748b] mb-4">
                  <span className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200">
                    Stage: {paper.stage}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200">
                    {paper.language}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200">
                    {paper.duration}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#f1f5f9] flex items-center justify-between gap-2">
                <Link
                  to={`/pdf-viewer/${paper.id}`}
                  className="flex-1 py-2 text-center text-xs font-bold text-white bg-[#2a14b4] hover:bg-[#200e8f] rounded-lg transition-colors"
                >
                  View Paper
                </Link>
                <button
                  onClick={() => downloadPaper(paper)}
                  className="p-2 text-[#475569] hover:text-[#2a14b4] hover:bg-[#eaedff] rounded-lg border border-[#cbd5e1] transition-colors"
                  title="Download PDF"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. INTERACTIVE QUESTION TRIAL & SPRINT PREVIEW */}
      <section className="py-14 bg-gradient-to-b from-[#faf8ff] to-[#f0f4ff] border-t border-[#e2e8f0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border-2 border-[#dae2fd] p-6 sm:p-8 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[#f1f5f9]">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#2a14b4]">
                  Interactive Question Sandbox
                </span>
                <h3 className="font-display font-extrabold text-lg sm:text-xl text-[#131b2e]">
                  Solve a Real {sampleQuestion.examName} ({sampleQuestion.year}) Question
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200">
                  Prelims GS 1 • 2 Marks
                </span>
                {revealed && (
                  <button
                    onClick={resetTrialQuestion}
                    className="text-xs font-bold text-[#2a14b4] hover:underline"
                  >
                    Reset Question
                  </button>
                )}
              </div>
            </div>

            {/* Question Text */}
            <p className="text-sm sm:text-base text-[#1e293b] font-medium leading-relaxed mb-6 whitespace-pre-line">
              {sampleQuestion.text}
            </p>

            {/* Multiple Choice Options */}
            <div className="space-y-3 mb-6">
              {sampleQuestion.options.map((opt, idx) => {
                let btnStyle = "bg-white border-[#cbd5e1] text-[#334155] hover:border-[#2a14b4]";
                if (revealed) {
                  if (idx === sampleQuestion.correctIndex) {
                    btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold";
                  } else if (selectedOption === idx) {
                    btnStyle = "bg-rose-50 border-rose-500 text-rose-900 line-through";
                  } else {
                    btnStyle = "bg-slate-50 border-slate-200 text-slate-400 opacity-60";
                  }
                } else if (selectedOption === idx) {
                  btnStyle = "bg-[#eaedff] border-[#2a14b4] text-[#2a14b4] font-bold";
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleOptionClick(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border-2 transition-all flex items-center justify-between text-xs sm:text-sm ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full border border-current font-bold text-xs flex items-center justify-center shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </div>
                    {revealed && idx === sampleQuestion.correctIndex && (
                      <span className="text-xs font-bold text-emerald-700 shrink-0">✓ Official Commission Key</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box */}
            {revealed && (
              <div className="p-4 rounded-xl bg-[#f0fdf4] border border-emerald-200 animate-in fade-in">
                <p className="text-xs font-bold text-emerald-900 mb-1">
                  Official Answer & Analysis:
                </p>
                <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
                  {sampleQuestion.explanation}
                </p>
              </div>
            )}

            {/* CTA bar */}
            <div className="mt-6 pt-4 border-t border-[#f1f5f9] flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-[#64748b]">
                Practice thousands of verified questions with sectional speed drills
              </span>
              <Link
                to="/quizzes"
                className="px-4 py-2 rounded-xl bg-[#2a14b4] text-white text-xs font-bold hover:bg-[#200e8f] transition-colors flex items-center gap-1.5"
              >
                <span>Launch Practice Tests</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
