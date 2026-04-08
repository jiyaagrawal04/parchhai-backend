// ─────────────────────────────────────────────────────────────
// routes/authRoutes.js
// ─────────────────────────────────────────────────────────────

const router = require('express').Router();
const { signup, login } = require('../controllers/authController');

router.post('/signup', signup);
router.post('/register', signup); // alias — frontend calls /register
router.post('/login', login);

module.exports = router;
