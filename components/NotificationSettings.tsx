'use client';

import { useState, useEffect } from 'react';
import { toggleEmailSubscription, getCurrentUserSubscriptionStatus } from '@/lib/actions/user.actions';

export function NotificationSettings() {
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadSubscriptionStatus();
  }, []);

  const loadSubscriptionStatus = async () => {
    try {
      const status = await getCurrentUserSubscriptionStatus();
      setIsSubscribed(status ?? true);
    } catch (error) {
      console.error('Error loading subscription status:', error);
      setMessage({ type: 'error', text: 'Failed to load subscription status' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = async () => {
    setIsUpdating(true);
    setMessage(null);
    
    try {
      const newStatus = !isSubscribed;
      const success = await toggleEmailSubscription(newStatus);
      
      if (success) {
        setIsSubscribed(newStatus);
        setMessage({
          type: 'success',
          text: newStatus 
            ? 'You will now receive daily news emails' 
            : 'You will no longer receive daily news emails'
        });
      } else {
        setMessage({ type: 'error', text: 'Failed to update subscription' });
      }
    } catch (error) {
      console.error('Error toggling subscription:', error);
      setMessage({ type: 'error', text: 'An error occurred' });
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-20 bg-[#1f2937] rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-[#0e1116] border border-[#1f2937] rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1">
              Daily News Summary
            </h3>
            <p className="text-sm text-gray-400">
              Receive a daily email with market news and updates based on your watchlist
            </p>
          </div>
          
          <button
            onClick={handleToggle}
            disabled={isUpdating}
            className={`
              relative inline-flex h-7 w-12 items-center rounded-full transition-colors
              ${isSubscribed ? 'bg-[#10b981]' : 'bg-[#374151]'}
              ${isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <span
              className={`
                inline-block h-5 w-5 transform rounded-full bg-white transition-transform
                ${isSubscribed ? 'translate-x-6' : 'translate-x-1'}
              `}
            />
          </button>
        </div>
        
        <div className="mt-4 pt-4 border-t border-[#1f2937]">
          <p className="text-xs text-gray-500">
            Status: <span className={isSubscribed ? 'text-[#10b981]' : 'text-gray-400'}>
              {isSubscribed ? 'Subscribed' : 'Unsubscribed'}
            </span>
          </p>
        </div>
      </div>

      {message && (
        <div
          className={`
            p-4 rounded-lg text-sm
            ${message.type === 'success' 
              ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
              : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }
          `}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}