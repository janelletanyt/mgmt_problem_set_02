import React, { useState, useEffect } from 'react';
import { Activity, CheckCircle2, AlertCircle, X, RefreshCw } from 'lucide-react';
import { checkApiHealth } from '../services/valuationApi';

interface ApiHealthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiHealthModal: React.FC<ApiHealthModalProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [healthData, setHealthData] = useState<any>(null);

  const runCheck = async () => {
    setLoading(true);
    const result = await checkApiHealth();
    setHealthData(result);
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      runCheck();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full p-4 shadow-xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-rose-600" />
            <h3 className="text-sm font-bold text-slate-900">API Health Diagnostics</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed">
          Verifies serverless function <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-[10px]">/api/health</code>. Reports credential configuration and upstream response status without exposing credentials.
        </p>

        {loading ? (
          <div className="py-6 flex flex-col items-center justify-center space-y-2 text-xs text-slate-500">
            <RefreshCw className="w-5 h-5 text-rose-600 animate-spin" />
            <span>Pinging /api/health...</span>
          </div>
        ) : healthData ? (
          <div className="space-y-2.5 text-xs">
            {/* Credential Status */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-600 font-medium">Credential (DATA_GOV_SG_API_KEY):</span>
              {healthData.data?.keyConfigured ? (
                <span className="inline-flex items-center space-x-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md text-[11px]">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Configured</span>
                </span>
              ) : (
                <span className="inline-flex items-center space-x-1 text-rose-700 font-semibold bg-rose-50 px-2 py-0.5 rounded-md text-[11px]">
                  <AlertCircle className="w-3 h-3 text-rose-600" />
                  <span>Missing / Empty</span>
                </span>
              )}
            </div>

            {/* Upstream Status */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-slate-600 font-medium">Upstream (data.gov.sg):</span>
              <span className={`font-mono font-bold text-[11px] px-2 py-0.5 rounded-md ${
                healthData.data?.upstreamOk ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
              }`}>
                {healthData.data?.upstreamStatus ? `HTTP ${healthData.data.upstreamStatus}` : 'Unanswered (Blocked)'}
              </span>
            </div>

            {/* Diagnostic Details */}
            <div className="p-2.5 rounded-xl bg-slate-100/80 border border-slate-200/80 font-mono text-[10px] text-slate-700 space-y-1">
              <div className="font-semibold text-slate-900">Health Report:</div>
              <div>Status: HTTP {healthData.status}</div>
              <div>Reason: {healthData.data?.reason || healthData.data?.message || 'N/A'}</div>
            </div>
          </div>
        ) : null}

        <div className="pt-2 flex justify-end space-x-2">
          <button
            onClick={runCheck}
            disabled={loading}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg text-xs flex items-center space-x-1 transition-colors"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
            <span>Re-check</span>
          </button>
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-lg text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
