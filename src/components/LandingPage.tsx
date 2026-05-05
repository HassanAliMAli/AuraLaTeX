import { motion } from 'framer-motion';
import { Play, Zap, Download, Layout, Code, FileText, ArrowRight, Sparkles, Globe, Shield, ChevronDown } from 'lucide-react';

type Page = 'landing' | 'editor' | 'privacy' | 'terms';

interface LandingPageProps {
  onGetStarted: () => void;
  onNavigate: (page: Page) => void;
}

export default function LandingPage({ onGetStarted, onNavigate }: LandingPageProps) {
  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Instant Compilation',
      description: 'Compile your LaTeX documents in seconds with our cloud-powered engine.',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: <Layout className="w-6 h-6" />,
      title: 'Live Preview',
      description: 'See your PDF output in real-time as you write your document.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Rich Templates',
      description: 'Start with professional templates for articles, resumes, theses, and more.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: 'Easy Export',
      description: 'Download your compiled PDF or LaTeX source with a single click.',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Smart Editor',
      description: 'Syntax highlighting, auto-completion, and helpful snippets built-in.',
      color: 'from-rose-500 to-red-500',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'No Sign-up Required',
      description: 'Start writing immediately. No accounts, no tracking, no hassle.',
      color: 'from-indigo-500 to-violet-500',
    },
  ];

  const templates = [
    { name: 'Academic Article', icon: '📄' },
    { name: 'Resume / CV', icon: '💼' },
    { name: 'Thesis', icon: '🎓' },
    { name: 'Presentation', icon: '📊' },
    { name: 'Letter', icon: '✉️' },
    { name: 'Math Document', icon: '∑' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#030303] text-white overflow-x-hidden"
    >
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[200px]" />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <span className="text-white font-bold">A<sub className="text-[10px]">L</sub></span>
          </div>
          <span className="text-xl font-bold tracking-tight">AuraLaTeX</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://github.com/HassanAliMAli/AuraLaTeX" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors hidden sm:block">
            GitHub
          </a>
          <button
            onClick={onGetStarted}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-medium transition-colors backdrop-blur-sm border border-white/10"
          >
            Open Editor
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 md:px-12 pt-16 md:pt-24 pb-20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span>Free & Open Source LaTeX Editor</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          >
            <span className="bg-gradient-to-r from-white via-white to-zinc-400 bg-clip-text text-transparent">
              Write LaTeX.
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Beautifully.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10"
          >
            A modern, fast, and elegant LaTeX editor that runs entirely in your browser.
            No sign-up required. Just write, compile, and download.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={onGetStarted}
              className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 rounded-xl font-semibold text-lg shadow-2xl shadow-emerald-500/30 transition-all hover:scale-105"
            >
              <Play className="w-5 h-5" />
              Start Writing Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#features"
              className="flex items-center gap-2 px-6 py-4 text-zinc-400 hover:text-white transition-colors"
            >
              Learn more
              <ChevronDown className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Hero Image / Editor Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-5xl mx-auto mt-16 md:mt-24"
        >
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
            {/* Browser Chrome */}
            <div className="bg-zinc-900 px-4 py-3 flex items-center gap-3 border-b border-white/10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 bg-zinc-800 rounded-lg text-xs text-zinc-400">
                  texflow.app
                </div>
              </div>
            </div>
            {/* Editor Preview */}
            <div className="bg-[#0a0a0b] flex">
              {/* Editor Side */}
              <div className="flex-1 p-4 border-r border-white/10">
                <div className="font-mono text-sm space-y-1">
                  <p><span className="text-purple-400">\documentclass</span>{'{article}'}</p>
                  <p><span className="text-purple-400">\usepackage</span>[utf8]{'{inputenc}'}</p>
                  <p><span className="text-purple-400">\usepackage</span>{'{amsmath}'}</p>
                  <p className="text-zinc-600">...</p>
                  <p><span className="text-purple-400">\title</span>{'{'}My Research Paper{'}'}</p>
                  <p><span className="text-purple-400">\author</span>{'{'}Your Name{'}'}</p>
                  <p className="text-zinc-600">...</p>
                  <p><span className="text-blue-400">\begin</span>{'{document}'}</p>
                  <p className="pl-4"><span className="text-purple-400">\maketitle</span></p>
                  <p className="pl-4"><span className="text-purple-400">\section</span>{'{Introduction}'}</p>
                  <p className="pl-4 text-zinc-300">Welcome to AuraLaTeX...</p>
                </div>
              </div>
              {/* Preview Side */}
              <div className="flex-1 p-4 flex items-center justify-center bg-zinc-900/50">
                <div className="w-48 h-64 bg-white rounded shadow-xl flex flex-col p-4">
                  <div className="text-center mb-4">
                    <div className="text-xs font-bold text-zinc-800">My Research Paper</div>
                    <div className="text-[8px] text-zinc-500">Your Name</div>
                  </div>
                  <div className="text-[6px] text-zinc-600 space-y-1">
                    <p className="font-bold">1 Introduction</p>
                    <p>Welcome to AuraLaTeX, a modern LaTeX editor...</p>
                    <p className="font-bold mt-2">2 Methods</p>
                    <p>We present a novel approach...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Glow Effect */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-cyan-500/20 blur-3xl" />
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 md:px-12 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-4"
            >
              Everything you need to write
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"> beautiful documents</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-zinc-400 text-lg max-w-2xl mx-auto"
            >
              AuraLaTeX combines powerful features with a clean, intuitive interface.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl transition-all duration-300"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-zinc-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section className="relative z-10 px-6 md:px-12 py-24 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-4"
            >
              Start with a
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> template</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-zinc-400 text-lg max-w-2xl mx-auto"
            >
              Choose from our collection of professionally designed templates.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {templates.map((template, index) => (
              <motion.button
                key={template.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={onGetStarted}
                className="group p-6 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-emerald-500/50 rounded-2xl transition-all duration-300 text-center"
              >
                <div className="text-4xl mb-3 group-hover:scale-125 transition-transform">{template.icon}</div>
                <p className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">{template.name}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 px-6 md:px-12 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold mb-4"
            >
              Simple as
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"> 1-2-3</span>
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Write', desc: 'Type your LaTeX code in our powerful editor with syntax highlighting and snippets.' },
              { step: '2', title: 'Compile', desc: 'Click compile and watch your document transform into a beautiful PDF.' },
              { step: '3', title: 'Download', desc: 'Download your PDF or LaTeX source file instantly. No sign-up needed.' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg shadow-emerald-500/30">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-zinc-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 md:px-12 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="relative p-12 md:p-16 rounded-3xl overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600" />
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyem0tNiA2aC0ydi00aDJ2NHptMC02di00aC0ydjRoMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
            
            <div className="relative">
              <Globe className="w-16 h-16 mx-auto mb-6 text-white/80" />
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
                Ready to write something amazing?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
                Join thousands of researchers, students, and professionals who use AuraLaTeX to create beautiful documents.
              </p>
              <button
                onClick={onGetStarted}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-emerald-600 hover:bg-zinc-100 rounded-xl font-semibold text-lg shadow-2xl transition-all hover:scale-105"
              >
                <Play className="w-5 h-5" />
                Open Editor
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 md:px-12 py-12 border-t border-white/10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T<sub className="text-[8px]">X</sub></span>
            </div>
            <span className="font-semibold">AuraLaTeX</span>
          </div>
          <p className="text-zinc-500 text-sm">
            © 2024 AuraLaTeX. Free and open source.
          </p>
          <div className="flex items-center gap-6 text-sm text-zinc-400">
            <button 
              onClick={() => onNavigate('privacy')} 
              className="hover:text-white transition-colors"
            >
              Privacy
            </button>
            <button 
              onClick={() => onNavigate('terms')} 
              className="hover:text-white transition-colors"
            >
              Terms
            </button>
            <a href="https://github.com/HassanAliMAli/AuraLaTeX" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
