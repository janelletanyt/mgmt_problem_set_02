import React, { useEffect } from 'react';
import { X, Layers, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

interface StepNavigationPromptModalProps {
  isOpen: boolean;
  targetStep: number;
  onClose: () => void;
  onGoToScreen1: () => void;
}

export const StepNavigationPromptModal: React.FC<StepNavigationPromptModalProps> = ({
  isOpen,
  targetStep,
  onClose,
  onGoToScreen1,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const targetStepName =
    targetStep === 2
      ? 'Step 2: Valuation Frameworks'
      : targetStep === 3
      ? 'Step 3: Valuation Forecast'
      : 'this screen';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="prompt-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3.5 bg-rose-50/70 border-b border-rose-100">
          <div className="flex items-center space-x-2 text-rose-800">
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 id="prompt-modal-title" className="text-sm font-bold text-slate-900 leading-tight">
                Please Complete Screen 1 First
              </h3>
              <p className="text-[11px] text-rose-700 font-medium">
                Step-by-step navigation requirement
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-white/80 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3.5 text-xs text-slate-600">
          <div className="flex items-start space-x-2 text-slate-700 bg-amber-50 p-2.5 rounded-xl border border-amber-200/70">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed text-amber-900">
              You selected <strong>{targetStepName}</strong>. The natural instinct is to explore different tabs, but {targetStepName} requires your specific flat inputs to calculate official valuation models.
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="text-[11px] font-semibold text-slate-800 uppercase tracking-wider block">
              Required on Screen 1 before proceeding:
            </span>
            <ul className="space-y-1 text-[11px] text-slate-600">
              <li className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>Valid Singapore HDB flat address & town</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>Flat type (number of rooms) & floor level</span>
              </li>
              <li className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span>Remaining lease tenure (user-supplied or assumed)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              onGoToScreen1();
            }}
            className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 rounded-xl shadow-xs transition-colors flex items-center space-x-1.5 cursor-pointer"
          >
            <span>Fill Screen 1 First</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
