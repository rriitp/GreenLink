import React, { useState } from 'react';
import { X, Send, ShoppingBag, CheckCircle, AlertCircle } from 'lucide-react';
import { CropListing, User, BuyerEnquiry } from '../types';

interface BuyerEnquiryModalProps {
  crop: CropListing | null;
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onSubmitEnquiry: (enquiryData: Omit<BuyerEnquiry, 'id' | 'enquiryDate' | 'status'>) => void;
}

export const BuyerEnquiryModal: React.FC<BuyerEnquiryModalProps> = ({
  crop,
  isOpen,
  onClose,
  currentUser,
  onSubmitEnquiry,
}) => {
  if (!isOpen || !crop) return null;

  const [requestedQty, setRequestedQty] = useState<number | ''>(Math.min(1000, crop.quantityKg));
  const [offeredPrice, setOfferedPrice] = useState<number | ''>(crop.expectedPricePerKg);
  const [message, setMessage] = useState(
    `Hello ${crop.farmerName}, we are interested in purchasing ${Math.min(1000, crop.quantityKg)} kg of your ${crop.cropName} batch. Please let us know your delivery terms.`
  );
  const [buyerCompany, setBuyerCompany] = useState(currentUser.businessType || 'Wholesale Buyer');
  const [buyerPhone, setBuyerPhone] = useState(currentUser.phone || '+91 91234 56789');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!requestedQty || Number(requestedQty) <= 0) {
      setError('Please specify a valid quantity greater than 0 kg.');
      return;
    }
    if (Number(requestedQty) > crop.quantityKg) {
      setError(`Requested quantity cannot exceed available stock (${crop.quantityKg} kg).`);
      return;
    }
    if (!offeredPrice || Number(offeredPrice) <= 0) {
      setError('Please specify an offered price.');
      return;
    }

    onSubmitEnquiry({
      cropId: crop.id,
      cropName: crop.cropName,
      cropImageUrl: crop.imageUrl,
      farmerId: crop.farmerId,
      farmerName: crop.farmerName,
      buyerId: currentUser.id,
      buyerName: currentUser.name,
      buyerCompany,
      buyerPhone,
      buyerDistrict: currentUser.district,
      buyerState: currentUser.state,
      requestedQuantityKg: Number(requestedQty),
      offeredPricePerKg: Number(offeredPrice),
      message: message.trim(),
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-[#0B362F] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#168B5C] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base">Send Purchase Enquiry</h3>
              <p className="text-xs text-emerald-200/80">
                To Farmer: {crop.farmerName} ({crop.farmerDistrict})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-900/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h4 className="text-lg font-bold text-gray-900">Enquiry Submitted Successfully!</h4>
            <p className="text-xs text-gray-600 max-w-sm mx-auto">
              Your trade enquiry has been delivered to {crop.farmerName}. You can track responses inside your Buyer Dashboard.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            {/* Target Crop Summary Card */}
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 flex items-center gap-3">
              <img
                src={crop.imageUrl}
                alt={crop.cropName}
                className="w-14 h-14 rounded-lg object-cover border border-gray-300"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-900 text-sm truncate">{crop.cropName}</h4>
                <p className="text-[11px] text-gray-500">
                  Seller Price: <strong className="text-[#168B5C]">₹{crop.expectedPricePerKg}/kg</strong> &bull; Total Available: <strong>{crop.quantityKg} kg</strong>
                </p>
                <p className="text-[10px] text-gray-400">
                  Location: {crop.farmerDistrict}, {crop.farmerState}
                </p>
              </div>
            </div>

            {error && (
              <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 rounded-lg text-[11px] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                <span>{error}</span>
              </div>
            )}

            {/* Inputs Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Requested Quantity (kg) *</label>
                <input
                  type="number"
                  max={crop.quantityKg}
                  min={10}
                  value={requestedQty}
                  onChange={(e) => setRequestedQty(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#168B5C] focus:outline-none"
                />
                <span className="text-[10px] text-gray-500 mt-0.5 block">
                  Max available: {crop.quantityKg} kg
                </span>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Your Offer (₹ / kg) *</label>
                <input
                  type="number"
                  step="0.5"
                  value={offeredPrice}
                  onChange={(e) => setOfferedPrice(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#168B5C] focus:outline-none"
                />
                <span className="text-[10px] text-gray-500 mt-0.5 block">
                  Estimated: ₹{Number(requestedQty || 0) * Number(offeredPrice || 0)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Company / Business Name</label>
                <input
                  type="text"
                  value={buyerCompany}
                  onChange={(e) => setBuyerCompany(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#168B5C] focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#168B5C] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Message to Farmer</label>
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Mention inspection requirements, pickup schedule, or transport terms..."
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:ring-2 focus:ring-[#168B5C] focus:outline-none"
              />
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-gray-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-[#168B5C] hover:bg-[#12724B] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Trade Enquiry</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
