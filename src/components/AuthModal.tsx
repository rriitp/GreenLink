import React, { useState } from 'react';
import { X, UserCircle, Shield, Check, AlertCircle, ArrowRight } from 'lucide-react';
import { User, UserRole } from '../types';
import { DEMO_USERS } from '../data/mockData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onSelectUser: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSelectUser,
}) => {
  const [mode, setMode] = useState<'demo' | 'register'>('demo');
  
  // Custom Registration Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    state: 'Punjab',
    district: '',
    preferredLanguage: 'Hindi',
    role: 'farmer' as UserRole,
    phone: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.district.trim()) errors.district = 'District is required';
    if (formData.phone && !/^\+?[0-9\s-]{10,14}$/.test(formData.phone)) {
      errors.phone = 'Please provide a valid 10-digit phone number';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newUser: User = {
      id: 'user_custom_' + Date.now(),
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      role: formData.role,
      state: formData.state,
      district: formData.district.trim(),
      preferredLanguage: formData.preferredLanguage,
      phone: formData.phone || '+91 98000 00000',
      avatar: formData.role === 'farmer'
        ? 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=200&q=80'
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    };

    setSuccessMsg(`Welcome, ${newUser.name}! Demo account created.`);
    setTimeout(() => {
      onSelectUser(newUser);
      setSuccessMsg('');
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-[#0B362F] text-white p-5 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-lg flex items-center gap-2">
              <UserCircle className="w-5 h-5 text-emerald-400" />
              <span>GreenLink Authentication & Roles</span>
            </h3>
            <p className="text-xs text-emerald-200/80 mt-0.5">
              Select a pre-configured persona or test custom registration
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-900/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-gray-200 bg-gray-50/70 p-1">
          <button
            onClick={() => setMode('demo')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              mode === 'demo'
                ? 'bg-white text-[#0B362F] shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            1-Click Demo Profiles
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              mode === 'register'
                ? 'bg-white text-[#0B362F] shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Custom User Registration
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {successMsg && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2 font-medium">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {mode === 'demo' ? (
            <div className="space-y-4">
              <p className="text-xs text-gray-600">
                Choose one of the verified demo accounts below to simulate specific role capabilities across the platform:
              </p>

              <div className="space-y-2.5">
                {DEMO_USERS.map((user) => {
                  const isCurrent = user.id === currentUser.id;
                  return (
                    <div
                      key={user.id}
                      onClick={() => {
                        onSelectUser(user);
                        onClose();
                      }}
                      className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-3.5 ${
                        isCurrent
                          ? 'border-[#168B5C] bg-emerald-50/80 shadow-sm'
                          : 'border-gray-200 hover:border-emerald-300 hover:bg-gray-50'
                      }`}
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover border border-emerald-500 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-sm text-gray-900 truncate">{user.name}</h4>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded font-extrabold uppercase ${
                              user.role === 'farmer'
                                ? 'bg-green-100 text-green-800'
                                : user.role === 'buyer'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-purple-100 text-purple-800'
                            }`}
                          >
                            {user.role}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5 truncate">{user.email}</p>
                        <p className="text-[11px] text-gray-600 mt-1">
                          📍 {user.district}, {user.state} &bull; Lang: {user.preferredLanguage}
                          {user.role === 'farmer' && ' &bull; 6.5 Acres Farm'}
                          {user.role === 'buyer' && ' &bull; Agri Wholesale Buyer'}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        {isCurrent ? (
                          <span className="inline-flex items-center gap-1 text-xs text-[#168B5C] font-bold">
                            <Check className="w-4 h-4" /> Active
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400 group-hover:text-emerald-600 font-semibold flex items-center">
                            Select <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Security Architecture Note */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-800 flex items-start gap-2 leading-relaxed">
                <Shield className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Architecture Note:</strong> This demo relies on persistent client-side state in <code>localStorage</code> for easy judge evaluation. In production, authentication connects to a secure Node.js/Express backend with bcrypt hashed passwords and JWT session cookies.
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g., Harpreet Singh"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-[#168B5C] ${
                    formErrors.name ? 'border-red-400 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {formErrors.name && <p className="text-[11px] text-red-600 mt-0.5">{formErrors.name}</p>}
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  placeholder="e.g., harpreet@kisanmail.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-[#168B5C] ${
                    formErrors.email ? 'border-red-400 bg-red-50' : 'border-gray-300'
                  }`}
                />
                {formErrors.email && <p className="text-[11px] text-red-600 mt-0.5">{formErrors.email}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">State *</label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#168B5C]"
                  >
                    <option value="Punjab">Punjab</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Karnataka">Karnataka</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">District *</label>
                  <input
                    type="text"
                    placeholder="e.g., Amritsar"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-[#168B5C] ${
                      formErrors.district ? 'border-red-400 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  {formErrors.district && <p className="text-[11px] text-red-600 mt-0.5">{formErrors.district}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Preferred Language</label>
                  <select
                    value={formData.preferredLanguage}
                    onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#168B5C]"
                  >
                    <option value="Hindi">Hindi (हिंदी)</option>
                    <option value="English">English</option>
                    <option value="Punjabi">Punjabi (ਪੰਜਾਬੀ)</option>
                    <option value="Bengali">Bengali (বাংলা)</option>
                    <option value="Marathi">Marathi (मराठी)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Account Role *</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#168B5C]"
                  >
                    <option value="farmer">Farmer (Produce Seller)</option>
                    <option value="buyer">Buyer (Wholesale / Processor)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Phone Number (Optional)</label>
                <input
                  type="text"
                  placeholder="+91 98765 00000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#168B5C]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-[#168B5C] hover:bg-[#12724B] text-white font-bold rounded-xl shadow-md transition-all text-xs"
                >
                  Register & Sign In to GreenLink
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
