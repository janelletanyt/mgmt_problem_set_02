import React from 'react';
import {
  TrendingUp,
  LineChart,
  Home,
  Globe,
  ArrowLeft,
  ArrowRight,
  Info,
  Building2,
  Calendar,
} from 'lucide-react';
import { FlatFormData } from '../types';

interface Screen2FrameworkProps {
  formData: FlatFormData;
  onBack: () => void;
  onProceed: () => void;
}

export const Screen2Framework: React.FC<Screen2FrameworkProps> = ({
  formData,
  onBack,
  onProceed,
}) => {
  const currentYear = new Date().getFullYear();
  const targetYear = currentYear + formData.forecastYears;

  const frameworks = [
    {
      id: 1,
      title: '1. Analyze Past Trends',
      icon: TrendingUp,
      badge: 'Historical Data',
      color: 'blue',
      items: [
        {
          term: 'Calculate growth rate',
          description:
            'Find the Compound Annual Growth Rate (CAGR) from your 10-year data to see the average yearly percentage change.',
        },
        {
          term: 'Identify cycles',
          description:
            'Look for past market booms or flat periods to understand how the flat reacted to broader economic changes.',
          citation: '[1]',
        },
      ],
    },
    {
      id: 2,
      title: '2. Apply Forecasting Models',
      icon: LineChart,
      badge: 'Statistical Modeling',
      color: 'purple',
      items: [
        {
          term: 'Linear regression',
          description:
            'Draw a baseline trend line using past prices to project a steady upward or downward path.',
        },
        {
          term: 'Time-series analysis',
          description:
            'Use statistical tools like ARIMA (Autoregressive Integrated Moving Average) to capture seasonal patterns and momentum from the historical data.',
        },
      ],
    },
    {
      id: 3,
      title: '3. Adjust for Property Specifics',
      icon: Home,
      badge: 'Property Attributes',
      color: 'amber',
      items: [
        {
          term: 'Lease decay',
          description:
            'Factor in the age of the building. HDB flats lose value as their 99-year lease shortens, especially past the 30-year mark.',
        },
        {
          term: 'Location and attributes',
          description:
            'Weigh mature versus non-mature estates, proximity to MRT stations, and floor level, as these change the actual price growth compared to the general average.',
          citation: '[1, 2]',
        },
      ],
    },
    {
      id: 4,
      title: '4. Incorporate Macro Factors',
      icon: Globe,
      badge: 'Market Dynamics',
      color: 'emerald',
      items: [
        {
          term: 'Supply pressure',
          description:
            'Factor in upcoming Build-To-Order (BTO) launches and flats reaching their Minimum Occupation Period (MOP), which can slow price growth.',
        },
        {
          term: 'Government policies',
          description:
            'Account for cooling measures, interest rate shifts, and housing grant changes that cap or boost buyer demand.',
        },
      ],
    },
  ];

  return (
    <div className="p-4 sm:p-5 space-y-5">
      {/* Step Header */}
      <div className="space-y-1.5">
        <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-rose-50 border border-rose-200/60 text-rose-700 text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
          <span>Step 2 of 3: Valuation Methodology</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">
          How Your Flat’s Valuation Is Considered
        </h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          Four concise, multi-dimensional analytical pillars are used to project your property value over the next {formData.forecastYears} {formData.forecastYears === 1 ? 'year' : 'years'}.
        </p>
      </div>

      {/* Target Property Summary Bar */}
      <div className="bg-slate-100 rounded-xl p-3 border border-slate-200/80 flex items-center justify-between text-xs">
        <div className="space-y-0.5 min-w-0 pr-2">
          <div className="flex items-center space-x-1 font-semibold text-slate-800 truncate">
            <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <span className="truncate">{formData.address}</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-2 text-slate-500 text-[11px]">
            <span className="font-medium text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200/60">
              {formData.flatType}
            </span>
            <span>{formData.storey}</span>
            <span>•</span>
            <span>Horizon: +{formData.forecastYears}y ({targetYear})</span>
          </div>
        </div>
        <button
          type="button"
          id="btn-edit-inputs"
          onClick={onBack}
          className="shrink-0 text-xs text-rose-600 hover:text-rose-700 font-medium px-2 py-1 rounded-md bg-white border border-rose-200 hover:bg-rose-50 transition-colors"
        >
          Edit
        </button>
      </div>

      {/* 4 Framework Pillars */}
      <div className="space-y-3">
        {frameworks.map((fw) => {
          const Icon = fw.icon;
          return (
            <div
              key={fw.id}
              className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs transition-shadow hover:shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-rose-600" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {fw.title}
                  </h3>
                </div>
                <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  {fw.badge}
                </span>
              </div>

              <div className="space-y-2 pt-1 border-t border-slate-100 text-xs">
                {fw.items.map((item, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex items-baseline space-x-1">
                      <span className="font-semibold text-slate-800">
                        {item.term}:
                      </span>
                      {item.citation && (
                        <span className="text-[10px] font-semibold text-rose-600 bg-rose-50 px-1 rounded-xs">
                          {item.citation}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 leading-relaxed pl-2 border-l-2 border-slate-200">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Citations block */}
      <div className="bg-slate-50 rounded-xl p-3 border border-slate-200/70 text-[11px] text-slate-500 space-y-1">
        <div className="flex items-center space-x-1 font-medium text-slate-600">
          <Info className="w-3.5 h-3.5" />
          <span>Framework References</span>
        </div>
        <p>[1] Based on historical HDB resale price index patterns & macro cycle tracking.</p>
        <p>[2] Incorporates SLA Bala’s Table of Leasehold Value & MND estate maturity classification.</p>
      </div>

      {/* Navigation Buttons */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <button
          type="button"
          id="btn-back-screen1"
          onClick={onBack}
          className="flex items-center justify-center space-x-1.5 py-3 px-4 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-semibold rounded-xl text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <button
          type="button"
          id="btn-proceed-screen3"
          onClick={onProceed}
          className="flex items-center justify-center space-x-1.5 py-3 px-4 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-semibold rounded-xl text-sm shadow-sm hover:shadow-md transition-all"
        >
          <span>View Valuation</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
