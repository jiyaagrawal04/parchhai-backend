// ─────────────────────────────────────────────────────────────
// models/Product.js — Product schema
// ─────────────────────────────────────────────────────────────

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    images: {
      type: [String], // Array of image URLs
      default: [],
    },
    sizes: {
      type: [String],
      enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size'],
      default: ['S', 'M', 'L'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    craft_type: {
      type: String,
      required: [true, 'Craft type is required'],
      trim: true,
      // Examples: "Ajrakh", "Block Print", "Handloom", "Bandhani", "Chikankari"
    },
    artisan_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artisan',
      required: [true, 'Artisan reference is required'],
    },
    story: {
      type: String,
      default: '',
      // The narrative behind the product/craft — central to the Parchhai brand
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Stock cannot be negative'],
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

// ── Indexes for common queries ───────────────────────────────
productSchema.index({ craft_type: 1 });
productSchema.index({ artisan_id: 1 });
productSchema.index({ price: 1 });

module.exports = mongoose.model('Product', productSchema);
