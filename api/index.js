const express = require('express');
const cors = require('cors');
require('dotenv').config();

const clickupRoutes = require('./clickup');
const notionRoutes = require('./notion');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'D.BRAIN API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/health',
      clickup: '/api/clickup',
      notion: '/api/notion'
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'D.BRAIN API is running' });
});

// API Key auth middleware - protects /api/* routes
app.use('/api', (req, res, next) => {
  const providedKey = req.header('x-api-key');
  const expectedKey = process.env.DBRAIN_API_KEY;

  if (!expectedKey) {
    return res.status(500).json({ error: 'Server misconfigured: DBRAIN_API_KEY not set' });
  }

  if (!providedKey || providedKey !== expectedKey) {
    return res.status(401).json({ error: 'Unauthorized: invalid or missing x-api-key header' });
  }

  next();
});

// Routes
app.use('/api/clickup', clickupRoutes);
app.use('/api/notion', notionRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`D.BRAIN API running on port ${PORT}`);
  });
}

module.exports = app;
