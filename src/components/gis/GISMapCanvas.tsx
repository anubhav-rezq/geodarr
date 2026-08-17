import React, { useState, useRef } from 'react';
import { MapMarkerItem, SeverityLevel } from '../../types';
import { SeverityBadge } from '../common/SeverityBadge';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Layers, 
  Eye, 
  EyeOff, 
  MapPin, 
  Maximize2, 
  Compass, 
  SlidersHorizontal,
  Flame,
  Radio,
  Camera,
  Satellite
} from 'lucide-react';

interface GISMapCanvasProps {
  markers: MapMarkerItem[];
  selectedMarkerId?: string | null;
  onSelectMarker?: (marker: MapMarkerItem) => void;
  interactive?: boolean;
  heightClass?: string;
  showControls?: boolean;
  activeLayers?: {
    roads: boolean;
    riskZones: boolean;
    heatmap: boolean;
    sensors: boolean;
    satellite: boolean;
  };
}

export const GISMapCanvas: React.FC<GISMapCanvasProps> = ({
  markers,
  selectedMarkerId,
  onSelectMarker,
  interactive = true,
  heightClass = 'h-[580px]',
  showControls = true,
  activeLayers = {
    roads: true,
    riskZones: true,
    heatmap: false,
    sensors: true,
    satellite: false
  }
}) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredMarker, setHoveredMarker] = useState<MapMarkerItem | null>(null);
  const [mouseCoords, setMouseCoords] = useState({ lat: 21.2514, lng: 81.6296 });
  const [localLayers, setLocalLayers] = useState(activeLayers);
  const [showLayerMenu, setShowLayerMenu] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!interactive) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && interactive) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }

    // Calculate approximate geographical coordinates for mouse position
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width;
      const relY = (e.clientY - rect.top) / rect.height;
      const lat = 21.2850 - relY * 0.085;
      const lng = 81.5600 + relX * 0.140;
      setMouseCoords({
        lat: Number(lat.toFixed(4)),
        lng: Number(lng.toFixed(4))
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.75));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const getMarkerColor = (level: SeverityLevel) => {
    switch (level) {
      case 'CRITICAL': return '#DC2626';
      case 'HIGH': return '#F97316';
      case 'MEDIUM': return '#F59E0B';
      case 'LOW': default: return '#22C55E';
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${heightClass} bg-[#17172A] rounded-sm overflow-hidden border border-[#35248F]/40 select-none shadow-inner cursor-grab ${
        isDragging ? 'cursor-grabbing' : ''
      }`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Background Map Visual: Vector SVG of Raipur City Grid */}
      <div
        className="w-full h-full transition-transform duration-75 origin-center"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`
        }}
      >
        <svg
          viewBox="0 0 1000 700"
          className="w-full h-full"
          style={{
            backgroundColor: localLayers.satellite ? '#0D0D1B' : '#141427'
          }}
        >
          <defs>
            {/* GIS Grid Patterns */}
            <pattern id="gisMinorGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(142, 130, 213, 0.07)" strokeWidth="0.8" />
            </pattern>
            <pattern id="gisMajorGrid" width="100" height="100" patternUnits="userSpaceOnUse">
              <rect width="100" height="100" fill="url(#gisMinorGrid)" />
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(142, 130, 213, 0.15)" strokeWidth="1.2" />
            </pattern>

            {/* Heatmap Gradients */}
            <radialGradient id="heatCritical" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#DC2626" stopOpacity="0.55" />
              <stop offset="60%" stopColor="#F97316" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="heatHigh" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F97316" stopOpacity="0.45" />
              <stop offset="70%" stopColor="#F59E0B" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="radarPulse" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8E82D5" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#27187E" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Grid Background */}
          <rect width="1000" height="700" fill="url(#gisMajorGrid)" />

          {/* Water Bodies & Topography (Telibandha Lake / Kharun River Basin) */}
          <path
            d="M 50 650 Q 150 480 200 350 T 260 50"
            fill="none"
            stroke="#27187E"
            strokeWidth="18"
            strokeOpacity="0.35"
            strokeLinecap="round"
          />
          {/* Telibandha / Marine Drive Lake representation */}
          <ellipse cx="680" cy="420" rx="42" ry="26" fill="#27187E" fillOpacity="0.4" stroke="#4937A3" strokeWidth="2" />
          <text x="680" y="424" fill="#8E82D5" fontSize="9" textAnchor="middle" opacity="0.6">Telibandha Lake Basin</text>

          {/* Risk Zones Polygons */}
          {localLayers.riskZones && (
            <g id="risk-polygons">
              {/* Zone 1: High Inundation Basin */}
              <polygon
                points="620,380 740,390 750,480 640,490 600,430"
                fill="#DC2626"
                fillOpacity="0.08"
                stroke="#DC2626"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              <text x="670" y="465" fill="#DC2626" fontSize="9" fontWeight="bold" opacity="0.75">RISK ZONE 1 (INUNDATION)</text>

              {/* Zone 2: Commercial Arterial Corridor */}
              <polygon
                points="420,240 580,260 560,360 410,340"
                fill="#F97316"
                fillOpacity="0.07"
                stroke="#F97316"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              <text x="480" y="300" fill="#F97316" fontSize="9" fontWeight="bold" opacity="0.75">ZONE 2: FREIGHT CORRIDOR</text>

              {/* Zone 4: Western Bypass Flyover */}
              <polygon
                points="180,180 320,190 310,280 190,260"
                fill="#DC2626"
                fillOpacity="0.07"
                stroke="#DC2626"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              <text x="240" y="235" fill="#DC2626" fontSize="8.5" fontWeight="bold" opacity="0.75">ZONE 4 (RING RD FLYOVER)</text>
            </g>
          )}

          {/* Heatmap Layer if activated */}
          {localLayers.heatmap && (
            <g id="heatmap-layer">
              <circle cx="680" cy="406" r="95" fill="url(#heatCritical)" />
              <circle cx="240" cy="210" r="110" fill="url(#heatCritical)" />
              <circle cx="480" cy="294" r="80" fill="url(#heatHigh)" />
              <circle cx="760" cy="336" r="70" fill="url(#heatHigh)" />
              <circle cx="560" cy="252" r="65" fill="url(#heatHigh)" />
            </g>
          )}

          {/* Arterial Road Networks & Flyovers */}
          {localLayers.roads && (
            <g id="road-networks">
              {/* Ring Road 1 Bypass */}
              <path
                d="M 120 120 Q 300 160 500 140 T 880 200"
                fill="none"
                stroke="#4937A3"
                strokeWidth="7"
                strokeLinecap="round"
                opacity="0.8"
              />
              <path
                d="M 120 120 Q 300 160 500 140 T 880 200"
                fill="none"
                stroke="#7567C7"
                strokeWidth="1.5"
                strokeDasharray="8 6"
              />
              <text x="320" y="145" fill="#A9A0E2" fontSize="9" letterSpacing="0.1em" opacity="0.75">RING ROAD NO. 1</text>

              {/* GE Road Arterial (NH-53 Corridor) */}
              <path
                d="M 100 420 L 350 360 L 520 300 L 780 260 L 920 240"
                fill="none"
                stroke="#35248F"
                strokeWidth="9"
                strokeLinecap="round"
                opacity="0.9"
              />
              <path
                d="M 100 420 L 350 360 L 520 300 L 780 260 L 920 240"
                fill="none"
                stroke="#A9A0E2"
                strokeWidth="2"
                strokeDasharray="10 8"
              />
              <text x="430" y="340" fill="#ECEBFC" fontSize="10" fontWeight="bold" letterSpacing="0.15em">
                GE ROAD ARTERIAL (NH-53)
              </text>

              {/* Station Road to Pandri Connector */}
              <path
                d="M 450 620 L 520 480 L 520 300 L 580 180"
                fill="none"
                stroke="#4937A3"
                strokeWidth="6"
                strokeLinecap="round"
                opacity="0.75"
              />
              <text x="535" y="470" fill="#A9A0E2" fontSize="8.5" opacity="0.7">STATION ROAD</text>

              {/* VIP Road to Airport Corridor */}
              <path
                d="M 680 420 L 820 520 L 910 630"
                fill="none"
                stroke="#4937A3"
                strokeWidth="7"
                strokeLinecap="round"
                opacity="0.8"
              />
              <text x="760" y="490" fill="#A9A0E2" fontSize="9" opacity="0.75">VIP EXPRESSWAY</text>

              {/* Shankar Nagar & Devendra Nagar Secondary Streets */}
              <path d="M 380 240 L 760 380" fill="none" stroke="#27187E" strokeWidth="4" opacity="0.6" />
              <path d="M 280 500 L 640 540" fill="none" stroke="#27187E" strokeWidth="4" opacity="0.6" />
              <path d="M 620 200 L 780 440" fill="none" stroke="#27187E" strokeWidth="4" opacity="0.6" />

              {/* Railway Track Representation */}
              <path
                d="M 80 620 Q 300 580 500 520 T 920 440"
                fill="none"
                stroke="#64647A"
                strokeWidth="3.5"
                strokeDasharray="4 4"
                opacity="0.5"
              />
              <text x="260" y="585" fill="#64647A" fontSize="8">HOWRAH-MUMBAI TRUNK RAILWAY</text>
            </g>
          )}

          {/* Landmarks / Ward Labels */}
          <g id="ward-labels" opacity="0.75">
            <text x="480" y="270" fill="#DEDDF7" fontSize="9" fontWeight="600">Pandri Commercial</text>
            <text x="680" y="370" fill="#DEDDF7" fontSize="9" fontWeight="600">Telibandha</text>
            <text x="210" y="270" fill="#DEDDF7" fontSize="9" fontWeight="600">Tatibandh Junction</text>
            <text x="780" y="330" fill="#DEDDF7" fontSize="9" fontWeight="600">Shankar Nagar</text>
            <text x="560" y="220" fill="#DEDDF7" fontSize="9" fontWeight="600">Devendra Nagar</text>
            <text x="820" y="560" fill="#DEDDF7" fontSize="9" fontWeight="600">VIP Road / Airport</text>
          </g>

          {/* Live Radar Scan Ping */}
          <g transform="translate(480, 294)">
            <circle cx="0" cy="0" r="140" fill="url(#radarPulse)" className="animate-pulse-slow" />
            <circle cx="0" cy="0" r="80" stroke="#8E82D5" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
            <circle cx="0" cy="0" r="140" stroke="#7567C7" strokeWidth="0.8" opacity="0.25" />
          </g>

          {/* Markers overlay on SVG */}
          {markers.map((marker) => {
            const isSelected = selectedMarkerId === marker.reportId;
            const markerColor = getMarkerColor(marker.severityLevel);
            const x = (marker.xPercent / 100) * 1000;
            const y = (marker.yPercent / 100) * 700;

            return (
              <g
                key={marker.id}
                transform={`translate(${x}, ${y})`}
                className="cursor-pointer transition-transform hover:scale-125"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectMarker?.(marker);
                }}
                onMouseEnter={() => setHoveredMarker(marker)}
                onMouseLeave={() => setHoveredMarker(null)}
              >
                {/* Outer Ping Glow */}
                <circle
                  cx="0"
                  cy="0"
                  r={isSelected ? "22" : "14"}
                  fill={markerColor}
                  fillOpacity={isSelected ? "0.35" : "0.2"}
                  className="animate-ping"
                  style={{ animationDuration: marker.severityLevel === 'CRITICAL' ? '1.5s' : '3s' }}
                />

                {/* Static Halo */}
                <circle
                  cx="0"
                  cy="0"
                  r={isSelected ? "16" : "11"}
                  fill={markerColor}
                  fillOpacity="0.25"
                />

                {/* Pin Core */}
                <circle
                  cx="0"
                  cy="0"
                  r={isSelected ? "9" : "7"}
                  fill={markerColor}
                  stroke="#FFFFFF"
                  strokeWidth={isSelected ? "2.5" : "1.8"}
                />

                {/* Report ID Tag for High / Critical or Selected */}
                {(isSelected || marker.severityLevel === 'CRITICAL') && (
                  <g transform="translate(14, -10)">
                    <rect
                      x="0"
                      y="-12"
                      width="80"
                      height="20"
                      rx="4"
                      fill="#1B105A"
                      stroke={markerColor}
                      strokeWidth="1.2"
                    />
                    <text x="8" y="2" fill="#FFFFFF" fontSize="9.5" fontWeight="bold" fontFamily="monospace">
                      {marker.reportId}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Floating Header Bar on Map */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto bg-[#17172A]/90 backdrop-blur-md px-3.5 py-1.5 rounded-sm border border-[#35248F]/50 text-xs text-white shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-bold text-[#ECEBFC] text-[11px] uppercase tracking-wider">Raipur Smart GeoAI Grid</span>
          <span className="text-[#8E82D5]">•</span>
          <span className="font-mono text-[11px] text-[#A9A0E2] font-semibold">
            {mouseCoords.lat}° N, {mouseCoords.lng}° E
          </span>
        </div>

        {/* Layer Toggle Quick Access */}
        {showControls && (
          <div className="relative pointer-events-auto">
            <button
              onClick={() => setShowLayerMenu(!showLayerMenu)}
              className="bg-[#17172A]/90 hover:bg-[#27187E] backdrop-blur-md px-3.5 py-1.5 rounded-sm border border-[#35248F]/50 text-xs font-bold uppercase tracking-wider text-[#ECEBFC] flex items-center gap-1.5 shadow-lg transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-[#A9A0E2]" />
              <span>GIS Layers</span>
            </button>

            {showLayerMenu && (
              <div className="absolute right-0 mt-2 w-52 bg-[#1B105A] border border-[#4937A3] rounded-sm shadow-2xl p-2.5 space-y-1.5 z-30 text-xs text-[#ECEBFC]">
                <div className="font-bold text-[10px] uppercase tracking-[0.15em] text-[#A9A0E2] px-2 py-1">
                  Active Vector Layers
                </div>
                <label className="flex items-center justify-between px-2 py-1.5 rounded-sm hover:bg-[#27187E] cursor-pointer">
                  <span className="flex items-center gap-2 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-[#8E82D5]" />
                    <span>Road Corridors</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={localLayers.roads}
                    onChange={(e) => setLocalLayers({ ...localLayers, roads: e.target.checked })}
                    className="accent-[#27187E]"
                  />
                </label>
                <label className="flex items-center justify-between px-2 py-1.5 rounded-sm hover:bg-[#27187E] cursor-pointer">
                  <span className="flex items-center gap-2 font-semibold">
                    <Flame className="w-3.5 h-3.5 text-orange-400" />
                    <span>Risk Zones (Poly)</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={localLayers.riskZones}
                    onChange={(e) => setLocalLayers({ ...localLayers, riskZones: e.target.checked })}
                    className="accent-[#27187E]"
                  />
                </label>
                <label className="flex items-center justify-between px-2 py-1.5 rounded-sm hover:bg-[#27187E] cursor-pointer">
                  <span className="flex items-center gap-2 font-semibold">
                    <Radio className="w-3.5 h-3.5 text-red-400" />
                    <span>Risk Heatmap</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={localLayers.heatmap}
                    onChange={(e) => setLocalLayers({ ...localLayers, heatmap: e.target.checked })}
                    className="accent-[#27187E]"
                  />
                </label>
                <label className="flex items-center justify-between px-2 py-1.5 rounded-sm hover:bg-[#27187E] cursor-pointer">
                  <span className="flex items-center gap-2 font-semibold">
                    <Satellite className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Satellite Baseline</span>
                  </span>
                  <input
                    type="checkbox"
                    checked={localLayers.satellite}
                    onChange={(e) => setLocalLayers({ ...localLayers, satellite: e.target.checked })}
                    className="accent-[#27187E]"
                  />
                </label>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Hover Marker Tooltip Preview */}
      {hoveredMarker && (
        <div
          className="absolute z-20 pointer-events-none bg-[#17172A]/95 text-white border border-[#4937A3] p-3 rounded-sm shadow-2xl max-w-xs transition-opacity duration-150"
          style={{
            left: `${hoveredMarker.xPercent}%`,
            top: `${Math.max(10, hoveredMarker.yPercent - 18)}%`,
            transform: 'translate(-50%, -100%)'
          }}
        >
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-xs font-black text-[#A9A0E2]">{hoveredMarker.reportId}</span>
            <SeverityBadge level={hoveredMarker.severityLevel} score={hoveredMarker.severityScore} size="sm" />
          </div>
          <p className="text-xs font-bold text-white mt-1 leading-tight">{hoveredMarker.title}</p>
          <p className="text-[11px] text-[#C5C0EF] mt-0.5 font-medium">{hoveredMarker.locationText}</p>
          <div className="flex items-center justify-between text-[10px] text-[#A9A0E2] mt-2 pt-1.5 border-t border-[#35248F]">
            <span>AI Conf: <strong className="text-white font-mono">{hoveredMarker.aiConfidence}%</strong></span>
            <span>Priority: <strong className="text-white font-mono">{hoveredMarker.priorityScore}/100</strong></span>
          </div>
        </div>
      )}

      {/* Floating Zoom & Map Controls */}
      {showControls && (
        <div className="absolute bottom-4 right-4 flex flex-col gap-1 bg-[#17172A]/90 backdrop-blur-md p-1 rounded-sm border border-[#35248F]/50 shadow-xl z-10">
          <button
            onClick={handleZoomIn}
            className="p-2 text-[#ECEBFC] hover:text-white hover:bg-[#27187E] rounded-sm transition-colors"
            title="Zoom In"
            aria-label="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="p-2 text-[#ECEBFC] hover:text-white hover:bg-[#27187E] rounded-sm transition-colors"
            title="Zoom Out"
            aria-label="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleReset}
            className="p-2 text-[#ECEBFC] hover:text-white hover:bg-[#27187E] rounded-sm transition-colors border-t border-[#35248F]"
            title="Reset Map View"
            aria-label="Reset view"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Bottom GIS Scale & Legend */}
      <div className="absolute bottom-4 left-4 flex items-center gap-3 bg-[#17172A]/90 backdrop-blur-md px-3.5 py-1.5 rounded-sm border border-[#35248F]/50 text-[11px] text-[#ECEBFC] shadow-lg">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626]" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Critical</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F97316]" />
          <span className="text-[10px] font-bold uppercase tracking-wider">High</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Medium</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#22C55E]" />
          <span className="text-[10px] font-bold uppercase tracking-wider">Low</span>
        </div>
        <span className="text-[#4937A3]">|</span>
        <span className="font-mono text-[10px] font-bold text-[#A9A0E2]">Scale: 1 : 25,000 (Raipur)</span>
      </div>
    </div>
  );
};
