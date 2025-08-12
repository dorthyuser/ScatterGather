'use strict';

const gatherService = require('../services/gatherService');

async function handleScatterGather(req, res) {
  const payload = req.body || { message: 'hello' };
  try {
    const result = await gatherService.scatterGather(payload);
    res.status(200).json(result);
  } catch (err) {
    // Shouldn't happen because scatterGather handles per-call failures, but fallback
    res.status(500).json({ error: 'Unexpected error', details: String(err) });
  }
}

module.exports = { handleScatterGather };
