import { useState, useEffect, useRef } from 'react';
import { ZoomIn, ZoomOut, Download, RotateCw, Maximize2, FileWarning, ExternalLink, Play } from 'lucide-react';

interface PreviewProps {
  pdfData: string | null;
  isCompiling: boolean;
  error: string | null;
  onDownload: () => void;
}

export default function Preview({ pdfData, isCompiling, error, onDownload }: PreviewProps) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pdfData) {
      setBlobUrl(null);
      return;
    }

    let url: string | null = null;
    
    const createUrl = async () => {
      try {
        const res = await fetch(`data:application/pdf;base64,${pdfData}`);
        const blob = await res.blob();
        url = URL.createObjectURL(blob);
        setBlobUrl(url);
      } catch (err) {
        console.error('Failed to create blob URL:', err);
        setBlobUrl(null);
      }
    };

    createUrl();

    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [pdfData]);

  const handleOpenInNewTab = () => {
    if (blobUrl) {
      window.open(blobUrl, '_blank');
    }
  };

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div ref={containerRef} className="flex flex-col h-full bg-preview">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-2 border-b border-border bg-surface flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">Preview</span>
          {isCompiling && (
            <div className="flex items-center gap-2 text-accent">
              <RotateCw className="w-4 h-4 animate-spin" />
              <span className="text-xs">Compiling...</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button onClick={handleFullscreen} className="toolbar-btn" title="Fullscreen">
            <Maximize2 className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-border mx-1" />
          <button
            onClick={handleOpenInNewTab}
            disabled={!blobUrl}
            className="toolbar-btn disabled:opacity-50"
            title="Open in New Tab"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
          <button
            onClick={onDownload}
            disabled={!pdfData}
            className="toolbar-btn disabled:opacity-50"
            title="Download PDF"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-hidden flex flex-col bg-[#1a1a1a]">
        {error ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 overflow-auto">
            <FileWarning className="w-16 h-16 text-red-400 mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Compilation Error</h3>
            <pre className="text-sm text-red-400 bg-red-500/10 p-4 rounded-lg max-w-2xl w-full overflow-auto whitespace-pre-wrap text-left">
              {error}
            </pre>
          </div>
        ) : blobUrl ? (
          <div className="flex-1 w-full relative">
            <iframe
              src={`${blobUrl}#toolbar=0&navpanes=0&view=FitH`}
              className="w-full h-full border-none bg-white"
              title="PDF Preview"
            />
            
            {/* Optional Zoom Overlay for better control if needed, 
                but browser native iframe zoom handles most cases */}
          </div>
        ) : isCompiling ? (
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 border-4 border-accent border-t-transparent rounded-full animate-spin mb-6" />
            <h3 className="text-xl font-medium text-foreground mb-2">Compiling Document</h3>
            <p className="text-sm text-muted">Converting LaTeX to PDF...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center px-4">
            <div className="w-32 h-40 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center mb-6 bg-surface/50">
              <span className="text-5xl mb-2">📄</span>
              <span className="text-xs text-muted">PDF</span>
            </div>
            <h3 className="text-xl font-medium text-foreground mb-2">No Preview Yet</h3>
            <p className="text-sm text-muted max-w-xs mb-6">
              Write your LaTeX code and click <span className="text-accent font-medium">Compile</span> to generate a PDF.
            </p>
            <div className="flex flex-col items-center gap-2 text-xs text-muted">
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-surface rounded border border-border font-mono">Ctrl</kbd>
                <span>+</span>
                <kbd className="px-2 py-1 bg-surface rounded border border-border font-mono">Enter</kbd>
                <span>to compile</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
