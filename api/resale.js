/**
 * Vercel Serverless Function: /api/resale
 * 
 * Fetches HDB resale flat transaction data from data.gov.sg
 * Filters on named town field, computes CAGR & median prices, and returns
 * ONLY the fields needed by the valuation screen.
 * 
 * Cache-Control: s-maxage=86400 (1 day), stale-while-revalidate=172800 (2 days)
 * matching monthly update frequency of HDB resale data.
 */

const CREDENTIAL_VAR = 'DATA_GOV_SG_API_KEY';
const UPSTREAM_RESOURCE_ID = 'd_8b84c4ee58e3cfc0ece0d773c8ca6abc';

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 1. Check credential BEFORE calling upstream
  const apiKey = process.env[CREDENTIAL_VAR] || process.env.DATA_API_KEY || process.env.DATA_GOV_API_KEY;
  const isMissing = !apiKey || apiKey === 'undefined' || apiKey.trim() === '';

  if (isMissing) {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(503).json({
      error: 'Service Unavailable',
      keyConfigured: false,
      variable: CREDENTIAL_VAR,
      reason: `Missing or empty environment variable: ${CREDENTIAL_VAR}`
    });
  }

  // 2. Parse query parameters
  // Support town query (e.g. ?town=TAMPINES or parsed from address)
  const rawTown = typeof req.query.town === 'string' ? req.query.town.trim() : '';
  const town = (rawTown || 'TAMPINES').toUpperCase();

  // Page limit: sensible limit of 1000 for robust analysis
  const requestedLimit = parseInt(req.query.limit, 10);
  const limit = !isNaN(requestedLimit) && requestedLimit > 0 && requestedLimit <= 10000 ? requestedLimit : 1000;

  // Build URL with encoded filter
  const filtersParam = encodeURIComponent(JSON.stringify({ town }));
  const upstreamUrl = `https://data.gov.sg/api/action/datastore_search?resource_id=${UPSTREAM_RESOURCE_ID}&filters=${filtersParam}&limit=${limit}`;

  // 3. Fetch upstream with error safety
  let upstreamResponse;
  try {
    upstreamResponse = await fetch(upstreamUrl, {
      headers: {
        'api-key': apiKey
      }
    });
  } catch (networkErr) {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(504).json({
      upstreamStatus: null,
      upstreamOk: false,
      reason: `Upstream is unreachable: ${networkErr.message || 'Network error'}`
    });
  }

  // 4. Check response.ok BEFORE reading body
  if (!upstreamResponse.ok) {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(upstreamResponse.status).json({
      upstreamStatus: upstreamResponse.status,
      upstreamOk: false,
      reason: `Upstream service returned HTTP ${upstreamResponse.status} ${upstreamResponse.statusText || ''}`.trim()
    });
  }

  // 5. Safely parse JSON
  let data;
  try {
    const text = await upstreamResponse.text();
    data = JSON.parse(text);
  } catch (parseErr) {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(502).json({
      upstreamStatus: upstreamResponse.status,
      upstreamOk: false,
      reason: 'Failed to parse JSON response from upstream service'
    });
  }

  const rawRecords = data?.result?.records || [];

  // 6. Handle empty data case
  if (!rawRecords.length) {
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=172800');
    return res.status(200).json({
      town,
      sampleCount: 0,
      isEmpty: true,
      latestMedianPrice: 0,
      historicalCAGR: 0,
      latestMonth: null,
      records: []
    });
  }

  // 7. Calculate required statistics & filter ONLY the fields screen needs
  // Sort records chronologically by month
  const sortedRecords = [...rawRecords].sort((a, b) => a.month.localeCompare(b.month));

  // Compute prices
  const allPrices = sortedRecords.map(r => Number(r.resale_price)).filter(p => !isNaN(p) && p > 0);
  
  // Median calculation helper
  const calculateMedian = (prices) => {
    if (!prices.length) return 0;
    const sorted = [...prices].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 !== 0 ? sorted[mid] : Math.round((sorted[mid - 1] + sorted[mid]) / 2);
  };

  // Recent median (last 20% of records)
  const recentSlice = allPrices.slice(-Math.max(10, Math.floor(allPrices.length * 0.2)));
  const latestMedianPrice = calculateMedian(recentSlice) || calculateMedian(allPrices);

  // Historical CAGR calculation between earliest 15% and latest 15%
  let historicalCAGR = 0.032; // Default 3.2% if single period
  if (sortedRecords.length >= 20) {
    const earliestSlice = allPrices.slice(0, Math.max(10, Math.floor(allPrices.length * 0.15)));
    const earliestMedian = calculateMedian(earliestSlice);
    const earliestYear = parseInt(sortedRecords[0].month.split('-')[0], 10);
    const latestYear = parseInt(sortedRecords[sortedRecords.length - 1].month.split('-')[0], 10);
    const yearDiff = Math.max(1, latestYear - earliestYear);

    if (earliestMedian > 0 && latestMedianPrice > earliestMedian && yearDiff > 0) {
      const cagr = Math.pow(latestMedianPrice / earliestMedian, 1 / yearDiff) - 1;
      // Clamp between 1.0% and 7.5% for realistic HDB historical band
      historicalCAGR = Math.min(Math.max(cagr, 0.01), 0.075);
    }
  }

  // Return ONLY the required fields for screen display
  const trimmedRecords = sortedRecords.slice(-10).map(r => ({
    month: r.month,
    flat_type: r.flat_type,
    resale_price: Number(r.resale_price),
    storey_range: r.storey_range,
    lease_commence_date: r.lease_commence_date
  }));

  // 8. Cache header: 1 day (86400s), stale-while-revalidate 2 days (172800s)
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=172800');

  return res.status(200).json({
    town,
    sampleCount: sortedRecords.length,
    isEmpty: false,
    latestMedianPrice,
    historicalCAGR: parseFloat((historicalCAGR * 100).toFixed(2)),
    latestMonth: sortedRecords[sortedRecords.length - 1]?.month || null,
    records: trimmedRecords
  });
}
