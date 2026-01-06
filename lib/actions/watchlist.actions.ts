'use server';

import { connectToDatabase } from '@/database/mongoose';
import { Watchlist } from '@/database/models/watchlist.model';

export async function getWatchlistSymbolsByEmail(email: string): Promise<string[]> {
  if (!email) return [];

  try {
    console.log(`[Watchlist] Fetching watchlist for email: ${email.replace(/(.{2}).*@/, '$1***@')}`);
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error('MongoDB connection not found');

    const user = await db.collection('user').findOne<{ _id?: unknown; id?: string; email?: string }>({ email });
    if (!user) {
      console.log(`[Watchlist] No user found for email: ${email}`);
      return [];
    }

    const userId = (user.id as string) || String(user._id || '');
    if (!userId) return [];

    const items = await Watchlist.find({ userId }, { symbol: 1 }).lean();
    const symbols = items.map((i) => String(i.symbol));
    console.log(`[Watchlist] Found symbols for  ${email.replace(/(.{2}).*@/, '$1***@')}:`, symbols);
    return symbols;
  } catch (err) {
    console.error('getWatchlistSymbolsByEmail error:', err);
    return [];
  }
}

export async function saveWatchlistItem(email: string, symbol: string, company: string): Promise<{ success: boolean; error?: string }> {
  if (!email || !symbol) {
    console.warn('[Watchlist] saveWatchlistItem called without email or symbol');
    return { success: false, error: 'Email and symbol are required' };
  }

  try {
    console.log(`[Watchlist] Saving symbol "${symbol}" for email: ${email}`);
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error('MongoDB connection not found');

    const user = await db.collection('user').findOne<{ _id?: unknown; id?: string; email?: string }>({ email });
    if (!user) {
      console.warn(`[Watchlist] User not found for email: ${email}`);
      return { success: false, error: 'User not found' };
    }

    const userId = (user.id as string) || String(user._id || '');
    if (!userId) return { success: false, error: 'User ID not found' };

    const updated = await Watchlist.findOneAndUpdate(
      { userId, symbol: symbol.toUpperCase() },
      {
        userId,
        symbol: symbol.toUpperCase(),
        company,
        addedAt: new Date(),
      },
      { upsert: true, new: true }
    );

    console.log(`[Watchlist] Symbol "${symbol}" saved successfully for userId: ${userId}`, updated);
    return { success: true };
  } catch (err) {
    console.error('saveWatchlistItem error:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Failed to save watchlist item' };
  }
}

export async function removeWatchlistItem(email: string, symbol: string): Promise<{ success: boolean; error?: string }> {
  if (!email || !symbol) {
    console.warn('[Watchlist] removeWatchlistItem called without email or symbol');
    return { success: false, error: 'Email and symbol are required' };
  }

  try {
    console.log(`[Watchlist] Removing symbol "${symbol}" for email: ${email}`);
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error('MongoDB connection not found');

    const user = await db.collection('user').findOne<{ _id?: unknown; id?: string; email?: string }>({ email });
    if (!user) {
      console.warn(`[Watchlist] User not found for email: ${email}`);
      return { success: false, error: 'User not found' };
    }

    const userId = (user.id as string) || String(user._id || '');
    if (!userId) return { success: false, error: 'User ID not found' };

    const result = await Watchlist.deleteOne({ userId, symbol: symbol.toUpperCase() });
    console.log(`[Watchlist] Symbol "${symbol}" removed for userId: ${userId}`, result);

    return { success: true };
  } catch (err) {
    console.error('removeWatchlistItem error:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Failed to remove watchlist item' };
  }
}