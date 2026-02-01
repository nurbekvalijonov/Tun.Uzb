import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Header from './components/Header';
import ArticleCard from './components/ArticleCard';
import ArticleReader from './components/ArticleReader';
import AIChatDrawer from './components/AIChatDrawer';
import CustomCursor from './components/CustomCursor';
import ShortsSection from './components/ShortsSection';
import ShareModal from './components/ShareModal';
import Footer from './components/Footer';
import { generateArticles, CATEGORIES, MOCK_SHORTS, TRANSLATIONS } from './constants';
import { Article, Language } from './types';
import { getTrendingTopics } from './services/geminiService';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [trendingTopics, setTrendingTopics] = useState<string[]>([]);
  
  // Pagination / Infinite Scroll State
  const [visibleCount, setVisibleCount] = useState<number>(6);

  // Share Modal State
  const [shareModalData, setShareModalData] = useState<{isOpen: boolean, article: Article | null, text: string}>({
      isOpen: false,
      article: null,
      text: ''
  });

  // Re-generate articles when language changes
  const allArticles = useMemo(() => generateArticles(lang), [lang]);
  const labels = TRANSLATIONS[lang].ui;

  useEffect(() => {
    getTrendingTopics().then(setTrendingTopics);
  }, []);

  // Keyboard Shortcuts: 'C' for Chat
  useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key.toLowerCase() === 'c' && !activeArticle && !shareModalData.isOpen) {
              setIsChatOpen(prev => !prev);
          }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeArticle, shareModalData.isOpen]);

  // Infinite Scroll Logic
  const handleScroll = useCallback(() => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
          setVisibleCount(prev => Math.min(prev + 6, 50)); // Load 6 more, max 50 per category limit
      }
  }, []);

  useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Reset pagination when category changes
  useEffect(() => {
    setVisibleCount(6);
    if (activeCategory) {
        const section = document.getElementById(`category-${activeCategory}`);
        if (section) {
            const headerOffset = 100;
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeCategory]);

  const handleShare = (article: Article, text?: string) => {
      setShareModalData({
          isOpen: true,
          article: article,
          text: text || article.subtitle
      });
  };

  const handleArticleNav = (direction: 'next' | 'prev') => {
      if (!activeArticle) return;
      
      const currentIndex = allArticles.findIndex(a => a.id === activeArticle.id);
      if (currentIndex === -1) return;

      let nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
      
      // Loop around
      if (nextIndex >= allArticles.length) nextIndex = 0;
      if (nextIndex < 0) nextIndex = allArticles.length - 1;

      setActiveArticle(allArticles[nextIndex]);
  };
  
  // Calculate related articles (same category, excluding current, take 3)
  const relatedArticles = useMemo(() => {
      if (!activeArticle) return [];
      return allArticles
          .filter(a => a.category === activeArticle.category && a.id !== activeArticle.id)
          .slice(0, 3);
  }, [activeArticle, allArticles]);

  return (
    <div className="min-h-screen bg-tun-black text-white font-sans selection:bg-tun-accent selection:text-white cursor-none flex flex-col">
      <CustomCursor isChatOpen={isChatOpen} />
      <Header 
        onOpenChat={() => setIsChatOpen(true)} 
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        lang={lang}
        setLang={setLang}
      />

      <main className="pt-24 pb-12 px-4 md:px-8 max-w-7xl mx-auto flex-grow">
        <div className="mb-8 flex items-center gap-4 overflow-hidden whitespace-nowrap border-b border-white/5 pb-4">
            <span className="text-tun-accent font-bold text-xs uppercase tracking-widest animate-pulse">{labels.liveTrends}</span>
            <div className="flex gap-8 text-xs font-mono text-gray-500 overflow-x-auto no-scrollbar">
                {trendingTopics.map((topic, i) => (
                    <span key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-700"></span>
                        {topic}
                    </span>
                ))}
            </div>
        </div>

        <div className="mb-12 text-center py-12 border-b border-white/5">
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-4 text-white">
                <span className="text-tun-accent">TUN</span>.UZ
            </h1>
            <p className="text-gray-400 text-lg md:text-xl font-serif italic">
                {lang === 'uz' ? 'Markaziy Osiyo yuragi.' : lang === 'ru' ? 'Пульс Центральной Азии.' : 'The Pulse of Central Asia.'}
            </p>
        </div>

        <ShortsSection shorts={MOCK_SHORTS} />

        <div className="space-y-32">
            {CATEGORIES.map((cat) => {
                // If a category is selected, only show that one.
                if (activeCategory && activeCategory !== cat) return null;

                const categoryArticles = allArticles.filter(a => a.category === cat).slice(0, visibleCount);
                const translatedCategory = (TRANSLATIONS[lang].nav as any)[cat.toLowerCase()];
                
                return (
                    <section key={cat} id={`category-${cat}`} className="scroll-mt-32">
                        <div className="flex items-end justify-between mb-8 border-b border-white/10 pb-4">
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">{translatedCategory}</h2>
                            <button className="text-sm text-tun-accent font-bold uppercase tracking-widest hover:text-white transition-colors" data-cursor="hover">{labels.viewAll}</button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {categoryArticles.map((article, index) => (
                                <div key={article.id} className="article-card">
                                    <ArticleCard 
                                        article={article} 
                                        onClick={setActiveArticle}
                                        onShare={(a) => handleShare(a)}
                                        featured={index === 0 && !activeCategory} // Only feature top item on homepage view
                                        labels={labels}
                                    />
                                </div>
                            ))}
                        </div>
                    </section>
                );
            })}
        </div>
      </main>

      <Footer />

      {/* Reader */}
      {activeArticle && (
        <ArticleReader 
          article={activeArticle} 
          relatedArticles={relatedArticles}
          onClose={() => setActiveArticle(null)}
          onShare={(text) => handleShare(activeArticle, text)}
          onNext={() => handleArticleNav('next')}
          onPrev={() => handleArticleNav('prev')}
          onSelectArticle={setActiveArticle}
          labels={labels}
        />
      )}

      {/* Share Modal */}
      {shareModalData.article && (
          <ShareModal 
            isOpen={shareModalData.isOpen}
            onClose={() => setShareModalData({ ...shareModalData, isOpen: false })}
            title={shareModalData.article.title}
            subtitle={shareModalData.article.subtitle}
            textToShare={shareModalData.text}
            lang={lang}
            labels={labels}
          />
      )}

      <AIChatDrawer 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </div>
  );
};

export default App;