'use server';

import { connectToDatabase } from '@/database/mongoose';
import { Watchlist } from '@/database/models/watchlist.model';

export async function getWatchlistSymbolsByEmail(email: string): Promise<string[]> {
  if (!email) return [];

  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error('MongoDB connection not found');

    // Better Auth stores users in the "user" collection
    const user = await db.collection('user').findOne<{ _id?: unknown; id?: string; email?: string }>({ email });

    if (!user) return [];

    const userId = (user.id as string) || String(user._id || '');
    if (!userId) return [];

    const items = await Watchlist.find({ userId }, { symbol: 1 }).lean();
    return items.map((i) => String(i.symbol));
  } catch (err) {
    console.error('getWatchlistSymbolsByEmail error:', err);
    return [];
  }
}

/**
 * Save a symbol to the user's watchlist
 * @param email - User's email address
 * @param symbol - Stock symbol to add
 * @param company - Company name
 * @returns { success: boolean, error?: string }
 */
export async function saveWatchlistItem(email: string, symbol: string, company: string): Promise<{ success: boolean; error?: string }> {
  if (!email || !symbol) {
    return { success: false, error: 'Email and symbol are required' };
  }

  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error('MongoDB connection not found');

    const user = await db.collection('user').findOne<{ _id?: unknown; id?: string; email?: string }>({ email });
    if (!user) {
      return { success: false, error: 'User not found' };
    }

    const userId = (user.id as string) || String(user._id || '');
    if (!userId) {
      return { success: false, error: 'User ID not found' };
    }

    // Use findOneAndUpdate with upsert to add or update the watchlist item
    await Watchlist.findOneAndUpdate(
      { userId, symbol: symbol.toUpperCase() },
      {
        userId,
        symbol: symbol.toUpperCase(),
        company,
        addedAt: new Date(),
      },
      { upsert: true, new: true }
    );

    return { success: true };
  } catch (err) {
    console.error('saveWatchlistItem error:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Failed to save watchlist item' };
  }
}

/**
 * Remove a symbol from the user's watchlist
 * @param email - User's email address
 * @param symbol - Stock symbol to remove
 * @returns { success: boolean, error?: string }
 */
export async function removeWatchlistItem(email: string, symbol: string): Promise<{ success: boolean; error?: string }> {
  if (!email || !symbol) {
    return { success: false, error: 'Email and symbol are required' };
  }

  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error('MongoDB connection not found');

    const user = await db.collection('user').findOne<{ _id?: unknown; id?: string; email?: string }>({ email });
    if (!user) {
      return { success: false, error: 'User not found' };
    }

    const userId = (user.id as string) || String(user._id || '');
    if (!userId) {
      return { success: false, error: 'User ID not found' };
    }

    await Watchlist.deleteOne({ userId, symbol: symbol.toUpperCase() });

    return { success: true };
  } catch (err) {
    console.error('removeWatchlistItem error:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Failed to remove watchlist item' };
  }
}
