import React, { useState } from 'react';
import { Header } from './components/Header';
import { Screen1Form } from './components/Screen1Form';
import { Screen2Framework } from './components/Screen2Framework';
import { Screen3Valuation } from './components/Screen3Valuation';
import { DisqusSection } from './components/DisqusSection';
import { fetchValuationForecast } from './services/valuationApi';
import { FlatFormData, ValuationResult } from './types';
import { Database, ExternalLink } from 'lucide-react';

export default function App() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FlatFormData>({
    address: 'Blk 142 Lorong 2 Toa Payoh',
    storey: '07 TO 09',
    flatType: '4 ROOM',
    forecastYears: 5,
  });
  const [valuationResult, setValuationResult] = useState<ValuationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Screen 1 -> Screen 2 handler
  const handleFormSubmit = (data: FlatFormData) => {
    setFormData(data);
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Screen 2 -> Screen 3 valuation generator
  const handleGenerateValuation = async () => {
    setIsLoading(true);
    try {
      const result = await fetchValuationForecast(formData);
      setValuationResult(result);
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('Valuation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setCurrentStep(1);
    setValuationResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-start items-center sm:py-6 px-0 sm:px-4 font-sans antialiased text-slate-800">
      {/* Mobile-contained phone view container */}
      <main className="w-full sm:max-w-md bg-white min-h-screen sm:min-h-[780px] sm:rounded-3xl shadow-xl sm:border sm:border-slate-200/80 flex flex-col overflow-hidden relative">
        {/* Header & Step Tracker */}
        <Header currentStep={currentStep} onReset={handleReset} />

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {/* CASE 1: THE DATA IS LOADING */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center p-8 text-center space-y-5 min-h-[460px]">
              <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200/80 flex items-center justify-center text-rose-600 relative">
                <Database className="w-8 h-8 text-rose-600 animate-pulse" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-600"></span>
                </span>
              </div>

              <div className="space-y-2 max-w-xs">
                {/* Specific sentence required for the loading state */}
                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  Loading live HDB resale transaction data from data.gov.sg...
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Executing serverless function to retrieve official price records and calculate estate CAGR.
                </p>
              </div>

              {/* Step indicator during load */}
              <div className="w-full max-w-xs bg-slate-100 rounded-full h-1.5 overflow-hidden">
                <div className="bg-rose-600 h-full rounded-full animate-pulse w-3/4"></div>
              </div>

              <span className="text-[11px] font-mono text-slate-400">
                Resource: d_8b84c4ee58e3cfc0ece0d773c8ca6abc
              </span>
            </div>
          ) : (
            <>
              {currentStep === 1 && (
                <Screen1Form
                  initialData={formData}
                  onSubmit={handleFormSubmit}
                />
              )}

              {currentStep === 2 && (
                <Screen2Framework
                  formData={formData}
                  onBack={() => setCurrentStep(1)}
                  onProceed={handleGenerateValuation}
                />
              )}

              {currentStep === 3 && valuationResult && (
                <Screen3Valuation
                  valuation={valuationResult}
                  onBackToFramework={() => setCurrentStep(2)}
                  onReset={handleReset}
                  onRetry={handleGenerateValuation}
                />
              )}
            </>
          )}
        </div>

        {/* Disqus Feedback Thread Section */}
        <DisqusSection />

        {/* Footer with Singapore Open Data Licence attribution and Privacy Notice */}
        <footer className="py-3 px-4 bg-slate-50 border-t border-slate-200 text-left space-y-2">
          <div className="text-[10px] text-slate-500 leading-relaxed">
            Contains information from <strong>Resale flat prices based on registration date from Jan-2017 onwards</strong> accessed from <a href="https://data.gov.sg" target="_blank" rel="noopener noreferrer" className="text-rose-600 underline hover:text-rose-700">data.gov.sg</a> which is made available under the terms of the <a href="https://data.gov.sg/open-data-licence" target="_blank" rel="noopener noreferrer" className="text-rose-600 underline hover:text-rose-700 inline-flex items-center space-x-0.5"><span>Singapore Open Data Licence version 1.0</span><ExternalLink className="w-2.5 h-2.5 inline ml-0.5" /></a>.
          </div>
          <div className="text-[10px] text-slate-500 leading-relaxed pt-1.5 border-t border-slate-200/50">
            This page uses Microsoft Clarity and Disqus, which use cookies to record how visitors use the site and to host comments. By using this page you agree that we and Microsoft may collect and use this data. See the{' '}
            <a
              href="https://www.microsoft.com/privacy/privacystatement"
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-600 underline hover:text-rose-700 font-medium"
            >
              Microsoft Privacy Statement
            </a>
            , the{' '}
            <a
              href="https://disqus.com/privacy-policy/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-600 underline hover:text-rose-700 font-medium"
            >
              Disqus privacy policy
            </a>{' '}
            and the{' '}
            <a
              href="https://disqus.com/data-sharing-settings/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-600 underline hover:text-rose-700 font-medium"
            >
              Disqus data sharing settings
            </a>
            .
          </div>
          <div className="text-[9px] text-slate-400 pt-0.5 border-t border-slate-200/50 flex justify-between items-center">
            <span>MGMT 6110 Human-AI Collaboration</span>
            <span>ResaleForecast &bull; Vercel Serverless</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
