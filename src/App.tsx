import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import LandingPage from './components/LandingPage';
import EditorPage from './components/EditorPage';
import PrivacyPage from './components/PrivacyPage';
import TermsPage from './components/TermsPage';

type Page = 'landing' | 'editor' | 'privacy' | 'terms';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Check URL hash for direct access
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash === 'editor') setCurrentPage('editor');
      else if (hash === 'privacy') setCurrentPage('privacy');
      else if (hash === 'terms') setCurrentPage('terms');
      else setCurrentPage('landing');
    };
    
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    window.location.hash = page === 'landing' ? '' : page;
    window.scrollTo(0, 0);
  };

  return (
    <div className={theme === 'light' ? 'light-theme' : ''}>
      <AnimatePresence mode="wait">
        {currentPage === 'landing' && (
          <LandingPage 
            key="landing" 
            onGetStarted={() => navigate('editor')}
            onNavigate={navigate}
          />
        )}
        {currentPage === 'editor' && (
          <EditorPage 
            key="editor" 
            onBack={() => navigate('landing')}
            theme={theme}
            setTheme={setTheme}
          />
        )}
        {currentPage === 'privacy' && (
          <PrivacyPage 
            key="privacy" 
            onBack={() => navigate('landing')}
            onNavigate={navigate}
          />
        )}
        {currentPage === 'terms' && (
          <TermsPage 
            key="terms" 
            onBack={() => navigate('landing')}
            onNavigate={navigate}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
