import React, { useState, useEffect } from 'react';
import { X, Plus, Edit2, Image, Check, AlertCircle } from 'lucide-react';
import { CropListing, CropCategory, User } from '../types';

interface CropListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onSaveCrop: (cropData: Omit<CropListing, 'id' | 'createdAt' | 'isApproved'>, editId?: string) => void;
  editingCrop?: CropListing | null;
}

const CROP_IMAGE_PRESETS: { label: string; url: string }[] = [
  {
    label: 'Basmati Rice',
    url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Wheat Grains',
    url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Maize / Corn',
    url: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Fresh Potatoes',
    url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Red Onions',
    url: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Hybrid Tomatoes',
    url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Mustard Seeds',
    url: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80',
  },
  {
    label: 'Soybean / Pulses',
    url: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=800&q=80',
  },
];

export const CropListingModal: React.FC<CropListingModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSaveCrop,
  editingCrop,
}) => {
  const [cropName, setCropName] = useState('');
  const [category, setCategory] = useState<CropCategory>('Grains & Cereals');
  const [variety, setVariety] = useState('');
  const [quantityKg, setQuantityKg] = useState<number | ''>('');
  const [expectedPricePerKg, setExpectedPricePerKg] = useState<number | ''>('');
  const [harvestDate, setHarvestDate] = useState('');
  const [state, setState] = useState(currentUser.state || 'Punjab');
  const [district, setDistrict] = useState(currentUser.district || 'Ludhiana');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(CROP_IMAGE_PRESETS[0].url);
  const [qualityGrade, setQualityGrade] = useState<'Grade A (Premium)' | 'Grade B (Standard)' | 'Organic Certified'>('Grade A (Premium)');
  const [status, setStatus] = useState<'Active' | 'Under Negotiation' | 'Sold' | 'Pending Review'>('Active');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editingCrop) {
      setCropName(editingCrop.cropName);
      setCategory(editingCrop.category);
      setVariety(editingCrop.variety || '');
      setQuantityKg(editingCrop.quantityKg);
      setExpectedPricePerKg(editingCrop.expectedPricePerKg);
      setHarvestDate(editingCrop.harvestDate || '');
      setState(editingCrop.farmerState);
      setDistrict(editingCrop.farmerDistrict);
      setDescription(editingCrop.description);
      setImageUrl(editingCrop.imageUrl);
      setQualityGrade(editingCrop.qualityGrade || 'Grade A (Premium)');
      setStatus(editingCrop.status);
    } else {
      setCropName('');
      setCategory('Grains & Cereals');
      setVariety('');
      setQuantityKg('');
      setExpectedPricePerKg('');
      setHarvestDate(new Date().toISOString().split('T')[0]);
      setState(currentUser.state || 'Punjab');
      setDistrict(currentUser.district || 'Ludhiana');
      setDescription('');
      setImageUrl(CROP_IMAGE_PRESETS[0].url);
      setQualityGrade('Grade A (Premium)');
      setStatus('Active');
    }
    setErrors({});
  }, [editingCrop, currentUser, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!cropName.trim()) errs.cropName = 'Crop name is required (e.g., Basmati Rice, Sharbati Wheat)';
    if (!quantityKg || Number(quantityKg) <= 0) errs.quantityKg = 'Quantity must be greater than 0 kg';
    if (!expectedPricePerKg || Number(expectedPricePerKg) <= 0) errs.expectedPricePerKg = 'Expected price must be greater than ₹0/kg';
    if (!district.trim()) errs.district = 'District is required';
    if (!description.trim() || description.length < 15) errs.description = 'Please provide at least 15 characters of description (moisture, grading, packing)';
    if (!imageUrl.trim()) errs.imageUrl = 'Crop image is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    onSaveCrop(
      {
        farmerId: currentUser.id,
        farmerName: currentUser.name,
        farmerDistrict: district.trim(),
        farmerState: state,
        farmerPhone: currentUser.phone || '+91 98765 43210',
        cropName: cropName.trim(),
        category,
        variety: variety.trim() || undefined,
        quantityKg: Number(quantityKg),
        expectedPricePerKg: Number(expectedPricePerKg),
        harvestDate: harvestDate || new Date().toISOString().split('T')[0],
        description: description.trim(),
        imageUrl: imageUrl.trim(),
        status,
        qualityGrade,
      },
      editingCrop ? editingCrop.id : undefined
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-[#0B362F] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#168B5C] flex items-center justify-center">
              {editingCrop ? <Edit2 className="w-4 h-4 text-white" /> : <Plus className="w-4 h-4 text-white" />}
            </div>
            <div>
              <h3 className="font-extrabold text-lg">
                {editingCrop ? 'Edit Crop Listing' : 'List Your Crop on Marketplace'}
              </h3>
              <p className="text-xs text-emerald-200/80">
                Direct buyer connection &bull; No middleman brokerage
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 max-h-[80vh] overflow-y-auto space-y-4 text-xs">
          {/* Row 1: Crop Name & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Crop Name *</label>
              <input
                type="text"
                placeholder="e.g., Basmati Rice, Sharbati Wheat, Tomatoes"
                value={cropName}
                onChange={(e) => setCropName(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-[#168B5C] ${
                  errors.cropName ? 'border-red-400 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.cropName && <p className="text-[11px] text-red-600 mt-0.5">{errors.cropName}</p>}
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Crop Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CropCategory)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#168B5C]"
              >
                <option value="Grains & Cereals">Grains & Cereals (अनाज)</option>
                <option value="Pulses & Legumes">Pulses & Legumes (दालें)</option>
                <option value="Vegetables">Vegetables (सब्जियां)</option>
                <option value="Oilseeds">Oilseeds (तिलहन)</option>
                <option value="Spices">Spices (मसाले)</option>
                <option value="Commercial Crops">Commercial Crops (व्यावसायिक)</option>
              </select>
            </div>
          </div>

          {/* Row 2: Variety & Grade */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Specific Variety / Seed (Optional)</label>
              <input
                type="text"
                placeholder="e.g., Pusa 1121, Kufri Jyoti, Lokwan"
                value={variety}
                onChange={(e) => setVariety(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#168B5C]"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Quality Grade</label>
              <select
                value={qualityGrade}
                onChange={(e) => setQualityGrade(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#168B5C]"
              >
                <option value="Grade A (Premium)">Grade A (Premium) - Machine Cleaned</option>
                <option value="Grade B (Standard)">Grade B (Standard) - Farm Sorted</option>
                <option value="Organic Certified">Organic Certified (Jaivik)</option>
              </select>
            </div>
          </div>

          {/* Row 3: Quantity & Expected Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Available Quantity (in Kilograms) *</label>
              <input
                type="number"
                placeholder="e.g., 5000 (50 Quintals)"
                value={quantityKg}
                onChange={(e) => setQuantityKg(e.target.value === '' ? '' : Number(e.target.value))}
                className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-[#168B5C] ${
                  errors.quantityKg ? 'border-red-400 bg-red-50' : 'border-gray-300'
                }`}
              />
              {quantityKg && Number(quantityKg) > 0 && (
                <p className="text-[11px] text-emerald-700 font-medium mt-0.5">
                  Approx. {(Number(quantityKg) / 100).toFixed(1)} Quintals ({(Number(quantityKg) / 1000).toFixed(2)} Metric Tonnes)
                </p>
              )}
              {errors.quantityKg && <p className="text-[11px] text-red-600 mt-0.5">{errors.quantityKg}</p>}
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Expected Price (₹ per kg) *</label>
              <input
                type="number"
                placeholder="e.g., 38"
                value={expectedPricePerKg}
                onChange={(e) => setExpectedPricePerKg(e.target.value === '' ? '' : Number(e.target.value))}
                className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-[#168B5C] ${
                  errors.expectedPricePerKg ? 'border-red-400 bg-red-50' : 'border-gray-300'
                }`}
              />
              {expectedPricePerKg && Number(expectedPricePerKg) > 0 && (
                <p className="text-[11px] text-emerald-700 font-medium mt-0.5">
                  Equivalent to ₹{Number(expectedPricePerKg) * 100}/quintal
                  {quantityKg && ` &bull; Total lot value: ₹${(Number(quantityKg) * Number(expectedPricePerKg)).toLocaleString('en-IN')}`}
                </p>
              )}
              {errors.expectedPricePerKg && <p className="text-[11px] text-red-600 mt-0.5">{errors.expectedPricePerKg}</p>}
            </div>
          </div>

          {/* Row 4: Location & Harvest Date */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">State *</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
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
                placeholder="e.g., Ludhiana"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-[#168B5C] ${
                  errors.district ? 'border-red-400 bg-red-50' : 'border-gray-300'
                }`}
              />
              {errors.district && <p className="text-[11px] text-red-600 mt-0.5">{errors.district}</p>}
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Harvest Date</label>
              <input
                type="date"
                value={harvestDate}
                onChange={(e) => setHarvestDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#168B5C]"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Description (Quality, Moisture, Storage) *</label>
            <textarea
              rows={3}
              placeholder="e.g., Cleaned, naturally sun-dried grain, moisture under 12%. Stored in moisture-proof 50kg gunny bags. Ready for prompt road transport loading."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-[#168B5C] ${
                errors.description ? 'border-red-400 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.description && <p className="text-[11px] text-red-600 mt-0.5">{errors.description}</p>}
          </div>

          {/* Image Presets & Selection */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Select Crop Photo Preset or Custom URL *</label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-2">
              {CROP_IMAGE_PRESETS.map((preset) => (
                <div
                  key={preset.label}
                  onClick={() => setImageUrl(preset.url)}
                  className={`relative rounded-lg overflow-hidden border-2 cursor-pointer transition-transform hover:scale-105 h-14 ${
                    imageUrl === preset.url ? 'border-[#168B5C] ring-2 ring-emerald-400' : 'border-gray-200 opacity-70'
                  }`}
                  title={preset.label}
                >
                  <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                  {imageUrl === preset.url && (
                    <div className="absolute inset-0 bg-[#168B5C]/30 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white drop-shadow" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <input
              type="url"
              placeholder="Or paste external image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#168B5C]"
            />
            {errors.imageUrl && <p className="text-[11px] text-red-600 mt-0.5">{errors.imageUrl}</p>}
          </div>

          {/* Status if editing */}
          {editingCrop && (
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Listing Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs focus:outline-none focus:ring-2 focus:ring-[#168B5C]"
              >
                <option value="Active">Active (Available on Marketplace)</option>
                <option value="Under Negotiation">Under Negotiation (Buyer Discussing)</option>
                <option value="Sold">Sold (Harvest Completed)</option>
              </select>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-3 border-t border-gray-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 font-semibold text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#168B5C] hover:bg-[#12724B] text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>{editingCrop ? 'Update Listing' : 'Publish Crop to Marketplace'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
