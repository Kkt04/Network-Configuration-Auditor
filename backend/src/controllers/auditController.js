/**
 * Audit Controller
 * Handles audit-related requests
 */

const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const { parseConfiguration } = require('../services/configParser');
const { analyzeConfiguration } = require('../services/vulnerabilityAnalyzer');
const { generateReport } = require('../services/reportGenerator');
const { saveAuditResult, getAuditResult, getAllAuditResults, deleteAuditResult } = require('../config/database');

/**
 * Upload and analyze configuration file
 */
const uploadAndAnalyze = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const { originalname, size, path: filePath } = req.file;

    // Read file content
    const content = await fs.readFile(filePath, 'utf-8');

    // Parse configuration
    const config = parseConfiguration(content);

    // Analyze for vulnerabilities
    const analysis = analyzeConfiguration(config, content);

    // Generate unique ID
    const id = uuidv4();

    // Prepare result object
    const result = {
      id,
      fileName: originalname,
      fileSize: size,
      analyzedAt: new Date().toISOString(),
      config,
      summary: analysis.summary,
      issues: analysis.issues,
      rawConfig: content
    };

    // Save to database
    await saveAuditResult(result);

    // Clean up uploaded file
    await fs.unlink(filePath);

    // Return result
    res.json({
      success: true,
      data: {
        id: result.id,
        fileName: result.fileName,
        fileSize: result.fileSize,
        analyzedAt: result.analyzedAt,
        summary: result.summary,
        issues: result.issues,
        config: {
          hostname: result.config.hostname,
          interfaces: result.config.interfaces.length,
          accessLists: result.config.accessLists.length
        }
      }
    });

  } catch (error) {
    next(error);
  }
};

/**
 * Get audit result by ID
 */
const getResult = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await getAuditResult(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Audit result not found'
      });
    }

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    next(error);
  }
};

/**
 * Get audit history
 */
const getHistory = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const results = await getAllAuditResults(limit);

    res.json({
      success: true,
      data: results,
      count: results.length
    });

  } catch (error) {
    next(error);
  }
};

/**
 * Delete audit result
 */
const deleteResult = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await deleteAuditResult(id);

    if (!result.deleted) {
      return res.status(404).json({
        success: false,
        message: 'Audit result not found'
      });
    }

    res.json({
      success: true,
      message: 'Audit result deleted successfully'
    });

  } catch (error) {
    next(error);
  }
};

/**
 * Download report
 */
const downloadReport = async (req, res, next) => {
  try {
    const { id } = req.params;
    const format = req.query.format || 'json';

    const result = await getAuditResult(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Audit result not found'
      });
    }

    const report = generateReport(result, format);

    res.setHeader('Content-Type', format === 'json' ? 'application/json' : 'text/plain');
    res.setHeader('Content-Disposition', `attachment; filename="audit-report-${id}.${format}"`);
    res.send(report);

  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadAndAnalyze,
  getResult,
  getHistory,
  deleteResult,
  downloadReport
};