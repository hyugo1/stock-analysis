// lib/better-auth/auth.ts

import { betterAuth } from "better-auth";
import { mongodbAdapter} from "better-auth/adapters/mongodb";
import { connectToDatabase} from "@/database/mongoose";
import { nextCookies} from "better-auth/next-js";
import { sendPasswordResetEmail } from "@/lib/nodemailer";

let authInstance: ReturnType<typeof betterAuth> | null = null;

export const getAuth = async () => {
    if(authInstance) return authInstance;

    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;

    if(!db) throw new Error('MongoDB connection not found');

    authInstance = betterAuth({
        database: mongodbAdapter(db as any),
        secret: process.env.BETTER_AUTH_SECRET,
        baseURL: process.env.BETTER_AUTH_URL,
        emailAndPassword: {
            enabled: true,
            disableSignUp: false,
            requireEmailVerification: false,
            minPasswordLength: 8,
            maxPasswordLength: 128,
            autoSignIn: true,
            sendResetPassword: async ({ user, url }: { user: { email: string }; url: string }) => {
                console.log(`[DEBUG] Original reset URL from better-auth: ${url}`);
                
                // Extract the token from the better-auth URL format
                // extract <token> and create: http://localhost:3000/reset-password?token=<token>
                const tokenMatch = url.match(/\/api\/auth\/reset-password\/([^?]+)/);
                const token = tokenMatch ? tokenMatch[1] : null;
                
                // Get the base URL from the original URL or use NEXT_PUBLIC_APP_URL
                const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://marketpulse-taupe.vercel.app";
                
                // Create the proper frontend URL with token as query param
                const frontendResetUrl = token 
                    ? `${baseUrl}/reset-password?token=${token}`
                    : url; // Fallback to original URL if token extraction fails
                
                console.log(`[DEBUG] Extracted token: ${token}`);
                console.log(`[DEBUG] Frontend reset URL: ${frontendResetUrl}`);
                
                try {
                    await sendPasswordResetEmail({ email: user.email, resetLink: frontendResetUrl });
                    console.log(`[DEBUG] Password reset email sent successfully to: ${user.email}`);
                } catch (error) {
                    console.error(`[DEBUG] Failed to send password reset email to ${user.email}:`, error);
                    throw error;
                }
            },
        },
        plugins: [nextCookies()],
    });

    return authInstance;
}

export const auth = await getAuth();