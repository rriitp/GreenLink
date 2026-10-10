import { User, CropListing, BuyerEnquiry } from '../types';
import { DEMO_USERS, INITIAL_CROPS } from '../data/mockData';

const STORAGE_KEYS = {
  CROPS: 'greenlink_crops_v1',
  ENQUIRIES: 'greenlink_enquiries_v1',
  CURRENT_USER: 'greenlink_current_user_v1',
  FAVORITES: 'greenlink_favorites_v1',
};

const INITIAL_ENQUIRIES: BuyerEnquiry[] = [
  {
    id: 'enq_1',
    cropId: 'crop_1',
    cropName: 'Basmati Rice (1121)',
    cropImageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80',
    farmerId: 'user_farmer_1',
    farmerName: 'Ramesh Kumar',
    buyerId: 'user_buyer_1',
    buyerName: 'Anita Sharma',
    buyerCompany: 'AgriFoods Processing & Wholesale Ltd',
    buyerPhone: '+91 91234 56789',
    buyerDistrict: 'New Delhi',
    buyerState: 'Delhi',
    requestedQuantityKg: 2000,
    offeredPricePerKg: 47,
    message: 'Hello Ramesh ji, we are interested in buying 2,000 kg of Basmati 1121 for our wholesale packaging unit in Delhi. Can you arrange direct dispatch if we confirm the inspection?',
    enquiryDate: '2026-10-06T11:30:00Z',
    status: 'Pending',
  },
  {
    id: 'enq_2',
    cropId: 'crop_2',
    cropName: 'Sharbati Wheat',
    cropImageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80',
    farmerId: 'user_farmer_1',
    farmerName: 'Ramesh Kumar',
    buyerId: 'user_buyer_1',
    buyerName: 'Anita Sharma',
    buyerCompany: 'AgriFoods Processing & Wholesale Ltd',
    buyerPhone: '+91 91234 56789',
    buyerDistrict: 'New Delhi',
    buyerState: 'Delhi',
    requestedQuantityKg: 4000,
    offeredPricePerKg: 31.5,
    message: 'Interested in the golden Sharbati wheat batch for our premium stone-ground flour line. What is the moisture certification status?',
    enquiryDate: '2026-10-07T14:15:00Z',
    status: 'In Discussion',
    farmerReply: 'Grain moisture is tested at 11.8%, perfectly cleaned and packed in 50kg bags.',
  },
];

export const storageService = {
  // Crops
  getCrops(): CropListing[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CROPS);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error reading crops from storage:', e);
    }
    // Seed initial crops
    this.saveCrops(INITIAL_CROPS);
    return INITIAL_CROPS;
  },

  saveCrops(crops: CropListing[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.CROPS, JSON.stringify(crops));
    } catch (e) {
      console.error('Error saving crops to storage:', e);
    }
  },

  addCrop(cropData: Omit<CropListing, 'id' | 'createdAt' | 'isApproved'>): CropListing {
    const crops = this.getCrops();
    const newCrop: CropListing = {
      ...cropData,
      id: 'crop_' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      isApproved: true,
    };
    crops.unshift(newCrop);
    this.saveCrops(crops);
    return newCrop;
  },

  updateCrop(id: string, updates: Partial<CropListing>): CropListing | null {
    const crops = this.getCrops();
    const index = crops.findIndex((c) => c.id === id);
    if (index === -1) return null;
    crops[index] = { ...crops[index], ...updates };
    this.saveCrops(crops);
    return crops[index];
  },

  deleteCrop(id: string): boolean {
    const crops = this.getCrops();
    const filtered = crops.filter((c) => c.id !== id);
    if (filtered.length !== crops.length) {
      this.saveCrops(filtered);
      return true;
    }
    return false;
  },

  // Enquiries
  getEnquiries(): BuyerEnquiry[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error reading enquiries from storage:', e);
    }
    this.saveEnquiries(INITIAL_ENQUIRIES);
    return INITIAL_ENQUIRIES;
  },

  saveEnquiries(enquiries: BuyerEnquiry[]) {
    try {
      localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
    } catch (e) {
      console.error('Error saving enquiries to storage:', e);
    }
  },

  addEnquiry(enquiryData: Omit<BuyerEnquiry, 'id' | 'enquiryDate' | 'status'>): BuyerEnquiry {
    const enquiries = this.getEnquiries();
    const newEnquiry: BuyerEnquiry = {
      ...enquiryData,
      id: 'enq_' + Date.now(),
      enquiryDate: new Date().toISOString(),
      status: 'Pending',
    };
    enquiries.unshift(newEnquiry);
    this.saveEnquiries(enquiries);
    return newEnquiry;
  },

  updateEnquiryStatus(id: string, status: BuyerEnquiry['status'], farmerReply?: string): BuyerEnquiry | null {
    const enquiries = this.getEnquiries();
    const index = enquiries.findIndex((e) => e.id === id);
    if (index === -1) return null;
    enquiries[index].status = status;
    if (farmerReply !== undefined) {
      enquiries[index].farmerReply = farmerReply;
    }
    this.saveEnquiries(enquiries);
    return enquiries[index];
  },

  // Favourites
  getFavorites(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error reading favorites:', e);
    }
    return ['crop_1', 'crop_4']; // Default favorites for buyer
  },

  toggleFavorite(cropId: string): boolean {
    const favorites = this.getFavorites();
    const index = favorites.indexOf(cropId);
    let isFav = false;
    if (index === -1) {
      favorites.push(cropId);
      isFav = true;
    } else {
      favorites.splice(index, 1);
      isFav = false;
    }
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    } catch (e) {
      console.error('Error saving favorites:', e);
    }
    return isFav;
  },

  // Current User
  getCurrentUser(): User {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error reading current user:', e);
    }
    // Default to Farmer demo user
    const defaultUser = DEMO_USERS[0];
    this.setCurrentUser(defaultUser);
    return defaultUser;
  },

  setCurrentUser(user: User) {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } catch (e) {
      console.error('Error saving current user:', e);
    }
  },

  // Reset Demo Data
  resetDemoData() {
    localStorage.removeItem(STORAGE_KEYS.CROPS);
    localStorage.removeItem(STORAGE_KEYS.ENQUIRIES);
    localStorage.removeItem(STORAGE_KEYS.FAVORITES);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    this.saveCrops(INITIAL_CROPS);
    this.saveEnquiries(INITIAL_ENQUIRIES);
    this.setCurrentUser(DEMO_USERS[0]);
  },
};
