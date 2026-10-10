import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Grid,
  List,
  MapPin,
  Calendar,
  Plus,
  Heart,
  ChevronDown,
  Phone,
  MessageSquare,
  Sparkles,
  SlidersHorizontal,
  X,
  Check
} from 'lucide-react';
import { CropListing, CropCategory, User } from '../types';

interface MarketplacePageProps {
  crops: CropListing[];
  currentUser: User;
  onOpenListingModal: () => void;
  onSelectCropDetail: (crop: CropListing) => void;
  onOpenEnquiry: (crop: CropListing) => void;
  favorites: string[];
  onToggleFavorite: (cropId: string) => void;
}

export const MarketplacePage: React.FC<MarketplacePageProps> = ({
  crops,
  currentUser,
  onOpenListingModal,
  onSelectCropDetail,
  onOpenEnquiry,
  favorites,
  onToggleFavorite,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'qty-desc' | 'newest'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showMyListingsOnly, setShowMyListingsOnly] = useState(false);

  const categories: (CropCategory | 'All')[] = [
    'All',
    'Grains & Cereals',
    'Pulses & Legumes',
    'Vegetables',
    'Oilseeds',
    'Spices',
    'Commercial Crops',
  ];

  const states = useMemo(() => {
    const list = Array.from(new Set(crops.map((c) => c.farmerState)));
    return ['All', ...list];
  }, [crops]);

  const filteredCrops = useMemo(() => {
    return crops.filter((crop) => {
      // Search
      const matchesSearch =
        crop.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (crop.variety && crop.variety.toLowerCase().includes(searchQuery.toLowerCase())) ||
        crop.farmerDistrict.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crop.farmerState.toLowerCase().includes(searchQuery.toLowerCase());

      // Category
      const matchesCategory = selectedCategory === 'All' || crop.category === selectedCategory;

      // State
      const matchesState = selectedState === 'All' || crop.farmerState === selectedState;

      // Price
      const matchesPrice = crop.expectedPricePerKg <= maxPrice;

      // My listings only
      const matchesMyListings = !showMyListingsOnly || crop.farmerId === currentUser.id;

      return matchesSearch && matchesCategory && matchesState && matchesPrice && matchesMyListings;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.expectedPricePerKg - b.expectedPricePerKg;
      if (sortBy === 'price-desc') return b.expectedPricePerKg - a.expectedPricePerKg;
      if (sortBy === 'qty-desc') return b.quantityKg - a.quantityKg;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [crops, searchQuery, selectedCategory, selectedState, maxPrice, sortBy, showMyListingsOnly, currentUser]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#168B5C] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Live Mandi & Farm Produce
            </span>
            <span className="text-xs text-gray-500 font-medium">({filteredCrops.length} batches available)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
            Agricultural Crop Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Buy and sell freshly harvested crops directly with certified farmers across India.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {currentUser.role === 'farmer' && (
            <button
              onClick={() => setShowMyListingsOnly(!showMyListingsOnly)}
              className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors ${
                showMyListingsOnly
                  ? 'bg-emerald-100 text-[#0B362F] border-emerald-400'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {showMyListingsOnly ? 'Showing My Crops Only' : 'My Crops Only'}
            </button>
          )}

          <button
            onClick={onOpenListingModal}
            className="px-4 py-2.5 rounded-xl bg-[#168B5C] hover:bg-[#12724B] text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 hover:scale-102"
          >
            <Plus className="w-4 h-4" />
            <span>List Your Crop</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
        {/* Search & Top Controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by crop (Rice, Wheat, Potato, Onion...), variety, district..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#168B5C] focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full py-2 px-3 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#168B5C] focus:outline-none"
            >
              <option value="All">All States (Pan-India)</option>
              {states.filter((s) => s !== 'All').map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full py-2 px-3 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-[#168B5C] focus:outline-none"
            >
              <option value="newest">Recently Listed</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="qty-desc">Quantity: High to Low</option>
            </select>
          </div>

          <div className="md:col-span-2 flex items-center justify-end gap-2">
            <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-sm text-[#168B5C]' : 'text-gray-500 hover:text-gray-800'
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-sm text-[#168B5C]' : 'text-gray-500 hover:text-gray-800'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills & Price Slider */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-3 border-t border-gray-100">
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#168B5C] text-white shadow-sm font-bold'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-700 shrink-0">
            <span className="font-semibold text-gray-600">Max Price:</span>
            <input
              type="range"
              min={10}
              max={100}
              step={2}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="accent-[#168B5C] cursor-pointer w-28 sm:w-36"
            />
            <span className="font-bold text-[#168B5C] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              ₹{maxPrice}/kg
            </span>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredCrops.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 shadow-sm max-w-lg mx-auto space-y-3">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-[#168B5C] flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-gray-900">No crop listings match your filters</h3>
          <p className="text-xs text-gray-600">
            Try adjusting your search keyword, category, or maximum price slider.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedState('All');
              setMaxPrice(100);
              setShowMyListingsOnly(false);
            }}
            className="px-4 py-2 bg-emerald-100 text-[#0B362F] rounded-xl text-xs font-bold hover:bg-emerald-200 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCrops.map((crop) => {
            const isFav = favorites.includes(crop.id);
            const isOwner = crop.farmerId === currentUser.id;

            return (
              <div
                key={crop.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all flex flex-col group justify-between"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <img
                      src={crop.imageUrl}
                      alt={crop.cropName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Category & Status */}
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      <span className="bg-[#168B5C] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                        {crop.category}
                      </span>
                      {isOwner && (
                        <span className="bg-amber-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow">
                          My Crop
                        </span>
                      )}
                    </div>

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(crop.id);
                      }}
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 hover:bg-white text-gray-600 hover:text-rose-600 shadow transition-colors"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>

                    {/* Price tag */}
                    <div className="absolute bottom-2 right-2 bg-[#0B362F]/90 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg shadow text-right">
                      <div className="text-xs font-extrabold text-emerald-300">
                        ₹{crop.expectedPricePerKg}/kg
                      </div>
                      <div className="text-[9px] text-gray-300">
                        ₹{crop.expectedPricePerKg * 100}/qtl
                      </div>
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-4 space-y-2">
                    <div>
                      <h3 className="font-bold text-sm text-gray-900 group-hover:text-[#168B5C] transition-colors leading-tight">
                        {crop.cropName}
                      </h3>
                      {crop.variety && (
                        <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">
                          {crop.variety}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1 text-[11px] text-gray-600">
                      <div className="flex items-center justify-between">
                        <span>Stock Available:</span>
                        <strong className="text-gray-900">{crop.quantityKg.toLocaleString('en-IN')} kg</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Estimated Lot:</span>
                        <strong className="text-gray-900">₹{(crop.quantityKg * crop.expectedPricePerKg).toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 pt-1">
                        <MapPin className="w-3.5 h-3.5 text-[#168B5C] shrink-0" />
                        <span className="truncate">{crop.farmerDistrict}, {crop.farmerState}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400">
                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                        <span>Harvest: {crop.harvestDate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="p-4 pt-0 space-y-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectCropDetail(crop)}
                      className="flex-1 py-2 px-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs text-center transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => onOpenEnquiry(crop)}
                      className="flex-1 py-2 px-2.5 rounded-xl bg-[#168B5C] hover:bg-[#12724B] text-white font-bold text-xs text-center transition-colors flex items-center justify-center gap-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Enquire</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* LIST VIEW */
        <div className="space-y-3">
          {filteredCrops.map((crop) => {
            const isFav = favorites.includes(crop.id);
            const isOwner = crop.farmerId === currentUser.id;

            return (
              <div
                key={crop.id}
                className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={crop.imageUrl}
                    alt={crop.cropName}
                    className="w-20 h-20 rounded-xl object-cover border border-gray-200 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="bg-[#168B5C] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {crop.category}
                      </span>
                      {isOwner && (
                        <span className="bg-amber-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                          My Crop
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-sm text-gray-900 mt-1">
                      {crop.cropName} {crop.variety && <span className="text-gray-500 font-normal">({crop.variety})</span>}
                    </h3>
                    <p className="text-xs text-gray-600 mt-0.5">
                      📍 {crop.farmerDistrict}, {crop.farmerState} &bull; Farmer: {crop.farmerName}
                    </p>
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      Harvested: {crop.harvestDate} &bull; Grade: {crop.qualityGrade || 'Grade A'}
                    </p>
                  </div>
                </div>

                <div className="flex sm:flex-col items-end justify-between w-full sm:w-auto gap-3">
                  <div className="text-left sm:text-right">
                    <span className="text-base font-extrabold text-[#168B5C]">₹{crop.expectedPricePerKg}/kg</span>
                    <span className="text-xs text-gray-500 block">Available: {crop.quantityKg.toLocaleString('en-IN')} kg</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onToggleFavorite(crop.id)}
                      className="p-2 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-600"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                    <button
                      onClick={() => onSelectCropDetail(crop)}
                      className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-800"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => onOpenEnquiry(crop)}
                      className="px-3 py-1.5 rounded-xl bg-[#168B5C] hover:bg-[#12724B] text-white text-xs font-bold"
                    >
                      Contact Seller
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
