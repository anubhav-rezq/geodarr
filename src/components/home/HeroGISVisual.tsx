import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Activity, ShieldAlert, Cpu, Radio, Sparkles, Navigation } from 'lucide-react';

export const HeroGISVisual: React.FC = () => {
  const { navigateTo } = useApp();
  const [activePulseNode, setActivePulseNode] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePulseNode((prev) => (prev % 4) + 1);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] max-w-xl mx-auto rounded-md bg-[#141427] border border-[#35248F]/40 overflow-hidden shadow-2xl shadow-[#27187E]/15 select-none">
      {/* Dynamic Grid Background */}
      <svg className="w-full h-full" viewBox="0 0 600 450" fill="none">
        <defs>
          <pattern id="heroGrid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="rgba(142, 130, 213, 0.09)" strokeWidth="0.8" />
          </pattern>
          <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#27187E" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1B105A" stopOpacity="0.8" />
          </linearGradient>
          <radialGradient id="nodeRadar" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8E82D5" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#27187E" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Base Grid */}
        <rect width="600" height="450" fill="#141427" />
        <rect width="600" height="450" fill="url(#heroGrid)" />

        {/* Abstract Isometric / Top-Down Urban GIS Road Network */}
        {/* Ring bypass */}
        <path
          d="M 50 120 C 180 80 420 90 550 160"
          stroke="#4937A3"
          strokeWidth="6"
          strokeLinecap="round"
          strokeOpacity="0.7"
        />
        <path
          d="M 50 120 C 180 80 420 90 550 160"
          stroke="#8E82D5"
          strokeWidth="1.5"
          strokeDasharray="6 4"
        />

        {/* Arterial 1 */}
        <path
          d="M 80 380 L 220 280 L 380 220 L 520 180"
          stroke="#35248F"
          strokeWidth="8"
          strokeLinecap="round"
          strokeOpacity="0.8"
        />
        <path
          d="M 80 380 L 220 280 L 380 220 L 520 180"
          stroke="#C5C0EF"
          strokeWidth="1.8"
          strokeDasharray="8 6"
        />

        {/* Arterial 2 & Crossings */}
        <path d="M 280 60 L 340 240 L 400 400" stroke="#4937A3" strokeWidth="5" strokeOpacity="0.6" />
        <path d="M 160 160 L 480 340" stroke="#27187E" strokeWidth="4" strokeOpacity="0.5" />
        <path d="M 120 280 L 460 120" stroke="#27187E" strokeWidth="3" strokeOpacity="0.4" />

        {/* Abstract Risk Polygon (Zone 1) */}
        <polygon
          points="310,180 420,190 440,280 330,270"
          fill="#DC2626"
          fillOpacity="0.12"
          stroke="#DC2626"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />

        {/* Abstract Risk Polygon (Zone 2) */}
        <polygon
          points="180,240 270,230 290,310 190,320"
          fill="#F97316"
          fillOpacity="0.1"
          stroke="#F97316"
          strokeWidth="1.2"
          strokeDasharray="3 3"
        />

        {/* Interactive Infrastructure Nodes */}
        {/* Node 1: Pothole Risk Cluster */}
        <g transform="translate(220, 280)" className="cursor-pointer" onClick={() => navigateTo('/map')}>
          <circle cx="0" cy="0" r="28" fill="url(#nodeRadar)" className="animate-pulse-slow" />
          <circle cx="0" cy="0" r="14" fill="#F97316" fillOpacity="0.25" />
          <circle cx="0" cy="0" r="6" fill="#F97316" stroke="#FFFFFF" strokeWidth="2" />
        </g>

        {/* Node 2: Waterlogging Risk Sump */}
        <g transform="translate(380, 220)" className="cursor-pointer" onClick={() => navigateTo('/map')}>
          <circle cx="0" cy="0" r="32" fill="url(#nodeRadar)" className="animate-pulse-slow" />
          <circle cx="0" cy="0" r="16" fill="#DC2626" fillOpacity="0.25" />
          <circle cx="0" cy="0" r="7" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2" />
        </g>

        {/* Node 3: Structural Flyover Joint */}
        <g transform="translate(480, 160)" className="cursor-pointer" onClick={() => navigateTo('/map')}>
          <circle cx="0" cy="0" r="12" fill="#F59E0B" fillOpacity="0.25" />
          <circle cx="0" cy="0" r="5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1.5" />
        </g>

        {/* Node 4: Autonomous Sensor */}
        <g transform="translate(140, 120)" className="cursor-pointer" onClick={() => navigateTo('/map')}>
          <circle cx="0" cy="0" r="10" fill="#22C55E" fillOpacity="0.25" />
          <circle cx="0" cy="0" r="4" fill="#22C55E" stroke="#FFFFFF" strokeWidth="1.5" />
        </g>
      </svg>

      {/* Floating HUD Telemetry Badge 1 */}
      <div className="absolute top-4 left-4 bg-[#17172A]/90 backdrop-blur-md border border-[#4937A3]/60 rounded-sm p-3 shadow-xl max-w-[210px]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#A9A0E2]">Live Grid Telemetry</span>
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="text-xs text-[#E5E4F0]">Analyzed Nodes</span>
          <span className="font-mono text-xs font-bold text-white">4,812 / hr</span>
        </div>
        <div className="mt-1 flex items-baseline justify-between">
          <span className="text-xs text-[#E5E4F0]">Mean AI Conf</span>
          <span className="font-mono text-xs font-bold text-emerald-400">96.8%</span>
        </div>
      </div>

      {/* Floating HUD Telemetry Badge 2 (Selected Incident Callout) */}
      <div 
        onClick={() => navigateTo('/map')}
        className="absolute bottom-4 right-4 bg-[#1B105A]/95 hover:bg-[#27187E] cursor-pointer transition-all border border-[#7567C7]/50 rounded-sm p-3.5 shadow-2xl max-w-[240px] text-white"
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] font-bold text-[#A9A0E2]">GD-28491</span>
          <span className="px-2 py-0.5 rounded-sm bg-orange-500/20 text-orange-300 border border-orange-400/40 text-[9px] font-bold uppercase">
            HIGH &bull; 87/100
          </span>
        </div>
        <p className="text-xs font-bold text-white mt-1.5 leading-tight">
          Pothole Cluster (GE Road)
        </p>
        <p className="text-[11px] text-[#DEDDF7] mt-0.5 font-medium">
          Raipur, Chhattisgarh
        </p>
        <div className="mt-2.5 pt-2 border-t border-[#4937A3] flex items-center justify-between text-[10px] text-[#A9A0E2]">
          <span>AI Status: <strong className="text-white">Verified</strong></span>
          <span className="text-cyan-300 font-bold uppercase tracking-wider">Inspect &rarr;</span>
        </div>
      </div>

      {/* Floating Radar Scanning line indicator */}
      <div className="absolute top-3 right-4 flex items-center gap-2 bg-[#17172A]/90 px-3 py-1 rounded-sm border border-[#35248F]/50 text-[10px] font-bold uppercase tracking-wider text-[#DEDDF7]">
        <Radio className="w-3 h-3 text-[#A9A0E2] animate-pulse" />
        <span>InSAR Satellite Sync</span>
      </div>
    </div>
  );
};
