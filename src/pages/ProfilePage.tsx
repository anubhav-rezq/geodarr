import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AccountType } from '../types';
import { SeverityBadge } from '../components/common/SeverityBadge';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  ShieldCheck, 
  Bell, 
  CheckCircle2, 
  FileSpreadsheet, 
  Save, 
  Clock, 
  ArrowRight,
  Sliders
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, updateUserProfile, reports, selectReportById, addToast } = useApp();

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone || '+91 98261 40592',
    location: user.location,
    department: user.department || 'Urban Infrastructure Monitoring Cell',
    accountType: user.accountType
  });

  const [notifications, setNotifications] = useState({
    criticalAlerts: true,
    weeklyReportDigest: true,
    smsDispatches: false
  });

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile(formData);
    addToast({
      type: 'success',
      title: 'Profile Updated',
      message: 'Your municipal operator profile has been saved.'
    });
  };

  const userReports = reports.slice(0, 4);

  return (
    <div className="w-full bg-[#F7F7FF] min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto pb-24">
      {/* Profile Header Banner */}
      <div className="bg-white rounded-sm border border-[#E5E4F0] p-6 sm:p-10 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-sm bg-[#27187E] text-white font-black text-2xl flex items-center justify-center shadow-sm">
            {formData.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-[#17172A] tracking-tight">
                {formData.name}
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#27187E] bg-[#ECEBFC] px-2.5 py-1 rounded-sm border border-[#C5C0EF]">
                {formData.accountType}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#64647A] mt-1 flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#8E82D5]" />
              <span>{formData.location} &bull; {formData.department}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-[#F7F7FF] p-3 rounded-sm border border-[#E5E4F0]">
          <div className="text-center px-3 border-r border-[#E5E4F0]">
            <div className="text-xl font-mono font-black text-[#27187E]">{reports.length}</div>
            <div className="text-[10px] text-[#64647A] uppercase font-bold tracking-wider">Active Reports</div>
          </div>
          <div className="text-center px-3">
            <div className="text-xl font-mono font-black text-emerald-600">96.4%</div>
            <div className="text-[10px] text-[#64647A] uppercase font-bold tracking-wider">AI Confidence</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Edit Profile & Preferences (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Edit Profile Form */}
          <div className="bg-white rounded-sm border border-[#E5E4F0] p-6 sm:p-8 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E4F0]">
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#17172A]">
                Account Credentials &amp; Details
              </h3>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#64647A]">WGS84 Verified</span>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#17172A] mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#E5E4F0] rounded-sm text-xs font-medium text-[#17172A] focus:outline-none focus:ring-2 focus:ring-[#27187E]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#17172A] mb-1.5">
                    Official Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#E5E4F0] rounded-sm text-xs font-medium text-[#17172A] focus:outline-none focus:ring-2 focus:ring-[#27187E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#17172A] mb-1.5">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#E5E4F0] rounded-sm text-xs font-medium text-[#17172A] focus:outline-none focus:ring-2 focus:ring-[#27187E]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#17172A] mb-1.5">
                    Municipal Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#E5E4F0] rounded-sm text-xs font-medium text-[#17172A] focus:outline-none focus:ring-2 focus:ring-[#27187E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-[#17172A] mb-1.5">
                  Department / Organization
                </label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#E5E4F0] rounded-sm text-xs font-medium text-[#17172A] focus:outline-none focus:ring-2 focus:ring-[#27187E]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#27187E] hover:bg-[#35248F] text-white text-xs font-bold uppercase tracking-wider rounded-sm shadow-sm transition-colors flex items-center gap-2"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Profile Updates</span>
                </button>
              </div>
            </form>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white rounded-sm border border-[#E5E4F0] p-6 sm:p-8 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#17172A] flex items-center gap-2 pb-3 border-b border-[#E5E4F0]">
              <Bell className="w-4 h-4 text-[#27187E]" />
              <span>GeoAI Telemetry Notifications</span>
            </h3>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 rounded-sm bg-[#F7F7FF] border border-[#E5E4F0] cursor-pointer">
                <div>
                  <div className="text-xs font-bold text-[#17172A]">Critical Severity Radar Alerts</div>
                  <div className="text-[11px] text-[#64647A] font-medium">Instant notification on Priority &gt; 80 incidents</div>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.criticalAlerts}
                  onChange={(e) => setNotifications({ ...notifications, criticalAlerts: e.target.checked })}
                  className="accent-[#27187E] w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-sm bg-[#F7F7FF] border border-[#E5E4F0] cursor-pointer">
                <div>
                  <div className="text-xs font-bold text-[#17172A]">Weekly Raipur Ward Digest</div>
                  <div className="text-[11px] text-[#64647A] font-medium">Summary of solved and active infrastructure issues</div>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.weeklyReportDigest}
                  onChange={(e) => setNotifications({ ...notifications, weeklyReportDigest: e.target.checked })}
                  className="accent-[#27187E] w-4 h-4"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Submitted Reports & Activity Stream (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-sm border border-[#E5E4F0] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E4F0]">
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#17172A]">Recent Reports</h3>
              <span className="text-[10px] text-[#27187E] font-bold uppercase tracking-wider">Raipur Central</span>
            </div>

            <div className="space-y-3">
              {userReports.map((report) => (
                <div
                  key={report.id}
                  onClick={() => selectReportById(report.id)}
                  className="p-3 bg-[#F7F7FF] hover:bg-[#ECEBFC] rounded-sm border border-[#E5E4F0] hover:border-[#8E82D5] cursor-pointer transition-all space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black text-[#27187E]">{report.id}</span>
                    <SeverityBadge level={report.severityLevel} score={report.priorityScore} size="sm" />
                  </div>
                  <div className="text-xs font-bold text-[#17172A] line-clamp-1">{report.title}</div>
                  <div className="flex items-center justify-between text-[10px] text-[#64647A] font-medium">
                    <span>{report.location.landmark}</span>
                    <span className="font-bold text-[#17172A]">{report.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
