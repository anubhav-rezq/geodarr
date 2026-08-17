import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HeroGISVisual } from '../components/home/HeroGISVisual';
import { GISMapCanvas } from '../components/gis/GISMapCanvas';
import { AIDetectionSuite } from '../components/detection/AIDetectionSuite';
import { SeverityBadge } from '../components/common/SeverityBadge';
import { PREDICTIVE_DATA_FACTORS } from '../data/mockData';
import { 
  ArrowRight, 
  Layers, 
  MapPin, 
  Cpu, 
  ScanEye, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  CloudRain, 
  Truck, 
  Mountain, 
  Clock, 
  ShieldAlert, 
  Sparkles, 
  Radio, 
  Database,
  Smartphone,
  Plane,
  Satellite,
  Compass,
  ArrowDown
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigateTo, markers, selectReportById } = useApp();
  const [selectedMapMarkerId, setSelectedMapMarkerId] = useState<string | null>('GD-28491');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('ALL');

  const filteredMarkers = activeCategoryFilter === 'ALL'
    ? markers
    : markers.filter((m) => m.category === activeCategoryFilter);

  const selectedMarker = (markers && markers.length > 0)
    ? (markers.find((m) => m.reportId === selectedMapMarkerId) || markers[0])
    : null;

  const howItWorksSteps = [
    {
      step: '01',
      title: 'COLLECT',
      desc: 'Aggregates spatial telemetry from citizen apps, patrol cameras, drones, and satellite radar.'
    },
    {
      step: '02',
      title: 'DETECT',
      desc: 'Neural vision models classify structural damage, dimensions, and crack morphologies.'
    },
    {
      step: '03',
      title: 'ANALYZE',
      desc: 'Synthesizes physical severity with live rainfall, traffic PCU loads, and drainage slopes.'
    },
    {
      step: '04',
      title: 'PREDICT',
      desc: 'Forecasts 30-day degradation trajectories and structural failure probabilities.'
    },
    {
      step: '05',
      title: 'ACT',
      desc: 'Generates composite priority queues and automates field engineering dispatch.'
    }
  ];

  const dataSources = [
    { name: 'Smartphones', icon: Smartphone },
    { name: 'GPS Telemetry', icon: Compass },
    { name: 'Drones', icon: Plane },
    { name: 'Satellites', icon: Satellite },
    { name: 'Weather Radar', icon: CloudRain },
    { name: 'Traffic (PCU)', icon: Truck },
    { name: 'Terrain', icon: Mountain },
    { name: 'Asset History', icon: Database }
  ];

  return (
    <div className="w-full bg-[#F7F7FF] text-[#17172A] space-y-16 lg:space-y-20 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 lg:pt-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Hero Text Column */}
          <div className="lg:col-span-6 space-y-6">
            {/* Government Association Pill */}
            <div className="inline-flex items-center gap-2 bg-[#ECEBFC] border border-[#C5C0EF] px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] text-[#27187E]">
              <span className="w-2 h-2 rounded-full bg-[#27187E] animate-pulse" />
              <span>In association with the Government</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#17172A] leading-[1.06]">
              SEE INFRASTRUCTURE <br className="hidden sm:inline" />
              <span className="text-[#27187E]">BEFORE IT FAILS.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#64647A] leading-relaxed max-w-xl font-medium">
              Geodar combines AI, geospatial intelligence, and municipal data to detect infrastructure risks, prioritize urgent repairs, and predict structural failure.
            </p>

            <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => navigateTo('/platform')}
                className="px-6 py-3.5 bg-[#27187E] hover:bg-[#35248F] active:bg-[#1B105A] text-white font-bold text-xs uppercase tracking-widest rounded-sm shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span>Explore Platform</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigateTo('/map')}
                className="px-6 py-3.5 bg-white hover:bg-[#ECEBFC] text-[#27187E] border border-[#27187E] font-bold text-xs uppercase tracking-widest rounded-sm shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <MapPin className="w-4 h-4 text-[#7567C7]" />
                <span>Intelligence Map</span>
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-5 grid grid-cols-3 gap-4 border-t border-[#E5E4F0]">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-[#17172A] font-mono">96.4%</div>
                <div className="text-[10px] uppercase tracking-wider text-[#64647A] font-bold mt-0.5">Vision Precision</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-[#27187E] font-mono">30 Days</div>
                <div className="text-[10px] uppercase tracking-wider text-[#64647A] font-bold mt-0.5">Predictive Window</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono">Real-Time</div>
                <div className="text-[10px] uppercase tracking-wider text-[#64647A] font-bold mt-0.5">Priority Triage</div>
              </div>
            </div>
          </div>

          {/* Right Hero GIS Visual Column */}
          <div className="lg:col-span-6">
            <HeroGISVisual />
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM VS GEODAR SOLUTION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-sm border border-[#E5E4F0] p-6 sm:p-10 shadow-sm space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#27187E] bg-[#ECEBFC] px-3 py-1 rounded-sm">
              Paradigm Shift
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#17172A] tracking-tight">
              From Reactive Repairs to Predictive Intelligence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Legacy Broken Loop */}
            <div className="bg-[#FFF5F5] border border-red-200 rounded-sm p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2 text-red-700 font-bold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Traditional Reactive Model</span>
              </div>
              <div className="space-y-2.5">
                <div className="bg-white p-3 rounded-sm border border-red-100 font-bold text-xs text-[#17172A] flex items-center justify-between">
                  <span>1. Fragmented Complaints</span>
                  <span className="text-red-600 text-[10px] uppercase font-bold">Manual Calls</span>
                </div>
                <div className="bg-white p-3 rounded-sm border border-red-100 font-bold text-xs text-[#17172A] flex items-center justify-between">
                  <span>2. Slow Field Audits</span>
                  <span className="text-red-600 text-[10px] uppercase font-bold">Unverified</span>
                </div>
                <div className="bg-white p-3 rounded-sm border border-red-100 font-bold text-xs text-[#17172A] flex items-center justify-between">
                  <span>3. Delayed Dispatch</span>
                  <span className="text-red-600 text-[10px] uppercase font-bold">Weeks Later</span>
                </div>
                <div className="bg-white p-3 rounded-sm border border-red-200 font-black text-xs text-red-700 flex items-center justify-between">
                  <span>4. Catastrophic Breakdown</span>
                  <span className="text-[10px] uppercase font-bold bg-red-100 px-2 py-0.5 rounded-sm">High Cost</span>
                </div>
              </div>
            </div>

            {/* Geodar Predictive Loop */}
            <div className="bg-[#ECEBFC] border border-[#A9A0E2] rounded-sm p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2 text-[#27187E] font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#4937A3] shrink-0" />
                <span>GEODAR Predictive Model</span>
              </div>
              <div className="space-y-2.5">
                <div className="bg-white p-3 rounded-sm border border-[#C5C0EF] font-bold text-xs text-[#17172A] flex items-center justify-between">
                  <span>1. Multi-Source Ingestion</span>
                  <span className="text-[#27187E] text-[10px] uppercase font-bold">Continuous</span>
                </div>
                <div className="bg-white p-3 rounded-sm border border-[#C5C0EF] font-bold text-xs text-[#17172A] flex items-center justify-between">
                  <span>2. AI Vision Detection</span>
                  <span className="text-[#27187E] text-[10px] uppercase font-bold">96.4% Precision</span>
                </div>
                <div className="bg-white p-3 rounded-sm border border-[#C5C0EF] font-bold text-xs text-[#17172A] flex items-center justify-between">
                  <span>3. Multi-Factor Risk Score</span>
                  <span className="text-[#27187E] text-[10px] uppercase font-bold">Weather + Traffic</span>
                </div>
                <div className="bg-[#27187E] p-3 rounded-sm border border-[#1B105A] font-bold text-xs text-white flex items-center justify-between shadow-sm">
                  <span>4. Preemptive Engineering</span>
                  <span className="text-[10px] uppercase font-bold bg-white/20 text-white px-2 py-0.5 rounded-sm">Optimal Cost</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (5 STEPS & DATA SOURCES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#27187E] bg-[#ECEBFC] px-3 py-1 rounded-sm">
            Pipeline
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#17172A] tracking-tight">
            How Geodar Operates
          </h2>
          <p className="text-xs sm:text-sm text-[#64647A] font-medium">
            From raw field observations to predictive risk prioritization.
          </p>
        </div>

        {/* 5-Step Process Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {howItWorksSteps.map((item) => (
            <div
              key={item.step}
              className="bg-white p-4 sm:p-5 rounded-sm border border-[#E5E4F0] hover:border-[#8E82D5] transition-all shadow-sm flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xl font-black text-[#27187E] block">
                  {item.step}
                </span>
                <h3 className="text-xs font-bold text-[#17172A] mt-1.5 uppercase tracking-wider">
                  {item.title}
                </h3>
                <p className="text-xs text-[#64647A] mt-1.5 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 8 Data Sources Strip */}
        <div className="bg-[#1B105A] rounded-sm p-5 sm:p-6 text-white space-y-3 shadow-md border border-[#35248F]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-[#35248F]">
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#DEDDF7]">
              Multi-Source Telemetry Ingestion
            </h3>
            <span className="text-[10px] font-bold text-[#A9A0E2] uppercase tracking-wider">Continuous Real-Time Feed</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {dataSources.map((source) => {
              const Icon = source.icon;
              return (
                <div
                  key={source.name}
                  className="bg-[#27187E]/70 border border-[#4937A3] p-2.5 rounded-sm flex flex-col items-center justify-center text-center gap-1.5 hover:bg-[#35248F] transition-colors"
                >
                  <Icon className="w-4 h-4 text-[#C5C0EF]" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#ECEBFC]">{source.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. INTELLIGENCE MAP PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#27187E] bg-[#ECEBFC] px-3 py-1 rounded-sm">
              Live Map Grid
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#17172A] mt-2 tracking-tight">
              Intelligence Map Preview
            </h2>
            <p className="text-xs sm:text-sm text-[#64647A] mt-1 font-medium">
              Spatial telemetry across Raipur, Chhattisgarh. Click any marker to inspect.
            </p>
          </div>
          <button
            onClick={() => navigateTo('/map')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#27187E] hover:text-[#1B105A] bg-white border border-[#27187E] hover:bg-[#ECEBFC] px-4 py-2 rounded-sm shadow-sm transition-all"
          >
            <span>Open Intelligence Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Filter chips bar */}
        <div className="flex flex-wrap items-center gap-2">
          {['ALL', 'Pothole', 'Waterlogging', 'Bridge Damage', 'Road Crack', 'Drainage'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategoryFilter(cat)}
              className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-sm border transition-colors ${
                activeCategoryFilter === cat
                  ? 'bg-[#27187E] text-white border-[#27187E]'
                  : 'bg-white text-[#17172A] border-[#E5E4F0] hover:bg-[#F7F7FF]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Interactive Map & Selected Incident Card Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          <div className="lg:col-span-8">
            <GISMapCanvas
              markers={filteredMarkers}
              selectedMarkerId={selectedMapMarkerId}
              onSelectMarker={(m) => setSelectedMapMarkerId(m.reportId)}
              heightClass="h-[420px]"
            />
          </div>

          {/* Selected Incident Inspector Card */}
          <div className="lg:col-span-4 bg-white rounded-sm border border-[#E5E4F0] p-5 shadow-sm flex flex-col justify-between space-y-4">
            {selectedMarker ? (
              <>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black text-[#27187E]">{selectedMarker.reportId}</span>
                    <SeverityBadge level={selectedMarker.severityLevel} score={selectedMarker.severityScore} size="sm" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#17172A] leading-tight">
                      {selectedMarker.title}
                    </h3>
                    <p className="text-xs text-[#64647A] mt-1 flex items-center gap-1 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#8E82D5] shrink-0" />
                      <span>{selectedMarker.locationText}</span>
                    </p>
                  </div>

                  <div className="rounded-sm overflow-hidden border border-[#E5E4F0] h-32 bg-[#ECEBFC]">
                    {selectedMarker.imageUrl ? (
                      <img
                        src={selectedMarker.imageUrl}
                        alt={selectedMarker.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-[#8E82D5] font-bold">
                        GIS Sensor Feed
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <div className="bg-[#F7F7FF] p-2 rounded-sm border border-[#E5E4F0]">
                      <span className="text-[10px] font-bold text-[#64647A] uppercase tracking-wider block">Priority</span>
                      <span className="font-mono font-bold text-xs text-[#27187E]">{selectedMarker.priorityScore}/100</span>
                    </div>
                    <div className="bg-[#F7F7FF] p-2 rounded-sm border border-[#E5E4F0]">
                      <span className="text-[10px] font-bold text-[#64647A] uppercase tracking-wider block">AI Confidence</span>
                      <span className="font-mono font-bold text-xs text-emerald-600">{selectedMarker.aiConfidence}%</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E5E4F0]">
                  <button
                    onClick={() => selectReportById(selectedMarker.reportId)}
                    className="w-full py-2 bg-[#27187E] hover:bg-[#35248F] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>Inspect Report</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="p-8 text-center text-xs text-[#64647A] font-medium flex flex-col items-center justify-center h-full">
                <MapPin className="w-8 h-8 text-[#8E82D5] mb-2 animate-bounce" />
                <span>Select a telemetry marker on the map to inspect details</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. AI DETECTION PREVIEW SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
        <div className="text-center max-w-xl mx-auto space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#27187E] bg-[#ECEBFC] px-3 py-1 rounded-sm">
            Neural Vision
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#17172A] tracking-tight">
            AI Damage Detection Simulator
          </h2>
          <p className="text-xs sm:text-sm text-[#64647A] font-medium">
            Test how Geodar calculates visual damage, contextual risk, and composite priority.
          </p>
        </div>

        <AIDetectionSuite compact={true} onAnalyzeSuccess={(id) => selectReportById(id)} />
      </section>

      {/* 6. PREDICTIVE INTELLIGENCE PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1B105A] rounded-sm p-6 sm:p-10 text-white space-y-6 shadow-md border border-[#35248F]">
          <div className="max-w-2xl space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A9A0E2] bg-[#27187E] px-3 py-1 rounded-sm border border-[#5D4CB7]">
              Risk Engine
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Multi-Factor Risk Prediction Pipeline
            </h2>
            <p className="text-xs sm:text-sm text-[#C5C0EF] leading-relaxed font-medium">
              Correlating environmental stress factors to calculate failure likelihood before structural breakdown.
            </p>
          </div>

          {/* Visual Synthesis Diagram */}
          <div className="bg-[#141427] border border-[#35248F] rounded-sm p-4 sm:p-5">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-center">
              {['Rainfall', 'Traffic', 'Terrain', 'Road Age', 'Drainage', 'Damage'].map((input) => (
                <div key={input} className="bg-[#1B105A] p-2 rounded-sm border border-[#4937A3] text-[11px] font-bold uppercase tracking-wider text-[#DEDDF7]">
                  {input}
                </div>
              ))}
            </div>
            <div className="py-3 text-center text-[#8E82D5] font-bold text-sm flex items-center justify-center gap-2">
              <span>&darr;</span>
              <span className="font-mono text-[10px] font-bold text-[#A9A0E2] uppercase tracking-[0.2em] bg-[#27187E] px-3 py-0.5 rounded-sm border border-[#5D4CB7]">
                GEODAR AI SYNTHESIS
              </span>
              <span>&darr;</span>
            </div>
            <div className="text-center">
              <span className="font-mono font-black text-[11px] tracking-wider uppercase bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-1.5 rounded-sm shadow inline-block border border-red-400/30">
                PRIORITIZED ACTION MATRIX
              </span>
            </div>
          </div>

          {/* Example Prediction Case Card */}
          <div className="bg-[#141427] border border-[#4937A3] rounded-sm p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-4 text-center lg:text-left space-y-1.5 border-b lg:border-b-0 lg:border-r border-[#35248F] pb-5 lg:pb-0 lg:pr-5">
              <span className="text-[10px] font-bold text-[#A9A0E2] uppercase tracking-[0.15em] block">
                FAILURE PROBABILITY (30 DAYS)
              </span>
              <div className="text-4xl font-black font-mono text-red-400">73%</div>
              <p className="text-xs text-[#ECEBFC] font-medium">
                GE Road Sector (Pandri - Raipur)
              </p>
              <div className="pt-1">
                <span className="inline-block px-2.5 py-0.5 rounded-sm bg-red-500/20 text-red-300 text-[10px] font-bold uppercase tracking-wider border border-red-500/40">
                  Preemptive Dispatch Recommended
                </span>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-2.5">
              <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#A9A0E2]">
                Key Contributing Factors
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {PREDICTIVE_DATA_FACTORS.slice(0, 4).map((f) => (
                  <div key={f.factor} className="bg-[#1B105A] p-2.5 rounded-sm border border-[#35248F] flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white block">{f.factor}</span>
                      <span className="text-[10px] text-[#A9A0E2] font-medium">{f.value}</span>
                    </div>
                    <span className="font-mono text-xs font-black text-orange-400">{f.impact}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-sm border border-[#E5E4F0] p-6 sm:p-10 text-center space-y-4 shadow-sm">
          <div className="max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#27187E] bg-[#ECEBFC] px-3 py-1 rounded-sm">
              Urban Resilience
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#17172A] tracking-tight">
              Ready to Upgrade Infrastructure Intelligence?
            </h2>
            <p className="text-xs sm:text-sm text-[#64647A] font-medium">
              Equip urban local bodies and engineers with actionable geospatial AI.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
            <button
              onClick={() => navigateTo('/platform')}
              className="w-full sm:w-auto px-6 py-3 bg-[#27187E] hover:bg-[#35248F] text-white font-bold text-xs uppercase tracking-widest rounded-sm shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Platform</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => navigateTo('/dashboard')}
              className="w-full sm:w-auto px-6 py-3 bg-[#F7F7FF] hover:bg-[#ECEBFC] text-[#27187E] border border-[#27187E] font-bold text-xs uppercase tracking-widest rounded-sm transition-colors shadow-sm"
            >
              Command Center
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
