import React, { useState } from 'react';
import {
  Building2,
  Calendar,
  TrendingUp,
  LineChart,
  Home,
  Globe,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  WifiOff,
  Inbox,
  ShieldAlert,
  Database,
  Info,
  Clock,
  ShieldCheck,
  Scale,
} from 'lucide-react';
import { ValuationResult } from '../types';

interface Screen3ValuationProps {
  valuation: ValuationResult;
  onBackToFramework: () => void;
  onReset: () => void;
  onRetry?: () => void;
  onEditInputs?: () => void;
}

function formatMonthYear(monthStr?: string | null): string {
  if (!monthStr) return 'Latest';
  const parts = monthStr.split('-');
  if (parts.length < 2) return monthStr;
  const year = parts[0];
  const monthNum = parseInt(parts[1], 10);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthName = months[monthNum - 1] || parts[1];
  return `${monthName} ${year}`;
}

function formatDisplayDate(dateStr?: string | null): string {
  if (!dateStr) return '28 Sep 2026';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '28 Sep 2026';
    return d.toLocaleDateString('en-SG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return '28 Sep 2026';
  }
}

export const Screen3Valuation: React.FC<Screen3ValuationProps> = ({
  valuation,
  onBackToFramework,
  onReset,
  onRetry,
  onEditInputs,
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
    projectedLow: valuation.estimatedPriceRangeLow,
    projectedHigh: valuation.estimatedPriceRangeHigh,
  };

  const isBaseHorizon = selectedTrajectoryYear === valuation.targetHorizonYears;
  const displayPrice = isBaseHorizon
    ? valuation.estimatedMedianPrice
    : activeTrajectoryPoint.projectedPrice;

  const displayLow = isBaseHorizon
    ? valuation.estimatedPriceRangeLow
    : (activeTrajectoryPoint.projectedLow || Math.round((displayPrice * 0.95) / 1000) * 1000);

  const displayHigh = isBaseHorizon
    ? valuation.estimatedPriceRangeHigh
    : (activeTrajectoryPoint.projectedHigh || Math.round((displayPrice * 1.05) / 1000) * 1000);

  const spreadPct = displayPrice > 0
    ? Math.round(((displayHigh - displayPrice) / displayPrice) * 1000) / 10
    : 5.5;

  // Format transaction data period and last update date (Heuristic #1 Visibility of System Status)
  const formattedLatestMonth = valuation.liveData?.latestMonth
    ? formatMonthYear(valuation.liveData.latestMonth)
    : 'Recent';

  const formattedEarliestMonth = valuation.liveData?.earliestMonth
    ? formatMonthYear(valuation.liveData.earliestMonth)
    : 'Jan 2017';

  const formattedDataPeriod =
    valuation.liveData?.dataPeriod && valuation.liveData.dataPeriod.includes(' to ')
      ? `${formatMonthYear(valuation.liveData.dataPeriod.split(' to ')[0])} – ${formatMonthYear(valuation.liveData.dataPeriod.split(' to ')[1])}`
      : `${formattedEarliestMonth} – ${formattedLatestMonth}`;

  const formattedLastUpdated = valuation.liveData?.lastUpdateDate
    ? formatDisplayDate(valuation.liveData.lastUpdateDate)
    : formatDisplayDate(new Date().toISOString());

  return (
    <div className="p-4 sm:p-5 space-y-4">
      {/* Screen Title */}
      <div className="flex items-center justify-between">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-md bg-rose-50 border border-rose-200/60 text-rose-700 text-[11px] font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
            <span>Step 3 of 3: Valuation Forecast</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight mt-1">
            Valuation Forecast ({valuation.targetCalendarYear})
          </h2>
        </div>
        <span className="text-[11px] text-slate-500 font-medium">
          +{valuation.targetHorizonYears}y Horizon
        </span>
      </div>

      {/* Property Summary Header */}
      <div className="bg-slate-100/90 rounded-xl p-2.5 border border-slate-200/80 flex items-center justify-between text-xs">
        <div className="truncate pr-2 space-y-0.5">
          <div className="flex items-center space-x-1 font-semibold text-slate-900 truncate">
            <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate">{valuation.address}</span>
          </div>
          <div className="text-[11px] text-slate-500 space-x-1.5">
            <span className="font-semibold text-rose-700 bg-rose-50 px-1 rounded">
              {valuation.flatType}
            </span>
            <span>{valuation.storey}</span>
            <span>•</span>
            <span>{valuation.remainingLease}y lease</span>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <span
            className={`text-[9px] font-bold px-1.5 py-0.5 rounded border inline-block ${
              valuation.isLeaseUserSupplied
                ? 'bg-blue-50 text-blue-800 border-blue-200'
                : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}
          >
            {valuation.isLeaseUserSupplied ? 'User Lease' : 'Assumed Lease'}
          </span>
          {onEditInputs && !valuation.isLeaseUserSupplied && (
            <button
              type="button"
              onClick={onEditInputs}
              className="text-[10px] text-amber-900 underline block mt-0.5 font-medium cursor-pointer"
            >
              Correct
            </button>
          )}
        </div>
      </div>

      {/* Empty / Error States */}
      {valuation.apiStatus === 'empty' && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-950 space-y-2">
          <div className="flex items-start space-x-2">
            <Inbox className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-amber-950 text-sm">
                Your HDB resale flat value cannot be forecasted due to a lack of relevant data.
              </h3>
              <p className="text-[11px] text-amber-800 mt-1">
                No matching transactions were found in official records for this address.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onReset}
            className="text-xs bg-amber-800 text-white font-semibold px-3 py-1.5 rounded-lg"
          >
            Enter Another Address
          </button>
        </div>
      )}

      {valuation.apiStatus === 'refused' && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-xs text-rose-950 space-y-2">
          <div className="flex items-start space-x-2">
            <ShieldAlert className="w-4 h-4 text-rose-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-rose-950">
                The data.gov.sg upstream service refused the request or returned an authentication error.
              </h4>
              <p className="text-[11px] text-rose-800 mt-1">
                Your HDB resale flat value cannot be forecasted due to a lack of relevant data from the upstream service.
              </p>
            </div>
          </div>
          {onRetry && (
            <button
              onClick={onRetry}
              className="text-xs bg-rose-600 text-white font-medium px-3 py-1.5 rounded-lg"
            >
              Retry Connection
            </button>
          )}
        </div>
      )}

      {valuation.apiStatus === 'unreachable' && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-xs text-orange-950 space-y-2">
          <div className="flex items-start space-x-2">
            <WifiOff className="w-4 h-4 text-orange-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-orange-950">
                The data.gov.sg upstream service is currently unreachable due to network connectivity issues.
              </h4>
              <p className="text-[11px] text-orange-800 mt-1">
                Your HDB resale flat value cannot be forecasted due to a lack of relevant data.
              </p>
            </div>
          </div>
          {onRetry && (
            <button
              onClick={onRetry}
              className="text-xs bg-orange-600 text-white font-medium px-3 py-1.5 rounded-lg"
            >
              Retry Connection
            </button>
          )}
        </div>
      )}

      {/* Main Live Valuation Content */}
      {valuation.apiStatus === 'success' && valuation.estimatedMedianPrice > 0 && (
        <>
          {/* Live Data Recency Strip (Compact Visibility of System Status) */}
          <div className="flex items-center justify-between text-[11px] bg-emerald-50/90 border border-emerald-200/80 px-3 py-1.5 rounded-xl text-emerald-950">
            <div className="flex items-center space-x-1.5 truncate pr-2">
              <Database className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="font-semibold truncate">data.gov.sg</span>
              <span className="text-emerald-700 text-[10px]">
                ({valuation.liveData?.sampleCount.toLocaleString()} txns in {valuation.liveData?.town})
              </span>
            </div>
            <div className="flex items-center space-x-2 text-[10px] text-emerald-800 shrink-0">
              <span title="Transaction Data Period">Period: <strong>{formattedDataPeriod}</strong></span>
              <span>•</span>
              <span title="Dataset Synchronization Date">Updated: <strong>{formattedLastUpdated}</strong></span>
            </div>
          </div>

          {/* Main Valuation Display Card (Range Hero - Heuristic #2) */}
          <div className="bg-gradient-to-b from-white to-slate-50/60 rounded-2xl border-2 border-rose-200/80 p-4 shadow-xs text-center">
            <div className="inline-flex items-center space-x-1 text-[11px] uppercase tracking-wider font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full mb-1 border border-rose-100">
              <Sparkles className="w-3 h-3 text-rose-600" />
              <span>Projected Range ({activeTrajectoryPoint.calendarYear})</span>
            </div>

            {/* Hero Range */}
            <div className="my-1.5">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {formatCurrency(displayLow)} – {formatCurrency(displayHigh)}
              </div>
              <div className="flex items-center justify-center space-x-2 text-xs text-slate-600 font-medium mt-1">
                <span>Midpoint: <strong>{formatCurrency(displayPrice)}</strong></span>
                <span>•</span>
                <span className="text-rose-700 font-semibold text-[11px]">
                  ±{spreadPct}% spread
                </span>
              </div>
            </div>

            {/* Visual Uncertainty Range Indicator Bar */}
            <div className="mt-3 pt-2.5 border-t border-slate-100">
              <div className="flex justify-between text-[10px] font-semibold text-slate-500 mb-1 px-0.5">
                <span>Low: {formatCurrency(displayLow)}</span>
                <span className="text-rose-700 font-bold">Mid: {formatCurrency(displayPrice)}</span>
                <span>High: {formatCurrency(displayHigh)}</span>
              </div>
              <div className="relative w-full h-2 bg-slate-200 rounded-full overflow-hidden flex items-center">
                <div className="w-full h-full bg-gradient-to-r from-slate-300 via-rose-500 to-slate-300 rounded-full" />
                <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-rose-700 border-2 border-white rounded-full shadow-xs" />
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 mt-3 pt-2.5 border-t border-slate-100 text-left text-xs">
              <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                  Current Estate Median
                </span>
                <span className="text-sm font-bold text-slate-800">
                  {formatCurrency(valuation.currentEstimatedBasePrice)}
                </span>
              </div>
              <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">
                  Net Modeled CAGR
                </span>
                <span className="text-sm font-bold text-emerald-600">
                  +{valuation.annualGrowthRatePct}% p.a.
                </span>
              </div>
            </div>
          </div>

          {/* 1 to 10 Year Trajectory Interactive Explorer */}
          <div className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs">
              <h3 className="font-bold uppercase tracking-wider text-slate-800 text-[11px]">
                10-Year Trajectory (Tap to inspect)
              </h3>
              <span className="text-[10px] text-slate-400">
                Year-by-year
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
                    className={`py-1 px-1 rounded-lg border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-rose-600 text-white border-rose-600 shadow-2xs font-bold'
                        : isTarget
                        ? 'bg-rose-50 text-rose-800 border-rose-300 font-semibold'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <div className="text-[10px]">+{item.yearOffset}y</div>
                    <div className={`text-[9px] ${isSelected ? 'text-rose-100' : 'text-slate-500'}`}>
                      {item.calendarYear}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* =========================================================================
              THE 4 VALUATION FRAMEWORKS (PRESERVED IN FULL, TIGHTENED)
             ========================================================================= */}
          <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-rose-600" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Valuation Framework Breakdown
                </h3>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">4 Core Pillars</span>
            </div>

            <div className="space-y-2 text-xs">
              {/* Pillar 1 */}
              <div className="flex items-start space-x-2.5 p-2 rounded-lg bg-slate-50/80 border border-slate-100">
                <div className="w-6 h-6 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[11px]">
                  1
                </div>
                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800">Past Trends (CAGR)</span>
                    <span className="font-mono text-emerald-600 font-bold text-[10px]">
                      +{valuation.liveData?.historicalCAGR || '3.2'}% p.a.
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Baseline historical growth derived from {valuation.liveData?.sampleCount} official {valuation.flatType} sales in {valuation.liveData?.town}.
                  </p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="flex items-start space-x-2.5 p-2 rounded-lg bg-slate-50/80 border border-slate-100">
                <div className="w-6 h-6 rounded-md bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[11px]">
                  2
                </div>
                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800">Forecasting Models</span>
                    <span className="font-mono text-purple-700 font-bold text-[10px]">ARIMA + Trend</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Time-series regression calibrated with momentum dampeners to avoid straight-line over-optimism.
                  </p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="flex items-start space-x-2.5 p-2 rounded-lg bg-slate-50/80 border border-slate-100">
                <div className="w-6 h-6 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[11px]">
                  3
                </div>
                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800">Property & Lease Specifics</span>
                    <span className="font-mono text-amber-800 font-bold text-[10px]">
                      {valuation.remainingLease}y ({valuation.isLeaseUserSupplied ? 'User' : 'Assumed'})
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Factored storey level ({valuation.storey}) and Bala's Curve leasehold depreciation (-{valuation.remainingLease < 50 ? '1.50%' : '0.85%'} p.a.).
                  </p>
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="flex items-start space-x-2.5 p-2 rounded-lg bg-slate-50/80 border border-slate-100">
                <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[11px]">
                  4
                </div>
                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800">Macro Policy & Supply</span>
                    <span className="font-mono text-slate-600 font-bold text-[10px]">-0.40% p.a.</span>
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Incorporates cooling measures (LTV caps, wait-out periods) and BTO supply pipelines.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              MAJOR FACTORS & ESTIMATION LIMITATIONS (CONCISE CHIPS & LIST)
             ========================================================================= */}
          <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center space-x-1.5">
                <Scale className="w-4 h-4 text-amber-600" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Real-World Valuation Factors
                </h3>
              </div>
            </div>

            <p className="text-[11px] text-slate-600 leading-snug">
              Why transaction prices vary across the estimated range:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-start space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1 shrink-0" />
                <div>
                  <strong className="text-slate-800 text-[11px] block">Renovation (±$30k–$80k)</strong>
                  <span className="text-[10px] text-slate-500 leading-tight block">Interior condition is not captured in macro sales data.</span>
                </div>
              </div>

              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-start space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1 shrink-0" />
                <div>
                  <strong className="text-slate-800 text-[11px] block">Facing & View (±$15k–$40k)</strong>
                  <span className="text-[10px] text-slate-500 leading-tight block">North-south orientation and unblocked park/sky views.</span>
                </div>
              </div>

              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-start space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1 shrink-0" />
                <div>
                  <strong className="text-slate-800 text-[11px] block">Negotiation & COV</strong>
                  <span className="text-[10px] text-slate-500 leading-tight block">Buyer urgency and cash-over-valuation premiums.</span>
                </div>
              </div>

              <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-start space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1 shrink-0" />
                <div>
                  <strong className="text-slate-800 text-[11px] block">Mortgage & Rates</strong>
                  <span className="text-[10px] text-slate-500 leading-tight block">MAS cooling measures and commercial loan rate cycles.</span>
                </div>
              </div>
            </div>

            {/* Compact Advisory Disclaimer */}
            <div className="p-2 rounded-lg bg-amber-50/90 border border-amber-200 text-amber-950 text-[10px] flex items-center space-x-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span className="leading-tight">
                Statistical estimate based on data.gov.sg. Consult a certified valuer or CEA agent prior to property transactions.
              </span>
            </div>
          </div>
        </>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <button
          type="button"
          id="btn-back-framework"
          onClick={onBackToFramework}
          className="flex items-center justify-center space-x-1.5 py-2.5 px-3 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold rounded-xl text-xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Methodology</span>
        </button>
        <button
          type="button"
          id="btn-new-forecast"
          onClick={onReset}
          className="flex items-center justify-center space-x-1.5 py-2.5 px-3 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-xl text-xs transition-colors shadow-xs cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>New Forecast</span>
        </button>
      </div>
    </div>
  );
};
