import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from './Logo';
import { 
  Layers, 
  MapPin, 
  ScanEye, 
  Cpu, 
  Info, 
  LayoutDashboard, 
  Menu, 
  X, 
  ChevronRight, 
  ArrowRight,
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPath, navigateTo, user } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Platform', path: '/platform', icon: Cpu },
    { label: 'Intelligence Map', path: '/map', icon: MapPin },
    { label: 'AI Detection', path: '/ai-detection', icon: ScanEye },
    { label: 'Solutions', path: '/solutions', icon: Layers },
    { label: 'About', path: '/about', icon: Info },
  ];

  const handleNavClick = (path: string) => {
    navigateTo(path);
    setMobileMenuOpen(false);
  };

  const isDashboardView = ['/dashboard', '/reports', '/profile'].includes(currentPath) || currentPath.startsWith('/report/');

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      {/* Micro-top bar: Government Association Statement */}
      <div className="bg-[#1B105A] text-[#DEDDF7] py-1 px-4 text-xs border-b border-[#35248F]/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8E82D5] animate-pulse" />
            <span className="opacity-90">In association with the Government</span>
            <span className="hidden sm:inline text-[#A9A0E2]/60">•</span>
            <span className="hidden sm:inline text-[11px] text-[#A9A0E2]">Smart Urban Infrastructure & Geospatial Risk Grid</span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="hidden md:inline text-[#C5C0EF]/80">Raipur Pilot Network: Active</span>
            <span className="font-mono text-emerald-300 font-semibold bg-[#27187E] px-2 py-0.5 rounded border border-[#5D4CB7]/40">
              AI GRID v2.4
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-200 bg-white/95 backdrop-blur-md border-b ${
          scrolled ? 'border-[#E5E4F0] shadow-sm shadow-[#27187E]/5' : 'border-[#E5E4F0]/80'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('/')}
              className="flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#27187E] rounded p-1 -ml-1 transition-opacity hover:opacity-90 shrink-0"
            >
              <Logo size="md" showText={true} showTagline={true} />
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-5 xl:gap-8 text-sm font-semibold text-[#64647A] shrink-0">
              {navLinks.map((link) => {
                const isActive = currentPath === link.path;
                return (
                  <button
                    key={link.path}
                    onClick={() => handleNavClick(link.path)}
                    className={`py-5 transition-all relative font-semibold whitespace-nowrap ${
                      isActive
                        ? 'text-[#27187E] border-b-2 border-[#27187E]'
                        : 'text-[#64647A] hover:text-[#17172A]'
                    }`}
                  >
                    <span>{link.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Desktop Auth / Quick Access CTAs */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              {isDashboardView ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleNavClick('/reports')}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-colors border ${
                      currentPath === '/reports'
                        ? 'bg-[#ECEBFC] border-[#A9A0E2] text-[#27187E]'
                        : 'border-[#E5E4F0] text-[#64647A] hover:text-[#17172A] hover:bg-[#F7F7FF]'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <FileSpreadsheet className="w-3.5 h-3.5" />
                      Reports
                    </span>
                  </button>
                  <button
                    onClick={() => handleNavClick('/profile')}
                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 bg-[#F7F7FF] hover:bg-[#ECEBFC] border border-[#E5E4F0] rounded-sm transition-colors text-xs font-bold text-[#17172A]"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#27187E] text-white flex items-center justify-center font-mono font-bold text-[10px]">
                      {user.name.slice(0, 2).toUpperCase()}
                    </div>
                    <span>{user.name.split(' ')[0]}</span>
                  </button>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => handleNavClick('/login')}
                    className="px-5 py-2 text-sm font-bold border border-[#27187E] text-[#27187E] hover:bg-[#ECEBFC] rounded-sm transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleNavClick('/dashboard')}
                    className="px-5 py-2 text-sm font-bold bg-[#27187E] hover:bg-[#35248F] active:bg-[#1B105A] text-white rounded-sm shadow-md transition-all flex items-center gap-2"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => handleNavClick('/dashboard')}
                className="px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-[#27187E] rounded-sm shadow-sm"
              >
                Dashboard
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-[#64647A] hover:text-[#17172A] hover:bg-[#F7F7FF] rounded-sm border border-[#E5E4F0] transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#E5E4F0] bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-2">
            <div className="py-2 border-b border-[#E5E4F0] flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#64647A]">Navigation Menu</span>
              <span className="text-[9px] font-bold text-[#27187E] uppercase">GovTech AI</span>
            </div>
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`w-full px-3 py-2.5 text-sm font-semibold rounded-sm transition-colors flex items-center justify-between ${
                    isActive
                      ? 'text-[#27187E] bg-[#ECEBFC] font-bold'
                      : 'text-[#64647A] hover:text-[#17172A] hover:bg-[#F7F7FF]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#27187E]' : 'text-[#64647A]'}`} />
                    <span>{link.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#8E82D5]" />
                </button>
              );
            })}

            <div className="pt-3 border-t border-[#E5E4F0] space-y-2">
              <button
                onClick={() => handleNavClick('/dashboard')}
                className="w-full px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-white bg-[#27187E] rounded-sm flex items-center justify-center gap-2 shadow-md"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Command Dashboard</span>
              </button>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => handleNavClick('/login')}
                  className="w-full py-2 text-center text-xs font-bold border border-[#27187E] text-[#27187E] bg-white hover:bg-[#ECEBFC] rounded-sm"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNavClick('/register')}
                  className="w-full py-2 text-center text-xs font-bold text-[#17172A] border border-[#E5E4F0] hover:bg-[#F7F7FF] rounded-sm"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
