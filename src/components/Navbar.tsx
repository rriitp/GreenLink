import React, { useState } from 'react';
import { Sprout, ShoppingBag, TrendingUp, CloudSun, BookOpen, Bot, Info, UserCircle, Bell, Plus, Menu, X, Check, ShieldCheck } from 'lucide-react';
import { User, BuyerEnquiry } from '../types';
import { DEMO_USERS } from '../data/mockData';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  currentUser: User;
  onSwitchUser: (user: User) => void;
  onOpenAuthModal: () => void;
  onOpenNewListingModal: () => void;
  enquiries: BuyerEnquiry[];
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  currentUser,
  onSwitchUser,
  onOpenAuthModal,
  onOpenNewListingModal,
  enquiries,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Relevant enquiries for notifications
  const relevantEnquiries = currentUser.role === 'farmer'
    ? enquiries.filter((e) => e.farmerId === currentUser.id && e.status === 'Pending')
    : enquiries.filter((e) => e.buyerId === currentUser.id);

  const navItems = [
    { id: 'home', label: 'Home', icon: Sprout },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
    { id: 'prices', label: 'Mandi Prices', icon: TrendingUp },
    { id: 'weather', label: 'Weather & Advisory', icon: CloudSun },
    { id: 'schemes', label: 'Gov Schemes', icon: BookOpen },
    { id: 'ai-assistant', label: 'AI Assistant', icon: Bot },
    { id: 'about', label: 'About', icon: Info },
  ];

  const getDashboardTabId = () => {
    if (currentUser.role === 'farmer') return 'farmer-dashboard';
    if (currentUser.role === 'buyer') return 'buyer-dashboard';
    return 'admin-dashboard';
  };

  const getDashboardLabel = () => {
    if (currentUser.role === 'farmer') return 'Farmer Dashboard';
    if (currentUser.role === 'buyer') return 'Buyer Dashboard';
    return 'Admin Dashboard';
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0B362F] text-white shadow-md border-b border-[#168B5C]/30">
      {/* Top Hackathon Banner */}
      <div className="bg-[#168B5C] text-xs py-1 px-4 text-center font-medium flex items-center justify-center gap-2 text-white">
        <span className="inline-block w-2 h-2 rounded-full bg-emerald-200 animate-pulse"></span>
        <span>
          <strong>Hackoverflow 10.0, NIT Durgapur</strong> &bull; Team <strong>HackForge</strong> (Rahul Raj & Rajan Aryan) &bull; GreenLink Prototype v1.0
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => {
              setCurrentTab('home');
              setMobileMenuOpen(false);
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-[#168B5C] flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white">GreenLink</span>
                <span className="text-[10px] bg-emerald-800 text-emerald-200 uppercase font-bold tracking-wider px-1.5 py-0.5 rounded">AgriTech</span>
              </div>
              <p className="text-[11px] text-emerald-200/80 -mt-0.5 hidden sm:block">Connecting Farmers. Enabling Fair Markets.</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs xl:text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#168B5C] text-white shadow-sm font-semibold'
                      : 'text-emerald-100/90 hover:bg-emerald-900/60 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 opacity-90" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2.5">
            {/* Quick "List Crop" button for Farmer */}
            {currentUser.role === 'farmer' && (
              <button
                onClick={onOpenNewListingModal}
                className="hidden sm:flex items-center gap-1.5 bg-[#168B5C] hover:bg-[#12724B] text-white text-xs font-semibold px-3 py-2 rounded-lg shadow transition-all hover:scale-102"
              >
                <Plus className="w-4 h-4" />
                <span>List Crop</span>
              </button>
            )}

            {/* Direct Role Dashboard Button */}
            <button
              onClick={() => setCurrentTab(getDashboardTabId())}
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                currentTab === getDashboardTabId()
                  ? 'bg-white text-[#0B362F] border-white shadow'
                  : 'bg-emerald-900/40 text-emerald-200 border-emerald-700/60 hover:bg-emerald-800/60 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{getDashboardLabel()}</span>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 text-emerald-200 hover:text-white hover:bg-emerald-900/50 rounded-lg transition-colors"
                title="Notifications & Enquiries"
              >
                <Bell className="w-5 h-5" />
                {relevantEnquiries.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">
                    {relevantEnquiries.length}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 text-gray-800 z-50 p-3">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                    <span className="font-semibold text-xs text-gray-700">Recent Enquiries & Updates</span>
                    <button
                      onClick={() => setNotificationsOpen(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="py-2 space-y-2 max-h-60 overflow-y-auto">
                    {relevantEnquiries.length === 0 ? (
                      <p className="text-xs text-gray-500 py-3 text-center">No new pending enquiries.</p>
                    ) : (
                      relevantEnquiries.map((enq) => (
                        <div
                          key={enq.id}
                          onClick={() => {
                            setNotificationsOpen(false);
                            setCurrentTab(getDashboardTabId());
                          }}
                          className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-100 cursor-pointer text-xs"
                        >
                          <div className="font-semibold text-[#0B362F] flex justify-between">
                            <span>{enq.cropName}</span>
                            <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-medium">
                              {enq.status}
                            </span>
                          </div>
                          <p className="text-gray-600 text-[11px] mt-0.5 line-clamp-1">
                            {currentUser.role === 'farmer' ? `From: ${enq.buyerName} (${enq.requestedQuantityKg} kg)` : `Sent to: ${enq.farmerName}`}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="pt-2 border-t border-gray-100 text-center">
                    <button
                      onClick={() => {
                        setNotificationsOpen(false);
                        setCurrentTab(getDashboardTabId());
                      }}
                      className="text-xs font-semibold text-[#168B5C] hover:underline"
                    >
                      Go to {getDashboardLabel()} &rarr;
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile & Demo Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 bg-[#082823] hover:bg-[#07201c] p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg border border-emerald-700/50 transition-colors"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-full object-cover border border-emerald-400"
                />
                <div className="hidden sm:block text-left text-xs">
                  <div className="font-semibold text-white leading-tight flex items-center gap-1">
                    <span>{currentUser.name.split(' ')[0]}</span>
                    <span className="text-[10px] uppercase font-bold px-1 rounded bg-[#168B5C] text-white">
                      {currentUser.role}
                    </span>
                  </div>
                  <div className="text-[10px] text-emerald-300/80 leading-tight">
                    {currentUser.district}, {currentUser.state}
                  </div>
                </div>
              </button>

              {/* User Switcher Dropdown */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 text-gray-800 z-50 p-3">
                  <div className="pb-2 border-b border-gray-100">
                    <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Demo User Roles</p>
                    <p className="text-xs text-gray-600 mt-0.5">Switch persona to test features:</p>
                  </div>

                  <div className="py-2 space-y-1.5">
                    {DEMO_USERS.map((user) => {
                      const isSelected = user.id === currentUser.id;
                      return (
                        <button
                          key={user.id}
                          onClick={() => {
                            onSwitchUser(user);
                            setUserDropdownOpen(false);
                          }}
                          className={`w-full flex items-center gap-2.5 p-2 rounded-lg text-left transition-colors text-xs ${
                            isSelected
                              ? 'bg-emerald-50 text-[#0B362F] font-bold border border-emerald-200'
                              : 'hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-7 h-7 rounded-full object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold truncate">{user.name}</span>
                              <span
                                className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                                  user.role === 'farmer'
                                    ? 'bg-green-100 text-green-800'
                                    : user.role === 'buyer'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-purple-100 text-purple-800'
                                }`}
                              >
                                {user.role}
                              </span>
                            </div>
                            <span className="text-[11px] text-gray-500 block truncate">
                              {user.district}, {user.state}
                            </span>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-[#168B5C] shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-2 border-t border-gray-100 space-y-1">
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        setCurrentTab(getDashboardTabId());
                      }}
                      className="w-full text-left py-1.5 px-2 rounded text-xs font-semibold text-[#168B5C] hover:bg-emerald-50"
                    >
                      View Current Dashboard &rarr;
                    </button>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenAuthModal();
                      }}
                      className="w-full text-left py-1.5 px-2 rounded text-xs font-medium text-gray-600 hover:bg-gray-100 flex items-center gap-1.5"
                    >
                      <UserCircle className="w-3.5 h-3.5" />
                      <span>Custom Registration / Sign In</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-emerald-200 hover:text-white rounded-lg focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#082823] border-t border-emerald-800/80 px-4 pt-3 pb-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#168B5C] text-white font-semibold'
                    : 'text-emerald-100 hover:bg-emerald-900/60'
                }`}
              >
                <Icon className="w-5 h-5 text-emerald-300" />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-emerald-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setCurrentTab(getDashboardTabId());
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-3 rounded-lg bg-emerald-900 text-white text-sm font-semibold flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>Go to {getDashboardLabel()}</span>
            </button>
            {currentUser.role === 'farmer' && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenNewListingModal();
                }}
                className="w-full py-2.5 px-3 rounded-lg bg-[#168B5C] text-white text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>List Your Crop</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
