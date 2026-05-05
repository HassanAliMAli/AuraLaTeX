import { motion } from 'framer-motion';
import { X, Keyboard, BookOpen, Zap, ExternalLink, Command } from 'lucide-react';

interface HelpModalProps {
  onClose: () => void;
}

export default function HelpModal({ onClose }: HelpModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-surface rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Help & Documentation</h2>
              <p className="text-sm text-muted">Learn how to use AuraLaTeX</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface-hover rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Getting Started */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-yellow-500" />
              <h3 className="text-lg font-semibold text-foreground">Getting Started</h3>
            </div>
            <div className="bg-background rounded-xl p-4 space-y-3 text-sm text-muted">
              <p><span className="text-foreground font-medium">1.</span> Write your LaTeX code in the editor on the left</p>
              <p><span className="text-foreground font-medium">2.</span> Click <span className="text-accent font-medium">Compile</span> to generate a PDF</p>
              <p><span className="text-foreground font-medium">3.</span> View the preview on the right, then download</p>
              <p><span className="text-foreground font-medium">Tip:</span> Use <span className="font-medium">Templates</span> to quickly start with a pre-made structure</p>
            </div>
          </section>

          {/* Keyboard Shortcuts */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Keyboard className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-semibold text-foreground">Keyboard Shortcuts</h3>
            </div>
            <div className="bg-background rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-foreground">Compile document</span>
                <div className="flex gap-1">
                  <kbd className="px-2 py-1 bg-surface rounded border border-border text-sm font-mono">Ctrl</kbd>
                  <span className="text-muted">+</span>
                  <kbd className="px-2 py-1 bg-surface rounded border border-border text-sm font-mono">Enter</kbd>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground">Download .tex file</span>
                <div className="flex gap-1">
                  <kbd className="px-2 py-1 bg-surface rounded border border-border text-sm font-mono">Ctrl</kbd>
                  <span className="text-muted">+</span>
                  <kbd className="px-2 py-1 bg-surface rounded border border-border text-sm font-mono">S</kbd>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground">Copy to clipboard</span>
                <div className="flex gap-1">
                  <kbd className="px-2 py-1 bg-surface rounded border border-border text-sm font-mono">Ctrl</kbd>
                  <span className="text-muted">+</span>
                  <kbd className="px-2 py-1 bg-surface rounded border border-border text-sm font-mono">Shift</kbd>
                  <span className="text-muted">+</span>
                  <kbd className="px-2 py-1 bg-surface rounded border border-border text-sm font-mono">C</kbd>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground">Insert tab</span>
                <kbd className="px-2 py-1 bg-surface rounded border border-border text-sm font-mono">Tab</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground">Close modals</span>
                <kbd className="px-2 py-1 bg-surface rounded border border-border text-sm font-mono">Esc</kbd>
              </div>
            </div>
          </section>

          {/* Common LaTeX Commands */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Command className="w-5 h-5 text-purple-500" />
              <h3 className="text-lg font-semibold text-foreground">Common LaTeX Commands</h3>
            </div>
            <div className="bg-background rounded-xl p-4 font-mono text-sm space-y-2">
              <div className="flex justify-between gap-4">
                <span className="text-muted">Bold text</span>
                <span className="text-foreground">\textbf&#123;text&#125;</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted">Italic text</span>
                <span className="text-foreground">\textit&#123;text&#125;</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted">Inline math</span>
                <span className="text-foreground">$x^2 + y^2 = z^2$</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted">Fraction</span>
                <span className="text-foreground">\frac&#123;a&#125;&#123;b&#125;</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted">Section</span>
                <span className="text-foreground">\section&#123;title&#125;</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted">Bullet list</span>
                <span className="text-foreground">\begin&#123;itemize&#125; ... \end&#123;itemize&#125;</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted">Equation block</span>
                <span className="text-foreground">\begin&#123;equation&#125; ... \end&#123;equation&#125;</span>
              </div>
            </div>
          </section>

          {/* External Resources */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <ExternalLink className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-semibold text-foreground">Learn More</h3>
            </div>
            <div className="space-y-2">
              <a
                href="https://www.overleaf.com/learn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-background rounded-xl hover:bg-surface-hover transition-colors"
              >
                <span className="text-foreground">Overleaf Documentation</span>
                <ExternalLink className="w-4 h-4 text-muted" />
              </a>
              <a
                href="https://en.wikibooks.org/wiki/LaTeX"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-background rounded-xl hover:bg-surface-hover transition-colors"
              >
                <span className="text-foreground">LaTeX Wikibook</span>
                <ExternalLink className="w-4 h-4 text-muted" />
              </a>
              <a
                href="https://detexify.kirelabs.org/classify.html"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-background rounded-xl hover:bg-surface-hover transition-colors"
              >
                <span className="text-foreground">Detexify - Draw to find symbols</span>
                <ExternalLink className="w-4 h-4 text-muted" />
              </a>
              <a
                href="https://www.tablesgenerator.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-background rounded-xl hover:bg-surface-hover transition-colors"
              >
                <span className="text-foreground">Tables Generator</span>
                <ExternalLink className="w-4 h-4 text-muted" />
              </a>
            </div>
          </section>
        </div>

        <div className="p-4 border-t border-border bg-background/50">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all font-medium"
          >
            Got it!
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
