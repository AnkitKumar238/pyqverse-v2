import React, { useState } from 'react';
import { X, Upload, FileUp, CheckCircle, HelpCircle, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EXAM_CATEGORIES } from '../data/mockData';

export const UploadModal: React.FC = () => {
  const { uploadModalOpen, setUploadModalOpen, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'upload' | 'request'>('upload');
  
  // Upload form state
  const [examCategory, setExamCategory] = useState('UPSC');
  const [examSubName, setExamSubName] = useState('Civil Services Examination');
  const [stage, setStage] = useState('Prelims');
  const [paperName, setPaperName] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [examYear, setExamYear] = useState('2024');
  const [language, setLanguage] = useState<'English' | 'Hindi' | 'Bilingual'>('Bilingual');
  const [hasSolutions, setHasSolutions] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Request form state
  const [requestExam, setRequestExam] = useState('UPSC');
  const [requestPaper, setRequestPaper] = useState('');
  const [requestYear, setRequestYear] = useState('2024');
  const [requestNote, setRequestNote] = useState('');

  if (!uploadModalOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!paperName) {
      showToast('Please provide Paper / Subject Title', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setUploadModalOpen(false);
      showToast(
        `Thank you! "${examCategory} - ${paperName} (${examYear})" submitted for OCR indexing & solution verification.`,
        'success'
      );
      setSelectedFile(null);
      setPaperName('');
      setSubjectName('');
    }, 800);
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestPaper) {
      showToast('Please specify the exam paper name', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setUploadModalOpen(false);
      showToast(
        `Request registered! Our archival team is sourcing "${requestExam} - ${requestPaper}" (${requestYear}).`,
        'success'
      );
      setRequestPaper('');
      setRequestNote('');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-10 flex justify-center items-center animate-in fade-in duration-150">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => setUploadModalOpen(false)}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#dae2fd] overflow-hidden z-10 animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2e7ff] bg-[#faf8ff]">
          <div>
            <h3 className="text-base font-bold text-[#131b2e]">
              Contribute or Request Exam PYQ
            </h3>
            <p className="text-xs text-[#5e6278]">
              Help millions of aspirants prepare with verified question papers & answer keys
            </p>
          </div>
          <button
            onClick={() => setUploadModalOpen(false)}
            className="p-1.5 text-[#5e6278] hover:text-[#131b2e] hover:bg-[#eaedff] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex border-b border-[#e2e7ff] px-6 pt-3 bg-white">
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'upload'
                ? 'border-[#2a14b4] text-[#2a14b4]'
                : 'border-transparent text-[#5e6278] hover:text-[#131b2e]'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload Question Paper</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('request')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 flex items-center gap-2 transition-colors ${
              activeTab === 'request'
                ? 'border-[#2a14b4] text-[#2a14b4]'
                : 'border-transparent text-[#5e6278] hover:text-[#131b2e]'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Request Missing Paper</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'upload' ? (
            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Exam Category */}
                <div>
                  <label className="block text-xs font-bold text-[#131b2e] mb-1">
                    Exam Category *
                  </label>
                  <select
                    value={examCategory}
                    onChange={(e) => setExamCategory(e.target.value)}
                    className="w-full text-xs sm:text-sm bg-white border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#131b2e] focus:outline-hidden focus:border-[#2a14b4]"
                  >
                    {EXAM_CATEGORIES.map(c => (
                      <option key={c.id} value={c.name}>{c.name} - {c.badge}</option>
                    ))}
                  </select>
                </div>

                {/* Exam Stage */}
                <div>
                  <label className="block text-xs font-bold text-[#131b2e] mb-1">
                    Exam Stage / Level *
                  </label>
                  <select
                    value={stage}
                    onChange={(e) => setStage(e.target.value)}
                    className="w-full text-xs sm:text-sm bg-white border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#131b2e] focus:outline-hidden focus:border-[#2a14b4]"
                  >
                    <option value="Prelims">Prelims (Objective)</option>
                    <option value="Mains">Mains (Descriptive)</option>
                    <option value="Tier 1">Tier 1 (CBT)</option>
                    <option value="Tier 2">Tier 2 (CBT)</option>
                    <option value="Paper 1">Paper 1</option>
                    <option value="Paper 2">Paper 2</option>
                    <option value="CBT 1">CBT 1</option>
                    <option value="CBT 2">CBT 2</option>
                  </select>
                </div>
              </div>

              {/* Paper / Title */}
              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1">
                  Paper / Subject Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. General Studies Paper 1, Quantitative Aptitude, Mathematics"
                  value={paperName}
                  onChange={(e) => setPaperName(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-white border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#131b2e] focus:outline-hidden focus:border-[#2a14b4]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Year */}
                <div>
                  <label className="block text-xs font-bold text-[#131b2e] mb-1">
                    Exam Year *
                  </label>
                  <select
                    value={examYear}
                    onChange={(e) => setExamYear(e.target.value)}
                    className="w-full text-xs sm:text-sm bg-white border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#131b2e] focus:outline-hidden focus:border-[#2a14b4]"
                  >
                    {['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018'].map(yr => (
                      <option key={yr} value={yr}>{yr}</option>
                    ))}
                  </select>
                </div>

                {/* Language */}
                <div>
                  <label className="block text-xs font-bold text-[#131b2e] mb-1">
                    Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as any)}
                    className="w-full text-xs sm:text-sm bg-white border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#131b2e] focus:outline-hidden focus:border-[#2a14b4]"
                  >
                    <option value="Bilingual">Bilingual (Hindi / English)</option>
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                  </select>
                </div>
              </div>

              {/* Drag and Drop Zone */}
              <div className="border-2 border-dashed border-[#cbd5e1] hover:border-[#2a14b4] rounded-xl p-5 text-center transition-colors bg-[#faf8ff]">
                <input
                  type="file"
                  id="modal-file-upload"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="modal-file-upload" className="cursor-pointer block">
                  <FileUp className="w-8 h-8 text-[#2a14b4] mx-auto mb-2" />
                  <p className="text-xs font-bold text-[#131b2e]">
                    {selectedFile ? selectedFile.name : 'Click or drag PDF question paper here'}
                  </p>
                  <p className="text-[11px] text-[#5e6278] mt-1">
                    Supports official commission PDF or clean camera scans (up to 35 MB)
                  </p>
                </label>
              </div>

              {/* Submit button */}
              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-[#5e6278] hover:bg-[#f1f5f9] rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 text-xs font-bold text-white bg-[#2a14b4] hover:bg-[#200e8f] rounded-lg shadow-sm transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  {isSubmitting ? 'Uploading...' : 'Submit Question Paper'}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRequestSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1">
                  Competitive Exam *
                </label>
                <select
                  value={requestExam}
                  onChange={(e) => setRequestExam(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-white border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#131b2e] focus:outline-hidden focus:border-[#2a14b4]"
                >
                  {EXAM_CATEGORIES.map(c => (
                    <option key={c.id} value={c.name}>{c.name} - {c.fullName}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1">
                  Paper / Subject Needed *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. UPSC CSE 2024 Mains GS Paper 3, or JEE Main 2024 April Shift 2"
                  value={requestPaper}
                  onChange={(e) => setRequestPaper(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-white border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#131b2e] focus:outline-hidden focus:border-[#2a14b4]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1">
                  Specific Year
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2023 or 2024"
                  value={requestYear}
                  onChange={(e) => setRequestYear(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-white border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#131b2e] focus:outline-hidden focus:border-[#2a14b4]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#131b2e] mb-1">
                  Additional Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Specific shift, question paper set code (Set A/B), or official answer key request..."
                  value={requestNote}
                  onChange={(e) => setRequestNote(e.target.value)}
                  className="w-full text-xs sm:text-sm bg-white border border-[#cbd5e1] rounded-lg px-3 py-2 text-[#131b2e] focus:outline-hidden focus:border-[#2a14b4]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setUploadModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-[#5e6278] hover:bg-[#f1f5f9] rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 text-xs font-bold text-white bg-[#2a14b4] hover:bg-[#200e8f] rounded-lg shadow-sm transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Submitting...' : 'Send Paper Request'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
