import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/common/Logo';
import { Mail, Lock, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { navigateTo, addToast, login } = useApp();
  const [email, setEmail] = useState('anubhav.w@geodar.io');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide valid email and password credentials.');
      return;
    }

    setError('');
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      navigateTo('/dashboard');
    } else {
      setError(result.error || 'Authentication failed. Please check credentials.');
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 bg-[#F7F7FF]">
      <div className="max-w-md w-full bg-white rounded-sm border border-[#E5E4F0] p-6 sm:p-10 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <button onClick={() => navigateTo('/')} className="inline-block">
            <Logo size="lg" showText={true} showTagline={false} />
          </button>
          <h2 className="text-2xl font-black text-[#17172A] tracking-tight">
            Command Center Login
          </h2>
          <p className="text-xs text-[#64647A] font-medium">
            Access municipal geospatial telemetry and dispatch operations
          </p>
        </div>

        {/* Demo Fast Login Banner */}
        <div className="bg-[#ECEBFC] border border-[#C5C0EF] rounded-sm p-3 text-xs text-[#27187E] flex items-center justify-between">
          <span className="font-bold">Demo Mode: Credentials pre-filled</span>
          <button
            type="button"
            onClick={() => {
              setEmail('anubhav.w@geodar.io');
              setPassword('demo2026');
            }}
            className="text-[11px] font-bold uppercase tracking-wider underline hover:text-[#1B105A]"
          >
            Auto-fill
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#17172A] mb-1.5">
              Official Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="officer@municipality.gov.in"
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#E5E4F0] rounded-sm text-xs font-medium text-[#17172A] focus:outline-none focus:ring-2 focus:ring-[#27187E]"
              />
              <Mail className="w-4 h-4 text-[#8E82D5] absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#17172A]">
                Password
              </label>
              <button
                type="button"
                onClick={() => addToast({ type: 'info', title: 'Password Reset', message: 'Demo password reset instructions sent.' })}
                className="text-xs text-[#27187E] font-bold uppercase tracking-wider hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#E5E4F0] rounded-sm text-xs font-medium text-[#17172A] focus:outline-none focus:ring-2 focus:ring-[#27187E]"
              />
              <Lock className="w-4 h-4 text-[#8E82D5] absolute left-3 top-3" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-xs text-[#64647A] cursor-pointer font-medium">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-[#27187E] rounded-sm"
              />
              <span>Remember this workstation</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#27187E] hover:bg-[#35248F] active:bg-[#1B105A] text-white font-bold uppercase tracking-wider text-xs rounded-sm shadow-sm transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Authenticating Session...</span>
            ) : (
              <>
                <span>Sign In to GEODAR</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-[#E5E4F0] text-center text-xs text-[#64647A] font-medium">
          Don’t have an account?{' '}
          <button
            onClick={() => navigateTo('/register')}
            className="text-[#27187E] font-bold uppercase tracking-wider hover:underline ml-1"
          >
            Create an account
          </button>
        </div>
      </div>
    </div>
  );
};
