import React from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from './Logo';
import { Shield, Sparkles, MapPin, ExternalLink, Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="bg-[#17172A] text-white border-t border-[#35248F]/30 pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" showText={true} showTagline={true} inverted={true} />
            <p className="text-sm font-semibold tracking-wider text-[#A9A0E2] uppercase pt-1">
              SEE INFRASTRUCTURE BEFORE IT FAILS.
            </p>
            <p className="text-xs text-[#E5E4F0]/80 leading-relaxed max-w-sm">
              GEODAR is an AI-powered geospatial intelligence platform combining edge computer vision, multi-source spatial telemetry, and predictive risk analytics to safeguard urban infrastructure in Indian cities.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#C5C0EF]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>In association with the Government</span>
            </div>
          </div>

          {/* Platform & Solutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#A9A0E2]">Platform</h4>
            <ul className="space-y-2 text-xs text-[#E5E4F0]/80">
              <li>
                <button onClick={() => navigateTo('/platform')} className="hover:text-white transition-colors">
                  Core Architecture
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/map')} className="hover:text-white transition-colors">
                  Intelligence Map
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/ai-detection')} className="hover:text-white transition-colors">
                  AI Detection Engine
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/solutions')} className="hover:text-white transition-colors">
                  City Solutions
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('/dashboard')} className="hover:text-white transition-colors">
                  Command Dashboard
                </button>
              </li>
            </ul>
          </div>

          {/* Solutions by Sector */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#A9A0E2]">Sectors</h4>
            <ul className="space-y-2 text-xs text-[#E5E4F0]/80">
              <li><button onClick={() => navigateTo('/solutions')} className="hover:text-white transition-colors">Municipalities & ULBs</button></li>
              <li><button onClick={() => navigateTo('/solutions')} className="hover:text-white transition-colors">Public Works (PWD)</button></li>
              <li><button onClick={() => navigateTo('/solutions')} className="hover:text-white transition-colors">Smart Cities Mission</button></li>
              <li><button onClick={() => navigateTo('/solutions')} className="hover:text-white transition-colors">Disaster Management</button></li>
              <li><button onClick={() => navigateTo('/solutions')} className="hover:text-white transition-colors">Citizen Reporting Grid</button></li>
            </ul>
          </div>

          {/* Leadership & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#A9A0E2]">Leadership & Company</h4>
            <div className="space-y-2 text-xs text-[#E5E4F0]/80">
              <div>
                <p className="font-semibold text-white">Anubhav Wadekar</p>
                <p className="text-[11px] text-[#A9A0E2]">Founder</p>
              </div>
              <div className="pt-1">
                <p className="font-semibold text-white">Navya Sharma &amp; Palak Sharma</p>
                <p className="text-[11px] text-[#A9A0E2]">Co-Founders</p>
              </div>
              <div className="pt-2 border-t border-white/10 flex flex-col gap-1.5 text-[11px]">
                <button onClick={() => navigateTo('/about')} className="hover:text-white text-left transition-colors">About Mission</button>
                <span className="text-[#64647A]">Privacy Policy &bull; Terms of Service</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Editorial Aesthetic Layout */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#A9A0E2] font-semibold gap-4 uppercase tracking-wider">
          <p>© {new Date().getFullYear()} GEODAR — AI-Powered Geospatial Intelligence</p>
          <div className="flex items-center gap-6">
            <span>Anubhav Wadekar</span>
            <span>Navya Sharma</span>
            <span>Palak Sharma</span>
          </div>
          <div className="text-white/80">Raipur, Chhattisgarh</div>
        </div>
      </div>
    </footer>
  );
};
