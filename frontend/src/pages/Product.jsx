import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGet, apiPost } from '../api'
import { fmt, varSafe, resolveImg } from '../utils'

export default function Product() {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [selectedVariant, setSelectedVariant] = useState(0)
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [activeImage, setActiveImage] = useState(null)
  const [showAll, setShowAll] = useState(false)
  const [ordering, setOrdering] = useState(false)

  useEffect(() => {
    apiGet(`/products/${slug}`).then(p => {
      setProduct(p)
      setActiveImage(p?.variants?.[0]?.images?.[0] || null)
    }).catch(err => {
      console.error('Failed to load product', err)
    })
  }, [slug])

  useEffect(() => {
    if (!product) return
    const imgs = product.variants[selectedVariant]?.images || []
    setActiveImage(imgs[0] || null)
  }, [selectedVariant, product])

  if (!product) return <div>Loading...</div>

  const variant = product.variants[selectedVariant]

  const handleCheckout = async () => {
    if (selectedPlan === null) return
    setOrdering(true)
    try {
      const plan = product.emiPlans[selectedPlan]
      const payload = {
        product: product.title,
        variant: variant.name,
        tenureMonths: plan.tenureMonths,
        monthlyAmount: plan.monthlyAmount,
        interestRate: plan.interestRate,
        cashback: plan.cashback
      }
      const data = await apiPost('/checkout', payload)
      alert('Order placed — id: ' + data.order._id)
    } catch (err) {
      console.error(err)
      alert('Failed to place order')
    } finally {
      setOrdering(false)
    }
  }

  return (
    <div className="product-layout">
      <aside className="thumbs">
        {variant.images.map((img, i) => (
          <button
            key={i}
            className={activeImage === img ? 'thumb active' : 'thumb'}
            onClick={() => setActiveImage(img)}
          >
            <img src={resolveImg(img)} alt={`${product.title}-${i}`} />
          </button>
        ))}
      </aside>

      <section className="main-image">
        <img src={resolveImg(activeImage || variant.images[0])} alt={product.title} />
        <div className="selectors">
          <div className="select">
            <label>Color</label>
            <select>
              <option>{variant.name.split('-').slice(1).join('-').trim() || 'Default'}</option>
            </select>
          </div>
          <div className="select">
            <label>Variant</label>
            <select onChange={e => setSelectedVariant(parseInt(e.target.value))} value={selectedVariant}>
              {product.variants.map((v, idx) => (
                <option key={idx} value={idx}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <aside className="details-panel">
        <div className="details-card">
          <h2>
            {product.title} <span className="muted">({variant.name})</span>
          </h2>
          <p className="muted">{product.description}</p>

          <div className="price-block">
            <div className="mrp">₹{fmt(variant.mrp)}</div>
            <div className="sale">₹{fmt(variant.price)}</div>
          </div>

          <div className="emi-widget">
            <div className="pay-now">
              Pay Now : <strong>₹19</strong> Downpayment
            </div>
            <h4>Choose EMI Tenure</h4>
            <div className="emi-options">
              {product.emiPlans.map((plan, idx) => (
                <label key={idx} className={selectedPlan === idx ? 'emi-option selected' : 'emi-option'}>
                  <input
                    type="radio"
                    name="emi"
                    onChange={() => setSelectedPlan(idx)}
                    checked={selectedPlan === idx}
                  />
                  <div className="emi-desc">
                    <div className="emi-left">
                      <div className="emi-amount">₹{fmt(plan.monthlyAmount)}</div>
                      <div className="emi-tenure muted">x {plan.tenureMonths} months</div>
                    </div>
                    <div className="emi-right">
                      <div className="badge">{plan.interestRate === 0 ? '0% EMI' : `${plan.interestRate}%`}</div>
                    </div>
                  </div>
                  {plan.cashback && (
                    <div className="emi-cashback">
                      Additional cashback of {plan.cashback.replace(/[^\d\u20B9\w\s%]/g, '')}
                    </div>
                  )}
                </label>
              ))}
            </div>

            <div className="emi-note">EMIs starting 3rd Mar</div>
            <button className="buy-btn" disabled={selectedPlan === null || ordering} onClick={handleCheckout}>
              {ordering ? 'Processing...' : `Buy on ${selectedPlan !== null ? product.emiPlans[selectedPlan].tenureMonths + ' months EMI' : 'EMI'}`}
            </button>
          </div>

          <div className="shipping">
            <h4>Shipping Details</h4>
            <div className="shipping-row">
              <strong>Free Shipping</strong>
              <div className="muted">
                Dispatch in less than 48 hours and delivery in 3-7 working days after dispatch
              </div>
            </div>
            <div style={{ marginTop: 12 }}>
              <strong>Sold by :</strong> <span style={{ color: varSafe('--accent', '#0ea5a4'), fontWeight: 700 }}>Balaji Infocom</span>
            </div>
          </div>

          <div className="product-details">
            <h4>Product Details</h4>
            <ul>
              {product.specs && product.specs.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
            <button className="view-all" onClick={() => setShowAll(s => !s)}>
              {showAll ? 'Hide details' : 'View all'}
            </button>
            {showAll && (
              <div className="expanded-specs" style={{ marginTop: 12 }}>
                <ul>
                  <li>
                    <strong>Storage:</strong> 256 GB
                  </li>
                  <li>
                    <strong>Color:</strong> Silver
                  </li>
                  <li>
                    <strong>Front Camera:</strong> 18MP
                  </li>
                  <li>
                    <strong>Front Camera Features:</strong> 18MP front cam with autofocus, Center Stage, Night mode, HDR 5, portraits, Animoji, 4K stabilized video,
                    spatial audio, and dual capture features.
                  </li>
                  <li>
                    <strong>Rear Camera:</strong> 48MP + 48MP + 48MP
                  </li>
                  <li>
                    <strong>Rear Camera Features:</strong> 48MP Fusion system with 4 lenses, 8x zoom, up to 40x digital, ProRAW, Night mode, Smart HDR 5,
                    macro, spatial photos, and advanced stabilization.
                  </li>
                  <li>
                    <strong>Screen Size:</strong> 6.3 inch
                  </li>
                  <li>
                    <strong>Screen Resolution:</strong> 2622 x 1206 Pixels
                  </li>
                  <li>
                    <strong>Screen Type:</strong> Super Retina XDR Display
                  </li>
                  <li>
                    <strong>Processor:</strong> A19 Chip, 6 Core Processor
                  </li>
                  <li>
                    <strong>Core:</strong> Hexa Core
                  </li>
                  <li>
                    <strong>Operating System:</strong> iOS 26
                  </li>
                  <li>
                    <strong>SIM Type:</strong> Dual Sim
                  </li>
                  <li>
                    <strong>Package:</strong> Handset, USB C Charge Cable (1m), Documentation
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  )
}
