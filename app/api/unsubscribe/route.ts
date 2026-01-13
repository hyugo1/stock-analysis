import { NextRequest, NextResponse } from "next/server";
import { verifyUnsubscribeToken, unsubscribeByEmail } from "@/lib/actions/user.actions";

export async function GET(request: NextRequest) {
    const token = request.nextUrl.searchParams.get("token");
    
    if (!token) {
        return NextResponse.redirect(new URL("/unsubscribe?error=missing_token", request.url));
    }
    
    const { email, valid } = verifyUnsubscribeToken(token);
    
    if (!valid || !email) {
        return NextResponse.redirect(new URL("/unsubscribe?error=invalid_token", request.url));
    }
    
    const success = await unsubscribeByEmail(email);
    
    if (success) {
        return NextResponse.redirect(new URL("/unsubscribe?success=true", request.url));
    } else {
        return NextResponse.redirect(new URL("/unsubscribe?error=update_failed", request.url));
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { token } = body;
        
        if (!token) {
            return NextResponse.json({ error: "Token is required" }, { status: 400 });
        }
        
        const { email, valid } = verifyUnsubscribeToken(token);
        
        if (!valid || !email) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }
        
        const success = await unsubscribeByEmail(email);
        
        if (success) {
            return NextResponse.json({ success: true, message: "Successfully unsubscribed" });
        } else {
            return NextResponse.json({ error: "Failed to update subscription" }, { status: 500 });
        }
    } catch (error) {
        console.error("Unsubscribe error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}