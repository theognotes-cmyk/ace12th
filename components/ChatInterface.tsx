
import React, { useState, useRef, useEffect } from 'react';
import { chatWithTutor } from '../services/geminiService.ts';
import { ChatMessage } from '../types.ts';

const ChatInterface: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Namaste! Main hoon AceBot. Board Exams 2026 ki taiyari shuru karein? Poochiye kuch bhi!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);
    try {
      const response = await chatWithTutor(messages, userMsg);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: 'Bhai, check your internet! Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50">
      {isOpen ? (
        <div className="bg-slate-900/95 backdrop-blur-3xl w-[90vw] md:w-[500px] h-[70vh] md:h-[700px] rounded-3xl lg:rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border border-white/5 flex flex-col overflow-hidden animate-in zoom-in-95 fade-in duration-500 origin-bottom-right">
          <div className="bg-slate-950 p-6 lg:p-10 flex items-center justify-between text-white relative overflow-hidden border-b border-white/5">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/20 rounded-full blur-[50px] z-0"></div>
            
            <div className="flex items-center gap-4 lg:gap-5 relative z-10">
              <div className="w-10 h-10 lg:w-14 lg:h-14 bg-indigo-600 rounded-xl lg:rounded-2xl flex items-center justify-center text-xl lg:text-3xl shadow-3xl shadow-indigo-500/30">✨</div>
              <div>
                <span className="font-black text-base lg:text-xl block leading-none tracking-tight">AceBot AI</span>
                <span className="text-[8px] lg:text-[9px] font-black uppercase tracking-[0.4em] text-indigo-400 mt-1 lg:mt-2 block">Board Tutor</span>
              </div>
            </div>

            {/* Close Button - Added relative z-20 to fix clickability */}
            <button 
              onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} 
              className="relative z-20 p-2 text-white/30 hover:text-white transition-colors text-xl lg:text-2xl cursor-pointer bg-white/5 rounded-full hover:bg-white/10"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 lg:p-10 space-y-6 lg:space-y-8 bg-slate-950/20 no-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-500`}>
                <div className={`max-w-[90%] lg:max-w-[85%] px-6 lg:px-8 py-4 lg:py-5 rounded-2xl lg:rounded-[2.5rem] text-xs lg:text-[14px] font-bold tracking-tight leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none shadow-2xl shadow-indigo-500/10' 
                    : 'bg-slate-800 text-slate-200 border border-white/5 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 border-white/5 border px-6 py-3 rounded-full text-[8px] lg:text-[10px] font-black text-indigo-400 uppercase tracking-widest animate-pulse">
                  AceBot is thinking...
                </div>
              </div>
            )}
          </div>

          <div className="p-4 lg:p-8 border-t border-white/5 bg-slate-950/50 backdrop-blur-md flex gap-3 lg:gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask AceBot..."
              className="flex-1 px-6 py-4 lg:py-5 bg-white/5 border border-white/5 rounded-full outline-none focus:ring-4 focus:ring-indigo-500/20 text-xs lg:text-[14px] font-bold text-white shadow-inner"
            />
            <button 
              onClick={handleSend}
              className="w-12 h-12 lg:w-16 lg:h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center hover:bg-indigo-500 hover:scale-105 active:scale-90 transition-all shadow-3xl shadow-indigo-600/20 shrink-0"
            >
              ➔
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 lg:w-24 lg:h-24 bg-indigo-600 text-white rounded-[2rem] lg:rounded-[3rem] shadow-[0_35px_70px_-15px_rgba(99,102,241,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all group relative border-4 border-slate-950"
        >
          <div className="absolute -top-1 -right-1 w-5 h-5 lg:w-6 lg:h-6 bg-green-500 rounded-full border-4 border-slate-950 animate-bounce"></div>
          <span className="text-2xl lg:text-4xl group-hover:rotate-12 transition-transform">✨</span>
        </button>
      )}
    </div>
  );
};

export default ChatInterface;
