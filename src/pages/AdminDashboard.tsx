import React, { useState } from 'react';
import {
  ShieldAlert,
  Users,
  ShoppingBag,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RefreshCw,
  BookOpen,
  FileText,
  Activity,
  ShieldCheck,
  Check,
  X
} from 'lucide-react';
import { User, CropListing, GovernmentScheme, BuyerEnquiry } from '../types';
import { DEMO_USERS } from '../data/mockData';

interface AdminDashboardProps {
  currentUser: User;
  crops: CropListing[];
  schemes: GovernmentScheme[];
  enquiries: BuyerEnquiry[];
  onUpdateCrop: (id: string, updates: Partial<CropListing>) => void;
  onResetData: () => void;
  setCurrentTab: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  crops,
  schemes,
  enquiries,
  onUpdateCrop,
  onResetData,
  setCurrentTab,
}) => {
  const [activeTab, setActiveTab] = useState<'listings' | 'schemes' | 'activity'>('listings');
  const [actionNotice, setActionNotice] = useState<string>('');

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(''), 2500);
  };

  const handleApprove = (cropId: string) => {
    onUpdateCrop(cropId, { isApproved: true, status: 'Active' });
    showNotice(`Listing #${cropId} approved and published to marketplace.`);
  };

  const handleFlag = (cropId: string) => {
    onUpdateCrop(cropId, { status: 'Pending Review' });
    showNotice(`Listing #${cropId} flagged for quality re-inspection.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Banner */}
      <div className="bg-[#0B362F] rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-emerald-700/40">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-700 text-white flex items-center justify-center font-bold text-xl shadow">
            AD
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold">{currentUser.name}</h1>
              <span className="bg-purple-600 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">
                Demo Admin Portal
              </span>
            </div>
            <p className="text-xs text-emerald-200/90 mt-0.5">
              Portal: Krishi Vigyan Kendra & Mandi Integration Authority &bull; {currentUser.district}, {currentUser.state}
            </p>
            <p className="text-[11px] text-amber-300/90 mt-1">
              ⚠️ Simulated Admin Portal for Hackathon Evaluation. In production, RBAC permissions are verified on server-side microservices.
            </p>
          </div>
        </div>

        <button
          onClick={onResetData}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold text-xs shadow-md transition-all flex items-center gap-1.5 shrink-0"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reset All Demo Data</span>
        </button>
      </div>

      {actionNotice && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-xs flex items-center gap-2 font-medium">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-semibold block">Total Demo Users</span>
            <span className="text-2xl font-extrabold text-gray-900 mt-1 block">
              {DEMO_USERS.length + 5}
            </span>
            <span className="text-[11px] text-emerald-600 font-medium">Farmers, Buyers & Admins</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-semibold block">Total Crop Listings</span>
            <span className="text-2xl font-extrabold text-[#168B5C] mt-1 block">
              {crops.length}
            </span>
            <span className="text-[11px] text-gray-500">Active produce lots</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#168B5C] flex items-center justify-center">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-semibold block">Active Inquiries</span>
            <span className="text-2xl font-extrabold text-blue-600 mt-1 block">
              {enquiries.length}
            </span>
            <span className="text-[11px] text-gray-500">Bids & negotiations</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Activity className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-semibold block">Verified Schemes</span>
            <span className="text-2xl font-extrabold text-amber-600 mt-1 block">
              {schemes.length}
            </span>
            <span className="text-[11px] text-emerald-600 font-medium">100% Gov.in verified</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Admin Content Tabs */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200 bg-gray-50/70 p-1">
          <button
            onClick={() => setActiveTab('listings')}
            className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'listings' ? 'bg-white text-[#0B362F] shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Listing Moderation Queue ({crops.length})
          </button>
          <button
            onClick={() => setActiveTab('schemes')}
            className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'schemes' ? 'bg-white text-[#0B362F] shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Government Scheme Registry ({schemes.length})
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'activity' ? 'bg-white text-[#0B362F] shadow-sm' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Platform Audit Log
          </button>
        </div>

        {/* Tab 1: Moderation */}
        {activeTab === 'listings' && (
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-700">
                <thead className="bg-gray-50 text-gray-500 uppercase font-bold text-[10px] border-b">
                  <tr>
                    <th className="py-3 px-3">Crop / Variety</th>
                    <th className="py-3 px-3">Farmer</th>
                    <th className="py-3 px-3">Location</th>
                    <th className="py-3 px-3">Quantity</th>
                    <th className="py-3 px-3">Price</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3 text-right">Moderator Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {crops.map((crop) => (
                    <tr key={crop.id} className="hover:bg-gray-50/80 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <img src={crop.imageUrl} alt="" className="w-8 h-8 rounded-lg object-cover" />
                          <div>
                            <span className="font-bold text-gray-900 block">{crop.cropName}</span>
                            <span className="text-[10px] text-gray-400">{crop.variety || crop.category}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-semibold text-gray-800">{crop.farmerName}</td>
                      <td className="py-3 px-3 text-gray-600">{crop.farmerDistrict}, {crop.farmerState}</td>
                      <td className="py-3 px-3 font-medium">{crop.quantityKg} kg</td>
                      <td className="py-3 px-3 font-bold text-[#168B5C]">₹{crop.expectedPricePerKg}/kg</td>
                      <td className="py-3 px-3">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded font-extrabold uppercase ${
                            crop.status === 'Active'
                              ? 'bg-emerald-100 text-emerald-800'
                              : crop.status === 'Under Negotiation'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {crop.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right space-x-1">
                        <button
                          onClick={() => handleApprove(crop.id)}
                          className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-[10px] font-bold"
                          title="Approve Listing"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleFlag(crop.id)}
                          className="px-2 py-1 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded text-[10px] font-bold"
                          title="Flag for Review"
                        >
                          Flag
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Schemes Registry */}
        {activeTab === 'schemes' && (
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h4 className="font-bold text-sm text-gray-900">Configured Central & State Schemes</h4>
              <button
                onClick={() => setCurrentTab('schemes')}
                className="text-xs font-bold text-[#168B5C] hover:underline"
              >
                View Public Directory &rarr;
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {schemes.map((sch) => (
                <div key={sch.id} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900">{sch.name}</span>
                    <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">{sch.category}</span>
                  </div>
                  <p className="text-[11px] text-gray-600">{sch.purpose}</p>
                  <p className="text-[10px] text-emerald-700 font-semibold">Verified Source: {sch.verifiedSource}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Activity Audit Log */}
        {activeTab === 'activity' && (
          <div className="p-6 space-y-3 text-xs">
            <h4 className="font-bold text-sm text-gray-900 pb-2 border-b">Recent Platform Events</h4>
            <div className="space-y-2">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
                <span>[Audit] Ramesh Kumar (Farmer) posted 4,500 kg Basmati Rice listing</span>
                <span className="text-[11px] text-gray-400">10 mins ago</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
                <span>[Audit] Anita Sharma (Buyer) sent purchase inquiry of 2,000 kg Basmati</span>
                <span className="text-[11px] text-gray-400">25 mins ago</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-between">
                <span>[Audit] Agmarknet price sync completed for Khanna & Karnal APMC mandis</span>
                <span className="text-[11px] text-gray-400">1 hour ago</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
