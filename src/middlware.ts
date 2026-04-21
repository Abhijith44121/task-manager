import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
    const isLoggedIn = request.cookies.get("isLoggedIn")

    const isAuthPage = request.nextUrl.pathname.startsWith("/login")

    // If not logged in → redirect to login
    if (!isLoggedIn && !isAuthPage) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    // If logged in → prevent going back to login
    if (isLoggedIn && isAuthPage) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/dashboard/:path*", "/login"],
}