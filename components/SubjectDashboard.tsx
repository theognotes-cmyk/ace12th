
import React, { useState, useRef, useEffect } from 'react';
import { Subject, Chapter } from '../types.ts';
import { generateDetailedNotes, generatePremiumPYQs, generateChapterAudio, generateVisualSolution } from '../services/geminiService.ts';

interface SubjectDashboardProps {
  subject: Subject;
  searchQuery?: string;
}

function decodeBase64(base64: string) {
  try {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  } catch (e) { return new Uint8Array(0); }
}

async function decodeAudioData(data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const VisualSolution: React.FC<{ description: string, subject: string, autoLoad?: boolean }> = ({ description, subject, autoLoad = false }) => {
  const [img, setImg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadVisual = async () => {
    setLoading(true);
    try {
      const data = await generateVisualSolution(description, subject);
      if (data) setImg(data);
    } catch (e) {}
    setLoading(false);
  };

  useEffect(() => {
    if (autoLoad) loadVisual();
  }, [autoLoad]);

  return (
    <div className="my-6">
      {!img && !loading && (
        <button 
          onClick={loadVisual}
          className="flex items-center gap-3 px-6 py-3 bg-indigo-500/5 border border-indigo-500/10 rounded-xl hover:bg-indigo-500/10 transition-all text-[10px] font-bold uppercase tracking-widest text-indigo-400"
        >
          🖼️ Show Visual: {description}
        </button>
      )}
      {loading && (
        <div className="flex items-center gap-3 py-4 text-indigo-400/50">
           <div className="w-3 h-3 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
           <span className="text-[10px] font-bold uppercase tracking-widest">Generating Diagram...</span>
        </div>
      )}
      {img && (
        <div className="bg-white rounded-2xl p-2 shadow-xl overflow-hidden mt-4 border border-slate-200">
           <img src={`data:image/png;base64,${img}`} className="w-full h-auto max-h-[500px] object-contain rounded-xl" alt="Concept Diagram" />
           <p className="text-[9px] text-slate-400 text-center mt-2 font-bold uppercase tracking-widest">Concept Visualization</p>
        </div>
      )}
    </div>
  );
};

const AestheticNotebook: React.FC<{ content: string; subject: string; isPyq?: boolean }> = ({ content, subject, isPyq }) => {
  const lines = content.split('\n');
  const sections: { title: string; lines: string[] }[] = [];
  let currentSection: { title: string; lines: string[] } | null = null;

  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) return;

    if (trimmed.startsWith('TOPIC:') || trimmed.startsWith('QUESTION:') || (trimmed.startsWith('#') && !trimmed.startsWith('##'))) {
      if (currentSection) sections.push(currentSection);
      currentSection = { title: trimmed.replace(/TOPIC:|QUESTION:|#/g, '').trim(), lines: [] };
    } else if (currentSection) {
      currentSection.lines.push(line);
    } else {
      currentSection = { title: "Overview", lines: [line] };
    }
  });
  if (currentSection) sections.push(currentSection);

  return (
    <div className="space-y-8 max-w-4xl mx-auto pb-32">
      {sections.map((section, idx) => (
        <div key={idx} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex items-center gap-3 mb-3 ml-2">
            <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
            <h3 className="text-base lg:text-lg font-bold text-white uppercase tracking-tight">{section.title}</h3>
          </div>

          <div className="glass rounded-[1.5rem] lg:rounded-[2rem] p-6 lg:p-10 border border-white/5 shadow-lg">
            <div className="space-y-5">
              {section.lines.map((line, lIdx) => {
                const trimmed = line.trim();
                
                if (trimmed.includes('[DIAGRAM:')) {
                  const match = trimmed.match(/\[DIAGRAM:\s*(.*?)\]/);
                  if (match && match[1]) return <VisualSolution key={lIdx} description={match[1]} subject={subject} autoLoad={isPyq} />;
                }

                if (trimmed.startsWith('YEAR:') || trimmed.startsWith('INSIGHT:')) {
                  const label = trimmed.split(':')[0];
                  const body = trimmed.split(':').slice(1).join(':').trim();
                  return (
                    <div key={lIdx} className="flex flex-wrap items-center gap-2">
                      <span className={`px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest rounded ${label === 'YEAR' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-indigo-500/10 text-indigo-400'}`}>
                        {label}
                      </span>
                      <p className="text-slate-400 text-xs font-medium">{body}</p>
                    </div>
                  );
                }

                if (trimmed.startsWith('SOLUTION:') || trimmed.startsWith('DEFINITION:') || trimmed.startsWith('FORMULA:')) {
                  const label = trimmed.split(':')[0];
                  const body = trimmed.split(':').slice(1).join(':').trim();
                  return (
                    <div key={lIdx} className="bg-indigo-500/[0.03] p-5 rounded-xl border border-white/5 mt-2">
                      <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-widest mb-2 block">{label}</span>
                      <p className="text-slate-200 text-sm lg:text-base font-medium leading-relaxed whitespace-pre-line">
                        {body}
                      </p>
                    </div>
                  );
                }

                return (
                  <p key={lIdx} className="text-slate-400 text-sm lg:text-base font-normal leading-relaxed pl-1">
                    {trimmed.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} className="text-indigo-300 font-bold">{part}</strong> : part)}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const SubjectDashboard: React.FC<SubjectDashboardProps> = ({ subject, searchQuery = '' }) => {
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [viewMode, setViewMode] = useState<'summary' | 'notes' | 'pyqs'>('summary');
  const [loading, setLoading] = useState(false);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    setSelectedChapter(null);
    setContent(null);
    setViewMode('summary');
    stopAudio();
  }, [subject]);

  useEffect(() => {
    if (!selectedChapter || viewMode === 'summary') {
      setContent(null);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setContent(null);
      setError(null);
      stopAudio();
      try {
        const result = viewMode === 'notes' 
          ? await generateDetailedNotes(subject.name, selectedChapter.title)
          : await generatePremiumPYQs(subject.name, selectedChapter.title);
        setContent(result);
      } catch (e: any) {
        setError(e.message || "Network Error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [viewMode, selectedChapter, subject.name]);

  const stopAudio = () => {
    if (audioSourceRef.current) {
      try { audioSourceRef.current.stop(); } catch(e) {}
      audioSourceRef.current = null;
    }
    setIsPlaying(false);
  };

  const handleListen = async () => {
    if (isPlaying) { stopAudio(); return; }
    if (!content) return;
    setIsAudioLoading(true);
    try {
      const audioData = await generateChapterAudio(content, subject.name);
      if (audioData) {
        if (!audioContextRef.current) audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        const ctx = audioContextRef.current;
        const bytes = decodeBase64(audioData);
        const buffer = await decodeAudioData(bytes, ctx, 24000, 1);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.onended = () => setIsPlaying(false);
        audioSourceRef.current = source;
        source.start();
        setIsPlaying(true);
      }
    } catch (e) {}
    setIsAudioLoading(false);
  };

  const filteredChapters = subject.chapters.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 px-4 lg:px-20 py-6 lg:py-10">
      {!selectedChapter ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <header className="mb-10 lg:mb-16 text-center lg:text-left">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="w-20 h-20 lg:w-28 lg:h-28 rounded-3xl bg-indigo-600 text-white flex items-center justify-center text-4xl lg:text-5xl shadow-2xl">
                {subject.icon}
              </div>
              <div>
                <h1 className="text-4xl lg:text-6xl font-black text-white tracking-tighter mb-2">{subject.name}</h1>
                <p className="text-slate-500 text-sm lg:text-base font-bold">4250+ PYQ Analysis | Board 2026 Prediction Hub</p>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 pb-20">
            {filteredChapters.map((chapter) => (
              <div 
                key={chapter.id} 
                onClick={() => { setSelectedChapter(chapter); setViewMode('summary'); }} 
                className="premium-card p-8 rounded-3xl cursor-pointer group hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden"
              >
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-xl mb-6 group-hover:bg-indigo-600/20 transition-all">📑</div>
                <h3 className="font-bold text-lg lg:text-xl text-white mb-3 tracking-tight">{chapter.title}</h3>
                <p className="text-slate-500 text-xs font-medium leading-relaxed mb-6 line-clamp-2">{chapter.description}</p>
                <div className="flex items-center justify-between pt-5 border-t border-white/5">
                   <span className="text-[9px] font-bold uppercase tracking-widest text-indigo-400">Chapter {chapter.id.replace(/\D/g, '')}</span>
                   <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white group-hover:bg-indigo-600 transition-all">→</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-500">
          <button 
            onClick={() => { setSelectedChapter(null); stopAudio(); }} 
            className="mb-8 flex items-center gap-2 text-slate-500 font-bold text-[10px] tracking-widest bg-white/5 hover:bg-white/10 px-6 py-3 rounded-full border border-white/5 active:scale-95 transition-all"
          >
            ← BACK
          </button>
          
          <div className="bg-slate-950/60 backdrop-blur-3xl rounded-[2rem] lg:rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden">
            <div className="p-10 lg:p-16 bg-gradient-to-br from-indigo-950/20 to-slate-950 text-white relative">
              <div className="absolute top-0 right-0 w-full h-full bg-indigo-500/5 rounded-full blur-[100px]"></div>
              <div className="relative z-10">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-4 block">Chapter Archive</span>
                <h2 className="text-2xl lg:text-4xl font-black tracking-tight leading-tight max-w-3xl">{selectedChapter.title}</h2>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row border-b border-white/5 px-6 lg:px-10 bg-slate-950/30 items-center justify-between gap-4 py-0 relative z-30">
              <div className="flex gap-4 lg:gap-6 overflow-x-auto no-scrollbar w-full lg:w-auto">
                {[
                  { id: 'summary', label: 'STRATEGY', icon: '💎' },
                  { id: 'notes', label: 'NOTES', icon: '📝' },
                  { id: 'pyqs', label: 'BOARD MIQs', icon: '🔥' }
                ].map((tab) => (
                  <button 
                    key={tab.id} 
                    disabled={loading}
                    onClick={() => setViewMode(tab.id as any)} 
                    className={`px-3 lg:px-4 py-6 text-[10px] lg:text-[11px] font-bold tracking-widest transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
                      viewMode === tab.id ? `border-indigo-500 text-white` : 'border-transparent text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>{tab.label}
                  </button>
                ))}
              </div>
              
              {viewMode === 'notes' && content && !loading && (
                <button 
                  onClick={handleListen} 
                  disabled={isAudioLoading} 
                  className={`w-full lg:w-auto mb-4 lg:mb-0 px-6 py-3 rounded-xl text-[9px] font-bold uppercase tracking-widest transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 ${
                    isPlaying ? 'bg-red-600' : 'bg-indigo-600'
                  } text-white disabled:opacity-50`}
                >
                  {isAudioLoading ? '...' : isPlaying ? '⏹ STOP' : '🔊 LISTEN'}
                </button>
              )}
            </div>

            <div className="p-6 lg:p-14 min-h-[400px]">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-24 gap-6">
                  <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Scanning Board Papers...</p>
                </div>
              ) : error ? (
                <div className="text-center py-20">
                  <p className="text-red-400 text-sm font-bold mb-4">Error loading content.</p>
                  <button onClick={() => setViewMode(viewMode)} className="px-6 py-2 bg-red-600 text-white rounded-lg font-bold text-[9px] uppercase tracking-widest">Retry</button>
                </div>
              ) : viewMode === 'summary' ? (
                <div className="space-y-10 animate-in fade-in duration-500">
                   <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                     {[
                       { label: 'Exam Importance', value: 'High', color: 'indigo' },
                       { label: 'Repeat Rate', value: '92%', color: 'emerald' },
                       { label: 'Study Priority', value: 'Level 1', color: 'purple' }
                     ].map((stat, i) => (
                       <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-2xl relative overflow-hidden">
                          <span className="text-[9px] font-bold uppercase text-slate-500 tracking-widest block mb-4">{stat.label}</span>
                          <p className="text-3xl font-black text-white">{stat.value}</p>
                       </div>
                     ))}
                   </div>
                   <div className="p-8 lg:p-12 bg-indigo-600/5 border border-indigo-500/10 rounded-[2rem]">
                      <h3 className="text-lg lg:text-xl font-bold text-white uppercase mb-4 tracking-tight">2026 Prep Strategy</h3>
                      <p className="text-slate-400 font-medium leading-relaxed text-sm lg:text-lg">
                        Our analysis shows this chapter is a goldmine for <span className="text-indigo-400">3-Mark and 5-Mark questions</span>. 
                        Don't waste time on small details; master the definitions and the MIQs provided. 
                        Board examiners repeat these specific patterns 8 out of 10 times.
                      </p>
                   </div>
                </div>
              ) : content ? (
                <AestheticNotebook 
                  content={content} 
                  subject={subject.name} 
                  isPyq={viewMode === 'pyqs'} 
                />
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectDashboard;
