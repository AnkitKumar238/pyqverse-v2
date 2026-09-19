import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, FileText, BookOpen, ExternalLink, ArrowRight, CornerDownLeft, Award, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MOCK_PAPERS, MOCK_QUIZZES, MOCK_SUBJECTS, EXAM_CATEGORIES } from '../data/mockData';

export const GlobalSearchModal: React.FC = () => {
  const { searchModalOpen, setSearchModalOpen } = useApp();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [searchModalOpen]);

  if (!searchModalOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const filteredExams = query.trim()
    ? EXAM_CATEGORIES.filter(e =>
        e.name.toLowerCase().includes(trimmed) ||
        e.fullName.toLowerCase().includes(trimmed) ||
        e.shortDescription.toLowerCase().includes(trimmed) ||
        e.subExams.some(se => se.toLowerCase().includes(trimmed))
      ).slice(0, 3)
    : [];

  const filteredPapers = query.trim()
    ? MOCK_PAPERS.filter(p =>
        p.examName.toLowerCase().includes(trimmed) ||
        p.examCategory.toLowerCase().includes(trimmed) ||
        p.paper.toLowerCase().includes(trimmed) ||
        p.subject.toLowerCase().includes(trimmed) ||
        p.stage.toLowerCase().includes(trimmed) ||
        p.year.toString().includes(trimmed)
      ).slice(0, 5)
    : MOCK_PAPERS.slice(0, 3);

  const filteredQuizzes = query.trim()
    ? MOCK_QUIZZES.filter(q =>
        q.title.toLowerCase().includes(trimmed) ||
        q.examName.toLowerCase().includes(trimmed) ||
        q.examCategory.toLowerCase().includes(trimmed) ||
        q.subject.toLowerCase().includes(trimmed)
      ).slice(0, 3)
    : MOCK_QUIZZES.slice(0, 2);

  const handleSelectPaper = (id: string) => {
    setSearchModalOpen(false);
    navigate(`/pdf-viewer/${id}`);
  };

  const handleSelectQuiz = (id: string) => {
    setSearchModalOpen(false);
    navigate(`/quiz/${id}`);
  };

  const handleSelectExam = (name: string) => {
    setSearchModalOpen(false);
    navigate(`/pyqs?exam=${encodeURIComponent(name)}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20 flex justify-center items-start animate-in fade-in duration-150">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setSearchModalOpen(false)}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#dae2fd] overflow-hidden z-10 animate-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#e2e7ff] bg-[#faf8ff]">
          <Search className="w-5 h-5 text-[#2a14b4] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search an exam, subject, year or question paper..."
            className="w-full bg-transparent text-sm sm:text-base text-[#131b2e] placeholder-[#777586] focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#777586] hover:text-[#131b2e] rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setSearchModalOpen(false)}
            className="ml-2 text-xs font-semibold px-2 py-1 bg-[#eaedff] text-[#2a14b4] rounded-md hover:bg-[#dae2fd]"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[65vh] overflow-y-auto p-4 space-y-6">
          {/* Matched Exams if any */}
          {filteredExams.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2.5">
                <Award className="w-4 h-4 text-[#2a14b4]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#5e6278]">
                  Competitive Exams
                </span>
              </div>
              <div className="space-y-1.5">
                {filteredExams.map(exam => (
                  <button
                    key={exam.id}
                    onClick={() => handleSelectExam(exam.name)}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-[#eaedff] flex items-center justify-between group transition-colors border border-transparent hover:border-[#cbd5e1]"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#2a14b4] text-white">
                          {exam.name}
                        </span>
                        <span className="text-sm font-semibold text-[#131b2e]">
                          {exam.fullName}
                        </span>
                      </div>
                      <p className="text-xs text-[#5e6278] mt-0.5 line-clamp-1">{exam.shortDescription}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-[#2a14b4] font-medium shrink-0 ml-2">
                      <span>{exam.paperCount} Papers</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question Papers Section */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5e6278] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#2a14b4]" />
                {query.trim() ? `Question Papers (${filteredPapers.length})` : 'Popular Question Papers'}
              </span>
              <button
                onClick={() => {
                  setSearchModalOpen(false);
                  navigate(`/pyqs?search=${encodeURIComponent(query)}`);
                }}
                className="text-xs font-semibold text-[#2a14b4] hover:underline flex items-center gap-1"
              >
                <span>View all in Explorer</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {filteredPapers.length === 0 ? (
              <p className="text-xs text-[#5e6278] py-2">No question papers matching "{query}"</p>
            ) : (
              <div className="space-y-1.5">
                {filteredPapers.map(paper => (
                  <div
                    key={paper.id}
                    onClick={() => handleSelectPaper(paper.id)}
                    className="p-3 rounded-xl hover:bg-[#f2f3ff] cursor-pointer flex items-center justify-between group transition-colors border border-[#dae2fd]/50 hover:border-[#c7d2fe]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#eaedff] text-[#2a14b4] font-bold text-xs flex items-center justify-center shrink-0 border border-[#cbd5e1]">
                        {paper.year}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#2a14b4]">{paper.examName}</span>
                          <span className="text-[11px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                            {paper.stage}
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-[#131b2e] group-hover:text-[#2a14b4] transition-colors">
                          {paper.paper}
                        </h4>
                        <span className="text-[11px] text-[#5e6278]">{paper.subject} • {paper.language}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[#5e6278] font-medium shrink-0">
                      <span className="hidden sm:inline text-[11px] text-emerald-700 font-medium">Verified</span>
                      <CornerDownLeft className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#2a14b4]" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quizzes Section */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5e6278] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                {query.trim() ? `Practice Quizzes (${filteredQuizzes.length})` : 'Recommended Practice Tests'}
              </span>
              <button
                onClick={() => {
                  setSearchModalOpen(false);
                  navigate('/quizzes');
                }}
                className="text-xs font-semibold text-[#2a14b4] hover:underline flex items-center gap-1"
              >
                <span>View all quizzes</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {filteredQuizzes.length === 0 ? (
              <p className="text-xs text-[#5e6278] py-2">No quizzes matching "{query}"</p>
            ) : (
              <div className="space-y-1.5">
                {filteredQuizzes.map(quiz => (
                  <div
                    key={quiz.id}
                    onClick={() => handleSelectQuiz(quiz.id)}
                    className="p-3 rounded-xl hover:bg-[#f2f3ff] cursor-pointer flex items-center justify-between group transition-colors border border-[#dae2fd]/50"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#2a14b4]">{quiz.examCategory}</span>
                        <span className="text-[11px] text-[#5e6278]">{quiz.format}</span>
                      </div>
                      <h4 className="text-sm font-semibold text-[#131b2e] group-hover:text-[#2a14b4] transition-colors">
                        {quiz.title}
                      </h4>
                    </div>
                    <span className="text-xs font-semibold text-[#2a14b4] bg-[#eaedff] px-2.5 py-1 rounded-lg">
                      Start Test
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 border-t border-[#e2e7ff] bg-[#faf8ff] flex items-center justify-between text-xs text-[#5e6278]">
          <div className="flex items-center gap-3">
            <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-[#cbd5e1] rounded font-mono text-[10px]">ESC</kbd> to close</span>
            <span className="hidden sm:inline">UPSC • SSC • NDA • CDS • GATE • JEE • NEET • Banking</span>
          </div>
          <span>PyQVerse Search</span>
        </div>
      </div>
    </div>
  );
};
