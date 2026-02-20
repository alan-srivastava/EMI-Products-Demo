const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// POST /api/checkout - create an order
router.post('/', async (req, res) => {
  try {
    const { product, variant, tenureMonths, monthlyAmount, interestRate, cashback } = req.body;

    // Validate required fields
    if (!product || !variant || !tenureMonths || !monthlyAmount) {
      return res.status(400).json({ error: 'Missing required fields: product, variant, tenureMonths, monthlyAmount' });
    }

    // Create and save order
    const order = new Order({
      productTitle: product,
      variantName: variant,
      tenureMonths,
      monthlyAmount,
      interestRate,
      cashback
    });

    await order.save();
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (err) {
    console.error('Checkout error:', err.message);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

module.exports = router;
