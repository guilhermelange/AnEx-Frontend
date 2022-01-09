import type { NextFetchEvent, NextRequest } from 'next/server'
import { NextResponse } from "next/server"

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    const publicRoutes = [
        '/signin',
        '/signup'
    ]

    if (!publicRoutes.includes(req.nextUrl.pathname)) {
        const token = req.cookies['nextauth.token'];
        if (!token) {
            return NextResponse.redirect("/signin")
        }
    }
}