import { Play, Download, FileText, Plus, LayoutTemplate, HelpCircle, Settings, FileDown, ChevronDown, Copy, Trash2, Code, Eye, ArrowLeft, Home } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface HeaderProps {
  onCompile: () => void;
  onDownloadPdf: () => void;
  onDownloadTex: () => void;
  onCopyToClipboard: () => void;
  onNewDocument: () => void;
  onClearDocument: () => void;
  onOpenTemplates: () => void;
  onOpenHelp: () => void;
  onOpenSettings: () => void;
  onBack: () => void;
  isCompiling: boolean;
  hasPdf: boolean;
  isMobile: boolean;
  mobileView: 'editor' | 'preview';
  setMobileView: (view: 'editor' | 'preview') => void;
}

export default function Header({
  onCompile,
  onDownloadPdf,
  onDownloadTex,
  onCopyToClipboard,
  onNewDocument,
  onClearDocument,
  onOpenTemplates,
  onOpenHelp,
  onOpenSettings,
  onBack,
  isCompiling,
  hasPdf,
  isMobile,
  mobileView,
  setMobileView,
}: HeaderProps) {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showFileMenu, setShowFileMenu] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (exportRef.current && !exportRef.current.contains(e.target as Node)) {
        setShowExportMenu(false);
      }
      if (fileRef.current && !fileRef.current.contains(e.target as Node)) {
        setShowFileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="h-14 bg-surface border-b border-border flex items-center justify-between px-3 md:px-4 flex-shrink-0">
      {/* Left Side */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="p-2 text-muted hover:text-foreground hover:bg-surface-hover rounded-lg transition-colors"
          title="Back to Home"
        >
          <Home className="w-5 h-5" />
        </button>

        <div className="w-px h-6 bg-border hidden sm:block" />

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">T<sub className="text-[10px]">X</sub></span>
          </div>
          <span className="font-semibold text-foreground text-lg tracking-tight hidden md:block">TeXFlow</span>
        </div>

        {/* File Menu (Desktop) */}
        {!isMobile && (
          <div className="relative" ref={fileRef}>
            <button
              onClick={() => setShowFileMenu(!showFileMenu)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted hover:text-foreground hover:bg-surface-hover rounded-lg transition-colors"
            >
              <span>File</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {showFileMenu && (
              <div className="absolute left-0 top-full mt-1 w-52 bg-surface border border-border rounded-xl shadow-xl py-1 z-50">
                <button
                  onClick={() => { onNewDocument(); setShowFileMenu(false); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-surface-hover"
                >
                  <Plus className="w-4 h-4 text-emerald-400" />
                  New Document
                </button>
                <button
                  onClick={() => { onOpenTemplates(); setShowFileMenu(false); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-surface-hover"
                >
                  <LayoutTemplate className="w-4 h-4 text-blue-400" />
                  From Template
                </button>
                <div className="h-px bg-border my-1" />
                <button
                  onClick={() => { onCopyToClipboard(); setShowFileMenu(false); }}
                  className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-foreground hover:bg-surface-hover"
                >
                  <div className="flex items-center gap-3">
                    <Copy className="w-4 h-4 text-purple-400" />
                    Copy to Clipboard
                  </div>
                  <span className="text-xs text-muted">Ctrl+Shift+C</span>
                </button>
                <div className="h-px bg-border my-1" />
                <button
                  onClick={() => { onClearDocument(); setShowFileMenu(false); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-surface-hover"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear Document
                </button>
              </div>
            )}
          </div>
        )}

        {/* Mobile: New & Templates */}
        {isMobile && (
          <div className="flex items-center gap-1">
            <button
              onClick={onNewDocument}
              className="p-2 text-muted hover:text-foreground hover:bg-surface-hover rounded-lg transition-colors"
              title="New Document"
            >
              <Plus className="w-5 h-5" />
            </button>
            <button
              onClick={onOpenTemplates}
              className="p-2 text-muted hover:text-foreground hover:bg-surface-hover rounded-lg transition-colors"
              title="Templates"
            >
              <LayoutTemplate className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Mobile View Toggle */}
      {isMobile && (
        <div className="flex items-center bg-background rounded-lg p-1">
          <button
            onClick={() => setMobileView('editor')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              mobileView === 'editor' ? 'bg-accent text-white' : 'text-muted'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Editor</span>
          </button>
          <button
            onClick={() => setMobileView('preview')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              mobileView === 'preview' ? 'bg-accent text-white' : 'text-muted'
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Preview</span>
          </button>
        </div>
      )}

      {/* Right Side */}
      <div className="flex items-center gap-1 md:gap-2">
        {/* Export Dropdown */}
        <div className="relative" ref={exportRef}>
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            className="flex items-center gap-1.5 px-2 md:px-3 py-2 text-sm text-muted hover:text-foreground hover:bg-surface-hover rounded-lg transition-colors"
          >
            <FileDown className="w-4 h-4" />
            <span className="hidden md:inline">Export</span>
            <ChevronDown className="w-3 h-3" />
          </button>

          {showExportMenu && (
            <div className="absolute right-0 top-full mt-1 w-52 bg-surface border border-border rounded-xl shadow-xl py-1 z-50">
              <button
                onClick={() => { onDownloadPdf(); setShowExportMenu(false); }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-surface-hover ${
                  hasPdf ? 'text-foreground' : 'text-muted'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Download className="w-4 h-4 text-red-400" />
                  Download PDF
                </div>
                {!hasPdf && <span className="text-xs text-muted">Compile first</span>}
              </button>
              <button
                onClick={() => { onDownloadTex(); setShowExportMenu(false); }}
                className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-foreground hover:bg-surface-hover"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-4 h-4 text-blue-400" />
                  Download .tex
                </div>
                <span className="text-xs text-muted">Ctrl+S</span>
              </button>
              <div className="h-px bg-border my-1" />
              <button
                onClick={() => { onCopyToClipboard(); setShowExportMenu(false); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-surface-hover"
              >
                <Copy className="w-4 h-4 text-purple-400" />
                Copy LaTeX
              </button>
            </div>
          )}
        </div>

        {/* Compile Button */}
        <button
          onClick={onCompile}
          disabled={isCompiling}
          className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all shadow-lg shadow-emerald-500/25 disabled:opacity-70"
        >
          {isCompiling ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Play className="w-4 h-4" />
          )}
          <span className="font-medium hidden sm:inline">Compile</span>
        </button>

        <div className="w-px h-6 bg-border mx-0.5 md:mx-1 hidden sm:block" />

        {/* Help & Settings */}
        <button
          onClick={onOpenHelp}
          className="p-2 text-muted hover:text-foreground hover:bg-surface-hover rounded-lg transition-colors"
          title="Help & Docs"
        >
          <HelpCircle className="w-5 h-5" />
        </button>
        <button
          onClick={onOpenSettings}
          className="p-2 text-muted hover:text-foreground hover:bg-surface-hover rounded-lg transition-colors"
          title="Settings"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
