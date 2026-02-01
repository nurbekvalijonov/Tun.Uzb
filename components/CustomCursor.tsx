import React, { useEffect, useRef, useState } from 'react';

interface CustomCursorProps {
    isChatOpen?: boolean;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ isChatOpen }) => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const [hoverState, setHoverState] = useState<'default' | 'pointer' | 'text' | 'card'>('default');

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            if (cursorRef.current && dotRef.current) {
                // Main circle follows with slight delay/smoothness via CSS transition or direct
                cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
                dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            }
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            
            // Check for specific interactive elements
            if (target.tagName === 'P' || target.tagName === 'H1' || target.tagName === 'H2' || target.tagName === 'H3') {
                setHoverState('text');
                return;
            }

            const isClickable = 
                target.tagName === 'BUTTON' || 
                target.tagName === 'A' || 
                target.closest('button') || 
                target.closest('a') ||
                target.classList.contains('cursor-pointer') ||
                target.dataset.cursor === 'hover';
            
            const isCard = target.closest('.article-card');

            if (isClickable) {
                setHoverState('pointer');
            } else if (isCard) {
                setHoverState('card');
            } else {
                setHoverState('default');
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    // Helper classes for cursor appearance
    const getCursorClasses = () => {
        if (isChatOpen) {
            return `w-14 h-14 bg-green-500/10 border-green-500 ${hoverState !== 'default' ? 'scale-110' : 'scale-100'}`;
        }
        
        switch (hoverState) {
            case 'pointer':
                return 'w-12 h-12 bg-tun-accent/10 border-tun-accent mix-blend-difference';
            case 'card':
                return 'w-20 h-20 border-white/20 bg-white/5 backdrop-blur-[1px] rounded-[30%]'; // Squircle-ish
            case 'text':
                return 'w-6 h-6 border-white/50 bg-transparent';
            default:
                return 'w-8 h-8 border-white/30 bg-transparent';
        }
    };

    const getDotClasses = () => {
         if (isChatOpen) {
            return 'bg-green-500 w-2 h-2';
         }

         switch (hoverState) {
            case 'pointer':
                return 'bg-tun-accent w-2 h-2 scale-150';
            case 'card':
                return 'bg-white w-1.5 h-1.5 opacity-50';
            case 'text':
                return 'bg-white w-1 h-6 rounded-none'; // Text cursor bar
            default:
                return 'bg-tun-accent w-1.5 h-1.5';
        }
    };

    return (
        <>
            <style>
                {`
                    body, a, button, input { cursor: none !important; }
                    /* Show default cursor on mobile devices */
                    @media (hover: none) and (pointer: coarse) {
                        body, a, button, input { cursor: auto !important; }
                        .custom-cursor { display: none !important; }
                    }
                `}
            </style>
            {/* The outer ring */}
            <div 
                ref={cursorRef}
                className={`custom-cursor fixed top-0 left-0 border rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out flex items-center justify-center ${getCursorClasses()}`}
            >
            </div>
            {/* The inner dot */}
            <div 
                ref={dotRef}
                className={`custom-cursor fixed top-0 left-0 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-out ${getDotClasses()}`}
            />
        </>
    );
};

export default CustomCursor;