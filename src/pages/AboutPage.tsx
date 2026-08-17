import React from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/common/Logo';
import { 
  ShieldCheck, 
  MapPin, 
  Cpu, 
  Users, 
  Globe2, 
  Building, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  Compass
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="w-full bg-[#F7F7FF] text-[#17172A] space-y-16 pb-20">
      {/* Hero Header */}
      <section className="bg-[#1B105A] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#35248F]">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Government Association statement */}
          <div className="inline-flex items-center gap-2 bg-[#27187E] border border-[#5D4CB7] px-3.5 py-1.5 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] text-[#DEDDF7]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>In association with the Government</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-3xl leading-tight">
            Building the Intelligence Layer for India’s Physical Infrastructure.
          </h1>

          <p className="text-sm sm:text-base text-[#C5C0EF] max-w-2xl leading-relaxed font-medium">
            GEODAR was founded to transform how Indian cities monitor, maintain, and safeguard civic assets through advanced geospatial intelligence and predictive AI.
          </p>
        </div>
      </section>

      {/* Mission & Brand Core */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-sm border border-[#E5E4F0] p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#27187E] bg-[#ECEBFC] px-3 py-1 rounded-sm">
              Our Purpose
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#17172A] tracking-tight">
              understand. predict. protect
            </h2>
            <p className="text-sm text-[#64647A] leading-relaxed font-medium">
              India’s rapid urban expansion demands infrastructure monitoring that scales ahead of degradation. Millions of citizens rely daily on roadways, flyovers, drainage channels, and municipal utility networks.
            </p>
            <p className="text-sm text-[#64647A] leading-relaxed font-medium">
              By merging multi-source geospatial telemetry with computer vision and hydrodynamic risk models, GEODAR eliminates blind spots, equips engineers with actionable prioritization, and ensures safer, resilient urban spaces.
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold text-[#17172A]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Geospatial AI &amp; Multi-Spectral GIS</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Transparent Municipal Prioritization</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>30-Day Failure Forecasting</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Decentralized Field Citizen Auditing</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#141427] rounded-sm p-8 border border-[#35248F] flex flex-col items-center justify-center text-center space-y-4 shadow-xl">
            <Logo size="xl" showText={true} showTagline={true} inverted={true} />
            <div className="pt-4 border-t border-[#35248F] w-full text-center space-y-1">
              <span className="text-[10px] font-mono font-bold text-[#A9A0E2] uppercase tracking-widest block">
                Spatial Datum
              </span>
              <p className="text-xs text-white font-bold">
                Pilot Deployment: Raipur, Chhattisgarh
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Founders Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#27187E] bg-[#ECEBFC] px-3 py-1 rounded-sm">
            Leadership
          </span>
          <h2 className="text-3xl font-black text-[#17172A] tracking-tight">
            Founding Team
          </h2>
          <p className="text-sm text-[#64647A] font-medium">
            Dedicated to advancing geospatial intelligence for resilient public infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Founder Card */}
          <div className="bg-white rounded-sm border border-[#E5E4F0] p-6 shadow-sm hover:border-[#8E82D5] transition-all text-center space-y-4">
            <div className="w-20 h-20 rounded-sm bg-[#27187E] text-white flex items-center justify-center text-xl font-black mx-auto shadow-sm">
              AW
            </div>
            <div>
              <h3 className="text-lg font-black text-[#17172A]">Anubhav Wadekar</h3>
              <p className="text-xs font-bold text-[#27187E] uppercase tracking-[0.15em] mt-0.5">
                Founder
              </p>
            </div>
            <div className="pt-3 border-t border-[#E5E4F0] text-xs text-[#64647A] font-medium">
              GEODAR Geospatial Platform &bull; Systems Architecture
            </div>
          </div>

          {/* Co-Founder Card 1 */}
          <div className="bg-white rounded-sm border border-[#E5E4F0] p-6 shadow-sm hover:border-[#8E82D5] transition-all text-center space-y-4">
            <div className="w-20 h-20 rounded-sm bg-[#35248F] text-white flex items-center justify-center text-xl font-black mx-auto shadow-sm">
              NS
            </div>
            <div>
              <h3 className="text-lg font-black text-[#17172A]">Navya Sharma</h3>
              <p className="text-xs font-bold text-[#27187E] uppercase tracking-[0.15em] mt-0.5">
                Co-Founder
              </p>
            </div>
            <div className="pt-3 border-t border-[#E5E4F0] text-xs text-[#64647A] font-medium">
              Urban Risk Intelligence &bull; Spatial Analysis
            </div>
          </div>

          {/* Co-Founder Card 2 */}
          <div className="bg-white rounded-sm border border-[#E5E4F0] p-6 shadow-sm hover:border-[#8E82D5] transition-all text-center space-y-4">
            <div className="w-20 h-20 rounded-sm bg-[#4937A3] text-white flex items-center justify-center text-xl font-black mx-auto shadow-sm">
              PS
            </div>
            <div>
              <h3 className="text-lg font-black text-[#17172A]">Palak Sharma</h3>
              <p className="text-xs font-bold text-[#27187E] uppercase tracking-[0.15em] mt-0.5">
                Co-Founder
              </p>
            </div>
            <div className="pt-3 border-t border-[#E5E4F0] text-xs text-[#64647A] font-medium">
              Civic Operations &bull; GovTech Partnerships
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1B105A] text-white rounded-sm p-8 sm:p-12 text-center space-y-6 shadow-xl border border-[#35248F]">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Explore the Live Intelligence Map
          </h2>
          <p className="text-xs sm:text-sm text-[#C5C0EF] max-w-lg mx-auto font-medium">
            Interact with live demo markers, explore telemetry layers, and experience how GEODAR predicts infrastructure risk.
          </p>
          <button
            onClick={() => navigateTo('/map')}
            className="px-6 py-3 bg-[#27187E] hover:bg-[#35248F] text-white font-bold uppercase tracking-wider text-xs rounded-sm shadow-sm transition-all inline-flex items-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            <span>Open Intelligence Map</span>
          </button>
        </div>
      </section>
    </div>
  );
};
