# Ticker Insight

A single-page, client-side stock research tool. Enter a ticker and it pulls together:

- **News & sentiment** — recent headlines with an overall bullish/bearish read, from Alpha Vantage's `NEWS_SENTIMENT` endpoint.
- **Reputation on X** — live post volume/sentiment if you supply your own X (Twitter) API bearer token; otherwise falls back to a news-based buzz proxy. (X's API requires a paid tier and generally blocks direct browser requests via CORS — this is best-effort.)
- **Fundamental analysis** — valuation, margins, and YoY revenue/net income growth pulled from `OVERVIEW`, `INCOME_STATEMENT`, and `BALANCE_SHEET`.
- **Sector & competitor standing** — compares the company's P/E, margin, and growth against fixed reference benchmarks per sector, plus a list of well-known peers in that sector.

## Setup

No build step — it's a single static HTML file.

1. Open `index.html` in a browser (or enable **GitHub Pages** on this repo: Settings → Pages → Deploy from branch → `main` → `/root`).
2. Click **API keys**, paste in a free [Alpha Vantage](https://www.alphavantage.co/support/#api-key) key (required), and optionally an X API bearer token.
3. Enter a ticker and press **Analyze**.

Keys are stored only in your own browser's local storage — nothing is sent anywhere except Alpha Vantage/X directly from your browser.

## Notes & limitations

- Alpha Vantage's free tier is rate-limited (~25 requests/day, ~1 request/second); each analysis uses 5 calls, made one at a time with a short delay between them to stay under the per-second limit.
- Sector comparisons use fixed, approximate reference numbers — not live competitor financials — so treat the sector ranking as a rough compass, not a precise leaderboard.
- This is an educational tool, not investment advice.
