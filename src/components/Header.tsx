import React, { useState } from 'react';
import { Building2, RotateCcw, Activity } from 'lucide-react';
import { ApiHealthModal } from './ApiHealthModal';

interface HeaderProps {
  currentStep: number;
  onReset: () => void;
  onSelectStep?: (step: number) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentStep, onReset, onSelectStep }) => {
  const [showHealthModal, setShowHealthModal] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 py-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-xs">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-semibold text-slate-900 tracking-tight leading-tight">
                ResaleForecast
              </h1>
              <p className="text-[11px] font-normal text-slate-500">
                Singapore HDB Valuation
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              id="btn-header-health"
              onClick={() => setShowHealthModal(true)}
              className="flex items-center space-x-1 text-[11px] font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2 py-1.5 rounded-lg transition-colors cursor-pointer"
              title="Inspect API Health"
            >
              <Activity className="w-3.5 h-3.5 text-rose-600" />
              <span className="hidden sm:inline">API</span>
              <span>Health</span>
            </button>

            {currentStep > 1 && (
              <button
                id="btn-header-reset"
                onClick={onReset}
                className="flex items-center space-x-1 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                title="Start New Forecast"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Step Progress Bar & Interactive Navigation Tabs (Heuristic #1) */}
        <div className="mt-3">
          <div className="grid grid-cols-3 gap-1 mb-1.5" role="tablist" aria-label="Valuation Steps">
            {[
              { step: 1, label: '1. Flat Details' },
              { step: 2, label: '2. Frameworks' },
              { step: 3, label: '3. Valuation' },
            ].map((tab) => {
              const isActive = currentStep === tab.step;
              const isPast = currentStep > tab.step;
              return (
                <button
                  key={tab.step}
                  type="button"
                  id={`tab-step-${tab.step}`}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onSelectStep?.(tab.step)}
                  className={`text-center py-1.5 px-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer flex items-center justify-center space-x-1 ${
                    isActive
                      ? 'bg-rose-50 text-rose-700 font-bold border border-rose-200 shadow-2xs'
                      : isPast
                      ? 'text-rose-600 hover:bg-slate-100'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                  }`}
                  title={
                    isActive
                      ? `Currently on ${tab.label}`
                      : isPast
                      ? `Return to ${tab.label}`
                      : `Go to ${tab.label}`
                  }
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isActive ? 'bg-rose-600 ring-2 ring-rose-200' : isPast ? 'bg-rose-400' : 'bg-slate-300'
                    }`}
                  />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden flex">
            <div
              className={`h-full transition-all duration-300 ${
                currentStep === 1
                  ? 'w-1/3 bg-rose-600'
                  : currentStep === 2
                  ? 'w-2/3 bg-rose-600'
                  : 'w-full bg-rose-600'
              }`}
            />
          </div>
        </div>
      </header>

      <ApiHealthModal
        isOpen={showHealthModal}
        onClose={() => setShowHealthModal(false)}
      />
    </>
  );
};
