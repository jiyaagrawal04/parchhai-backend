// ─────────────────────────────────────────────────────────────
// controllers/productController.js — Product CRUD
// ─────────────────────────────────────────────────────────────

const Product = require('../models/Product');

/**
 * GET /api/products
 * List all products. Supports query-string filters:
 *   ?craft_type=Ajrakh
 *   ?min_price=500&max_price=2000
 *   ?sort=price        (ascending)
 *   ?sort=-price       (descending)
 *   ?page=1&limit=12
 */
exports.getProducts = async (req, res, next) => {
  try {
    const { craft_type, min_price, max_price, sort, page = 1, limit = 12 } = req.query;

    // Build dynamic filter
    const filter = {};
    if (craft_type) filter.craft_type = new RegExp(craft_type, 'i');
    if (min_price || max_price) {
      filter.price = {};
      if (min_price) filter.price.$gte = Number(min_price);
      if (max_price) filter.price.$lte = Number(max_price);
    }

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);

    const [products, total] = await Promise.all([
      Product.find(filter)
        .populate('artisan_id', 'name region craft_speciality')
        .sort(sort || '-created_at')
        .skip(skip)
        .limit(Number(limit)),
      Product.countDocuments(filter),
    ]);

    res.json({
      success: true,
      count: products.length,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/products/:id
 * Single product with artisan details populated.
 */
exports.getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('artisan_id');

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/products
 * Create a new product.
 */
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

/**
 * PUT /api/products/:id
 * Update an existing product.
 */
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/products/:id
 * Remove a product.
 */
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, message: 'Product removed' });
  } catch (error) {
    next(error);
  }
};
