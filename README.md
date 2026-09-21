# Ticker Insight

A client-side stock & ETF research tool, spread across four pages (no build step — plain static HTML/CSS/JS):

- **`index.html`** — cover page with a short pitch and links into the three tools below.
- **`overview.html`** — **Market-moving events**: an upcoming U.S. macro calendar (FOMC meetings, CPI, jobs reports, GDP/PCE) sourced from the official Fed/BLS/BEA schedules, plus an on-demand feed of live market/macro news from Alpha Vantage. Applies to the whole market, no ticker needed.
- **`analyzer.html`** — **Stock Analyzer**: enter a ticker and it pulls together:
  - **News & sentiment** — recent headlines with an overall bullish/bearish read, from Alpha Vantage's `NEWS_SENTIMENT` endpoint.
  - **Community sentiment** — live bullish/bearish tags from [StockTwits](https://stocktwits.com)' free public symbol stream (no account or key needed); falls back to a news-based buzz proxy if StockTwits is unreachable.
  - **Fundamental analysis** — valuation, margins, and YoY revenue/net income growth pulled from `OVERVIEW`, `INCOME_STATEMENT`, and `BALANCE_SHEET`.
  - **Sector & competitor standing** — compares the company's P/E, margin, and growth against fixed reference benchmarks per sector, plus a list of well-known peers in that sector.
- **`etf.html`** — **ETF Analyzer**: enter an ETF ticker and it pulls together, from Alpha Vantage's `ETF_PROFILE` endpoint:
  - **Expense ratio** — the fund's annual fee, with a plain-English **Low / Normal / High** read (under 0.10% is Low, 0.10%–0.50% is Normal, above 0.50% is High).
  - **Fund facts** — net assets, dividend yield, inception date, portfolio turnover, and whether it's a leveraged/inverse fund.
  - **Sector exposure** — a breakdown of the fund's top sectors by weight.
  - **Top holdings** — the fund's largest positions by weight.
  - **Peer ETFs & expense-ratio comparison** — how the fund's expense ratio stacks up against a curated list of well-known ETFs covering the same sector (or broad-market funds if no single sector dominates).

Shared styles live in `style.css` and shared JS helpers (local-storage key handling, the Alpha Vantage fetch wrapper, formatting helpers) live in `shared.js`, loaded by `overview.html`, `analyzer.html`, and `etf.html`.

## Setup

No build step — open any of the HTML files in a browser, or enable **GitHub Pages** on this repo (Settings → Pages → Deploy from branch → `main` → `/ (root)`) and visit the site root.

1. Open the site — you'll land on the cover page.
2. Open **Stock Analyzer** or **ETF Analyzer**, click **API keys**, and paste in a free [Alpha Vantage](https://www.alphavantage.co/support/#api-key) key (required). The key is saved to your browser's local storage and shared across all three tool pages, so **Market Overview**'s "Load latest" news button picks it up automatically too.
3. Enter a ticker and press **Analyze**.

Your key is stored only in your own browser's local storage — nothing is sent anywhere except Alpha Vantage/StockTwits directly from your browser.

## Notes & limitations

- Alpha Vantage's free tier is rate-limited (~25 requests/day, ~1 request/second); each stock analysis uses 5 calls and each ETF analysis uses 2 calls, made one at a time with a short delay between them to stay under the per-second limit. The Market Overview page's news feed uses one more call from the same daily allowance.
- StockTwits' public stream is undocumented and unauthenticated, so it can change or rate-limit without notice — the page falls back to a news-based buzz proxy automatically if it fails.
- Sector and expense-ratio comparisons use fixed, approximate reference numbers — not a live fund/competitor screener — so treat them as a rough compass, not a precise leaderboard.
- The macro calendar is a maintained list, not a live feed — it's built from the Fed/BLS/BEA published schedules and runs through Jan 2027. It'll need a refresh with the next batch of official dates after that (FOMC dates beyond the next meeting are tentative until confirmed at the prior one anyway).
- This is an educational tool, not investment advice.
