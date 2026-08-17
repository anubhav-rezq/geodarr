import React from 'react';
import { useApp } from '../context/AppContext';
import { AIDetectionSuite } from '../components/detection/AIDetectionSuite';
import { 
  Scan, 
  Sparkles, 
  Cpu, 
  ShieldCheck, 
  MapPin, 
  ArrowRight, 
  Info, 
  Layers,
  CheckCircle2
} from 'lucide-react';

export const AIDetectionPage: React.FC = () => {
  const { selectReportById } = useApp();

  return (
    <div className="w-full bg-[#F7F7FF] text-[#17172A] p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto pb-16">
      {/* Page Header */}
      <div className="bg-white rounded-sm border border-[#E5E4F0] p-5 sm:p-8 shadow-sm space-y-3">
        <div className="inline-flex items-center gap-2 bg-[#ECEBFC] border border-[#C5C0EF] px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] text-[#27187E]">
          <Sparkles className="w-3.5 h-3.5 text-[#4937A3]" />
          <span>Computer Vision &amp; Spatial Risk Scoring</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#17172A] tracking-tight">
          AI Infrastructure Detection Suite
        </h1>
        <p className="text-xs sm:text-sm text-[#64647A] max-w-2xl leading-relaxed font-medium">
          Upload ground-level photos, drone frames, or patrol imagery. GEODAR extracts structural features, evaluates environmental vulnerability, and produces normalized priority indices.
        </p>

        {/* 3 Metrics Callout */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-[#E5E4F0]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-[#ECEBFC] flex items-center justify-center text-[#27187E] shrink-0">
              <Scan className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#17172A]">Visual Severity</div>
              <div className="text-[11px] text-[#64647A] font-medium">Morphology &amp; Depth</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-[#ECEBFC] flex items-center justify-center text-[#27187E] shrink-0">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#17172A]">Contextual Risk</div>
              <div className="text-[11px] text-[#64647A] font-medium">Rainfall, Drainage &amp; Traffic</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-[#27187E] flex items-center justify-center text-white shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#27187E]">Final Priority</div>
              <div className="text-[11px] text-[#64647A] font-medium">Composite Action Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive AI Detection Suite */}
      <AIDetectionSuite compact={false} onAnalyzeSuccess={(id) => selectReportById(id)} />

      {/* Technical Methodology Box */}
      <div className="bg-[#1B105A] text-white rounded-sm p-5 sm:p-7 border border-[#35248F] shadow-md space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#A9A0E2]">
          <Info className="w-4 h-4 text-cyan-300" />
          <span>Tri-Factor Scoring Methodology</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#141427] p-4 rounded-sm border border-[#4937A3] space-y-1.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">1. Visual Severity (0–100)</h4>
            <p className="text-xs text-[#C5C0EF] leading-relaxed font-medium">
              Measures direct physical damage: diameter, cavity depth, fracture density, or displacement extracted from pixels.
            </p>
          </div>

          <div className="bg-[#141427] p-4 rounded-sm border border-[#4937A3] space-y-1.5">
            <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">2. Contextual Risk (0–100)</h4>
            <p className="text-xs text-[#C5C0EF] leading-relaxed font-medium">
              Synthesizes environmental hazards: localized rainfall rate, sub-base drainage slope, and vehicle axle loads.
            </p>
          </div>

          <div className="bg-[#27187E] p-4 rounded-sm border border-[#7567C7] space-y-1.5 shadow-sm">
            <h4 className="text-xs font-bold text-cyan-200 uppercase tracking-wider">3. Final Priority (0–100)</h4>
            <p className="text-xs text-[#ECEBFC] leading-relaxed font-medium">
              Normalized actionable score that determines work-order urgency and field engineering dispatch sequence.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
