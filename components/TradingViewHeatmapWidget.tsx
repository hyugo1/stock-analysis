'use client';

import { cn } from '@/lib/utils';
import React, { memo, useEffect, useRef } from 'react';
import { STOCK_HEATMAP_WIDGET_CONFIG } from '@/lib/constants';

interface TradingViewHeatmapWidgetProps {
  className?: string;
  dataSource?: string;
  height?: number;
}

const TradingViewHeatmapWidget = ({ 
  className, 
  dataSource = 'SPX500',
  height = 600 
}: TradingViewHeatmapWidgetProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Capture container at the top to avoid stale references in cleanup
    const container = containerRef.current;
    
    if (container.dataset.loaded) return;
    
    container.innerHTML = '';
    
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-stock-heatmap.js';
    script.async = true;
    
    const config = {
      ...STOCK_HEATMAP_WIDGET_CONFIG,
      dataSource: dataSource,
      // Critical transparency settings
      isTransparent: true,
      backgroundColor: 'rgba(0,0,0,0)',
      transparent: true,
      plotColor: 'rgba(0,0,0,0)',
      // Ensure no color conflicts
      blockColor: 'change', // Use change for coloring instead of fixed colors
    };
    
    script.textContent = JSON.stringify(config);

    container.appendChild(script);
    container.dataset.loaded = 'true';

    return () => {
      // Use captured container variable instead of containerRef.current
      container.innerHTML = '';
      delete container.dataset.loaded;
    };
  }, [dataSource, height]);

  return (
    <div className="w-full">
      <div 
        className={cn(
          'tradingview-widget-container rounded-xl transition-all duration-300 hover:scale-[1.01]',
          className
        )} 
        ref={containerRef}
        style={{ 
          height: `${height}px`, 
          backgroundColor: 'transparent',
          border: 'none'
        }}
      >
        <div 
          className="tradingview-widget-container__widget" 
          style={{ 
            height: '100%', 
            width: '100%',
            backgroundColor: 'transparent'
          }} 
        />
      </div>
    </div>
  );
};

export default memo(TradingViewHeatmapWidget);

