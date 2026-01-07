'use client'

import { CommandDialog, CommandEmpty, CommandInput, CommandList } from "@/components/ui/command"
import React, { useEffect, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { TrendingUp, Loader2 } from "lucide-react"

import Link from "next/link";
import { searchStocks } from "@/lib/actions/finnhub.actions"
import { useDebounce } from "@/hooks/useDebounce"
import WatchlistButton from "@/components/WatchlistButton"
import { getCurrentUserWatchlist } from "@/lib/actions/watchlist.actions"


export default function SearchCommand({ renderAs = "button", label = "Add Stock", initialStocks }: SearchCommandProps) {
    const [open, setOpen] = React.useState(false)
    const [searchTerm, setSearchTerm] = React.useState("")
    const [loading, setLoading] = React.useState(false)
    const [stocks, setStocks] = React.useState<StockWithWatchlistStatus[]>(initialStocks || [])
    const [watchlistSymbols, setWatchlistSymbols] = useState<string[]>([])
    const [isInitialized, setIsInitialized] = React.useState(false)

    const isSearchMode = !!searchTerm.trim();
    const displayStocks = isSearchMode ? stocks : stocks?.slice(0, 10);

    useEffect(() => {
        async function fetchWatchlist() {
            try {
                const symbols = await getCurrentUserWatchlist();
                setWatchlistSymbols(symbols);
            } catch (e) {
                console.error('Error fetching watchlist:', e);
            } finally {
                setIsInitialized(true);
            }
        }
        fetchWatchlist();
    }, []);

    useEffect(() => {
        if (!isInitialized) return;
        
        setStocks(prevStocks => 
            prevStocks.map(stock => ({
                ...stock,
                isInWatchlist: watchlistSymbols.includes(stock.symbol)
            }))
        );
    }, [watchlistSymbols, isInitialized]);

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
        window.addEventListener("keydown", down)
        return () => window.removeEventListener("keydown", down)
    }, [])


    const handleSearch = async () => {
        if (!isSearchMode) {
            setStocks(initialStocks || []);
            return;
        }
        setLoading(true);
        try {
            const results = await searchStocks(searchTerm);
            const resultsWithStatus = results.map(stock => ({
                ...stock,
                isInWatchlist: watchlistSymbols.includes(stock.symbol)
            }));
            setStocks(resultsWithStatus);
        } catch {
            setStocks([]);
        } finally {
            setLoading(false);
        }
    }

    const debouncedSearch = useDebounce(handleSearch, 300);
    
    useEffect(() => {
        debouncedSearch();
    }, [searchTerm]);


    const handleSelectStock = () => {
        setOpen(false)
        setSearchTerm("")
        setStocks(initialStocks || [])
    }

    const handleWatchlistChange = useCallback((symbol: string, isAdded: boolean) => {
        setWatchlistSymbols(prev => 
            isAdded 
                ? [...prev, symbol] 
                : prev.filter(s => s !== symbol)
        );
        setStocks(prevStocks => 
            prevStocks.map(stock => 
                stock.symbol === symbol 
                    ? { ...stock, isInWatchlist: isAdded }
                    : stock
            )
        );
    }, []);

    return (
        <>
            {renderAs === "text" ? (
                <span onClick={() => setOpen(true)} className="search-text">
                    {label}
                </span>
            ) : (
                <Button onClick={() => setOpen(true)} className="search-btn">
                    {label}
                </Button>
            )}
            <CommandDialog open={open} onOpenChange={setOpen} className="search-dialog ">
                <div className="search-field">
                    <CommandInput placeholder="Search stocks..." value={searchTerm} onValueChange={setSearchTerm} className="search-input"/>
                    {loading && <Loader2 className="search-loader" />}
                </div>
                    <CommandList className="search-list">
                      {loading ? (
                            <CommandEmpty className="search-list-empty">Loading Stocks...</CommandEmpty>
                        ): displayStocks?.length === 0 ? (
                            <div className="search-list-indicator">
                                {isSearchMode ? "No results found." : "No stocks found."}
                            </div>   
                        ) : (
                            <ul>
                                <div className="search-count">
                                    {isSearchMode ? "Search Results" : "Popular Stocks"}
                                    {` `}
                                    ({displayStocks?.length || 0})
                                </div>
                                {displayStocks?.map((stock) => (
                                    <li key={stock.symbol} className="search-item">
                                        <Link href={`/stocks/${stock.symbol}`} 
                                            onClick={handleSelectStock} 
                                            className="search-item-link">
                                            <TrendingUp className="h-4 w-4 text-gray-500" />
                                            <div className="flex-1">
                                                <div className="search-item-name">
                                                    {stock.name}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {stock.symbol} | {stock.exchange} | {stock.type}
                                                </div>
                                            </div>
                                            <WatchlistButton 
                                                symbol={stock.symbol}
                                                company={stock.name}
                                                isInWatchlist={stock.isInWatchlist}
                                                type="icon"
                                                onWatchlistChange={handleWatchlistChange}
                                            />
                                        </Link>
                                    
                                    </li>
                                ))}
                            </ul>

                        )
                    } 
                    </CommandList>
            </CommandDialog>
        </>
    )
}
