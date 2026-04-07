// ─────────────────────────────────────────────────────────────
// server.js — Application entry point
// ─────────────────────────────────────────────────────────────

require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const productRoutes = require('./routes/productRoutes');
const artisanRoutes = require('./routes/artisanRoutes');
const authRoutes = require('./routes/authRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

// ── Initialise Express ──────────────────────────────────────
const app = express();

// ── Global Middleware ────────────────────────────────────────
app.use(cors()); // Enable CORS for Stitch frontend
app.use(express.json()); // Parse JSON request bodies

// ── Health-check ─────────────────────────────────────────────
app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Parchhai API is running ✨',
    version: '1.0.0',
  });
});

// ── Mount Routes ─────────────────────────────────────────────
app.use('/api/products', productRoutes);
app.use('/api/artisans', artisanRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// ── 404 Catch-all ────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ── Centralised Error Handler ────────────────────────────────
app.use(errorHandler);

// ── Start Server ─────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🪔  Parchhai server listening on port ${PORT}`);
  });
});
