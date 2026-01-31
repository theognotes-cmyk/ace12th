
import React from 'react';
import { SUBJECTS } from '../constants.tsx';
import { SubjectId } from '../types.ts';

interface SidebarProps {
  activeSubject: SubjectId;
  setActiveSubject: (id: SubjectId) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSubject, setActiveSubject }) => {
  return (
    <div className="w-16 md:w-20 lg:w-80 bg-slate-950/60 backdrop-blur-3xl border-r border-white/5 h-screen sticky top-0 flex flex-col z-40 transition-all duration-500">
      <div className="p-4 lg:p-10 flex items-center justify-center lg:justify-start gap-5">
        <div className="w-10 h-10 lg:w-14 lg:h-14 bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 rounded-xl lg:rounded-[1.6rem] flex items-center justify-center text-white font-black text-xl lg:text-3xl shadow-2xl shadow-indigo-500/20 transform -rotate-3 hover:rotate-0 transition-all duration-500 cursor-pointer">
          A
        </div>
        <div className="hidden lg:block">
           <span className="font-black text-2xl text-white tracking-tighter block leading-none">Ace12</span>
           <span className="text-[8px] font-black uppercase tracking-[0.4em] text-indigo-400 mt-1 block">Premium Hub</span>
        </div>
      </div>
      
      <nav className="flex-1 px-2 lg:px-5 space-y-2 py-4 overflow-y-auto no-scrollbar">
        {SUBJECTS.map((sub) => (
          <button
            key={sub.id}
            onClick={() => setActiveSubject(sub.id)}
            className={`w-full flex items-center justify-center lg:justify-start gap-0 lg:gap-6 px-0 lg:px-8 py-4 lg:py-5 rounded-xl lg:rounded-[2rem] transition-all duration-500 relative group/btn overflow-hidden ${
              activeSubject === sub.id 
                ? `bg-white/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] scale-[1.02] border border-white/10` 
                : 'text-slate-500 hover:bg-white/5'
            }`}
          >
            <span className={`text-xl lg:text-2xl transition-all duration-700 ${activeSubject === sub.id ? 'scale-110 drop-shadow-[0_0_15px_rgba(129,140,248,0.5)]' : 'group-hover/btn:scale-110'}`}>
              {sub.icon}
            </span>
            <span className={`hidden lg:block font-extrabold text-[13px] tracking-tight transition-colors duration-300 ${activeSubject === sub.id ? 'text-white' : 'text-slate-500'}`}>
              {sub.name}
            </span>
            {activeSubject === sub.id && (
              <div className="absolute left-0 w-1 h-6 lg:h-8 bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.8)]"></div>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 lg:p-8 border-t border-white/5">
        <div className="hidden lg:flex flex-col gap-6 p-8 bg-slate-900/50 border border-white/5 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group/card transform hover:scale-[1.02] transition-all duration-500">
          <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-[60px]"></div>
          <div className="relative z-10 space-y-4">
            <div>
              <span className="text-[9px] font-black text-indigo-300 uppercase tracking-[0.4em] block mb-2">Target Year</span>
              <div className="flex items-baseline gap-2">
                 <span className="text-4xl font-black tracking-tighter">2026</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-full w-[65%] rounded-full shadow-[0_0_15px_rgba(99,102,241,0.6)]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
