const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products - list all products with essential fields
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({}, 'title slug variants.images variants.price variants.mrp');
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err.message);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/products/:slug - get product details
router.get('/:slug', async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('Error fetching product:', err.message);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

module.exports = router;
