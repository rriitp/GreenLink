import React from 'react';
import {
  ShoppingBag,
  Heart,
  Send,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  ArrowRight,
  ExternalLink,
  MapPin,
  Trash2,
  Building
} from 'lucide-react';
import { User, CropListing, BuyerEnquiry } from '../types';

interface BuyerDashboardProps {
  currentUser: User;
  crops: CropListing[];
  enquiries: BuyerEnquiry[];
  favorites: string[];
  onToggleFavorite: (cropId: string) => void;
  onSelectCropDetail: (crop: CropListing) => void;
  setCurrentTab: (tab: string) => void;
}

export const BuyerDashboard: React.FC<BuyerDashboardProps> = ({
  currentUser,
  crops,
  enquiries,
  favorites,
  onToggleFavorite,
  onSelectCropDetail,
  setCurrentTab,
}) => {
  // Enquiries sent by this buyer
  const myEnquiries = enquiries.filter((e) => e.buyerId === currentUser.id);

  // Crops favorited by this buyer
  const favoriteCrops = crops.filter((c) => favorites.includes(c.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Buyer Header Banner */}
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
              <span className="bg-blue-600 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">
                Verified Buyer
              </span>
            </div>
            <p className="text-xs text-emerald-200/90 mt-0.5 flex items-center gap-2">
              <Building className="w-3.5 h-3.5" />
              <span>{currentUser.businessType || 'AgriFoods Processing & Wholesale Ltd'} &bull; 📍 {currentUser.district}, {currentUser.state}</span>
            </p>
            <p className="text-[11px] text-emerald-300/70 mt-1">
              Active Session: Institutional Buyer Demo Persona (Anita Sharma)
            </p>
          </div>
        </div>

        <button
          onClick={() => setCurrentTab('marketplace')}
          className="px-5 py-3 rounded-xl bg-[#168B5C] hover:bg-[#12724B] text-white font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-102 shrink-0"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Browse Crop Marketplace</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-semibold block">Enquiries Submitted</span>
            <span className="text-2xl font-extrabold text-gray-900 mt-1 block">
              {myEnquiries.length}
            </span>
            <span className="text-[11px] text-emerald-600 font-medium">Direct farmer requests</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Send className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-semibold block">Pending Responses</span>
            <span className="text-2xl font-extrabold text-amber-600 mt-1 block">
              {myEnquiries.filter((e) => e.status === 'Pending').length}
            </span>
            <span className="text-[11px] text-gray-500">Awaiting farmer review</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-semibold block">Accepted Deals</span>
            <span className="text-2xl font-extrabold text-[#168B5C] mt-1 block">
              {myEnquiries.filter((e) => e.status === 'Accepted').length}
            </span>
            <span className="text-[11px] text-emerald-600 font-medium">Ready for dispatch</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#168B5C] flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 font-semibold block">Saved Favourites</span>
            <span className="text-2xl font-extrabold text-rose-600 mt-1 block">
              {favoriteCrops.length}
            </span>
            <span className="text-[11px] text-gray-500">Tracked produce lots</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Main Section: Submitted Enquiries */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-100">
          <div>
            <h3 className="font-extrabold text-base text-gray-900">My Trade Enquiries & Status Tracking</h3>
            <p className="text-xs text-gray-500">
              Live status updates for bids submitted directly to registered farmers.
            </p>
          </div>
          <button
            onClick={() => setCurrentTab('marketplace')}
            className="text-xs font-bold text-[#168B5C] hover:underline flex items-center gap-1"
          >
            <span>Explore More Produce</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {myEnquiries.length === 0 ? (
          <div className="text-center py-12 text-gray-500 text-xs space-y-3">
            <p>You have not submitted any enquiries yet.</p>
            <button
              onClick={() => setCurrentTab('marketplace')}
              className="px-4 py-2 bg-[#168B5C] text-white rounded-xl text-xs font-bold"
            >
              Go to Marketplace to Send Offer
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {myEnquiries.map((enq) => (
              <div
                key={enq.id}
                className="p-5 rounded-xl border border-gray-200 hover:border-blue-300 transition-all bg-white shadow-sm space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    {enq.cropImageUrl && (
                      <img
                        src={enq.cropImageUrl}
                        alt={enq.cropName}
                        className="w-12 h-12 rounded-lg object-cover border border-gray-200 shrink-0"
                      />
                    )}
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">{enq.cropName}</h4>
                      <p className="text-xs text-gray-600">
                        Farmer: <strong>{enq.farmerName}</strong> &bull; Requested:{' '}
                        <strong>{enq.requestedQuantityKg} kg</strong> @ ₹{enq.offeredPricePerKg}/kg
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-extrabold uppercase ${
                        enq.status === 'Accepted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : enq.status === 'In Discussion'
                          ? 'bg-blue-100 text-blue-800'
                          : enq.status === 'Declined'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      Status: {enq.status}
                    </span>
                  </div>
                </div>

                {enq.message && (
                  <p className="text-xs text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <strong className="text-gray-800">Your Message:</strong> "{enq.message}"
                  </p>
                )}

                {enq.farmerReply && (
                  <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100 text-xs text-emerald-900">
                    <strong className="text-emerald-800">Farmer's Response:</strong> {enq.farmerReply}
                  </div>
                )}

                <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1">
                  <span>Enquiry Sent: {new Date(enq.enquiryDate).toLocaleString()}</span>
                  <span className="text-emerald-700 font-semibold">
                    Total Estimated Order: ₹{(enq.requestedQuantityKg * enq.offeredPricePerKg).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Saved / Favourite Produce Section */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>Saved / Favourite Produce Lots</span>
            </h3>
            <p className="text-xs text-gray-500">
              Quick access to crops bookmarked during marketplace browsing.
            </p>
          </div>
          <span className="text-xs text-gray-500 font-semibold">({favoriteCrops.length} saved)</span>
        </div>

        {favoriteCrops.length === 0 ? (
          <div className="text-center py-8 text-gray-500 text-xs">
            No crops bookmarked yet. Click the heart icon on any crop card in the marketplace to save it here.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {favoriteCrops.map((crop) => (
              <div
                key={crop.id}
                className="rounded-xl border border-gray-200 bg-white p-3 hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-32 rounded-lg overflow-hidden bg-gray-100 mb-2">
                    <img src={crop.imageUrl} alt={crop.cropName} className="w-full h-full object-cover" />
                    <button
                      onClick={() => onToggleFavorite(crop.id)}
                      className="absolute top-2 right-2 p-1 rounded-full bg-white/90 text-rose-600 shadow"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h4 className="font-bold text-xs text-gray-900 truncate">{crop.cropName}</h4>
                  <p className="text-[11px] text-gray-500">{crop.farmerDistrict}, {crop.farmerState}</p>
                  <p className="text-xs font-extrabold text-[#168B5C] mt-1">₹{crop.expectedPricePerKg}/kg</p>
                </div>

                <div className="pt-2 mt-2 border-t border-gray-100 flex items-center gap-2">
                  <button
                    onClick={() => onSelectCropDetail(crop)}
                    className="flex-1 py-1 px-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-[11px] font-semibold text-center"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
