import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  TrendingDown,
  BarChart2,
  Calendar,
  MapPin,
  Info,
  DollarSign,
  ShieldCheck,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import { MARKET_PRICE_DATA } from '../data/mockData';
import { MarketPriceObservation } from '../types';

export const CropPriceInsightsPage: React.FC = () => {
  const [selectedCropId, setSelectedCropId] = useState<string>(MARKET_PRICE_DATA[0].id);

  const selectedObservation = useMemo(() => {
    return MARKET_PRICE_DATA.find((m) => m.id === selectedCropId) || MARKET_PRICE_DATA[0];
  }, [selectedCropId]);

  // Comparison data between Min, Modal, Max, and MSP
  const mandiComparisonData = [
    {
      metric: 'Minimum Mandi',
      price: selectedObservation.minPrice,
      fill: '#94A3B8',
    },
    {
      metric: 'Modal / Average',
      price: selectedObservation.modalPrice,
      fill: '#168B5C',
    },
    {
      metric: 'Maximum Mandi',
      price: selectedObservation.maxPrice,
      fill: '#0B362F',
    },
    ...(selectedObservation.msp > 0
      ? [
          {
            metric: 'Central MSP',
            price: selectedObservation.msp,
            fill: '#D97706',
          },
        ]
      : []),
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#168B5C] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Mandi Price Intelligence
            </span>
            <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">
              Demonstration Agmarknet Feed
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
            Mandi Price Insights & MSP Benchmarks
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Compare APMC mandi auction averages against notified Minimum Support Prices (MSP) before finalizing crop sales.
          </p>
        </div>

        {/* Commodity Selector Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <label className="text-xs font-bold text-gray-700">Select Commodity:</label>
          <select
            value={selectedCropId}
            onChange={(e) => setSelectedCropId(e.target.value)}
            className="py-2 px-3 rounded-xl border border-gray-300 text-xs font-semibold bg-white shadow-sm focus:ring-2 focus:ring-[#168B5C] focus:outline-none"
          >
            {MARKET_PRICE_DATA.map((obs) => (
              <option key={obs.id} value={obs.id}>
                {obs.crop} ({obs.mandi}, {obs.state})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Hero Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Modal Price Card */}
        <div className="bg-white p-5 rounded-2xl border-2 border-[#168B5C] shadow-sm">
          <span className="text-xs text-[#168B5C] font-bold uppercase tracking-wider block">
            Modal / Average Price
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-gray-900">
              ₹{selectedObservation.modalPrice.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-gray-500 font-medium">/ quintal</span>
          </div>
          <p className="text-[11px] text-emerald-700 font-semibold mt-1">
            Equivalent to ₹{(selectedObservation.modalPrice / 100).toFixed(2)}/kg
          </p>
        </div>

        {/* Minimum Price */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">
            Minimum Recorded Price
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-gray-800">
              ₹{selectedObservation.minPrice.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-gray-500 font-medium">/ quintal</span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">
            Lowest lot trade at {selectedObservation.mandi}
          </p>
        </div>

        {/* Maximum Price */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-xs text-gray-500 font-bold uppercase tracking-wider block">
            Maximum Recorded Price
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-gray-800">
              ₹{selectedObservation.maxPrice.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-gray-500 font-medium">/ quintal</span>
          </div>
          <p className="text-[11px] text-emerald-600 font-semibold mt-1">
            Premium A-grade lots realization
          </p>
        </div>

        {/* MSP Benchmark */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <span className="text-xs text-amber-700 font-bold uppercase tracking-wider block">
            Government MSP Benchmark
          </span>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-3xl font-black text-gray-900">
              {selectedObservation.msp > 0 ? `₹${selectedObservation.msp.toLocaleString('en-IN')}` : 'N/A'}
            </span>
            <span className="text-xs text-gray-500 font-medium">/ quintal</span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">
            {selectedObservation.msp > 0 ? 'Statutory Minimum Support Price' : 'Perishable horticulture crop (No MSP)'}
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Mandi vs MSP Comparison Bar */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="pb-2 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-sm text-gray-900">
                Current Mandi Spread (₹/Quintal)
              </h3>
              <p className="text-xs text-gray-500">
                {selectedObservation.mandi} ({selectedObservation.district})
              </p>
            </div>
            <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
              Active Spread
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mandiComparisonData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                <XAxis dataKey="metric" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip
                  formatter={(val: any) => [`₹${val}/quintal`, 'Price']}
                  contentStyle={{ borderRadius: '8px', fontSize: '11px' }}
                />
                <Bar dataKey="price" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-[11px] text-gray-500 pt-2 border-t border-gray-100 flex items-center justify-between">
            <span>Observation Date: {selectedObservation.lastUpdated}</span>
            <span className="text-emerald-700 font-semibold">{selectedObservation.variety}</span>
          </div>
        </div>

        {/* 6-Month Historical Trend Line Chart */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="pb-2 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-sm text-gray-900">
                6-Month Price Trend & Seasonality (₹/Quintal)
              </h3>
              <p className="text-xs text-gray-500">
                Monthly modal price movement at {selectedObservation.mandi}
              </p>
            </div>
            <span className="text-[10px] text-gray-500 font-medium">May 2026 - Oct 2026</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={selectedObservation.historicalTrend} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip
                  formatter={(val: any, name: any) => [
                    `₹${val}/qtl`,
                    name === 'modalPrice' ? 'Mandi Modal Price' : 'MSP Benchmark',
                  ]}
                  contentStyle={{ borderRadius: '8px', fontSize: '11px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                <Line
                  type="monotone"
                  dataKey="modalPrice"
                  stroke="#168B5C"
                  strokeWidth={2.5}
                  name="Mandi Modal Price (₹/qtl)"
                  dot={{ r: 4 }}
                />
                {selectedObservation.msp > 0 && (
                  <Line
                    type="monotone"
                    dataKey="msp"
                    stroke="#D97706"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    name="MSP Benchmark (₹/qtl)"
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-[11px] text-gray-600 flex items-start gap-2">
            <Info className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
            <div>
              <strong>Data Source Attribution:</strong> Demonstration dataset modeled after Agmarknet (Agricultural Marketing Information Network, Directorate of Marketing & Inspection, Govt of India). Prepared with modular API boundaries for production integration.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
