/**
 * Audit Routes
 * API endpoints for audit functionality
 */

const express = require('express');
const router = express.Router();

const upload = require('../middleware/fileUpload');
const {
  uploadAndAnalyze,
  getResult,
  getHistory,
  deleteResult,
  downloadReport
} = require('../controllers/auditController');

/**
 * @route   POST /api/audit/upload
 * @desc    Upload and analyze configuration file
 * @access  Public
 */
router.post('/upload', upload.single('configFile'), uploadAndAnalyze);

/**
 * @route   GET /api/audit/results/:id
 * @desc    Get audit result by ID
 * @access  Public
 */
router.get('/results/:id', getResult);

/**
 * @route   GET /api/audit/history
 * @desc    Get audit history
 * @access  Public
 */
router.get('/history', getHistory);

/**
 * @route   DELETE /api/audit/results/:id
 * @desc    Delete audit result
 * @access  Public
 */
router.delete('/results/:id', deleteResult);

/**
 * @route   GET /api/audit/download/:id
 * @desc    Download audit report
 * @access  Public
 */
router.get('/download/:id', downloadReport);

module.exports = router;