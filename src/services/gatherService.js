'use strict';

const axios = require('axios');
const config = require('../config/config');

async function callTarget(url, payload, timeoutMs) {
  const start = Date.now();
  try {
    const response = await axios.post(url, payload, { timeout: timeoutMs, headers: { 'Content-Type': 'application/json' } });
    const elapsed = Date.now() - start;
    return { url, status: 'fulfilled', statusCode: response.status, body: response.data, elapsedMs: elapsed };
  } catch (err) {
    const elapsed = Date.now() - start;
    if (err.response) {
      // non-2xx
      return { url, status: 'rejected', statusCode: err.response.status, body: err.response.data, elapsedMs: elapsed, reason: 'non-2xx' };
    }
    // timeout or network
    return { url, status: 'rejected', reason: err.code || err.message, elapsedMs: elapsed };
  }
}

async function scatterGather(payload) {
  const targets = config.targets;
  const timeoutMs = config.requestTimeoutMs || 3000;

  const promises = targets.map(t => callTarget(t, payload, timeoutMs));

  const settled = await Promise.all(promises);

  const successes = settled.filter(r => r.status === 'fulfilled');
  const failures = settled.filter(r => r.status !== 'fulfilled');

  const aggregated = {
    timestamp: new Date().toISOString(),
    totalTargets: targets.length,
    successes: successes.length,
    failures: failures.length,
    results: settled
n  };

  // Provide an overall status code-like field
  aggregated.overallStatus = failures.length === 0 ? 'OK' : 'PARTIAL_FAILURE';

  return aggregated;
}

module.exports = { scatterGather };
