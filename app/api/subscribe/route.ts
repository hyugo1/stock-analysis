import { NextRequest, NextResponse } from "next/server";
import { verifyUnsubscribeToken } from "@/lib/unsubscribe-token";
import { subscribeByEmail } from "@/lib/actions/user.actions";

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
        
        const success = await subscribeByEmail(email);
        
        if (success) {
            return NextResponse.json({ success: true, message: "Successfully resubscribed" });
        } else {
            return NextResponse.json({ error: "Failed to update subscription" }, { status: 500 });
        }
    } catch (error) {
        console.error("Subscribe error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}