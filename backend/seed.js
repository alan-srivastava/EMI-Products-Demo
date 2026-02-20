require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const PRODUCT_DATA = [
  {
    title: 'Apple iPhone 17 Pro',
    description: 'Apple flagship smartphone',
    slug: 'iphone-17-pro',
    specs: [
      'Storage: 256 GB',
      'Color: Silver',
      'Front Camera: 18MP',
      'Rear Camera: 48MP + 48MP + 48MP',
      'Screen Size: 6.3 inch',
      'Screen Resolution: 2622 x 1206 Pixels'
    ],
    variants: [
      { name: '256GB - Silver', mrp: 149999, price: 129999, images: ['/images/iPhone/First.jpg', '/images/iPhone/open-uri20251021-2855301-15vrhwi.jpg', '/images/iPhone/open-uri20251021-2855301-1w6zv.jpg'] },
      { name: '512GB - Silver', mrp: 169999, price: 149999, images: ['/images/iPhone/First.jpg', '/images/iPhone/open-uri20251021-2855301-4vhtc4.jpg', '/images/iPhone/open-uri20251021-2855301-dn3u82.jpg'] }
    ],
    emiPlans: [
      { name: '3 months', tenureMonths: 3, interestRate: 0, monthlyAmount: 43333, cashback: '₹1000 via fund' },
      { name: '12 months', tenureMonths: 12, interestRate: 10.5, monthlyAmount: 11800, cashback: '' }
    ]
  },
  {
    title: 'Samsung S24 Ultra',
    description: 'Samsung flagship',
    slug: 'samsung-s24-ultra',
    specs: [
      'Storage: 256 GB',
      'Color: Black',
      'Front Camera: 40MP',
      'Rear Camera: 200MP + 12MP + 10MP',
      'Screen Size: 6.8 inch',
      'Screen Resolution: 3088 x 1440 Pixels'
    ],
    variants: [
      { name: '256GB - Black', mrp: 129999, price: 114999, images: ['/images/samsung/First.jpg', '/images/samsung/open-uri20260113-673681-14tcrwy.jpg', '/images/samsung/open-uri20260113-673681-1im1v9k.jpg'] },
      { name: '512GB - White', mrp: 144999, price: 129999, images: ['/images/samsung/First.jpg', '/images/samsung/open-uri20260113-673681-1wp04sc.jpg', '/images/samsung/open-uri20260113-673681-7z64ng.jpg'] }
    ],
    emiPlans: [
      { name: '6 months', tenureMonths: 6, interestRate: 5.5, monthlyAmount: 19166, cashback: '2% via fund' },
      { name: '12 months', tenureMonths: 12, interestRate: 10.5, monthlyAmount: 10800, cashback: '' }
    ]
  },
  {
    title: 'Moto G17',
    description: 'Premium performance phone',
    slug: 'moto-g17',
    specs: [
      'Storage: 128 GB',
      'Color: Red',
      'Front Camera: 16MP',
      'Rear Camera: 50MP + 8MP',
      'Screen Size: 6.7 inch',
      'Screen Resolution: 2712 x 1220 Pixels'
    ],
    variants: [
      { name: '128GB - Red', mrp: 56999, price: 49999, images: ['/images/motorola/First.jpg', '/images/motorola/open-uri20251125-3270970-1h8cyfm.jpg'] },
      { name: '256GB - Blue', mrp: 62999, price: 55999, images: ['/images/motorola/First.jpg', '/images/motorola/open-uri20251125-3270970-ms4ptn.jpg'] }
    ],
    emiPlans: [
      { name: '3 months', tenureMonths: 3, interestRate: 0, monthlyAmount: 16666, cashback: '' },
      { name: '9 months', tenureMonths: 9, interestRate: 8.5, monthlyAmount: 5999, cashback: '₹500 via fund' }
    ]
  }
];

async function connectDB() {
  if (!process.env.MONGO_URI) {
    console.error('Error: Set MONGO_URI in .env');
    process.exit(1);
  }
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
}

async function seed() {
  try {
    await Product.deleteMany({});
    await Product.insertMany(PRODUCT_DATA);
    console.log(`Seeded ${PRODUCT_DATA.length} products successfully`);
  } catch (err) {
    console.error('Seed error:', err.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

connectDB().then(() => seed());
