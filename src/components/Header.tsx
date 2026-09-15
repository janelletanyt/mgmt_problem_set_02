import React, { useState } from 'react';
import { Building2, RotateCcw, Activity } from 'lucide-react';
import { ApiHealthModal } from './ApiHealthModal';

interface HeaderProps {
  currentStep: number;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentStep, onReset }) => {
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
              className="flex items-center space-x-1 text-[11px] font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2 py-1.5 rounded-lg transition-colors"
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
                className="flex items-center space-x-1 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1.5 rounded-lg transition-colors"
                title="Start New Forecast"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Step Progress Bar */}
        <div className="mt-3">
          <div className="flex justify-between text-[11px] font-medium text-slate-500 mb-1.5">
            <span className={currentStep >= 1 ? 'text-rose-600 font-semibold' : ''}>
              1. Flat Details
            </span>
            <span className={currentStep >= 2 ? 'text-rose-600 font-semibold' : ''}>
              2. Frameworks
            </span>
            <span className={currentStep >= 3 ? 'text-rose-600 font-semibold' : ''}>
              3. Valuation
            </span>
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
