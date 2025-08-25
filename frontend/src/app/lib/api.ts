export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : "https://affiliate-backend-a4s4.onrender.com"); // fallback for production

const join = (base: string, p: string) =>
  `${base.replace(/\/+$/, "")}/${p.replace(/^\/+/, "")}`;

export async function apiGet<T = any>(path: string): Promise<T> {
  if (!API_BASE) {
    throw new Error("API_BASE is not set. Did you configure NEXT_PUBLIC_API_URL?");
  }

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
