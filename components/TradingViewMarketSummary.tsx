'use client';

import useTradingViewWidget from '@/hooks/useTradingViewWidget';
import { memo } from 'react';

interface TradingViewMarketSummaryProps {
  height?: number;
  width?: string;
}

// Market Summary Widget Configuration
const marketSummaryConfig = {
  colorTheme: 'dark',
  dateRange: '12M',
  showChart: true,
  locale: 'en',
  largeChartUrl: '',
  isTransparent: true,
  showSymbolLogo: true,
  showFloatingTooltip: false,
  width: '100%',
  height: '100%',
};

function MarketSummaryWidgetInner({ height = 350 }: { height?: number }) {
  const containerRef = useTradingViewWidget(
    'https://s3.tradingview.com/external-embedding/embed-widget-market-summary.js',
    marketSummaryConfig,
    height
  );

  return (
    <div
      className="tradingview-widget-container"
      style={{ height: `${height}px`, borderRadius: '12px', overflow: 'hidden' }}
      ref={containerRef}
    >
      <div className="tradingview-widget-container__widget" style={{ height: '100%', width: '100%' }} />
    </div>
  );
}

const MemoizedMarketSummary = memo(MarketSummaryWidgetInner);

export default function TradingViewMarketSummary({
  height = 350,
  width = '100%',
}: TradingViewMarketSummaryProps) {
  return (
    <div style={{ width, height: `${height}px` }} className="tradingview-market-summary-container">
      <MemoizedMarketSummary height={height} />
    </div>
  );
}

