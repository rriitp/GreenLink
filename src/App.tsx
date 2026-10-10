/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { CropListingModal } from './components/CropListingModal';
import { CropDetailModal } from './components/CropDetailModal';
import { BuyerEnquiryModal } from './components/BuyerEnquiryModal';

import { LandingPage } from './pages/LandingPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { FarmerDashboard } from './pages/FarmerDashboard';
import { BuyerDashboard } from './pages/BuyerDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { GovSchemesPage } from './pages/GovSchemesPage';
import { WeatherAdvisoryPage } from './pages/WeatherAdvisoryPage';
import { CropPriceInsightsPage } from './pages/CropPriceInsightsPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { AboutPage } from './pages/AboutPage';

import { storageService } from './services/storageService';
import { User, CropListing, BuyerEnquiry } from './types';
import { GOVERNMENT_SCHEMES } from './data/mockData';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User>(() => storageService.getCurrentUser());
  const [crops, setCrops] = useState<CropListing[]>(() => storageService.getCrops());
  const [enquiries, setEnquiries] = useState<BuyerEnquiry[]>(() => storageService.getEnquiries());
  const [favorites, setFavorites] = useState<string[]>(() => storageService.getFavorites());

  const [currentTab, setCurrentTab] = useState<string>('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);
  const [editingCrop, setEditingCrop] = useState<CropListing | null>(null);
  const [selectedDetailCrop, setSelectedDetailCrop] = useState<CropListing | null>(null);
  const [enquiryCrop, setEnquiryCrop] = useState<CropListing | null>(null);

  // Global toast notification
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Sync current user change
  const handleSwitchUser = (newUser: User) => {
    setCurrentUser(newUser);
    storageService.setCurrentUser(newUser);
    showToast(`Switched persona to ${newUser.name} (${newUser.role})`);
  };

  // Save or edit crop
  const handleSaveCrop = (
    cropData: Omit<CropListing, 'id' | 'createdAt' | 'isApproved'>,
    editId?: string
  ) => {
    if (editId) {
      const updated = storageService.updateCrop(editId, cropData);
      if (updated) {
        setCrops(storageService.getCrops());
        showToast(`Listing "${updated.cropName}" updated successfully!`);
      }
    } else {
      const created = storageService.addCrop(cropData);
      setCrops(storageService.getCrops());
      showToast(`Crop "${created.cropName}" listed on the marketplace!`);
    }
    setEditingCrop(null);
    setIsListingModalOpen(false);
  };

  // Delete crop
  const handleDeleteCrop = (id: string) => {
    storageService.deleteCrop(id);
    setCrops(storageService.getCrops());
    showToast('Crop listing removed.', 'info');
  };

  // Submit Enquiry
  const handleSubmitEnquiry = (
    enquiryData: Omit<BuyerEnquiry, 'id' | 'enquiryDate' | 'status'>
  ) => {
    const created = storageService.addEnquiry(enquiryData);
    setEnquiries(storageService.getEnquiries());
    showToast(`Enquiry sent to ${created.farmerName} for ${created.cropName}!`);
  };

  // Update Enquiry Status
  const handleUpdateEnquiryStatus = (
    id: string,
    status: BuyerEnquiry['status'],
    reply?: string
  ) => {
    const updated = storageService.updateEnquiryStatus(id, status, reply);
    if (updated) {
      setEnquiries(storageService.getEnquiries());
      showToast(`Enquiry marked as "${status}".`);
    }
  };

  // Toggle Favorite
  const handleToggleFavorite = (cropId: string) => {
    const isNowFav = storageService.toggleFavorite(cropId);
    setFavorites(storageService.getFavorites());
    if (isNowFav) {
      showToast('Crop bookmarked to Buyer Dashboard.');
    } else {
      showToast('Crop removed from bookmarks.', 'info');
    }
  };

  // Reset Demo Data
  const handleResetData = () => {
    storageService.resetDemoData();
    setCurrentUser(storageService.getCurrentUser());
    setCrops(storageService.getCrops());
    setEnquiries(storageService.getEnquiries());
    setFavorites(storageService.getFavorites());
    showToast('All demo data reseeded to initial state.', 'info');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F0] text-gray-900 font-sans selection:bg-emerald-200 selection:text-emerald-900">
      {/* Toast Notification Alert */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-top-4 duration-300">
          <div
            className={`px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 text-xs font-bold border backdrop-blur-md ${
              toast.type === 'success'
                ? 'bg-emerald-900 text-white border-emerald-500'
                : 'bg-gray-900 text-white border-gray-700'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        currentUser={currentUser}
        onSwitchUser={handleSwitchUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onOpenNewListingModal={() => {
          setEditingCrop(null);
          setIsListingModalOpen(true);
        }}
        enquiries={enquiries}
      />

      {/* Body Page Content */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <LandingPage
            setCurrentTab={setCurrentTab}
            crops={crops}
            schemes={GOVERNMENT_SCHEMES}
            currentUser={currentUser}
            onOpenListingModal={() => {
              setEditingCrop(null);
              setIsListingModalOpen(true);
            }}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
            onSelectCropDetail={(crop) => setSelectedDetailCrop(crop)}
          />
        )}

        {currentTab === 'marketplace' && (
          <MarketplacePage
            crops={crops}
            currentUser={currentUser}
            onOpenListingModal={() => {
              setEditingCrop(null);
              setIsListingModalOpen(true);
            }}
            onSelectCropDetail={(crop) => setSelectedDetailCrop(crop)}
            onOpenEnquiry={(crop) => setEnquiryCrop(crop)}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {currentTab === 'farmer-dashboard' && (
          <FarmerDashboard
            currentUser={currentUser}
            crops={crops}
            enquiries={enquiries}
            schemes={GOVERNMENT_SCHEMES}
            onOpenListingModal={() => {
              setEditingCrop(null);
              setIsListingModalOpen(true);
            }}
            onEditCrop={(crop) => {
              setEditingCrop(crop);
              setIsListingModalOpen(true);
            }}
            onDeleteCrop={handleDeleteCrop}
            onUpdateEnquiryStatus={handleUpdateEnquiryStatus}
            setCurrentTab={setCurrentTab}
          />
        )}

        {currentTab === 'buyer-dashboard' && (
          <BuyerDashboard
            currentUser={currentUser}
            crops={crops}
            enquiries={enquiries}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectCropDetail={(crop) => setSelectedDetailCrop(crop)}
            setCurrentTab={setCurrentTab}
          />
        )}

        {currentTab === 'admin-dashboard' && (
          <AdminDashboard
            currentUser={currentUser}
            crops={crops}
            schemes={GOVERNMENT_SCHEMES}
            enquiries={enquiries}
            onUpdateCrop={(id, updates) => {
              storageService.updateCrop(id, updates);
              setCrops(storageService.getCrops());
            }}
            onResetData={handleResetData}
            setCurrentTab={setCurrentTab}
          />
        )}

        {currentTab === 'schemes' && (
          <GovSchemesPage
            schemes={GOVERNMENT_SCHEMES}
            setCurrentTab={setCurrentTab}
          />
        )}

        {currentTab === 'weather' && <WeatherAdvisoryPage />}

        {currentTab === 'prices' && <CropPriceInsightsPage />}

        {currentTab === 'ai-assistant' && <AIAssistantPage currentUser={currentUser} />}

        {currentTab === 'about' && <AboutPage setCurrentTab={setCurrentTab} />}
      </main>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        onSelectUser={handleSwitchUser}
      />

      <CropListingModal
        isOpen={isListingModalOpen}
        onClose={() => {
          setIsListingModalOpen(false);
          setEditingCrop(null);
        }}
        currentUser={currentUser}
        onSaveCrop={handleSaveCrop}
        editingCrop={editingCrop}
      />

      <CropDetailModal
        crop={selectedDetailCrop}
        onClose={() => setSelectedDetailCrop(null)}
        currentUser={currentUser}
        onOpenEnquiry={(crop) => {
          setSelectedDetailCrop(null);
          setEnquiryCrop(crop);
        }}
        isFavorite={selectedDetailCrop ? favorites.includes(selectedDetailCrop.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      <BuyerEnquiryModal
        crop={enquiryCrop}
        isOpen={!!enquiryCrop}
        onClose={() => setEnquiryCrop(null)}
        currentUser={currentUser}
        onSubmitEnquiry={handleSubmitEnquiry}
      />

      {/* Footer */}
      <Footer setCurrentTab={setCurrentTab} onResetData={handleResetData} />
    </div>
  );
}
