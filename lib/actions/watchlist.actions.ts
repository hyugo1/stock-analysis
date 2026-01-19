'use server';

import { connectToDatabase } from '@/database/mongoose';
import { Watchlist } from '@/database/models/watchlist.model';
import { auth } from '@/lib/better-auth/auth';
import { headers } from 'next/headers';

// Helper function to mask email for logging
const maskEmail = (email: string): string => {
  if (!email || !email.includes('@')) return '***';
  const [local, domain] = email.split('@');
  return `${local.substring(0, 2)}***@${domain}`;
};

// Helper function to validate stock symbol format
const isValidSymbol = (symbol: string): boolean => {
  // Stock symbols are typically 1-5 uppercase letters, may contain dots for certain types
  const symbolRegex = /^[A-Z]{1,5}(\.[A-Z])?$/;
  return symbolRegex.test(symbol.toUpperCase());
};

// Helper function to sanitize company name
const sanitizeCompanyName = (company: string): string => {
  // Remove any potential script tags or special characters that could be used for XSS
  return company
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/[<>]/g, '')
    .trim()
    .substring(0, 200); // Limit length
};

export async function getWatchlistSymbolsByEmail(email: string): Promise<string[]> {
  if (!email) return [];

  try {
    // No longer logging email to prevent PII leakage
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error('MongoDB connection not found');

    const user = await db.collection('user').findOne<{ _id?: unknown; id?: string; email?: string }>({ email });
    if (!user) {
      return [];
    }

    const userId = (user.id as string) || String(user._id || '');
    if (!userId) return [];

    const items = await Watchlist.find({ userId }, { symbol: 1 }).lean();
    const symbols = items.map((i) => String(i.symbol));
    return symbols;
  } catch (err) {
    console.error('getWatchlistSymbolsByEmail error: [REDACTED]');
    return [];
  }
}

// Server action to get current user's watchlist symbols (uses session)
export async function getCurrentUserWatchlist(): Promise<string[]> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const email = session?.user?.email;
    
    if (!email) {
      return [];
    }
    
    return await getWatchlistSymbolsByEmail(email);
  } catch (err) {
    console.error('getCurrentUserWatchlist error: [REDACTED]');
    return [];
  }
}

export async function saveWatchlistItem(email: string, symbol: string, company: string): Promise<{ success: boolean; error?: string }> {
  if (!email || !symbol) {
    return { success: false, error: 'Email and symbol are required' };
  }

  // Validate symbol format
  const normalizedSymbol = symbol.toUpperCase().trim();
  if (!isValidSymbol(normalizedSymbol)) {
    return { success: false, error: 'Invalid symbol format' };
  }

  // Sanitize company name to prevent XSS
  const sanitizedCompany = sanitizeCompanyName(company);

  try {
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    if (!db) throw new Error('MongoDB connection not found');

    const user = await db.collection('user').findOne<{ _id?: unknown; id?: string; email?: string }>({ email });
    if (!user) {
      return { success: false, error: 'User not found' };
    }

    const userId = (user.id as string) || String(user._id || '');
    if (!userId) return { success: false, error: 'User ID not found' };

    const updated = await Watchlist.findOneAndUpdate(
      { userId, symbol: normalizedSymbol },
      {
        userId,
        symbol: normalizedSymbol,
        company: sanitizedCompany,
        addedAt: new Date(),
      },
      { upsert: true, new: true }
    );

    return { success: true };
  } catch (err) {
    console.error('saveWatchlistItem error: [REDACTED]');
    return { success: false, error: 'Failed to save watchlist item' };
  }
}

export async function removeWatchlistItem(email: string, symbol: string): Promise<{ success: boolean; error?: string }> {
  if (!email || !symbol) {
    return { success: false, error: 'Email and symbol are required' };
  }

  // Validate symbol format
  const normalizedSymbol = symbol.toUpperCase().trim();
  if (!isValidSymbol(normalizedSymbol)) {
    return { success: false, error: 'Invalid symbol format' };
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
    if (!userId) return { success: false, error: 'User ID not found' };

    await Watchlist.deleteOne({ userId, symbol: normalizedSymbol });

    return { success: true };
  } catch (err) {
    console.error('removeWatchlistItem error: [REDACTED]');
    return { success: false, error: 'Failed to remove watchlist item' };
  }
}

export async function removeCurrentUserWatchlistItem(symbol: string): Promise<{ success: boolean; error?: string }> {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const email = session?.user?.email;
    
    if (!email) {
      return { success: false, error: 'Not authenticated' };
    }
    
    return await removeWatchlistItem(email, symbol);
  } catch (err) {
    console.error('removeCurrentUserWatchlistItem error: [REDACTED]');
    return { success: false, error: 'Failed to remove watchlist item' };
  }
}
