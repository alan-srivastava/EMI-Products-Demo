const mongoose = require('mongoose');

const EmiPlanSchema = new mongoose.Schema({
  name: String,
  tenureMonths: Number,
  interestRate: Number,
  monthlyAmount: Number,
  cashback: String
}, {_id: false});

const VariantSchema = new mongoose.Schema({
  name: String,
  mrp: Number,
  price: Number,
  images: [String]
}, {_id: false});

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  slug: { type: String, required: true, unique: true },
  specs: [String],
  variants: [VariantSchema],
  emiPlans: [EmiPlanSchema]
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);
