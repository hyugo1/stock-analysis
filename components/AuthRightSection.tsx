'use client';

import useTradingViewWidget from '@/hooks/useTradingViewWidget';
import { memo } from 'react';

// Ticker Tape
const tickerTapeConfig = {
  symbols: [
    { proName: 'FOREXCOM:SPXUSD', title: 'S&P 500' },
    { proName: 'FOREXCOM:NSXUSD', title: 'Nasdaq 100' },
    { proName: 'FOREXCOM:DJI', title: 'Dow 30' },
    { proName: 'NASDAQ:AAPL', title: 'Apple' },
    { proName: 'NASDAQ:GOOGL', title: 'Google' },
    { proName: 'NASDAQ:MSFT', title: 'Microsoft' },
    { proName: 'BINANCE:BTCUSDT', title: 'Bitcoin' },
    { proName: 'BINANCE:ETHUSDT', title: 'Ethereum' },
  ],
  showSymbolLogo: true,
  colorTheme: 'dark',
  isTransparent: true,
  displayMode: 'adaptive',
  locale: 'en',
};

// Show top gainers, losers, and most active stocks
const hotListsConfig = {
  exchange: 'US',
  colorTheme: 'dark',
  dateRange: '12M',
  showChart: true,
  locale: 'en',
  largeChartUrl: '',
  isTransparent: true,
  showSymbolLogo: false,
  showFloatingTooltip: false,
  plotLineColorGrowing: 'rgba(41, 98, 255, 1)',
  plotLineColorFalling: 'rgba(41, 98, 255, 1)',
  gridLineColor: 'rgba(240, 243, 250, 0)',
  scaleFontColor: '#DBDBDB',
  belowLineFillColorGrowing: 'rgba(41, 98, 255, 0.12)',
  belowLineFillColorFalling: 'rgba(41, 98, 255, 0.12)',
  belowLineFillColorGrowingBottom: 'rgba(41, 98, 255, 0)',
  belowLineFillColorFallingBottom: 'rgba(41, 98, 255, 0)',
  symbolActiveColor: 'rgba(41, 98, 255, 0.12)',
  width: '100%',
  height: '100%',
};

function TickerTapeWidget() {
  const containerRef = useTradingViewWidget(
    'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js',
    tickerTapeConfig,
    70
  );

  return (
    <div className="w-full mb-6">
      <div
        className="tradingview-widget-container"
        style={{ height: '70px', borderRadius: '12px', overflow: 'hidden' }}
        ref={containerRef}
      >
        <div className="tradingview-widget-container__widget" style={{ height: '70px', width: '100%' }} />
      </div>
    </div>
  );
}

function HotListsWidget() {
  const containerRef = useTradingViewWidget(
    'https://s3.tradingview.com/external-embedding/embed-widget-hotlists.js',
    hotListsConfig,
    550
  );

  return (
    <div className="flex-1 w-full">
      <div
        className="tradingview-widget-container"
        style={{ height: 'calc(100% - 100px)', minHeight: '300px', borderRadius: '12px', overflow: 'hidden' }}
        ref={containerRef}
      >
        <div className="tradingview-widget-container__widget" style={{ width: '100%' }} />
      </div>
    </div>
  );
}

const MemoizedTickerTape = memo(TickerTapeWidget);
const MemoizedHotLists = memo(HotListsWidget);

export default function AuthRightSection() {
  return (
    <section className="auth-right-section">
      <MemoizedTickerTape />
      <MemoizedHotLists />
    </section>
  );
}

