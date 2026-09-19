import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  Target, 
  Upload, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Users, 
  Globe, 
  Layers,
  ArrowRight,
  TrendingUp,
  FileCheck2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AboutPage: React.FC = () => {
  const { setUploadModalOpen } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Which competitive examinations are covered on PyQVerse?',
      a: 'PyQVerse is dedicated to major national competitive examinations in India: UPSC (Civil Services Prelims & Mains), SSC (CGL, CHSL, MTS, CPO, GD), Defence (NDA, CDS, AFCAT), Engineering (GATE, JEE Main & Advanced), Medical (NEET UG), Management (CAT, XAT), Banking (SBI PO/Clerk, IBPS PO/Clerk, RBI Grade B), and Railways (RRB NTPC, Group D, ALP).'
    },
    {
      q: 'How are past examination papers and official answer keys verified?',
      a: 'All question papers and answer keys are indexed directly from official public examination commission archives (UPSC, Staff Selection Commission, National Testing Agency, Indian Institute of Science / IITs, and Institute of Banking Personnel Selection). Solutions and answer keys reflect the final reconciled commission keys.'
    },
    {
      q: 'Can aspirants download competitive exam papers as PDFs for free?',
      a: 'Yes, 100% free. Every past paper is available as a clean, high-resolution printable PDF with watermarks, official marking schemes, and question-level blueprints for offline solving.'
    },
    {
      q: 'How does the interactive quiz engine simulate real exam conditions?',
      a: 'Our mock test engine strictly applies the official commission marking schemes, including negative marking penalties (-0.66 for UPSC, -0.5 for SSC, -0.33 for GATE), strict time limits, and real-time candidate scorecards with expected cutoff benchmarks.'
    },
    {
      q: 'How can educators and aspirants contribute question papers?',
      a: 'Click "Contribute Paper" in the top bar. You can upload scanned booklets or digital test sets specifying the exam name, year, stage, and official answer keys. Our editorial team reviews each file before publishing.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      {/* 1. HERO MISSION STATEMENT */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eaedff] text-xs font-bold text-[#2a14b4]">
          <Target className="w-3.5 h-3.5" />
          <span>About PyQVerse</span>
        </div>

        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-[#131b2e] tracking-tight">
          India's Premier Competitive Exam Previous Year Question Repository
        </h1>

        <p className="text-base sm:text-lg text-[#464554] leading-relaxed">
          PyQVerse empowers millions of competitive exam aspirants with official past year question papers, verified commission answer keys, negative marking simulators, and topic-wise weightage intelligence.
        </p>
      </div>

      {/* 2. THREE CORE PILLARS OF CRAFT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-3xl p-8 border border-[#dae2fd] shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#eaedff] text-[#2a14b4] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-lg text-[#131b2e]">
            Official Commission Accuracy
          </h3>
          <p className="text-xs sm:text-sm text-[#5e6278] leading-relaxed">
            Authentic question papers straight from UPSC, SSC, NTA, and IIT examination boards. Reconciled against official commission answer keys.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-[#dae2fd] shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-lg text-[#131b2e]">
            Negative Marking & Cutoff Analytics
          </h3>
          <p className="text-xs sm:text-sm text-[#5e6278] leading-relaxed">
            Practice mock tests with realistic penalty deductions and compare your scores against historical category-wise cutoffs for Prelims, Mains, and Tier-1.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-[#dae2fd] shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#fdf2f8] text-[#be185d] flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-lg text-[#131b2e]">
            Topic Frequency Trends
          </h3>
          <p className="text-xs sm:text-sm text-[#5e6278] leading-relaxed">
            Decode 10-year question patterns. Identify high-weightage topics like Indian Polity, Modern History, Quantitative Aptitude, and Organic Chemistry.
          </p>
        </div>
      </div>

      {/* 3. PLATFORM STATS */}
      <div className="bg-[#131b2e] rounded-3xl p-8 sm:p-12 text-white shadow-xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-white/10">
          <div className="pt-4 lg:pt-0">
            <p className="font-display font-extrabold text-3xl sm:text-4xl text-[#57dffe]">15,000+</p>
            <p className="text-xs text-[#a0a5b8] font-bold uppercase mt-1">Archived Exam Papers</p>
          </div>
          <div className="pt-4 lg:pt-0">
            <p className="font-display font-extrabold text-3xl sm:text-4xl text-[#57dffe]">10+</p>
            <p className="text-xs text-[#a0a5b8] font-bold uppercase mt-1">National Exam Categories</p>
          </div>
          <div className="pt-4 lg:pt-0">
            <p className="font-display font-extrabold text-3xl sm:text-4xl text-[#57dffe]">500,000+</p>
            <p className="text-xs text-[#a0a5b8] font-bold uppercase mt-1">Aspirants Prepared</p>
          </div>
          <div className="pt-4 lg:pt-0">
            <p className="font-display font-extrabold text-3xl sm:text-4xl text-[#57dffe]">99.8%</p>
            <p className="text-xs text-[#a0a5b8] font-bold uppercase mt-1">Answer Key Precision</p>
          </div>
        </div>
      </div>

      {/* 4. FREQUENTLY ASKED QUESTIONS */}
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-[#131b2e]">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-[#5e6278]">
            Everything you need to know about past year question preparation on PyQVerse.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#dae2fd] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-display font-bold text-sm sm:text-base text-[#131b2e] hover:bg-[#faf8ff] transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#2a14b4] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#777586] shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-[#5e6278] leading-relaxed border-t border-[#f1f5f9] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. CALL TO ACTION BANNER */}
      <div className="bg-gradient-to-br from-[#2a14b4] to-[#12182b] rounded-3xl p-8 sm:p-12 text-white text-center space-y-6">
        <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white">
          Begin Your Exam Preparation Today
        </h2>
        <p className="text-xs sm:text-sm text-[#cbd5e1] max-w-xl mx-auto leading-relaxed">
          Access over a decade of official question papers, step-by-step solutions, and timed practice mock tests with negative marking.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/pyqs"
            className="px-6 py-3 rounded-xl bg-white text-[#2a14b4] font-bold text-xs hover:bg-slate-100 shadow-md transition-all flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>Browse All Exam Papers</span>
          </Link>
          <button
            onClick={() => setUploadModalOpen(true)}
            className="px-6 py-3 rounded-xl bg-[#57dffe] text-[#0f172a] font-bold text-xs hover:bg-[#43d4f5] shadow-md transition-all flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            <span>Contribute a Question Paper</span>
          </button>
        </div>
      </div>
    </div>
  );
};
