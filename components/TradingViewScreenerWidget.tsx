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
    
    // Capture container at the top to avoid stale references in cleanup
    const container = containerRef.current;
    
    if (container.dataset.loaded) return;
    
    // Don't clear the entire container - TradingView needs the placeholder div
    // Only remove any existing scripts to prevent duplicates
    const existingScripts = container.querySelectorAll('script');
    existingScripts.forEach(s => s.remove());
    
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js';
    script.async = true;
    script.textContent = JSON.stringify({
      ...SCREENER_WIDGET_CONFIG,
      isTransparent: true,
      backgroundColor: 'rgba(0,0,0,0)',
    });

    container.appendChild(script);
    container.dataset.loaded = 'true';

    return () => {
      // Use captured container variable instead of containerRef.current
      // Only remove the script, don't destroy the placeholder div
      const scripts = container.querySelectorAll('script');
      scripts.forEach(s => s.remove());
      delete container.dataset.loaded;
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

