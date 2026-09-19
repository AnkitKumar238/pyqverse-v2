import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Upload, 
  Menu, 
  X, 
  Bookmark, 
  Target,
  Sparkles,
  BookOpen,
  ChevronDown,
  Layers,
  FileText,
  User,
  LogOut,
  TrendingUp,
  MessageSquareHeart,
  LogIn,
  UserPlus
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EXAM_CATEGORIES } from '../data/mockData';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { user, bookmarks, inProgressQuizzes, setSearchModalOpen, setUploadModalOpen, updateUserTarget, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [examPickerOpen, setExamPickerOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Exams', path: '/pyqs' },
    { name: 'PYQ Explorer', path: '/pyqs' },
    { name: 'Practice', path: '/quizzes' },
    { name: 'Exam Syllabus', path: '/subjects' },
    { name: 'Feedback', path: '/feedback' },
    { name: 'About', path: '/about' }
  ];

  const inProgressCount = Object.keys(inProgressQuizzes).length;

  const isActive = (path: string, name?: string) => {
    if (name === 'Home') return location.pathname === '/';
    if (name === 'Exams' && location.search.includes('exam=')) return true;
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#e2e7ff] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1e1464] to-[#2a14b4] p-0.5 shadow-sm shadow-indigo-200 group-hover:scale-105 transition-transform flex items-center justify-center">
              <div className="w-full h-full bg-[#0e122b] rounded-[10px] flex items-center justify-center relative overflow-hidden">
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M4 4v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6H6a2 2 0 00-2 2z" stroke="#60a5fa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2v6h6" stroke="#60a5fa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8 13h5" stroke="#93c5fd" strokeWidth="1.8" strokeLinecap="round"/>
                  <path d="M8 17h8" stroke="#93c5fd" strokeWidth="1.8" strokeLinecap="round"/>
                  <circle cx="15.5" cy="14.5" r="3.5" stroke="#38bdf8" strokeWidth="2" fill="#0f172a"/>
                  <path d="M18 17l3 3" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-xl text-[#131b2e] tracking-tight">
                  PyQ<span className="bg-gradient-to-r from-[#2a14b4] via-[#3b82f6] to-[#0284c7] bg-clip-text text-transparent">Verse</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#eaedff] text-[#2a14b4] border border-[#dae2fd] hidden xs:inline-block">
                  COMPETITIVE
                </span>
              </div>
              <span className="text-[10px] text-[#5e6278] font-medium hidden md:block">
                All India Exam Intelligence & PYQs
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5">
            {/* Home */}
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold transition-colors duration-150 ${
                location.pathname === '/'
                  ? 'text-[#2a14b4] bg-[#eaedff]'
                  : 'text-[#464554] hover:text-[#131b2e] hover:bg-[#f2f3ff]'
              }`}
            >
              Home
            </Link>

            {/* Exams with Dropdown Quick Selector */}
            <div className="relative group">
              <button
                onClick={() => setExamPickerOpen(prev => !prev)}
                className={`px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold transition-colors duration-150 flex items-center gap-1 ${
                  location.pathname === '/pyqs' && !location.search.includes('view=bookmarked')
                    ? 'text-[#2a14b4] bg-[#eaedff]'
                    : 'text-[#464554] hover:text-[#131b2e] hover:bg-[#f2f3ff]'
                }`}
              >
                <span>Exams</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {examPickerOpen && (
                <div 
                  className="absolute left-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-[#dae2fd] p-2 z-50 animate-in fade-in slide-in-from-top-2"
                  onMouseLeave={() => setExamPickerOpen(false)}
                >
                  <div className="px-3 py-2 text-[11px] font-bold text-[#5e6278] uppercase tracking-wider border-b border-[#f1f5f9] flex justify-between items-center">
                    <span>Browse All Exams</span>
                    <Link to="/pyqs" onClick={() => setExamPickerOpen(false)} className="text-[#2a14b4] lowercase hover:underline">view all</Link>
                  </div>
                  <div className="max-h-72 overflow-y-auto py-1 space-y-0.5">
                    {EXAM_CATEGORIES.map(cat => (
                      <Link
                        key={cat.id}
                        to={`/pyqs?exam=${cat.name}`}
                        onClick={() => setExamPickerOpen(false)}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between hover:bg-[#eaedff] text-[#334155] transition-colors"
                      >
                        <div className="flex flex-col">
                          <span className="font-bold text-[#131b2e]">{cat.name}</span>
                          <span className="text-[10px] text-[#64748b] truncate max-w-[130px]">{cat.fullName}</span>
                        </div>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#f1f5f9] font-bold text-[#2a14b4]">{cat.paperCount} Papers</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* PYQ Explorer */}
            <Link
              to="/pyqs"
              className={`px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold transition-colors duration-150 ${
                location.pathname === '/pyqs' && !location.search.includes('view=bookmarked')
                  ? 'text-[#2a14b4] bg-[#eaedff]'
                  : 'text-[#464554] hover:text-[#131b2e] hover:bg-[#f2f3ff]'
              }`}
            >
              PYQ Explorer
            </Link>

            {/* Practice */}
            <Link
              to="/quizzes"
              className={`px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold transition-colors duration-150 ${
                location.pathname.startsWith('/quiz')
                  ? 'text-[#2a14b4] bg-[#eaedff]'
                  : 'text-[#464554] hover:text-[#131b2e] hover:bg-[#f2f3ff]'
              }`}
            >
              Practice
            </Link>

            {/* Exam Syllabus */}
            <Link
              to="/subjects"
              className={`px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold transition-colors duration-150 ${
                location.pathname === '/subjects'
                  ? 'text-[#2a14b4] bg-[#eaedff]'
                  : 'text-[#464554] hover:text-[#131b2e] hover:bg-[#f2f3ff]'
              }`}
            >
              Exam Syllabus
            </Link>

            {/* Feedback */}
            <Link
              to="/feedback"
              className={`px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold transition-colors duration-150 ${
                location.pathname === '/feedback'
                  ? 'text-[#2a14b4] bg-[#eaedff]'
                  : 'text-[#464554] hover:text-[#131b2e] hover:bg-[#f2f3ff]'
              }`}
            >
              Feedback
            </Link>

            {/* About */}
            <Link
              to="/about"
              className={`px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold transition-colors duration-150 ${
                location.pathname === '/about'
                  ? 'text-[#2a14b4] bg-[#eaedff]'
                  : 'text-[#464554] hover:text-[#131b2e] hover:bg-[#f2f3ff]'
              }`}
            >
              About
            </Link>
          </nav>

          {/* Right Action Bar & Auth States */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Search Button */}
            <button
              id="header-search-btn"
              onClick={() => setSearchModalOpen(true)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs text-[#5e6278] bg-[#f2f3ff] hover:bg-[#eaedff] border border-[#dae2fd] rounded-xl transition-colors cursor-pointer"
              title="Search an exam, subject, year or question paper (Ctrl + K)"
            >
              <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2a14b4]" />
              <span className="hidden xl:inline text-xs font-medium">Search...</span>
              <kbd className="hidden xl:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-semibold text-[#5e6278] bg-white border border-[#cbd5e1] rounded shadow-2xs">
                ⌘K
              </kbd>
            </button>

            {/* Saved Bookmarks Shortcut */}
            <Link
              to="/pyqs?view=bookmarked"
              className="relative p-2 text-[#464554] hover:text-[#2a14b4] hover:bg-[#f2f3ff] rounded-xl transition-colors"
              title="Saved Question Papers"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarks.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#2a14b4] text-white text-[10px] font-bold flex items-center justify-center">
                  {bookmarks.length}
                </span>
              )}
            </Link>

            {/* AUTH / USER DASHBOARD BUTTONS */}
            {user.isLoggedIn ? (
              /* LOGGED-IN STATE: Profile, My Progress, Logout */
              <div className="flex items-center gap-1.5 sm:gap-2">
                {/* My Progress Button */}
                <Link
                  to="/progress"
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 ${
                    location.pathname === '/progress' || location.pathname === '/profile'
                      ? 'bg-[#2a14b4] text-white shadow-xs'
                      : 'bg-[#eaedff] text-[#2a14b4] hover:bg-[#dae2fd]'
                  }`}
                  title="My Progress Dashboard"
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">My Progress</span>
                  {inProgressCount > 0 && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" title="Ongoing quiz in progress" />
                  )}
                </Link>

                {/* Profile Badge & Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(prev => !prev)}
                    className="flex items-center gap-1.5 p-1 sm:px-2.5 sm:py-1 rounded-xl bg-white border border-[#cbd5e1] hover:border-[#2a14b4] transition-all cursor-pointer"
                    title={`Logged in as ${user.name}`}
                  >
                    <img
                      src={user.avatarUrl}
                      alt={user.name}
                      className="w-6 h-6 rounded-full object-cover border border-[#cbd5e1]"
                    />
                    <span className="text-xs font-bold text-[#131b2e] hidden md:inline max-w-[100px] truncate">
                      {user.name.split(' ')[0]}
                    </span>
                    <ChevronDown className="w-3 h-3 text-[#64748b] hidden md:inline" />
                  </button>

                  {userMenuOpen && (
                    <div
                      className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-[#dae2fd] p-2 z-50 animate-in fade-in slide-in-from-top-2"
                      onMouseLeave={() => setUserMenuOpen(false)}
                    >
                      <div className="px-3 py-2 border-b border-[#f1f5f9]">
                        <p className="text-xs font-bold text-[#131b2e] truncate">{user.name}</p>
                        <p className="text-[10px] text-[#64748b] truncate">{user.email}</p>
                        <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800">
                          Target: {user.targetExam}
                        </span>
                      </div>

                      <div className="py-1 space-y-0.5 text-xs">
                        <Link
                          to="/progress"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-[#334155] hover:bg-[#eaedff] font-medium"
                        >
                          <TrendingUp className="w-3.5 h-3.5 text-[#2a14b4]" />
                          <span>My Progress Dashboard</span>
                        </Link>
                        <Link
                          to="/profile"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-[#334155] hover:bg-[#eaedff] font-medium"
                        >
                          <User className="w-3.5 h-3.5 text-[#2a14b4]" />
                          <span>Aspirant Profile</span>
                        </Link>
                        <Link
                          to="/settings"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-[#334155] hover:bg-[#eaedff] font-medium"
                        >
                          <Settings className="w-3.5 h-3.5 text-[#2a14b4]" />
                          <span>Account Settings</span>
                        </Link>
                        <Link
                          to="/pyqs?view=bookmarked"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-[#334155] hover:bg-[#eaedff] font-medium"
                        >
                          <Bookmark className="w-3.5 h-3.5 text-[#2a14b4]" />
                          <span>Saved Papers ({bookmarks.length})</span>
                        </Link>
                      </div>

                      <div className="pt-1 border-t border-[#f1f5f9]">
                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            logout();
                          }}
                          className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 text-xs font-bold transition-colors cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Direct Logout Button */}
                <button
                  onClick={logout}
                  className="hidden sm:inline-flex items-center gap-1 p-2 text-[#64748b] hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                  title="Logout to Guest Mode"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              /* GUEST STATE: Login and Register buttons visible */
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Link
                  to="/auth?mode=signin"
                  className="px-3 py-1.5 text-xs font-bold text-[#2a14b4] bg-[#eaedff] hover:bg-[#dae2fd] border border-[#cbd5e1] rounded-xl transition-colors flex items-center gap-1"
                  title="Sign In with your aspirant account"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Login</span>
                </Link>

                <Link
                  to="/auth?mode=signup"
                  className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#2a14b4] hover:bg-[#200e8f] rounded-xl shadow-xs transition-colors flex items-center gap-1"
                  title="Create Free Aspirant Account"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span className="hidden xs:inline">Register</span>
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Menu button */}
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#464554] hover:text-[#131b2e] hover:bg-[#f2f3ff] rounded-xl"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#e2e7ff] px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map(link => {
              const active = isActive(link.path, link.name);
              return (
                <Link
                  key={link.path + link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3.5 py-2.5 rounded-xl text-sm font-semibold ${
                    active
                      ? 'text-[#2a14b4] bg-[#eaedff]'
                      : 'text-[#464554] hover:bg-[#f2f3ff]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile Auth / Profile Section */}
          <div className="pt-3 border-t border-[#f1f5f9] flex flex-col gap-2">
            {user.isLoggedIn ? (
              <div className="space-y-2">
                <div className="p-3 bg-[#faf8ff] rounded-xl border border-[#dae2fd] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full border object-cover" />
                    <div>
                      <p className="text-xs font-bold text-[#131b2e]">{user.name}</p>
                      <p className="text-[10px] text-[#64748b]">Target: {user.targetExam}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    Logged In
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 rounded-xl bg-[#eaedff] text-[#2a14b4] font-bold text-center flex flex-col items-center justify-center gap-1"
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    to="/progress"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 rounded-xl bg-[#2a14b4] text-white font-bold text-center flex flex-col items-center justify-center gap-1"
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span>Progress</span>
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 rounded-xl bg-[#f8fafc] border border-slate-200 text-[#334155] font-bold text-center flex flex-col items-center justify-center gap-1"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </Link>
                </div>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full p-2.5 rounded-xl border border-rose-200 text-rose-600 bg-rose-50 text-xs font-bold text-center flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="p-2.5 bg-[#f8fafc] rounded-xl border border-slate-200 text-xs text-[#5e6278] flex items-center justify-between">
                  <span>Guest Mode (No login required)</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">100% Free</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    to="/auth?mode=signin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 rounded-xl bg-[#eaedff] text-[#2a14b4] text-xs font-bold text-center border border-[#dae2fd] flex items-center justify-center gap-1.5"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/auth?mode=signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 rounded-xl bg-[#2a14b4] text-white text-xs font-bold text-center shadow-xs flex items-center justify-center gap-1.5"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Register</span>
                  </Link>
                </div>
              </div>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setSearchModalOpen(true);
              }}
              className="flex items-center justify-center gap-2 p-2.5 text-xs text-[#475569] bg-[#f8fafc] rounded-xl font-medium border border-[#dae2fd]"
            >
              <Search className="w-4 h-4 text-[#2a14b4]" />
              <span>Search exam, subject, or year...</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
