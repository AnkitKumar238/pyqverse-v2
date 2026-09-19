import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  FileText, 
  Sparkles, 
  ArrowRight, 
  Search, 
  Target, 
  Award,
  CheckCircle2,
  TrendingUp,
  Layers,
  HelpCircle
} from 'lucide-react';
import { MOCK_SUBJECTS, EXAM_CATEGORIES } from '../data/mockData';

export const SubjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedExam, setSelectedExam] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const examFilterList = [
    'All',
    'UPSC',
    'SSC',
    'Defence',
    'GATE',
    'JEE',
    'NEET',
    'CAT',
    'Banking',
    'Railways'
  ];

  const filteredSubjects = useMemo(() => {
    return MOCK_SUBJECTS.filter(s => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = s.name.toLowerCase().includes(q);
        const matchExam = s.examCategory.toLowerCase().includes(q);
        const matchTopics = s.topics.some(t => t.toLowerCase().includes(q));
        if (!matchName && !matchExam && !matchTopics) return false;
      }

      if (selectedExam !== 'All') {
        if (selectedExam === 'Defence') {
          if (!['NDA', 'CDS', 'AFCAT', 'Defence'].includes(s.examCategory)) return false;
        } else if (s.examCategory.toLowerCase() !== selectedExam.toLowerCase()) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, selectedExam]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-[#dae2fd]">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eaedff] text-xs font-bold text-[#2a14b4]">
            <Target className="w-3.5 h-3.5" />
            <span>Competitive Exam Syllabus & Topic Weightage</span>
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#131b2e] tracking-tight">
            Official Exam Syllabus & Blueprints
          </h1>

          <p className="text-sm text-[#464554] leading-relaxed">
            High-yield subject breakdown, topic-wise marks distribution, and previous year question trends across India's top competitive examinations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/pyqs"
            className="px-4 py-2.5 bg-[#2a14b4] hover:bg-[#200e8f] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>All Question Papers</span>
          </Link>
          <Link
            to="/quizzes"
            className="px-4 py-2.5 bg-[#eaedff] hover:bg-[#dae2fd] text-[#2a14b4] text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Practice Tests</span>
          </Link>
        </div>
      </div>

      {/* Search & Exam Filter Toolbar */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2a14b4]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search syllabus topic, subject name (e.g. Quantitative Aptitude, Indian Polity, Modern Physics)..."
            className="w-full pl-12 pr-4 py-3.5 text-sm text-[#131b2e] placeholder-[#777586] bg-white rounded-xl border border-[#dae2fd] focus:outline-hidden focus:border-[#2a14b4] shadow-xs"
          />
        </div>

        {/* Exam Categories Filter Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {examFilterList.map((exam) => (
            <button
              key={exam}
              onClick={() => setSelectedExam(exam)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                selectedExam === exam
                  ? 'bg-[#2a14b4] text-white shadow-xs'
                  : 'bg-white text-[#475569] hover:bg-[#eaedff] border border-[#cbd5e1]'
              }`}
            >
              {exam}
            </button>
          ))}
        </div>
      </div>

      {/* Syllabus Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubjects.map((sub) => (
          <div
            key={sub.id}
            className="bg-white rounded-2xl border border-[#dae2fd] p-6 shadow-sm hover:shadow-md hover:border-[#2a14b4] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-[#eaedff] text-[#2a14b4]">
                  {sub.examCategory}
                </span>
                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                  {sub.weightage} Weightage
                </span>
              </div>

              <h3 className="font-display font-bold text-lg text-[#131b2e] mb-1">
                {sub.name}
              </h3>
              <p className="text-xs text-[#64748b] mb-4">{sub.description}</p>

              {/* Topics tags */}
              <div className="mb-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#94a3b8] block mb-2">
                  Key Examination Sub-Topics:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {sub.topics.map((t, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-[#f8fafc] border border-slate-200 text-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Card Actions */}
            <div className="pt-4 border-t border-[#f1f5f9] flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-[#1e293b]">
                {sub.paperCount}+ PYQ Papers
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigate(`/pyqs?search=${encodeURIComponent(sub.name)}`)}
                  className="px-3 py-1.5 rounded-lg bg-[#eaedff] hover:bg-[#2a14b4] text-[#2a14b4] hover:text-white text-xs font-bold transition-colors"
                >
                  View Papers
                </button>
                <button
                  onClick={() => navigate(`/quizzes?exam=${encodeURIComponent(sub.examCategory)}`)}
                  className="px-3 py-1.5 rounded-lg bg-[#2a14b4] hover:bg-[#200e8f] text-white text-xs font-bold transition-colors shadow-2xs"
                >
                  Practice
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
