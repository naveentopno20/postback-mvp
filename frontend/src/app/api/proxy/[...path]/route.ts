import { NextResponse } from "next/server";

const BACKEND =
  process.env.BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "https://affiliate-backend-a4s4.onrender.com";

// Build target URL with query params
function buildTargetUrl(pathSegments: string[], req: Request) {
  const qs = new URL(req.url).search; // query string
  const base = BACKEND.replace(/\/+$/, "");
  const path = pathSegments.join("/");
  return `${base}/${path}${qs}`;
}

export async function GET(req: Request, { params }: { params: { path: string[] } }) {
  const url = buildTargetUrl(params.path, req);
  const upstream = await fetch(url, { cache: "no-store" });

  const body = await upstream.text();
  return new NextResponse(body, {
    status: upstream.status,
    headers: {
      "content-type": upstream.headers.get("content-type") || "application/json",
    },
  });
}

export async function POST(req: Request, { params }: { params: { path: string[] } }) {
  const url = buildTargetUrl(params.path, req);
  const upstream = await fetch(url, {
    method: "POST",
    headers: { "content-type": req.headers.get("content-type") || "application/json" },
    body: await req.text(),
  });

  const body = await upstream.text();
  return new NextResponse(body, {
    status: upstream.status,
    headers: {
      "content-type": upstream.headers.get("content-type") || "application/json",
    },
  });
}
