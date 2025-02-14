// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const { cookies, nextUrl } = req;
  const sessionCookie = cookies.get("connect.sid");

  const isAuthenticated = sessionCookie && sessionCookie.value;

  const protectedRoutes = ["/dashboard"];

  if (protectedRoutes.includes(nextUrl.pathname) && !isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const authRoutes = ["/", "/register"];
  if (authRoutes.includes(nextUrl.pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/", "/register"],
};
