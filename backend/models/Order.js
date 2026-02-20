const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  productTitle: String,
  variantName: String,
  tenureMonths: Number,
  monthlyAmount: Number,
  interestRate: Number,
  cashback: String
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
