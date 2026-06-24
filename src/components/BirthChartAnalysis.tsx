import React, { useState } from 'react';
import { getBirthChartAnalysis, BirthChartInsight } from '../services/astrologyService';

export function BirthChartAnalysis() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [insight, setInsight] = useState<BirthChartInsight | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !date || !time || !location) return;
    
    setLoading(true);
    try {
      const data = await getBirthChartAnalysis(name, date, time, location);
      setInsight(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <header className="mb-6 flex-shrink-0">
        <h2 className="text-2xl font-light text-white">Birth Chart Calculation</h2>
        <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">Map the heavens at the exact moment of birth</p>
      </header>

      <div className="flex flex-1 gap-6 min-h-0">
        {/* Form Column */}
        <div className="w-1/3 flex flex-col gap-4 bg-[#121212] border border-white/5 p-6 rounded-2xl overflow-y-auto">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="block text-[10px] uppercase text-slate-500 font-bold mb-1.5">Name / Being</label>
              <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500/50" placeholder="e.g. Orion" />
            </div>
            <div>
              <label className="block text-[10px] uppercase text-slate-500 font-bold mb-1.5">Date of Birth</label>
              <input type="date" required value={date} onChange={e => setDate(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500/50 [color-scheme:dark]" />
            </div>
            <div>
              <label className="block text-[10px] uppercase text-slate-500 font-bold mb-1.5">Time of Birth</label>
              <input type="time" required value={time} onChange={e => setTime(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500/50 [color-scheme:dark]" />
            </div>
            <div>
              <label className="block text-[10px] uppercase text-slate-500 font-bold mb-1.5">Place of Birth</label>
              <input type="text" required value={location} onChange={e => setLocation(e.target.value)} className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500/50" placeholder="City, Country" />
            </div>
            
            <button type="submit" disabled={loading} className="mt-4 px-4 py-3 bg-purple-600 rounded-lg text-xs font-semibold text-white shadow-lg shadow-purple-500/20 hover:bg-purple-500 transition-colors cursor-pointer flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? (
                <svg className="w-4 h-4 text-white animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              ) : (
                "CAST BIRTH CHART"
              )}
            </button>
          </form>
        </div>

        {/* Results Column */}
        <div className="w-2/3 bg-[#121212] border border-white/5 rounded-2xl overflow-y-auto relative p-6">
           <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:100px_100px]" />
           
           {!insight && !loading && (
             <div className="w-full h-full flex flex-col items-center justify-center opacity-40">
                <svg className="w-16 h-16 text-slate-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                <p className="text-sm font-light">Input birth details to calculate cosmic signature</p>
             </div>
           )}

           {loading && (
             <div className="w-full h-full flex flex-col items-center justify-center">
               <div className="w-48 h-48 rounded-full border border-purple-500/30 animate-[spin_10s_linear_infinite] relative">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-purple-500 rounded-full animate-ping" />
               </div>
               <p className="mt-8 text-xs text-purple-400 uppercase tracking-widest animate-pulse">Calculating Planetary Positions...</p>
             </div>
           )}

           {insight && !loading && (
             <div className="relative z-10 flex flex-col gap-8 animate-[fadeIn_0.5s_ease-out]">
               <div className="grid grid-cols-4 gap-4">
                 <div className="group relative bg-white/5 border border-white/5 p-4 rounded-xl text-center hover:bg-white/10 transition-colors">
                   <div className="text-[10px] uppercase text-slate-500 font-bold mb-1 cursor-help">Sun Sign</div>
                   <div className="text-lg text-amber-400">{insight.sunSign}</div>
                   <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 text-xs bg-slate-800 text-slate-200 border border-white/10 rounded-lg shadow-lg z-50 text-center pointer-events-none">
                     Represents your core identity, ego, and conscious will. It's who you are at heart.
                   </div>
                 </div>
                 <div className="group relative bg-white/5 border border-white/5 p-4 rounded-xl text-center hover:bg-white/10 transition-colors">
                   <div className="text-[10px] uppercase text-slate-500 font-bold mb-1 cursor-help">Moon Sign</div>
                   <div className="text-lg text-slate-200">{insight.moonSign}</div>
                   <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 text-xs bg-slate-800 text-slate-200 border border-white/10 rounded-lg shadow-lg z-50 text-center pointer-events-none">
                     Reflects your inner emotional self, instincts, and subconscious needs.
                   </div>
                 </div>
                 <div className="group relative bg-white/5 border border-white/5 p-4 rounded-xl text-center hover:bg-white/10 transition-colors">
                   <div className="text-[10px] uppercase text-slate-500 font-bold mb-1 cursor-help">Rising Sign</div>
                   <div className="text-lg text-purple-400">{insight.risingSign}</div>
                   <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 text-xs bg-slate-800 text-slate-200 border border-white/10 rounded-lg shadow-lg z-50 text-center pointer-events-none">
                     The mask you present to the world and your initial approach to life.
                   </div>
                 </div>
                 <div className="group relative bg-white/5 border border-white/5 p-4 rounded-xl text-center hover:bg-white/10 transition-colors">
                   <div className="text-[10px] uppercase text-slate-500 font-bold mb-1 cursor-help">Ruling Planet</div>
                   <div className="text-lg text-emerald-400">{insight.rulingPlanet}</div>
                   <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 text-xs bg-slate-800 text-slate-200 border border-white/10 rounded-lg shadow-lg z-50 text-center pointer-events-none">
                     The planet associated with your Rising Sign, heavily influencing your life path.
                   </div>
                 </div>
               </div>

               <div className="bg-black/40 border border-white/5 p-6 rounded-xl">
                 <h3 className="text-[10px] uppercase text-purple-400 font-bold mb-4">Deep Chart Analysis</h3>
                 <div className="text-sm text-slate-300 font-light leading-relaxed whitespace-pre-line">
                   {insight.analysis}
                 </div>
               </div>

               <div className="bg-black/40 border border-white/5 p-6 rounded-xl">
                 <h3 className="text-[10px] uppercase text-slate-500 font-bold mb-4">Elemental Balance</h3>
                 <div className="flex items-center gap-6">
                   <div className="flex-1 flex flex-col gap-1">
                     <span className="text-xs text-red-400">Fire {insight.elements.fire}%</span>
                     <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden"><div className="h-full bg-red-400" style={{width: `${insight.elements.fire}%`}} /></div>
                   </div>
                   <div className="flex-1 flex flex-col gap-1">
                     <span className="text-xs text-amber-600">Earth {insight.elements.earth}%</span>
                     <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden"><div className="h-full bg-amber-600" style={{width: `${insight.elements.earth}%`}} /></div>
                   </div>
                   <div className="flex-1 flex flex-col gap-1">
                     <span className="text-xs text-sky-400">Air {insight.elements.air}%</span>
                     <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden"><div className="h-full bg-sky-400" style={{width: `${insight.elements.air}%`}} /></div>
                   </div>
                   <div className="flex-1 flex flex-col gap-1">
                     <span className="text-xs text-blue-500">Water {insight.elements.water}%</span>
                     <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden"><div className="h-full bg-blue-500" style={{width: `${insight.elements.water}%`}} /></div>
                   </div>
                 </div>
               </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
