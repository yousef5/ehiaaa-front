import { NextResponse } from "next/server";

// TEMPORARY BYPASS: Authentication checks are disabled
export function middleware() {
  // TEMPORARY: Allow all routes without authentication check for debugging
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
