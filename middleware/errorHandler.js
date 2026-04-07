// ─────────────────────────────────────────────────────────────
// middleware/errorHandler.js — Centralised error handler
// ─────────────────────────────────────────────────────────────

/**
 * Express error-handling middleware.
 * Catches any error thrown or passed via next(err) and returns
 * a consistent JSON response.
 */
const errorHandler = (err, _req, res, _next) => {
  console.error('💥  Error:', err.message);

  // Mongoose validation errors → 400
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ success: false, message: messages.join(', ') });
  }

  // Mongoose duplicate key → 409
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res
      .status(409)
      .json({ success: false, message: `Duplicate value for "${field}"` });
  }

  // Mongoose bad ObjectId → 400
  if (err.name === 'CastError') {
    return res
      .status(400)
      .json({ success: false, message: `Invalid ${err.path}: ${err.value}` });
  }

  // Default → 500
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal server error',
  });
};

module.exports = errorHandler;
