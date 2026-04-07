// ─────────────────────────────────────────────────────────────
// routes/cartRoutes.js — Protected cart routes
// ─────────────────────────────────────────────────────────────

const router = require('express').Router();
const protect = require('../middleware/auth');
const { getCart, addToCart, removeFromCart } = require('../controllers/cartController');

// All cart routes require authentication
router.use(protect);

router.get('/', getCart);
router.post('/add', addToCart);
router.post('/remove', removeFromCart);

module.exports = router;
