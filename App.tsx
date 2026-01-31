
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar.tsx';
import SubjectDashboard from './components/SubjectDashboard.tsx';
import ChatInterface from './components/ChatInterface.tsx';
import { SUBJECTS } from './constants.tsx';
import { SubjectId } from './types.ts';

const App: React.FC = () => {
  const [activeSubjectId, setActiveSubjectId] = useState<SubjectId>('physics');
  const [searchQuery, setSearchQuery] = useState('');
  
  const activeSubject = SUBJECTS.find(s => s.id === activeSubjectId)!;

  useEffect(() => {
    setSearchQuery('');
  }, [activeSubjectId]);

  return (
    <div className="flex min-h-screen bg-[#020617] selection:bg-indigo-500/30 overflow-hidden">
      <Sidebar 
        activeSubject={activeSubjectId} 
        setActiveSubject={setActiveSubjectId} 
      />

      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <header className="h-20 lg:h-24 bg-slate-950/40 backdrop-blur-md border-b border-white/5 px-6 lg:px-12 flex items-center justify-between sticky top-0 z-30">
          <div className="flex-1 max-w-2xl hidden md:block">
            <div className="relative group">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 lg:h-6 lg:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 70 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search MIQs...`} 
                className="w-full bg-white/5 border border-white/5 rounded-2xl py-3 lg:py-4 pl-14 lg:pl-16 pr-6 text-xs lg:text-sm font-bold text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:bg-white/10 transition-all"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-6 lg:gap-10">
            <div className="flex -space-x-3 lg:-space-x-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 lg:w-12 lg:h-12 rounded-lg lg:rounded-[1.2rem] border-2 lg:border-4 border-slate-950 overflow-hidden shadow-2xl">
                  <img src={`https://picsum.photos/seed/${i + 20}/80/80`} alt="user" className="w-full h-full object-cover" />
                </div>
              ))}
              <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-lg lg:rounded-[1.2rem] bg-indigo-600 border-2 lg:border-4 border-slate-950 flex items-center justify-center text-[7px] lg:text-[10px] text-white font-black shadow-3xl">
                +4K
              </div>
            </div>
            <div className="hidden lg:block text-right">
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em] block mb-1">Board Focus</span>
              <span className="text-xs font-black text-white">2026 HUB</span>
            </div>
          </div>
        </header>

        {/* This container handles the main scrolling for the entire dashboard area */}
        <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
          <SubjectDashboard subject={activeSubject} searchQuery={searchQuery} />
        </div>
      </main>

      <ChatInterface />
    </div>
  );
};

export default App;
