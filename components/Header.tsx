import React from 'react';
import { CATEGORIES, TRANSLATIONS } from '../constants';
import { Language } from '../types';

interface HeaderProps {
    onOpenChat: () => void;
    activeCategory: string | null;
    onSelectCategory: (cat: string | null) => void;
    lang: Language;
    setLang: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenChat, activeCategory, onSelectCategory, lang, setLang }) => {
    const labels = TRANSLATIONS[lang];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <div 
                    className="flex items-center gap-2 cursor-pointer group"
                    onClick={() => onSelectCategory(null)}
                >
                    <div className="w-3 h-3 bg-tun-accent rounded-full animate-pulse-slow group-hover:scale-125 transition-transform" />
                    <span className="text-2xl font-black tracking-tighter text-white">TUN.UZ</span>
                </div>

                {/* Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => onSelectCategory(cat)}
                            className={`text-sm font-medium tracking-wide transition-colors uppercase ${
                                activeCategory === cat ? 'text-tun-accent' : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            {(labels.nav as any)[cat.toLowerCase()]}
                        </button>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    {/* Language Switcher */}
                    <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10">
                        {(['en', 'uz', 'ru'] as Language[]).map((l) => (
                            <button
                                key={l}
                                onClick={() => setLang(l)}
                                className={`px-2 py-1 text-[10px] font-bold rounded-full uppercase transition-colors ${
                                    lang === l ? 'bg-tun-accent text-white' : 'text-gray-400 hover:text-white'
                                }`}
                            >
                                {l}
                            </button>
                        ))}
                    </div>

                    <button 
                        onClick={onOpenChat}
                        className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-xs text-gray-300"
                    >
                        <svg className="w-4 h-4 text-tun-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span>{labels.ui.askAI}</span>
                    </button>
                    
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-white/10 flex items-center justify-center text-xs font-bold">
                        NV
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;