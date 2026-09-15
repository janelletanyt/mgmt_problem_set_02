/**
 * Vercel Serverless Function: /api/health
 * 
 * Reports credential status and upstream service connectivity.
 * NEVER logs or returns the credential or any part of it.
 */

const CREDENTIAL_VAR = 'DATA_GOV_SG_API_KEY';
const UPSTREAM_RESOURCE_ID = 'd_8b84c4ee58e3cfc0ece0d773c8ca6abc';

export default async function handler(req, res) {
  // Support both GET and HEAD
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // 1. Check credential BEFORE calling upstream
  const apiKey = process.env[CREDENTIAL_VAR] || process.env.DATA_API_KEY || process.env.DATA_GOV_API_KEY;
  const isMissing = !apiKey || apiKey === 'undefined' || apiKey.trim() === '';

  if (isMissing) {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(503).json({
      keyConfigured: false,
      upstreamStatus: null,
      upstreamOk: false,
      variable: CREDENTIAL_VAR,
      reason: `Missing or empty environment variable: ${CREDENTIAL_VAR}`
    });
  }

  // 2. Credential is present - test upstream connectivity with a minimal query
  const testUrl = `https://data.gov.sg/api/action/datastore_search?resource_id=${UPSTREAM_RESOURCE_ID}&limit=1`;

  let upstreamResponse;
  try {
    upstreamResponse = await fetch(testUrl, {
      headers: {
        'api-key': apiKey
      }
    });
  } catch (networkError) {
    // Upstream is unreachable
    res.setHeader('Cache-Control', 'no-store');
    return res.status(504).json({
      keyConfigured: true,
      upstreamStatus: null,
      upstreamOk: false,
      reason: `Upstream is unreachable: ${networkError.message || 'Network error'}`
    });
  }

  // 3. Check response.ok BEFORE attempting to read the body
  if (!upstreamResponse.ok) {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(upstreamResponse.status).json({
      keyConfigured: true,
      upstreamStatus: upstreamResponse.status,
      upstreamOk: false,
      reason: `Upstream service returned HTTP ${upstreamResponse.status} ${upstreamResponse.statusText || ''}`.trim()
    });
  }

  // Upstream answered with 2xx
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({
    keyConfigured: true,
    upstreamStatus: upstreamResponse.status,
    upstreamOk: true,
    reason: 'Upstream responded with HTTP 200 OK'
  });
}
