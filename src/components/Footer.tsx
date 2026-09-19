import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, BookOpen, ExternalLink, Award, FileText, CheckCircle2, Mail, Github, Linkedin, MessageSquare } from 'lucide-react';
import { EXAM_CATEGORIES, COMPETITIVE_STATS } from '../data/mockData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0f1424] text-[#a0a5b8] border-t border-[#1e2742] pt-14 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Accreditation & Trust Banner */}
        <div className="pb-10 mb-10 border-b border-[#1e2742] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-white">
            <div className="w-10 h-10 rounded-xl bg-[#1e2a4a] border border-[#2e3e6b] flex items-center justify-center text-[#57dffe]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-display font-semibold text-sm text-white">
                Official Examination Pattern & Verified Answer Keys
              </p>
              <p className="text-xs text-[#80879f]">
                Previous year question papers mapped directly to official examination commission master archives.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#182038] border border-[#2a375e] text-[#c4cbdf]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#57dffe]" />
              {COMPETITIVE_STATS.papers}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#182038] border border-[#2a375e] text-[#c4cbdf]">
              <Award className="w-3.5 h-3.5 text-[#a855f7]" />
              {COMPETITIVE_STATS.questions}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#182038] border border-[#2a375e] text-[#c4cbdf]">
              <BookOpen className="w-3.5 h-3.5 text-[#38bdf8]" />
              {COMPETITIVE_STATS.categories}
            </span>
          </div>
        </div>

        {/* Multi-column navigation links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-9 h-9 rounded-xl bg-[#2a14b4] p-0.5 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M4 4v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6H6a2 2 0 00-2 2z" stroke="#60a5fa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2v6h6" stroke="#60a5fa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 13h5" stroke="#93c5fd" strokeWidth="1.8" strokeLinecap="round"/>
                  <path d="M8 17h8" stroke="#93c5fd" strokeWidth="1.8" strokeLinecap="round"/>
                  <circle cx="15.5" cy="14.5" r="3.5" stroke="#38bdf8" strokeWidth="2" fill="#0f172a"/>
                </svg>
              </div>
              <span className="font-display font-extrabold text-xl text-white tracking-tight">
                PyQ<span className="bg-gradient-to-r from-[#818cf8] to-[#38bdf8] bg-clip-text text-transparent">Verse</span>
              </span>
            </Link>
            <p className="text-xs text-[#8c93ab] leading-relaxed max-w-sm mb-4">
              Previous year question papers, timed practice tests, and exam-wise preparation resources for India's major competitive examinations.
            </p>
            
            {/* Creator Attribution */}
            <div className="space-y-2 pt-2 border-t border-[#1e2742]">
              <p className="text-xs font-semibold text-white">
                Created & Maintained by <span className="text-[#57dffe] font-bold">Ankit Singh Rathore</span>
              </p>
              
              {/* Placeholders for Contact, LinkedIn, GitHub */}
              <div className="flex items-center gap-3 text-xs text-[#9aa2be]">
                <a
                  href="mailto:ankit.rathore@pyqverse.in"
                  className="flex items-center gap-1 hover:text-white transition-colors"
                  title="Contact Email"
                >
                  <Mail className="w-3.5 h-3.5 text-[#57dffe]" />
                  <span>Email</span>
                </a>
                <span>•</span>
                <a
                  href="https://www.linkedin.com/in/ankitsinghrathore-pyqverse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white transition-colors"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>LinkedIn</span>
                </a>
                <span>•</span>
                <a
                  href="https://github.com/ankitsinghrathore/pyqverse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white transition-colors"
                  title="GitHub Profile"
                >
                  <Github className="w-3.5 h-3.5 text-[#cbd5e1]" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 1: Central Govt & Civil Services */}
          <div>
            <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-white mb-3">
              Civil & Staff Exams
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/pyqs?exam=UPSC" className="hover:text-white transition-colors">
                  UPSC Civil Services (CSE)
                </Link>
              </li>
              <li>
                <Link to="/pyqs?exam=SSC" className="hover:text-white transition-colors">
                  SSC CGL & CHSL
                </Link>
              </li>
              <li>
                <Link to="/pyqs?exam=Railways" className="hover:text-white transition-colors">
                  Railways RRB NTPC
                </Link>
              </li>
              <li>
                <Link to="/pyqs?exam=Banking" className="hover:text-white transition-colors">
                  Banking (SBI & IBPS PO)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Defence & Officer Entry */}
          <div>
            <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-white mb-3">
              Defence & Forces
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/pyqs?exam=NDA" className="hover:text-white transition-colors">
                  NDA & NA (Maths & GAT)
                </Link>
              </li>
              <li>
                <Link to="/pyqs?exam=CDS" className="hover:text-white transition-colors">
                  CDS Examination
                </Link>
              </li>
              <li>
                <Link to="/pyqs?exam=AFCAT" className="hover:text-white transition-colors">
                  Air Force AFCAT
                </Link>
              </li>
              <li>
                <Link to="/quizzes" className="hover:text-white transition-colors">
                  Defence Mock Practice
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Entrance & Engineering */}
          <div>
            <h4 className="font-display font-semibold text-xs uppercase tracking-wider text-white mb-3">
              Entrance & PG Exams
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/pyqs?exam=JEE" className="hover:text-white transition-colors">
                  JEE Main & Advanced
                </Link>
              </li>
              <li>
                <Link to="/pyqs?exam=NEET" className="hover:text-white transition-colors">
                  NEET UG Medical
                </Link>
              </li>
              <li>
                <Link to="/pyqs?exam=GATE" className="hover:text-white transition-colors">
                  GATE Engineering (CS/ME/EE)
                </Link>
              </li>
              <li>
                <Link to="/pyqs?exam=CAT" className="hover:text-white transition-colors">
                  CAT Management (IIMs)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 border-t border-[#1e2742] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6e768e]">
          <p>© {new Date().getFullYear()} PyQVerse. Competitive Examination Archive & Practice Platform.</p>
          <div className="flex flex-wrap items-center gap-6">
            <Link to="/about" className="hover:text-[#a0a5b8] transition-colors">About Platform</Link>
            <Link to="/subjects" className="hover:text-[#a0a5b8] transition-colors">Exam Syllabus</Link>
            <Link to="/quizzes" className="hover:text-[#a0a5b8] transition-colors">Live Mock Tests</Link>
            <Link to="/feedback" className="hover:text-[#a0a5b8] transition-colors flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5 text-[#57dffe]" />
              <span>Feedback & Contact</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
