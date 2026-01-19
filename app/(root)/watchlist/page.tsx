// app/(root)/watchlist/page.tsx
import { auth } from "@/lib/better-auth/auth"
import { getWatchlistSymbolsByEmail } from "@/lib/actions/watchlist.actions"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import ClientWatchlistTable from "@/components/ClientWatchlistTable"
import TradingViewWidget from "@/components/TradingViewWidget"
import TickerTapeWidget from "@/components/TickerTapeWidget"
import { TECHNICAL_ANALYSIS_WIDGET_CONFIG, SINGLE_QUOTE_WIDGET_CONFIG } from "@/lib/constants"
import type { ReactNode } from "react"

/* -------------------------------------------------------------------------- */
/*                                FINNHUB API                                 */
/* -------------------------------------------------------------------------- */

const FINNHUB_BASE_URL = process.env.FINNHUB_BASE_URL ?? '';
const FINNHUB_API_KEY =
  process.env.FINNHUB_API_KEY ??
  process.env.NEXT_PUBLIC_FINNHUB_API_KEY ?? ""

async function fetchJSON(url: string, options?: RequestInit) {
  try {
    const res = await fetch(url, options)
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

const getQuote = (symbol: string) =>
  FINNHUB_API_KEY
    ? fetchJSON(
        `${FINNHUB_BASE_URL}/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`,
        { cache: "no-store" }
      )
    : null

  async function getSymbolInfo(symbol: string): Promise<{
    exchange: string
    companyName: string
    finnhubIndustry?: string
    ipo?: string
    marketCapitalization?: number
    logo?: string
    weburl?: string
    country?: string
    city?: string
  }> {
    if (!FINNHUB_API_KEY) return { exchange: "NASDAQ", companyName: symbol }
    try {
      const data = await fetchJSON(
        `${FINNHUB_BASE_URL}/stock/profile2?symbol=${symbol}&token=${FINNHUB_API_KEY}`,
        { next: { revalidate: 3600 } }
      )
      return {
        exchange: data?.exchange || "NASDAQ",
        companyName: data?.name || symbol,
        finnhubIndustry: data?.finnhubIndustry,
        ipo: data?.ipo,
        marketCapitalization: data?.marketCapitalization,
        logo: data?.logo,
        weburl: data?.weburl,
        country: data?.country,
        city: data?.city
      }
    } catch {
      return { exchange: "NASDAQ", companyName: symbol }
    }
  }

const getFundamentals = (symbol: string) =>
  FINNHUB_API_KEY
    ? fetchJSON(
        `${FINNHUB_BASE_URL}/stock/metric?symbol=${symbol}&metric=all&token=${FINNHUB_API_KEY}`,
        { next: { revalidate: 3600 } }
      )
    : null

const getNews = async (symbol: string) => {
  if (!FINNHUB_API_KEY) return []

  const today = new Date()
  const weekAgo = new Date(today.getTime() - 7 * 86400000)

  const from = weekAgo.toISOString().split("T")[0]
  const to = today.toISOString().split("T")[0]

  const data = await fetchJSON(
    `${FINNHUB_BASE_URL}/company-news?symbol=${symbol}&from=${from}&to=${to}&token=${FINNHUB_API_KEY}`,
    { next: { revalidate: 1800 } }
  )

  return Array.isArray(data) ? data.slice(0, 8) : []
}

/* -------------------------------------------------------------------------- */
/*                               FORMAT HELPERS                               */
/* -------------------------------------------------------------------------- */

const formatNumber = (v?: number | null, d = 2) => {
  if (v === undefined || v === null || Number.isNaN(v)) return "N/A"
  return v.toFixed(d)
}

const formatMoney = (v?: number | null) => {
  if (v === undefined || v === null) return "N/A"
  if (v >= 1e12) return `$${(v / 1e12).toFixed(2)}T`
  if (v >= 1e9) return `$${(v / 1e9).toFixed(2)}B`
  if (v >= 1e6) return `$${(v / 1e6).toFixed(2)}M`
  return `$${v.toLocaleString()}`
}

const getSignal = (dp: number) => {
  if (dp >= 5) return "🔥 STRONG BUY"
  if (dp >= 2) return "📈 BUY"
  if (dp <= -5) return "🔥 STRONG SELL"
  if (dp <= -2) return "📉 SELL"
  return "➖ HOLD"
}

/* -------------------------------------------------------------------------- */
/*                                  PAGE                                      */
/* -------------------------------------------------------------------------- */

export default async function WatchlistPage({
  searchParams,
}: {
  searchParams: Promise<{ symbol?: string }>
}) {
  const params = await searchParams
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session?.user?.email) redirect("/sign-in")

  const symbols = await getWatchlistSymbolsByEmail(session.user.email)

  if (!symbols?.length) {
    return (
      <div className="container mx-auto mt-20 text-center">
        <h2 className="text-xl text-muted-foreground">Your watchlist is empty</h2>
      </div>
    )
  }

  const activeSymbol =
    params.symbol && symbols.includes(params.symbol)
      ? params.symbol
      : symbols[0]

  /* ----------------------------- WATCHLIST ROWS ---------------------------- */

  const [quotes, profiles, fundamentalsAll] = await Promise.all([
    Promise.all(symbols.map(getQuote)),
    Promise.all(symbols.map(getSymbolInfo)),
    Promise.all(symbols.map(getFundamentals))
  ])

  const watchlistData = symbols.map((symbol, i) => {
    const q = quotes[i]
    const p = profiles[i]
    const f = fundamentalsAll[i]?.metric
    const marketCap = p.marketCapitalization != null ? p.marketCapitalization * 1_000_000 : undefined

    return {
      userId: session.user.email,
      symbol,
      company: p.companyName,
      exchange: p.exchange,
      addedAt: new Date(),
      priceFormatted: q?.c !== undefined ? `$${q.c.toFixed(2)}` : "-",
      changeFormatted: q?.dp !== undefined
        ? `${q.dp >= 0 ? "+" : ""}${q.dp.toFixed(2)}%`
        : "-",
      changePercent: q?.dp ?? 0,
      alert: getSignal(q?.dp ?? 0),
      marketCap: formatMoney(marketCap),
      peRatio: f?.forwardPE ? f.forwardPE.toFixed(2) : null,
    }
  })

  /* ----------------------------- ACTIVE SYMBOL ----------------------------- */

  const [profile, fundamentals, news] = await Promise.all([
    getSymbolInfo(activeSymbol),
    getFundamentals(activeSymbol),
    getNews(activeSymbol),
  ])

  const exchange = profile.exchange || "NASDAQ"
  const metrics = fundamentals?.metric

  const scriptUrl =
    "https://s3.tradingview.com/external-embedding/embed-widget-"

  /* ------------------------------------------------------------------------ */

  return (
        <div className="flex flex-col min-h-screen w-full">
          <div className="w-full pt-4">
            <TickerTapeWidget />
          </div>
          <div className="container mx-auto mt-10 px-6 pb-12 w-full">
          <h1 className="text-3xl font-bold text-foreground mb-8 animate-fade-up">My Watchlist</h1>

          {/* WATCHLIST + PROFILE */}
            <section className="flex flex-col lg:flex-row gap-8 mb-10">
  {/* -------------------- LEFT COLUMN -------------------- */}
  <div className="flex-1 flex flex-col gap-8">
    {/* Watchlist Table */}
    <div className="bg-card rounded-xl border border-border/50 flex flex-col h-[380px] card-hover transition-all duration-300">
      {/* Header */}
      <div className="px-6 py-6 border-b border-border/50 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground transition-all duration-300">
          Watchlist ({symbols.length})
        </h3>
      </div>

      {/* Scrollable Table */}
      <div className="flex-1 overflow-y-auto p-4">
        <ClientWatchlistTable watchlistData={watchlistData} />
      </div>
    </div>

  {/* TradingView Technical Analysis Widget */}
  <div className="bg-card rounded-xl border border-border/50 p-5 h-[460px] card-hover transition-all duration-300 hover:scale-[1.01]">
    <TradingViewWidget
      scriptUrl={`${scriptUrl}technical-analysis.js`}
      config={{
        ...TECHNICAL_ANALYSIS_WIDGET_CONFIG,
        symbol: activeSymbol.toUpperCase(),
      }}
      showBorder={false}
    />
  </div>
  </div>

  {/* -------------------- RIGHT COLUMN -------------------- */}
  <div className="w-full lg:w-[380px] flex flex-col gap-8">
    {/* TradingView Single Quote Widget */}
    <div className="bg-card rounded-xl border border-border/50 p-4 h-[220px] card-hover transition-all duration-300 hover:scale-[1.01]">
      <TradingViewWidget
        scriptUrl={`${scriptUrl}single-quote.js`}
        config={{
          ...SINGLE_QUOTE_WIDGET_CONFIG,
          symbol: activeSymbol.toUpperCase(),
        }}
        height={180}
        className="bg-transparent"
        showBorder={false}
      />
    </div>

    {/* Profile Card */}
    <div className="bg-card rounded-xl border border-border/50 p-5 flex flex-col h-[380px] card-hover transition-all duration-300 hover:scale-[1.01]">
      {/* Logo + Name */}
      <div className="flex items-center mb-4 space-x-3 transition-all duration-300">
        {profile.logo && (
          <img
            src={profile.logo}
            alt="Logo"
            className="w-10 h-10 object-contain rounded hover:scale-110 transition-transform duration-300"
          />
        )}
        <h3 className="text-lg font-semibold text-foreground transition-all duration-300">
          {profile.companyName || activeSymbol}
        </h3>
      </div>

      {/* Scrollable Details */}
      <div className="flex-1 overflow-y-auto space-y-2 text-sm">
        <Row label="Exchange" value={exchange} />
        <Row label="Sector" value={profile?.finnhubIndustry} />
        <Row label="IPO" value={profile?.ipo} />
        {profile.country && <Row label="Country" value={profile.country} />}
        {profile.city && <Row label="City" value={profile.city} />}
        {(() => {
          const marketCap = profile?.marketCapitalization != null ? profile.marketCapitalization * 1_000_000 : undefined;
          return <Row label="Market Cap" value={formatMoney(marketCap)} />;
        })()}
        {fundamentals?.metric?.sharesOutstanding && (
          <Row
            label="Shares Outstanding"
            value={formatNumber(fundamentals.metric.sharesOutstanding)}
          />
        )}
        {fundamentals?.metric?.dividendYield && (
          <Row
            label="Dividend Yield"
            value={`${formatNumber(fundamentals.metric.dividendYield * 100)}%`}
          />
        )}
        {profile.weburl && (
          <Row
            label="Website"
            value={
              <a
                href={profile.weburl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-trade-blue underline hover:text-trade-blue/80 transition-colors duration-300"
              >
                {profile.weburl}
              </a>
            }
          />
        )}
      </div>
    </div>

    {/* Key Metrics */}
    <div className="bg-card rounded-xl border border-border/50 p-5 flex flex-col h-[460px] card-hover transition-all duration-300 hover:scale-[1.01]">
      <h3 className="text-lg font-semibold text-foreground mb-4 transition-all duration-300">
        Key Metrics
      </h3>

      <div className="flex-1 overflow-y-auto flex flex-col space-y-2">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <Metric label="EPS (TTM)" value={formatNumber(metrics?.epsTTM)} />
          <Metric label="ROE (TTM)" value={formatNumber(metrics?.roeTTM)} />
          <Metric label="Beta" value={formatNumber(metrics?.beta)} />
          <Metric label="Forward P/E" value={formatNumber(metrics?.forwardPE)} />
          <Metric label="EV/EBITDA (TTM)" value={formatNumber(metrics?.evEbitdaTTM)} />
          <Metric label="FCF/Share (TTM)" value={formatNumber(metrics?.cashFlowPerShareTTM)} />
          <Metric label="Gross Margin (TTM)" value={formatNumber(metrics?.grossMarginTTM)} />
          <Metric label="52W High" value={formatNumber(metrics?.["52WeekHigh"])} />
          <Metric label="52W Low" value={formatNumber(metrics?.["52WeekLow"])} />
          <Metric label="Market Cap" value={formatMoney(metrics?.marketCapitalization != null ? metrics.marketCapitalization * 1_000_000 : undefined)} />
        </div>
      </div>
    </div>
  </div>
</section>

      {/* NEWS */}
      <section className="bg-card rounded-xl border border-border/50 p-5 h-[360px] flex flex-col card-hover transition-all duration-300 hover:scale-[1.01]">
        <h3 className="text-lg font-semibold text-foreground mb-4 transition-all duration-300">
          Latest News: {activeSymbol}
        </h3>
        <div className="flex-1 overflow-y-auto space-y-3 pr-2">
          {news.map((n: any, i: number) => (
            <a
              key={i}
              href={n.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-3 rounded bg-muted/30 hover:bg-muted/50 hover:translate-x-1 transition-all duration-300"
            >
              <h4 className="text-sm font-medium text-foreground line-clamp-2 transition-all duration-300">
                {n.headline}
              </h4>
              <p className="text-xs text-muted-foreground mt-1 transition-all duration-300">
                {n.source} ·{" "}
                {new Date(n.datetime * 1000).toLocaleDateString()}
              </p>
            </a>
          ))}
        </div>
      </section>
    </div>
  </div>
  )
}

/* -------------------------------------------------------------------------- */
/*                              SMALL COMPONENTS                              */
/* -------------------------------------------------------------------------- */

function Row({ label, value }: { label: string; value?: string | ReactNode }) {
  return (
    <div className="flex justify-between border-b border-border/50 py-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground">{value || "-"}</span>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  const isNA = value === "N/A"

  return (
    <div className="bg-muted/40 rounded-lg p-3 border border-border/50 flex flex-col justify-between h-[80px] min-h-[80px]">
      <span className="text-xs text-muted-foreground block mb-1 truncate">{label}</span>
      <span
        className={`text-lg font-semibold truncate ${
          isNA ? "text-muted-foreground" : "text-foreground"
        }`}
      >
        {value}
      </span>
    </div>
  )
}