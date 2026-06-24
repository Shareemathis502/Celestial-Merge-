import React, { useState, useEffect } from 'react';
import { MoonPhaseGraphic } from './MoonPhaseGraphic';
import { getMoonPhaseCalendar, MoonPhaseEvent } from '../services/astrologyService';

export function MoonPhaseCalendar() {
  const [events, setEvents] = useState<MoonPhaseEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const currentDate = new Date();
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const currentMonth = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  useEffect(() => {
    let active = true;
    setLoading(true);

    getMoonPhaseCalendar(currentMonth, currentYear)
      .then(data => {
        if (active) {
          setEvents(data);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error(err);
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, [currentMonth, currentYear]);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <header className="mb-6 flex-shrink-0 flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-light text-white">Lunar Calendar</h2>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">{currentMonth} {currentYear} Celestial Events</p>
        </div>
      </header>

      <div className="flex-1 bg-[#121212] border border-white/5 rounded-2xl overflow-y-auto p-6 relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
        
        {loading ? (
          <div className="w-full h-full flex flex-col items-center justify-center relative z-10">
            <div className="w-48 h-48 rounded-full border border-purple-500/30 animate-[spin_10s_linear_infinite] relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-slate-200 rounded-full animate-pulse shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
            </div>
            <p className="mt-8 text-xs text-slate-400 uppercase tracking-widest animate-pulse">Charting Lunar Movements...</p>
          </div>
        ) : (
          <div className="relative z-10 flex flex-col gap-6">
            {events.map((event, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-6 items-center md:items-start bg-black/40 border border-white/5 rounded-xl p-6 hover:bg-white/5 transition-colors group">
                {/* Graphic Side */}
                <div className="flex-shrink-0 w-32 h-32 flex flex-col items-center justify-center gap-2 bg-black/50 rounded-full border border-white/10 group-hover:border-purple-500/50 transition-colors">
                  <div className="scale-[1.5]">
                    <MoonPhaseGraphic phase={event.phase} />
                  </div>
                </div>

                {/* Content Side */}
                <div className="flex-1 text-center md:text-left flex flex-col justify-center">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                    <h3 className="text-xl text-white font-light">{event.phase}</h3>
                    <span className="text-xs font-mono px-3 py-1 bg-white/10 rounded-full text-slate-300 w-fit mx-auto md:mx-0 border border-white/5">{event.date}</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-purple-400">in {event.zodiacSign}</span>
                  </div>
                  <p className="text-sm text-slate-400 font-light leading-relaxed">
                    {event.significance}
                  </p>
                </div>
              </div>
            ))}

            {events.length === 0 && (
              <div className="text-center py-12 text-slate-500 font-light">
                Unable to chart lunar movements at this time.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
