import React, { useState } from 'react';
import {
  Plus,
  ShoppingBag,
  MessageSquare,
  BookOpen,
  CloudSun,
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
  AlertTriangle,
  TrendingUp,
  MapPin,
  Calendar,
  Check,
  Send,
  UserCheck
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import { User, CropListing, BuyerEnquiry, GovernmentScheme } from '../types';
import { REGIONAL_WEATHER } from '../data/mockData';

interface FarmerDashboardProps {
  currentUser: User;
  crops: CropListing[];
  enquiries: BuyerEnquiry[];
  schemes: GovernmentScheme[];
  onOpenListingModal: () => void;
  onEditCrop: (crop: CropListing) => void;
  onDeleteCrop: (id: string) => void;
  onUpdateEnquiryStatus: (id: string, status: BuyerEnquiry['status'], reply?: string) => void;
  setCurrentTab: (tab: string) => void;
}

export const FarmerDashboard: React.FC<FarmerDashboardProps> = ({
  currentUser,
  crops,
  enquiries,
  schemes,
  onOpenListingModal,
  onEditCrop,
  onDeleteCrop,
  onUpdateEnquiryStatus,
  setCurrentTab,
}) => {
  const [activeTab, setActiveTab] = useState<'listings' | 'enquiries' | 'advisory'>('listings');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [replyTextMap, setReplyTextMap] = useState<Record<string, string>>({});

  // Filter listings and enquiries for current farmer
  const myCrops = crops.filter((c) => c.farmerId === currentUser.id);
  const myEnquiries = enquiries.filter((e) => e.farmerId === currentUser.id);

  // Weather data for farmer's state
  const currentWeather = REGIONAL_WEATHER[currentUser.state] || REGIONAL_WEATHER['Punjab'];

  // Price comparison data for chart: Farmer's expected price vs estimated mandi benchmark
  const priceComparisonData = myCrops.map((c) => ({
    crop: c.cropName.split(' ')[0],
    farmerPrice: c.expectedPricePerKg,
    mandiBenchmark: Math.max(15, c.expectedPricePerKg - 3), // typical mandi price after broker cut
  }));

  const handleSendReply = (enquiryId: string) => {
    const reply = replyTextMap[enquiryId];
    if (!reply || !reply.trim()) return;
    onUpdateEnquiryStatus(enquiryId, 'In Discussion', reply.trim());
    setReplyTextMap({ ...replyTextMap, [enquiryId]: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Profile Banner */}
      <div className="bg-gradient-to-r from-[#0B362F] to-[#12584A] rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400 shadow-md shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold">{currentUser.name}</h1>
              <span className="bg-[#168B5C] text-emerald-100 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">
                Verified Farmer
              </span>
            </div>
            <p className="text-xs text-emerald-200/90 mt-0.5">
              📍 {currentUser.district}, {currentUser.state} &bull; Farm Holding: {currentUser.farmSizeAcres || 6.5} Acres &bull; Phone: {currentUser.phone}
            </p>
            <p className="text-[11px] text-emerald-300/70 mt-1">
              Active Session: Kisan Portal Demo Identity (Ramesh Kumar)
            </p>
          </div>
        </div>

        <button
          onClick={onOpenListingModal}
          className="px-5 py-3 rounded-xl bg-[#168B5C] hover:bg-[#12724B] text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-102 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>List New Crop for Sale</span>
        </button>
      </div>

      {/* Summary Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Active Listings */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-semibold block">My Active Listings</span>
            <span className="text-2xl font-extrabold text-gray-900 mt-1 block">
              {myCrops.length}
            </span>
            <span className="text-[11px] text-emerald-600 font-medium">
              {myCrops.reduce((acc, c) => acc + c.quantityKg, 0).toLocaleString('en-IN')} kg total produce
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#168B5C] flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2: Buyer Enquiries */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-semibold block">Buyer Enquiries</span>
            <span className="text-2xl font-extrabold text-gray-900 mt-1 block">
              {myEnquiries.length}
            </span>
            <span className="text-[11px] text-amber-600 font-medium">
              {myEnquiries.filter((e) => e.status === 'Pending').length} pending response
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <MessageSquare className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3: Available Schemes */}
        <div
          onClick={() => setCurrentTab('schemes')}
          className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between cursor-pointer hover:border-blue-400 transition-colors"
        >
          <div>
            <span className="text-xs text-gray-500 font-semibold block">Scheme Resources</span>
            <span className="text-2xl font-extrabold text-blue-600 mt-1 block">
              {schemes.length} Verified
            </span>
            <span className="text-[11px] text-gray-500">PM-KISAN &bull; PMFBY &bull; KCC</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4: Weather Overview */}
        <div
          onClick={() => setCurrentTab('weather')}
          className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between cursor-pointer hover:border-teal-400 transition-colors"
        >
          <div>
            <span className="text-xs text-gray-500 font-semibold block">Weather ({currentWeather.district})</span>
            <span className="text-2xl font-extrabold text-gray-900 mt-1 block">
              {currentWeather.temperature}°C
            </span>
            <span className="text-[11px] text-gray-600">{currentWeather.condition}</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <CloudSun className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Mid Section: Charts & Weather Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Price Comparison Chart */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <div>
              <h3 className="font-extrabold text-sm text-gray-900 flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#168B5C]" />
                <span>Price Realization: GreenLink Direct vs Local Mandi (₹/kg)</span>
              </h3>
              <p className="text-[11px] text-gray-500">
                Direct buyer negotiations save 8-12% commission and weighment deductions.
              </p>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
              Demonstration Feed
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priceComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                <XAxis dataKey="crop" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(value: any, name: any) => [
                    `₹${value}/kg`,
                    name === 'farmerPrice' ? 'My Expected Direct Price' : 'Estimated Mandi Realization',
                  ]}
                  contentStyle={{ borderRadius: '8px', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Bar dataKey="farmerPrice" name="My Direct Offer (₹/kg)" fill="#168B5C" radius={[4, 4, 0, 0]} />
                <Bar dataKey="mandiBenchmark" name="Local Mandi Offer (₹/kg)" fill="#94A3B8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Regional Agricultural Weather Advisory */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="font-extrabold text-sm text-gray-900 flex items-center gap-1.5">
                <CloudSun className="w-4 h-4 text-teal-600" />
                <span>Agromet Field Advisory & Weather</span>
              </h3>
              <button
                onClick={() => setCurrentTab('weather')}
                className="text-[11px] font-bold text-[#168B5C] hover:underline"
              >
                7-Day Forecast &rarr;
              </button>
            </div>

            <div className="mt-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#0B362F]">{currentWeather.district}, {currentWeather.state}</span>
                <p className="text-2xl font-black text-gray-900">{currentWeather.temperature}°C</p>
                <p className="text-[11px] text-gray-600">Humidity: {currentWeather.humidity}% &bull; Rain Prob: {currentWeather.rainProbability}%</p>
              </div>
              <div className="text-right">
                <span className="text-[11px] px-2 py-0.5 rounded-full font-bold bg-emerald-200 text-emerald-800">
                  Soil: {currentWeather.soilMoistureEstimate}
                </span>
                <p className="text-[10px] text-gray-500 mt-1">Wind: {currentWeather.windSpeedKmH} km/h</p>
              </div>
            </div>

            <div className="mt-3 space-y-2 text-xs">
              <h4 className="font-bold text-gray-800 text-[11px] uppercase tracking-wider">Field Guidance for Today:</h4>
              {currentWeather.advisory.slice(0, 2).map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 text-[11px] leading-relaxed flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
            <span className="text-gray-500 text-[11px]">Source: IMD Agromet Advisory Advisory Simulation</span>
            <button
              onClick={() => setCurrentTab('ai-assistant')}
              className="text-[#168B5C] font-bold text-xs hover:underline"
            >
              Ask AI about pests &rarr;
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation for Farmer's Active Content */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200 bg-gray-50/70 p-1">
          <button
            onClick={() => setActiveTab('listings')}
            className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === 'listings'
                ? 'bg-white text-[#0B362F] shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-[#168B5C]" />
            <span>My Crop Listings ({myCrops.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === 'enquiries'
                ? 'bg-white text-[#0B362F] shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-amber-600" />
            <span>Buyer Enquiries Received ({myEnquiries.length})</span>
            {myEnquiries.filter((e) => e.status === 'Pending').length > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('advisory')}
            className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 ${
              activeTab === 'advisory'
                ? 'bg-white text-[#0B362F] shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Recommended Seasonal Actions</span>
          </button>
        </div>

        {/* Tab 1: My Crop Listings */}
        {activeTab === 'listings' && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-extrabold text-sm text-gray-900">Manage Your Listed Harvests</h3>
                <p className="text-xs text-gray-500">Edit pricing, update available quantity, or remove completed lots.</p>
              </div>
              <button
                onClick={onOpenListingModal}
                className="px-3.5 py-2 bg-[#168B5C] hover:bg-[#12724B] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Add Produce</span>
              </button>
            </div>

            {myCrops.length === 0 ? (
              <div className="text-center py-12 text-gray-500 text-xs">
                You have not listed any crops yet. Click "List New Crop for Sale" to add your first harvest!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myCrops.map((crop) => (
                  <div
                    key={crop.id}
                    className="p-4 rounded-xl border border-gray-200 bg-white hover:border-emerald-300 transition-all flex gap-4 shadow-sm"
                  >
                    <img
                      src={crop.imageUrl}
                      alt={crop.cropName}
                      className="w-24 h-24 rounded-lg object-cover border border-gray-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-sm text-gray-900 truncate">{crop.cropName}</h4>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded font-extrabold ${
                              crop.status === 'Active'
                                ? 'bg-emerald-100 text-emerald-800'
                                : crop.status === 'Under Negotiation'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {crop.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          {crop.variety || crop.category} &bull; Harvest: {crop.harvestDate}
                        </p>
                        <p className="text-xs text-gray-800 font-semibold mt-1">
                          Stock: <strong>{crop.quantityKg.toLocaleString('en-IN')} kg</strong> &bull; Price:{' '}
                          <span className="text-[#168B5C] font-extrabold">₹{crop.expectedPricePerKg}/kg</span>
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="pt-2 flex items-center justify-between border-t border-gray-100 mt-2">
                        <span className="text-[10px] text-gray-400">Listed: {crop.createdAt}</span>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => onEditCrop(crop)}
                            className="p-1.5 rounded-lg text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 text-xs font-semibold flex items-center gap-1 transition-colors"
                            title="Edit Listing"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>

                          {deleteConfirmId === crop.id ? (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => {
                                  onDeleteCrop(crop.id);
                                  setDeleteConfirmId(null);
                                }}
                                className="px-2 py-1 bg-red-600 text-white rounded text-[10px] font-bold"
                              >
                                Confirm Delete
                              </button>
                              <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="px-1.5 py-1 text-gray-500 text-[10px]"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirmId(crop.id)}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 text-xs transition-colors"
                              title="Delete Listing"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Buyer Enquiries */}
        {activeTab === 'enquiries' && (
          <div className="p-6 space-y-4">
            <div className="pb-2 border-b border-gray-100">
              <h3 className="font-extrabold text-sm text-gray-900">Purchase Inquiries from Verified Buyers</h3>
              <p className="text-xs text-gray-500">
                Review trade offers, negotiate pricing, or confirm lots for dispatch.
              </p>
            </div>

            {myEnquiries.length === 0 ? (
              <div className="text-center py-12 text-gray-500 text-xs">
                No buyer enquiries received yet. When wholesale buyers discover your crop on the marketplace, their requests will appear here.
              </div>
            ) : (
              <div className="space-y-4">
                {myEnquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className="p-5 rounded-xl border border-gray-200 bg-white shadow-sm space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-gray-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-gray-900">{enq.buyerName}</h4>
                          {enq.buyerCompany && (
                            <span className="text-[11px] text-gray-500 font-medium">({enq.buyerCompany})</span>
                          )}
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded font-extrabold uppercase ${
                              enq.status === 'Pending'
                                ? 'bg-amber-100 text-amber-800'
                                : enq.status === 'Accepted'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {enq.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                          📍 {enq.buyerDistrict}, {enq.buyerState} &bull; Phone: {enq.buyerPhone || '+91 91234 56789'}
                        </p>
                      </div>

                      <div className="text-left sm:text-right text-xs">
                        <span className="text-gray-500">For Produce: <strong>{enq.cropName}</strong></span>
                        <div className="text-emerald-700 font-bold mt-0.5">
                          Requested: {enq.requestedQuantityKg} kg @ ₹{enq.offeredPricePerKg}/kg
                        </div>
                      </div>
                    </div>

                    {enq.message && (
                      <p className="text-xs bg-gray-50 p-3 rounded-lg border border-gray-100 text-gray-700 italic">
                        "{enq.message}"
                      </p>
                    )}

                    {enq.farmerReply && (
                      <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100 text-xs text-emerald-900">
                        <strong>Your Reply:</strong> {enq.farmerReply}
                      </div>
                    )}

                    {/* Interactive Response Row */}
                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => onUpdateEnquiryStatus(enq.id, 'Accepted')}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Accept Offer</span>
                        </button>
                        <button
                          onClick={() => onUpdateEnquiryStatus(enq.id, 'Declined')}
                          className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-semibold transition-colors"
                        >
                          Decline
                        </button>
                      </div>

                      {/* Reply input */}
                      <div className="flex items-center gap-2 w-full sm:w-80">
                        <input
                          type="text"
                          placeholder="Send reply message to buyer..."
                          value={replyTextMap[enq.id] || ''}
                          onChange={(e) => setReplyTextMap({ ...replyTextMap, [enq.id]: e.target.value })}
                          className="flex-1 px-3 py-1.5 rounded-lg border border-gray-300 text-xs focus:outline-none focus:ring-1 focus:ring-[#168B5C]"
                        />
                        <button
                          onClick={() => handleSendReply(enq.id)}
                          className="p-1.5 bg-[#168B5C] hover:bg-[#12724B] text-white rounded-lg transition-colors"
                          title="Send Reply"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Recommended Seasonal Actions */}
        {activeTab === 'advisory' && (
          <div className="p-6 space-y-4">
            <div className="pb-2 border-b border-gray-100">
              <h3 className="font-extrabold text-sm text-gray-900">Rabi & Kharif Season Agricultural Checklist</h3>
              <p className="text-xs text-gray-500">
                Actionable agronomy recommendations aligned with central ICAR & PAU advisories.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-2">
                <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>1. Soil Testing & Pre-Sowing Moisture</span>
                </span>
                <p className="text-gray-600 leading-relaxed">
                  Collect representative composite soil cores for Soil Health Card testing before finalizing fertilizer purchase. Check moisture profile to schedule initial pre-sowing irrigation (Rauni).
                </p>
              </div>

              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-2">
                <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>2. Certified Seed & Fungicide Treatment</span>
                </span>
                <p className="text-gray-600 leading-relaxed">
                  Source certified seeds of high-yielding varieties (HD 3086, PBW 550 for Wheat). Treat seeds with Carboxin + Thiram @ 2g/kg seed to prevent loose smut and flag smut.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-2">
                <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>3. Crop Insurance Deadline (PMFBY)</span>
                </span>
                <p className="text-gray-600 leading-relaxed">
                  Ensure your Rabi crop declaration is updated at your bank branch or local CSC before December 31 to maintain full insurance cover against unseasonal hailstorms or rainfall.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-2">
                <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>4. Storage Fumigation & Gunny Bag Cleanliness</span>
                </span>
                <p className="text-gray-600 leading-relaxed">
                  Clean storage silos with Malathion 50% EC spray prior to storing harvested grains. Dry paddy below 14% moisture to prevent aflatoxin development.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
