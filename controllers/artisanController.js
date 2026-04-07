// ─────────────────────────────────────────────────────────────
// controllers/artisanController.js — Artisan read operations
// ─────────────────────────────────────────────────────────────

const Artisan = require('../models/Artisan');

/**
 * GET /api/artisans
 * List all artisans, optionally filtered by craft or region.
 *   ?craft_speciality=Ajrakh
 *   ?region=Kutch
 */
exports.getArtisans = async (req, res, next) => {
  try {
    const { craft_speciality, region } = req.query;

    const filter = {};
    if (craft_speciality) filter.craft_speciality = new RegExp(craft_speciality, 'i');
    if (region) filter.region = new RegExp(region, 'i');

    const artisans = await Artisan.find(filter).populate('products', 'name price images craft_type');

    res.json({ success: true, count: artisans.length, data: artisans });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/artisans/:id
 * Single artisan with their full product catalogue.
 */
exports.getArtisan = async (req, res, next) => {
  try {
    const artisan = await Artisan.findById(req.params.id).populate('products');

    if (!artisan) {
      return res.status(404).json({ success: false, message: 'Artisan not found' });
    }

    res.json({ success: true, data: artisan });
  } catch (error) {
    next(error);
  }
};
