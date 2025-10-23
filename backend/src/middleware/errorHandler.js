/**
 * Error Handler Middleware
 * Centralized error handling
 */

const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);
  
    // Multer errors
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File size exceeds maximum limit',
        error: 'FILE_TOO_LARGE'
      });
    }
  
    if (err.message && err.message.includes('Invalid file type')) {
      return res.status(400).json({
        success: false,
        message: err.message,
        error: 'INVALID_FILE_TYPE'
      });
    }
  
    // Database errors
    if (err.code === 'SQLITE_ERROR') {
      return res.status(500).json({
        success: false,
        message: 'Database error occurred',
        error: 'DATABASE_ERROR'
      });
    }
  
    // File system errors
    if (err.code === 'ENOENT') {
      return res.status(404).json({
        success: false,
        message: 'File not found',
        error: 'FILE_NOT_FOUND'
      });
    }
  
    // Validation errors
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: err.message,
        error: 'VALIDATION_ERROR'
      });
    }
  
    // Default error
    res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? err.stack : 'INTERNAL_ERROR'
    });
  };
  
  module.exports = errorHandler;