export type UserRole = 'farmer' | 'buyer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  state: string;
  district: string;
  preferredLanguage: string;
  phone?: string;
  farmSizeAcres?: number;
  businessType?: string;
  avatar?: string;
}

export type CropCategory =
  | 'Grains & Cereals'
  | 'Pulses & Legumes'
  | 'Vegetables'
  | 'Oilseeds'
  | 'Spices'
  | 'Commercial Crops';

export type ListingStatus = 'Active' | 'Under Negotiation' | 'Sold' | 'Pending Review';

export interface CropListing {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerDistrict: string;
  farmerState: string;
  farmerPhone: string;
  cropName: string;
  category: CropCategory;
  variety?: string;
  quantityKg: number;
  expectedPricePerKg: number;
  harvestDate: string;
  description: string;
  imageUrl: string;
  status: ListingStatus;
  createdAt: string;
  isApproved: boolean;
  qualityGrade?: 'Grade A (Premium)' | 'Grade B (Standard)' | 'Organic Certified';
}

export type EnquiryStatus = 'Pending' | 'Accepted' | 'Declined' | 'In Discussion';

export interface BuyerEnquiry {
  id: string;
  cropId: string;
  cropName: string;
  cropImageUrl?: string;
  farmerId: string;
  farmerName: string;
  buyerId: string;
  buyerName: string;
  buyerCompany?: string;
  buyerPhone?: string;
  buyerDistrict: string;
  buyerState: string;
  requestedQuantityKg: number;
  offeredPricePerKg: number;
  message?: string;
  enquiryDate: string;
  status: EnquiryStatus;
  farmerReply?: string;
}

export interface GovernmentScheme {
  id: string;
  name: string;
  hindiName: string;
  category: 'Direct Income' | 'Insurance' | 'Credit & Loan' | 'Soil & Inputs' | 'Irrigation & Solar';
  purpose: string;
  beneficiaries: string;
  eligibility: string[];
  benefits: string;
  requiredDocuments: string[];
  officialUrl: string;
  verifiedSource: string;
  isCentrallySponsored: boolean;
}

export interface MarketPriceObservation {
  id: string;
  crop: string;
  variety: string;
  mandi: string;
  district: string;
  state: string;
  minPrice: number; // per quintal (100 kg)
  maxPrice: number;
  modalPrice: number;
  msp: number; // Minimum Support Price benchmark
  lastUpdated: string;
  historicalTrend: { month: string; modalPrice: number; msp: number }[];
}

export interface WeatherData {
  state: string;
  district: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  conditionIcon: string;
  humidity: number;
  rainProbability: number;
  windSpeedKmH: number;
  soilMoistureEstimate: 'Optimal' | 'Slightly Dry' | 'Excess Moisture';
  advisory: string[];
  forecast7Day: {
    day: string;
    date: string;
    tempMax: number;
    tempMin: number;
    rainProb: number;
    condition: string;
  }[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isLiveAI?: boolean;
}
