/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { getDailyHoroscope, DailyInsight } from './services/astrologyService';
import { MoonPhaseGraphic } from './components/MoonPhaseGraphic';
import { BirthChartAnalysis } from './components/BirthChartAnalysis';
import { MoonPhaseCalendar } from './components/MoonPhaseCalendar';
import { JournalView } from './components/JournalView';
import { saveJournalEntry } from './services/journalService';

const ZODIACS = [
  "Aries", "Taurus", "Gemini", "Cancer", 
  "Leo", "Virgo", "Libra", "Scorpio", 
  "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

export default function App() {
  const [selectedZodiac, setSelectedZodiac] = useState<string>("Aries");
  const [insight, setInsight] = useState<DailyInsight | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'daily'|'birth_chart'|'moon_calendar'|'journal'>('daily');
  const [journalNote, setJournalNote] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveJournal = () => {
    if (!insight) return;
    saveJournalEntry({
      dateStr: new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      zodiacSign: selectedZodiac,
      horoscope: insight.horoscope,
      note: journalNote,
      moonPhase: insight.moonPhase
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
    setJournalNote('');
  };

  useEffect(() => {
    let active = true;
    setLoading(true);
    getDailyHoroscope(selectedZodiac).then((data) => {
      if (active) {
        setInsight(data);
        setLoading(false);
      }
    });
    return () => { active = false; };
  }, [selectedZodiac]);

  return (
    <div className="w-full h-screen bg-[#0A0A0A] text-slate-300 font-sans flex flex-col overflow-hidden">
      {/* Top Navigation */}
      <nav className="h-14 border-b border-white/10 flex items-center justify-between px-6 flex-shrink-0 bg-[#0F0F0F]">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 flex items-center justify-center bg-gradient-to-br from-indigo-800 to-purple-900 rounded-md">
              <svg className="w-4 h-4 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            </div>
            <span className="font-semibold text-white tracking-tight">Celestial <span className="font-light opacity-50">Insights</span></span>
          </div>
          <div className="h-4 w-[1px] bg-white/20" />
          <div className="flex items-center gap-6 text-xs font-medium uppercase tracking-widest h-full pt-4">
            <button onClick={() => setActiveTab('daily')} className={`text-white border-b ${activeTab === 'daily' ? 'border-white opacity-100' : 'border-transparent opacity-40 hover:opacity-100'} transition-opacity pb-4`}>Daily Forecast</button>
            <button onClick={() => setActiveTab('birth_chart')} className={`text-white border-b ${activeTab === 'birth_chart' ? 'border-white opacity-100' : 'border-transparent opacity-40 hover:opacity-100'} transition-opacity pb-4`}>Birth Chart</button>
            <button onClick={() => setActiveTab('moon_calendar')} className={`text-white border-b ${activeTab === 'moon_calendar' ? 'border-white opacity-100' : 'border-transparent opacity-40 hover:opacity-100'} transition-opacity pb-4`}>Moon Phases</button>
            <button onClick={() => setActiveTab('journal')} className={`text-white border-b ${activeTab === 'journal' ? 'border-white opacity-100' : 'border-transparent opacity-40 hover:opacity-100'} transition-opacity pb-4`}>Journal</button>
            <button className="opacity-40 hover:opacity-100 transition-opacity pb-4 border-b border-transparent cursor-not-allowed" disabled>Compatibility</button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 bg-white/5 border border-white/10 rounded text-[10px] uppercase font-bold text-purple-400">
            ASTRAL_SYNC_ACTIVE
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-900 to-slate-800 border border-white/10 flex items-center justify-center">
            <span className="text-xs text-white opacity-60">US</span>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Tools */}
        <aside className="w-16 border-r border-white/5 flex flex-col items-center py-6 gap-8 bg-[#0D0D0D]">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-purple-500/10 text-purple-400 cursor-pointer">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/5 text-slate-500 hover:text-slate-200 transition-colors cursor-pointer">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/5 text-slate-500 hover:text-slate-200 transition-colors cursor-pointer">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </button>
          <button className="mt-auto w-10 h-10 flex items-center justify-center rounded-lg text-slate-600 hover:text-slate-200 transition-colors cursor-pointer">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </button>
        </aside>

        {/* Main Area */}
        <main className="flex-1 p-6 flex flex-col gap-6 overflow-hidden">
          {activeTab === 'birth_chart' ? (
            <BirthChartAnalysis />
          ) : activeTab === 'moon_calendar' ? (
            <MoonPhaseCalendar />
          ) : activeTab === 'journal' ? (
            <JournalView />
          ) : (
            <>
              <header className="flex justify-between items-end flex-shrink-0">
                <div>
                  <h1 className="text-2xl font-light text-white">{selectedZodiac} Insight</h1>
                  <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest flex items-center gap-2">
                    {loading ? (
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping"></span> Syncing with cosmos...
                      </span>
                    ) : (
                      <>Last align: Just now • Celestial sync active</>
                    )}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-md text-xs font-semibold hover:bg-white/10 transition-colors cursor-pointer text-slate-200">
                    LUNAR CHART
                  </button>
                  <button className="px-4 py-2 bg-purple-600 rounded-md text-xs font-semibold text-white shadow-lg shadow-purple-500/20 hover:bg-purple-500 transition-colors cursor-pointer" onClick={() => {setLoading(true); getDailyHoroscope(selectedZodiac).then(data => {setInsight(data); setLoading(false);})}}>
                    REFRESH ORACLE
                  </button>
                </div>
              </header>

              <div className="flex-1 flex gap-6 min-h-0">
                {/* Visualizer Card */}
                <div className="flex-[2] relative bg-[#121212] border border-white/5 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
                  
                  {/* Center Piece Graphic */}
                  <div className="relative">
                    <div className="w-64 h-64 rounded-full border border-purple-500/30 animate-[spin_60s_linear_infinite]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-white/5 border-dashed animate-[spin_40s_reverse_linear_infinite]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center max-w-xs text-center px-4">
                      {loading ? (
                        <div className="flex flex-col items-center">
                          <svg className="w-8 h-8 text-purple-400 animate-spin mb-2" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                          <span className="text-[10px] uppercase tracking-tighter text-purple-400 font-bold">Astrogating...</span>
                        </div>
                      ) : (
                        <>
                          <span className="text-xl font-light text-white mb-2 leading-relaxed">{insight?.horoscope || "The stars are quiet..."}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* HUD Elements */}
                  {!loading && insight && (
                    <>
                      <div className="absolute top-6 left-6 p-4 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 w-48 hidden sm:block">
                        <div className="text-[10px] uppercase text-slate-500 mb-2">Cosmic Harmony</div>
                        <div className="flex gap-1 items-end h-8">
                          <div className="w-2 bg-purple-400" style={{ height: `${insight.fortune}%`}} />
                          <div className="w-2 bg-purple-400 opacity-80" style={{ height: `${insight.love}%`}} />
                          <div className="w-2 bg-purple-400 opacity-60" style={{ height: `${insight.career}%`}} />
                          <div className="w-2 bg-purple-400 opacity-40" style={{ height: '70%'}} />
                        </div>
                        <div className="flex justify-between mt-1 text-[8px] uppercase text-slate-600 font-mono">
                          <span>FORT</span>
                          <span>LOVE</span>
                          <span>CARE</span>
                          <span>MIND</span>
                        </div>
                      </div>

                      <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                        <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                          <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                          <span className="text-[10px] font-mono text-white">DO: {insight.do.toUpperCase()}</span>
                        </div>
                        <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                          <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                          <span className="text-[10px] font-mono text-white">DONT: {insight.dont.toUpperCase()}</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                
                {/* Planetary Positions */}
                <div className="flex-1 bg-black/30 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 overflow-y-auto">
                  <h3 className="text-[10px] uppercase text-slate-500 font-bold tracking-widest border-b border-white/5 pb-2">Planetary Positions</h3>
                  {loading ? (
                    <div className="flex-1 flex items-center justify-center opacity-50">
                       <svg className="w-6 h-6 text-slate-400 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {insight?.planetaryPositions?.map(pos => (
                        <div key={pos.planet} className="bg-white/5 border border-white/10 rounded-lg p-3">
                           <div className="flex items-center justify-between mb-1">
                             <span className="text-sm font-semibold text-purple-300">{pos.planet}</span>
                             <span className="text-[10px] uppercase text-slate-500 bg-black/50 px-2 py-0.5 rounded">{pos.sign}</span>
                           </div>
                           <p className="text-xs text-slate-400">{pos.details}</p>
                        </div>
                      ))}
                      {(!insight?.planetaryPositions || insight.planetaryPositions.length === 0) && (
                        <p className="text-xs text-slate-500 text-center italic mt-4">Planetary data unavailable.</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 h-auto lg:h-24 flex-shrink-0">
                <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col justify-between hover:bg-white/10 transition-colors">
                  <span className="text-[10px] uppercase text-slate-500 font-bold mb-2 lg:mb-0">Ruling Element</span>
                  <span className="text-xl font-light text-white">{insight ? insight.element : '--'}</span>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col justify-between hover:bg-white/10 transition-colors relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500">
                    {insight ? <MoonPhaseGraphic phase={insight.moonPhase} /> : <div className="w-8 h-8 bg-slate-800 rounded-full animate-pulse" />}
                  </div>
                  <span className="text-[10px] uppercase text-slate-500 font-bold mb-2 lg:mb-0 relative z-10">Current Moon Phase</span>
                  <span className="text-xl font-light text-white relative z-10" style={{fontSize: insight?.moonPhase?.length && insight.moonPhase.length > 12 ? '1rem' : '1.25rem'}}>{insight ? insight.moonPhase : '--'}</span>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex flex-col justify-between hover:bg-emerald-500/20 transition-colors relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-20">
                     <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
                   </div>
                  <span className="text-[10px] uppercase text-emerald-400 font-bold mb-2 lg:mb-0 relative z-10">Compatible With</span>
                  <span className="text-sm font-light text-white relative z-10">{insight ? insight.compatible.join(", ") : '--'}</span>
                </div>
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex flex-col justify-between hover:bg-red-500/20 transition-colors relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-20">
                     <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5" /></svg>
                  </div>
                  <span className="text-[10px] uppercase text-red-500 font-bold relative z-10 mb-2 lg:mb-0">Incompatible With</span>
                  <span className="text-sm font-light text-white relative z-10">{insight ? insight.incompatible.join(", ") : '--'}</span>
                </div>
              </div>

              {/* Journal Save Section */}
              {!loading && insight && (
                <div className="bg-black/30 border border-white/5 rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-center flex-shrink-0">
                  <div className="flex-1 w-full">
                    <label className="text-[10px] uppercase text-slate-500 font-bold mb-2 block tracking-widest">Journal Note (Optional)</label>
                    <textarea 
                      value={journalNote}
                      onChange={e => setJournalNote(e.target.value)}
                      placeholder="How are you feeling about today's reading?" 
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50 resize-none h-14"
                    />
                  </div>
                  <button onClick={handleSaveJournal} disabled={saveSuccess} className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-semibold hover:bg-purple-600 hover:border-purple-500 transition-colors cursor-pointer text-slate-200 whitespace-nowrap h-14 flex items-center justify-center gap-2 w-full sm:w-auto">
                    {saveSuccess ? (
                      <><svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> SAVED TO JOURNAL</>
                    ) : (
                      <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" /></svg> SAVE READING</>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </main>

        {/* Sidebar Panel for Sign Selection */}
        <aside className="hidden md:flex w-72 border-l border-white/5 bg-[#0F0F0F] flex-col overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white mb-1">Zodiac Selection</h3>
              <p className="text-xs text-slate-500">Align your constellation</p>
            </div>
            <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {ZODIACS.map((sign) => (
              <button 
                key={sign}
                onClick={() => {setSelectedZodiac(sign); setActiveTab('daily');}}
                className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${
                  selectedZodiac === sign && activeTab === 'daily'
                    ? 'bg-purple-900/30 border-purple-500/50 text-white' 
                    : 'bg-transparent border-transparent hover:bg-white/5 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                    selectedZodiac === sign && activeTab === 'daily' ? 'border-purple-500/50 bg-purple-500/20' : 'border-white/10 bg-black/40'
                  }`}>
                    {/* Placeholder for Zodiac Symbol Icon */}
                    <span className="text-[10px] uppercase font-bold">{sign.substring(0,2)}</span>
                  </div>
                  <span className="text-sm font-medium">{sign}</span>
                </div>
                {selectedZodiac === sign && activeTab === 'daily' && (
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_6px_rgba(192,132,252,1)]" />
                )}
              </button>
            ))}
          </div>
        </aside>
      </div>

      {/* Bottom Status Bar */}
      <footer className="h-8 bg-black border-t border-white/5 px-6 flex items-center justify-between text-[10px] text-slate-600 flex-shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-[pulse_2s_ease-in-out_infinite]" />
            <span className="font-medium">CONNECTED TO ASTRAL-DB</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 uppercase">
             <span className="opacity-50">SYNC QOS</span> <span className="text-slate-400 text-purple-400/80">OPTIMAL</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:block">ORACLE_ENGINE_v4.2</span>
          <span className="text-slate-400 font-mono">{(new Date()).toISOString().substring(11, 19)} UTC</span>
        </div>
      </footer>
    </div>
  );
}

