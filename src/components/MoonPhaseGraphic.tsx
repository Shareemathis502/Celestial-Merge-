import React from 'react';

export function MoonPhaseGraphic({ phase }: { phase: string }) {
  const normPhase = phase.toLowerCase();
  
  let d = "";
  
  // A standard circle for reference
  // <path d="M 12 2 A 10 10 0 1 1 12 22 A 10 10 0 1 1 12 2 Z" />

  if (normPhase.includes('new')) {
    // New Moon: mostly dark
    d = "M 12 2 A 10 10 0 1 1 12 22 A 10 10 0 1 1 12 2 Z";
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-slate-800 border border-slate-700/50 rounded-full shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]">
        <circle cx="12" cy="12" r="10" />
      </svg>
    );
  } else if (normPhase.includes('full')) {
    // Full Moon: bright
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-indigo-100 drop-shadow-[0_0_10px_rgba(224,231,255,0.8)]">
        <circle cx="12" cy="12" r="10" />
      </svg>
    );
  } else if (normPhase.includes('waxing crescent')) {
    // Right sliver
    return (
      <svg viewBox="0 0 24 24" className="w-8 h-8 drop-shadow-[0_0_8px_rgba(224,231,255,0.4)]">
        <circle cx="12" cy="12" r="10" fill="#1e293b" />
        <path d="M 12 2 A 10 10 0 0 1 12 22 A 6 10 0 0 0 12 2 Z" fill="#e0e7ff" />
      </svg>
    );
  } else if (normPhase.includes('first quarter') || (normPhase.includes('waxing') && normPhase.includes('half'))) {
    // Right half
    return (
      <svg viewBox="0 0 24 24" className="w-8 h-8 drop-shadow-[0_0_8px_rgba(224,231,255,0.5)]">
         <circle cx="12" cy="12" r="10" fill="#1e293b" />
         <path d="M 12 2 A 10 10 0 0 1 12 22 L 12 2 Z" fill="#e0e7ff" />
      </svg>
    );
  } else if (normPhase.includes('waxing gibbous')) {
    // Most of right, some left
    return (
      <svg viewBox="0 0 24 24" className="w-8 h-8 drop-shadow-[0_0_8px_rgba(224,231,255,0.6)]">
        <circle cx="12" cy="12" r="10" fill="#1e293b" />
        <path d="M 12 2 A 10 10 0 0 1 12 22 A 6 10 0 0 1 12 2 Z" fill="#e0e7ff" />
      </svg>
    );
  } else if (normPhase.includes('waning gibbous')) {
    // Most of left, some right
    return (
      <svg viewBox="0 0 24 24" className="w-8 h-8 drop-shadow-[0_0_8px_rgba(224,231,255,0.6)]">
        <circle cx="12" cy="12" r="10" fill="#1e293b" />
        <path d="M 12 2 A 10 10 0 0 0 12 22 A 6 10 0 0 0 12 2 Z" fill="#e0e7ff" />
      </svg>
    );
  } else if (normPhase.includes('last quarter') || normPhase.includes('third quarter') || (normPhase.includes('waning') && normPhase.includes('half'))) {
    // Left half
    return (
      <svg viewBox="0 0 24 24" className="w-8 h-8 drop-shadow-[0_0_8px_rgba(224,231,255,0.5)]">
        <circle cx="12" cy="12" r="10" fill="#1e293b" />
        <path d="M 12 2 A 10 10 0 0 0 12 22 L 12 2 Z" fill="#e0e7ff" />
      </svg>
    );
  } else if (normPhase.includes('waning crescent')) {
    // Left sliver
    return (
      <svg viewBox="0 0 24 24" className="w-8 h-8 drop-shadow-[0_0_8px_rgba(224,231,255,0.4)]">
        <circle cx="12" cy="12" r="10" fill="#1e293b" />
        <path d="M 12 2 A 10 10 0 0 0 12 22 A 6 10 0 0 1 12 2 Z" fill="#e0e7ff" />
      </svg>
    );
  }

  // Fallback generic moon
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8 text-indigo-200 drop-shadow-[0_0_6px_rgba(199,210,254,0.6)]" fill="currentColor">
       <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
