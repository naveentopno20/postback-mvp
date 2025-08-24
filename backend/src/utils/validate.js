export function requireQueryParams(req, keys) {
  const missing = keys.filter(k => (req.query[k] ?? '') === '')
  if (missing.length) {
    const err = new Error(`Missing query parameter(s): ${missing.join(', ')}`)
    err.status = 400
    throw err
  }
}

export function parseIntStrict(value, name) {
  const n = Number(value)
  if (!Number.isInteger(n)) {
    const err = new Error(`${name} must be an integer`)
    err.status = 400
    throw err
  }
  return n
}

export function parseAmount(value) {
  const num = Number(value)
  if (!Number.isFinite(num) || num < 0) {
    const err = new Error(`amount must be a non-negative number`)
    err.status = 400
    throw err
  }
  // round to 2 decimals
  return Math.round(num * 100) / 100
}

export function parseCurrency(value) {
  const v = String(value || '').trim().toUpperCase()
  if (!/^[A-Z]{3}$/.test(v)) {
    const err = new Error(`currency must be a 3-letter code (e.g. USD, INR)`)
    err.status = 400
    throw err
  }
  return v
}
