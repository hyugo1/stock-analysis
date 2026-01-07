"use client";
// WatchlistTable.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { WATCHLIST_TABLE_HEADER } from "@/lib/constants"
import { useRouter, useSearchParams } from "next/navigation";
import { removeCurrentUserWatchlistItem } from "@/lib/actions/watchlist.actions";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";

type StockWithData = {
  userId: string;
  symbol: string;
  company: string;
  addedAt: Date;
  currentPrice?: number;
  changePercent?: number;
  priceFormatted?: string;
  changeFormatted?: string;
  marketCap?: string;
  peRatio?: string;
  alert?: string;
  signal?: string;
};

type WatchlistTableProps = {
  watchlist: StockWithData[];
};

export default function WatchlistTable({ watchlist }: WatchlistTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedSymbol = searchParams.get('symbol') || watchlist[0]?.symbol || '';
  
  const [removing, setRemoving] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleRowClick = (symbol: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('symbol', symbol);
    startTransition(() => {
      router.push(`/watchlist?${params.toString()}`);
    });
  };

  const handleRemove = async (symbol: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRemoving(symbol);
    try {
      await removeCurrentUserWatchlistItem(symbol);
      router.refresh();
    } catch (error) {
      console.error('Error removing from watchlist:', error);
    } finally {
      setRemoving(null);
    }
  };

  const getAlertColor = (signal: string | undefined) => {
    if (!signal) return 'text-gray-500';
    if (signal.includes('STRONG_BUY') || signal.includes('BUY')) return 'text-green-500 font-semibold';
    if (signal.includes('STRONG_SELL') || signal.includes('SELL')) return 'text-red-500 font-semibold';
    if (signal.includes('MOONING') || signal.includes('BULLISH')) return 'text-green-500';
    if (signal.includes('CRASHING') || signal.includes('BEARISH')) return 'text-red-500';
    return 'text-gray-500';
  };

  const getChangeColor = (change: number | undefined) => {
    if (change === undefined) return 'text-gray-400';
    return change >= 0 ? 'text-green-500' : 'text-red-500';
  };

  if (!watchlist || watchlist.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-800 rounded-lg border border-gray-600">
        <p className="text-gray-400">Your watchlist is empty. Add stocks to see them here!</p>
      </div>
    )
  }

  return (
    <div className={`watchlist-table ${isPending ? 'opacity-50' : ''}`}>
      <Table>
        <TableHeader>
          <TableRow className="table-header-row">
            {WATCHLIST_TABLE_HEADER.slice(0, 6).map((header) => (
              <TableHead key={header} className="table-header">{header}</TableHead>
            ))}
            <TableHead className="table-header">Alert</TableHead>
            <TableHead className="table-header">Action</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {watchlist.map((item) => (
            <TableRow 
              key={item.symbol} 
              className={`table-row cursor-pointer transition-colors ${selectedSymbol === item.symbol ? 'bg-gray-700/50 border-l-4 border-l-yellow-500' : 'hover:bg-gray-700/30'}`}
              onClick={() => handleRowClick(item.symbol)}
            >
              <TableCell className="table-cell text-gray-100 truncate">{item.company}</TableCell>
              <TableCell className="table-cell font-mono text-yellow-500 font-medium truncate">{item.symbol}</TableCell>
              <TableCell className="table-cell text-gray-200 truncate">{item.priceFormatted || '-'}</TableCell>
              <TableCell className={`table-cell ${getChangeColor(item.changePercent)} truncate`}>
                {item.changeFormatted || '-'}
              </TableCell>
              <TableCell className="table-cell text-gray-400 truncate">{item.marketCap || '-'}</TableCell>
              <TableCell className="table-cell text-gray-400 truncate">{item.peRatio || '-'}</TableCell>
  
              <TableCell className={`table-cell ${getAlertColor(item.signal)}`}>
                {item.alert || '-'}
              </TableCell>
              <TableCell className="table-cell">
                <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                  <Button 
                    size="sm" 
                    className="h-7 px-2 bg-green-600/20 border border-green-600/30 text-green-500 hover:bg-green-600/30 hover:text-green-400 text-xs font-medium"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`https://www.tradingview.com/chart/?symbol=${item.symbol}`, '_blank');
                    }}
                  >
                    Buy
                  </Button>
                  <Button 
                    size="sm" 
                    className="h-7 px-2 bg-red-600/20 border border-red-600/30 text-red-500 hover:bg-red-600/30 hover:text-red-400 text-xs font-medium"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`https://www.tradingview.com/chart/?symbol=${item.symbol}`, '_blank');
                    }}
                  >
                    Sell
                  </Button>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <button
                  onClick={(e) => handleRemove(item.symbol, e)}
                  disabled={removing === item.symbol}
                  className="p-2 text-gray-400 hover:text-red-400 disabled:opacity-50 transition-colors"
                  title="Remove from watchlist"
                >
                  {removing === item.symbol ? (
                    <span className="animate-pulse">...</span>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                    </svg>
                  )}
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}