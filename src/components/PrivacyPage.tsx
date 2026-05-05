import { motion } from 'framer-motion';
import { ArrowLeft, Shield } from 'lucide-react';

type Page = 'landing' | 'editor' | 'privacy' | 'terms';

interface PrivacyPageProps {
  onBack: () => void;
  onNavigate: (page: Page) => void;
}

export default function PrivacyPage({ onBack, onNavigate }: PrivacyPageProps) {
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
            <span className="text-white font-bold text-sm">A<sub className="text-[8px]">L</sub></span>
          </div>
          <span className="font-semibold">AuraLaTeX</span>
        </div>
      </nav>

      {/* Content */}
      <main className="relative z-10 px-6 md:px-12 py-16 max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Privacy Policy</h1>
            <p className="text-zinc-400">Last updated: January 2024</p>
          </div>
        </div>

        <div className="prose prose-invert prose-zinc max-w-none space-y-8">
          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-4 text-emerald-400">Our Commitment to Privacy</h2>
            <p className="text-zinc-300 leading-relaxed">
              AuraLaTeX is designed with privacy as a core principle. We believe that your documents are your business, 
              and we've built our service to reflect that belief. This privacy policy explains our approach to your data.
            </p>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-4 text-emerald-400">Data We Don't Collect</h2>
            <ul className="space-y-3 text-zinc-300">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✓</span>
                <span><strong>No account required:</strong> You can use AuraLaTeX without creating an account or providing any personal information.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✓</span>
                <span><strong>No document storage:</strong> Your LaTeX documents are processed in real-time and are never stored on our servers.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✓</span>
                <span><strong>No tracking cookies:</strong> We don't use tracking cookies or any form of user tracking.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✓</span>
                <span><strong>No analytics:</strong> We don't collect usage analytics or behavioral data.</span>
              </li>
            </ul>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-4 text-emerald-400">How Compilation Works</h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              When you compile a document, your LaTeX code is sent to our compilation server. Here's what happens:
            </p>
            <ol className="space-y-3 text-zinc-300 list-decimal list-inside">
              <li>Your LaTeX code is transmitted securely via HTTPS</li>
              <li>The code is compiled into a PDF using our LaTeX engine</li>
              <li>The resulting PDF is sent back to your browser</li>
              <li>All data is immediately deleted from our servers</li>
            </ol>
            <p className="text-zinc-300 leading-relaxed mt-4">
              We do not log, store, or retain any of your document content.
            </p>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-4 text-emerald-400">Local Storage</h2>
            <p className="text-zinc-300 leading-relaxed">
              TeXFlow may use your browser's local storage to save your preferences (such as theme settings and font size). 
              This data never leaves your device and can be cleared at any time through your browser settings.
            </p>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-4 text-emerald-400">Third-Party Services</h2>
            <p className="text-zinc-300 leading-relaxed">
              TeXFlow uses a third-party LaTeX compilation service to convert your documents to PDF. 
              This service processes your documents in accordance with their own privacy policy. 
              We have chosen providers that share our commitment to privacy and do not retain user data.
            </p>
          </section>

          <section className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-2xl font-semibold mb-4 text-emerald-400">Contact Us</h2>
            <p className="text-zinc-300 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us through our GitHub repository.
            </p>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 md:px-12 py-8 border-t border-white/10 mt-16">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-zinc-500 text-sm">© 2024 TeXFlow. Free and open source.</p>
          <div className="flex items-center gap-6 text-sm text-zinc-400">
            <span className="text-white">Privacy</span>
            <button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors">Terms</button>
            <a href="https://github.com/HassanAliMAli/AuraLaTeX" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
