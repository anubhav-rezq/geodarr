import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AccountType } from '../types';
import { Logo } from '../components/common/Logo';
import { User, Mail, Phone, Lock, MapPin, Building, ArrowRight } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { navigateTo, addToast, register } = useApp();

  const [formData, setFormData] = useState({
    fullName: 'Anubhav Wadekar',
    email: 'anubhav.w@geodar.io',
    phone: '+91 98261 40592',
    password: 'password123',
    confirmPassword: 'password123',
    location: 'Raipur, Chhattisgarh',
    accountType: 'Government' as AccountType
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setError('');
    setLoading(true);

    const result = await register({
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      location: formData.location,
      accountType: formData.accountType
    });

    setLoading(false);

    if (result.success) {
      navigateTo('/dashboard');
    } else {
      setError(result.error || 'Registration failed.');
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 bg-[#F7F7FF]">
      <div className="max-w-lg w-full bg-white rounded-sm border border-[#E5E4F0] p-6 sm:p-10 shadow-sm space-y-6">
        <div className="text-center space-y-2">
          <button onClick={() => navigateTo('/')} className="inline-block">
            <Logo size="lg" showText={true} showTagline={false} />
          </button>
          <h2 className="text-2xl font-black text-[#17172A] tracking-tight">
            Create GEODAR Account
          </h2>
          <p className="text-xs text-[#64647A] font-medium">
            Join the municipal spatial intelligence network
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Account Type Selector */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-[#17172A] mb-1.5">
              Account Role
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Citizen', 'Field Worker', 'Government'] as AccountType[]).map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setFormData({ ...formData, accountType: type })}
                  className={`py-2 px-3 rounded-sm border text-xs font-bold uppercase tracking-wider transition-all text-center ${
                    formData.accountType === type
                      ? 'bg-[#27187E] text-white border-[#27187E] shadow-sm'
                      : 'bg-[#F7F7FF] text-[#17172A] border-[#E5E4F0] hover:bg-[#ECEBFC]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#17172A] mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Anubhav Wadekar"
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#E5E4F0] rounded-sm text-xs font-medium text-[#17172A] focus:outline-none focus:ring-2 focus:ring-[#27187E]"
                />
                <User className="w-4 h-4 text-[#8E82D5] absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#17172A] mb-1.5">
                Official Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="anubhav.w@geodar.io"
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#E5E4F0] rounded-sm text-xs font-medium text-[#17172A] focus:outline-none focus:ring-2 focus:ring-[#27187E]"
                />
                <Mail className="w-4 h-4 text-[#8E82D5] absolute left-3 top-2.5" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#17172A] mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98261 40592"
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#E5E4F0] rounded-sm text-xs font-medium text-[#17172A] focus:outline-none focus:ring-2 focus:ring-[#27187E]"
                />
                <Phone className="w-4 h-4 text-[#8E82D5] absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#17172A] mb-1.5">
                City / Ward Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Raipur, Chhattisgarh"
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#E5E4F0] rounded-sm text-xs font-medium text-[#17172A] focus:outline-none focus:ring-2 focus:ring-[#27187E]"
                />
                <MapPin className="w-4 h-4 text-[#8E82D5] absolute left-3 top-2.5" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#17172A] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#E5E4F0] rounded-sm text-xs font-medium text-[#17172A] focus:outline-none focus:ring-2 focus:ring-[#27187E]"
                />
                <Lock className="w-4 h-4 text-[#8E82D5] absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#17172A] mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#E5E4F0] rounded-sm text-xs font-medium text-[#17172A] focus:outline-none focus:ring-2 focus:ring-[#27187E]"
                />
                <Lock className="w-4 h-4 text-[#8E82D5] absolute left-3 top-2.5" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#27187E] hover:bg-[#35248F] active:bg-[#1B105A] text-white font-bold uppercase tracking-wider text-xs rounded-sm shadow-sm transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Provisioning Profile...</span>
            ) : (
              <>
                <span>Complete Registration &amp; Open Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-[#E5E4F0] text-center text-xs text-[#64647A] font-medium">
          Already registered?{' '}
          <button
            onClick={() => navigateTo('/login')}
            className="text-[#27187E] font-bold uppercase tracking-wider hover:underline ml-1"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};
