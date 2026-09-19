import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Download, 
  Bookmark, 
  Share2, 
  Sparkles, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Maximize2, 
  Minimize2, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  ShieldCheck, 
  Columns, 
  Printer, 
  X,
  Target,
  Clock,
  AlertCircle
} from 'lucide-react';
import { MOCK_PAPERS } from '../data/mockData';
import { useApp } from '../context/AppContext';

export const PdfViewerPage: React.FC = () => {
  const { paperId } = useParams<{ paperId: string }>();
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark, downloadPaper, showToast } = useApp();

  // Find paper or fallback to first
  const paper = MOCK_PAPERS.find(p => p.id === paperId) || MOCK_PAPERS[0];

  // Viewer controls state
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [inDocSearch, setInDocSearch] = useState('');
  const [splitSolutionOpen, setSplitSolutionOpen] = useState(false);
  const viewerContainerRef = useRef<HTMLDivElement>(null);

  const totalPages = paper.totalPages || 4;
  const bookmarked = isBookmarked(paper.id);

  // Handle Fullscreen Toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      viewerContainerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Paper link copied to clipboard!', 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  const zoomIn = () => setZoomLevel(prev => Math.min(prev + 25, 175));
  const zoomOut = () => setZoomLevel(prev => Math.max(prev - 25, 75));
  const rotateClockwise = () => setRotation(prev => (prev + 90) % 360);

  return (
    <div className="bg-[#f0f2f8] min-h-screen pb-16">
      {/* 1. TOP BREADCRUMB & METADATA BAR */}
      <div className="bg-white border-b border-[#dae2fd] sticky top-16 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/pyqs"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2a14b4] hover:text-[#200e8f] bg-[#eaedff] px-2.5 py-1.5 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to PYQ Repository</span>
            </Link>

            <div className="hidden sm:flex items-center gap-2 text-xs text-[#5e6278]">
              <span>/</span>
              <span className="font-semibold text-[#131b2e]">{paper.examCategory}</span>
              <span>/</span>
              <span>{paper.stage}</span>
              <span>/</span>
              <span className="font-semibold text-[#131b2e] truncate max-w-[220px]">
                {paper.paper} ({paper.year})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#f2f3ff] text-[#464554] border border-[#dae2fd]">
              Archival: {paper.archivalCode}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              <CheckCircle2 className="w-3 h-3" />
              {paper.verificationStatus}
            </span>
          </div>
        </div>
      </div>

      {/* 2. PDF VIEWER INTERFACE TOOLBAR */}
      <div className="bg-[#1e2337] text-white border-b border-[#2d3550] px-4 py-2 sticky top-[118px] sm:top-[122px] z-20 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Page Navigation */}
          <div className="flex items-center gap-1 bg-[#141827] px-2 py-1 rounded-lg border border-[#2d3550]">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage <= 1}
              className="p-1 text-slate-300 hover:text-white disabled:opacity-30"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-mono font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage >= totalPages}
              className="p-1 text-slate-300 hover:text-white disabled:opacity-30"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Search in document */}
          <div className="relative hidden md:block">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={inDocSearch}
              onChange={(e) => setInDocSearch(e.target.value)}
              placeholder="Find question in paper..."
              className="w-48 pl-8 pr-2 py-1 bg-[#141827] border border-[#2d3550] rounded-lg text-xs text-white placeholder-slate-400 focus:outline-hidden focus:border-[#57dffe]"
            />
          </div>

          {/* Zoom and Document Actions */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center bg-[#141827] rounded-lg border border-[#2d3550] px-1">
              <button
                onClick={zoomOut}
                className="p-1 text-slate-300 hover:text-white"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="px-2 font-mono text-[11px] text-slate-200">
                {zoomLevel}%
              </span>
              <button
                onClick={zoomIn}
                className="p-1 text-slate-300 hover:text-white"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={rotateClockwise}
              className="p-1.5 rounded-lg bg-[#141827] border border-[#2d3550] text-slate-300 hover:text-white"
              title="Rotate 90° Clockwise"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setSplitSolutionOpen(!splitSolutionOpen)}
              className={`px-2.5 py-1 rounded-lg border text-xs font-bold transition-colors flex items-center gap-1.5 ${
                splitSolutionOpen
                  ? 'bg-[#57dffe] text-[#0e122b] border-[#57dffe]'
                  : 'bg-[#141827] border-[#2d3550] text-[#57dffe] hover:bg-[#252f4c]'
              }`}
              title="Toggle Official Answer Key & Explanations"
            >
              <Columns className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Answer Key & Solution</span>
            </button>

            <button
              onClick={handlePrint}
              className="p-1.5 rounded-lg bg-[#141827] border border-[#2d3550] text-slate-300 hover:text-white"
              title="Print Document"
            >
              <Printer className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded-lg bg-[#141827] border border-[#2d3550] text-slate-300 hover:text-white"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. MAIN WORKSPACE (AUTHENTIC QUESTION PAPER + SIDEBAR) */}
      <div 
        ref={viewerContainerRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Document Viewer Column */}
          <div className="lg:col-span-8 transition-all">
            {/* Split Screen Container (Paper + Optional Solution Pane) */}
            <div className={`grid gap-4 ${splitSolutionOpen ? 'grid-cols-1 xl:grid-cols-2' : 'grid-cols-1'}`}>
              
              {/* Authentic Competitive Exam Question Paper (Page Renderer) */}
              <div 
                className="bg-white rounded-lg shadow-2xl border border-[#cbd5e1] p-6 sm:p-10 text-[#131b2e] min-h-[850px] transition-transform duration-150 relative overflow-hidden"
                style={{
                  transform: `scale(${zoomLevel / 100}) rotate(${rotation}deg)`,
                  transformOrigin: 'top center'
                }}
              >
                {/* Official Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
                  <span className="font-display font-extrabold text-7xl uppercase tracking-widest text-[#131b2e] rotate-[-30deg]">
                    PYQVERSE ARCHIVE
                  </span>
                </div>

                {/* Exam Commission Header Banner */}
                <div className="text-center pb-5 mb-5 border-b-2 border-[#131b2e]">
                  <p className="font-display font-extrabold text-xs uppercase tracking-widest text-[#464554]">
                    GOVERNMENT OF INDIA • NATIONAL COMPETITIVE EXAMINATION ARCHIVES
                  </p>
                  <h2 className="font-display font-extrabold text-lg sm:text-xl uppercase tracking-wide text-[#131b2e] mt-1">
                    {paper.examName} ({paper.year})
                  </h2>
                  <p className="font-display font-bold text-sm text-[#2a14b4] mt-0.5">
                    {paper.paper} • {paper.stage}
                  </p>
                </div>

                {/* Paper Technical Strip */}
                <div className="grid grid-cols-2 gap-y-2 text-xs font-semibold pb-4 mb-5 border-b border-dashed border-[#94a3b8]">
                  <div>
                    <span className="text-[#5e6278]">Subject: </span>
                    <span className="font-bold text-[#131b2e]">{paper.subject}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[#5e6278]">Time Allowed: </span>
                    <span className="font-bold text-[#131b2e]">{paper.duration}</span>
                  </div>
                  <div>
                    <span className="text-[#5e6278]">Language: </span>
                    <span className="font-bold text-[#131b2e]">{paper.language}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[#5e6278]">Maximum Marks: </span>
                    <span className="font-bold text-[#131b2e]">{paper.totalMarks} Marks</span>
                  </div>
                </div>

                {/* Official Exam Instructions Box */}
                <div className="p-3.5 rounded-lg bg-[#f8f9fc] border border-[#dae2fd] text-[11px] text-[#464554] leading-relaxed mb-6">
                  <p className="font-bold text-[#131b2e] uppercase mb-1 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-[#2a14b4]" />
                    <span>Instructions to Aspirants / Candidates:</span>
                  </p>
                  <ol className="list-decimal list-inside space-y-0.5">
                    <li>This test booklet contains objective multiple-choice questions. Each question comprises four responses (A, B, C, D).</li>
                    <li>For each question for which a wrong answer is given, <strong>{paper.negativeMarking}</strong> will be deducted as penalty.</li>
                    <li>Rough work can be done in the space provided at the end of the Test Booklet. Hand over the OMR sheet to the invigilator.</li>
                  </ol>
                </div>

                {/* Questions Content Rendered (Authentic exam styling) */}
                <div className="space-y-6 text-xs sm:text-sm">
                  {/* Question 1 */}
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-[#fafcff] space-y-2">
                    <div className="flex items-center justify-between font-bold text-xs text-[#2a14b4]">
                      <span>Question 1 • 2.0 Marks</span>
                      <span className="text-rose-600 font-mono text-[11px]">-0.66 Negative</span>
                    </div>
                    <p className="text-[#131b2e] leading-relaxed font-medium">
                      With reference to the Constitution of India, consider the following statements regarding the writ of Quo-Warranto:
                      <br />1. It can be sought only by an aggrieved person whose fundamental right is violated.
                      <br />2. It prevents illegal usurpation of a public office by a person.
                      <br />Which of the statements given above is/are correct?
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-xs">
                      <div className="p-2 rounded bg-white border border-slate-200">(A) 1 only</div>
                      <div className="p-2 rounded bg-white border border-slate-200">(B) 2 only</div>
                      <div className="p-2 rounded bg-white border border-slate-200">(C) Both 1 and 2</div>
                      <div className="p-2 rounded bg-white border border-slate-200">(D) Neither 1 nor 2</div>
                    </div>
                  </div>

                  {/* Question 2 */}
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-[#fafcff] space-y-2">
                    <div className="flex items-center justify-between font-bold text-xs text-[#2a14b4]">
                      <span>Question 2 • 2.0 Marks</span>
                      <span className="text-rose-600 font-mono text-[11px]">-0.66 Negative</span>
                    </div>
                    <p className="text-[#131b2e] leading-relaxed font-medium">
                      In the context of the Indian Economy, which of the following is/are the most appropriate reasons for the Reserve Bank of India (RBI) increasing the Cash Reserve Ratio (CRR)?
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-xs">
                      <div className="p-2 rounded bg-white border border-slate-200">(A) To inject high liquidity in the commercial banking sector</div>
                      <div className="p-2 rounded bg-white border border-slate-200">(B) To curb demand-pull inflationary pressures</div>
                      <div className="p-2 rounded bg-white border border-slate-200">(C) To incentivize foreign institutional inflows directly</div>
                      <div className="p-2 rounded bg-white border border-slate-200">(D) To finance the fiscal deficit of the Union Government</div>
                    </div>
                  </div>

                  {/* Question 3 */}
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-[#fafcff] space-y-2">
                    <div className="flex items-center justify-between font-bold text-xs text-[#2a14b4]">
                      <span>Question 3 • 2.0 Marks</span>
                      <span className="text-rose-600 font-mono text-[11px]">-0.66 Negative</span>
                    </div>
                    <p className="text-[#131b2e] leading-relaxed font-medium">
                      Consider the following geographic corridors and mountain passes:
                      <br />1. Zoji La Pass — Connects Srinagar with Kargil and Leh.
                      <br />2. Nathu La Pass — Located in the state of Himachal Pradesh.
                      <br />3. Lipulekh Pass — Tri-junction between India, Nepal, and Tibet.
                      <br />How many of the pairs given above are correctly matched?
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-xs">
                      <div className="p-2 rounded bg-white border border-slate-200">(A) Only one pair</div>
                      <div className="p-2 rounded bg-white border border-slate-200">(B) Only two pairs</div>
                      <div className="p-2 rounded bg-white border border-slate-200">(C) All three pairs</div>
                      <div className="p-2 rounded bg-white border border-slate-200">(D) None of the pairs</div>
                    </div>
                  </div>
                </div>

                {/* Page Footer */}
                <div className="pt-6 mt-10 border-t border-[#dae2fd] flex items-center justify-between text-[11px] text-[#777586]">
                  <span>{paper.examName} • {paper.year}</span>
                  <span className="font-mono font-bold">Page {currentPage} of {totalPages}</span>
                  <span>Official Commission Key Verified</span>
                </div>
              </div>

              {/* Verified Split Solution & Answer Key Pane */}
              {splitSolutionOpen && (
                <div className="bg-[#faf8ff] rounded-lg shadow-xl border-2 border-[#57dffe] p-6 text-[#131b2e] min-h-[850px] overflow-y-auto animate-in slide-in-from-right-4 duration-200">
                  <div className="flex items-center justify-between pb-3 border-b border-[#cbd5e1] mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <h4 className="font-display font-bold text-sm text-[#131b2e]">
                        Official Commission Answer Key & Solutions
                      </h4>
                    </div>
                    <button
                      onClick={() => setSplitSolutionOpen(false)}
                      className="text-[#777586] hover:text-[#131b2e]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-4 text-xs">
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900">
                      <p className="font-bold flex items-center gap-1.5 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Commission Final Key (Set A/B/C/D Reconciled)</span>
                      </p>
                      <p className="text-[11px]">
                        Marking formula: Correct +2.0 marks • Incorrect -0.66 marks • Unattempted 0 marks.
                      </p>
                    </div>

                    <div className="p-4 bg-white rounded-lg border border-[#dae2fd] space-y-2">
                      <h5 className="font-bold text-[#2a14b4]">Question 1: Official Key: (B) 2 only</h5>
                      <p className="leading-relaxed text-slate-700">
                        <strong>Explanation:</strong> Statement 1 is incorrect because unlike other writs, Quo-Warranto can be moved by <em>any interested person</em>, not necessarily an aggrieved party. Statement 2 is correct: Quo-Warranto is issued by High Courts (Art 226) or Supreme Court (Art 32) to prevent illegal usurpation of a substantive public office.
                      </p>
                    </div>

                    <div className="p-4 bg-white rounded-lg border border-[#dae2fd] space-y-2">
                      <h5 className="font-bold text-[#2a14b4]">Question 2: Official Key: (B)</h5>
                      <p className="leading-relaxed text-slate-700">
                        <strong>Explanation:</strong> Hiking the CRR contracts the lending bandwidth of commercial banks, reducing circulating money supply and arresting demand-pull inflation.
                      </p>
                    </div>

                    <div className="p-4 bg-white rounded-lg border border-[#dae2fd] space-y-2">
                      <h5 className="font-bold text-[#2a14b4]">Question 3: Official Key: (B) Only two pairs</h5>
                      <p className="leading-relaxed text-slate-700">
                        <strong>Explanation:</strong> Pair 1 (Zoji La - Srinagar to Leh) is correctly matched. Pair 2 (Nathu La) is located in <strong>Sikkim</strong> (not Himachal Pradesh), hence incorrectly matched. Pair 3 (Lipulekh - Uttarakhand tri-junction with Nepal/Tibet) is correctly matched.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Primary Document Action Card */}
            <div className="bg-white rounded-2xl p-6 border border-[#dae2fd] shadow-xs space-y-3">
              <button
                onClick={() => downloadPaper(paper)}
                className="w-full py-3 px-4 bg-[#2a14b4] hover:bg-[#200e8f] text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Official PDF ({paper.fileSize})</span>
              </button>

              <button
                onClick={() => navigate(`/quizzes?exam=${encodeURIComponent(paper.examCategory)}`)}
                className="w-full py-3 px-4 bg-[#eaedff] hover:bg-[#dae2fd] text-[#2a14b4] text-xs font-bold rounded-xl border border-[#c7d2fe] transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Practice Questions as Timed Test</span>
              </button>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => toggleBookmark(paper.id)}
                  className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                    bookmarked
                      ? 'bg-[#eaedff] text-[#2a14b4] border-[#c7d2fe]'
                      : 'border-[#dae2fd] text-[#464554] hover:bg-[#f2f3ff]'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? 'fill-[#2a14b4]' : ''}`} />
                  <span>{bookmarked ? 'Saved' : 'Save'}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="py-2 px-3 rounded-lg border border-[#dae2fd] text-[#464554] hover:bg-[#f2f3ff] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Paper Specification Breakdown */}
            <div className="bg-white rounded-2xl p-6 border border-[#dae2fd] shadow-xs space-y-3 text-xs">
              <h4 className="font-display font-bold text-sm text-[#131b2e] pb-2 border-b border-[#dae2fd]">
                Official Paper Specification
              </h4>

              <div className="space-y-2.5">
                <div className="flex justify-between">
                  <span className="text-[#5e6278]">Competitive Exam</span>
                  <span className="font-semibold text-[#131b2e]">{paper.examName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5e6278]">Category</span>
                  <span className="font-semibold text-[#2a14b4]">{paper.examCategory}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5e6278]">Stage / Level</span>
                  <span className="font-semibold text-[#131b2e]">{paper.stage}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5e6278]">Exam Year</span>
                  <span className="font-semibold text-[#131b2e]">{paper.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5e6278]">Language Medium</span>
                  <span className="font-semibold text-[#131b2e]">{paper.language}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5e6278]">Negative Marking</span>
                  <span className="font-semibold text-rose-600">{paper.negativeMarking}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#5e6278]">Official Answer Key</span>
                  <span className="font-semibold text-emerald-600">Available & Verified</span>
                </div>
              </div>

              {/* Topics evaluated */}
              <div className="pt-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#777586] block mb-2">
                  High-Weightage Topics Evaluated:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {paper.syllabusTopics?.map((topic, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-1 rounded bg-[#faf8ff] border border-[#eaedff] text-[#464554]">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Preparation Tip Box */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-[#182038] to-[#12182b] text-white space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#57dffe]">
                <ShieldCheck className="w-4 h-4" />
                <span>PyQVerse Archival Accuracy</span>
              </div>
              <p className="text-[11px] text-[#c4cbdf] leading-relaxed">
                Matches the authentic test booklet distributed during the examination day. Verified against commission answer keys.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
