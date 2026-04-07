// ─────────────────────────────────────────────────────────────
// controllers/cartController.js — Cart management
// ─────────────────────────────────────────────────────────────

const User = require('../models/User');
const Product = require('../models/Product');

/**
 * GET /api/cart
 * Return the authenticated user's cart with product details populated.
 */
exports.getCart = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate(
      'cart.product',
      'name price images sizes stock craft_type'
    );

    res.json({ success: true, data: user.cart });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/cart/add
 * Add a product to the cart (or increase quantity if it already exists).
 * Body: { productId, quantity?, size? }
 */
exports.addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1, size = 'M' } = req.body;

    // Validate product exists and has stock
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    if (product.stock < quantity) {
      return res
        .status(400)
        .json({ success: false, message: `Only ${product.stock} items in stock` });
    }

    const user = await User.findById(req.user._id);

    // Check if product+size combo already exists in cart
    const existingIndex = user.cart.findIndex(
      (item) => item.product.toString() === productId && item.size === size
    );

    if (existingIndex > -1) {
      // Increase quantity
      user.cart[existingIndex].quantity += Number(quantity);
    } else {
      // Add new item
      user.cart.push({ product: productId, quantity: Number(quantity), size });
    }

    await user.save();

    // Return populated cart
    const updated = await User.findById(req.user._id).populate(
      'cart.product',
      'name price images sizes stock craft_type'
    );

    res.json({ success: true, data: updated.cart });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/cart/remove
 * Remove a product from the cart.
 * Body: { productId, size? }
 */
exports.removeFromCart = async (req, res, next) => {
  try {
    const { productId, size } = req.body;

    const user = await User.findById(req.user._id);

    user.cart = user.cart.filter((item) => {
      const productMatch = item.product.toString() === productId;
      const sizeMatch = size ? item.size === size : true;
      return !(productMatch && sizeMatch);
    });

    await user.save();

    const updated = await User.findById(req.user._id).populate(
      'cart.product',
      'name price images sizes stock craft_type'
    );

    res.json({ success: true, data: updated.cart });
  } catch (error) {
    next(error);
  }
};
