import { motion } from 'framer-motion';
import { ArrowLeft, FileText } from 'lucide-react';

type Page = 'landing' | 'editor' | 'privacy' | 'terms';

interface TermsPageProps {
  onBack: () => void;
  onNavigate: (page: Page) => void;
}

export default function TermsPage({ onBack, onNavigate }: TermsPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#030303] text-white"
    >
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[150px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6 border-b border-white/10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Home</span>
        </button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">T<sub className="text-[8px]">X</sub></span>
          </div>
          <span className="font-semibold">TeXFlow</span>
        </div>
      </nav>

      {/* Content */}
      <main className="relative z-10 px-6 md:px-12 py-16 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
            <FileText className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Terms of Service</h1>
            <p className="text-zinc-400">Last updated: January 2024</p>
          </div>
        </div>

        <div className="prose prose-invert prose-zinc max-w-none space-y-8">
          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">Acceptance of Terms</h2>
            <p className="text-zinc-300 leading-relaxed">
              By accessing and using TeXFlow, you accept and agree to be bound by the terms and provisions of this agreement. 
              If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">Description of Service</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              TeXFlow is a free, browser-based LaTeX editor that allows you to:
            </p>
            <ul className="space-y-2 text-zinc-300">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Write and edit LaTeX documents in your browser</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Compile LaTeX documents to PDF format</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Download compiled PDFs and source files</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Use pre-made templates for various document types</span>
              </li>
            </ul>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">User Responsibilities</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">When using TeXFlow, you agree to:</p>
            <ul className="space-y-2 text-zinc-300">
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Use the service only for lawful purposes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Not attempt to disrupt or overload our servers</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Not use the service to compile malicious content</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-400 mt-1">•</span>
                <span>Respect the intellectual property rights of others</span>
              </li>
            </ul>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">Intellectual Property</h2>
            <p className="text-zinc-300 leading-relaxed">
              You retain all rights to the content you create using TeXFlow. We do not claim any ownership over your documents. 
              The TeXFlow application, including its design, code, and branding, is protected by intellectual property laws.
            </p>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">Disclaimer of Warranties</h2>
            <p className="text-zinc-300 leading-relaxed">
              TeXFlow is provided "as is" without any warranties, expressed or implied. We do not guarantee that the service 
              will be uninterrupted, error-free, or that compiled documents will be free of errors. You use the service at your own risk.
            </p>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">Limitation of Liability</h2>
            <p className="text-zinc-300 leading-relaxed">
              In no event shall TeXFlow or its creators be liable for any indirect, incidental, special, consequential, 
              or punitive damages arising out of or related to your use of the service. This includes, but is not limited to, 
              loss of data, loss of profits, or business interruption.
            </p>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">Service Availability</h2>
            <p className="text-zinc-300 leading-relaxed">
              We strive to keep TeXFlow available at all times, but we do not guarantee uninterrupted access. 
              We reserve the right to modify, suspend, or discontinue the service at any time without notice.
            </p>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">Changes to Terms</h2>
            <p className="text-zinc-300 leading-relaxed">
              We reserve the right to update these terms at any time. Continued use of the service after changes 
              constitutes acceptance of the new terms. We encourage you to review this page periodically.
            </p>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-4 text-blue-400">Contact</h2>
            <p className="text-zinc-300 leading-relaxed">
              If you have any questions about these Terms of Service, please contact us through our GitHub repository.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 md:px-12 py-8 border-t border-white/10 mt-16">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-sm">© 2024 TeXFlow. Free and open source.</p>
          <div className="flex items-center gap-6 text-sm text-zinc-400">
            <button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors">Privacy</button>
            <span className="text-white">Terms</span>
            <a href="https://github.com/HassanAliMAli/AuraLaTeX" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
