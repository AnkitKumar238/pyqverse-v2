import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { 
  Target, 
  Lock, 
  Mail, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  BookOpen,
  Building2,
  Calendar
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EXAM_CATEGORIES } from '../data/mockData';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, showToast } = useApp();

  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'signin';
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [targetExam, setTargetExam] = useState('UPSC CSE');
  const [targetYear, setTargetYear] = useState('2025');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const aspirantName = name.trim() || (email.split('@')[0] || 'Aarav Sharma');
    login({
      name: aspirantName,
      email: email || 'aarav.aspirant@pyqverse.in',
      targetExam,
      targetYear
    });
    showToast(
      mode === 'signup' 
        ? `Welcome to PyQVerse, ${aspirantName}! Your aspirant profile is configured.` 
        : `Signed in successfully as ${aspirantName}!`,
      'success'
    );
    navigate('/progress');
  };

  const handleDemoFill = (type: 'upsc' | 'ssc' | 'gate') => {
    if (type === 'upsc') {
      setName('Aditya Verma');
      setEmail('aditya.upsc@aspirant.in');
      setPassword('demoPassword123');
      setTargetExam('UPSC CSE');
      setTargetYear('2025');
    } else if (type === 'ssc') {
      setName('Priya Sharma');
      setEmail('priya.ssc@aspirant.in');
      setPassword('demoPassword123');
      setTargetExam('SSC CGL');
      setTargetYear('2025');
    } else {
      setName('Rohan Nair');
      setEmail('rohan.gate@aspirant.in');
      setPassword('demoPassword123');
      setTargetExam('GATE CS');
      setTargetYear('2026');
    }
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-[#dae2fd] shadow-lg space-y-6">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#2a14b4] text-white flex items-center justify-center mx-auto shadow-md shadow-indigo-200">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="font-display font-extrabold text-2xl text-[#131b2e]">
            {mode === 'signin' ? 'Welcome back to PyQVerse' : 'Create Aspirant Account'}
          </h2>
          <p className="text-xs text-[#5e6278]">
            {mode === 'signin'
              ? 'Access past examination archives, saved question sets, and test metrics'
              : 'Join over 500,000 aspirants preparing for India\'s premier competitive exams'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-1 bg-[#faf8ff] rounded-xl border border-[#dae2fd] text-xs font-bold">
          <button
            type="button"
            onClick={() => setMode('signin')}
            className={`py-2 rounded-lg transition-all ${
              mode === 'signin'
                ? 'bg-white text-[#2a14b4] shadow-xs'
                : 'text-[#777586] hover:text-[#131b2e]'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode('signup')}
            className={`py-2 rounded-lg transition-all ${
              mode === 'signup'
                ? 'bg-white text-[#2a14b4] shadow-xs'
                : 'text-[#777586] hover:text-[#131b2e]'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Demo Fast Fill Buttons */}
        <div className="p-3 rounded-xl bg-[#f2f3ff] border border-[#dae2fd] text-[11px] space-y-1.5">
          <span className="font-bold text-[#2a14b4] block">Quick Aspirant Demo Credentials:</span>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => handleDemoFill('upsc')}
              className="px-2.5 py-1 rounded bg-white hover:bg-[#eaedff] border border-[#cbd5e1] font-semibold text-[#131b2e]"
            >
              UPSC Aspirant
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill('ssc')}
              className="px-2.5 py-1 rounded bg-white hover:bg-[#eaedff] border border-[#cbd5e1] font-semibold text-[#131b2e]"
            >
              SSC Aspirant
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill('gate')}
              className="px-2.5 py-1 rounded bg-white hover:bg-[#eaedff] border border-[#cbd5e1] font-semibold text-[#131b2e]"
            >
              GATE Aspirant
            </button>
          </div>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {mode === 'signup' && (
            <div>
              <label className="block font-bold text-[#131b2e] mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#777586] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aditya Verma"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#faf8ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] focus:outline-hidden focus:border-[#2a14b4]"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block font-bold text-[#131b2e] mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#777586] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aspirant@email.com"
                className="w-full pl-9 pr-3 py-2.5 bg-[#faf8ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] focus:outline-hidden focus:border-[#2a14b4]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#131b2e] mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#777586] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-9 py-2.5 bg-[#faf8ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] focus:outline-hidden focus:border-[#2a14b4]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#777586] hover:text-[#131b2e]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {mode === 'signup' && (
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block font-bold text-[#131b2e] mb-1">Target Exam</label>
                <select
                  value={targetExam}
                  onChange={(e) => setTargetExam(e.target.value)}
                  className="w-full py-2.5 px-3 bg-[#faf8ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] focus:outline-hidden focus:border-[#2a14b4]"
                >
                  <option value="UPSC CSE">UPSC CSE</option>
                  <option value="SSC CGL">SSC CGL</option>
                  <option value="NDA">NDA</option>
                  <option value="CDS">CDS</option>
                  <option value="GATE CS">GATE CS</option>
                  <option value="JEE Main">JEE Main</option>
                  <option value="JEE Advanced">JEE Advanced</option>
                  <option value="NEET UG">NEET UG</option>
                  <option value="CAT">CAT</option>
                  <option value="SBI PO">SBI PO</option>
                  <option value="IBPS PO">IBPS PO</option>
                  <option value="RRB NTPC">RRB NTPC</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#131b2e] mb-1">Target Year</label>
                <select
                  value={targetYear}
                  onChange={(e) => setTargetYear(e.target.value)}
                  className="w-full py-2.5 px-3 bg-[#faf8ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] focus:outline-hidden focus:border-[#2a14b4]"
                >
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                </select>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-[#2a14b4] border-[#dae2fd] focus:ring-[#2a14b4]"
              />
              <span className="text-[#5e6278]">Remember this session</span>
            </label>

            {mode === 'signin' && (
              <a href="#" className="text-[#2a14b4] hover:underline font-semibold">
                Forgot password?
              </a>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#2a14b4] hover:bg-[#200e8f] text-white font-bold rounded-xl shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2 mt-2"
          >
            <span>{mode === 'signin' ? 'Sign In to PyQVerse' : 'Create Free Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-[11px] text-center text-[#777586]">
          By continuing, you agree to PyQVerse's{' '}
          <a href="#" className="underline text-[#464554]">Terms of Service</a> and{' '}
          <a href="#" className="underline text-[#464554]">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};
