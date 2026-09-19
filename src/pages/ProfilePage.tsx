import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Target, 
  FileText, 
  Camera, 
  Check, 
  X, 
  Edit3, 
  Sparkles, 
  Calendar, 
  TrendingUp, 
  Bookmark, 
  ShieldCheck, 
  Settings, 
  LogOut, 
  ArrowRight,
  UserPlus,
  LogIn,
  AlertCircle,
  Clock,
  Layers,
  Award
} from 'lucide-react';
import { useApp, CURATED_AVATARS } from '../context/AppContext';
import { EXAM_CATEGORIES } from '../data/mockData';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUserProfile, bookmarks, quizAttempts, logout, showToast } = useApp();

  // Edit Mode state
  const [isEditing, setIsEditing] = useState(false);

  // Form edit states
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [targetExam, setTargetExam] = useState(user.targetExam);
  const [targetYear, setTargetYear] = useState(user.targetYear);
  const [bio, setBio] = useState(user.bio || '');
  const [selectedAvatarUrl, setSelectedAvatarUrl] = useState(user.avatarUrl);
  const [customAvatarInput, setCustomAvatarInput] = useState('');
  const [showCustomAvatarModal, setShowCustomAvatarModal] = useState(false);

  // Stats
  const totalQuizzes = quizAttempts.length;
  const averageAccuracy = totalQuizzes > 0
    ? Math.round(quizAttempts.reduce((acc, q) => acc + q.percentage, 0) / totalQuizzes)
    : 0;

  const handleStartEdit = () => {
    setName(user.name);
    setEmail(user.email);
    setTargetExam(user.targetExam);
    setTargetYear(user.targetYear);
    setBio(user.bio || '');
    setSelectedAvatarUrl(user.avatarUrl);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setName(user.name);
    setEmail(user.email);
    setTargetExam(user.targetExam);
    setTargetYear(user.targetYear);
    setBio(user.bio || '');
    setSelectedAvatarUrl(user.avatarUrl);
    setIsEditing(false);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Name cannot be empty.', 'warning');
      return;
    }

    updateUserProfile({
      name: name.trim(),
      email: email.trim(),
      targetExam,
      targetYear,
      bio: bio.trim(),
      avatarUrl: selectedAvatarUrl
    });

    setIsEditing(false);
  };

  const handleApplyCustomAvatar = (e: React.FormEvent) => {
    e.preventDefault();
    if (customAvatarInput.trim()) {
      setSelectedAvatarUrl(customAvatarInput.trim());
      setShowCustomAvatarModal(false);
      setCustomAvatarInput('');
      showToast('Custom avatar URL applied!', 'info');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      
      {/* 1. GUEST NOTICE IF NOT LOGGED IN */}
      {!user.isLoggedIn && (
        <div className="bg-[#fffbeb] border-2 border-amber-300 rounded-3xl p-6 sm:p-8 text-amber-950 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-200 text-amber-900 flex items-center justify-center shrink-0 border border-amber-300">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display font-extrabold text-lg text-amber-950">
                  You are currently in Guest Aspirant Mode
                </h3>
                <p className="text-xs sm:text-sm text-amber-800 leading-relaxed max-w-xl">
                  Guest users can access all PYQs and practice tests without logging in. To create your personalized multi-device profile with editable avatar, bio, and cloud sync, create a free account.
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
              <Link
                to="/auth?mode=signin"
                className="px-4 py-2.5 bg-white hover:bg-amber-100/60 border border-amber-300 text-amber-900 text-xs font-bold rounded-xl transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* 2. PROFILE HERO & DETAILS CARD */}
      <div className="bg-white rounded-3xl border border-[#dae2fd] shadow-md overflow-hidden">
        {/* Banner Header Strip */}
        <div className="h-32 sm:h-40 bg-gradient-to-r from-[#1e1464] via-[#2a14b4] to-[#0284c7] relative">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            {user.isLoggedIn && !isEditing && (
              <button
                onClick={handleStartEdit}
                className="px-3.5 py-1.5 bg-white/20 hover:bg-white/30 text-white backdrop-blur-md rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 border border-white/20 cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Profile</span>
              </button>
            )}
            <Link
              to="/settings"
              className="p-1.5 bg-white/20 hover:bg-white/30 text-white backdrop-blur-md rounded-xl text-xs transition-colors border border-white/20"
              title="Account Settings"
            >
              <Settings className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Profile Content Body */}
        <div className="px-6 sm:px-10 pb-8 sm:pb-10 pt-0 relative">
          
          {/* Avatar and Top Info */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-6 pb-6 border-b border-[#f1f5f9]">
            <div className="flex flex-col sm:flex-row sm:items-end gap-5">
              {/* Avatar with edit overlay */}
              <div className="relative group shrink-0">
                <img
                  src={isEditing ? selectedAvatarUrl : user.avatarUrl}
                  alt={user.name}
                  className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover border-4 border-white shadow-xl bg-white"
                />
                {isEditing && (
                  <button
                    type="button"
                    onClick={() => setShowCustomAvatarModal(true)}
                    className="absolute inset-0 bg-black/50 text-white rounded-3xl flex flex-col items-center justify-center opacity-90 hover:opacity-100 transition-opacity text-[11px] font-bold gap-1 cursor-pointer"
                  >
                    <Camera className="w-5 h-5" />
                    <span>Change</span>
                  </button>
                )}
              </div>

              {/* Aspirant Title & Badges */}
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#131b2e]">
                    {user.name}
                  </h1>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    user.isLoggedIn
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {user.isLoggedIn ? 'Verified Aspirant' : 'Guest Account'}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#5e6278]">
                  {user.email || 'guest@pyqverse.local'}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-[#64748b] pt-1">
                  <span className="flex items-center gap-1">
                    <Target className="w-3.5 h-3.5 text-[#2a14b4]" />
                    <span>Target: <strong>{user.targetExam} ({user.targetYear})</strong></span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#64748b]" />
                    <span>Joined {new Date(user.joinedDate).toLocaleDateString([], { month: 'short', year: 'numeric' })}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <Link
                to="/progress"
                className="px-4 py-2 bg-[#eaedff] hover:bg-[#dae2fd] text-[#2a14b4] text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>My Progress</span>
              </Link>
              {user.isLoggedIn && (
                <button
                  onClick={logout}
                  className="px-3 py-2 border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              )}
            </div>
          </div>

          {/* EDIT FORM VIEW OR READ-ONLY VIEW */}
          {isEditing ? (
            /* EDIT PROFILE FORM */
            <form onSubmit={handleSaveProfile} className="space-y-6 animate-in fade-in">
              <div className="p-4 rounded-2xl bg-[#f8fafc] border border-slate-200 space-y-3">
                <label className="block text-xs font-bold text-[#131b2e]">
                  Select Avatar
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  {CURATED_AVATARS.map(av => (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => setSelectedAvatarUrl(av.url)}
                      className={`w-12 h-12 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                        selectedAvatarUrl === av.url
                          ? 'border-[#2a14b4] ring-2 ring-[#c7d2fe] scale-105'
                          : 'border-slate-300 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={av.url} alt={av.label} className="w-full h-full object-cover" />
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setShowCustomAvatarModal(true)}
                    className="px-3 py-2 text-xs font-bold text-[#2a14b4] bg-white border border-[#dae2fd] rounded-xl hover:bg-[#eaedff]"
                  >
                    Custom URL...
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-[#131b2e] mb-1.5">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 bg-[#faf8ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] focus:outline-hidden focus:border-[#2a14b4]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#131b2e] mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 bg-[#faf8ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] focus:outline-hidden focus:border-[#2a14b4]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-[#131b2e] mb-1.5">
                    Target Competitive Exam
                  </label>
                  <select
                    value={targetExam}
                    onChange={(e) => setTargetExam(e.target.value)}
                    className="w-full p-3 bg-[#faf8ff] border border-[#dae2fd] rounded-xl text-xs font-semibold text-[#131b2e] focus:outline-hidden focus:border-[#2a14b4]"
                  >
                    {EXAM_CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name} ({cat.fullName})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#131b2e] mb-1.5">
                    Target Exam Year
                  </label>
                  <select
                    value={targetYear}
                    onChange={(e) => setTargetYear(e.target.value)}
                    className="w-full p-3 bg-[#faf8ff] border border-[#dae2fd] rounded-xl text-xs font-semibold text-[#131b2e] focus:outline-hidden focus:border-[#2a14b4]"
                  >
                    <option value={2025}>2025</option>
                    <option value={2026}>2026</option>
                    <option value={2027}>2027</option>
                    <option value={2028}>2028</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#131b2e] mb-1.5 text-xs">
                  Aspirant Bio / Study Strategy (Optional)
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="e.g. UPSC CSE 2025 aspirant focusing on Mains answer writing and daily PYQ speed sprints..."
                  className="w-full p-3.5 bg-[#faf8ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] focus:outline-hidden focus:border-[#2a14b4] leading-relaxed"
                />
              </div>

              {/* Form Action Buttons (Save / Cancel) */}
              <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#f1f5f9]">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-5 py-2.5 border border-[#cbd5e1] hover:bg-slate-50 text-xs font-bold text-[#475569] rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Cancel</span>
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#2a14b4] hover:bg-[#200e8f] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          ) : (
            /* READ-ONLY PROFILE SUMMARY */
            <div className="space-y-6">
              {/* Bio block */}
              {user.bio ? (
                <div className="p-4 rounded-2xl bg-[#faf8ff] border border-[#dae2fd] text-xs text-[#334155] leading-relaxed">
                  <span className="font-bold text-[#2a14b4] block mb-1">Aspirant Bio:</span>
                  <p>{user.bio}</p>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-[#f8fafc] border border-dashed border-slate-300 text-xs text-[#64748b] flex items-center justify-between">
                  <span>No bio added yet. Share your study target or strategy.</span>
                  <button
                    onClick={handleStartEdit}
                    className="text-[#2a14b4] font-bold hover:underline"
                  >
                    + Add Bio
                  </button>
                </div>
              )}

              {/* 3 Preparation Metric Summary Tiles */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-[#e2e8f0] shadow-2xs space-y-1">
                  <div className="flex items-center justify-between text-[#64748b]">
                    <span className="text-xs font-medium">Saved Bookmarks</span>
                    <Bookmark className="w-4 h-4 text-[#2a14b4]" />
                  </div>
                  <p className="font-display font-black text-2xl text-[#131b2e]">{bookmarks.length}</p>
                  <span className="text-[10px] text-[#64748b]">Official PYQ Booklets</span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#e2e8f0] shadow-2xs space-y-1">
                  <div className="flex items-center justify-between text-[#64748b]">
                    <span className="text-xs font-medium">Tests Evaluated</span>
                    <Award className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="font-display font-black text-2xl text-emerald-600">{totalQuizzes}</p>
                  <span className="text-[10px] text-[#64748b]">Commission standard scorecards</span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#e2e8f0] shadow-2xs space-y-1">
                  <div className="flex items-center justify-between text-[#64748b]">
                    <span className="text-xs font-medium">Accuracy Benchmark</span>
                    <TrendingUp className="w-4 h-4 text-indigo-600" />
                  </div>
                  <p className="font-display font-black text-2xl text-[#131b2e]">{averageAccuracy}%</p>
                  <span className="text-[10px] text-[#64748b]">Net positive scaled marks</span>
                </div>
              </div>

              {/* Navigation Hub Links */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  to="/progress"
                  className="px-4 py-2.5 bg-[#2a14b4] hover:bg-[#200e8f] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Open Full My Progress Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  to="/settings"
                  className="px-4 py-2.5 border border-[#cbd5e1] hover:bg-slate-50 text-xs font-bold text-[#334155] rounded-xl transition-colors flex items-center gap-1.5"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Account & Sync Settings</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. CUSTOM AVATAR URL MODAL */}
      {showCustomAvatarModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex justify-center items-center">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={() => setShowCustomAvatarModal(false)} />
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#dae2fd] p-6 space-y-4">
            <h3 className="font-display font-extrabold text-lg text-[#131b2e]">
              Custom Avatar Image URL
            </h3>
            <p className="text-xs text-[#5e6278] leading-relaxed">
              Paste a public image URL (e.g. Unsplash, GitHub profile photo, or Gravatar) to use as your aspirant avatar.
            </p>

            <form onSubmit={handleApplyCustomAvatar} className="space-y-4">
              <input
                type="url"
                required
                value={customAvatarInput}
                onChange={(e) => setCustomAvatarInput(e.target.value)}
                placeholder="https://example.com/avatar.jpg"
                className="w-full p-3 bg-[#faf8ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] focus:outline-hidden focus:border-[#2a14b4]"
              />

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCustomAvatarModal(false)}
                  className="px-4 py-2 text-xs font-bold text-[#64748b] hover:bg-[#f1f5f9] rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#2a14b4] hover:bg-[#200e8f] rounded-xl shadow-xs"
                >
                  Apply Avatar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
