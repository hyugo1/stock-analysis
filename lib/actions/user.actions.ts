'use server';

import {connectToDatabase} from "@/database/mongoose";
import { headers } from "next/headers";
import { auth } from "@/lib/better-auth/auth";
import { generateUnsubscribeToken, verifyUnsubscribeToken } from "@/lib/unsubscribe-token";

export { generateUnsubscribeToken, verifyUnsubscribeToken };

export const getUserByEmail = async (email: string) => {
    try {
        const mongoose = await connectToDatabase();
        const db = mongoose.connection.db;
        if (!db) throw new Error('Mongoose connection not connected');

        const user = await db.collection('user').findOne(
            { email: { $exists: true, $ne: null, $eq: email } }
        );
        
        return user;
    } catch (e) {
        console.error('Error fetching user by email:', e);
        return null;
    }
};

export const getCurrentUserSubscriptionStatus = async (): Promise<boolean | null> => {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session?.user?.email) return null;
        
        const user = await getUserByEmail(session.user.email);
        return user?.emailSubscribed ?? true; 
    } catch (e) {
        console.error('Error getting subscription status:', e);
        return null;
    }
};

export const toggleEmailSubscription = async (subscribed: boolean): Promise<boolean> => {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session?.user?.email) return false;
        
        const mongoose = await connectToDatabase();
        const db = mongoose.connection.db;
        if (!db) throw new Error('Mongoose connection not connected');
        
        await db.collection('user').updateOne(
            { email: session.user.email },
            { $set: { emailSubscribed: subscribed, updatedAt: new Date() } }
        );
        
        return true;
    } catch (e) {
        console.error('Error toggling subscription:', e);
        return false;
    }
};

export const unsubscribeByEmail = async (email: string): Promise<boolean> => {
    try {
        const mongoose = await connectToDatabase();
        const db = mongoose.connection.db;
        if (!db) throw new Error('Mongoose connection not connected');
        
        await db.collection('user').updateOne(
            { email: email },
            { $set: { emailSubscribed: false, updatedAt: new Date() } }
        );
        
        return true;
    } catch (e) {
        console.error('Error unsubscribing user:', e);
        return false;
    }
};

export const subscribeByEmail = async (email: string): Promise<boolean> => {
    try {
        const mongoose = await connectToDatabase();
        const db = mongoose.connection.db;
        if (!db) throw new Error('Mongoose connection not connected');
        
        await db.collection('user').updateOne(
            { email: email },
            { $set: { emailSubscribed: true, updatedAt: new Date() } }
        );
        
        return true;
    } catch (e) {
        console.error('Error subscribing user:', e);
        return false;
    }
};

export const getAllUsersForNewsEmail = async () => {
    try {
        const mongoose = await connectToDatabase();
        const db = mongoose.connection.db;
        if(!db) throw new Error('Mongoose connection not connected');

        const users = await db.collection('user').find(
            { 
                email: { $exists: true, $ne: null },
                emailSubscribed: { $ne: false } 
            },
            { projection: { _id: 1, id: 1, email: 1, name: 1, country:1 }}
        ).toArray();

        return users.filter((user) => user.email && user.name).map((user) => ({
            id: user.id || user._id?.toString() || '',
            email: user.email,
            name: user.name
        }))
    } catch (e) {
        console.error('Error fetching users for news email:', e)
        return []
    }
}

export const updateProfileImage = async (imageUrl: string): Promise<boolean> => {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session?.user?.email) return false;
        
        const mongoose = await connectToDatabase();
        const db = mongoose.connection.db;
        if (!db) throw new Error('Mongoose connection not connected');
        
        await db.collection('user').updateOne(
            { email: session.user.email },
            { $set: { image: imageUrl, updatedAt: new Date() } }
        );
        
        return true;
    } catch (e) {
        console.error('Error updating profile image:', e);
        return false;
    }
}

export const deleteAccount = async (): Promise<{ success: boolean; error?: string }> => {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session?.user?.email) return { success: false, error: 'Not authenticated' };

        const mongoose = await connectToDatabase();
        const db = mongoose.connection.db;
        if (!db) throw new Error('Mongoose connection not connected');

        // Get user by email to get the _id
        const user = await db.collection('user').findOne({ email: session.user.email });
        
        if (!user) {
            return { success: false, error: 'User not found' };
        }

        // Delete user from MongoDB using _id
        await db.collection('user').deleteOne({ _id: user._id });
        
        // Delete all watchlist items for this user
        await db.collection('watchlist').deleteMany({ userId: user.id as string || String(user._id || '') });

        // Sign out user
        await auth.api.signOut({ headers: await headers() });

        return { success: true };
    } catch (e) {
        console.error('Error deleting account:', e);
        return { success: false, error: 'Failed to delete account' };
    }
}
