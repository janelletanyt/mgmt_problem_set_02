export interface FlatFormData {
  address: string;
  unitNumber: string;
  forecastYears: number; // 1 to 10 years
  flatType?: string; // Optional helper for standard pricing baseline
}

export interface ValuationFrameworkPillar {
  id: number;
  title: string;
  iconName: string;
  description: string;
  points: {
    subtitle: string;
    text: string;
    citation?: string;
  }[];
}

export type ApiValuationStatus = 'loading' | 'success' | 'empty' | 'refused' | 'unreachable';

export interface LiveRecord {
  month: string;
  flat_type: string;
  resale_price: number;
  storey_range: string;
  lease_commence_date: string;
}

export interface LiveResalePayload {
  town: string;
  sampleCount: number;
  isEmpty: boolean;
  latestMedianPrice: number;
  historicalCAGR: number;
  latestMonth: string | null;
  records: LiveRecord[];
  error?: string;
  reason?: string;
  upstreamStatus?: number | null;
  upstreamOk?: boolean;
  variable?: string;
}

export interface ValuationResult {
  address: string;
  unitNumber: string;
  targetHorizonYears: number;
  targetCalendarYear: number;
  estimatedMedianPrice: number;
  estimatedPriceRangeLow: number;
  estimatedPriceRangeHigh: number;
  annualGrowthRatePct: number;
  currentEstimatedBasePrice: number;
  breakdown: {
    pastTrendsImpact: string;
    forecastingModelImpact: string;
    propertySpecificsImpact: string;
    macroFactorsImpact: string;
  };
  trajectory: {
    yearOffset: number;
    calendarYear: number;
    projectedPrice: number;
  }[];
  isApiConnected: boolean; // True when live data.gov.sg data is successfully used
  apiStatus: ApiValuationStatus;
  statusSentence: string; // The distinct sentence required for each of the 4 cases
  statusDetail?: string;
  liveData?: {
    town: string;
    sampleCount: number;
    latestMedianPrice: number;
    historicalCAGR: number;
    latestMonth: string | null;
    records: LiveRecord[];
  };
}
