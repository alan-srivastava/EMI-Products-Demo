// Use Vite proxy in development by default; set VITE_API_URL to override in production
const API_BASE = import.meta.env.VITE_API_URL || '/api'

export async function apiGet(path) {
  const res = await fetch(API_BASE + path)
  if (!res.ok) throw new Error('API error')
  return res.json()
}

export async function apiPost(path, data) {
  const res = await fetch(API_BASE + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  if (!res.ok) throw new Error('API error')
  return res.json()
}

export default { apiGet, apiPost }
