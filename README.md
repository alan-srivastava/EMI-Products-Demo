 # EMI Products Demo

 TECH STACK: node.js, express.js, mongodb, react
 
<img width="1918" height="958" alt="image" src="https://github.com/user-attachments/assets/e2c31fef-3eb4-42b1-a69b-3d46cf92f817" />
<img width="1918" height="963" alt="image" src="https://github.com/user-attachments/assets/f973b479-4892-4904-8034-5eae05a9c267" />


 Project structure

 - `backend/` - Express API, Mongoose models, seed script
 - `frontend/` - Vite + React SPA (public images served from `frontend/public/images`)

 Quick setup (local)

 1. Backend

 - Copy `.env.example` to `.env` and set `MONGO_URI` (or use the provided `.env` for local testing).
 - Install dependencies, seed the database and start the dev server:

```bash
cd backend
npm install
# seed will clear and insert sample products
npm run seed
# start server (nodemon)
npm run dev
```

The backend listens on port `5000` by default. API base: `http://localhost:5000/api`.

2. Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend Vite server default is `http://localhost:5173`.

API Endpoints

 - `GET /api/products` — list products (returns brief fields)
 - `GET /api/products/:slug` — product details with `variants` and `emiPlans`

# EMI Products Demo

This repo is a small demo showing a product catalog with EMI plans. It contains a Node/Express backend with MongoDB (Mongoose) and a React + Vite frontend.

**Tech stack:** Node.js, Express, MongoDB (Mongoose), React, Vite

Project layout

- `backend/` — Express API, Mongoose models, `seed.js` that populates sample products
- `frontend/` — Vite + React SPA (images in `frontend/public/images`)

Quick local setup

1) Backend

```bash
cd backend
npm install
# set MONGO_URI in .env (a working MongoDB Atlas or local MongoDB URI)
# seed will clear existing products and insert sample products
npm run seed
# start dev server (uses nodemon)
npm run dev
```

The backend listens on port `5000` by default (see `backend/.env`). API base: `http://localhost:5000/api`.

2) Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend dev server (Vite) runs on `http://localhost:5173` by default and proxies `/api` to `http://localhost:5000` during development.

API endpoints

- `GET /api/products` — list products (brief fields: `_id`, `title`, `slug`, `variants` with `images`, `price`, `mrp`)
- `GET /api/products/:slug` — full product details including `variants` and `emiPlans`
- `POST /api/checkout` — create an order (expects `product`, `variant`, `tenureMonths`, `monthlyAmount` — see `backend/routes/checkout.js`)

Example responses

GET /api/products

```json
[
	{
		"_id": "...",
		"title": "Apple iPhone 17 Pro",
		"slug": "iphone-17-pro",
		"variants": [ { "images": ["/images/iPhone/First.jpg"], "price": 129999, "mrp": 149999 } ]
	}
]
```

GET /api/products/iphone-17-pro

```json
{
	"_id": "...",
	"title": "Apple iPhone 17 Pro",
	"description": "Apple flagship smartphone",
	"slug": "iphone-17-pro",
	"variants": [
		{ "name": "256GB - Silver", "mrp": 149999, "price": 129999, "images": ["/images/iPhone/First.jpg"] }
	],
	"emiPlans": [ { "name": "3 months", "tenureMonths": 3, "interestRate": 0, "monthlyAmount": 43333, "cashback": "₹1000 via fund" } ]
}
```

Database schema (Mongoose)

- `Product` documents (see `backend/models/Product.js`):
	- `title` (String, required)
	- `description` (String)
	- `slug` (String, required, unique)
	- `specs` (Array of String)
	- `variants` (Array of `{ name: String, mrp: Number, price: Number, images: [String] }`)
	- `emiPlans` (Array of `{ name: String, tenureMonths: Number, interestRate: Number, monthlyAmount: Number, cashback: String }`)

Seed data

- `backend/seed.js` contains `PRODUCT_DATA` — three sample products:
	- `iphone-17-pro` (Apple iPhone 17 Pro)
	- `samsung-s24-ultra` (Samsung S24 Ultra)
	- `moto-g17` (Moto G17)

Each product includes two `variants` and multiple `emiPlans`. The image paths reference `frontend/public/images/*`.
