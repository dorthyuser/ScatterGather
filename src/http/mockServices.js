'use strict';

const express = require('express');

function startMockServer(port) {
  const app = express();
  app.use(express.json());

  app.post('/service1', (req, res) => {
    // simulate processing delay and echo
    const delay = Math.floor(Math.random() * 500) + 100;
    setTimeout(() => {
      res.json({ service: 'service1', received: req.body, instance: 's1', delay });
    }, delay);
  });

  app.post('/service2', (req, res) => {
    const delay = Math.floor(Math.random() * 800) + 100;
    setTimeout(() => {
      res.json({ service: 'service2', received: req.body, instance: 's2', delay });
    }, delay);
  });

  app.post('/service-slow', (req, res) => {
    // intentionally slow to cause timeout
    const delay = 5000;
    setTimeout(() => {
      res.json({ service: 'service-slow', received: req.body, delay });
    }, delay);
  });

  app.listen(port, () => console.log(`Mock services listening on ${port}`));
}

if (require.main === module) {
  const port = process.env.MOCK_PORT || 3001;
  startMockServer(port);
}

module.exports = { startMockServer };
