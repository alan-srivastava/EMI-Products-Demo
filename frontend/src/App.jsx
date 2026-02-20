import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Product from './pages/Product'

export default function App() {
  return (
    <div>
      <header className="nav">
        <Link to="/" className="brand">EMI Store</Link>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:slug" element={<Product />} />
        </Routes>
      </main>
    </div>
  )
}
