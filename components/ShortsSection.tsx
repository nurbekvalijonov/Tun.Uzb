import React from 'react';
import { ShortVideo } from '../types';

interface ShortsSectionProps {
    shorts: ShortVideo[];
}

const ShortsSection: React.FC<ShortsSectionProps> = ({ shorts }) => {
    return (
        <section className="mb-24 py-8 border-t border-b border-white/5 bg-white/[0.02]">
            <div className="flex items-center justify-between mb-8 px-2">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-tun-red flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-black tracking-tighter text-white uppercase italic">
                        TUN<span className="text-tun-red">.SHORTS</span>
                    </h2>
                </div>
                <button className="text-xs font-bold text-gray-500 uppercase hover:text-white transition-colors" data-cursor="hover">View All</button>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar snap-x snap-mandatory">
                {shorts.map((short) => (
                    <div 
                        key={short.id} 
                        className="flex-shrink-0 w-[180px] md:w-[240px] aspect-[9/16] relative rounded-xl overflow-hidden group cursor-pointer snap-center border border-white/10"
                        data-cursor="hover"
                    >
                        <img 
                            src={short.thumbnail} 
                            alt={short.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-75 group-hover:brightness-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
                        
                        {/* Play Icon */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                             <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                                <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                             </div>
                        </div>

                        <div className="absolute bottom-4 left-4 right-4">
                            <span className="text-[10px] font-bold text-tun-red uppercase tracking-widest mb-1 block">Live Update</span>
                            <h3 className="text-sm font-bold text-white leading-tight line-clamp-2 mb-2">{short.title}</h3>
                            <div className="flex items-center gap-2 text-[10px] text-gray-400">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                                {short.views}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ShortsSection;