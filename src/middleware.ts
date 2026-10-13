import { NextResponse, type NextRequest } from "next/server";

/** Phones (not tablets) get the mobile layout at any width. iPad / Android tablets count as desktop. */
const MOBILE_UA = /iPhone|iPod|Android.*Mobile|Windows Phone|Mobile Safari|Opera Mini|IEMobile|BlackBerry|webOS/i;

export function middleware(req: NextRequest) {
  const ua = req.headers.get("user-agent") ?? "";
  // iPadOS Safari also sends "Mobile/…" + "Safari", but never "Mobile Safari"; keep iPad as desktop explicitly.
  const device = MOBILE_UA.test(ua) && !/iPad|Tablet/i.test(ua) ? "mobile" : "desktop";
  const headers = new Headers(req.headers);
  headers.set("x-device", device);
  const res = NextResponse.next({ request: { headers } });
  res.headers.set("Vary", "User-Agent");
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon|icon.svg|img/|icons/|manifest.webmanifest|robots.txt|sitemap.xml|api/).*)"],
};
