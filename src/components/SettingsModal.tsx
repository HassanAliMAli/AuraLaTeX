import { motion } from 'framer-motion';
import { X, Type, Sun, Moon, RotateCcw } from 'lucide-react';

interface SettingsModalProps {
  onClose: () => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
}

export default function SettingsModal({ onClose, fontSize, setFontSize, theme, setTheme }: SettingsModalProps) {
  const resetSettings = () => {
    setFontSize(14);
    setTheme('dark');
  };

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
        className="bg-surface rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface-hover rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Font Size */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Type className="w-5 h-5 text-accent" />
                <label className="font-medium text-foreground">Editor Font Size</label>
              </div>
              <span className="text-sm text-muted">{fontSize}px</span>
            </div>
            <input
              type="range"
              min="10"
              max="24"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted mt-2">
              <span>10px</span>
              <span>24px</span>
            </div>
          </div>

          {/* Theme */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              {theme === 'dark' ? <Moon className="w-5 h-5 text-accent" /> : <Sun className="w-5 h-5 text-accent" />}
              <label className="font-medium text-foreground">Theme</label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setTheme('dark')}
                className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  theme === 'dark'
                    ? 'border-accent bg-accent/10'
                    : 'border-border hover:border-accent/50'
                }`}
              >
                <Moon className="w-5 h-5" />
                <span className="font-medium">Dark</span>
              </button>
              <button
                onClick={() => setTheme('light')}
                className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  theme === 'light'
                    ? 'border-accent bg-accent/10'
                    : 'border-border hover:border-accent/50'
                }`}
              >
                <Sun className="w-5 h-5" />
                <span className="font-medium">Light</span>
              </button>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-background rounded-xl p-4">
            <p className="text-sm text-muted mb-2">Font Preview:</p>
            <p className="font-mono text-foreground" style={{ fontSize: `${fontSize}px` }}>
              \documentclass&#123;article&#125;
            </p>
          </div>

          {/* Reset */}
          <button
            onClick={resetSettings}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-muted hover:text-foreground border border-border rounded-lg hover:bg-surface-hover transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset to Defaults
          </button>
        </div>

        <div className="p-4 border-t border-border bg-background/50">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all font-medium"
          >
            Done
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
