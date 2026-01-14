import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/api/inngest') ||
        request.nextUrl.pathname.startsWith('/api/unsubscribe') ||
        request.nextUrl.pathname.startsWith('/api/subscribe')) {
        return NextResponse.next();
    }

    const sessionCookie = getSessionCookie(request);

    if (!sessionCookie) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sign-in|sign-up|assets).*)',
    ],
};