export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ??
  (process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000'
    : '');
const join = (base: string, p: string) =>
  `${base.replace(/\/+$/, '')}/${p.replace(/^\/+/, '')}`;

export async function apiGet<T = any>(path: string): Promise<T> {
  const url = join(API_BASE, path);
  try {
    const res = await fetch(url, { cache: 'no-store', next: { revalidate: 0 } });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body?.message || `Request failed with ${res.status}`);
    }
    return res.json();
  } catch (err: any) {
    throw new Error(err.message || 'Network error');
  }
}
