import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Editor from './Editor';
import Preview from './Preview';
import Header from './Header';
import TemplateModal from './TemplateModal';
import HelpModal from './HelpModal';
import SettingsModal from './SettingsModal';
import Toast from './Toast';
import { Template } from '../types';

const DEFAULT_CONTENT = `\\documentclass{article}
\\usepackage[utf8]{inputenc}
\\usepackage{amsmath}
\\usepackage{graphicx}
\\usepackage{hyperref}

\\title{My Document}
\\author{Your Name}
\\date{\\today}

\\begin{document}

\\maketitle

\\section{Introduction}
Welcome to AuraLaTeX! Start writing your LaTeX document here.

\\section{Mathematics}
Here's a sample equation:
\\begin{equation}
    E = mc^2
\\end{equation}

And an inline equation: $\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}$

\\section{Lists}
\\begin{itemize}
    \\item First item
    \\item Second item
    \\item Third item
\\end{itemize}

\\section{Conclusion}
Edit this document and click \\textbf{Compile} to see the PDF preview.

\\end{document}`;

interface EditorPageProps {
  onBack: () => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
}

export default function EditorPage({ onBack, theme, setTheme }: EditorPageProps) {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [pdfData, setPdfData] = useState<string | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileError, setCompileError] = useState<string | null>(null);
  const [splitPosition, setSplitPosition] = useState(50);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleCompile = async () => {
    if (!content.trim()) {
      showToast('Please enter some LaTeX content first', 'error');
      return;
    }

    setIsCompiling(true);
    setCompileError(null);

    try {
      const res = await fetch('/api/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });

      // Diagnostic logging
      const contentType = res.headers.get('content-type');
      const rawText = await res.text();
      
      let result;
      try {
        result = JSON.parse(rawText);
      } catch (parseErr) {
        const errorSnippet = rawText.substring(0, 200) || '(Empty Response Body)';
        throw new Error(`Server Error (${res.status} ${res.statusText}): ${errorSnippet}`);
      }

      if (result.success && result.pdf) {
        setPdfData(result.pdf);
        showToast('Compiled successfully!', 'success');
        if (isMobile) setMobileView('preview');
      } else {
        setCompileError(result.error || 'Compilation failed');
        showToast('Compilation failed', 'error');
      }
    } catch (err: any) {
      console.error('Compile error:', err);
      setCompileError(err.message || 'Compilation failed');
      showToast('Compilation failed', 'error');
    } finally {
      setIsCompiling(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!pdfData) {
      showToast('Please compile your document first', 'info');
      return;
    }

    try {
      const res = await fetch(`data:application/pdf;base64,${pdfData}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'document.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showToast('PDF downloaded!', 'success');
    } catch (err) {
      console.error('Download failed:', err);
      showToast('Download failed', 'error');
    }
  };

  const handleDownloadTex = () => {
    if (!content.trim()) {
      showToast('Nothing to download', 'error');
      return;
    }
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'document.tex';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('LaTeX file downloaded!', 'success');
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content);
      showToast('Copied to clipboard!', 'success');
    } catch (err) {
      showToast('Failed to copy', 'error');
    }
  };

  const handleTemplateSelect = (template: Template) => {
    setContent(template.content);
    setPdfData(null);
    setCompileError(null);
    setShowTemplates(false);
    showToast(`Loaded "${template.name}" template`, 'success');
  };

  const handleNewDocument = () => {
    if (content !== DEFAULT_CONTENT && content.trim()) {
      if (!confirm('Start a new document? Current changes will be lost.')) return;
    }
    setContent(DEFAULT_CONTENT);
    setPdfData(null);
    setCompileError(null);
    showToast('New document created', 'info');
  };

  const handleClearDocument = () => {
    if (content.trim() && !confirm('Clear all content?')) return;
    setContent('');
    setPdfData(null);
    setCompileError(null);
    showToast('Document cleared', 'info');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleCompile();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleDownloadTex();
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        handleCopyToClipboard();
      }
      if (e.key === 'Escape') {
        setShowTemplates(false);
        setShowHelp(false);
        setShowSettings(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [content, pdfData]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen flex flex-col overflow-hidden bg-background"
    >
      <Header
        onCompile={handleCompile}
        onDownloadPdf={handleDownloadPdf}
        onDownloadTex={handleDownloadTex}
        onCopyToClipboard={handleCopyToClipboard}
        onNewDocument={handleNewDocument}
        onClearDocument={handleClearDocument}
        onOpenTemplates={() => setShowTemplates(true)}
        onOpenHelp={() => setShowHelp(true)}
        onOpenSettings={() => setShowSettings(true)}
        onBack={onBack}
        isCompiling={isCompiling}
        hasPdf={!!pdfData}
        isMobile={isMobile}
        mobileView={mobileView}
        setMobileView={setMobileView}
      />

      {!isMobile && (
        <div className="flex-1 flex overflow-hidden">
          <div style={{ width: `${splitPosition}%` }} className="flex-shrink-0 border-r border-border">
            <Editor content={content} onChange={setContent} fontSize={fontSize} />
          </div>

          <div
            className="w-1.5 bg-border hover:bg-accent cursor-col-resize flex-shrink-0 transition-colors relative group"
            onMouseDown={(e) => {
              const startX = e.clientX;
              const startPos = splitPosition;
              const handleMouseMove = (e: MouseEvent) => {
                const delta = e.clientX - startX;
                const newPos = startPos + (delta / document.body.clientWidth) * 100;
                setSplitPosition(Math.max(25, Math.min(75, newPos)));
              };
              const handleMouseUp = () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('mouseup', handleMouseUp);
              };
              document.addEventListener('mousemove', handleMouseMove);
              document.addEventListener('mouseup', handleMouseUp);
            }}
          >
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div style={{ width: `${100 - splitPosition}%` }} className="flex-shrink-0">
            <Preview
              pdfData={pdfData}
              isCompiling={isCompiling}
              error={compileError}
              onDownload={handleDownloadPdf}
            />
          </div>
        </div>
      )}

      {isMobile && (
        <div className="flex-1 overflow-hidden">
          {mobileView === 'editor' ? (
            <Editor content={content} onChange={setContent} fontSize={fontSize} />
          ) : (
            <Preview
              pdfData={pdfData}
              isCompiling={isCompiling}
              error={compileError}
              onDownload={handleDownloadPdf}
            />
          )}
        </div>
      )}

      <AnimatePresence>
        {showTemplates && (
          <TemplateModal
            onClose={() => setShowTemplates(false)}
            onSelect={handleTemplateSelect}
          />
        )}
        {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
        {showSettings && (
          <SettingsModal
            onClose={() => setShowSettings(false)}
            fontSize={fontSize}
            setFontSize={setFontSize}
            theme={theme}
            setTheme={setTheme}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && <Toast message={toast.message} type={toast.type} />}
      </AnimatePresence>
    </motion.div>
  );
}
