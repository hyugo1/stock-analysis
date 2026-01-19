'use client';

import useTradingViewWidget from '@/hooks/useTradingViewWidget';
import { memo } from 'react';
import { TAPE_WIDGET_CONFIG } from '@/lib/constants';

function TickerTapeWidget() {
  const containerRef = useTradingViewWidget(
    'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js',
    TAPE_WIDGET_CONFIG,
    70
  );

  return (
    <div className="w-full">
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

const MemoizedTickerTape = memo(TickerTapeWidget);

export default MemoizedTickerTape;

