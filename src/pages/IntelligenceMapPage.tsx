import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GISMapCanvas } from '../components/gis/GISMapCanvas';
import { SeverityBadge } from '../components/common/SeverityBadge';
import { INFRASTRUCTURE_ASSETS } from '../data/mockData';
import { 
  Filter, 
  MapPin, 
  Layers, 
  ShieldAlert, 
  Activity, 
  Calendar, 
  Search, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  BarChart3, 
  Sparkles, 
  SlidersHorizontal,
  RefreshCw,
  Eye,
  Camera,
  Satellite,
  Compass
} from 'lucide-react';

export const IntelligenceMapPage: React.FC = () => {
  const { markers, selectedReportId, selectReportById, reports, activeMapFilter, setActiveMapFilter } = useApp();

  const [selectedIncidentId, setSelectedIncidentId] = useState<string>(selectedReportId || 'GD-28491');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAssetId, setSelectedAssetId] = useState('ASSET-RPR-01');

  // Filter markers
  const filteredMarkers = markers.filter((m) => {
    if (activeMapFilter.severity !== 'ALL' && m.severityLevel !== activeMapFilter.severity) {
      return false;
    }
    if (activeMapFilter.category !== 'ALL' && m.category !== activeMapFilter.category) {
      return false;
    }
    if (activeMapFilter.source !== 'ALL' && !m.source.toLowerCase().includes(activeMapFilter.source.toLowerCase())) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const match = m.title.toLowerCase().includes(q) ||
                    m.locationText.toLowerCase().includes(q) ||
                    m.reportId.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const currentSelectedMarker = (markers && markers.length > 0)
    ? (markers.find((m) => m.reportId === selectedIncidentId) || markers[0])
    : null;
  const currentSelectedReport = (reports && reports.length > 0)
    ? (reports.find((r) => r.id === selectedIncidentId) || reports[0])
    : null;
  const currentAsset = INFRASTRUCTURE_ASSETS.find((a) => a.id === selectedAssetId) || INFRASTRUCTURE_ASSETS[0];

  const resetFilters = () => {
    setActiveMapFilter({
      severity: 'ALL',
      category: 'ALL',
      riskZone: 'ALL',
      source: 'ALL'
    });
    setSearchQuery('');
  };

  return (
    <div className="w-full bg-[#F7F7FF] min-h-[calc(100vh-4rem)] p-3 sm:p-6 lg:p-8 space-y-5">
      {/* Top Banner / GIS Header */}
      <div className="bg-white rounded-sm border border-[#E5E4F0] p-4 sm:p-5 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#27187E] bg-[#ECEBFC] px-2.5 py-0.5 rounded-sm">
              Raipur Municipal GIS Sector &bull; Live Telemetry
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#17172A] mt-1.5 tracking-tight">
            Infrastructure Intelligence Map
          </h1>
        </div>

        {/* Global search & reset */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-[#8E82D5] absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ward, street, ID..."
              className="w-full pl-9 pr-3 py-1.5 bg-[#F7F7FF] border border-[#E5E4F0] rounded-sm text-xs font-mono text-[#17172A] focus:outline-none focus:ring-2 focus:ring-[#27187E]"
            />
          </div>

          <button
            onClick={resetFilters}
            className="px-3 py-1.5 bg-white hover:bg-[#ECEBFC] border border-[#E5E4F0] rounded-sm text-xs font-bold uppercase tracking-wider text-[#27187E] flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* 3-Column GIS Command Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Multi-Dimensional Filter Sidebar (3 cols) */}
        <div className="lg:col-span-3 bg-white rounded-sm border border-[#E5E4F0] p-4 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2.5 border-b border-[#E5E4F0]">
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#17172A] flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[#27187E]" />
              <span>Spatial Filters</span>
            </h3>
            <span className="text-[10px] font-mono font-black text-[#27187E] bg-[#ECEBFC] px-2 py-0.5 rounded-sm">
              {filteredMarkers.length} NODES
            </span>
          </div>

          {/* Severity Filter */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-[#64647A] uppercase tracking-wider block">
              Severity Level
            </label>
            <div className="grid grid-cols-2 gap-1">
              {['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setActiveMapFilter({ ...activeMapFilter, severity: lvl })}
                  className={`py-1 px-2 rounded-sm text-[11px] font-bold uppercase tracking-wider border transition-all text-center ${
                    activeMapFilter.severity === lvl
                      ? 'bg-[#27187E] text-white border-[#27187E] shadow-sm'
                      : 'bg-[#F7F7FF] text-[#17172A] border-[#E5E4F0] hover:bg-[#ECEBFC]'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Infrastructure Category Filter */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-[#64647A] uppercase tracking-wider block">
              Infrastructure Type
            </label>
            <select
              value={activeMapFilter.category}
              onChange={(e) => setActiveMapFilter({ ...activeMapFilter, category: e.target.value })}
              className="w-full px-2.5 py-1.5 bg-[#F7F7FF] border border-[#E5E4F0] rounded-sm text-xs font-bold uppercase tracking-wider text-[#17172A] focus:outline-none focus:ring-2 focus:ring-[#27187E]"
            >
              <option value="ALL">All Categories</option>
              <option value="Pothole">Pothole</option>
              <option value="Road Damage">Road Damage</option>
              <option value="Waterlogging">Waterlogging</option>
              <option value="Drainage">Drainage</option>
              <option value="Bridge Damage">Bridge Damage</option>
              <option value="Street Infrastructure">Street Infrastructure</option>
            </select>
          </div>

          {/* Data Source Filter */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-[#64647A] uppercase tracking-wider block">
              Telemetry Source
            </label>
            <div className="space-y-0.5 text-xs">
              {[
                { id: 'ALL', label: 'All Telemetry Feeds' },
                { id: 'Citizen App', label: 'Citizen Reports' },
                { id: 'IoT Sensor', label: 'IoT Sensor Grids' },
                { id: 'Drone', label: 'Drone Photogrammetry' },
                { id: 'Satellite', label: 'Satellite InSAR' },
                { id: 'Patrol Camera', label: 'Patrol AI Cameras' }
              ].map((src) => (
                <button
                  key={src.id}
                  onClick={() => setActiveMapFilter({ ...activeMapFilter, source: src.id })}
                  className={`w-full text-left px-2.5 py-1 rounded-sm transition-colors flex items-center justify-between font-medium ${
                    activeMapFilter.source === src.id
                      ? 'bg-[#ECEBFC] text-[#27187E] font-bold'
                      : 'text-[#64647A] hover:bg-[#F7F7FF] hover:text-[#17172A]'
                  }`}
                >
                  <span>{src.label}</span>
                  {activeMapFilter.source === src.id && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#27187E]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Asset Health Fast Switcher */}
          <div className="pt-2.5 border-t border-[#E5E4F0] space-y-1.5">
            <label className="text-[10px] font-bold text-[#64647A] uppercase tracking-wider block">
              Major Municipal Arterials
            </label>
            <div className="space-y-1">
              {INFRASTRUCTURE_ASSETS.map((asset) => (
                <button
                  key={asset.id}
                  onClick={() => setSelectedAssetId(asset.id)}
                  className={`w-full text-left p-2 rounded-sm border text-xs transition-all ${
                    selectedAssetId === asset.id
                      ? 'bg-[#27187E] text-white border-[#27187E]'
                      : 'bg-[#F7F7FF] text-[#17172A] border-[#E5E4F0] hover:bg-[#ECEBFC]'
                  }`}
                >
                  <div className="font-bold truncate">{asset.name}</div>
                  <div className="flex items-center justify-between text-[10px] font-mono mt-0.5 opacity-90">
                    <span>Health: {asset.healthScore}/100</span>
                    <span className="font-bold">30d Risk: {asset.failureRiskNext30Days}%</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center Column: Full Interactive GIS Map Canvas (6 cols) */}
        <div className="lg:col-span-6 space-y-3">
          <GISMapCanvas
            markers={filteredMarkers}
            selectedMarkerId={selectedIncidentId}
            onSelectMarker={(m) => setSelectedIncidentId(m.reportId)}
            heightClass="h-[580px]"
            showControls={true}
          />

          <div className="bg-white p-2.5 rounded-sm border border-[#E5E4F0] flex items-center justify-between text-xs text-[#64647A]">
            <span className="flex items-center gap-1.5 font-medium">
              <Compass className="w-3.5 h-3.5 text-[#27187E]" />
              <span>Raipur (WGS84): 21.2514° N, 81.6296° E</span>
            </span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#27187E] bg-[#ECEBFC] px-2 py-0.5 rounded-sm">
              Live Simulation
            </span>
          </div>
        </div>

        {/* Right Column: Intelligence & Selected Asset Panel (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          {/* Selected Incident Card */}
          <div className="bg-white rounded-sm border border-[#E5E4F0] p-4 shadow-sm space-y-3">
            {currentSelectedMarker ? (
              <>
                <div className="flex items-center justify-between pb-2.5 border-b border-[#E5E4F0]">
                  <span className="font-mono text-xs font-black text-[#27187E]">
                    {currentSelectedMarker.reportId}
                  </span>
                  <SeverityBadge
                    level={currentSelectedMarker.severityLevel}
                    score={currentSelectedMarker.severityScore}
                    size="sm"
                  />
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#17172A] leading-tight">
                    {currentSelectedMarker.title}
                  </h3>
                  <p className="text-xs text-[#64647A] mt-0.5 flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#8E82D5] shrink-0" />
                    <span>{currentSelectedMarker.locationText}</span>
                  </p>
                </div>

                <div className="h-28 rounded-sm overflow-hidden border border-[#E5E4F0] bg-[#ECEBFC]">
                  {currentSelectedMarker.imageUrl ? (
                    <img
                      src={currentSelectedMarker.imageUrl}
                      alt={currentSelectedMarker.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-[#8E82D5] font-bold">
                      GIS Sensor Feed
                    </div>
                  )}
                </div>

                {/* Metrics Triad */}
                <div className="grid grid-cols-3 gap-1.5 text-center">
                  <div className="bg-[#F7F7FF] p-1.5 rounded-sm border border-[#E5E4F0]">
                    <span className="text-[9px] font-bold text-[#64647A] uppercase block">Visual</span>
                    <span className="font-mono font-bold text-xs text-[#17172A]">{currentSelectedMarker.severityScore}</span>
                  </div>
                  <div className="bg-[#ECEBFC] p-1.5 rounded-sm border border-[#C5C0EF]">
                    <span className="text-[9px] text-[#27187E] font-bold uppercase block">Priority</span>
                    <span className="font-mono font-bold text-xs text-[#27187E]">{currentSelectedMarker.priorityScore}</span>
                  </div>
                  <div className="bg-[#F7F7FF] p-1.5 rounded-sm border border-[#E5E4F0]">
                    <span className="text-[9px] font-bold text-[#64647A] uppercase block">AI Conf</span>
                    <span className="font-mono font-bold text-xs text-emerald-600">{currentSelectedMarker.aiConfidence}%</span>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-[#64647A] pt-1 font-medium">
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <strong className="text-[#17172A]">{currentSelectedMarker.status}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Source:</span>
                    <strong className="text-[#17172A]">{currentSelectedMarker.source}</strong>
                  </div>
                </div>

                <button
                  onClick={() => selectReportById(currentSelectedMarker.reportId)}
                  className="w-full py-2 bg-[#27187E] hover:bg-[#35248F] text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <span>Inspect Report</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            ) : (
              <div className="p-6 text-center text-xs text-[#64647A] font-medium">
                Select an incident pin on the map to inspect telemetry
              </div>
            )}
          </div>

          {/* Selected Corridor Asset Health Score */}
          <div className="bg-[#1B105A] text-white rounded-sm p-4 border border-[#35248F] shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#35248F]">
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#A9A0E2]">
                Corridor Health
              </span>
              <span className="text-[10px] bg-[#27187E] px-2 py-0.5 rounded-sm font-mono text-cyan-300 font-bold">
                {currentAsset.id}
              </span>
            </div>

            <div>
              <h4 className="text-xs font-bold text-white leading-tight">{currentAsset.name}</h4>
              <p className="text-[10px] text-[#C5C0EF] mt-0.5 font-medium">{currentAsset.type}</p>
            </div>

            {/* Health Score Gauge */}
            <div className="bg-[#141427] p-2.5 rounded-sm border border-[#4937A3] space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#E5E4F0] font-medium text-[11px]">Asset Health</span>
                <span className="font-mono font-black text-emerald-400 text-xs">{currentAsset.healthScore}/100</span>
              </div>
              <div className="w-full bg-[#1B105A] h-1.5 rounded-sm overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-sm"
                  style={{ width: `${currentAsset.healthScore}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-[#E5E4F0] font-medium text-[11px]">30d Risk</span>
                <span className="font-mono font-black text-red-400 text-xs">{currentAsset.failureRiskNext30Days}%</span>
              </div>
              <div className="w-full bg-[#1B105A] h-1.5 rounded-sm overflow-hidden">
                <div
                  className="h-full bg-red-500 rounded-sm"
                  style={{ width: `${currentAsset.failureRiskNext30Days}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
