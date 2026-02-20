// Format number with commas
export function fmt(v) {
  return v?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') || ''
}

// Safely get CSS variable with fallback
export function varSafe(name, fallback) {
  try {
    const val = getComputedStyle(document.documentElement).getPropertyValue(name)
    return val ? val.trim() : fallback
  } catch (e) {
    return fallback
  }
}

// Resolve image URL to absolute if needed
export function resolveImg(src) {
  if (!src) return src
  if (src.startsWith('http://') || src.startsWith('https://')) return src
  if (src.startsWith('/')) return window.location.origin + src
  return src
}
