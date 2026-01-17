'use client';

interface TradingViewMarketOverviewProps {
  height?: number | string;
  showTabs?: boolean;
  colorTheme?: 'dark' | 'light';
}

export default function TradingViewMarketOverview({
  height = 400,
  showTabs = true,
  colorTheme = 'dark',
}: TradingViewMarketOverviewProps) {
  return (
    <div className="tradingview-widget-container" style={{ height }}>
      <div className="tradingview-widget-container__widget"></div>
      <script
        src="https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js"
        async
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            colorTheme,
            dateRange: '12M',
            showChart: true,
            locale: 'en',
            largeChartUrl: '',
            isTransparent: true,
            showSymbolLogo: true,
            showFloatingTooltip: false,
            width: '100%',
            height: '100%',
            plotLineColorGrowing: 'rgba(33, 150, 243, 1)',
            plotLineColorFalling: 'rgba(33, 150, 243, 1)',
            gridLineColor: 'rgba(240, 243, 250, 0)',
            scaleFontColor: 'rgba(120, 123, 134, 1)',
            belowLineFillColorGrowing: 'rgba(33, 150, 243, 0.12)',
            belowLineFillColorFalling: 'rgba(33, 150, 243, 0.12)',
            belowLineFillColorGrowingBottom: 'rgba(33, 150, 243, 0)',
            belowLineFillColorFallingBottom: 'rgba(33, 150, 243, 0)',
            symbolActiveColor: 'rgba(33, 150, 243, 0.12)',
            tabs: showTabs
              ? [
                  {
                    title: 'Indices',
                    symbols: [
                      { s: 'FOREXCOM:SPXUSD', d: 'S&P 500' },
                      { s: 'FOREXCOM:NSXUSD', d: 'Nasdaq 100' },
                      { s: 'FOREXCOM:DJI', d: 'Dow 30' },
                      { s: 'INDEX:NKY', d: 'Nikkei 225' },
                      { s: 'INDEX:DEU40', d: 'DAX Index' },
                    ],
                    originalTitle: 'Indices',
                  },
                  {
                    title: 'Stocks',
                    symbols: [
                      { s: 'NASDAQ:AAPL', d: 'Apple' },
                      { s: 'NASDAQ:GOOGL', d: 'Alphabet' },
                      { s: 'NASDAQ:MSFT', d: 'Microsoft' },
                      { s: 'NASDAQ:AMZN', d: 'Amazon' },
                      { s: 'NASDAQ:NVDA', d: 'NVIDIA' },
                    ],
                    originalTitle: 'Stocks',
                  },
                  {
                    title: 'Crypto',
                    symbols: [
                      { s: 'BINANCE:BTCUSDT', d: 'Bitcoin' },
                      { s: 'BINANCE:ETHUSDT', d: 'Ethereum' },
                      { s: 'BINANCE:SOLUSDT', d: 'Solana' },
                      { s: 'BINANCE:XRPUSDT', d: 'Ripple' },
                      { s: 'BINANCE:ADAUSDT', d: 'Cardano' },
                    ],
                    originalTitle: 'Crypto',
                  },
                ]
              : undefined,
          }),
        }}
      />
    </div>
  );
}