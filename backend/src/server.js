const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

// Import routes
const auditRoutes = require('./routes/auditRoutes');

// Import middleware
const errorHandler = require('./middleware/errorHandler');

// Import database
const { initDatabase } = require('./config/database');

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create required directories
const dirs = [
  process.env.UPLOAD_DIR || './uploads',
  process.env.REPORTS_DIR || './reports',
  './database'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Initialize database
initDatabase();

// Routes
app.use('/api/audit', auditRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Network Auditor API is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Network Configuration Auditor API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      upload: 'POST /api/audit/upload',
      results: 'GET /api/audit/results/:id',
      history: 'GET /api/audit/history'
    }
  });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}`);
  console.log(`🔍 Environment: ${process.env.NODE_ENV}`);
});