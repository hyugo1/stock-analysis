"use client";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { saveWatchlistItem, removeWatchlistItem } from "@/lib/actions/watchlist.actions";
import { getCurrentUserEmail } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";

const WATCHLIST_STORAGE_KEY = "stock_analysis_watchlist";

/**
 * Get the current watchlist map from localStorage
 */
function getWatchlistFromStorage(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(WATCHLIST_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

/**
 * Save the watchlist map to localStorage
 */
function saveWatchlistToStorage(watchlist: Record<string, boolean>): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(WATCHLIST_STORAGE_KEY, JSON.stringify(watchlist));
  } catch (err) {
    console.error("Failed to save watchlist to localStorage:", err);
  }
}

const WatchlistButton = ({
  symbol,
  company,
  isInWatchlist,
  showTrashIcon = false,
  type = "button",
  onWatchlistChange,
  disableRefresh = false,
}: WatchlistButtonProps) => {
  const [added, setAdded] = useState<boolean>(!!isInWatchlist);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const watchlist = getWatchlistFromStorage();
    if (symbol && watchlist.hasOwnProperty(symbol)) {
      setAdded(watchlist[symbol]);
    } else if (isInWatchlist !== undefined) {
      setAdded(!!isInWatchlist);
    }
  }, [symbol, isInWatchlist]);

  const label = useMemo(() => {
    if (type === "icon") return added ? "" : "";
    return added ? "Remove from Watchlist" : "Add to Watchlist";
  }, [added, type]);

  const handleClick = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Prevent multiple simultaneous operations
    if (isLoading) return;

    const next = !added;
    setIsLoading(true);
    setError(null);

    // Optimistically update localStorage first for immediate persistence
    const watchlist = getWatchlistFromStorage();
    watchlist[symbol] = next;
    saveWatchlistToStorage(watchlist);

    // Optimistically update local state
    setAdded(next);

    try {
      const email = await getCurrentUserEmail();
      
      if (email) {
        let result;
        if (next) {
          result = await saveWatchlistItem(email, symbol, company);
        } else {
          result = await removeWatchlistItem(email, symbol);
        }

        if (!result.success) {
          console.error("Watchlist API error:", result.error);
          
          const rollbackWatchlist = getWatchlistFromStorage();
          rollbackWatchlist[symbol] = !next;
          saveWatchlistToStorage(rollbackWatchlist);
          
          setAdded(!next);
          setError(result.error || "Failed to update watchlist");
          setIsLoading(false);
          return;
        }
      }

      onWatchlistChange?.(symbol, next);
      if (!disableRefresh) {
        router.refresh();
      }
    } catch (err) {
      console.error("Watchlist error:", err);
      
      // Rollback on error
      const rollbackWatchlist = getWatchlistFromStorage();
      rollbackWatchlist[symbol] = !next;
      saveWatchlistToStorage(rollbackWatchlist);
      
      setAdded(!next);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [added, isLoading, symbol, company, onWatchlistChange]);

  if (type === "icon") {
    return (
      <button
        title={added ? `Remove ${symbol} from watchlist` : `Add ${symbol} to watchlist`}
        aria-label={added ? `Remove ${symbol} from watchlist` : `Add ${symbol} to watchlist`}
        className={`watchlist-icon-btn ${added ? "watchlist-icon-added" : ""}`}
        onClick={handleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={added ? "#FACC15" : "none"}
          stroke="#FACC15"
          strokeWidth="1.5"
          className="watchlist-star"
          style={{ width: 20, height: 20 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.385a.563.563 0 00-.182-.557L3.04 10.385a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345l2.125-5.111z"
          />
        </svg>
      </button>
    );
  }

  return (
    <button className={`watchlist-btn ${added ? "watchlist-remove" : ""}`} onClick={handleClick}>
      {showTrashIcon && added ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 mr-2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 7h12M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m-7 4v6m4-6v6m4-6v6" />
        </svg>
      ) : null}
      <span>{label}</span>
    </button>
  );
};

export default WatchlistButton;