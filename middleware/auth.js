// ─────────────────────────────────────────────────────────────
// middleware/auth.js — JWT authentication guard
// ─────────────────────────────────────────────────────────────

const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Protects routes by verifying the Bearer token in the
 * Authorization header. On success, attaches `req.user`.
 */
const protect = async (req, res, next) => {
  try {
    // 1. Extract token from "Bearer <token>"
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res
        .status(401)
        .json({ success: false, message: 'Not authorised — no token provided' });
    }

    const token = authHeader.split(' ')[1];

    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Find user & attach to request
    const user = await User.findById(decoded.id);
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: 'User belonging to this token no longer exists' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: 'Not authorised — invalid token' });
  }
};

module.exports = protect;
