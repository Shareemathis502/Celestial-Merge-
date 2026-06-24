import React, { useState, useEffect } from 'react';
import { getJournalEntries, JournalEntry, deleteJournalEntry } from '../services/journalService';

export function JournalView() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  useEffect(() => {
    setEntries(getJournalEntries());
  }, []);

  const handleDelete = (id: string) => {
    deleteJournalEntry(id);
    setEntries(getJournalEntries());
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <header className="mb-6 flex-shrink-0 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-light text-white">Cosmic Journal</h2>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">Your private celestial logs</p>
        </div>
      </header>
      
      <div className="flex-1 bg-[#121212] border border-white/5 rounded-2xl overflow-y-auto p-6 relative">
         <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
         <div className="relative z-10 flex flex-col gap-4">
           {entries.length === 0 ? (
             <div className="text-center py-12 text-slate-500 font-light">
               No journal entries found. Save your daily readings to build your celestial log.
             </div>
           ) : (
             entries.map((entry) => (
               <div key={entry.id} className="bg-black/40 border border-white/10 rounded-xl p-5 hover:border-purple-500/30 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-900/40 border border-purple-500/30 flex items-center justify-center">
                        <span className="text-xs font-bold text-purple-300 uppercase">{entry.zodiacSign.substring(0,2)}</span>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white">{entry.zodiacSign} Reading</h3>
                        <p className="text-xs text-slate-500">{entry.dateStr} • {entry.moonPhase}</p>
                      </div>
                    </div>
                    <button onClick={() => handleDelete(entry.id)} className="text-slate-500 hover:text-red-400 transition-colors p-2">
                       <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-3 mb-3 border border-white/5">
                    <p className="text-xs text-slate-400 font-light leading-relaxed italic border-l-2 border-purple-500/50 pl-2">
                      "{entry.horoscope}"
                    </p>
                  </div>

                  {entry.note && (
                    <div>
                      <h4 className="text-[10px] uppercase text-purple-400 font-bold mb-1 tracking-wider">Personal Note</h4>
                      <p className="text-sm text-slate-200 font-light leading-relaxed">
                        {entry.note}
                      </p>
                    </div>
                  )}
               </div>
             ))
           )}
         </div>
      </div>
    </div>
  );
}
