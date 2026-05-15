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

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'D.BRAIN API is running' });
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

app.listen(PORT, () => {
  console.log(`D.BRAIN API running on port ${PORT}`);
});

module.exports = app;
