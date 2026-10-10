import React from 'react';
import {
  Sprout,
  ShoppingBag,
  TrendingUp,
  CloudSun,
  BookOpen,
  Bot,
  ArrowRight,
  ShieldCheck,
  CheckCircle,
  Users,
  MapPin,
  Sparkles,
  ExternalLink,
  ChevronRight,
  BarChart3,
  HelpCircle
} from 'lucide-react';
import { CropListing, GovernmentScheme, User } from '../types';

interface LandingPageProps {
  setCurrentTab: (tab: string) => void;
  crops: CropListing[];
  schemes: GovernmentScheme[];
  currentUser: User;
  onOpenListingModal: () => void;
  onOpenAuthModal: () => void;
  onSelectCropDetail: (crop: CropListing) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  setCurrentTab,
  crops,
  schemes,
  currentUser,
  onOpenListingModal,
  onOpenAuthModal,
  onSelectCropDetail,
}) => {
  const featuredCrops = crops.slice(0, 4);
  const featuredSchemes = schemes.slice(0, 3);

  return (
    <div className="space-y-20 pb-12">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0B362F] via-[#0E443B] to-[#0B362F] text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Background Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-10 bg-pattern pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-600/50 text-xs font-semibold text-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Hackoverflow 10.0 &bull; NIT Durgapur Project</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
                Empowering Farmers with{' '}
                <span className="text-emerald-400 underline decoration-[#168B5C]/60 decoration-wavy">
                  Smarter Agriculture
                </span>
              </h1>

              <p className="text-base sm:text-lg text-emerald-100/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Discover agricultural resources, explore crop prices, list your produce, and connect with buyers through one simple platform.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => setCurrentTab('marketplace')}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#168B5C] hover:bg-[#12724B] text-white font-bold text-sm shadow-lg shadow-emerald-950/40 hover:shadow-xl transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Explore Marketplace</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    if (currentUser.role === 'farmer') {
                      setCurrentTab('farmer-dashboard');
                    } else if (currentUser.role === 'buyer') {
                      setCurrentTab('buyer-dashboard');
                    } else {
                      onOpenAuthModal();
                    }
                  }}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-emerald-400/40 backdrop-blur-sm transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-emerald-300" />
                  <span>Get Started (Demo Access)</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-emerald-800/60 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-emerald-200/80">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Zero Intermediary Brokerage</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>Verified Central & State Schemes</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>AI Advisory in Hindi & English</span>
                </div>
              </div>
            </div>

            {/* Right Card / Visual Showcase */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Glow ring */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl blur-xl opacity-30" />

                <div className="relative bg-[#082823] border border-emerald-700/50 rounded-2xl p-6 shadow-2xl space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-emerald-800/80">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">Live Agri Hub</span>
                    </div>
                    <span className="text-[11px] text-emerald-400/80">Punjab &bull; Haryana &bull; Maharashtra</span>
                  </div>

                  {/* Sample mini market pulse */}
                  <div className="space-y-3">
                    <div className="p-3 bg-emerald-950/70 rounded-xl border border-emerald-800/60 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🌾</span>
                        <div>
                          <p className="text-xs font-bold text-white">Sharbati Wheat</p>
                          <p className="text-[10px] text-emerald-300">Khanna Mandi APMC</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-extrabold text-emerald-400">₹2,380/qtl</p>
                        <p className="text-[10px] text-emerald-200">MSP: ₹2,275 (+4.6%)</p>
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-950/70 rounded-xl border border-emerald-800/60 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">🍚</span>
                        <div>
                          <p className="text-xs font-bold text-white">Basmati 1121</p>
                          <p className="text-[10px] text-emerald-300">Karnal Mandi APMC</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-extrabold text-emerald-400">₹4,600/qtl</p>
                        <p className="text-[10px] text-emerald-200">Direct Farmer Offer</p>
                      </div>
                    </div>
                  </div>

                  {/* Kisan Saathi Mini Assistant Preview */}
                  <div className="p-3.5 bg-gradient-to-r from-emerald-900/60 to-[#168B5C]/30 rounded-xl border border-emerald-600/40 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-200">
                      <Bot className="w-4 h-4 text-emerald-400" />
                      <span>Kisan Saathi AI Prompt</span>
                    </div>
                    <p className="text-xs text-white italic">
                      "गेहूं की बुवाई के लिए सही तापमान और प्रथम सिंचाई कब करनी चाहिए?"
                    </p>
                    <button
                      onClick={() => setCurrentTab('ai-assistant')}
                      className="text-[11px] font-semibold text-emerald-300 hover:text-white flex items-center gap-1"
                    >
                      <span>Ask Kisan Saathi Assistant</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Active persona pill */}
                  <div className="text-[11px] text-emerald-300/80 flex items-center justify-between pt-1">
                    <span>Active Session: <strong>{currentUser.name}</strong> ({currentUser.role})</span>
                    <button
                      onClick={onOpenAuthModal}
                      className="text-emerald-400 underline hover:text-emerald-200"
                    >
                      Change Persona
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FOUR MAJOR FEATURE CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Marketplace */}
          <div
            onClick={() => setCurrentTab('marketplace')}
            className="group bg-white rounded-2xl p-6 shadow-xl border border-emerald-100 hover:border-[#168B5C] transition-all hover:-translate-y-1 cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#168B5C] flex items-center justify-center mb-4 group-hover:bg-[#168B5C] group-hover:text-white transition-colors">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-gray-900 mb-2">Crop Marketplace</h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              Direct farmer-to-buyer crop listings. Transparent pricing in ₹/kg and quintals, crop photos, quality grades, and zero middleman fee.
            </p>
            <span className="text-xs font-bold text-[#168B5C] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Browse Crops &rarr;
            </span>
          </div>

          {/* Card 2: Mandi Prices */}
          <div
            onClick={() => setCurrentTab('prices')}
            className="group bg-white rounded-2xl p-6 shadow-xl border border-emerald-100 hover:border-[#168B5C] transition-all hover:-translate-y-1 cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-gray-900 mb-2">Mandi Price Insights</h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              Daily modal, min, and max mandi rates across major APMCs. Compare against central MSP benchmarks before selling your harvest.
            </p>
            <span className="text-xs font-bold text-amber-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Compare Mandi Rates &rarr;
            </span>
          </div>

          {/* Card 3: Government Schemes */}
          <div
            onClick={() => setCurrentTab('schemes')}
            className="group bg-white rounded-2xl p-6 shadow-xl border border-emerald-100 hover:border-[#168B5C] transition-all hover:-translate-y-1 cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-gray-900 mb-2">Government Schemes</h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              Verified repository for PM-KISAN, PM Fasal Bima Yojana, Soil Health Card, and KCC with direct links to official .gov.in portals.
            </p>
            <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Check Eligibility &rarr;
            </span>
          </div>

          {/* Card 4: AI Kisan Saathi */}
          <div
            onClick={() => setCurrentTab('ai-assistant')}
            className="group bg-white rounded-2xl p-6 shadow-xl border border-emerald-100 hover:border-[#168B5C] transition-all hover:-translate-y-1 cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="font-extrabold text-base text-gray-900 mb-2">Kisan Saathi AI</h3>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              Powered by Google Gemini. Ask agricultural questions in conversational Hindi, English, or Hinglish with voice speech support.
            </p>
            <span className="text-xs font-bold text-teal-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Chat with Assistant &rarr;
            </span>
          </div>
        </div>
      </section>

      {/* 3. HOW GREENLINK WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-extrabold text-[#168B5C] uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Streamlined Agricultural Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-3">
            How GreenLink Bridges Farmers & Markets
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mt-2">
            Eliminating information barriers and unfair commission deductions in four transparent steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm relative">
            <div className="w-10 h-10 rounded-full bg-[#168B5C] text-white font-extrabold text-base flex items-center justify-center mb-4">
              1
            </div>
            <h4 className="font-bold text-sm text-gray-900 mb-1">List Produce in Seconds</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Farmers post harvest details, available quantity (kg/quintals), photo, location, and target price directly from phone.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm relative">
            <div className="w-10 h-10 rounded-full bg-[#168B5C] text-white font-extrabold text-base flex items-center justify-center mb-4">
              2
            </div>
            <h4 className="font-bold text-sm text-gray-900 mb-1">Check Mandi & MSP Benchmarks</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Real-time Agmarknet and MSP data guarantees farmers know their crop worth before accepting any purchase terms.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm relative">
            <div className="w-10 h-10 rounded-full bg-[#168B5C] text-white font-extrabold text-base flex items-center justify-center mb-4">
              3
            </div>
            <h4 className="font-bold text-sm text-gray-900 mb-1">Direct Buyer Enquiries</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Institutional food processors and wholesale traders submit verified buy offers directly into the farmer dashboard.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm relative">
            <div className="w-10 h-10 rounded-full bg-[#168B5C] text-white font-extrabold text-base flex items-center justify-center mb-4">
              4
            </div>
            <h4 className="font-bold text-sm text-gray-900 mb-1">Fair Trade & Scheme Support</h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Direct dispatch with zero agent cuts. Access government insurance (PMFBY) or credit (KCC) directly through official channels.
            </p>
          </div>
        </div>
      </section>

      {/* 4. MARKETPLACE PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold text-[#168B5C] uppercase tracking-wider">Fresh From The Fields</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
              Active Produce on GreenLink
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              Directly listed by certified demo farmers across Punjab, Haryana, UP, and Maharashtra.
            </p>
          </div>

          <button
            onClick={() => setCurrentTab('marketplace')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#168B5C] hover:text-[#0B362F] hover:underline"
          >
            <span>View All {crops.length} Crop Listings</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCrops.map((crop) => (
            <div
              key={crop.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all flex flex-col group"
            >
              <div className="relative h-44 overflow-hidden bg-gray-100">
                <img
                  src={crop.imageUrl}
                  alt={crop.cropName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 bg-[#168B5C] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                  {crop.category}
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white text-[11px] font-extrabold px-2 py-0.5 rounded">
                  ₹{crop.expectedPricePerKg}/kg
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-sm text-gray-900 group-hover:text-[#168B5C] transition-colors">
                    {crop.cropName}
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-0.5">
                    Variety: {crop.variety || 'Standard Local'}
                  </p>
                  <p className="text-[11px] text-gray-600 mt-1.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#168B5C]" />
                    <span>{crop.farmerDistrict}, {crop.farmerState}</span>
                  </p>
                  <p className="text-[11px] text-gray-700 mt-1">
                    Stock: <strong>{crop.quantityKg.toLocaleString('en-IN')} kg</strong> ({(crop.quantityKg / 100).toFixed(0)} qtl)
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2">
                  <button
                    onClick={() => onSelectCropDetail(crop)}
                    className="flex-1 py-1.5 px-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold text-xs text-center transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => onSelectCropDetail(crop)}
                    className="py-1.5 px-3 rounded-lg bg-[#168B5C] hover:bg-[#12724B] text-white font-semibold text-xs transition-colors"
                  >
                    Contact
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. GOVERNMENT SCHEMES PREVIEW */}
      <section className="bg-[#0B362F] text-white py-16 px-4 sm:px-6 lg:px-8 rounded-3xl max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider bg-emerald-900/60 px-3 py-1 rounded-full border border-emerald-700/50">
            Verified Knowledge Hub
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
            Government Agricultural Schemes
          </h2>
          <p className="text-xs sm:text-sm text-emerald-200/80 mt-2">
            No fake promises. Genuine eligibility criteria, required documents, and direct links to official Ministry of Agriculture portals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredSchemes.map((scheme) => (
            <div
              key={scheme.id}
              className="bg-[#082823] border border-emerald-700/50 rounded-2xl p-5 flex flex-col justify-between hover:border-emerald-500 transition-colors"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded">
                  {scheme.category}
                </span>
                <h3 className="font-extrabold text-sm text-white mt-2 leading-snug">
                  {scheme.name}
                </h3>
                <p className="text-xs text-emerald-200/90 font-medium mt-0.5">
                  {scheme.hindiName}
                </p>
                <p className="text-xs text-emerald-100/70 mt-2.5 line-clamp-3">
                  {scheme.purpose}
                </p>
                <div className="mt-3 p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800/60 text-[11px] text-emerald-300">
                  <strong>Benefit:</strong> {scheme.benefits}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-emerald-800/80 flex items-center justify-between">
                <button
                  onClick={() => setCurrentTab('schemes')}
                  className="text-xs text-emerald-300 hover:text-white font-semibold"
                >
                  View Details & Documents &rarr;
                </button>
                <a
                  href={scheme.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg bg-emerald-800/60 hover:bg-emerald-700 text-emerald-200 hover:text-white transition-colors"
                  title="Official Gov Portal (External Tab)"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => setCurrentTab('schemes')}
            className="px-6 py-2.5 bg-white text-[#0B362F] font-bold text-xs rounded-xl hover:bg-emerald-100 transition-colors"
          >
            Explore Complete Scheme Directory ({schemes.length} Verified Programs)
          </button>
        </div>
      </section>

      {/* 6. AI ASSISTANT SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50/50 rounded-3xl p-8 sm:p-12 border border-emerald-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#168B5C] text-xs font-bold">
              <Bot className="w-4 h-4" />
              <span>Google Gemini Powered Assistant</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Meet "Kisan Saathi" — Your 24/7 Digital Agricultural Advisor
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Ask questions regarding wheat sowing schedules, organic pesticide alternatives, fertilizer splits, mandi price analysis, or government scheme eligibility. Kisan Saathi responds in clear Hindi, English, and Hinglish.
            </p>

            <div className="space-y-2 pt-2">
              <div
                onClick={() => setCurrentTab('ai-assistant')}
                className="p-3 bg-white rounded-xl border border-emerald-200 shadow-sm hover:border-[#168B5C] cursor-pointer text-xs text-gray-700 flex items-center justify-between group"
              >
                <span>"What precautions should I take when growing wheat?"</span>
                <span className="text-[#168B5C] font-semibold group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
              <div
                onClick={() => setCurrentTab('ai-assistant')}
                className="p-3 bg-white rounded-xl border border-emerald-200 shadow-sm hover:border-[#168B5C] cursor-pointer text-xs text-gray-700 flex items-center justify-between group"
              >
                <span>"फसल चक्र (Crop Rotation) अपनाने के क्या-क्या फायदे हैं?"</span>
                <span className="text-[#168B5C] font-semibold group-hover:translate-x-1 transition-transform">&rarr;</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setCurrentTab('ai-assistant')}
                className="px-6 py-3 rounded-xl bg-[#168B5C] hover:bg-[#12724B] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
              >
                <Bot className="w-4 h-4" />
                <span>Open Kisan Saathi Chat Interface</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-emerald-100 shadow-lg space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#168B5C] flex items-center justify-center font-bold">
                KS
              </div>
              <div>
                <h4 className="font-bold text-xs text-gray-900">Kisan Saathi (किसान साथी)</h4>
                <p className="text-[10px] text-emerald-600 font-medium">Built for Indian Agro-Climatic Zones</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-emerald-50 text-[#0B362F] rounded-xl rounded-tl-none border border-emerald-100 leading-relaxed">
                🌾 <strong>नमस्ते किसान भाई!</strong> मैं आपकी फसल सुरक्षा, बुवाई समय, खाद की मात्रा और सरकारी योजनाओं के बारे में सही जानकारी देने के लिए तैयार हूँ।
              </div>
              <div className="p-3 bg-gray-100 text-gray-800 rounded-xl rounded-tr-none ml-6 leading-relaxed">
                How can I verify if my PM-KISAN beneficiary status is active?
              </div>
              <div className="p-3 bg-emerald-50 text-[#0B362F] rounded-xl rounded-tl-none border border-emerald-100 leading-relaxed text-[11px]">
                You can verify your status at <code>pmkisan.gov.in</code> using your Aadhaar or registered mobile number under 'Know Your Status'. Ensure eKYC and NPCI bank seeding are marked green.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS (EXPLICITLY LABELLED DEMO CONTENT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-extrabold text-amber-700 uppercase tracking-wider bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            [ Illustrative Demonstration Content ]
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
            Simulated User Stories & Feedback
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            *The stories below are fictional demonstration examples illustrating how GreenLink solves real-world mandi friction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
            <p className="text-xs text-gray-700 italic leading-relaxed">
              "Earlier, I had to accept whatever price the local commission agent quoted for my Basmati rice in the mandi. Listing directly on GreenLink enabled me to negotiate transparently with wholesale millers."
            </p>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#168B5C] font-bold flex items-center justify-center text-xs">
                RK
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Ramesh Kumar (Demo Farmer)</p>
                <p className="text-[10px] text-gray-500">Ludhiana, Punjab &bull; 6.5 Acres</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
            <p className="text-xs text-gray-700 italic leading-relaxed">
              "As a grain processing company, sourcing certified Sharbati wheat directly from farmers with inspected moisture levels cut our procurement latency by 4 days."
            </p>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs">
                AS
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Anita Sharma (Demo Buyer)</p>
                <p className="text-[10px] text-gray-500">AgriFoods Wholesale Ltd &bull; Delhi NCR</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
            <p className="text-xs text-gray-700 italic leading-relaxed">
              "Having all verified central schemes with authentic .gov.in links in one portal saves farmers from fake enrollment agents and service fee scams."
            </p>
            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-800 font-bold flex items-center justify-center text-xs">
                VS
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Dr. Vikramaditya Sen (Demo Admin)</p>
                <p className="text-[10px] text-gray-500">Krishi Extension Portal &bull; West Bengal</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
