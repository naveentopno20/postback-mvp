export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ??
  (process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000'
    : '');

export async function apiGet<T = any>(path: string): Promise<T> {
  const url = `${API_BASE}${path}`
  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      throw new Error(body?.message || `Request failed with ${res.status}`)
    }
    return res.json()
  } catch (err: any) {
    throw new Error(err.message || 'Network error')
  }
}
