require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

async function check() {
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI not set in .env');
    process.exit(1);
  }
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  const count = await Product.countDocuments();
  console.log('Product count:', count);
  const one = await Product.findOne();
  console.log('One product:', one ? one.toObject() : null);
  process.exit(0);
}

check().catch(err => { console.error(err); process.exit(1); });
