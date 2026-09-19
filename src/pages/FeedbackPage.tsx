import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  AlertTriangle, 
  FileQuestion, 
  Sparkles, 
  Mail, 
  User, 
  Tag, 
  ArrowRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FeedbackType } from '../types';

export const FeedbackPage: React.FC = () => {
  const { user, submitFeedback } = useApp();

  const [name, setName] = useState(user.isLoggedIn ? user.name : '');
  const [email, setEmail] = useState(user.isLoggedIn ? user.email : '');
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('General Feedback');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    submitFeedback({
      name: name.trim() || 'Aspirant',
      email: email.trim() || 'aspirant@pyqverse.local',
      feedbackType,
      message: message.trim()
    });

    setSubmitted(true);
  };

  const handleReset = () => {
    setMessage('');
    setSubmitted(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eaedff] text-xs font-bold text-[#2a14b4]">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Aspirant Feedback & Inquiries</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#131b2e] tracking-tight">
          Help Us Make PyQVerse Better
        </h1>
        <p className="text-sm sm:text-base text-[#5e6278] max-w-xl mx-auto leading-relaxed">
          Whether you found a broken link, want to request an official PYQ paper, suggest a new exam category, or report an answer key discrepancy, we'd love to hear from you.
        </p>
      </div>

      {submitted ? (
        /* Submission Confirmation Card */
        <div className="bg-white rounded-3xl border border-[#dae2fd] shadow-lg p-8 sm:p-12 text-center space-y-6 animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="font-display font-extrabold text-2xl text-[#131b2e]">
              Feedback Received Successfully!
            </h2>
            <p className="text-xs sm:text-sm text-[#5e6278] max-w-md mx-auto leading-relaxed">
              Thank you for contributing to the PyQVerse repository. Our academic editorial cell reviews all error reports and PYQ requests within 24-48 hours.
            </p>
          </div>

          <div className="p-4 bg-[#faf8ff] rounded-2xl border border-[#dae2fd] max-w-md mx-auto text-left text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-[#64748b]">Category:</span>
              <strong className="text-[#2a14b4] font-bold">{feedbackType}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748b]">Submitted By:</span>
              <span className="text-[#131b2e] font-semibold">{name || 'Guest Aspirant'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748b]">Mode:</span>
              <span className="text-emerald-700 font-bold">{user.isLoggedIn ? 'Registered Aspirant' : 'Guest User'}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl border border-[#cbd5e1] hover:bg-slate-50 text-xs font-bold text-[#1e293b] flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Submit Another Feedback</span>
            </button>
            <Link
              to="/pyqs"
              className="px-5 py-2.5 rounded-xl bg-[#2a14b4] hover:bg-[#200e8f] text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <span>Explore PYQs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        /* Feedback Submission Form */
        <div className="bg-white rounded-3xl border border-[#dae2fd] shadow-md p-6 sm:p-10 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6 text-xs sm:text-sm">
            
            {/* User Mode Quick Badge */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-[#faf8ff] border border-[#dae2fd] text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2a14b4]" />
                <span className="text-[#475569]">
                  {user.isLoggedIn
                    ? `Submitting as logged-in aspirant: ${user.name} (${user.email})`
                    : 'Submitting as guest aspirant (no login required)'}
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#eaedff] text-[#2a14b4]">
                {user.isLoggedIn ? 'Verified Account' : 'Guest'}
              </span>
            </div>

            {/* Name & Email Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-[#131b2e] mb-1.5 text-xs">
                  Your Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#777586] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full pl-10 pr-3.5 py-3 bg-[#faf8ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] focus:outline-hidden focus:border-[#2a14b4] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#131b2e] mb-1.5 text-xs">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#777586] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. aspirant@email.com"
                    className="w-full pl-10 pr-3.5 py-3 bg-[#faf8ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] focus:outline-hidden focus:border-[#2a14b4] transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Feedback Type Dropdown */}
            <div>
              <label className="block font-bold text-[#131b2e] mb-1.5 text-xs">
                Feedback Type <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Tag className="w-4 h-4 text-[#777586] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <select
                  value={feedbackType}
                  onChange={(e) => setFeedbackType(e.target.value as FeedbackType)}
                  className="w-full pl-10 pr-4 py-3 bg-[#faf8ff] border border-[#dae2fd] rounded-xl text-xs font-semibold text-[#131b2e] focus:outline-hidden focus:border-[#2a14b4] transition-colors cursor-pointer"
                >
                  <option value="General Feedback">General Feedback</option>
                  <option value="Report an Error">Report an Error</option>
                  <option value="Request a PYQ">Request a PYQ</option>
                  <option value="Suggest an Exam">Suggest an Exam</option>
                  <option value="Report a Broken Link">Report a Broken Link</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Message Textarea */}
            <div>
              <label className="block font-bold text-[#131b2e] mb-1.5 text-xs">
                Message & Details <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your feedback, error details (paper year, question number), or the missing PYQ exam details..."
                className="w-full p-4 bg-[#faf8ff] border border-[#dae2fd] rounded-xl text-xs text-[#131b2e] focus:outline-hidden focus:border-[#2a14b4] transition-colors leading-relaxed"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-[#2a14b4] hover:bg-[#200e8f] text-white font-bold rounded-xl shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
            >
              <Send className="w-4 h-4" />
              <span>Send Feedback</span>
            </button>
          </form>
        </div>
      )}

      {/* Frequently Answered Topics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        <div className="p-5 rounded-2xl bg-white border border-[#dae2fd] space-y-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <FileQuestion className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-xs text-[#131b2e]">Question Discrepancy?</h4>
          <p className="text-[11px] text-[#64748b]">
            All answer keys are reconciled against final commission master keys. Include the exam shift and question ID.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#dae2fd] space-y-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-[#2a14b4] flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-xs text-[#131b2e]">Request Missing Papers</h4>
          <p className="text-[11px] text-[#64748b]">
            Need a state PSC, specific GATE discipline, or regional language paper? Let us know and we'll archive it.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#dae2fd] space-y-2">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-xs text-[#131b2e]">Broken Download?</h4>
          <p className="text-[11px] text-[#64748b]">
            All PDFs are hosted on redundant high-speed mirrors. If any file fails to open, reporting it triggers an immediate check.
          </p>
        </div>
      </div>
    </div>
  );
};
