import React from 'react';
import { Sprout, Shield, RefreshCw, ExternalLink, Award, Users } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  onResetData: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab, onResetData }) => {
  return (
    <footer className="bg-[#0B362F] text-emerald-100 border-t border-emerald-900/60 mt-16">
      {/* Hackathon Distinction Banner */}
      <div className="bg-[#082823] py-4 px-4 sm:px-8 border-b border-emerald-900/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-700/50 flex items-center justify-center shrink-0">
              <Award className="w-4 h-4 text-emerald-300" />
            </div>
            <div>
              <span className="font-bold text-white tracking-wide">Hackoverflow 10.0</span>
              <span className="text-emerald-300 ml-2">National Institute of Technology (NIT), Durgapur</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="bg-emerald-900/80 px-2.5 py-1 rounded text-emerald-200 border border-emerald-700/50 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span>Team <strong>HackForge</strong></span>
            </span>
            <span className="text-emerald-300/80">Leader: <strong>Rahul Raj</strong> &bull; Member: <strong>Rajan Aryan</strong></span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#168B5C] flex items-center justify-center">
                <Sprout className="w-5 h-5 text-white" />
              </div>
              <span className="font-extrabold text-lg text-white">GreenLink</span>
            </div>
            <p className="text-xs text-emerald-200/80 leading-relaxed">
              Empowering Indian farmers through transparent crop price discovery, direct buyer linkage, verified government scheme access, and intelligent AI agricultural advisory.
            </p>
            <div className="pt-2">
              <button
                onClick={onResetData}
                className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 bg-amber-950/60 border border-amber-700/50 px-2.5 py-1.5 rounded-lg transition-colors"
                title="Resets local demo crops and enquiries back to initial state"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Demo Data</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">Core Modules</h4>
            <ul className="space-y-2 text-xs text-emerald-200/90">
              <li>
                <button onClick={() => setCurrentTab('marketplace')} className="hover:text-white transition-colors">
                  Crop Marketplace
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('prices')} className="hover:text-white transition-colors">
                  Mandi Price Benchmarks
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('weather')} className="hover:text-white transition-colors">
                  Agromet Weather Advisory
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('schemes')} className="hover:text-white transition-colors">
                  Government Schemes Directory
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('ai-assistant')} className="hover:text-white transition-colors">
                  Kisan Saathi AI Assistant
                </button>
              </li>
            </ul>
          </div>

          {/* Dashboards */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3">Role Dashboards</h4>
            <ul className="space-y-2 text-xs text-emerald-200/90">
              <li>
                <button onClick={() => setCurrentTab('farmer-dashboard')} className="hover:text-white transition-colors">
                  Farmer Dashboard (Ramesh Kumar)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('buyer-dashboard')} className="hover:text-white transition-colors">
                  Buyer Dashboard (Anita Sharma)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('admin-dashboard')} className="hover:text-white transition-colors">
                  Admin Moderation Portal (Dr. Sen)
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentTab('about')} className="hover:text-white transition-colors">
                  About & Architecture Design
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Transparency */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-emerald-300" />
              <span>Transparency Note</span>
            </h4>
            <p className="text-[11px] text-emerald-200/70 leading-relaxed">
              All official scheme links connect directly to authorized Government of India portals (such as <code>pmkisan.gov.in</code> and <code>pmfby.gov.in</code>).
            </p>
            <p className="text-[11px] text-emerald-200/70 leading-relaxed">
              Mandi prices and weather advisories in this prototype represent demonstration datasets structured after Agmarknet and IMD agromet feeds.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-emerald-900/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-emerald-300/60">
          <div>
            &copy; 2026 GreenLink AgriTech. Built for Hackoverflow 10.0, NIT Durgapur by Team HackForge.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[11px]">Designed with React &bull; Tailwind CSS &bull; Gemini 3.8 Flash &bull; Express</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
