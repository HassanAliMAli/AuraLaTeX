import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, FileText, BookOpen, Mail, Briefcase, Presentation, GraduationCap, Newspaper, FileCode } from 'lucide-react';
import { Template } from '../types';

interface TemplateModalProps {
  onClose: () => void;
  onSelect: (template: Template) => void;
}

const TEMPLATES: Template[] = [
  {
    id: 'article',
    name: 'Article',
    description: 'Standard academic article',
    icon: 'FileText',
    content: `\\documentclass{article}
\\usepackage[utf8]{inputenc}
\\usepackage{amsmath}
\\usepackage{graphicx}
\\usepackage{hyperref}

\\title{Your Article Title}
\\author{Your Name}
\\date{\\today}

\\begin{document}

\\maketitle

\\begin{abstract}
Your abstract goes here. This is a brief summary of your paper.
\\end{abstract}

\\section{Introduction}
Start your introduction here.

\\section{Methods}
Describe your methods.

\\section{Results}
Present your results.

\\section{Conclusion}
Summarize your findings.

\\end{document}`
  },
  {
    id: 'report',
    name: 'Report',
    description: 'Technical or business report',
    icon: 'BookOpen',
    content: `\\documentclass[12pt]{report}
\\usepackage[utf8]{inputenc}
\\usepackage{geometry}
\\usepackage{graphicx}
\\usepackage{hyperref}

\\geometry{a4paper, margin=1in}

\\title{Report Title}
\\author{Your Name}
\\date{\\today}

\\begin{document}

\\maketitle
\\tableofcontents

\\chapter{Executive Summary}
Brief overview of the report.

\\chapter{Introduction}
\\section{Background}
Provide context and background.

\\section{Objectives}
State the objectives.

\\chapter{Analysis}
\\section{Data Collection}
Describe data sources.

\\section{Findings}
Present your findings.

\\chapter{Recommendations}
Provide recommendations.

\\chapter{Conclusion}
Summarize the report.

\\end{document}`
  },
  {
    id: 'letter',
    name: 'Letter',
    description: 'Formal letter template',
    icon: 'Mail',
    content: `\\documentclass{letter}
\\usepackage[utf8]{inputenc}

\\signature{Your Name}
\\address{Your Address \\\\ City, State ZIP}

\\begin{document}

\\begin{letter}{Recipient Name \\\\ Recipient Address \\\\ City, State ZIP}

\\opening{Dear Sir or Madam,}

I am writing to inquire about...

Thank you for your time and consideration.

\\closing{Sincerely,}

\\end{letter}

\\end{document}`
  },
  {
    id: 'resume',
    name: 'Resume/CV',
    description: 'Professional resume',
    icon: 'Briefcase',
    content: `\\documentclass[11pt,a4paper]{article}
\\usepackage[utf8]{inputenc}
\\usepackage{geometry}
\\usepackage{titlesec}
\\usepackage{enumitem}
\\usepackage{hyperref}

\\geometry{margin=0.75in}
\\pagestyle{empty}
\\titleformat{\\section}{\\large\\bfseries}{}{0em}{}[\\titlerule]
\\titlespacing{\\section}{0pt}{10pt}{5pt}

\\begin{document}

\\begin{center}
{\\LARGE\\bfseries Your Name}\\\\[5pt]
email@example.com $\\cdot$ (555) 123-4567 $\\cdot$ City, State
\\end{center}

\\section{Education}
\\textbf{University Name} \\hfill 2020 -- 2024\\\\
Bachelor of Science in Your Field \\hfill GPA: 3.8/4.0

\\section{Experience}
\\textbf{Company Name} \\hfill City, State\\\\
\\textit{Job Title} \\hfill June 2023 -- Present
\\begin{itemize}[noitemsep]
    \\item Achievement or responsibility one
    \\item Achievement or responsibility two
\\end{itemize}

\\section{Skills}
\\textbf{Technical:} Skill 1, Skill 2, Skill 3\\\\
\\textbf{Languages:} English (Native), Spanish (Conversational)

\\section{Projects}
\\textbf{Project Name} -- Brief description of the project.

\\end{document}`
  },
  {
    id: 'presentation',
    name: 'Presentation',
    description: 'Beamer slides',
    icon: 'Presentation',
    content: `\\documentclass{beamer}
\\usetheme{Madrid}
\\usecolortheme{default}

\\title{Presentation Title}
\\author{Your Name}
\\institute{Your Institution}
\\date{\\today}

\\begin{document}

\\begin{frame}
\\titlepage
\\end{frame}

\\begin{frame}{Outline}
\\tableofcontents
\\end{frame}

\\section{Introduction}
\\begin{frame}{Introduction}
\\begin{itemize}
    \\item First point
    \\item Second point
    \\item Third point
\\end{itemize}
\\end{frame}

\\section{Main Content}
\\begin{frame}{Main Content}
\\begin{block}{Key Concept}
Explanation of the concept.
\\end{block}
\\end{frame}

\\section{Conclusion}
\\begin{frame}{Conclusion}
\\begin{itemize}
    \\item Summary point 1
    \\item Summary point 2
\\end{itemize}
\\end{frame}

\\begin{frame}
\\centering
{\\Huge Thank You!}\\\\[1cm]
Questions?
\\end{frame}

\\end{document}`
  },
  {
    id: 'thesis',
    name: 'Thesis',
    description: 'Academic thesis/dissertation',
    icon: 'GraduationCap',
    content: `\\documentclass[12pt,a4paper]{report}
\\usepackage[utf8]{inputenc}
\\usepackage{geometry}
\\usepackage{setspace}
\\usepackage{graphicx}
\\usepackage{amsmath}
\\usepackage{hyperref}

\\geometry{margin=1.25in}
\\doublespacing

\\begin{document}

\\begin{titlepage}
\\centering
\\vspace*{2cm}
{\\LARGE\\bfseries Thesis Title}\\\\[1cm]
{\\large A thesis submitted in partial fulfillment}\\\\[0.5cm]
{\\large of the requirements for the degree of}\\\\[0.5cm]
{\\large Master of Science}\\\\[2cm]
{\\Large Your Name}\\\\[1cm]
{\\large Department Name}\\\\[0.5cm]
{\\large University Name}\\\\[1cm]
{\\large \\today}
\\end{titlepage}

\\chapter*{Abstract}
Your abstract goes here.

\\tableofcontents

\\chapter{Introduction}
\\section{Background}
Provide background information.

\\section{Objectives}
State your research objectives.

\\chapter{Literature Review}
Review relevant literature.

\\chapter{Methodology}
Describe your research methods.

\\chapter{Results}
Present your findings.

\\chapter{Discussion}
Discuss the implications.

\\chapter{Conclusion}
Summarize and conclude.

\\end{document}`
  },
  {
    id: 'math',
    name: 'Math Document',
    description: 'Heavy mathematical content',
    icon: 'FileCode',
    content: `\\documentclass{article}
\\usepackage[utf8]{inputenc}
\\usepackage{amsmath}
\\usepackage{amssymb}
\\usepackage{amsthm}

\\newtheorem{theorem}{Theorem}
\\newtheorem{lemma}{Lemma}
\\newtheorem{definition}{Definition}

\\title{Mathematical Document}
\\author{Your Name}
\\date{\\today}

\\begin{document}

\\maketitle

\\section{Introduction}
This document demonstrates mathematical typesetting.

\\section{Definitions}
\\begin{definition}
A \\textbf{group} is a set $G$ with a binary operation $\\cdot$ satisfying:
\\begin{enumerate}
    \\item Closure: $a \\cdot b \\in G$ for all $a, b \\in G$
    \\item Associativity: $(a \\cdot b) \\cdot c = a \\cdot (b \\cdot c)$
    \\item Identity: There exists $e \\in G$ such that $e \\cdot a = a \\cdot e = a$
    \\item Inverse: For each $a \\in G$, there exists $a^{-1}$ such that $a \\cdot a^{-1} = e$
\\end{enumerate}
\\end{definition}

\\section{Theorems}
\\begin{theorem}[Pythagorean Theorem]
For a right triangle with legs $a$ and $b$ and hypotenuse $c$:
\\begin{equation}
    a^2 + b^2 = c^2
\\end{equation}
\\end{theorem}

\\begin{proof}
The proof is left as an exercise.
\\end{proof}

\\section{Equations}
The quadratic formula:
\\begin{equation}
    x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}
\\end{equation}

Euler's identity:
\\begin{equation}
    e^{i\\pi} + 1 = 0
\\end{equation}

\\end{document}`
  }
];

const ICONS: Record<string, React.ReactNode> = {
  FileText: <FileText className="w-6 h-6" />,
  BookOpen: <BookOpen className="w-6 h-6" />,
  Mail: <Mail className="w-6 h-6" />,
  Briefcase: <Briefcase className="w-6 h-6" />,
  Presentation: <Presentation className="w-6 h-6" />,
  GraduationCap: <GraduationCap className="w-6 h-6" />,
  Newspaper: <Newspaper className="w-6 h-6" />,
  FileCode: <FileCode className="w-6 h-6" />,
};

export default function TemplateModal({ onClose, onSelect }: TemplateModalProps) {
  const [selected, setSelected] = useState<Template | null>(null);

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
        className="bg-surface rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Choose a Template</h2>
            <p className="text-sm text-muted mt-1">Start with a pre-made template to save time</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface-hover rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TEMPLATES.map((template) => (
              <button
                key={template.id}
                onClick={() => setSelected(template)}
                className={`p-5 rounded-xl border-2 text-left transition-all hover:scale-[1.02] ${
                  selected?.id === template.id
                    ? 'border-accent bg-accent/10 shadow-lg shadow-accent/20'
                    : 'border-border hover:border-accent/50 bg-background'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                  selected?.id === template.id ? 'bg-accent text-white' : 'bg-surface text-accent'
                }`}>
                  {ICONS[template.icon || 'FileText']}
                </div>
                <h3 className="font-semibold text-foreground mb-1">{template.name}</h3>
                <p className="text-sm text-muted">{template.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-border bg-background/50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-muted hover:text-foreground transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => selected && onSelect(selected)}
            disabled={!selected}
            className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg hover:from-emerald-600 hover:to-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/25"
          >
            Use Template
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
