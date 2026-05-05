import { useRef, useEffect, useState, useCallback } from 'react';
import { Bold, Italic, List, ListOrdered, Code, Image, Link, Table, Subscript, Superscript, Sigma, Undo, Redo } from 'lucide-react';

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
  fontSize: number;
}

const LATEX_SNIPPETS = [
  { label: 'Section', insert: '\\section{title}' },
  { label: 'Subsection', insert: '\\subsection{title}' },
  { label: 'Bold', insert: '\\textbf{text}' },
  { label: 'Italic', insert: '\\textit{text}' },
  { label: 'Equation', insert: '\\begin{equation}\n    \n\\end{equation}' },
  { label: 'Align', insert: '\\begin{align}\n    \n\\end{align}' },
  { label: 'Figure', insert: '\\begin{figure}[h]\n    \\centering\n    \\includegraphics[width=0.8\\textwidth]{image}\n    \\caption{Caption}\n    \\label{fig:label}\n\\end{figure}' },
  { label: 'Table', insert: '\\begin{table}[h]\n    \\centering\n    \\begin{tabular}{|c|c|c|}\n        \\hline\n        A & B & C \\\\\n        \\hline\n        1 & 2 & 3 \\\\\n        \\hline\n    \\end{tabular}\n    \\caption{Caption}\n    \\label{tab:label}\n\\end{table}' },
  { label: 'Itemize', insert: '\\begin{itemize}\n    \\item Item 1\n    \\item Item 2\n\\end{itemize}' },
  { label: 'Enumerate', insert: '\\begin{enumerate}\n    \\item Item 1\n    \\item Item 2\n\\end{enumerate}' },
  { label: 'Code Block', insert: '\\begin{verbatim}\ncode here\n\\end{verbatim}' },
  { label: 'Fraction', insert: '\\frac{numerator}{denominator}' },
  { label: 'Sum', insert: '\\sum_{i=1}^{n}' },
  { label: 'Integral', insert: '\\int_{a}^{b}' },
  { label: 'Matrix', insert: '\\begin{pmatrix}\n    a & b \\\\\n    c & d\n\\end{pmatrix}' },
  { label: 'Greek α', insert: '\\alpha' },
  { label: 'Greek β', insert: '\\beta' },
  { label: 'Greek π', insert: '\\pi' },
];

export default function Editor({ content, onChange, fontSize }: EditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [lineNumbers, setLineNumbers] = useState<number[]>([]);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lines = content.split('\n').length;
    setLineNumbers(Array.from({ length: lines }, (_, i) => i + 1));
  }, [content]);

  const insertSnippet = useCallback((snippet: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newContent = content.substring(0, start) + snippet + content.substring(end);
    onChange(newContent);

    setTimeout(() => {
      textarea.focus();
      const cursorPos = start + snippet.length;
      textarea.setSelectionRange(cursorPos, cursorPos);
    }, 0);
  }, [content, onChange]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      insertSnippet('    ');
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  return (
    <div className="flex flex-col h-full bg-editor">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b border-border bg-surface overflow-x-auto flex-shrink-0">
        <div className="flex items-center gap-0.5">
          <button onClick={() => insertSnippet('\\textbf{}')} className="toolbar-btn" title="Bold (\\textbf)">
            <Bold className="w-4 h-4" />
          </button>
          <button onClick={() => insertSnippet('\\textit{}')} className="toolbar-btn" title="Italic (\\textit)">
            <Italic className="w-4 h-4" />
          </button>
          <button onClick={() => insertSnippet('_{}')} className="toolbar-btn" title="Subscript">
            <Subscript className="w-4 h-4" />
          </button>
          <button onClick={() => insertSnippet('^{}')} className="toolbar-btn" title="Superscript">
            <Superscript className="w-4 h-4" />
          </button>
        </div>

        <div className="w-px h-5 bg-border mx-1" />

        <div className="flex items-center gap-0.5">
          <button onClick={() => insertSnippet('\\begin{itemize}\n    \\item \n\\end{itemize}')} className="toolbar-btn" title="Bullet List">
            <List className="w-4 h-4" />
          </button>
          <button onClick={() => insertSnippet('\\begin{enumerate}\n    \\item \n\\end{enumerate}')} className="toolbar-btn" title="Numbered List">
            <ListOrdered className="w-4 h-4" />
          </button>
        </div>

        <div className="w-px h-5 bg-border mx-1" />

        <div className="flex items-center gap-0.5">
          <button onClick={() => insertSnippet('\\begin{equation}\n    \n\\end{equation}')} className="toolbar-btn" title="Equation Block">
            <Sigma className="w-4 h-4" />
          </button>
          <button onClick={() => insertSnippet('\\begin{verbatim}\n\n\\end{verbatim}')} className="toolbar-btn" title="Code Block">
            <Code className="w-4 h-4" />
          </button>
          <button onClick={() => insertSnippet('\\includegraphics[width=0.8\\textwidth]{image}')} className="toolbar-btn" title="Image">
            <Image className="w-4 h-4" />
          </button>
          <button onClick={() => insertSnippet('\\href{url}{text}')} className="toolbar-btn" title="Hyperlink">
            <Link className="w-4 h-4" />
          </button>
          <button onClick={() => insertSnippet('\\begin{tabular}{|c|c|}\n    \\hline\n    A & B \\\\\n    \\hline\n\\end{tabular}')} className="toolbar-btn" title="Table">
            <Table className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1" />

        <select
          onChange={(e) => {
            if (e.target.value) {
              insertSnippet(e.target.value);
              e.target.value = '';
            }
          }}
          className="bg-background border border-border rounded-lg px-2 py-1.5 text-sm text-foreground cursor-pointer hover:border-accent transition-colors"
          defaultValue=""
        >
          <option value="" disabled>Insert Snippet...</option>
          {LATEX_SNIPPETS.map((s) => (
            <option key={s.label} value={s.insert}>{s.label}</option>
          ))}
        </select>
      </div>

      {/* Editor Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Line Numbers */}
        <div
          ref={lineNumbersRef}
          className="w-12 bg-surface border-r border-border overflow-hidden flex-shrink-0 select-none"
        >
          <div className="py-3 pr-3 text-right">
            {lineNumbers.map((num) => (
              <div
                key={num}
                className="text-muted font-mono leading-relaxed"
                style={{ fontSize: `${fontSize}px`, lineHeight: '1.6' }}
              >
                {num}
              </div>
            ))}
          </div>
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          className="flex-1 py-3 px-4 bg-editor text-foreground font-mono resize-none outline-none leading-relaxed"
          style={{ fontSize: `${fontSize}px`, lineHeight: '1.6' }}
          spellCheck={false}
          placeholder="Start typing your LaTeX document..."
        />
      </div>
    </div>
  );
}
