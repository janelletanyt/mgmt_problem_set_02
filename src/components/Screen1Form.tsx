import React, { useState } from 'react';
import { MapPin, Layers, Home, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import { FlatFormData } from '../types';

interface Screen1FormProps {
  initialData: FlatFormData;
  onSubmit: (data: FlatFormData) => void;
}

const FLAT_TYPES = [
  { id: '2 ROOM', label: '2-Room', sub: '1 Bed' },
  { id: '3 ROOM', label: '3-Room', sub: '2 Bed' },
  { id: '4 ROOM', label: '4-Room', sub: '3 Bed' },
  { id: '5 ROOM', label: '5-Room', sub: '3 Bed + Hall' },
  { id: 'EXECUTIVE', label: 'Executive', sub: 'Maisonette' },
];

const STOREY_OPTIONS = [
  { value: '01 TO 03', label: 'Storey 01 – 03 (Ground / Low Floor)' },
  { value: '04 TO 06', label: 'Storey 04 – 06 (Low-Mid Floor)' },
  { value: '07 TO 09', label: 'Storey 07 – 09 (Mid Floor)' },
  { value: '10 TO 12', label: 'Storey 10 – 12 (High Floor)' },
  { value: '13 TO 15', label: 'Storey 13 – 15 (High Floor)' },
  { value: '16 TO 18', label: 'Storey 16 – 18 (Very High Floor)' },
  { value: '19 TO 21', label: 'Storey 19 – 21 (Sky View)' },
  { value: '22 TO 24', label: 'Storey 22 – 24 (Sky View)' },
  { value: '25 TO 27', label: 'Storey 25 and Above' },
];

export const Screen1Form: React.FC<Screen1FormProps> = ({ initialData, onSubmit }) => {
  const [address, setAddress] = useState(initialData.address);
  const [storey, setStorey] = useState(initialData.storey || '07 TO 09');
  const [flatType, setFlatType] = useState(initialData.flatType || '4 ROOM');
  const [forecastYears, setForecastYears] = useState(initialData.forecastYears || 5);
  const [errors, setErrors] = useState<{ address?: string; storey?: string; flatType?: string }>({});

  const currentYear = new Date().getFullYear();
  const targetYear = currentYear + forecastYears;

  const quickSamples = [
    { address: 'Blk 142 Lorong 2 Toa Payoh', flatType: '4 ROOM', storey: '07 TO 09', years: 5 },
    { address: 'Blk 508 Bishan Street 11', flatType: '5 ROOM', storey: '10 TO 12', years: 3 },
    { address: 'Blk 216 Tampines Street 23', flatType: '3 ROOM', storey: '04 TO 06', years: 7 },
  ];

  const handleApplySample = (sample: { address: string; flatType: string; storey: string; years: number }) => {
    setAddress(sample.address);
    setFlatType(sample.flatType);
    setStorey(sample.storey);
    setForecastYears(sample.years);
    setErrors({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { address?: string; storey?: string; flatType?: string } = {};

    if (!address.trim()) {
      newErrors.address = 'Please enter your HDB flat address.';
    }
    if (!storey.trim()) {
      newErrors.storey = 'Please select your storey level.';
    }
    if (!flatType.trim()) {
      newErrors.flatType = 'Please select your flat type.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      address: address.trim(),
      storey: storey.trim(),
      flatType: flatType.trim(),
      forecastYears,
    });
  };

  return (
    <div className="p-4 sm:p-5 space-y-6">
      {/* Intro section */}
      <div className="space-y-1.5">
        <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-rose-50 border border-rose-200/60 text-rose-700 text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
          <span>Step 1 of 3: Home Owner Property Input</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          Find your HDB flat’s future valuation
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Enter your HDB flat address, select your storey and flat type (number of rooms), and choose a forecasting horizon between 1 and 10 years.
        </p>
      </div>

      {/* Quick sample pills for classmates */}
      <div className="bg-slate-100/70 p-3 rounded-xl border border-slate-200/80">
        <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-700 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Quick test samples (tap to autofill):</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {quickSamples.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              id={`btn-sample-${idx}`}
              onClick={() => handleApplySample(sample)}
              className="text-xs bg-white hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300 text-slate-700 border border-slate-200 px-2.5 py-1.5 rounded-lg transition-colors text-left"
            >
              {sample.address.split(' ')[2] || 'Estate'} ({sample.flatType.replace(' ROOM', 'R')}, {sample.storey.split(' ')[0]}, {sample.years}y)
            </button>
          ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Flat Address */}
        <div className="space-y-1.5">
          <label
            htmlFor="input-hdb-address"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
          >
            HDB Flat Address <span className="text-rose-600">*</span>
          </label>
          <div className="relative rounded-xl shadow-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <MapPin className="w-4 h-4" />
            </div>
            <input
              type="text"
              id="input-hdb-address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                if (errors.address) setErrors((prev) => ({ ...prev, address: undefined }));
              }}
              placeholder="e.g. Blk 142 Lorong 2 Toa Payoh"
              className={`w-full pl-9 pr-3 py-2.5 text-sm bg-white rounded-xl border transition-all outline-hidden ${
                errors.address
                  ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                  : 'border-slate-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100'
              }`}
            />
          </div>
          {errors.address ? (
            <p className="text-xs text-rose-600">{errors.address}</p>
          ) : (
            <p className="text-[11px] text-slate-500">
              Include your block number and street or town name.
            </p>
          )}
        </div>

        {/* Flat Type (Number of Rooms) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
              Flat Type (Number of Rooms) <span className="text-rose-600">*</span>
            </label>
            <span className="text-[11px] text-rose-700 font-semibold bg-rose-50 px-2 py-0.5 rounded-md">
              {flatType}
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
            {FLAT_TYPES.map((type) => {
              const isSelected = flatType === type.id;
              return (
                <button
                  key={type.id}
                  type="button"
                  id={`btn-flattype-${type.id.replace(' ', '-').toLowerCase()}`}
                  onClick={() => {
                    setFlatType(type.id);
                    if (errors.flatType) setErrors((prev) => ({ ...prev, flatType: undefined }));
                  }}
                  className={`p-2 rounded-xl border text-center transition-all ${
                    isSelected
                      ? 'bg-rose-600 text-white border-rose-600 shadow-xs font-semibold'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <div className="text-xs font-bold">{type.label}</div>
                  <div className={`text-[10px] ${isSelected ? 'text-rose-100' : 'text-slate-400'}`}>
                    {type.sub}
                  </div>
                </button>
              );
            })}
          </div>
          {errors.flatType && <p className="text-xs text-rose-600">{errors.flatType}</p>}
        </div>

        {/* Storey (Floor Level) */}
        <div className="space-y-1.5">
          <label
            htmlFor="select-hdb-storey"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
          >
            Which Storey (Floor Level) <span className="text-rose-600">*</span>
          </label>
          <div className="relative rounded-xl shadow-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Layers className="w-4 h-4" />
            </div>
            <select
              id="select-hdb-storey"
              value={storey}
              onChange={(e) => {
                setStorey(e.target.value);
                if (errors.storey) setErrors((prev) => ({ ...prev, storey: undefined }));
              }}
              className={`w-full pl-9 pr-3 py-2.5 text-sm bg-white rounded-xl border transition-all outline-hidden appearance-none cursor-pointer ${
                errors.storey
                  ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                  : 'border-slate-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100'
              }`}
            >
              {STOREY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          {errors.storey ? (
            <p className="text-xs text-rose-600">{errors.storey}</p>
          ) : (
            <p className="text-[11px] text-slate-500">
              Used in the valuation model to factor in floor level elevation premium.
            </p>
          )}
        </div>

        {/* Forecast Horizon (1 - 10 Years) */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <label
              htmlFor="slider-forecast-years"
              className="text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Future Forecast Horizon (1 – 10 Years)
            </label>
            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
              <Calendar className="w-3 h-3" />
              <span>+{forecastYears} {forecastYears === 1 ? 'Year' : 'Years'} ({targetYear})</span>
            </span>
          </div>

          {/* Interactive Range Slider */}
          <div className="px-1">
            <input
              type="range"
              id="slider-forecast-years"
              min="1"
              max="10"
              step="1"
              value={forecastYears}
              onChange={(e) => setForecastYears(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
            />
            <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-medium">
              <span>1 Year ({currentYear + 1})</span>
              <span>5 Years ({currentYear + 5})</span>
              <span>10 Years ({currentYear + 10})</span>
            </div>
          </div>

          {/* Quick Year Pill Selectors */}
          <div className="grid grid-cols-5 gap-1.5 pt-1">
            {[1, 3, 5, 7, 10].map((yr) => (
              <button
                key={yr}
                type="button"
                id={`btn-year-${yr}`}
                onClick={() => setForecastYears(yr)}
                className={`py-1.5 px-2 text-xs font-medium rounded-lg border transition-all ${
                  forecastYears === yr
                    ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                +{yr}y
              </button>
            ))}
          </div>
        </div>

        {/* Submit Action */}
        <div className="pt-2">
          <button
            type="submit"
            id="btn-proceed-screen2"
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-semibold rounded-xl shadow-sm hover:shadow-md transition-all text-sm"
          >
            <span>Proceed to Valuation Framework</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
