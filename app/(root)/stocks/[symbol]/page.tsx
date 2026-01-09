import TradingViewWidget from "@/components/TradingViewWidget";
import WatchlistButton from "@/components/WatchlistButton";


import {
  SYMBOL_INFO_WIDGET_CONFIG,
  CANDLE_CHART_WIDGET_CONFIG,
  BASELINE_WIDGET_CONFIG,
  TECHNICAL_ANALYSIS_WIDGET_CONFIG,
  COMPANY_PROFILE_WIDGET_CONFIG,
  COMPANY_FINANCIALS_WIDGET_CONFIG,
} from "@/lib/constants";
import { getCurrentUserWatchlist } from "@/lib/actions/watchlist.actions";

const FINNHUB_BASE_URL = process.env.FINNHUB_BASE_URL ?? '';
const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY ?? '';

/**
 * Fetch the exchange and company name for a given symbol from Finnhub
 */
async function getSymbolInfo(symbol: string): Promise<{ exchange: string; companyName: string }> {
  try {
    const url = `${FINNHUB_BASE_URL}/stock/profile2?symbol=${encodeURIComponent(symbol)}&token=${FINNHUB_API_KEY}`;
    const response = await fetch(url, { cache: 'force-cache', next: { revalidate: 3600 } });
    
    if (!response.ok) {
      console.warn(`Profile fetch returned ${response.status} for ${symbol}`);
      return { exchange: 'NASDAQ', companyName: symbol };
    }
    
    const data = await response.json();
    if (!data || typeof data !== 'object') {
      console.warn(`Invalid profile data for ${symbol}`);
      return { exchange: 'NASDAQ', companyName: symbol };
    }
    return {
      exchange: data.exchange || 'NASDAQ',
      companyName: data.name || symbol
    };
  } catch (error) {
    console.warn(`Error fetching info for ${symbol}:`, error instanceof Error ? error.message : 'Unknown error');
    return { exchange: 'NASDAQ', companyName: symbol };
  }
}

export default async function StockDetails({ params }: StockDetailsPageProps) {
  const { symbol } = await params;
  const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;
  const symbolUpper = symbol.toUpperCase();
  
  const { exchange, companyName } = await getSymbolInfo(symbolUpper);
  const watchlistSymbols = await getCurrentUserWatchlist();
  const isInWatchlist = watchlistSymbols.includes(symbolUpper);

  return (
    <div className="flex min-h-screen p-4 md:p-6 lg:p-8">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {/* Left column */}
        <div className="flex flex-col gap-6">
          <TradingViewWidget
            scriptUrl={`${scriptUrl}symbol-info.js`}
            config={SYMBOL_INFO_WIDGET_CONFIG(symbol)}
            height={170}
          />

          <TradingViewWidget
            scriptUrl={`${scriptUrl}advanced-chart.js`}
            config={CANDLE_CHART_WIDGET_CONFIG(symbol)}
            className="custom-chart"
            height={600}
          />

          <TradingViewWidget
            scriptUrl={`${scriptUrl}advanced-chart.js`}
            config={BASELINE_WIDGET_CONFIG(symbol)}
            className="custom-chart"
            height={600}
          />
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <WatchlistButton 
              symbol={symbolUpper} 
              company={companyName} 
              isInWatchlist={isInWatchlist} 
            />
          </div>

          <TradingViewWidget
            scriptUrl={`${scriptUrl}technical-analysis.js`}
            config={{
              ...TECHNICAL_ANALYSIS_WIDGET_CONFIG,
              symbol: symbolUpper,
            }}
            height={400}
          />

          <TradingViewWidget
            scriptUrl={`${scriptUrl}company-profile.js`}
            config={COMPANY_PROFILE_WIDGET_CONFIG(symbol)}
            height={440}
          />

          <TradingViewWidget
            scriptUrl={`${scriptUrl}financials.js`}
            config={COMPANY_FINANCIALS_WIDGET_CONFIG(symbol)}
            height={464}
          />
        </div>
      </section>
    </div>
  );
}
