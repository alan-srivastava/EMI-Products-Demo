import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiGet } from '../api'
import { resolveImg, varSafe } from '../utils'

export default function Home() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    apiGet('/products')
      .then(res => {
        if (mounted) setProducts(res)
      })
      .catch(err => {
        console.error('Failed to load products', err)
        if (mounted) setError('Could not load products — is the backend running?')
      })
      .finally(() => {
        if (mounted) setLoading(false)
      })
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div>
      <h1>Products</h1>
      {error && <div style={{ color: 'crimson', marginBottom: 12 }}>{error}</div>}
      {loading ? (
        <div>Loading products...</div>
      ) : products.length === 0 ? (
        <div style={{ color: varSafe('--muted', '#666') }}>
          No products found. Please confirm the backend has products seeded and is running on port 5000.
        </div>
      ) : (
        <div className="grid">
          {products.map(p => (
            <div key={p._id} className="card">
              <img
                src={resolveImg(p.variants?.[0]?.images?.[0] || '/placeholder.png')}
                alt={p.title}
              />
              <div className="card-body">
                <h3>{p.title}</h3>
                <p>Starting ₹{p.variants?.[0]?.price}</p>
                <Link to={`/products/${p.slug}`} className="btn">
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
