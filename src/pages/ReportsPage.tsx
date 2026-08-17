import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SeverityLevel, ReportStatus } from '../types';
import { SeverityBadge } from '../components/common/SeverityBadge';
import { 
  FileSpreadsheet, 
  Search, 
  Filter, 
  SlidersHorizontal, 
  ArrowUpDown, 
  MapPin, 
  Calendar, 
  Eye, 
  PlusCircle, 
  LayoutGrid, 
  List, 
  Table as TableIcon,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const { reports, selectReportById, navigateTo } = useApp();

  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'highest' | 'newest' | 'oldest'>('highest');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Filter & Sort Logic
  const filteredReports = reports.filter((report) => {
    // Filter chip check
    if (activeFilter === 'Critical' && report.severityLevel !== 'CRITICAL') return false;
    if (activeFilter === 'High' && report.severityLevel !== 'HIGH') return false;
    if (activeFilter === 'Medium' && report.severityLevel !== 'MEDIUM') return false;
    if (activeFilter === 'Low' && report.severityLevel !== 'LOW') return false;
    if (activeFilter === 'Pending' && report.status === 'Resolved') return false;
    if (activeFilter === 'Resolved' && report.status !== 'Resolved') return false;

    // Search query check
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const match = report.id.toLowerCase().includes(q) ||
                    report.title.toLowerCase().includes(q) ||
                    report.category.toLowerCase().includes(q) ||
                    report.location.ward.toLowerCase().includes(q) ||
                    report.location.landmark.toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });

  // Sort
  const sortedReports = [...filteredReports].sort((a, b) => {
    if (sortBy === 'highest') {
      return b.priorityScore - a.priorityScore;
    }
    if (sortBy === 'newest') {
      return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
    }
    if (sortBy === 'oldest') {
      return new Date(a.submittedAt).getTime() - new Date(b.submittedAt).getTime();
    }
    return 0;
  });

  const filterChips = ['All', 'Critical', 'High', 'Medium', 'Low', 'Pending', 'Resolved'];

  return (
    <div className="w-full bg-[#F7F7FF] min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto pb-20">
      {/* Header Banner */}
      <div className="bg-white rounded-sm border border-[#E5E4F0] p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#27187E] bg-[#ECEBFC] px-2.5 py-0.5 rounded-sm">
              Municipal Registry
            </span>
            <span className="text-xs text-[#64647A] font-mono font-medium">Total {reports.length} Records</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#17172A] mt-2 tracking-tight">
            Infrastructure Reports
          </h1>
        </div>

        <button
          onClick={() => navigateTo('/ai-detection')}
          className="px-5 py-2.5 bg-[#27187E] hover:bg-[#35248F] text-white text-xs font-bold uppercase tracking-wider rounded-sm shadow-sm transition-all flex items-center justify-center gap-2"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New AI Inspection</span>
        </button>
      </div>

      {/* Control Bar: Filters, Search, Sort & View Mode */}
      <div className="bg-white rounded-sm border border-[#E5E4F0] p-4 shadow-sm space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            {filterChips.map((chip) => (
              <button
                key={chip}
                onClick={() => setActiveFilter(chip)}
                className={`px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider border transition-all ${
                  activeFilter === chip
                    ? 'bg-[#27187E] text-white border-[#27187E] shadow-sm'
                    : 'bg-[#F7F7FF] text-[#17172A] border-[#E5E4F0] hover:bg-[#ECEBFC]'
                }`}
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Search, Sort & Layout Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[200px] flex-1 sm:flex-initial">
              <Search className="w-4 h-4 text-[#8E82D5] absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reports..."
                className="w-full pl-9 pr-3 py-1.5 bg-[#F7F7FF] border border-[#E5E4F0] rounded-sm text-xs font-mono text-[#17172A] focus:outline-none focus:ring-2 focus:ring-[#27187E]"
              />
            </div>

            <div className="flex items-center gap-1.5 bg-[#F7F7FF] border border-[#E5E4F0] rounded-sm px-2 py-1 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#8E82D5]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs font-bold uppercase tracking-wider text-[#17172A] focus:outline-none cursor-pointer"
              >
                <option value="highest">Highest Severity</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>

            <div className="hidden sm:flex items-center bg-[#F7F7FF] border border-[#E5E4F0] rounded-sm p-0.5">
              <button
                onClick={() => setViewMode('cards')}
                className={`p-1.5 rounded-sm transition-colors ${
                  viewMode === 'cards' ? 'bg-white text-[#27187E] shadow-sm font-bold' : 'text-[#64647A]'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-sm transition-colors ${
                  viewMode === 'table' ? 'bg-white text-[#27187E] shadow-sm font-bold' : 'text-[#64647A]'
                }`}
                title="Table View"
              >
                <TableIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reports Grid View */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedReports.map((report) => (
            <div
              key={report.id}
              onClick={() => selectReportById(report.id)}
              className="bg-white rounded-sm border border-[#E5E4F0] hover:border-[#8E82D5] p-5 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black text-[#27187E] bg-[#ECEBFC] px-2 py-0.5 rounded-sm">
                    {report.id}
                  </span>
                  <SeverityBadge level={report.severityLevel} score={report.priorityScore} size="sm" />
                </div>

                <div className="h-40 rounded-sm overflow-hidden border border-[#E5E4F0] relative">
                  <img
                    src={report.imageUrl}
                    alt={report.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-2 left-2 bg-[#17172A]/90 backdrop-blur-md px-2.5 py-1 rounded-sm text-[10px] text-white font-mono font-bold">
                    Visual: {report.visualSeverity}/100
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#17172A] leading-tight line-clamp-1 group-hover:text-[#27187E] transition-colors">
                    {report.title}
                  </h3>
                  <p className="text-xs text-[#64647A] mt-1 flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#8E82D5] shrink-0" />
                    <span className="truncate">{report.location.landmark}, {report.location.city}</span>
                  </p>
                </div>

                <p className="text-xs text-[#64647A] line-clamp-2 leading-relaxed font-medium">
                  {report.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E5E4F0] flex items-center justify-between text-xs text-[#64647A]">
                <div className="flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-[#8E82D5]" />
                  <span>Status: <strong className="text-[#17172A]">{report.status}</strong></span>
                </div>
                <span className="text-[#27187E] font-bold uppercase tracking-wider text-[11px] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Details &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-sm border border-[#E5E4F0] shadow-sm overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F7FF] border-b border-[#E5E4F0] text-[#64647A] uppercase tracking-wider font-bold">
              <tr>
                <th className="py-3.5 px-4">Report ID</th>
                <th className="py-3.5 px-4">Issue</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Severity / Priority</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E4F0] text-[#17172A]">
              {sortedReports.map((report) => (
                <tr
                  key={report.id}
                  onClick={() => selectReportById(report.id)}
                  className="hover:bg-[#ECEBFC]/50 cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-4 font-mono font-black text-[#27187E]">{report.id}</td>
                  <td className="py-3.5 px-4 font-bold max-w-xs truncate">{report.title}</td>
                  <td className="py-3.5 px-4 text-[#64647A] font-medium">{report.category}</td>
                  <td className="py-3.5 px-4">
                    <SeverityBadge level={report.severityLevel} score={report.priorityScore} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-[#64647A] max-w-xs truncate font-medium">
                    {report.location.landmark}, {report.location.ward}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-xs text-[#17172A]">{report.status}</span>
                  </td>
                  <td className="py-3.5 px-4 text-right text-[#27187E] font-bold uppercase tracking-wider text-[11px]">
                    Inspect &rarr;
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {sortedReports.length === 0 && (
        <div className="bg-white rounded-sm border border-[#E5E4F0] p-12 text-center space-y-3">
          <FileSpreadsheet className="w-10 h-10 text-[#8E82D5] mx-auto opacity-50" />
          <h3 className="text-base font-bold text-[#17172A] uppercase tracking-wider">No Matching Reports Found</h3>
          <p className="text-xs text-[#64647A] font-medium">Try resetting your search query or severity filters.</p>
        </div>
      )}
    </div>
  );
};
