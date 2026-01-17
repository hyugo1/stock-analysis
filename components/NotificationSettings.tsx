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
      <div className="bg-card border border-border/50 rounded-xl p-6 card-hover hover:scale-[1.02] transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1 transition-all duration-300">
              Daily News Summary
            </h3>
            <p className="text-sm text-muted-foreground transition-all duration-300">
              Receive a daily email with market news and updates based on your watchlist
            </p>
          </div>
          
          <button
            onClick={handleToggle}
            disabled={isUpdating}
            className={`
              relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300
              ${isSubscribed ? 'bg-growth-emerald animate-pulse-glow' : 'bg-muted'}
              ${isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-110'}
            `}
          >
            <span
              className={`
                inline-block h-5 w-5 transform rounded-full bg-white transition-all duration-300 shadow-lg
                ${isSubscribed ? 'translate-x-6' : 'translate-x-1'}
              `}
            />
          </button>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground transition-all duration-300">
            Status: <span className={isSubscribed ? 'text-growth-emerald font-semibold' : 'text-muted-foreground'}>
              {isSubscribed ? 'Subscribed' : 'Unsubscribed'}
            </span>
          </p>
        </div>
      </div>

      {message && (
        <div
          className={`
            p-4 rounded-lg text-sm animate-fade-up
            ${message.type === 'success' 
              ? 'bg-growth-emerald/10 text-growth-emerald border border-growth-emerald/20' 
              : 'bg-alert-red/10 text-alert-red border border-alert-red/20'
            }
          `}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}