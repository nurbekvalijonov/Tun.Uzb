import React from 'react';
import { Article } from '../types';
import ImageWithFallback from './ImageWithFallback';

interface ArticleCardProps {
    article: Article;
    onClick: (article: Article) => void;
    onShare: (article: Article) => void;
    featured?: boolean;
    labels: any;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick, onShare, featured = false, labels }) => {
    return (
        <div 
            className={`group cursor-pointer relative overflow-hidden rounded-sm transition-all duration-500 hover:shadow-2xl hover:shadow-tun-accent/10 border border-white/5 bg-tun-gray/20 ${featured ? 'md:col-span-2 md:row-span-2' : ''}`}
            onClick={() => onClick(article)}
        >
            <div className={`relative ${featured ? 'h-96 md:h-full' : 'h-48'}`}>
                <ImageWithFallback 
                    src={article.coverImage} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-75 group-hover:brightness-100"
                />
                <div className="absolute top-4 left-4 bg-tun-black/80 backdrop-blur-sm px-2 py-1 text-[10px] font-bold tracking-widest text-white border border-white/10">
                    {article.category}
                </div>
            </div>

            <div className="p-6 flex flex-col justify-between h-auto bg-gradient-to-b from-transparent to-tun-black/50">
                <div>
                    <div className="flex items-center gap-2 mb-3 text-xs text-gray-400">
                        <span className="text-tun-accent font-semibold">{article.author.name}</span>
                        <span>•</span>
                        <span>{article.publishedAt}</span>
                    </div>
                    <h3 className={`font-serif font-bold text-white mb-2 leading-tight group-hover:text-tun-red transition-colors ${featured ? 'text-3xl md:text-4xl' : 'text-xl'}`}>
                        {article.title}
                    </h3>
                    <p className={`text-gray-400 line-clamp-2 ${featured ? 'text-lg md:text-xl' : 'text-sm'}`}>
                        {article.subtitle}
                    </p>
                    
                    {/* Share Button on Card */}
                    <div className="mt-4 flex justify-start">
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                onShare(article);
                            }}
                            className="group/share relative flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-wider px-3 py-2 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10"
                            data-cursor="hover"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                            {labels.share}
                            
                            {/* Tooltip */}
                            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-tun-black text-white text-[10px] rounded opacity-0 group-hover/share:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
                                Share this article
                            </span>
                        </button>
                    </div>
                </div>

                {featured && (
                    <div className="mt-6 flex items-center gap-4">
                        <span className="text-xs text-gray-500 border border-white/10 px-2 py-1 rounded-full">
                            {article.readTime} min read
                        </span>
                        {article.tags.map(tag => (
                             <span key={tag} className="text-xs text-gray-500">#{tag}</span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArticleCard;