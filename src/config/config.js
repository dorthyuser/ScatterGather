'use strict';

const DEFAULT_TARGETS = [
  'http://localhost:3001/service1',
  'http://localhost:3001/service2'
];

const raw = process.env.TARGET_ENDPOINTS || '';
const targets = raw ? raw.split(',').map(s => s.trim()).filter(Boolean) : DEFAULT_TARGETS;

const requestTimeoutMs = Number(process.env.REQUEST_TIMEOUT_MS) || 3000;

module.exports = { targets, requestTimeoutMs };
