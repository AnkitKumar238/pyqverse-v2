import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  FileText, 
  Download, 
  Bookmark, 
  CheckCircle2, 
  Grid, 
  List, 
  RotateCcw, 
  Sparkles, 
  HelpCircle,
  X,
  ChevronRight,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { MOCK_PAPERS, EXAM_CATEGORIES } from '../data/mockData';
import { PYQPaper } from '../types';
import { useApp } from '../context/AppContext';

export const PyqExplorerPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { downloadPaper, isBookmarked, toggleBookmark, setUploadModalOpen, bookmarks } = useApp();

  // URL Query Sync
  const urlSearch = searchParams.get('search') || '';
  const urlExam = searchParams.get('exam') || 'All';
  const urlStage = searchParams.get('stage') || 'All';
  const urlYear = searchParams.get('year') || 'All';
  const urlSubject = searchParams.get('subject') || 'All';
  const urlView = searchParams.get('view') || '';

  // Local Filter States based on user requirements:
  // - Exam
  // - Exam Level/Stage
  // - Year
  // - Subject
  // - Paper
  // - Language
  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [selectedExam, setSelectedExam] = useState(urlExam);
  const [selectedStage, setSelectedStage] = useState(urlStage);
  const [selectedYear, setSelectedYear] = useState(urlYear);
  const [selectedSubject, setSelectedSubject] = useState(urlSubject);
  const [selectedPaper, setSelectedPaper] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [onlyVerifiedKey, setOnlyVerifiedKey] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'downloads' | 'rating'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(urlView === 'bookmarked');

  useEffect(() => {
    if (urlSearch) setSearchQuery(urlSearch);
    if (urlExam && urlExam !== 'All') setSelectedExam(urlExam);
    if (urlStage && urlStage !== 'All') setSelectedStage(urlStage);
    if (urlSubject && urlSubject !== 'All') setSelectedSubject(urlSubject);
    if (urlView === 'bookmarked') setShowOnlyBookmarked(true);
  }, [urlSearch, urlExam, urlStage, urlSubject, urlView]);

  // Derived options for dropdowns
  const availableExams = ['All', ...EXAM_CATEGORIES.map(c => c.name)];
  const availableStages = ['All', 'Prelims', 'Mains', 'Tier 1', 'Tier 2', 'CBT 1', 'CBT 2', 'Paper 1', 'Paper 2', 'Single Shift CBT'];
  const availableYears = ['All', '2025', '2024', '2023', '2022', '2021', '2020'];
  const availableSubjects = [
    'All',
    'General Studies',
    'Quantitative Aptitude',
    'Mathematics',
    'Reasoning',
    'Physics',
    'Chemistry',
    'Biology',
    'English',
    'Computer Science',
    'General Knowledge'
  ];
  const availablePapers = ['All', 'Paper 1', 'Paper 2', 'General Studies Paper 1', 'CSAT Paper 2', 'Quantitative Aptitude', 'Mathematics', 'Biology'];
  const availableLanguages = ['All', 'Bilingual', 'English', 'Hindi'];

  // Filtering Logic
  const filteredPapers = useMemo(() => {
    return MOCK_PAPERS.filter(paper => {
      // Bookmark filter
      if (showOnlyBookmarked && !bookmarks.includes(paper.id)) {
        return false;
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = paper.paper.toLowerCase().includes(q);
        const matchExam = paper.examName.toLowerCase().includes(q) || paper.examCategory.toLowerCase().includes(q);
        const matchSubject = paper.subject.toLowerCase().includes(q);
        const matchStage = paper.stage.toLowerCase().includes(q);
        const matchTopics = paper.syllabusTopics?.some(t => t.toLowerCase().includes(q));
        if (!matchTitle && !matchExam && !matchSubject && !matchStage && !matchTopics) {
          return false;
        }
      }

      // Exam Filter
      if (selectedExam !== 'All') {
        if (paper.examCategory.toLowerCase() !== selectedExam.toLowerCase() && !paper.examName.toLowerCase().includes(selectedExam.toLowerCase())) {
          return false;
        }
      }

      // Stage Filter
      if (selectedStage !== 'All') {
        if (!paper.stage.toLowerCase().includes(selectedStage.toLowerCase())) {
          return false;
        }
      }

      // Year Filter
      if (selectedYear !== 'All') {
        if (paper.year.toString() !== selectedYear) {
          return false;
        }
      }

      // Subject Filter
      if (selectedSubject !== 'All') {
        if (!paper.subject.toLowerCase().includes(selectedSubject.toLowerCase())) {
          return false;
        }
      }

      // Paper Filter
      if (selectedPaper !== 'All') {
        if (!paper.paper.toLowerCase().includes(selectedPaper.toLowerCase())) {
          return false;
        }
      }

      // Language Filter
      if (selectedLanguage !== 'All') {
        if (paper.language.toLowerCase() !== selectedLanguage.toLowerCase()) {
          return false;
        }
      }

      // Verified Key Filter
      if (onlyVerifiedKey && !paper.verificationStatus.includes('Official')) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') return b.year - a.year;
      if (sortBy === 'downloads') return b.downloadCount - a.downloadCount;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [
    showOnlyBookmarked,
    bookmarks,
    searchQuery,
    selectedExam,
    selectedStage,
    selectedYear,
    selectedSubject,
    selectedPaper,
    selectedLanguage,
    onlyVerifiedKey,
    sortBy
  ]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedExam('All');
    setSelectedStage('All');
    setSelectedYear('All');
    setSelectedSubject('All');
    setSelectedPaper('All');
    setSelectedLanguage('All');
    setOnlyVerifiedKey(false);
    setShowOnlyBookmarked(false);
    setSearchParams({});
  };

  const activeFilterCount = [
    selectedExam !== 'All',
    selectedStage !== 'All',
    selectedYear !== 'All',
    selectedSubject !== 'All',
    selectedPaper !== 'All',
    selectedLanguage !== 'All',
    onlyVerifiedKey,
    showOnlyBookmarked,
    searchQuery.trim().length > 0
  ].filter(Boolean).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Header Banner */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#5e6278] mb-1">
              <Link to="/" className="hover:text-[#2a14b4]">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#cbd5e1]" />
              <span className="text-[#2a14b4]">PYQ Explorer</span>
            </div>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#131b2e]">
              Competitive Exam Question Papers
            </h1>
            <p className="text-xs sm:text-sm text-[#5e6278] mt-1">
              Filter official question papers across UPSC, SSC, Defence, GATE, JEE, NEET, Banking, and Railways.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setUploadModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-white border border-[#cbd5e1] hover:border-[#2a14b4] text-[#131b2e] text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#2a14b4]" />
              <span>Contribute / Request Paper</span>
            </button>
            <Link
              to="/quizzes"
              className="px-3.5 py-2 rounded-xl bg-[#2a14b4] hover:bg-[#200e8f] text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sectional Quizzes</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Primary Filters Toolbar */}
      <div className="bg-white rounded-2xl border border-[#dae2fd] shadow-sm p-4 sm:p-5 mb-8 space-y-4">
        {/* Search row */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#2a14b4] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search an exam, subject, year or question paper..."
              className="w-full pl-10 pr-4 py-2.5 bg-[#faf8ff] border border-[#cbd5e1] rounded-xl text-xs sm:text-sm text-[#131b2e] placeholder-[#777586] focus:outline-hidden focus:border-[#2a14b4]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowOnlyBookmarked(!showOnlyBookmarked)}
              className={`px-3 py-2 text-xs font-bold rounded-xl border transition-colors flex items-center gap-1.5 ${
                showOnlyBookmarked
                  ? 'bg-[#eaedff] border-[#2a14b4] text-[#2a14b4]'
                  : 'bg-white border-[#cbd5e1] text-[#475569] hover:bg-slate-50'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Saved ({bookmarks.length})</span>
            </button>

            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="px-3 py-2 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors flex items-center gap-1"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* 6 Core Filter Dropdowns (Exam, Stage, Year, Subject, Paper, Language) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-2 border-t border-[#f1f5f9]">
          {/* 1. Exam Filter */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#64748b] mb-1">
              Exam
            </label>
            <select
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value)}
              className="w-full text-xs bg-white border border-[#cbd5e1] rounded-lg px-2.5 py-1.5 text-[#1e293b] focus:outline-hidden focus:border-[#2a14b4]"
            >
              {availableExams.map(ex => (
                <option key={ex} value={ex}>{ex}</option>
              ))}
            </select>
          </div>

          {/* 2. Exam Level / Stage */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#64748b] mb-1">
              Level / Stage
            </label>
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="w-full text-xs bg-white border border-[#cbd5e1] rounded-lg px-2.5 py-1.5 text-[#1e293b] focus:outline-hidden focus:border-[#2a14b4]"
            >
              {availableStages.map(stg => (
                <option key={stg} value={stg}>{stg}</option>
              ))}
            </select>
          </div>

          {/* 3. Year */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#64748b] mb-1">
              Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full text-xs bg-white border border-[#cbd5e1] rounded-lg px-2.5 py-1.5 text-[#1e293b] focus:outline-hidden focus:border-[#2a14b4]"
            >
              {availableYears.map(yr => (
                <option key={yr} value={yr}>{yr}</option>
              ))}
            </select>
          </div>

          {/* 4. Subject */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#64748b] mb-1">
              Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full text-xs bg-white border border-[#cbd5e1] rounded-lg px-2.5 py-1.5 text-[#1e293b] focus:outline-hidden focus:border-[#2a14b4]"
            >
              {availableSubjects.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

          {/* 5. Paper */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#64748b] mb-1">
              Paper
            </label>
            <select
              value={selectedPaper}
              onChange={(e) => setSelectedPaper(e.target.value)}
              className="w-full text-xs bg-white border border-[#cbd5e1] rounded-lg px-2.5 py-1.5 text-[#1e293b] focus:outline-hidden focus:border-[#2a14b4]"
            >
              {availablePapers.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* 6. Language */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#64748b] mb-1">
              Language
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full text-xs bg-white border border-[#cbd5e1] rounded-lg px-2.5 py-1.5 text-[#1e293b] focus:outline-hidden focus:border-[#2a14b4]"
            >
              {availableLanguages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Bottom controls row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-[#475569] hover:text-[#131b2e]">
            <input
              type="checkbox"
              checked={onlyVerifiedKey}
              onChange={(e) => setOnlyVerifiedKey(e.target.checked)}
              className="rounded text-[#2a14b4] focus:ring-[#2a14b4] w-3.5 h-3.5"
            />
            <span className="font-semibold">Official Answer Key Available Only</span>
          </label>

          <div className="flex items-center gap-3">
            <span className="text-[#64748b]">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs bg-white border border-[#cbd5e1] rounded-lg px-2 py-1 text-[#1e293b] focus:outline-hidden"
            >
              <option value="newest">Latest Year</option>
              <option value="downloads">Most Downloaded</option>
              <option value="rating">Highest Rated</option>
            </select>

            <div className="flex items-center border border-[#cbd5e1] rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 ${viewMode === 'grid' ? 'bg-[#eaedff] text-[#2a14b4]' : 'bg-white text-[#64748b]'}`}
                title="Grid View"
              >
                <Grid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 ${viewMode === 'list' ? 'bg-[#eaedff] text-[#2a14b4]' : 'bg-white text-[#64748b]'}`}
                title="List View"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Header & Counter */}
      <div className="flex items-center justify-between mb-4 text-xs font-semibold text-[#5e6278]">
        <div>
          Showing <strong className="text-[#131b2e]">{filteredPapers.length}</strong> question papers
          {selectedExam !== 'All' && <span> for <strong>{selectedExam}</strong></span>}
          {selectedYear !== 'All' && <span> in <strong>{selectedYear}</strong></span>}
        </div>
        <span>100% Commission Verified</span>
      </div>

      {/* Empty State */}
      {filteredPapers.length === 0 ? (
        <div className="bg-white rounded-2xl border border-dashed border-[#cbd5e1] p-12 text-center">
          <FileText className="w-12 h-12 text-[#94a3b8] mx-auto mb-3" />
          <h3 className="font-display font-bold text-lg text-[#131b2e] mb-1">
            No question papers found
          </h3>
          <p className="text-xs text-[#5e6278] max-w-md mx-auto mb-6">
            We couldn't find any papers matching your current filters. Try relaxing your filters or search for another competitive exam.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 text-xs font-bold text-white bg-[#2a14b4] hover:bg-[#200e8f] rounded-xl transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW OF PYQ CARDS */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPapers.map((paper) => {
            const bookmarked = isBookmarked(paper.id);
            return (
              <div
                key={paper.id}
                className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm hover:shadow-md hover:border-[#2a14b4] transition-all flex flex-col justify-between group relative"
              >
                <div>
                  {/* Top metadata tags */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-[#eaedff] text-[#2a14b4] border border-[#cbd5e1]">
                      {paper.examCategory}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        {paper.year}
                      </span>
                      <button
                        onClick={() => toggleBookmark(paper.id)}
                        className={`p-1.5 rounded-lg border transition-colors ${
                          bookmarked 
                            ? 'bg-indigo-50 border-indigo-200 text-[#2a14b4]' 
                            : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600'
                        }`}
                        title={bookmarked ? 'Remove bookmark' : 'Bookmark paper'}
                      >
                        <Bookmark className="w-3.5 h-3.5" fill={bookmarked ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </div>

                  {/* Exam Name */}
                  <h3 className="font-display font-bold text-base text-[#131b2e] group-hover:text-[#2a14b4] transition-colors line-clamp-1">
                    {paper.examName}
                  </h3>

                  {/* Paper / Subject */}
                  <p className="text-xs font-bold text-[#2a14b4] mt-0.5 mb-2">
                    {paper.paper} • {paper.subject}
                  </p>

                  {/* Stage / Paper & Language */}
                  <div className="flex flex-wrap gap-1.5 mb-3 text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                      Stage: {paper.stage}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                      Lang: {paper.language}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-medium border border-emerald-200">
                      {paper.verificationStatus}
                    </span>
                  </div>

                  {/* Description snippet */}
                  <p className="text-xs text-[#5e6278] line-clamp-2 leading-relaxed mb-4">
                    {paper.description}
                  </p>
                </div>

                {/* Card Action Buttons (User Requested: View Paper, Download PDF, Practice Questions) */}
                <div className="pt-3 border-t border-[#f1f5f9] space-y-2">
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/pdf-viewer/${paper.id}`}
                      className="flex-1 py-2 text-center text-xs font-bold text-white bg-[#2a14b4] hover:bg-[#200e8f] rounded-xl transition-colors shadow-2xs"
                    >
                      View Paper
                    </Link>
                    <button
                      onClick={() => downloadPaper(paper)}
                      className="py-2 px-3 text-xs font-semibold text-[#334155] hover:text-[#2a14b4] hover:bg-[#eaedff] border border-[#cbd5e1] rounded-xl transition-colors flex items-center gap-1"
                      title="Download PDF"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">PDF</span>
                    </button>
                  </div>

                  <button
                    onClick={() => navigate(`/quizzes?exam=${encodeURIComponent(paper.examCategory)}`)}
                    className="w-full py-1.5 text-center text-[11px] font-bold text-[#2a14b4] hover:bg-[#eaedff] border border-dashed border-[#cbd5e1] rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Practice Questions</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* LIST VIEW OF PYQ CARDS */
        <div className="space-y-3">
          {filteredPapers.map((paper) => {
            const bookmarked = isBookmarked(paper.id);
            return (
              <div
                key={paper.id}
                className="bg-white rounded-xl border border-[#dae2fd] p-4 hover:shadow-md hover:border-[#2a14b4] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#eaedff] text-[#2a14b4] font-extrabold text-sm flex items-center justify-center shrink-0 border border-[#cbd5e1]">
                    {paper.year}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#2a14b4] text-white">
                        {paper.examCategory}
                      </span>
                      <span className="text-xs font-semibold text-[#64748b]">
                        Stage: {paper.stage}
                      </span>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                        {paper.language}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-base text-[#131b2e]">
                      {paper.examName} — {paper.paper}
                    </h3>
                    <p className="text-xs text-[#5e6278] line-clamp-1 mt-0.5">
                      Subject: {paper.subject} • Total Marks: {paper.totalMarks} • Time: {paper.duration} • Negative: {paper.negativeMarking}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => toggleBookmark(paper.id)}
                    className={`p-2 rounded-lg border transition-colors ${
                      bookmarked ? 'bg-indigo-50 border-indigo-200 text-[#2a14b4]' : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" fill={bookmarked ? 'currentColor' : 'none'} />
                  </button>
                  <Link
                    to={`/pdf-viewer/${paper.id}`}
                    className="px-3 py-1.5 text-xs font-bold text-white bg-[#2a14b4] hover:bg-[#200e8f] rounded-lg transition-colors"
                  >
                    View Paper
                  </Link>
                  <button
                    onClick={() => downloadPaper(paper)}
                    className="p-2 text-[#334155] hover:text-[#2a14b4] hover:bg-[#eaedff] border border-[#cbd5e1] rounded-lg transition-colors"
                    title="Download PDF"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigate(`/quizzes?exam=${encodeURIComponent(paper.examCategory)}`)}
                    className="px-3 py-1.5 text-xs font-bold text-[#2a14b4] bg-[#eaedff] hover:bg-[#dae2fd] rounded-lg transition-colors"
                  >
                    Practice
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
