import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GISMapCanvas } from '../components/gis/GISMapCanvas';
import { SeverityBadge } from '../components/common/SeverityBadge';
import { INFRASTRUCTURE_ASSETS, PREDICTIVE_DATA_FACTORS } from '../data/mockData';
import { 
  LayoutDashboard, 
  MapPin, 
  PlusCircle, 
  FileSpreadsheet, 
  TrendingUp, 
  User, 
  Settings, 
  LogOut, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  ShieldAlert, 
  ArrowRight, 
  Sparkles, 
  Activity, 
  ExternalLink,
  Sliders,
  BellRing
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { 
    user, 
    reports, 
    markers, 
    navigateTo, 
    selectReportById, 
    addToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'risk'>('overview');

  const criticalCount = reports.filter((r) => r.severityLevel === 'CRITICAL').length;
  const verifiedCount = reports.filter((r) => r.status === 'Verified' || r.status === 'Assigned' || r.status === 'Inspection' || r.status === 'Repair').length;
  const resolvedCount = reports.filter((r) => r.status === 'Resolved').length;
  const totalCount = reports.length;

  const topPriorityReports = [...reports]
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, 4);

  const recentReports = [...reports]
    .slice(0, 5);

  const sidebarLinks = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
    { id: 'map', label: 'Intelligence Map', icon: MapPin, path: '/map' },
    { id: 'report-issue', label: 'Report Issue', icon: PlusCircle, path: '/ai-detection' },
    { id: 'reports', label: 'My Reports', icon: FileSpreadsheet, path: '/reports' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
  ];

  return (
    <div className="w-full bg-[#F7F7FF] min-h-[calc(100vh-4rem)] p-3 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Command Sidebar (3 cols on desktop) */}
        <div className="lg:col-span-3 space-y-4">
          {/* User Profile Mini Badge */}
          <div className="bg-white rounded-sm border border-[#E5E4F0] p-4 shadow-sm space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm bg-[#27187E] text-white font-black flex items-center justify-center text-sm shadow-sm">
                {user.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-bold text-[#17172A] truncate">{user.name}</h4>
                <span className="text-[10px] text-[#27187E] font-bold uppercase tracking-wider bg-[#ECEBFC] px-2 py-0.5 rounded-sm">
                  {user.accountType} Officer
                </span>
              </div>
            </div>
            <p className="text-[11px] text-[#64647A] truncate font-medium">
              {user.department || 'Urban Infrastructure Monitoring'}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="bg-white rounded-sm border border-[#E5E4F0] p-2 shadow-sm space-y-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = link.path === '/dashboard' ? activeTab === 'overview' : false;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    if (link.path === '/dashboard') {
                      setActiveTab('overview');
                    } else {
                      navigateTo(link.path);
                    }
                  }}
                  className={`w-full px-3 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-all ${
                    isActive
                      ? 'bg-[#27187E] text-white shadow-sm'
                      : 'text-[#64647A] hover:text-[#17172A] hover:bg-[#F7F7FF]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </div>
                  {link.id === 'reports' && (
                    <span className="font-mono text-[10px] bg-[#ECEBFC] text-[#27187E] px-1.5 py-0.5 rounded-sm font-black">
                      {totalCount}
                    </span>
                  )}
                </button>
              );
            })}

            <button
              onClick={() => {
                setActiveTab(activeTab === 'risk' ? 'overview' : 'risk');
              }}
              className={`w-full px-3 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center justify-between transition-all ${
                activeTab === 'risk'
                  ? 'bg-[#27187E] text-white shadow-sm'
                  : 'text-[#64647A] hover:text-[#17172A] hover:bg-[#F7F7FF]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <TrendingUp className="w-4 h-4 text-orange-500" />
                <span>Risk Intelligence</span>
              </div>
              <span className="text-[10px] bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-sm font-black font-mono">
                AI 30d
              </span>
            </button>

            <div className="pt-2 border-t border-[#E5E4F0] space-y-1">
              <button
                onClick={() => addToast({ type: 'info', title: 'Settings', message: 'Workspace preferences saved.' })}
                className="w-full px-3 py-2 rounded-sm text-xs font-bold uppercase tracking-wider text-[#64647A] hover:text-[#17172A] hover:bg-[#F7F7FF] flex items-center gap-2.5"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
              <button
                onClick={() => {
                  addToast({ type: 'info', title: 'Session Ended', message: 'Logged out of command center.' });
                  navigateTo('/login');
                }}
                className="w-full px-3 py-2 rounded-sm text-xs font-bold uppercase tracking-wider text-red-600 hover:bg-red-50 flex items-center gap-2.5"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Incident Telemetry Card */}
          <div className="bg-[#1B105A] text-white rounded-sm p-4 border border-[#35248F] shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#A9A0E2]">
              <BellRing className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
              <span>Live Sensor Dispatch</span>
            </div>
            <p className="text-[11px] text-[#C5C0EF] leading-relaxed font-medium">
              Hydro-sensor node #RPR-042 triggered high inundation threshold in Telibandha Basin.
            </p>
            <button
              onClick={() => selectReportById('GD-R-28492')}
              className="text-[11px] font-bold uppercase tracking-wider text-cyan-300 hover:underline pt-1 block"
            >
              Inspect Alert (GD-R-28492) &rarr;
            </button>
          </div>
        </div>

        {/* Main Dashboard Workspace (9 cols) */}
        <div className="lg:col-span-9 space-y-6">
          {/* Top Top Stats Quad: Total 27, Verified 21, Resolved 8, Critical 3 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-sm border border-[#E5E4F0] shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#64647A] block">
                Total Reports
              </span>
              <div className="text-3xl font-black font-mono text-[#17172A] mt-1">
                {totalCount}
              </div>
              <span className="text-[10.5px] text-[#27187E] font-bold uppercase tracking-wider mt-1 block">
                Raipur Grid Telemetry
              </span>
            </div>

            <div className="bg-white p-4 rounded-sm border border-[#E5E4F0] shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#64647A] block">
                Verified
              </span>
              <div className="text-3xl font-black font-mono text-emerald-600 mt-1">
                {verifiedCount}
              </div>
              <span className="text-[10.5px] text-emerald-700 font-bold uppercase tracking-wider mt-1 block">
                Approved by Engineers
              </span>
            </div>

            <div className="bg-white p-4 rounded-sm border border-[#E5E4F0] shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#64647A] block">
                Resolved
              </span>
              <div className="text-3xl font-black font-mono text-[#27187E] mt-1">
                {resolvedCount}
              </div>
              <span className="text-[10.5px] text-[#64647A] font-bold uppercase tracking-wider mt-1 block">
                Compaction Verified
              </span>
            </div>

            <div className="bg-white p-4 rounded-sm border border-red-200 shadow-sm bg-red-50/20">
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 block">
                Critical
              </span>
              <div className="text-3xl font-black font-mono text-red-600 mt-1">
                {criticalCount}
              </div>
              <span className="text-[10.5px] text-red-700 font-bold uppercase tracking-wider mt-1 block">
                Immediate Action Required
              </span>
            </div>
          </div>

          {/* Infrastructure Health & Map Preview Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Map Preview (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-sm border border-[#E5E4F0] p-4 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#17172A]">Live GIS Spatial Grid</h3>
                  <p className="text-[11px] text-[#64647A] font-medium">Active telemetry overlays across Raipur</p>
                </div>
                <button
                  onClick={() => navigateTo('/map')}
                  className="text-xs font-bold uppercase tracking-wider text-[#27187E] hover:underline flex items-center gap-1"
                >
                  <span>Full GIS Canvas</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              <GISMapCanvas
                markers={markers}
                heightClass="h-[320px]"
                onSelectMarker={(m) => selectReportById(m.reportId)}
                showControls={false}
              />
            </div>

            {/* Infrastructure Health Indices (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-sm border border-[#E5E4F0] p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#E5E4F0]">
                <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#17172A]">Infrastructure Health</h3>
                <span className="text-[10px] font-mono text-[#27187E] bg-[#ECEBFC] px-2 py-0.5 rounded-sm font-bold">
                  Raipur Corridors
                </span>
              </div>

              <div className="space-y-3">
                {INFRASTRUCTURE_ASSETS.map((asset) => (
                  <div key={asset.id} className="p-3 bg-[#F7F7FF] rounded-sm border border-[#E5E4F0] space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#17172A] truncate max-w-[170px]">{asset.name}</span>
                      <span className="font-mono font-black text-[#27187E]">{asset.healthScore}/100</span>
                    </div>
                    <div className="w-full bg-[#E5E4F0] h-1.5 rounded-sm overflow-hidden">
                      <div
                        className={`h-full rounded-sm ${
                          asset.healthScore > 80 ? 'bg-emerald-500' : asset.healthScore > 60 ? 'bg-amber-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${asset.healthScore}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-[#64647A] font-medium">
                      <span>{asset.activeIssues} Active Issues</span>
                      <span className="text-red-600 font-bold font-mono">{asset.failureRiskNext30Days}% 30d Failure Risk</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Priority Issues Queue */}
          <div className="bg-white rounded-sm border border-[#E5E4F0] p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E4F0]">
              <div>
                <h3 className="text-base font-bold text-[#17172A] uppercase tracking-wider">Priority Action Queue</h3>
                <p className="text-xs text-[#64647A] font-medium">Ranked by composite AI Priority Index (Visual + Risk + PCU)</p>
              </div>
              <button
                onClick={() => navigateTo('/reports')}
                className="text-xs font-bold uppercase tracking-wider text-[#27187E] hover:underline"
              >
                View All ({totalCount}) &rarr;
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {topPriorityReports.map((report) => (
                <div
                  key={report.id}
                  onClick={() => selectReportById(report.id)}
                  className="bg-[#F7F7FF] hover:bg-[#ECEBFC] p-4 rounded-sm border border-[#E5E4F0] hover:border-[#8E82D5] cursor-pointer transition-all space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black text-[#27187E]">{report.id}</span>
                    <SeverityBadge level={report.severityLevel} score={report.priorityScore} size="sm" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#17172A] leading-tight line-clamp-1">
                      {report.title}
                    </h4>
                    <p className="text-[11px] text-[#64647A] mt-0.5 truncate font-medium">
                      {report.location.landmark}, {report.location.ward}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-[#64647A] pt-2 border-t border-[#E5E4F0] font-medium">
                    <span>Status: <strong className="text-[#17172A]">{report.status}</strong></span>
                    <span>AI Conf: <strong className="text-emerald-600 font-mono">{report.aiConfidence}%</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Trends & Environmental Correlation */}
          <div className="bg-[#1B105A] text-white rounded-sm p-6 border border-[#35248F] shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#35248F]">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-orange-400" />
                <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-white">Environmental Stress &amp; Risk Dynamics</h3>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#A9A0E2] font-mono">Raipur Monsoon Telemetry</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {PREDICTIVE_DATA_FACTORS.map((factor) => (
                <div key={factor.factor} className="bg-[#141427] p-3 rounded-sm border border-[#4937A3]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white truncate max-w-[150px]">{factor.factor}</span>
                    <span className="font-mono text-xs font-black text-orange-400">{factor.impact}</span>
                  </div>
                  <div className="text-[11px] text-[#A9A0E2] mt-1 font-medium">{factor.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
