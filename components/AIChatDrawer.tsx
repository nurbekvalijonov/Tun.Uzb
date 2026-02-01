import React, { useState, useRef, useEffect } from 'react';
import { chatWithAI } from '../services/geminiService';
import { ChatMessage } from '../types';

interface AIChatDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const AIChatDrawer: React.FC<AIChatDrawerProps> = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: '0', role: 'model', text: 'Hello! I am the TUN.UZ AI assistant. Ask me about our articles, Uzbekistan trends, or anything else.' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = async () => {
        if (!input.trim() || isTyping) return;

        const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        const history = messages.map(m => ({
            role: m.role === 'model' ? 'model' : 'user',
            parts: [{ text: m.text }]
        }));

        const responseText = await chatWithAI(userMsg.text, history);
        
        const botMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: responseText };
        setMessages(prev => [...prev, botMsg]);
        setIsTyping(false);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-tun-dark z-[60] shadow-2xl border-l border-white/10 flex flex-col animate-[slideInRight_0.3s_ease-out]">
            {/* Header */}
            <div className="h-16 flex items-center justify-between px-6 border-b border-white/10 glass">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="font-mono font-bold text-white tracking-widest">TUN.AI</span>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-white">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                            msg.role === 'user' 
                            ? 'bg-tun-accent text-white rounded-br-none' 
                            : 'bg-tun-gray text-gray-200 rounded-bl-none border border-white/5'
                        }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-tun-gray text-gray-400 text-xs px-4 py-2 rounded-full animate-pulse">
                            AI is thinking...
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-tun-black">
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Ask something..." 
                        className="flex-1 bg-tun-gray border border-white/10 rounded-full px-4 py-3 text-sm text-white focus:outline-none focus:border-tun-accent transition-colors"
                    />
                    <button 
                        onClick={handleSend}
                        disabled={isTyping}
                        className="bg-tun-accent hover:bg-red-700 text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors disabled:opacity-50"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIChatDrawer;
