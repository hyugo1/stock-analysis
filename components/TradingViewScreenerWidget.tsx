'use client';

import { cn } from '@/lib/utils';
import React, { memo, useEffect, useRef } from 'react';
import { SCREENER_WIDGET_CONFIG } from '@/lib/constants';

interface TradingViewScreenerWidgetProps {
  className?: string;
}

const TradingViewScreenerWidget = ({ className }: TradingViewScreenerWidgetProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (containerRef.current.dataset.loaded) return;
    
    containerRef.current.innerHTML = '';
    
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js';
    script.async = true;
    script.textContent = JSON.stringify({
      ...SCREENER_WIDGET_CONFIG,
      isTransparent: true,
      backgroundColor: 'rgba(0,0,0,0)',
    });

    containerRef.current.appendChild(script);
    containerRef.current.dataset.loaded = 'true';

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
        delete containerRef.current.dataset.loaded;
      }
    };
  }, []);

  return (
    <div className="w-full">
      <div 
        className={cn(
          'tradingview-widget-container rounded-xl shadow-lg shadow-black/20 card-hover transition-all duration-300 hover:scale-[1.01] outline outline-blue-600 outline-offset-0',
          className
        )} 
        ref={containerRef}
      >
        <div className="tradingview-widget-container__widget" style={{ height: 550, width: '100%' }} />
      </div>
    </div>
  );
};

export default memo(TradingViewScreenerWidget);

