import React, { useEffect, useRef } from 'react';

interface ShareModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    subtitle: string;
    textToShare: string;
    lang: string;
    labels: any;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, title, subtitle, textToShare, lang, labels }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (isOpen) {
            // Slight delay to ensure DOM is ready and modal is visible for refs
            setTimeout(drawCanvas, 100);
        }
    }, [isOpen, textToShare, title]);

    const drawCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Setup Canvas (Story Format 9:16)
        const width = 1080;
        const height = 1920; 
        canvas.width = width;
        canvas.height = height;

        // 1. Background
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#0a0a0a');
        gradient.addColorStop(1, '#050505');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        // 2. Decorative Elements (Abstract glow)
        const glow = ctx.createRadialGradient(width/2, height/2, 100, width/2, height/2, 600);
        glow.addColorStop(0, 'rgba(255, 0, 51, 0.1)'); // TUN Accent color
        glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, width, height);

        // 3. Header / Logo
        ctx.font = '900 60px Inter';
        ctx.fillStyle = '#ff0033'; // Accent color
        ctx.fillText('TUN', 80, 160);
        ctx.fillStyle = '#ffffff';
        ctx.fillText('.UZ', 220, 160);
        
        ctx.font = 'bold 24px Inter';
        ctx.fillStyle = '#666';
        ctx.fillText('ULTIMATE MEDIA ECOSYSTEM', 80, 200);

        // 4. Article Title
        ctx.font = 'bold 60px Merriweather';
        ctx.fillStyle = '#ffffff';
        wrapText(ctx, title, 80, 400, 920, 80);

        // 5. Separator
        ctx.beginPath();
        ctx.moveTo(80, 650);
        ctx.lineTo(200, 650);
        ctx.strokeStyle = '#ff0033';
        ctx.lineWidth = 4;
        ctx.stroke();

        // 6. Main Text (Quote or Subtitle)
        // Quote Marks
        ctx.font = 'italic 180px serif';
        ctx.fillStyle = '#333';
        ctx.fillText('“', 60, 850);

        ctx.font = '40px Inter'; // Lighter font for content
        ctx.fillStyle = '#cccccc';
        wrapText(ctx, textToShare, 120, 850, 840, 60);

        // 7. Footer Call to Action
        const footerY = height - 150;
        ctx.fillStyle = '#1f1f1f';
        ctx.roundRect(80, footerY - 60, 400, 100, 50);
        ctx.fill();
        
        ctx.font = 'bold 30px Inter';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(labels.readMore, 130, footerY);
    };

    const wrapText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
        const words = text.split(' ');
        let line = '';
        let currentY = y;

        for(let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                ctx.fillText(line, x, currentY);
                line = words[n] + ' ';
                currentY += lineHeight;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, x, currentY);
    };

    const downloadImage = () => {
        if (!canvasRef.current) return;
        const link = document.createElement('a');
        link.download = `tun-uz-share-${Date.now()}.png`;
        link.href = canvasRef.current.toDataURL();
        link.click();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-tun-dark border border-white/10 rounded-2xl p-6 max-w-md w-full relative animate-[popIn_0.3s]">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white" data-cursor="hover">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h3 className="text-xl font-bold text-white mb-6">{labels.shareStory}</h3>
                
                <div className="aspect-[9/16] w-full bg-black mb-6 rounded-lg overflow-hidden border border-white/10 relative group">
                    <canvas ref={canvasRef} className="w-full h-full object-contain" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-sm font-bold text-white">Preview</span>
                    </div>
                </div>

                <button 
                    onClick={downloadImage}
                    className="w-full py-4 bg-tun-accent text-white font-bold text-sm tracking-widest uppercase rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                    data-cursor="hover"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    {labels.download}
                </button>
                <p className="text-center text-xs text-gray-500 mt-4">Instagram / Telegram / Facebook</p>
            </div>
        </div>
    );
};

export default ShareModal;
