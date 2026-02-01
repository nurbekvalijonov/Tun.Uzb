import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    className?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, alt, className, ...props }) => {
    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const handleError = () => {
        setError(true);
        setLoaded(true);
    };

    const handleLoad = () => {
        setLoaded(true);
    };

    if (error) {
        return (
            <div className={`bg-tun-gray/50 flex flex-col items-center justify-center relative overflow-hidden ${className}`}>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
                <svg className="w-8 h-8 text-gray-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Image Unavailable</span>
            </div>
        );
    }

    return (
        <div className={`relative overflow-hidden bg-tun-gray/30 ${className}`}>
            {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <div className="w-full h-full bg-tun-gray animate-pulse" />
                </div>
            )}
            <img
                src={src}
                alt={alt}
                className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                onError={handleError}
                onLoad={handleLoad}
                {...props}
            />
        </div>
    );
};

export default ImageWithFallback;