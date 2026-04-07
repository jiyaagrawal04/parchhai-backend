// ─────────────────────────────────────────────────────────────
// routes/artisanRoutes.js
// ─────────────────────────────────────────────────────────────

const router = require('express').Router();
const { getArtisans, getArtisan } = require('../controllers/artisanController');

router.get('/', getArtisans);
router.get('/:id', getArtisan);

module.exports = router;
