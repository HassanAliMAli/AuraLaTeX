import { useState, useEffect, useRef } from 'react';
import { ZoomIn, ZoomOut, Download, RotateCw, Maximize2, FileWarning, ExternalLink, Play } from 'lucide-react';

interface PreviewProps {
  pdfData: string | null;
  isCompiling: boolean;
  error: string | null;
  onDownload: () => void;
}

export default function Preview({ pdfData, isCompiling, error, onDownload }: PreviewProps) {
  const [zoom, setZoom] = useState(100);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pdfData) {
      setBlobUrl(null);
      return;
    }

    try {
      const binaryString = atob(pdfData);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setBlobUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    } catch (err) {
      console.error('Failed to create blob URL:', err);
      setBlobUrl(null);
    }
  }, [pdfData]);

  const handleZoomIn = () => setZoom(Math.min(zoom + 25, 200));
  const handleZoomOut = () => setZoom(Math.max(zoom - 25, 50));
  const handleResetZoom = () => setZoom(100);

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
          <button onClick={handleZoomOut} className="toolbar-btn" title="Zoom Out" disabled={!pdfData}>
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs text-muted min-w-[3rem] text-center">{zoom}%</span>
          <button onClick={handleZoomIn} className="toolbar-btn" title="Zoom In" disabled={!pdfData}>
            <ZoomIn className="w-4 h-4" />
          </button>
          <button onClick={handleResetZoom} className="toolbar-btn" title="Reset Zoom" disabled={!pdfData}>
            <RotateCw className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-border mx-1" />
          <button onClick={handleFullscreen} className="toolbar-btn" title="Fullscreen">
            <Maximize2 className="w-4 h-4" />
          </button>
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
      <div className="flex-1 overflow-auto flex flex-col items-center justify-center bg-neutral-800 p-4">
        {error ? (
          <div className="flex flex-col items-center justify-center text-center p-8 max-w-2xl">
            <FileWarning className="w-16 h-16 text-red-400 mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">Compilation Error</h3>
            <pre className="text-sm text-red-400 bg-red-500/10 p-4 rounded-lg max-w-full overflow-auto whitespace-pre-wrap text-left">
              {error}
            </pre>
          </div>
        ) : blobUrl ? (
          <div
            className="w-full h-full flex flex-col items-center"
            style={{ maxWidth: `${(8.5 * 96 * zoom) / 100}px` }}
          >
            <object
              data={blobUrl}
              type="application/pdf"
              className="w-full bg-white rounded-lg shadow-2xl"
              style={{ height: '100%', minHeight: '600px' }}
            >
              <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-surface rounded-lg">
                <div className="w-20 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center mb-4 shadow-lg">
                  <span className="text-white text-xl font-bold">PDF</span>
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">PDF Ready!</h3>
                <p className="text-sm text-muted mb-6 max-w-xs">
                  Your document compiled successfully. Click below to view or download.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={handleOpenInNewTab}
                    className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Open PDF
                  </button>
                  <button
                    onClick={onDownload}
                    className="flex items-center gap-2 px-4 py-2 border border-border text-foreground rounded-lg hover:bg-surface-hover transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            </object>
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
