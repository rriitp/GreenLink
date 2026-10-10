import React from 'react';
import {
  Sprout,
  Award,
  Users,
  Target,
  ShieldCheck,
  TrendingUp,
  Cpu,
  Layers,
  Database,
  ExternalLink,
  Code
} from 'lucide-react';
import { MONGODB_ARCHITECTURE_DOCS } from '../services/dbSchema';

interface AboutPageProps {
  setCurrentTab: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setCurrentTab }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#168B5C] text-xs font-bold">
          <Award className="w-4 h-4" />
          <span>Hackoverflow 10.0 &bull; NIT Durgapur Finalist Submission</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          About GreenLink & Team HackForge
        </h1>
        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
          Bridging information asymmetry, eliminating predatory mandi deductions, and empowering Indian cultivators through fair price discovery and AI-assisted agricultural advisory.
        </p>
      </div>

      {/* Hackathon Credentials & Team Box */}
      <div className="bg-[#0B362F] text-white p-8 rounded-3xl shadow-xl border border-emerald-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-emerald-800/80">
          <div>
            <span className="text-xs text-emerald-300 font-bold uppercase tracking-wider block">Hackathon Profile</span>
            <h2 className="text-xl font-extrabold text-white mt-1">Hackoverflow 10.0 &bull; NIT Durgapur</h2>
          </div>
          <div className="flex items-center gap-2 bg-emerald-900/80 px-4 py-2 rounded-xl border border-emerald-700/60">
            <span className="text-xs font-bold text-emerald-200">Team Name:</span>
            <span className="text-sm font-extrabold text-white">HackForge</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-[#082823] border border-emerald-700/50 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[#168B5C] flex items-center justify-center font-bold text-white text-sm">
              RR
            </div>
            <h3 className="font-extrabold text-base text-white">Rahul Raj</h3>
            <p className="text-xs text-emerald-300 font-semibold">Team Leader & Full-Stack Architect</p>
            <p className="text-xs text-emerald-100/70 leading-relaxed">
              Leading application architecture, Gemini API server orchestration, data models, and mandi price analytics engine.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#082823] border border-emerald-700/50 space-y-2">
            <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center font-bold text-white text-sm">
              RA
            </div>
            <h3 className="font-extrabold text-base text-white">Rajan Aryan</h3>
            <p className="text-xs text-teal-300 font-semibold">Team Member & Frontend / UX Engineer</p>
            <p className="text-xs text-emerald-100/70 leading-relaxed">
              Designing accessible agricultural interfaces, multi-role dashboard state, government scheme verification, and responsive mobile layouts.
            </p>
          </div>
        </div>

        {/* Academic / College Curriculum Stack Highlight */}
        <div className="pt-4 border-t border-emerald-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-emerald-950/60 p-4 rounded-xl border border-emerald-700/40">
          <div>
            <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
              <span>📚 Academic & College Curriculum Implementation</span>
            </span>
            <p className="text-xs text-emerald-100/80 mt-0.5">
              Built using <strong>HTML5, CSS3, JavaScript, EJS, MongoDB, Node.js & React</strong>.
            </p>
          </div>
          <a
            href="/college-project-report"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5 shrink-0"
          >
            <span>Open EJS Project Report</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* The Problem & Solution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">The Core Agricultural Friction in India</h3>
          <ul className="space-y-3 text-xs text-gray-600 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">•</span>
              <span><strong>Mandi Information Asymmetry:</strong> Farmers frequently sell produce below market value due to lack of immediate awareness regarding daily APMC modal prices in neighboring districts.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">•</span>
              <span><strong>Predatory Intermediary Deductions:</strong> Commission agents and multi-tier traders deduct 8% to 15% in brokerage, uncalibrated weighment loss, and delayed settlement.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 font-bold">•</span>
              <span><strong>Scams in Government Scheme Enrollment:</strong> Smallholders are misinformed or charged unauthorized fees by unofficial agents claiming to register for PM-KISAN or PMFBY.</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#168B5C] flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">The GreenLink Solution</h3>
          <ul className="space-y-3 text-xs text-gray-600 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span><strong>Direct Marketplace:</strong> Farmers list grain, vegetable, and oilseed lots with inspected photos and quality grades directly to wholesale buyers.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span><strong>Mandi vs MSP Benchmarking:</strong> Instant comparative visibility into Minimum Support Prices safeguards farmers against distress sales.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span><strong>Kisan Saathi Gemini Assistant:</strong> Immediate agricultural consultation in conversational Hindi and English without technical friction.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Planned Future Roadmap */}
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#168B5C]">Architectural Evolution</span>
          <h3 className="text-xl font-bold text-gray-900 mt-1">Planned Future Roadmap (Post-Hackathon)</h3>
          <p className="text-xs text-gray-500 mt-1">
            Technologies and integrations scoped for subsequent production releases:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
            <Cpu className="w-5 h-5 text-purple-600" />
            <h4 className="font-bold text-gray-900">Bhashini Multilingual Voice</h4>
            <p className="text-gray-600 leading-relaxed">
              Dial-in IVR and speech synthesis across 12 Indian regional vernaculars (Punjabi, Marathi, Bengali, Telugu).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
            <Database className="w-5 h-5 text-emerald-600" />
            <h4 className="font-bold text-gray-900">Live Agmarknet & e-NAM Sync</h4>
            <p className="text-gray-600 leading-relaxed">
              Automated daily cron sync with data.gov.in e-NAM commodity auction feeds for all 1,000+ national APMC mandis.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h4 className="font-bold text-gray-900">UPI Smart Escrow Contracts</h4>
            <p className="text-gray-600 leading-relaxed">
              Safe tokenized milestone payouts: advance lock-in upon truck loading and release upon buyer quality weighment.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 border border-gray-200 space-y-2">
            <Layers className="w-5 h-5 text-amber-600" />
            <h4 className="font-bold text-gray-900">Satellite NDVI & Soil IoT</h4>
            <p className="text-gray-600 leading-relaxed">
              Sentinel-2 multispectral vegetation index tracking combined with low-cost field moisture telemetry probes.
            </p>
          </div>
        </div>
      </div>

      {/* Backend & MongoDB Architecture Spec */}
      <div className="bg-gray-900 text-white p-6 sm:p-8 rounded-2xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-sm text-white">MongoDB & Express Architecture Specifications</h3>
          </div>
          <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800">
            Database: {MONGODB_ARCHITECTURE_DOCS.databaseName}
          </span>
        </div>

        <p className="text-xs text-gray-400">
          GreenLink is built with a decoupled service pattern. The prototype's <code>storageService</code> mirrors the exact Mongoose schema collections defined in <code>src/services/dbSchema.ts</code> for frictionless MongoDB deployment:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {MONGODB_ARCHITECTURE_DOCS.collections.map((col) => (
            <div key={col.collectionName} className="p-3 rounded-lg bg-gray-800/80 border border-gray-700">
              <span className="font-mono text-emerald-400 font-bold block text-xs">db.{col.collectionName}</span>
              <span className="text-[10px] text-gray-400 block mt-1">{col.description}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
