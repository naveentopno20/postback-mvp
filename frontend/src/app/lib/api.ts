// Always call our Next.js proxy to avoid CORS issues
export const API_BASE = "/api/proxy";

const join = (base: string, p: string) =>
  `${base.replace(/\/+$/, "")}/${p.replace(/^\/+/, "")}`;

export async function apiGet<T = any>(path: string): Promise<T> {
  const url = join(API_BASE, path);
  try {
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body?.message || `Request failed with ${res.status}`);
    }

    return res.json();
  } catch (err: any) {
    console.error("❌ API Fetch Error:", err.message);
    throw new Error(err.message || "Network error");
  }
}
