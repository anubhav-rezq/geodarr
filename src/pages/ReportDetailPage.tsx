import React from 'react';
import { useApp } from '../context/AppContext';
import { ReportStatus } from '../types';
import { SeverityBadge } from '../components/common/SeverityBadge';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  Sparkles, 
  User, 
  Building, 
  ChevronRight,
  TrendingUp,
  Share2,
  Download
} from 'lucide-react';

export const ReportDetailPage: React.FC = () => {
  const { 
    reports, 
    selectedReportId, 
    navigateTo, 
    advanceReportStatus, 
    addToast 
  } = useApp();

  const report = (reports && reports.length > 0)
    ? (reports.find((r) => r.id === selectedReportId) || reports[0])
    : null;

  const timelineSteps: { key: ReportStatus; label: string; desc: string }[] = [
    { key: 'Submitted', label: 'Submitted', desc: 'Raw telemetry ingested' },
    { key: 'AI Analyzed', label: 'AI Analyzed', desc: 'Vision & risk score computed' },
    { key: 'Verified', label: 'Verified', desc: 'Municipal engineer approved' },
    { key: 'Assigned', label: 'Assigned', desc: 'Routed to PWD Contractor' },
    { key: 'Inspection', label: 'Inspection', desc: 'Field crew on-site audit' },
    { key: 'Repair', label: 'Repair', desc: 'Civil compaction in progress' },
    { key: 'Resolved', label: 'Resolved', desc: 'Post-repair compaction verified' }
  ];

  if (!report) {
    return (
      <div className="w-full bg-[#F7F7FF] min-h-[calc(100vh-4rem)] p-8 flex flex-col items-center justify-center space-y-4 max-w-xl mx-auto text-center">
        <AlertTriangle className="w-12 h-12 text-amber-500" />
        <h2 className="text-xl font-bold text-[#17172A]">Incident Record Not Found</h2>
        <p className="text-xs text-[#64647A]">
          The requested infrastructure incident report could not be retrieved from the municipal database.
        </p>
        <button
          onClick={() => navigateTo('/reports')}
          className="px-5 py-2.5 bg-[#27187E] text-white text-xs font-bold uppercase tracking-wider rounded-sm"
        >
          View All Reports
        </button>
      </div>
    );
  }

  const currentStepIndex = timelineSteps.findIndex((s) => s.key === report.status);

  return (
    <div className="w-full bg-[#F7F7FF] min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto pb-24">
      {/* Top Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={() => navigateTo('/reports')}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#27187E] hover:text-[#1B105A] bg-white border border-[#E5E4F0] px-4 py-2 rounded-sm transition-colors shadow-sm w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Reports</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => addToast({ type: 'info', title: 'Share Report', message: `Share link for ${report.id} copied to clipboard.` })}
            className="p-2 bg-white border border-[#E5E4F0] rounded-sm text-[#64647A] hover:text-[#27187E] transition-colors shadow-sm"
            title="Share Incident Record"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => addToast({ type: 'success', title: 'Export PDF', message: `Municipal dossier for ${report.id} generated.` })}
            className="p-2 bg-white border border-[#E5E4F0] rounded-sm text-[#64647A] hover:text-[#27187E] transition-colors shadow-sm"
            title="Download Municipal PDF"
          >
            <Download className="w-4 h-4" />
          </button>
          <SeverityBadge level={report.severityLevel} score={report.priorityScore} size="md" />
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Visual & AI Metrics (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Inspection Image */}
          <div className="bg-white rounded-sm border border-[#E5E4F0] p-4 shadow-sm overflow-hidden space-y-3">
            <div className="relative rounded-sm overflow-hidden h-72 sm:h-96 border border-[#E5E4F0]">
              <img
                src={report.imageUrl}
                alt={report.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#17172A]/90 backdrop-blur-md px-3 py-1 rounded-sm text-xs font-mono font-bold text-white border border-white/20 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                <span>AI Vision Verified &bull; {report.aiConfidence}%</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#64647A] px-2 pt-1 font-medium">
              <span>Source: <strong className="text-[#17172A]">{report.dataSource}</strong></span>
              <span>Coordinates: <strong className="text-[#27187E] font-mono">{report.location.lat.toFixed(4)}° N, {report.location.lng.toFixed(4)}° E</strong></span>
            </div>
          </div>

          {/* Tri-Factor Risk Intelligence Scores */}
          <div className="bg-white rounded-sm border border-[#E5E4F0] p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#17172A] flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#27187E]" />
              <span>Tri-Factor GeoAI Metrics</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#F7F7FF] p-4 rounded-sm border border-[#E5E4F0] space-y-1">
                <span className="text-[10px] font-bold text-[#64647A] uppercase tracking-wider block">
                  1. Visual Severity
                </span>
                <div className="text-2xl font-black font-mono text-[#17172A]">
                  {report.visualSeverity} <span className="text-xs text-[#64647A] font-normal">/100</span>
                </div>
                <p className="text-[11px] text-[#64647A] font-medium">Structural surface crack morphology</p>
              </div>

              <div className="bg-[#F7F7FF] p-4 rounded-sm border border-[#E5E4F0] space-y-1">
                <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">
                  2. Contextual Risk
                </span>
                <div className="text-2xl font-black font-mono text-amber-600">
                  {report.contextualRisk} <span className="text-xs text-[#64647A] font-normal">/100</span>
                </div>
                <p className="text-[11px] text-[#64647A] font-medium">Heavy rainfall &amp; traffic load</p>
              </div>

              <div className="bg-[#ECEBFC] p-4 rounded-sm border border-[#C5C0EF] space-y-1">
                <span className="text-[10px] font-bold text-[#27187E] uppercase tracking-wider block">
                  3. Final Priority
                </span>
                <div className="text-2xl font-black font-mono text-[#27187E]">
                  {report.priorityScore} <span className="text-xs text-[#64647A] font-normal">/100</span>
                </div>
                <p className="text-[11px] text-[#27187E] font-bold">Municipal dispatch queue rank</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Incident Details & Interactive Status Timeline (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Information Dossier */}
          <div className="bg-white rounded-sm border border-[#E5E4F0] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E4F0]">
              <span className="font-mono text-xs font-black text-[#27187E] bg-[#ECEBFC] px-2.5 py-1 rounded-sm">
                {report.id}
              </span>
              <span className="text-xs text-[#64647A]">Category: <strong className="text-[#17172A] uppercase">{report.category}</strong></span>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#17172A] leading-tight">
                {report.title}
              </h2>
              <p className="text-xs text-[#64647A] mt-1.5 flex items-center gap-1.5 font-medium">
                <MapPin className="w-4 h-4 text-[#8E82D5] shrink-0" />
                <span>{report.location.landmark}, {report.location.ward}, {report.location.city}</span>
              </p>
            </div>

            <div className="space-y-1 text-xs text-[#64647A]">
              <span className="font-bold text-[#17172A] block uppercase text-[10px] tracking-[0.15em]">
                Telemetry Description:
              </span>
              <p className="p-3 bg-[#F7F7FF] rounded-sm border border-[#E5E4F0] leading-relaxed text-[#17172A] font-medium">
                {report.description}
              </p>
            </div>

            <div className="pt-2 grid grid-cols-2 gap-3 text-xs text-[#64647A]">
              <div>
                <span className="block opacity-75 font-medium">Logged At</span>
                <strong className="text-[#17172A] font-mono">{new Date(report.submittedAt).toLocaleDateString()}</strong>
              </div>
              <div>
                <span className="block opacity-75 font-medium">Responsible Dept</span>
                <strong className="text-[#27187E]">{report.department || 'PWD Roads & Bridges'}</strong>
              </div>
            </div>
          </div>

          {/* Lifecycle Timeline (7 Steps) with Interactive Simulation Advance */}
          <div className="bg-white rounded-sm border border-[#E5E4F0] p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E4F0]">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#17172A]">Resolution Lifecycle</h3>
                <p className="text-[11px] text-[#64647A] font-medium">7-stage municipal verification pipeline</p>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#27187E] bg-[#ECEBFC] px-2.5 py-1 rounded-sm">
                {report.status}
              </span>
            </div>

            {/* Stepper list */}
            <div className="space-y-3 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E5E4F0]">
              {timelineSteps.map((step, idx) => {
                const isPassed = idx < currentStepIndex;
                const isCurrent = idx === currentStepIndex;
                return (
                  <div key={step.key} className="flex items-start gap-3 relative z-10">
                    <div
                      className={`w-7 h-7 rounded-sm flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                        isPassed
                          ? 'bg-emerald-600 text-white'
                          : isCurrent
                          ? 'bg-[#27187E] text-white ring-2 ring-[#ECEBFC]'
                          : 'bg-[#F7F7FF] text-[#64647A] border border-[#E5E4F0]'
                      }`}
                    >
                      {isPassed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>
                    <div className="pt-0.5">
                      <div className={`text-xs font-bold uppercase tracking-wider ${isCurrent ? 'text-[#27187E]' : 'text-[#17172A]'}`}>
                        {step.label}
                      </div>
                      <div className="text-[11px] text-[#64647A] font-medium">{step.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Interactive Simulation Action Button */}
            {report.status !== 'Resolved' && (
              <div className="pt-3 border-t border-[#E5E4F0]">
                <button
                  onClick={() => advanceReportStatus(report.id)}
                  className="w-full py-2.5 bg-[#27187E] hover:bg-[#35248F] text-white text-xs font-bold uppercase tracking-wider rounded-sm shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Simulate Advancing to Next Stage</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
