import TradingViewWidget from "@/components/TradingViewWidget"
import { Button } from "@/components/ui/button"
import { MARKET_OVERVIEW_WIDGET_CONFIG, 
  STOCK_HEATMAP_WIDGET_CONFIG,
  TIMELINES_WIDGET_CONFIG,
  MARKET_DATA_WIDGET_CONFIG
 } from "@/lib/constants"


const Home = () => {
  const scripturl = "https://s3.tradingview.com/external-embedding/embed-widget-";
  return (
    <div className="flex min-h-screen home-wrapper">
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-8 home-section">
        {/* first section short */}
        <div className="md:col-span-1 xl:col-span-1">
          <TradingViewWidget title="Market Overview" scriptUrl={`${scripturl}market-overview.js`} config={MARKET_OVERVIEW_WIDGET_CONFIG} height={600} className="custom-chart"/>
        </div>
        {/* first section long */}
        <div className="md:col-span-1 xl:col-span-2">
          <TradingViewWidget title="Stock Heatmap" scriptUrl={`${scripturl}stock-heatmap.js`} config={STOCK_HEATMAP_WIDGET_CONFIG} height={600}/>
        </div>
      </section>

       <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-8 home-section">
        {/* second section long */}
        <div className="md:col-span-1 xl:col-span-2 h-full">
          <TradingViewWidget scriptUrl={`${scripturl}market-quotes.js`} config={MARKET_DATA_WIDGET_CONFIG} height={600}/>
        </div>
        {/* second section short */}
        <div className="md:col-span-1 xl:col-span-1 h-full">
          <TradingViewWidget scriptUrl={`${scripturl}timeline.js`} config={TIMELINES_WIDGET_CONFIG} height={600} className="custom-chart"/>
        </div>
      </section>
    </div>
  )
}

export default Home