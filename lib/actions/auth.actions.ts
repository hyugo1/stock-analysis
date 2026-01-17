'use server';

import {auth} from "@/lib/better-auth/auth";
import {inngest} from "@/lib/inngest/client";
import {headers} from "next/headers";
import { updateProfileImage as updateProfileImageDB, deleteAccount as deleteAccountDB } from "./user.actions";

export const signUpWithEmail = async ({ email, password, fullName, country, investmentGoals, riskTolerance, preferredIndustry }: SignUpFormData) => {
    try {
        const response = await auth.api.signUpEmail({ body: { email, password, name: fullName } })

        if(response) {
            try {
                await inngest.send({
                    name: 'app/user.created',
                    data: { email, name: fullName, country, investmentGoals, riskTolerance, preferredIndustry }
                })
            } catch (emailError) {
                console.log('Failed to queue welcome email', emailError)
            }
        }

        return { success: true, data: response }
    } catch (e) {
        console.log('Sign up failed', e)
        return { success: false, error: 'Sign up failed' }
    }
}

export type SignInErrorType = 
    | 'invalid_credentials' 
    | 'user_not_found' 
    | 'invalid_password' 
    | 'account_locked' 
    | 'email_not_verified' 
    | 'network_error'
    | 'unknown_error';

export interface SignInResult {
    success: boolean;
    data?: any;
    error?: string;
    errorCode?: SignInErrorType;
    suggestedAction?: string;
}

export const signInWithEmail = async ({ email, password }: SignInFormData): Promise<SignInResult> => {
    try {
        const response = await auth.api.signInEmail({ body: { email, password } })

        return { success: true, data: response }
    } catch (e: any) {
        const errorMessage = e?.message || String(e);
        const errorCode = e?.code || e?.error?.code || 'unknown_error';
        
        console.log('Sign in failed', e);

        if (errorMessage.includes('invalid') || errorMessage.includes('credentials') || 
            errorCode === 'INVALID_CREDENTIALS' || errorCode === 'invalid_credentials') {
            return {
                success: false,
                error: 'Invalid email or password combination',
                errorCode: 'invalid_credentials',
                suggestedAction: 'Check your credentials and try again'
            };
        }

        if (errorMessage.includes('not found') || errorMessage.includes('not exist') ||
            errorCode === 'USER_NOT_FOUND' || errorCode === 'user_not_found') {
            return {
                success: false,
                error: 'No account found with this email',
                errorCode: 'user_not_found',
                suggestedAction: 'Create a new account or check your email address'
            };
        }

        if (errorMessage.includes('password') || errorMessage.includes('wrong password') ||
            errorCode === 'INVALID_PASSWORD' || errorCode === 'invalid_password') {
            return {
                success: false,
                error: 'Incorrect password',
                errorCode: 'invalid_password',
                suggestedAction: 'Try resetting your password'
            };
        }

        if (errorMessage.includes('locked') || errorMessage.includes('suspended') ||
            errorCode === 'ACCOUNT_LOCKED' || errorCode === 'account_locked') {
            return {
                success: false,
                error: 'Account is temporarily locked',
                errorCode: 'account_locked',
                suggestedAction: 'Wait a few minutes and try again or contact support'
            };
        }

        if (errorMessage.includes('verify') || errorMessage.includes('verification') ||
            errorCode === 'EMAIL_NOT_VERIFIED' || errorCode === 'email_not_verified') {
            return {
                success: false,
                error: 'Please verify your email address',
                errorCode: 'email_not_verified',
                suggestedAction: 'Check your inbox for a verification email'
            };
        }

        if (errorMessage.includes('network') || errorMessage.includes('fetch') ||
            errorMessage.includes('ECONNREFUSED') || errorCode === 'network_error') {
            return {
                success: false,
                error: 'Unable to connect to server',
                errorCode: 'network_error',
                suggestedAction: 'Check your internet connection and try again'
            };
        }

        return {
            success: false,
            error: 'Sign in failed. Please try again.',
            errorCode: 'unknown_error',
            suggestedAction: 'If the problem persists, contact support'
        };
    }
}

export const signOut = async () => {
    try {
        await auth.api.signOut({ headers: await headers() });
    } catch (e) {
        console.log('Sign out failed', e);
        return { success: false, error: 'Sign out failed' }
    }
}

export async function getCurrentUserEmail(): Promise<string | null> {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        return session?.user?.email || null;
    } catch (e) {
        console.error('Error getting current user email:', e);
        return null;
    }
}

export const updateProfileImage = async (imageUrl: string): Promise<boolean> => {
    // Validate URL is well-formed http or https URL
    if (imageUrl) {
        try {
            const url = new URL(imageUrl);
            if (url.protocol !== 'http:' && url.protocol !== 'https:') {
                console.error('Invalid URL protocol:', url.protocol);
                return false;
            }
            if (!url.hostname) {
                console.error('Missing hostname in URL:', imageUrl);
                return false;
            }
        } catch (e) {
            console.error('Invalid URL format:', imageUrl, e);
            return false;
        }
    }
    return updateProfileImageDB(imageUrl);
}

export const deleteAccount = async (): Promise<{ success: boolean; error?: string }> => {
    return deleteAccountDB();
}