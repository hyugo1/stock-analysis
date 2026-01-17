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
      const result = await removeCurrentUserWatchlistItem(symbol);
      if (result.success) {
        router.refresh();
      } else {
        console.error('Error removing from watchlist:', result.error);
      }
    } catch (error) {
      console.error('Error removing from watchlist:', error);
    } finally {
      setRemoving(null);
    }
  };

  const getAlertColor = (signal: string | undefined) => {
    if (!signal) return 'text-muted-foreground';
    if (signal.includes('STRONG_BUY') || signal.includes('BUY')) return 'text-growth-emerald font-semibold';
    if (signal.includes('STRONG_SELL') || signal.includes('SELL')) return 'text-alert-red font-semibold';
    if (signal.includes('MOONING') || signal.includes('BULLISH')) return 'text-growth-emerald';
    if (signal.includes('CRASHING') || signal.includes('BEARISH')) return 'text-alert-red';
    return 'text-muted-foreground';
  };

  const getChangeColor = (change: number | undefined) => {
    if (change === undefined) return 'text-muted-foreground';
    return change >= 0 ? 'text-growth-emerald' : 'text-alert-red';
  };

  if (!watchlist || watchlist.length === 0) {
    return (
      <div className="text-center py-10 bg-card rounded-lg border border-border/50">
        <p className="text-muted-foreground">Your watchlist is empty. Add stocks to see them here!</p>
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
              className={`table-row cursor-pointer transition-colors ${selectedSymbol === item.symbol ? 'bg-primary/10 border-l-4 border-l-primary' : 'hover:bg-muted/50'}`}
              onClick={() => handleRowClick(item.symbol)}
            >
              <TableCell className="table-cell text-foreground truncate">{item.company}</TableCell>
              <TableCell className="table-cell font-mono text-primary font-medium truncate">{item.symbol}</TableCell>
              <TableCell className="table-cell text-foreground truncate">{item.priceFormatted || '-'}</TableCell>
              <TableCell className={`table-cell ${getChangeColor(item.changePercent)} truncate`}>
                {item.changeFormatted || '-'}
              </TableCell>
              <TableCell className="table-cell text-muted-foreground truncate">{item.marketCap || '-'}</TableCell>
              <TableCell className="table-cell text-muted-foreground truncate">{item.peRatio || '-'}</TableCell>
  
              <TableCell className={`table-cell ${getAlertColor(item.signal)}`}>
                {item.alert || '-'}
              </TableCell>
              <TableCell className="table-cell">
                <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                  <Button 
                    size="sm" 
                    variant="success"
                    className="h-7 px-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`https://www.tradingview.com/chart/?symbol=${item.symbol}`, '_blank');
                    }}
                  >
                    Buy
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    className="h-7 px-2"
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
                  className="p-2 text-muted-foreground hover:text-alert-rose disabled:opacity-50 transition-colors"
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