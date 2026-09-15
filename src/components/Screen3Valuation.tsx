import React, { useState } from 'react';
import {
  Building2,
  Calendar,
  TrendingUp,
  LineChart,
  Home,
  Globe,
  ArrowLeft,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  WifiOff,
  Inbox,
  ShieldAlert,
  Database,
  ExternalLink,
} from 'lucide-react';
import { ValuationResult } from '../types';

interface Screen3ValuationProps {
  valuation: ValuationResult;
  onBackToFramework: () => void;
  onReset: () => void;
  onRetry?: () => void;
}

export const Screen3Valuation: React.FC<Screen3ValuationProps> = ({
  valuation,
  onBackToFramework,
  onReset,
  onRetry,
}) => {
  const [selectedTrajectoryYear, setSelectedTrajectoryYear] = useState<number>(
    valuation.targetHorizonYears
  );

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-SG', {
      style: 'currency',
      currency: 'SGD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  // Find projected price for selected trajectory year
  const activeTrajectoryPoint = valuation.trajectory.find(
    (t) => t.yearOffset === selectedTrajectoryYear
  ) || {
    yearOffset: valuation.targetHorizonYears,
    calendarYear: valuation.targetCalendarYear,
    projectedPrice: valuation.estimatedMedianPrice,
  };

  const isBaseHorizon = selectedTrajectoryYear === valuation.targetHorizonYears;
  const displayPrice = isBaseHorizon
    ? valuation.estimatedMedianPrice
    : activeTrajectoryPoint.projectedPrice;

  return (
    <div className="p-4 sm:p-5 space-y-5">
      {/* Screen Title */}
      <div className="space-y-1.5">
        <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-rose-50 border border-rose-200/60 text-rose-700 text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
          <span>Step 3 of 3: Live Valuation Output</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          HDB Resale Valuation Forecast
        </h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          Forecasted property value for {valuation.targetCalendarYear} (+{valuation.targetHorizonYears} {valuation.targetHorizonYears === 1 ? 'year' : 'years'}), powered by data.gov.sg.
        </p>
      </div>

      {/* Property & Unit Identity Header */}
      <div className="bg-slate-100/90 rounded-xl p-3 border border-slate-200/80 flex items-center justify-between text-xs">
        <div className="space-y-0.5 truncate pr-2">
          <div className="flex items-center space-x-1 font-semibold text-slate-900 truncate">
            <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate">{valuation.address}</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-2 text-slate-500 text-[11px]">
            <span className="font-semibold text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200/60">
              {valuation.flatType}
            </span>
            <span>{valuation.storey}</span>
            <span>•</span>
            <span>+{valuation.targetHorizonYears}y (Year {valuation.targetCalendarYear})</span>
          </div>
        </div>
        <span className="shrink-0 px-2 py-1 rounded-md bg-white border border-slate-200 font-medium text-[11px] text-slate-700">
          99-Year Lease
        </span>
      </div>

      {/* =========================================================================
          NO RELEVANT DATA / EMPTY CASE: EXACT SPECIFIED STATEMENT
         ========================================================================= */}
      {valuation.apiStatus === 'empty' && (
        <div className="bg-amber-50/90 border-2 border-amber-200 rounded-2xl p-5 text-amber-950 space-y-4 shadow-xs">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-amber-100 rounded-xl text-amber-700 shrink-0 mt-0.5">
              <Inbox className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-bold text-amber-950 text-base leading-snug">
                Your HDB resale flat value cannot be forecasted due to a lack of relevant data.
              </h3>
              <p className="text-xs text-amber-800 leading-relaxed">
                The address you entered does not have any corresponding transaction records in the official data.gov.sg HDB resale dataset. Forecasts are strictly generated from verified real-world transaction records without synthetic or simulated fallbacks.
              </p>
              {valuation.statusDetail && (
                <p className="text-[11px] text-amber-900 font-mono bg-amber-100/80 px-2.5 py-1.5 rounded-lg border border-amber-200 inline-block mt-1">
                  {valuation.statusDetail}
                </p>
              )}
            </div>
          </div>

          <div className="pt-2 border-t border-amber-200/80 flex flex-wrap gap-2">
            <button
              type="button"
              id="btn-modify-address"
              onClick={onReset}
              className="text-xs bg-amber-800 hover:bg-amber-900 text-white font-semibold px-4 py-2 rounded-xl transition-colors shadow-xs flex items-center space-x-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Enter Valid Singapore HDB Address</span>
            </button>
          </div>
        </div>
      )}

      {/* State 3: THE UPSTREAM REFUSED */}
      {valuation.apiStatus === 'refused' && (
        <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-5 text-xs text-rose-950 space-y-3 shadow-xs">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-rose-100 rounded-xl text-rose-700 shrink-0 mt-0.5">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h4 className="font-bold text-rose-950 text-sm">
                The data.gov.sg upstream service refused the request or returned an authentication error.
              </h4>
              <p className="text-[11px] text-rose-800 leading-relaxed">
                Your HDB resale flat value cannot be forecasted due to a lack of relevant data from the upstream service.
              </p>
              {valuation.statusDetail && (
                <div className="text-[11px] text-rose-900 font-mono bg-rose-100/80 px-2.5 py-1.5 rounded-lg border border-rose-200">
                  {valuation.statusDetail}
                </div>
              )}
            </div>
          </div>
          {onRetry && (
            <button
              onClick={onRetry}
              className="text-xs bg-rose-600 hover:bg-rose-700 text-white font-medium px-3.5 py-2 rounded-xl transition-colors"
            >
              Retry Live Upstream Call
            </button>
          )}
        </div>
      )}

      {/* State 4: THE UPSTREAM IS UNREACHABLE */}
      {valuation.apiStatus === 'unreachable' && (
        <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-5 text-xs text-orange-950 space-y-3 shadow-xs">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-orange-100 rounded-xl text-orange-700 shrink-0 mt-0.5">
              <WifiOff className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h4 className="font-bold text-orange-950 text-sm">
                The data.gov.sg upstream service is currently unreachable due to network connectivity issues.
              </h4>
              <p className="text-[11px] text-orange-800 leading-relaxed">
                Your HDB resale flat value cannot be forecasted due to a lack of relevant data.
              </p>
              {valuation.statusDetail && (
                <p className="text-[10px] text-orange-700 font-mono bg-orange-100/80 px-2 py-1 rounded">
                  {valuation.statusDetail}
                </p>
              )}
            </div>
          </div>
          {onRetry && (
            <button
              onClick={onRetry}
              className="text-xs bg-orange-600 hover:bg-orange-700 text-white font-medium px-3.5 py-2 rounded-xl transition-colors"
            >
              Retry Connection
            </button>
          )}
        </div>
      )}

      {/* LIVE DATA SUCCESS BADGE & VALUATION DISPLAY (Only rendered when real API data exists) */}
      {valuation.apiStatus === 'success' && valuation.estimatedMedianPrice > 0 && (
        <>
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-900 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Database className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold block text-emerald-950">
                  Live data.gov.sg Integration Active
                </span>
                <span className="text-[11px] text-emerald-700">
                  Analyzed {valuation.liveData?.sampleCount.toLocaleString()} transactions in {valuation.liveData?.town}.
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
              Live API
            </span>
          </div>

          {/* Main Valuation Display Card */}
          <div className="bg-gradient-to-b from-white to-slate-50/50 rounded-2xl border-2 border-rose-100 p-4 sm:p-5 shadow-sm text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 transform translate-x-3 -translate-y-3 w-20 h-20 bg-rose-50 rounded-full blur-xl pointer-events-none" />

            <div className="inline-flex items-center space-x-1 text-[11px] uppercase tracking-wider font-semibold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full mb-2">
              <Sparkles className="w-3 h-3 text-rose-600" />
              <span>Projected Value in {activeTrajectoryPoint.calendarYear} (+{activeTrajectoryPoint.yearOffset}y)</span>
            </div>

            {/* Primary Valued Amount */}
            <div className="my-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {formatCurrency(displayPrice)}
              </div>
            </div>

            {/* Projected Valuation Range */}
            <div className="text-xs text-slate-500 font-medium mt-1">
              Estimated Range: {formatCurrency(valuation.estimatedPriceRangeLow)} – {formatCurrency(valuation.estimatedPriceRangeHigh)}
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100 text-left">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                  Live Estate Median
                </span>
                <span className="text-sm font-bold text-slate-800">
                  {formatCurrency(valuation.currentEstimatedBasePrice)}
                </span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                  Live Historical CAGR
                </span>
                <span className="text-sm font-bold text-emerald-600">
                  +{valuation.annualGrowthRatePct}% p.a.
                </span>
              </div>
            </div>
          </div>

          {/* 1 to 10 Year Trajectory Interactive Explorer */}
          <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                10-Year Valuation Trajectory (Tap to inspect)
              </h3>
              <span className="text-[10px] text-slate-500">
                Base +1 to +10 Years
              </span>
            </div>

            <div className="grid grid-cols-5 gap-1.5">
              {valuation.trajectory.map((item) => {
                const isSelected = selectedTrajectoryYear === item.yearOffset;
                const isTarget = valuation.targetHorizonYears === item.yearOffset;
                return (
                  <button
                    key={item.yearOffset}
                    type="button"
                    id={`btn-traj-${item.yearOffset}`}
                    onClick={() => setSelectedTrajectoryYear(item.yearOffset)}
                    className={`p-1.5 rounded-lg border text-center transition-all ${
                      isSelected
                        ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                        : isTarget
                        ? 'bg-rose-50 text-rose-800 border-rose-300 font-semibold'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="text-[10px] font-bold">+{item.yearOffset}y</div>
                    <div className={`text-[9px] ${isSelected ? 'text-rose-100' : 'text-slate-500'}`}>
                      {item.calendarYear}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Breakdown by the 4 Frameworks */}
          <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs space-y-3">
            <div className="flex items-center space-x-1.5 border-b border-slate-100 pb-2">
              <CheckCircle2 className="w-4 h-4 text-rose-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Valuation Framework Factor Attribution
              </h3>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                  <TrendingUp className="w-3 h-3" />
                </div>
                <div>
                  <div className="font-semibold text-slate-800">1. Past Trends (CAGR)</div>
                  <p className="text-slate-600 text-[11px]">{valuation.breakdown.pastTrendsImpact}</p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                  <LineChart className="w-3 h-3" />
                </div>
                <div>
                  <div className="font-semibold text-slate-800">2. Forecasting Models</div>
                  <p className="text-slate-600 text-[11px]">{valuation.breakdown.forecastingModelImpact}</p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Home className="w-3 h-3" />
                </div>
                <div>
                  <div className="font-semibold text-slate-800">3. Property Specifics & Lease Decay</div>
                  <p className="text-slate-600 text-[11px]">{valuation.breakdown.propertySpecificsImpact}</p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <div className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Globe className="w-3 h-3" />
                </div>
                <div>
                  <div className="font-semibold text-slate-800">4. Macro Factors & Policies</div>
                  <p className="text-slate-600 text-[11px]">{valuation.breakdown.macroFactorsImpact}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Action Buttons */}
      <div className="space-y-2 pt-1">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            id="btn-back-framework"
            onClick={onBackToFramework}
            className="flex items-center justify-center space-x-1.5 py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold rounded-xl text-xs transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Methodology</span>
          </button>
          <button
            type="button"
            id="btn-new-forecast"
            onClick={onReset}
            className="flex items-center justify-center space-x-1.5 py-2.5 px-3 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl text-xs transition-colors shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>New Forecast</span>
          </button>
        </div>
      </div>
    </div>
  );
};
