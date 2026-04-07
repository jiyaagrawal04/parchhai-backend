// ─────────────────────────────────────────────────────────────
// routes/orderRoutes.js
// ─────────────────────────────────────────────────────────────

const router = require('express').Router();
const protect = require('../middleware/auth');
const { createOrder, getOrders } = require('../controllers/orderController');

router.post('/', protect, createOrder);
router.get('/:userId', protect, getOrders);

module.exports = router;
