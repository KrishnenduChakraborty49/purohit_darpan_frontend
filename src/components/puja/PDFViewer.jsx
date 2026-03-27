import { useState, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useAuthStore } from '../../store/authStore';
import axiosInstance from '../../api/axiosInstance';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Bookmark, Download } from 'lucide-react';
import toast from 'react-hot-toast';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Use a CDN worker for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function PDFViewer({ step, onComplete }) {
  const { user } = useAuthStore();
  const resource = step.pdfResource;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.1);
  const [annotations, setAnnotations] = useState([]);
  const [selectedAnnotation, setSelectedAnnotation] = useState('');
  const [showAnnotationInput, setShowAnnotationInput] = useState(false);
  const [clickPos, setClickPos] = useState({ x: 0.5, y: 0.5 });
  const [loading, setLoading] = useState(false);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    if (numPages <= 1) onComplete?.();
  };

  const prevPage = () => setPageNumber(Math.max(1, pageNumber - 1));
  const nextPage = () => { const next = Math.min(numPages || 1, pageNumber + 1); setPageNumber(next); if (next >= (numPages || 1)) onComplete?.(); };
  const zoomIn = () => setScale(Math.min(2.5, scale + 0.2));
  const zoomOut = () => setScale(Math.max(0.5, scale - 0.2));

  const handlePageClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setClickPos({ x, y });
    setShowAnnotationInput(true);
  };

  const saveAnnotation = async () => {
    if (!resource || !user) return;
    try {
      await axiosInstance.post('/bookmarks/pdf-page', {
        userId: user.userId,
        resourceId: resource.id,
        pageNumber,
        annotationText: selectedAnnotation,
        x: clickPos.x,
        y: clickPos.y,
      });
      setSelectedAnnotation('');
      setShowAnnotationInput(false);
      toast.success('Annotation saved 📌');
    } catch {
      toast.error('Failed to save annotation');
    }
  };

  if (!resource?.fileUrl) {
    return (
      <div className="bg-stone-900/60 border border-orange-500/15 rounded-2xl p-12 text-center">
        <p className="text-orange-200/50 text-4xl mb-3">📚</p>
        <p className="text-orange-200/50">No study material available for this step.</p>
      </div>
    );
  }

  // For non-PDF files (DOCX, etc.) — show a download card instead of react-pdf
  const fileUrl = resource.fileUrl;
  const isDocx = resource.resourceType === 'DOCX'
    || fileUrl?.toLowerCase().endsWith('.docx')
    || fileUrl?.toLowerCase().endsWith('.doc');

  if (isDocx) {
    return (
      <div className="bg-stone-900/60 border border-orange-500/15 rounded-2xl p-10 text-center flex flex-col items-center gap-4">
        <div className="w-16 h-16 bg-blue-500/15 rounded-2xl flex items-center justify-center border border-blue-400/20">
          <span className="text-3xl">📄</span>
        </div>
        <div>
          <p className="text-orange-100 font-semibold text-lg">{resource.title || 'Study Document'}</p>
          <p className="text-orange-200/50 text-sm mt-1">Word Document (.docx)</p>
        </div>
        <p className="text-orange-200/60 text-sm max-w-sm">
          This study guide is available as a Word document. Click below to download and open it.
        </p>
        <a
          href={fileUrl}
          download
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 text-white font-semibold
                     hover:bg-orange-400 transition-all shadow-lg shadow-orange-500/20"
        >
          <Download size={16} />
          Download Study Guide
        </a>
        {resource.pageCount && (
          <p className="text-orange-200/40 text-xs">{resource.pageCount} pages</p>
        )}
      </div>
    );
  }

  return (
    <div className="bg-stone-900/60 border border-orange-500/15 rounded-2xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-orange-500/10 bg-stone-800/40 flex-wrap">
        <button onClick={prevPage} disabled={pageNumber <= 1}
          className="p-1.5 rounded-lg bg-stone-700 text-orange-300 disabled:opacity-40 hover:bg-stone-600 transition-all">
          <ChevronLeft size={16} />
        </button>
        <span className="text-orange-200/70 text-xs">
          {pageNumber} / {numPages || '?'}
        </span>
        <button onClick={nextPage} disabled={pageNumber >= (numPages || 1)}
          className="p-1.5 rounded-lg bg-stone-700 text-orange-300 disabled:opacity-40 hover:bg-stone-600 transition-all">
          <ChevronRight size={16} />
        </button>

        <div className="flex items-center gap-1 ml-2">
          <button onClick={zoomOut} className="p-1.5 rounded-lg bg-stone-700 text-orange-300 hover:bg-stone-600">
            <ZoomOut size={14} />
          </button>
          <span className="text-orange-200/50 text-xs w-10 text-center">{Math.round(scale * 100)}%</span>
          <button onClick={zoomIn} className="p-1.5 rounded-lg bg-stone-700 text-orange-300 hover:bg-stone-600">
            <ZoomIn size={14} />
          </button>
        </div>

        {resource.isDownloadable && (
          <a href={resource.fileUrl} download target="_blank" rel="noreferrer"
            className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                       bg-orange-500/15 text-orange-400 border border-orange-500/30
                       text-xs hover:bg-orange-500/25 transition-all">
            <Download size={12} /> Download
          </a>
        )}
      </div>

      {/* PDF content */}
      <div className="flex overflow-auto justify-center bg-stone-950/50 min-h-[500px] p-4"
        onClick={handlePageClick}>
        <Document
          file={resource.fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex items-center justify-center py-20">
              <div className="w-10 h-10 border-4 border-orange-500/30 border-t-orange-400 rounded-full animate-spin" />
            </div>
          }
          error={
            <div className="text-center py-20 text-orange-400/60">
              Failed to load PDF. Check the file URL.
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            renderTextLayer={true}
            renderAnnotationLayer={true}
            className="shadow-2xl"
          />
        </Document>
      </div>

      {/* Annotation input */}
      {showAnnotationInput && (
        <div className="p-4 border-t border-orange-500/10 animate-fade-in">
          <label className="text-orange-300/70 text-xs mb-2 block">Add annotation at this position:</label>
          <div className="flex gap-2">
            <input
              value={selectedAnnotation}
              onChange={(e) => setSelectedAnnotation(e.target.value)}
              placeholder="Your annotation note..."
              className="flex-1 bg-stone-800 border border-orange-500/20
                         text-orange-200 text-xs px-3 py-2 rounded-lg outline-none"
            />
            <button onClick={saveAnnotation}
              className="px-3 py-2 bg-orange-500/30 text-orange-300 text-xs rounded-lg hover:bg-orange-500/40">
              Save
            </button>
            <button onClick={() => setShowAnnotationInput(false)}
              className="px-3 py-2 text-orange-400/60 text-xs hover:text-orange-300">✕</button>
          </div>
        </div>
      )}
    </div>
  );
}


