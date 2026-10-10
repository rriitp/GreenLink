import React, { useState } from 'react';
import {
  CloudSun,
  Droplets,
  Wind,
  Sun,
  CloudRain,
  AlertTriangle,
  MapPin,
  Calendar,
  ShieldAlert,
  ChevronRight,
  Info
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { REGIONAL_WEATHER } from '../data/mockData';

export const WeatherAdvisoryPage: React.FC = () => {
  const stateOptions = Object.keys(REGIONAL_WEATHER);
  const [selectedState, setSelectedState] = useState<string>(stateOptions[0]);

  const weather = REGIONAL_WEATHER[selectedState] || REGIONAL_WEATHER['Punjab'];

  // Prepare chart data for 7-day forecast
  const chartData = weather.forecast7Day.map((f) => ({
    day: f.day,
    tempMax: f.tempMax,
    tempMin: f.tempMin,
    rainProb: f.rainProb,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
              Agromet Advisory Service
            </span>
            <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">
              Demonstration Weather Model
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
            Weather & Field Agromet Advisory
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            Agricultural weather parameters, microclimate forecasts, and crop-specific guidance for Indian agrarian regions.
          </p>
        </div>

        {/* State Selector */}
        <div className="flex items-center gap-2 shrink-0">
          <label className="text-xs font-bold text-gray-700">Select Region:</label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="py-2 px-3 rounded-xl border border-gray-300 text-xs font-semibold bg-white shadow-sm focus:ring-2 focus:ring-[#168B5C] focus:outline-none"
          >
            {stateOptions.map((st) => (
              <option key={st} value={st}>
                {st} ({REGIONAL_WEATHER[st].district})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Weather Card */}
      <div className="bg-gradient-to-br from-[#0B362F] via-[#10483E] to-[#0B362F] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <CloudSun className="w-64 h-64" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Current Conditions */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold">
              <MapPin className="w-4 h-4" />
              <span>{weather.district}, {weather.state} &bull; Agromet Station</span>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-5xl sm:text-7xl font-black tracking-tight">{weather.temperature}°C</span>
              <div>
                <p className="text-lg font-bold text-emerald-200">{weather.condition}</p>
                <p className="text-xs text-emerald-300/80">Feels like {weather.feelsLike}°C</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-emerald-800/80">
              <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-800/60">
                <span className="text-[11px] text-emerald-300 flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5" /> Humidity
                </span>
                <span className="text-lg font-extrabold text-white block mt-0.5">{weather.humidity}%</span>
              </div>

              <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-800/60">
                <span className="text-[11px] text-emerald-300 flex items-center gap-1">
                  <CloudRain className="w-3.5 h-3.5" /> Rain Chance
                </span>
                <span className="text-lg font-extrabold text-white block mt-0.5">{weather.rainProbability}%</span>
              </div>

              <div className="p-3 bg-emerald-950/60 rounded-xl border border-emerald-800/60">
                <span className="text-[11px] text-emerald-300 flex items-center gap-1">
                  <Wind className="w-3.5 h-3.5" /> Wind Speed
                </span>
                <span className="text-lg font-extrabold text-white block mt-0.5">{weather.windSpeedKmH} km/h</span>
              </div>
            </div>
          </div>

          {/* Right: Field Agromet Advisory List */}
          <div className="lg:col-span-6 bg-[#082823]/90 rounded-2xl p-6 border border-emerald-700/50 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-800">
              <h3 className="font-extrabold text-sm text-emerald-300 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-emerald-400" />
                <span>Field Operation Advisory (Next 48 Hours)</span>
              </h3>
              <span className="text-[10px] text-emerald-400">Soil: {weather.soilMoistureEstimate}</span>
            </div>

            <div className="space-y-2.5">
              {weather.advisory.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-800/50 text-xs text-emerald-100/90 leading-relaxed flex items-start gap-2.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-emerald-300/60 italic pt-1">
              *Caution: Avoid applying foliar fertilizers or agrochemical sprays if wind speeds exceed 15 km/h or rain probability is over 40%.
            </p>
          </div>
        </div>
      </div>

      {/* 7-Day Forecast & Temperature Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 7-Day Grid Cards */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="pb-2 border-b border-gray-100">
            <h3 className="font-extrabold text-sm text-gray-900">7-Day Agricultural Forecast</h3>
            <p className="text-xs text-gray-500">Day-by-day temperature range and precipitation probability</p>
          </div>

          <div className="divide-y divide-gray-100">
            {weather.forecast7Day.map((fc, i) => (
              <div key={i} className="py-2.5 flex items-center justify-between text-xs">
                <div className="w-20">
                  <span className="font-bold text-gray-900">{fc.day}</span>
                  <span className="text-[10px] text-gray-400 block">{fc.date}</span>
                </div>

                <div className="flex-1 px-3">
                  <span className="text-gray-700 font-medium">{fc.condition}</span>
                </div>

                <div className="text-right flex items-center gap-3">
                  <span className="text-[11px] text-blue-600 font-semibold">{fc.rainProb}% rain</span>
                  <div className="text-gray-900 font-bold w-16 text-right">
                    <span>{fc.tempMax}°</span>
                    <span className="text-gray-400 text-[10px] ml-1">{fc.tempMin}°</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Trend Chart */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <div>
              <h3 className="font-extrabold text-sm text-gray-900">Thermal & Rainfall Trajectory</h3>
              <p className="text-xs text-gray-500">Projected max/min temperatures (°C) and precipitation odds (%)</p>
            </div>
            <span className="text-[10px] font-bold text-gray-500">IMD Agromet Model</span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F0F0F0" />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(val: any, name: any) => [
                    name === 'rainProb' ? `${val}%` : `${val}°C`,
                    name === 'tempMax' ? 'Max Temp' : name === 'tempMin' ? 'Min Temp' : 'Rain Prob',
                  ]}
                  contentStyle={{ borderRadius: '8px', fontSize: '11px' }}
                />
                <Line type="monotone" dataKey="tempMax" stroke="#EF4444" strokeWidth={2.5} name="Max Temp (°C)" />
                <Line type="monotone" dataKey="tempMin" stroke="#3B82F6" strokeWidth={2.5} name="Min Temp (°C)" />
                <Line type="monotone" dataKey="rainProb" stroke="#10B981" strokeWidth={2} strokeDasharray="4 4" name="Rain (%)" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-[11px] text-gray-600 flex items-start gap-2">
            <Info className="w-4 h-4 text-gray-500 shrink-0 mt-0.5" />
            <div>
              <strong>Demonstration Disclaimer:</strong> This advisory utilizes simulated agro-meteorological data modeled on IMD Agromet patterns. In production environments, this interfaces directly with the IMD Weather API or OpenWeatherMap Ag API.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
