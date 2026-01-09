export const PERSONALIZED_WELCOME_EMAIL_PROMPT = `Generate highly personalized HTML content that will be inserted into an email template at the {{intro}} placeholder.

User profile data:
{{userProfile}}

PERSONALIZATION REQUIREMENTS:
You MUST create content that is obviously tailored to THIS specific user by:

IMPORTANT: Do NOT start the personalized content with "Welcome" since the email header already says "Welcome aboard {{name}}". Use alternative openings like "Thanks for joining", "Great to have you", "You're all set", "Perfect timing", etc.

1. **Direct Reference to User Details**: Extract and use specific information from their profile:
   - Their exact investment goals or objectives
   - Their stated risk tolerance level
   - Their preferred sectors/industries mentioned
   - Their experience level or background
   - Any specific stocks/companies they're interested in
   - Their investment timeline (short-term, long-term, retirement)

2. **Contextual Messaging**: Create content that shows you understand their situation:
   - New investors → Reference learning/starting their journey
   - Experienced traders → Reference advanced tools/strategy enhancement  
   - Retirement planning → Reference building wealth over time
   - Specific sectors → Reference those exact industries by name
   - Conservative approach → Reference safety and informed decisions
   - Aggressive approach → Reference opportunities and growth potential

3. **Personal Touch**: Make it feel like it was written specifically for them:
   - Use their goals in your messaging
   - Reference their interests directly
   - Connect features to their specific needs
   - Make them feel understood and seen

CRITICAL FORMATTING REQUIREMENTS:
- Return ONLY clean HTML content with NO markdown, NO code blocks, NO backticks
- Use SINGLE paragraph only: <p class="mobile-text" style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">content</p>
- Write exactly TWO sentences (add one more sentence than current single sentence)
- Keep total content between 35-50 words for readability
- Use <strong> for key personalized elements (their goals, sectors, etc.)
- DO NOT include "Here's what you can do right now:" as this is already in the template
- Make every word count toward personalization
- Second sentence should add helpful context or reinforce the personalization

Example personalized outputs (showing obvious customization with TWO sentences):
<p class="mobile-text" style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">Thanks for joining MarketPulse! As someone focused on <strong>technology growth stocks</strong>, you'll love our real-time alerts for companies like the ones you're tracking. We'll help you spot opportunities before they become mainstream news.</p>

<p class="mobile-text" style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">Great to have you aboard! Perfect for your <strong>conservative retirement strategy</strong> — we'll help you monitor dividend stocks without overwhelming you with noise. You can finally track your portfolio progress with confidence and clarity.</p>

<p class="mobile-text" style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">You're all set! Since you're new to investing, we've designed simple tools to help you build confidence while learning the <strong>healthcare sector</strong> you're interested in. Our beginner-friendly alerts will guide you without the confusing jargon.</p>`

export const NEWS_SUMMARY_EMAIL_PROMPT = `Generate HTML content for a market news summary email that will be inserted into the NEWS_SUMMARY_EMAIL_TEMPLATE at the {{newsContent}} placeholder.

News data to summarize:
{{newsData}}

CRITICAL FORMATTING REQUIREMENTS:
- Return ONLY clean HTML content with NO markdown, NO code blocks, NO backticks
- Structure content with clear sections using proper HTML headings and paragraphs
- Use these specific CSS classes and styles to match the email template:

SECTION HEADINGS (for categories like "Market Highlights", "Top Movers", etc.):
<h3 class="mobile-news-title dark-text" style="margin: 30px 0 15px 0; font-size: 18px !important; font-weight: 600 !important; color: #f8fafc !important; line-height: 1.3;">Section Title</h3>

PARAGRAPHS (for news content):
<p class="mobile-text dark-text-secondary" style="margin: 0 0 20px 0 !important; font-size: 16px !important; line-height: 1.6; color: #94a3b8 !important;">Content goes here</p>

STOCK/COMPANY MENTIONS:
<strong style="color: #10b981 !important;">Stock Symbol</strong> for ticker symbols
<strong style="color: #e2e8f0 !important;">Company Name</strong> for company names

PERFORMANCE INDICATORS:
Use 📈 for gains, 📉 for losses, 📊 for neutral/mixed

NEWS ARTICLE STRUCTURE:
For each individual news item within a section, use this structure:
1. Article container with visual styling and icon
2. Article title as a subheading
3. Key takeaways in bullet points (2-3 actionable insights)
4. "What this means" section for context
5. "Read more" link to the original article
6. Visual divider between articles

ARTICLE CONTAINER:
Wrap each article in a clean, simple container:
<div class="dark-info-box" style="background-color: #1a1f2e !important; padding: 24px !important; margin: 20px 0 !important; border-radius: 8px !important;">

ARTICLE TITLES:
<h4 class="dark-text" style="margin: 0 0 16px 0 !important; font-size: 18px !important; font-weight: 600 !important; color: #e2e8f0 !important; line-height: 1.4;">
Article Title Here
</h4>

BULLET POINTS (minimum 3 concise insights):
Use this format with clear, concise explanations (no label needed):
<ul style="margin: 16px 0 20px 0 !important; padding-left: 0; margin-left: 0; list-style: none;">
  <li class="dark-text-secondary" style="margin: 0 0 16px 0 !important; padding: 0; margin-left: 0; font-size: 15px !important; line-height: 1.6; color: #94a3b8 !important;">
    <span style="color: #10b981 !important; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Clear, concise explanation in simple terms that's easy to understand quickly.
  </li>
  <li class="dark-text-secondary" style="margin: 0 0 16px 0 !important; padding: 0; margin-left: 0; font-size: 15px !important; line-height: 1.6; color: #94a3b8 !important;">
    <span style="color: #10b981 !important; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Brief explanation with key numbers and what they mean in everyday language.
  </li>
  <li class="dark-text-secondary" style="margin: 0 0 16px 0 !important; padding: 0; margin-left: 0; font-size: 15px !important; line-height: 1.6; color: #94a3b8 !important;">
    <span style="color: #10b981 !important; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Simple takeaway about what this means for regular people's money.
  </li>
</ul>

INSIGHT SECTION:
Add simple context explanation:
<div style="background-color: #0f1218 !important; border: 1px solid #2d3548 !important; padding: 15px !important; border-radius: 6px !important; margin: 16px 0 !important;">
<p class="dark-text-secondary" style="margin: 0 !important; font-size: 14px !important; color: #94a3b8 !important; line-height: 1.4;">💡 <strong style="color: #10b981 !important;">Bottom Line:</strong> Simple explanation of why this news matters to your money in everyday language.</p>
</div>

READ MORE BUTTON:
<div style="margin: 20px 0 0 0 !important;">
<a href="ARTICLE_URL" style="color: #10b981 !important; text-decoration: none !important; font-weight: 500 !important; font-size: 14px !important;" target="_blank" rel="noopener noreferrer">Read Full Story →</a>
</div>

ARTICLE DIVIDER:
Close each article container:
</div>

SECTION DIVIDERS:
Between major sections, use:
<div style="border-top: 1px solid #374151; margin: 32px 0 24px 0;"></div>

Content guidelines:
- Organize news into logical sections with icons (📊 Market Overview, 📈 Top Gainers, 📉 Top Losers, 🔥 Breaking News, 💼 Earnings Reports, 🏛️ Economic Data, etc.)
- NEVER repeat section headings - use each section type only once per email
- For each news article, include its actual headline/title from the news data
- Provide MINIMUM 3 CONCISE bullet points (NO "Key Takeaways" label - start directly with bullets)
- Each bullet should be SHORT and EASY TO UNDERSTAND - one clear sentence preferred
- Use PLAIN ENGLISH - avoid jargon, complex financial terms, or insider language
- Explain concepts as if talking to someone new to investing
- Include specific numbers but explain what they mean in simple terms
- Add "Bottom Line" context in everyday language anyone can understand
- Use clean, light design with yellow bullets for better readability
- Make each article easy to scan with clear spacing and structure
- Always include simple "Read Full Story" buttons with actual URLs
- Focus on PRACTICAL insights regular people can understand and use
- Explain what the news means for regular investors' money
- Keep language conversational and accessible to everyone
- Prioritize BREVITY and CLARITY over detailed explanations

Example structure:
<h3 class="mobile-news-title dark-text" style="margin: 30px 0 15px 0; font-size: 20px !important; font-weight: 600 !important; color: #f8fafc !important; line-height: 1.3;">📊 Market Overview</h3>

<div class="dark-info-box" style="background-color: #1a1f2e !important; padding: 24px !important; margin: 20px 0 !important; border-radius: 8px !important;">
<h4 class="dark-text" style="margin: 0 0 16px 0 !important; font-size: 18px !important; font-weight: 600 !important; color: #10b981 !important; line-height: 1.4;">
Stock Market Had Mixed Results Today
</h4>

<ul style="margin: 16px 0 20px 0 !important; padding-left: 0; margin-left: 0; list-style: none;">
  <li class="dark-text-secondary" style="margin: 0 0 16px 0 !important; padding: 0; margin-left: 0; font-size: 15px !important; line-height: 1.6; color: #94a3b8 !important;">
    <span style="color: #10b981 !important; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Tech stocks like Apple went up 1.2% today, which is good news for tech investors.
  </li>
  <li class="dark-text-secondary" style="margin: 0 0 16px 0 !important; padding: 0; margin-left: 0; font-size: 15px !important; line-height: 1.6; color: #94a3b8 !important;">
    <span style="color: #10b981 !important; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Traditional companies went down 0.3%, showing investors prefer tech right now.
  </li>
  <li class="dark-text-secondary" style="margin: 0 0 16px 0 !important; padding: 0; margin-left: 0; font-size: 15px !important; line-height: 1.6; color: #94a3b8 !important;">
    <span style="color: #10b981 !important; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>High trading volume (12.4 billion shares) shows investors are confident and active.
  </li>
</ul>

<div style="background-color: #0f1218 !important; border: 1px solid #2d3548 !important; padding: 15px !important; border-radius: 6px !important; margin: 16px 0 !important;">
<p class="dark-text-secondary" style="margin: 0 !important; font-size: 14px !important; color: #94a3b8 !important; line-height: 1.4;">💡 <strong style="color: #10b981 !important;">Bottom Line:</strong> If you own tech stocks, today was good for you. If you're thinking about investing, tech companies might be a smart choice right now.</p>
</div>

<div style="margin: 20px 0 0 0 !important;">
<a href="https://example.com/article1" style="color: #10b981 !important; text-decoration: none !important; font-weight: 500 !important; font-size: 14px !important;" target="_blank" rel="noopener noreferrer">Read Full Story →</a>
</div>
</div>

<div style="border-top: 1px solid #2d3548 !important; margin: 32px 0 24px 0 !important;"></div>

<h3 class="mobile-news-title dark-text" style="margin: 30px 0 15px 0; font-size: 20px !important; font-weight: 600 !important; color: #f8fafc !important; line-height: 1.3;">📈 Top Gainers</h3>

<div class="dark-info-box" style="background-color: #1a1f2e !important; padding: 24px !important; margin: 20px 0 !important; border-radius: 8px !important;">
<h4 class="dark-text" style="margin: 0 0 16px 0 !important; font-size: 18px !important; font-weight: 600 !important; color: #10b981 !important; line-height: 1.4;">
Apple Stock Jumped After Great Earnings Report
</h4>

<ul style="margin: 16px 0 20px 0 !important; padding-left: 0; margin-left: 0; list-style: none;">
  <li class="dark-text-secondary" style="margin: 0 0 16px 0 !important; padding: 0; margin-left: 0; font-size: 15px !important; line-height: 1.6; color: #94a3b8 !important;">
    <span style="color: #10b981 !important; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Apple stock jumped 5.2% after beating earnings expectations.
  </li>
  <li class="dark-text-secondary" style="margin: 0 0 16px 0 !important; padding: 0; margin-left: 0; font-size: 15px !important; line-height: 1.6; color: #94a3b8 !important;">
    <span style="color: #10b981 !important; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>iPhone sales expected to grow 8% next quarter despite economic uncertainty.
  </li>
  <li class="dark-text-secondary" style="margin: 0 0 16px 0 !important; padding: 0; margin-left: 0; font-size: 15px !important; line-height: 1.6; color: #94a3b8 !important;">
    <span style="color: #10b981 !important; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>App store and services revenue hit $22.3 billion (up 14%), providing steady income.
  </li>
</ul>

<div style="background-color: #0f1218 !important; border: 1px solid #2d3548 !important; padding: 15px !important; border-radius: 6px !important; margin: 16px 0 !important;">
<p class="dark-text-secondary" style="margin: 0 !important; font-size: 14px !important; color: #94a3b8 !important; line-height: 1.4;">💡 <strong style="color: #10b981 !important;">Bottom Line:</strong> Apple is making money in different ways (phones AND services), so it's a pretty safe stock to own even when the economy gets shaky.</p>
</div>

<div style="margin: 20px 0 0 0 !important;">
<a href="https://example.com/article2" style="color: #10b981 !important; text-decoration: none !important; font-weight: 500 !important; font-size: 14px !important;" target="_blank" rel="noopener noreferrer">Read Full Story →</a>
</div>
</div>
`;

export const TRADINGVIEW_SYMBOL_MAPPING_PROMPT = `You are an expert in financial markets and trading platforms. Your task is to find the correct TradingView symbol that corresponds to a given Finnhub stock symbol.

Stock information from Finnhub:
Symbol: {{symbol}}
Company: {{company}}
Exchange: {{exchange}}
Currency: {{currency}}
Country: {{country}}

IMPORTANT RULES:
1. TradingView uses specific symbol formats that may differ from Finnhub
2. For US stocks: Usually just the symbol (e.g., AAPL for Apple)
3. For international stocks: Often includes exchange prefix (e.g., NASDAQ:AAPL, NYSE:MSFT, LSE:BARC)
4. Some symbols may have suffixes for different share classes
5. ADRs and foreign stocks may have different symbol formats

RESPONSE FORMAT:
Return ONLY a valid JSON object with this exact structure:
{
  "tradingViewSymbol": "EXCHANGE:SYMBOL",
  "confidence": "high|medium|low",
  "reasoning": "Brief explanation of why this mapping is correct"
}

EXAMPLES:
- Apple Inc. (AAPL) from Finnhub → {"tradingViewSymbol": "NASDAQ:AAPL", "confidence": "high", "reasoning": "Apple trades on NASDAQ as AAPL"}
- Microsoft Corp (MSFT) from Finnhub → {"tradingViewSymbol": "NASDAQ:MSFT", "confidence": "high", "reasoning": "Microsoft trades on NASDAQ as MSFT"}
- Barclays PLC (BARC.L) from Finnhub → {"tradingViewSymbol": "LSE:BARC", "confidence": "high", "reasoning": "Barclays trades on London Stock Exchange as BARC"}

Your response must be valid JSON only. Do not include any other text.`



export const NEWS_SECTION_PROMPT = `
You are generating HTML content to be injected INSIDE an existing email template.

CRITICAL RULES:
- Output ONLY valid HTML
- NO markdown
- NO <html>, <head>, <body>
- Use inline styles only (no CSS classes or <style> tags)
- Email clients often strip <style> tags, so inline styles are REQUIRED
- Colors MUST use !important to prevent email client dark mode overrides

SECTION TYPE:
{{sectionType}}

NEWS DATA (JSON):
{{newsData}}

REQUIRED STRUCTURE PER ARTICLE (USE INLINE STYLES WITH !IMPORTANT):

<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #1a1f2e !important; border: 1px solid #2d3548 !important; border-radius: 10px; margin-bottom: 20px; overflow: hidden;">
  <tr>
    <td style="padding: 24px !important;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
          <td style="padding-bottom: 12px !important;">
            <!-- Meta row with ticker and source -->
            <span style="display: inline-block; background: rgba(16, 185, 129, 0.15) !important; border: 1px solid rgba(16, 185, 129, 0.4) !important; border-radius: 4px; padding: 4px 10px; font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif; font-size: 11px !important; font-weight: 700 !important; color: #10b981 !important; letter-spacing: 0.5px;">
              TICKER
            </span>
            <span style="font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif; font-size: 12px !important; color: #64748b !important; margin-left: 12px;">
              Source
            </span>
          </td>
        </tr>
        <tr>
          <td style="padding-bottom: 12px !important;">
            <a href="ARTICLE_URL" target="_blank" rel="noopener noreferrer" style="font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif; font-size: 16px !important; font-weight: 600 !important; color: #e2e8f0 !important; text-decoration: none !important; line-height: 1.4;">
              Article Headline Here
            </a>
          </td>
        </tr>
        <tr>
          <td>
            <p style="font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif; font-size: 14px !important; color: #94a3b8 !important; margin: 0 0 15px 0 !important; line-height: 1.6;">
              1–2 sentence neutral market summary written for investors.
            </p>
            <a href="ARTICLE_URL" target="_blank" rel="noopener noreferrer" style="font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif; font-size: 13px !important; font-weight: 600 !important; color: #10b981 !important; text-decoration: none !important;">
              Read full story <span style="display: inline-block; margin-left: 4px;">→</span>
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>

OUTPUT:
- Generate EXACTLY 3 articles
- If sectionType is "general", omit the ticker badge span (keep only the source)
- Use actual TICKER symbol from news data (e.g., AAPL, TSLA)
- Use actual source name from news data (e.g., Reuters, CNBC)
- Use actual article headline from news data
- Use actual article URL from news data for href
- Headlines must be concise
- Summaries must be factual, not hype
- Add spacing between articles with margin-bottom on the table
`;
