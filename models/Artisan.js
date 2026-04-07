// ─────────────────────────────────────────────────────────────
// models/Artisan.js — Artisan schema
// ─────────────────────────────────────────────────────────────

const mongoose = require('mongoose');

const artisanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Artisan name is required'],
      trim: true,
    },
    region: {
      type: String,
      required: [true, 'Region is required'],
      trim: true,
    },
    craft_speciality: {
      type: String,
      required: [true, 'Craft speciality is required'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    // Virtual populate — lets us fetch an artisan's products without
    // storing a separate array, keeping the source of truth in Product.
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ── Virtual: products made by this artisan ───────────────────
artisanSchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'artisan_id',
});

module.exports = mongoose.model('Artisan', artisanSchema);
