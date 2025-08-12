'use strict';

const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const scatterRouter = require('./routes/scatter');
const mockServices = require('./http/mockServices');
const config = require('./config/config');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'UP' }));
app.use('/scatter', scatterRouter);

app.listen(PORT, () => {
  console.log(`Scatter-Gather service listening on port ${PORT}`);
  console.log(`Configured targets: ${JSON.stringify(config.targets)}`);
});

// If running locally and no external targets provided, optionally start the mock server
if (!process.env.TARGET_ENDPOINTS) {
  const MOCK_PORT = process.env.MOCK_PORT || 3001;
  mockServices.startMockServer(MOCK_PORT);
}
