import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Scan, 
  Cpu, 
  BarChart3, 
  TrendingUp, 
  Eye, 
  Layers, 
  ArrowRight, 
  ShieldCheck, 
  MapPin, 
  CheckCircle2,
  Database,
  Radio,
  FileCheck,
  Zap,
  Activity
} from 'lucide-react';

export const PlatformPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [activePipelineStage, setActivePipelineStage] = useState(0);

  const capabilities = [
    {
      id: 'detect',
      icon: Scan,
      title: 'Detect',
      subtitle: 'Neural Damage Segmentation',
      desc: 'Edge computer vision processes camera frames and drone captures to classify micro-fissures, potholes, culvert blocks, and structural wear.',
      points: [
        'Multi-class failure segmentation',
        'Centimeter depth & area estimation',
        'Automated false-positive filter',
        'Edge device & phone optimization'
      ]
    },
    {
      id: 'analyze',
      icon: Cpu,
      title: 'Analyze',
      subtitle: 'Spatial Telemetry Synthesis',
      desc: 'Correlates raw damage observations with localized rainfall accumulation, municipal drainage topology, traffic PCU loads, and road age.',
      points: [
        'Multi-spectral GIS layer alignment',
        'Hydrodynamic flood correlation',
        'Axle traffic load modeling',
        'Asset lifecycle history tracking'
      ]
    },
    {
      id: 'prioritize',
      icon: BarChart3,
      title: 'Prioritize',
      subtitle: 'Dynamic Priority Scoring',
      desc: 'Normalizes incident urgency into a 0–100 Priority Score that balances visual severity with commuter exposure and repair economics.',
      points: [
        'Automated work-order routing',
        'Emergency route bottleneck weighting',
        'Department dispatch rules',
        'Material & cost estimation'
      ]
    },
    {
      id: 'predict',
      icon: TrendingUp,
      title: 'Predict',
      subtitle: 'Stochastic Risk Forecasting',
      desc: 'Predicts which road corridors, bridges, and stormwater drains face high probability of critical failure within a 14 to 60-day horizon.',
      points: [
        'Pre-monsoon vulnerability scoring',
        'Sub-base moisture modeling',
        'Pavement fatigue curve calculation',
        'Preemptive budget optimization'
      ]
    }
  ];

  const pipelineStages = [
    {
      label: 'OBSERVE',
      desc: 'Aggregates spatial feeds from citizen apps, patrol units, and satellite radar feeds.',
      badge: 'Step 1'
    },
    {
      label: 'DETECT',
      desc: 'Neural vision models classify infrastructure anomalies with 96.4% precision.',
      badge: 'Step 2'
    },
    {
      label: 'ANALYZE',
      desc: 'Calculates physical severity and correlates environmental drainage context.',
      badge: 'Step 3'
    },
    {
      label: 'RANK',
      desc: 'Generates composite priority indices for municipal engineering departments.',
      badge: 'Step 4'
    },
    {
      label: 'PREDICT',
      desc: 'Forecasts 30-day degradation trajectories and structural failure probabilities.',
      badge: 'Step 5'
    },
    {
      label: 'ACT',
      desc: 'Dispatches work crews with verified geo-coordinates, materials, and cost estimates.',
      badge: 'Step 6'
    }
  ];

  return (
    <div className="w-full bg-[#F7F7FF] text-[#17172A] space-y-16 lg:space-y-20 pb-16">
      {/* Header Banner */}
      <section className="bg-[#1B105A] text-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-[#35248F]">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#27187E] border border-[#5D4CB7] px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] text-[#DEDDF7]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>GeoAI Infrastructure Operating System</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white max-w-2xl">
            Geospatial Intelligence for Resilient Cities
          </h1>
          <p className="text-xs sm:text-sm text-[#C5C0EF] max-w-xl leading-relaxed font-medium">
            GEODAR unifies optical edge vision, municipal GIS data, and predictive risk algorithms into an end-to-end command architecture.
          </p>
        </div>
      </section>

      {/* Visual Pipeline: OBSERVE -> DETECT -> ANALYZE -> RANK -> PREDICT -> ACT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        <div className="text-center max-w-xl mx-auto space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#27187E] bg-[#ECEBFC] px-3 py-1 rounded-sm">
            Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#17172A] tracking-tight">
            The GEODAR Intelligence Loop
          </h2>
          <p className="text-xs sm:text-sm text-[#64647A] font-medium">
            Click any step to inspect the telemetry pipeline.
          </p>
        </div>

        {/* Pipeline Bar */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {pipelineStages.map((stage, idx) => (
            <button
              key={stage.label}
              onClick={() => setActivePipelineStage(idx)}
              className={`p-3.5 rounded-sm border text-left transition-all flex flex-col justify-between ${
                activePipelineStage === idx
                  ? 'bg-[#27187E] text-white border-[#27187E] shadow-sm'
                  : 'bg-white text-[#17172A] border-[#E5E4F0] hover:bg-[#ECEBFC]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded-sm ${
                  activePipelineStage === idx ? 'bg-white/20 text-white' : 'bg-[#F7F7FF] text-[#64647A]'
                }`}>
                  {stage.badge}
                </span>
                {idx < 5 && (
                  <ArrowRight className={`w-3.5 h-3.5 ${activePipelineStage === idx ? 'text-cyan-300' : 'text-[#8E82D5]'}`} />
                )}
              </div>
              <div className="mt-3">
                <span className="font-black text-xs uppercase tracking-wider block">{stage.label}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Stage Detail Card */}
        <div className="bg-white rounded-sm border border-[#E5E4F0] p-5 sm:p-6 shadow-sm space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E5E4F0]">
            <div>
              <span className="text-[10px] font-mono font-black text-[#27187E] uppercase tracking-wider">
                Stage {activePipelineStage + 1} of 6
              </span>
              <h3 className="text-xl font-black text-[#17172A] tracking-tight">
                {pipelineStages[activePipelineStage].label}
              </h3>
            </div>
            <span className="px-2.5 py-1 rounded-sm bg-[#ECEBFC] text-[#27187E] text-[10px] font-bold uppercase tracking-wider border border-[#C5C0EF]">
              Real-Time Execution
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#64647A] leading-relaxed font-medium">
            {pipelineStages[activePipelineStage].desc}
          </p>
        </div>
      </section>

      {/* Four Core Capabilities Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#27187E] bg-[#ECEBFC] px-3 py-1 rounded-sm">
            Core Modules
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#17172A] tracking-tight">
            Four Pillars of Urban Asset Management
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.id}
                className="bg-white rounded-sm border border-[#E5E4F0] p-6 hover:border-[#8E82D5] transition-all shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-sm bg-[#ECEBFC] border border-[#C5C0EF] flex items-center justify-center text-[#27187E]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#17172A] tracking-tight">{cap.title}</h3>
                    <p className="text-xs font-bold text-[#27187E] uppercase tracking-wider mt-0.5">
                      {cap.subtitle}
                    </p>
                  </div>
                  <p className="text-xs text-[#64647A] leading-relaxed font-medium">
                    {cap.desc}
                  </p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-[#E5E4F0]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#17172A] block">
                    Capabilities:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {cap.points.map((pt, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-[#64647A] font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1B105A] text-white rounded-sm p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-md border border-[#35248F]">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl font-black text-white tracking-tight">Experience Live Spatial Intelligence</h3>
            <p className="text-xs text-[#C5C0EF] font-medium">
              Inspect active incidents across Raipur, run simulated detections, and analyze risk scores.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => navigateTo('/map')}
              className="px-5 py-2.5 bg-[#27187E] hover:bg-[#35248F] text-white font-bold uppercase tracking-wider text-xs rounded-sm shadow-sm transition-all flex items-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Explore Map</span>
            </button>
            <button
              onClick={() => navigateTo('/ai-detection')}
              className="px-5 py-2.5 bg-white hover:bg-[#ECEBFC] text-[#27187E] font-bold uppercase tracking-wider text-xs rounded-sm transition-colors shadow-sm"
            >
              <span>Test AI Vision</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
