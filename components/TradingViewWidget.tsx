// TradingViewWidget.tsx
'use client';

import useTradingViewWidget from '@/hooks/useTradingViewWidget';
import { cn } from '@/lib/utils';
import React, { memo } from 'react';

interface TradingViewWidgetProps {
  title?: string;
  scriptUrl: string;
  config: Record<string, unknown>;
  height?: number;
  className?: string;
  showBorder?: boolean;
}

const TradingViewWidget =  ({ title, scriptUrl, config, height=600, className, showBorder=true} : TradingViewWidgetProps) => {
  const containerRef = useTradingViewWidget(scriptUrl, config, height);


  return (
    <div className="w-full">
      {title && <h3 className="font-semibold text-2xl pt-5 text-gray-400 mb-5">{title}</h3>}
      <div className={cn('tradingview-widget-container rounded-xl shadow-lg shadow-black/20 card-hover transition-all duration-300 hover:scale-[1.01]', className, showBorder && 'outline outline-blue-600 outline-offset-0')} ref={containerRef}>
        <div className="tradingview-widget-container__widget" style={{ height, width: "100%" }}/>
      </div>
    </div>
  );
}

export default memo(TradingViewWidget);
