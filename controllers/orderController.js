// ─────────────────────────────────────────────────────────────
// controllers/orderController.js — Order creation & retrieval
// ─────────────────────────────────────────────────────────────

const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

/**
 * POST /api/orders
 * Create an order from the user's current cart.
 * Snapshots prices, decrements stock, and clears the cart.
 */
exports.createOrder = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('cart.product');

    if (!user.cart || user.cart.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    // Build order items with price snapshots
    const orderItems = [];
    let totalPrice = 0;

    for (const cartItem of user.cart) {
      const product = cartItem.product;

      // Verify stock
      if (product.stock < cartItem.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for "${product.name}" — only ${product.stock} left`,
        });
      }

      const itemTotal = product.price * cartItem.quantity;
      totalPrice += itemTotal;

      orderItems.push({
        product: product._id,
        quantity: cartItem.quantity,
        size: cartItem.size,
        price_at_purchase: product.price,
      });

      // Decrement stock
      await Product.findByIdAndUpdate(product._id, {
        $inc: { stock: -cartItem.quantity },
      });
    }

    // Create the order
    const order = await Order.create({
      user_id: req.user._id,
      products: orderItems,
      total_price: totalPrice,
      shipping_address: req.body.shipping_address || '',
    });

    // Clear the user's cart
    user.cart = [];
    await user.save();

    // Return the populated order
    const populatedOrder = await Order.findById(order._id).populate(
      'products.product',
      'name images craft_type'
    );

    res.status(201).json({ success: true, data: populatedOrder });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/orders/:userId
 * Get all orders for a user, newest first.
 */
exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user_id: req.params.userId })
      .populate('products.product', 'name images price craft_type')
      .sort('-created_at');

    res.json({ success: true, count: orders.length, data: orders });
  } catch (error) {
    next(error);
  }
};
