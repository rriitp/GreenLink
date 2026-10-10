import React, { useState, useMemo } from 'react';
import {
  Search,
  BookOpen,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  FileText,
  AlertCircle,
  Filter,
  Check,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { GovernmentScheme } from '../types';

interface GovSchemesPageProps {
  schemes: GovernmentScheme[];
  setCurrentTab: (tab: string) => void;
}

export const GovSchemesPage: React.FC<GovSchemesPageProps> = ({ schemes, setCurrentTab }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Interactive Eligibility Self-Check Tool State
  const [checkerOpen, setCheckerOpen] = useState(false);
  const [landArea, setLandArea] = useState<number>(2.5);
  const [hasAadhaar, setHasAadhaar] = useState(true);
  const [hasKCC, setHasKCC] = useState(false);
  const [checkerResult, setCheckerResult] = useState<string[]>([]);

  const categories = [
    'All',
    'Direct Income',
    'Insurance',
    'Credit & Loan',
    'Soil & Inputs',
    'Irrigation & Solar',
  ];

  const filteredSchemes = useMemo(() => {
    return schemes.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.hindiName.includes(searchQuery) ||
        s.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.benefits.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [schemes, searchQuery, selectedCategory]);

  const handleRunEligibilityCheck = () => {
    const matched: string[] = [];
    if (hasAadhaar) {
      matched.push('PM-KISAN (Eligible for ₹6,000/yr direct income support)');
      matched.push('PM Fasal Bima Yojana (Eligible for low 1.5-2% crop insurance)');
      matched.push('Soil Health Card Scheme (Eligible for free 12-parameter soil testing)');
    }
    if (landArea > 0) {
      matched.push('Kisan Credit Card (Eligible for up to ₹3 Lakh at 4% subsidized interest)');
      matched.push('PM-KUSUM (Eligible for 60% subsidy on solar agriculture pump installations)');
    }
    setCheckerResult(matched);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Official Government Portal Verification</span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
            Agricultural Government Schemes Directory
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Access verified Central & State government programs, eligibility checklists, and official .gov.in application portals.
          </p>
        </div>

        <button
          onClick={() => {
            setCheckerOpen(!checkerOpen);
            if (!checkerOpen) handleRunEligibilityCheck();
          }}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>{checkerOpen ? 'Hide Eligibility Checker' : 'Interactive Eligibility Self-Check'}</span>
        </button>
      </div>

      {/* Interactive Eligibility Checker Box */}
      {checkerOpen && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-sm text-blue-950 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Instant Agricultural Scheme Matcher</span>
              </h3>
              <p className="text-xs text-blue-800">
                Answer simple questions to discover which government programs you qualify for:
              </p>
            </div>
            <span className="text-[11px] bg-blue-200/80 text-blue-900 font-bold px-2 py-0.5 rounded">
              Rule-Based Matcher
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Cultivable Land Area (Acres)</label>
              <input
                type="number"
                step="0.5"
                value={landArea}
                onChange={(e) => setLandArea(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-blue-200 bg-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Aadhaar Linked with Bank DBT?</label>
              <select
                value={hasAadhaar ? 'yes' : 'no'}
                onChange={(e) => setHasAadhaar(e.target.value === 'yes')}
                className="w-full px-3 py-2 rounded-xl border border-blue-200 bg-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="yes">Yes (Aadhaar eKYC Done)</option>
                <option value="no">No / Not Yet Linked</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Existing Kisan Credit Card (KCC)?</label>
              <select
                value={hasKCC ? 'yes' : 'no'}
                onChange={(e) => setHasKCC(e.target.value === 'yes')}
                className="w-full px-3 py-2 rounded-xl border border-blue-200 bg-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="no">No, need to apply</option>
                <option value="yes">Yes, active account</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleRunEligibilityCheck}
              className="px-4 py-2 bg-blue-700 text-white rounded-xl text-xs font-bold hover:bg-blue-800 transition-colors"
            >
              Recalculate Matching Schemes
            </button>
          </div>

          {checkerResult.length > 0 && (
            <div className="pt-3 border-t border-blue-200 space-y-1.5">
              <h4 className="font-bold text-xs text-blue-900">Your Recommended Matching Programs:</h4>
              {checkerResult.map((res, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-blue-950 font-medium">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{res}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Search & Category Filter */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search schemes by name (PM-KISAN, Fasal Bima, KCC), keywords (subsidy, insurance, credit)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#168B5C] focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm font-bold'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Scheme Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-5"
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-gray-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                      {scheme.category}
                    </span>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                      Centrally Sponsored
                    </span>
                  </div>
                  <h3 className="font-extrabold text-base text-gray-900 mt-1.5 leading-snug">
                    {scheme.name}
                  </h3>
                  <p className="text-xs text-[#168B5C] font-semibold mt-0.5">
                    {scheme.hindiName}
                  </p>
                </div>

                <a
                  href={scheme.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 hover:bg-blue-600 hover:text-white rounded-xl text-gray-600 transition-colors shrink-0"
                  title="Open Official Portal (External Tab)"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Purpose */}
              <div>
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  Purpose & Objective
                </span>
                <p className="text-xs text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
                  {scheme.purpose}
                </p>
              </div>

              {/* Benefits */}
              <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-100">
                <span className="text-xs font-bold text-emerald-900 block mb-1">
                  Direct Benefits:
                </span>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  {scheme.benefits}
                </p>
              </div>

              {/* Eligibility */}
              <div>
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                  Eligibility Criteria
                </span>
                <ul className="space-y-1.5 text-xs text-gray-700">
                  {scheme.eligibility.map((el, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{el}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Required Documents */}
              <div>
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-1.5">
                  Required Documents
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {scheme.requiredDocuments.map((doc, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-800 text-[11px] border border-gray-200 flex items-center gap-1"
                    >
                      <FileText className="w-3 h-3 text-gray-500" />
                      <span>{doc}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-[10px] text-gray-400">
                Verified: {scheme.verifiedSource}
              </span>

              <a
                href={scheme.officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition-colors"
              >
                <span>Visit Official Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
