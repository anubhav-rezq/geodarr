import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ApiService } from '../services/api';
import { 
  Building2, 
  Wrench, 
  Cpu, 
  ShieldAlert, 
  Truck, 
  Users, 
  ArrowRight, 
  CheckCircle2,
  MapPin,
  Sparkles,
  Send,
  Loader2
} from 'lucide-react';

export const SolutionsPage: React.FC = () => {
  const { navigateTo, addToast } = useApp();
  const [showPilotForm, setShowPilotForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [pilotData, setPilotData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    sector: 'Municipalities & ULBs',
    city: '',
    notes: ''
  });

  const handlePilotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await ApiService.submitClientRequest({
        name: pilotData.name,
        organization: pilotData.organization,
        email: pilotData.email,
        phone: pilotData.phone,
        sector: pilotData.sector,
        city: pilotData.city,
        notes: pilotData.notes
      });
      setSubmitted(true);
      addToast({
        type: 'success',
        title: 'Pilot Inquiry Submitted',
        message: 'Our deployment team will reach out within 24 business hours.'
      });
    } catch (err: any) {
      addToast({
        type: 'error',
        title: 'Submission Error',
        message: err.message || 'Failed to submit pilot request. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const solutions = [
    {
      icon: Building2,
      title: 'Municipalities & ULBs',
      subtitle: 'City-wide infrastructure monitoring',
      desc: 'Enables Urban Local Bodies to maintain a live digital twin of municipal road networks, stormwater drains, culverts, and street furniture with automated ward-by-ward health indices.',
      features: [
        'Real-time ward vulnerability mapping',
        'Transparent contractor SLA auditing',
        'Citizen grievance auto-triage'
      ]
    },
    {
      icon: Wrench,
      title: 'Public Works (PWD)',
      subtitle: 'Repair prioritization and infrastructure intelligence',
      desc: 'Transforms arbitrary repair schedules into mathematically prioritized maintenance queues. Eliminates subjective road inspections with multi-factor risk scoring.',
      features: [
        'Automated material & cost estimation',
        'Pavement lifecycle fatigue modeling',
        'Pre-monsoon emergency repair scheduling'
      ]
    },
    {
      icon: Cpu,
      title: 'Smart Cities Mission',
      subtitle: 'Continuously updated infrastructure data',
      desc: 'Integrates natively into Integrated Command & Control Centres (ICCC) to stream live GIS incident layers, drone photogrammetry, and automated surveillance dashcam feeds.',
      features: [
        'Direct API sync with ICCC video walls',
        'Spatial sensor network orchestration',
        'Automated asset degradation alerts'
      ]
    },
    {
      icon: ShieldAlert,
      title: 'Disaster Management',
      subtitle: 'Infrastructure risk and vulnerability intelligence',
      desc: 'Empowers State and District Disaster Management Authorities to simulate flood runoff, pinpoint vulnerable bridges, and safeguard emergency transit corridors prior to extreme weather events.',
      features: [
        'Hydrodynamic waterlogging forecast',
        'Structural flyover vibration alerts',
        'Evacuation route barrier detection'
      ]
    },
    {
      icon: Truck,
      title: 'Field Operations',
      subtitle: 'Actionable inspection workflows',
      desc: 'Equips field engineers and municipal maintenance crews with precision GPS-locked job cards, optical verification tools, and real-time repair progress tracking.',
      features: [
        'Mobile inspection job-card dispatch',
        'Sub-meter GPS pinpointing',
        'Post-repair compaction scan audits'
      ]
    },
    {
      icon: Users,
      title: 'Citizens',
      subtitle: 'Simple infrastructure reporting',
      desc: 'Democratizes urban maintenance by allowing residents to snap a single smartphone photo and instantly receive verified AI tracking from submission to repair completion.',
      features: [
        'Instant one-tap geo-tagged reporting',
        'Live 7-step repair timeline tracking',
        'Ward-level community impact score'
      ]
    }
  ];

  return (
    <div className="w-full bg-[#F7F7FF] text-[#17172A] space-y-16 pb-20">
      {/* Header */}
      <section className="bg-[#1B105A] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#35248F]">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#27187E] border border-[#5D4CB7] px-3.5 py-1 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] text-[#DEDDF7]">
            <Sparkles className="w-3 h-3 text-cyan-300" />
            <span>Targeted Sector Architectures</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-3xl">
            Tailored GeoAI Solutions for Every Urban Stakeholder.
          </h1>
          <p className="text-sm sm:text-base text-[#C5C0EF] max-w-2xl leading-relaxed font-medium">
            From city administrators and highway engineers to ground crews and citizens, GEODAR provides role-specific intelligence to ensure safer, smarter cities.
          </p>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((sol) => {
            const Icon = sol.icon;
            return (
              <div
                key={sol.title}
                className="bg-white rounded-sm border border-[#E5E4F0] p-8 hover:border-[#8E82D5] hover:shadow-md transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-sm bg-[#ECEBFC] border border-[#C5C0EF] flex items-center justify-center text-[#27187E]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#17172A] tracking-tight">{sol.title}</h3>
                    <p className="text-xs font-bold text-[#27187E] uppercase tracking-[0.15em] mt-0.5">
                      {sol.subtitle}
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-[#64647A] leading-relaxed font-medium">
                    {sol.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5E4F0] space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#17172A] block">
                    Core Capabilities:
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#64647A] font-medium">
                    {sol.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Box & Pilot Request Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-sm border border-[#E5E4F0] p-8 sm:p-12 text-center space-y-6 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-black text-[#17172A] tracking-tight">
            Ready to deploy GEODAR in your municipality?
          </h2>
          <p className="text-xs sm:text-sm text-[#64647A] max-w-xl mx-auto leading-relaxed font-medium">
            Connect your municipal GIS layers or start a pilot survey with our mobile and drone detection pipelines.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setShowPilotForm(!showPilotForm)}
              className="px-6 py-3 bg-[#27187E] hover:bg-[#35248F] text-white font-bold uppercase tracking-wider text-xs rounded-sm shadow-sm transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{showPilotForm ? 'Close Pilot Inquiry' : 'Request Municipal Pilot'}</span>
            </button>
            <button
              onClick={() => navigateTo('/map')}
              className="px-6 py-3 bg-[#F7F7FF] hover:bg-[#ECEBFC] text-[#27187E] border border-[#C5C0EF] font-bold uppercase tracking-wider text-xs rounded-sm transition-colors flex items-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              <span>Explore Live City Grid</span>
            </button>
          </div>

          {/* Collapsible Pilot Form */}
          {showPilotForm && (
            <div className="mt-8 pt-8 border-t border-[#E5E4F0] text-left max-w-2xl mx-auto">
              {submitted ? (
                <div className="bg-[#ECEBFC] border border-[#C5C0EF] p-6 rounded-sm text-center space-y-3">
                  <div className="w-12 h-12 rounded-sm bg-[#27187E] text-white flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-black text-[#17172A]">Pilot Request Registered</h3>
                  <p className="text-xs text-[#64647A] max-w-md mx-auto">
                    Thank you, <strong>{pilotData.name}</strong>. Our urban infrastructure engineering team has received your requisition for <strong>{pilotData.organization || pilotData.city}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setShowPilotForm(false);
                      setPilotData({
                        name: '',
                        organization: '',
                        email: '',
                        phone: '',
                        sector: 'Municipalities & ULBs',
                        city: '',
                        notes: ''
                      });
                    }}
                    className="px-4 py-2 bg-[#27187E] text-white text-xs font-bold uppercase tracking-wider rounded-sm"
                  >
                    Submit Another Requisition
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePilotSubmit} className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-[#E5E4F0]">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#17172A]">
                      Municipal Deployment Requisition
                    </span>
                    <span className="text-[10px] text-[#27187E] font-bold uppercase bg-[#ECEBFC] px-2 py-0.5 rounded-sm">
                      InsForge Cloud Sync
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#17172A] mb-1">
                        Contact Person Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={pilotData.name}
                        onChange={(e) => setPilotData({ ...pilotData, name: e.target.value })}
                        placeholder="e.g. Er. Rajesh Sharma"
                        className="w-full px-3 py-2 bg-[#F7F7FF] border border-[#E5E4F0] rounded-sm text-xs font-medium text-[#17172A] focus:outline-none focus:ring-2 focus:ring-[#27187E]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#17172A] mb-1">
                        Agency / Municipality *
                      </label>
                      <input
                        type="text"
                        required
                        value={pilotData.organization}
                        onChange={(e) => setPilotData({ ...pilotData, organization: e.target.value })}
                        placeholder="e.g. Pune Municipal Corporation (PMC)"
                        className="w-full px-3 py-2 bg-[#F7F7FF] border border-[#E5E4F0] rounded-sm text-xs font-medium text-[#17172A] focus:outline-none focus:ring-2 focus:ring-[#27187E]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#17172A] mb-1">
                        Official Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={pilotData.email}
                        onChange={(e) => setPilotData({ ...pilotData, email: e.target.value })}
                        placeholder="name@gov.in or official email"
                        className="w-full px-3 py-2 bg-[#F7F7FF] border border-[#E5E4F0] rounded-sm text-xs font-medium text-[#17172A] focus:outline-none focus:ring-2 focus:ring-[#27187E]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#17172A] mb-1">
                        Target City / Region *
                      </label>
                      <input
                        type="text"
                        required
                        value={pilotData.city}
                        onChange={(e) => setPilotData({ ...pilotData, city: e.target.value })}
                        placeholder="e.g. Pune, Maharashtra"
                        className="w-full px-3 py-2 bg-[#F7F7FF] border border-[#E5E4F0] rounded-sm text-xs font-medium text-[#17172A] focus:outline-none focus:ring-2 focus:ring-[#27187E]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#17172A] mb-1">
                        Target Sector
                      </label>
                      <select
                        value={pilotData.sector}
                        onChange={(e) => setPilotData({ ...pilotData, sector: e.target.value })}
                        className="w-full px-3 py-2 bg-[#F7F7FF] border border-[#E5E4F0] rounded-sm text-xs font-medium text-[#17172A] focus:outline-none focus:ring-2 focus:ring-[#27187E]"
                      >
                        <option value="Municipalities & ULBs">Municipalities &amp; ULBs</option>
                        <option value="Public Works (PWD)">Public Works (PWD)</option>
                        <option value="Smart Cities Mission">Smart Cities Mission</option>
                        <option value="Disaster Management">Disaster Management</option>
                        <option value="Highway Concessionaire">Highway Concessionaire</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-[#17172A] mb-1">
                        Phone / Dispatch Contact
                      </label>
                      <input
                        type="tel"
                        value={pilotData.phone}
                        onChange={(e) => setPilotData({ ...pilotData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3 py-2 bg-[#F7F7FF] border border-[#E5E4F0] rounded-sm text-xs font-medium text-[#17172A] focus:outline-none focus:ring-2 focus:ring-[#27187E]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#17172A] mb-1">
                      Project Requirements &amp; Scope
                    </label>
                    <textarea
                      rows={3}
                      value={pilotData.notes}
                      onChange={(e) => setPilotData({ ...pilotData, notes: e.target.value })}
                      placeholder="Specify road network length, expected data sources (drone/patrol/citizen), or specific municipal wards..."
                      className="w-full px-3 py-2 bg-[#F7F7FF] border border-[#E5E4F0] rounded-sm text-xs font-medium text-[#17172A] focus:outline-none focus:ring-2 focus:ring-[#27187E]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#27187E] hover:bg-[#35248F] disabled:opacity-60 text-white font-bold uppercase tracking-wider text-xs rounded-sm shadow-sm transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Requisition...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Pilot Requisition to Command Center</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
