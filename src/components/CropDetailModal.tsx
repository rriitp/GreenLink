import React from 'react';
import { X, MapPin, Calendar, Weight, Tag, ShieldCheck, Phone, MessageSquare, Heart } from 'lucide-react';
import { CropListing, User } from '../types';

interface CropDetailModalProps {
  crop: CropListing | null;
  onClose: () => void;
  currentUser: User;
  onOpenEnquiry: (crop: CropListing) => void;
  isFavorite: boolean;
  onToggleFavorite: (cropId: string) => void;
}

export const CropDetailModal: React.FC<CropDetailModalProps> = ({
  crop,
  onClose,
  currentUser,
  onOpenEnquiry,
  isFavorite,
  onToggleFavorite,
}) => {
  if (!crop) return null;

  const totalLotPrice = crop.quantityKg * crop.expectedPricePerKg;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-sm transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Image */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-gray-100">
          <img
            src={crop.imageUrl}
            alt={crop.cropName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Badges on image */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#168B5C] text-white shadow">
              {crop.category}
            </span>
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-bold shadow ${
                crop.status === 'Active'
                  ? 'bg-emerald-500 text-white'
                  : crop.status === 'Under Negotiation'
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-700 text-white'
              }`}
            >
              {crop.status}
            </span>
          </div>

          {/* Title & Price on Image Bottom */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <h2 className="text-2xl font-extrabold tracking-tight drop-shadow-md">
              {crop.cropName}
            </h2>
            {crop.variety && (
              <p className="text-sm text-emerald-200 drop-shadow-sm font-medium">
                Variety: {crop.variety}
              </p>
            )}
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-5 text-xs text-gray-700">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
              <span className="text-[11px] text-emerald-800 font-semibold block">Expected Price</span>
              <span className="text-lg font-extrabold text-[#168B5C]">₹{crop.expectedPricePerKg}</span>
              <span className="text-[10px] text-emerald-700 block">per kg (₹{crop.expectedPricePerKg * 100}/qtl)</span>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
              <span className="text-[11px] text-gray-500 font-semibold block">Available Stock</span>
              <span className="text-lg font-extrabold text-gray-900">{crop.quantityKg.toLocaleString('en-IN')} kg</span>
              <span className="text-[10px] text-gray-600 block">{(crop.quantityKg / 100).toFixed(1)} Quintals</span>
            </div>

            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200">
              <span className="text-[11px] text-gray-500 font-semibold block">Est. Lot Value</span>
              <span className="text-lg font-extrabold text-gray-900">₹{totalLotPrice.toLocaleString('en-IN')}</span>
              <span className="text-[10px] text-gray-600 block">Direct Seller Price</span>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
              <span className="text-[11px] text-amber-800 font-semibold block">Quality Grade</span>
              <span className="text-xs font-bold text-amber-900 block mt-1">
                {crop.qualityGrade || 'Grade A (Premium)'}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-bold text-gray-900 text-sm mb-1.5 flex items-center gap-1.5">
              <Tag className="w-4 h-4 text-[#168B5C]" />
              <span>Produce Description & Storage Condition</span>
            </h4>
            <p className="bg-gray-50 p-3.5 rounded-xl border border-gray-200 text-gray-700 leading-relaxed text-xs">
              {crop.description}
            </p>
          </div>

          {/* Farmer & Location Details */}
          <div className="p-4 bg-emerald-900/5 rounded-xl border border-emerald-800/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-[11px] text-emerald-800 font-bold uppercase tracking-wider block">Farmer Contact & Mandi Hub</span>
              <h5 className="font-bold text-sm text-gray-900 mt-0.5">{crop.farmerName}</h5>
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 mt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#168B5C]" />
                  <span>{crop.farmerDistrict}, {crop.farmerState}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-gray-500" />
                  <span>Harvested: {crop.harvestDate}</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleFavorite(crop.id)}
                className={`p-2.5 rounded-xl border transition-colors flex items-center gap-1.5 text-xs font-semibold ${
                  isFavorite
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{isFavorite ? 'Saved' : 'Save'}</span>
              </button>

              <a
                href={`tel:${crop.farmerPhone}`}
                className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-300 font-semibold text-xs flex items-center gap-1.5 transition-colors"
                title="Simulated Direct Phone Call"
              >
                <Phone className="w-4 h-4 text-emerald-700" />
                <span>Call Seller</span>
              </a>
            </div>
          </div>
        </div>

        {/* Modal Footer / Direct Action */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
            >
              Back to Marketplace
            </button>
            <a
              href={`/trade-receipt/${crop.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-xs transition-colors flex items-center gap-1.5"
              title="Server-rendered EJS trade receipt"
            >
              <span>📄 View EJS Mandi Receipt</span>
            </a>
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenEnquiry(crop);
            }}
            className="px-5 py-2.5 bg-[#168B5C] hover:bg-[#12724B] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 hover:scale-102"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Send Purchase Enquiry to {crop.farmerName.split(' ')[0]}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
