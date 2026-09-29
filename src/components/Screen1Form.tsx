import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Layers,
  Calendar,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Building,
  Search,
  X,
  Info,
  Clock,
  RotateCcw,
} from 'lucide-react';
import { FlatFormData } from '../types';
import {
  searchHdbBlocks,
  detectHdbTown,
  HdbBlockItem,
  getEstimatedRemainingLease,
} from '../data/hdbBlocks';

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

  // Remaining lease state & visibility of system status (Heuristic #1)
  const initialEstimate = getEstimatedRemainingLease(initialData.address || '');
  const [remainingLease, setRemainingLease] = useState<number>(
    initialData.remainingLease && initialData.remainingLease > 0
      ? initialData.remainingLease
      : initialEstimate.remainingLease
  );
  const [isLeaseUserSupplied, setIsLeaseUserSupplied] = useState<boolean>(
    Boolean(initialData.isLeaseUserSupplied)
  );
  const [leaseAssumptionNote, setLeaseAssumptionNote] = useState<string>(
    initialData.leaseAssumptionNote || initialEstimate.note
  );

  const [errors, setErrors] = useState<{ address?: string; storey?: string; flatType?: string; remainingLease?: string }>({});

  // Autocomplete suggestions state (Heuristic #6: Recognition rather than recall)
  const [suggestions, setSuggestions] = useState<HdbBlockItem[]>(() => searchHdbBlocks(initialData.address || ''));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentYear = new Date().getFullYear();
  const targetYear = currentYear + forecastYears;

  // Active detected town
  const detectedTown = detectHdbTown(address);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const quickSamples = [
    {
      address: 'Blk 142 Lorong 2 Toa Payoh',
      flatType: '4 ROOM',
      storey: '07 TO 09',
      years: 5,
      lease: 45,
      town: 'Toa Payoh',
      note: 'System assumption: ~45 yrs remaining based on Blk 142 completion (c. 1970).',
    },
    {
      address: 'Blk 508 Bishan Street 11',
      flatType: '5 ROOM',
      storey: '10 TO 12',
      years: 3,
      lease: 60,
      town: 'Bishan',
      note: 'System assumption: ~60 yrs remaining based on Blk 508 completion (c. 1987).',
    },
    {
      address: 'Blk 216 Tampines Street 23',
      flatType: '3 ROOM',
      storey: '04 TO 06',
      years: 7,
      lease: 58,
      town: 'Tampines',
      note: 'System assumption: ~58 yrs remaining based on Blk 216 completion (c. 1985).',
    },
  ];

  const handleApplySample = (sample: typeof quickSamples[0]) => {
    setAddress(sample.address);
    setFlatType(sample.flatType);
    setStorey(sample.storey);
    setForecastYears(sample.years);
    setRemainingLease(sample.lease);
    setIsLeaseUserSupplied(false);
    setLeaseAssumptionNote(sample.note);
    setErrors({});
    setIsDropdownOpen(false);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setAddress(val);
    const matches = searchHdbBlocks(val);
    setSuggestions(matches);
    setHighlightedIndex(0);
    setIsDropdownOpen(true);

    if (errors.address) {
      setErrors((prev) => ({ ...prev, address: undefined }));
    }

    // If user hasn't explicitly supplied lease, recalculate system assumption
    if (!isLeaseUserSupplied && val.trim().length > 3) {
      const estimate = getEstimatedRemainingLease(val);
      setRemainingLease(estimate.remainingLease);
      setLeaseAssumptionNote(estimate.note);
    }
  };

  const handleSelectSuggestion = (item: HdbBlockItem) => {
    setAddress(item.fullAddress);
    setIsDropdownOpen(false);
    if (errors.address) {
      setErrors((prev) => ({ ...prev, address: undefined }));
    }

    if (!isLeaseUserSupplied) {
      const estimate = getEstimatedRemainingLease(item.fullAddress, item.town);
      setRemainingLease(estimate.remainingLease);
      setLeaseAssumptionNote(estimate.note);
    }
  };

  const handleLeaseChange = (val: number) => {
    const clamped = Math.max(1, Math.min(99, val));
    setRemainingLease(clamped);
    setIsLeaseUserSupplied(true);
    setLeaseAssumptionNote(`User-supplied remaining lease: ${clamped} years.`);
    if (errors.remainingLease) {
      setErrors((prev) => ({ ...prev, remainingLease: undefined }));
    }
  };

  const handleResetLeaseToAssumption = () => {
    const estimate = getEstimatedRemainingLease(address);
    setRemainingLease(estimate.remainingLease);
    setIsLeaseUserSupplied(false);
    setLeaseAssumptionNote(estimate.note);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isDropdownOpen || suggestions.length === 0) {
      if (e.key === 'ArrowDown') {
        setIsDropdownOpen(true);
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === 'Enter') {
      if (isDropdownOpen && suggestions[highlightedIndex]) {
        e.preventDefault();
        handleSelectSuggestion(suggestions[highlightedIndex]);
      }
    } else if (e.key === 'Escape') {
      setIsDropdownOpen(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDropdownOpen(false);
    const newErrors: { address?: string; storey?: string; flatType?: string; remainingLease?: string } = {};

    const trimmedAddress = address.trim();

    if (!trimmedAddress) {
      newErrors.address = 'Please enter your HDB flat address.';
    } else {
      const town = detectHdbTown(trimmedAddress);
      if (!town) {
        newErrors.address =
          'Address not recognized. Please choose a block from the suggestions or include an HDB town (e.g. Toa Payoh, Tampines, Bishan) to retrieve official resale data.';
      }
    }

    if (!storey.trim()) {
      newErrors.storey = 'Please select your storey level.';
    }
    if (!flatType.trim()) {
      newErrors.flatType = 'Please select your flat type.';
    }
    if (!remainingLease || remainingLease < 1 || remainingLease > 99) {
      newErrors.remainingLease = 'Please enter a valid remaining lease between 1 and 99 years.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      address: trimmedAddress,
      storey: storey.trim(),
      flatType: flatType.trim(),
      forecastYears,
      remainingLease,
      isLeaseUserSupplied,
      leaseAssumptionNote,
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
          Enter your HDB flat address, floor level, flat type, and remaining lease. Any value the system infers is clearly flagged as an assumption so you can review or correct it.
        </p>
      </div>

      {/* Suggested searches (tap to autofill) - Visibility of system status (Heuristic #1) */}
      <div className="bg-slate-100/80 p-3 rounded-xl border border-slate-200/80 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
          <div className="flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Suggested searches (tap to autofill):</span>
          </div>
          {quickSamples.every(
            (s) => address.trim().toLowerCase() !== s.address.toLowerCase() || flatType !== s.flatType
          ) && address.trim().length > 0 && (
            <span className="text-[10px] text-slate-500 bg-white px-2 py-0.5 rounded-md border border-slate-200 font-normal">
              Custom flat entered
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {quickSamples.map((sample, idx) => {
            const isSelected =
              address.trim().toLowerCase() === sample.address.toLowerCase() &&
              flatType === sample.flatType;
            return (
              <button
                key={idx}
                type="button"
                id={`btn-sample-${idx}`}
                onClick={() => handleApplySample(sample)}
                className={`text-xs px-2.5 py-1.5 rounded-lg transition-all text-left flex items-center space-x-1.5 cursor-pointer border ${
                  isSelected
                    ? 'bg-rose-50 text-rose-900 border-rose-500 ring-2 ring-rose-200/80 shadow-xs font-semibold'
                    : 'bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 border-slate-200'
                }`}
                title={`Autofill with ${sample.town} flat details`}
              >
                {isSelected && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                )}
                <span>
                  <strong className={isSelected ? 'text-rose-900 font-bold' : 'text-slate-900 font-semibold'}>
                    {sample.town}
                  </strong>{' '}
                  <span className={isSelected ? 'text-rose-700' : 'text-slate-500'}>
                    ({sample.flatType.replace(' ROOM', 'R')}, ~{sample.lease}y, {sample.years}y)
                  </span>
                </span>
                {isSelected && (
                  <span className="text-[9px] font-bold uppercase bg-rose-200/70 text-rose-800 px-1 py-0.2 rounded ml-1">
                    Selected
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Flat Address with Autocomplete Suggestions */}
        <div className="space-y-1.5 relative" ref={wrapperRef}>
          <div className="flex items-center justify-between">
            <label
              htmlFor="input-hdb-address"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              HDB Flat Address <span className="text-rose-600">*</span>
            </label>
            {detectedTown && (
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 flex items-center space-x-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Town: {detectedTown}</span>
              </span>
            )}
          </div>

          <div className="relative rounded-xl shadow-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <MapPin className="w-4 h-4" />
            </div>
            <input
              ref={inputRef}
              type="text"
              id="input-hdb-address"
              autoComplete="off"
              value={address}
              onChange={handleAddressChange}
              onFocus={() => {
                const matches = searchHdbBlocks(address);
                setSuggestions(matches);
                setIsDropdownOpen(true);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Type block number or street (e.g. Blk 142 Lorong 2 Toa Payoh)"
              className={`w-full pl-9 pr-9 py-2.5 text-sm bg-white rounded-xl border transition-all outline-hidden ${
                errors.address
                  ? 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                  : detectedTown
                  ? 'border-emerald-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100'
                  : 'border-slate-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100'
              }`}
            />
            {address.trim().length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setAddress('');
                  setSuggestions(searchHdbBlocks(''));
                  if (inputRef.current) inputRef.current.focus();
                }}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                title="Clear address"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Autocomplete Suggestions Dropdown (Recognition Rather than Recall) */}
          {isDropdownOpen && suggestions.length > 0 && (
            <div
              id="hdb-address-suggestions"
              className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50 divide-y divide-slate-100 animate-in fade-in slide-in-from-top-1 duration-150"
            >
              <div className="px-3 py-1.5 bg-slate-50 flex items-center justify-between text-[11px] font-semibold text-slate-600 border-b border-slate-100">
                <span className="flex items-center space-x-1.5">
                  <Search className="w-3 h-3 text-slate-400" />
                  <span>Matching HDB Blocks ({suggestions.length})</span>
                </span>
                <span className="text-[10px] text-slate-400 font-normal">Select or use ↑↓ keys</span>
              </div>

              <div className="max-h-60 overflow-y-auto">
                {suggestions.map((item, idx) => {
                  const isHighlighted = idx === highlightedIndex;
                  const isExact = address.trim().toLowerCase() === item.fullAddress.toLowerCase();
                  return (
                    <button
                      key={`${item.fullAddress}-${idx}`}
                      type="button"
                      onMouseEnter={() => setHighlightedIndex(idx)}
                      onClick={() => handleSelectSuggestion(item)}
                      className={`w-full px-3 py-2.5 text-left flex items-center justify-between transition-colors cursor-pointer ${
                        isHighlighted
                          ? 'bg-rose-50/90 text-rose-950'
                          : 'hover:bg-slate-50 text-slate-800'
                      } ${isExact ? 'bg-emerald-50/70 font-semibold' : ''}`}
                    >
                      <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                            isExact
                              ? 'bg-emerald-100 text-emerald-700'
                              : isHighlighted
                              ? 'bg-rose-100 text-rose-600'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          <Building className="w-3.5 h-3.5" />
                        </div>
                        <div className="truncate">
                          <div className="text-xs font-semibold text-slate-900 truncate">
                            {item.fullAddress}
                          </div>
                          <div className="text-[10px] text-slate-500 truncate">
                            {item.street} {item.leaseCommenceYear ? `• Built ~${item.leaseCommenceYear}` : ''}
                          </div>
                        </div>
                      </div>
                      <span
                        className={`shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-md border ${
                          isExact
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                            : isHighlighted
                            ? 'bg-rose-100 text-rose-700 border-rose-200'
                            : 'bg-slate-100 text-slate-600 border-slate-200/80'
                        }`}
                      >
                        {item.town}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="p-2 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                <span>Select a matching block to confirm estate</span>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(false)}
                  className="text-slate-500 hover:text-slate-800 font-medium px-2 py-0.5 rounded hover:bg-slate-200/70 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          {/* Real-time Match Confirmation Indicator (Recognition rather than recall) */}
          {errors.address ? (
            <p className="text-xs text-rose-600 flex items-start space-x-1 pt-0.5">
              <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
              <span>{errors.address}</span>
            </p>
          ) : detectedTown ? (
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-50/90 border border-emerald-200 rounded-xl text-emerald-800 text-xs mt-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <div className="flex items-center space-x-1.5 truncate">
                <span className="font-semibold">Confirmed match:</span>
                <span className="font-bold text-emerald-900 bg-emerald-100/90 px-1.5 py-0.2 rounded text-[11px]">
                  {detectedTown}
                </span>
                <span className="text-[11px] text-emerald-700 hidden sm:inline">• Ready for live valuation</span>
              </div>
            </div>
          ) : address.trim().length > 2 ? (
            <div className="flex items-start space-x-2 px-3 py-2 bg-amber-50 border border-amber-200/80 rounded-xl text-amber-900 text-xs mt-1">
              <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed">
                <span className="font-semibold">No estate match yet:</span> Select one of the suggested blocks above or specify an HDB town (e.g. Toa Payoh, Tampines, Bedok, Woodlands) so the valuation model can locate your flat.
              </div>
            </div>
          ) : (
            <p className="text-[11px] text-slate-500 flex items-center space-x-1 pt-0.5">
              <span>💡</span>
              <span>Type your block number or street name to browse matching blocks.</span>
            </p>
          )}
        </div>

        {/* Remaining Lease Field - Visibility of System Status (Heuristic #1) */}
        <div className="space-y-2.5 p-3.5 rounded-xl border bg-slate-50/90 border-slate-200/90">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <label
                htmlFor="slider-remaining-lease"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-800"
              >
                Remaining Lease <span className="text-rose-600">*</span>
              </label>
            </div>

            <div className="flex items-center space-x-1.5">
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-md border flex items-center space-x-1 ${
                  isLeaseUserSupplied
                    ? 'bg-blue-50 text-blue-800 border-blue-200'
                    : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}
              >
                <span>{isLeaseUserSupplied ? 'User Supplied' : 'System Assumption'}</span>
              </span>
              <span className="font-extrabold text-xs text-slate-900 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                {remainingLease} Yrs
              </span>
            </div>
          </div>

          {/* Interactive Range Slider + Number Stepper */}
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2.5">
              <input
                type="range"
                id="slider-remaining-lease"
                min="1"
                max="99"
                step="1"
                value={remainingLease}
                onChange={(e) => handleLeaseChange(parseInt(e.target.value, 10))}
                className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
              />
              <div className="w-18 shrink-0">
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={remainingLease}
                  onChange={(e) => handleLeaseChange(parseInt(e.target.value, 10) || 1)}
                  className="w-full text-center py-1 text-xs font-bold bg-white rounded-lg border border-slate-300 focus:border-rose-500 focus:ring-1 focus:ring-rose-200 outline-hidden"
                />
              </div>
            </div>

            <div className="flex justify-between text-[10px] text-slate-400 font-medium px-0.5">
              <span>&lt;40y (Older)</span>
              <span>~45y (Toa Payoh)</span>
              <span>~60y (Mature)</span>
              <span>99y (New)</span>
            </div>
          </div>

          {/* Quick presets for common Singapore flat ages */}
          <div className="grid grid-cols-4 gap-1.5 pt-0.5">
            {[
              { val: 45, label: '45 yrs', desc: '1970s block' },
              { val: 60, label: '60 yrs', desc: '1980s block' },
              { val: 75, label: '75 yrs', desc: '2000s block' },
              { val: 95, label: '95 yrs', desc: 'Recent MOP' },
            ].map((p) => {
              const isActive = remainingLease === p.val && isLeaseUserSupplied;
              return (
                <button
                  key={p.val}
                  type="button"
                  onClick={() => handleLeaseChange(p.val)}
                  className={`py-1 px-1 text-center rounded-lg border text-[11px] transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white border-blue-600 font-semibold shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="font-bold block leading-none">{p.label}</span>
                  <span className={`text-[9px] block mt-0.5 ${isActive ? 'text-blue-100' : 'text-slate-400'}`}>
                    {p.desc}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Transparent Assumption or User Override Box (Heuristic #1) */}
          <div className="text-[11px] pt-0.5">
            {!isLeaseUserSupplied ? (
              <div className="flex items-start justify-between bg-amber-50/80 p-2.5 rounded-lg border border-amber-200/70 text-amber-900">
                <div className="flex items-start space-x-2 pr-2">
                  <Info className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="leading-snug">
                    <span className="font-semibold text-amber-950">System Assumption: </span>
                    <span>{leaseAssumptionNote}</span>
                    <span className="block text-[10px] text-amber-800/90 mt-0.5">
                      Adjust slider above if your flat deed has a different remaining lease.
                    </span>
                  </div>
                </div>
                <span className="shrink-0 text-[10px] font-bold text-amber-800 bg-amber-100/90 px-1.5 py-0.5 rounded border border-amber-200">
                  Assumed
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-between bg-blue-50/80 p-2.5 rounded-lg border border-blue-200/70 text-blue-900">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="font-medium text-xs">
                    User Specified: <strong className="font-bold">{remainingLease} years</strong> lease
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleResetLeaseToAssumption}
                  className="shrink-0 flex items-center space-x-1 text-[10px] text-blue-700 hover:text-blue-900 underline font-semibold cursor-pointer"
                >
                  <RotateCcw className="w-2.5 h-2.5" />
                  <span>Reset to estimate</span>
                </button>
              </div>
            )}
          </div>
          {errors.remainingLease && <p className="text-xs text-rose-600">{errors.remainingLease}</p>}
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
                  className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
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
                className={`py-1.5 px-2 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
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
            className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-semibold rounded-xl shadow-sm hover:shadow-md transition-all text-sm cursor-pointer"
          >
            <span>Proceed to Valuation Framework</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
