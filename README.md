# MarketPulse

A modern, full-featured stock analysis and monitoring platform built with Next.js 16.1.1. MarketPulse provides real-time stock data, interactive charts, personalized watchlists, and AI-powered news summaries delivered directly to your inbox.

## ✨ Features

### 📊 Dashboard & Charts
- **Interactive TradingView Widgets** - Professional-grade stock charts with multiple view options
- **Market Overview** - Real-time visualization of major market indices (Indices, Stocks, Crypto)
- **Ticker Tape** - Scrolling ticker showing major indices and popular stocks
- **Hot Lists** - Top gainers, losers, and most active stocks
- **Stock Heatmap** - Visual representation of market performance by sector
- **Technical Analysis** - Built-in technical indicators and analysis tools

### 🔔 Watchlist Management
- **Personal Watchlists** - Create and manage custom stock watchlists
- **Real-time Price Updates** - Live stock prices with change percentages
- **Key Metrics Display** - Market cap, P/E ratios, and custom alerts
- **Quick Actions** - Buy/Sell quick links to TradingView
- **One-Click Add** - Add stocks to watchlist directly from search

### 🔍 Stock Search
- **Smart Search** - Quick search for stocks, ETFs, and crypto via Finnhub API
- **Command Palette** - Press `Cmd+K` (or `Ctrl+K`) to open quick search
- **Popular Stocks** - Browse top-traded stocks across categories
- **Company Profiles** - Detailed company information and financials
- **Watchlist Status** - See which stocks are already in your watchlist

### 📧 Email Notifications
- **Daily News Summaries** - Personalized news based on your watchlist
- **AI-Powered Content** - Gemini-generated welcome emails tailored to your preferences
- **Welcome Emails** - Personalized onboarding with investment tips
- **Unsubscribe Management** - Easy email subscription management with token verification
- **Subscription Toggle** - Opt in/out of daily news emails from settings

### 👤 User Features
- **Secure Authentication** - Email/password login with better-auth
- **Subscription Management** - Toggle email preferences from settings page
- **User Profiles** - Store investment preferences, goals, risk tolerance, and country
- **Profile Picture** - Custom avatar support via URL (Gravatar compatible)
- **Account Deletion** - Permanently delete account with secure confirmation flow
- **Responsive Design** - Works seamlessly on all devices, including mobile
- **Keyboard Shortcuts** - Quick navigation with keyboard commands

### 📈 Analytics
- **Google Analytics** - Track user behavior and app performance

## 🛠 Tech Stack

### Framework & Core
- **Next.js 16.1.1** - React framework with App Router
- **TypeScript 5** - Type-safe development
- **Node.js v22.20.0** - Runtime environment
- **React 19.2.3** - UI library
- **React DOM 19.2.3** - React rendering

### Database & Caching
- **MongoDB 7.0** - Primary database with Mongoose ODM
- **Redis** - Caching and session management via ioredis

### Authentication
- **Better-Auth 1.4.9** - Secure authentication with MongoDB adapter
- **Session Management** - Secure cookie-based sessions

### UI & Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible UI components
- **Shadcn/ui** - Beautiful, reusable component library
- **Lucide React** - Consistent icon library
- **Tailwind Animate CSS** - Smooth animations

### Charts & Data
- **TradingView Widgets** - Professional financial charts and market data
- **Finnhub API** - Real-time stock market data and news

### Background Processing
- **Inngest 3.48.1** - Event-driven background jobs
- **Scheduled Tasks** - Daily news digest at 12:00 UTC
- **Cron Jobs** - Automated recurring tasks

### Email Services
- **Nodemailer 7.0.12** - Email sending infrastructure
- **HTML Templates** - Responsive, styled email templates
- **Welcome Emails** - Personalized AI-generated onboarding
- **Daily Digests** - Curated news based on user watchlists

### AI Integration
- **Google Gemini API** - AI-powered content generation for personalized emails

### Forms & Validation
- **React Hook Form 7.69.0** - Form management
- **Zod** - Schema validation

### Notifications
- **Sonner 2.0.7** - Toast notifications

### Third Parties
- **@next/third-parties 16.1.1** - Google Analytics integration

## 📁 Project Structure

```
stock-analysis/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── inngest/       # Inngest webhooks for background jobs
│   │   ├── subscribe/     # Subscription management endpoints
│   │   └── unsubscribe/   # Unsubscribe handler
│   ├── (auth)/            # Authentication pages (sign-in, sign-up)
│   ├── (root)/            # Main application pages
│   ├── unsubscribe/       # Unsubscribe landing page
│   └── global.css         # Global styles
├── components/            # React components
│   ├── ui/               # UI primitives (Shadcn/ui)
│   │   ├── avatar.tsx
│   │   ├── button.tsx
│   │   ├── command.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── popover.tsx
│   │   ├── select.tsx
│   │   ├── sonner.tsx
│   │   └── table.tsx
│   ├── forms/            # Form components
│   │   ├── CountrySelectField.tsx
│   │   ├── FooterLink.tsx
│   │   ├── InputField.tsx
│   │   └── SelectField.tsx
│   ├── AuthRightSection.tsx
│   ├── ClientWatchlistTable.tsx
│   ├── DeleteAccountSettings.tsx
│   ├── Header.tsx
│   ├── NavItems.tsx
│   ├── NotificationSettings.tsx
│   ├── ProfilePictureSettings.tsx
│   ├── SearchCommand.tsx
│   ├── TradingViewMarketOverview.tsx
│   ├── TradingViewWidget.tsx
│   ├── UserDropdown.tsx
│   ├── WatchlistButton.tsx
│   └── WatchlistTable.tsx
├── database/             # Database configuration
│   └── mongoose.ts       # MongoDB connection
├── database/models/      # Mongoose models
│   └── watchlist.model.ts
├── hooks/                # Custom React hooks
│   ├── useDebounce.ts
│   └── useTradingViewWidget.tsx
├── lib/                  # Utility functions & configurations
│   ├── actions/          # Server actions
│   │   ├── auth.actions.ts
│   │   ├── finnhub.actions.ts
│   │   ├── user.actions.ts
│   │   └── watchlist.actions.ts
│   ├── better-auth/      # Authentication config
│   │   └── auth.ts
│   ├── cache/            # Caching utilities
│   │   └── news.cache.ts
│   ├── inngest/          # Background job functions
│   │   ├── assembleNewsEmail.ts
│   │   ├── client.ts
│   │   ├── functions.ts
│   │   ├── gemini.ts
│   │   ├── newsSections.ts
│   │   └── prompts.ts
│   ├── nodemailer/       # Email services
│   │   ├── checker/
│   │   ├── index.ts
│   │   └── templates.ts
│   ├── redis.ts          # Redis client
│   ├── unsubscribe-token.ts
│   ├── utils.ts
│   └── constants.tsx     # App constants
├── middleware/           # Next.js middleware
│   └── index.ts
├── public/               # Static assets
│   └── assets/          # Images and icons
├── scripts/              # Utility scripts
│   ├── test-db.mjs      # Database connection test
│   └── test-db.ts
├── types/                # TypeScript types
│   └── global.d.ts
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js v22.20.0 or higher
- MongoDB database
- Redis instance
- Finnhub API key
- Google Gemini API key
- SMTP credentials for email
- (Optional) Google Analytics ID

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd stock-analysis
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Configure your `.env` file** (see below)

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `REDIS_URL` | Redis connection string | Yes |
| `BETTER_AUTH_SECRET` | Secret key for authentication | Yes |
| `BETTER_AUTH_URL` | Base URL for authentication | Yes |
| `FINNHUB_API_KEY` | Finnhub API key for stock data | Yes |
| `NEXT_PUBLIC_FINNHUB_API_KEY` | Public Finnhub API key | Yes |
| `FINNHUB_BASE_URL` | Finnhub API base URL | Yes |
| `GOOGLE_GEMINI_KEY` | Google Gemini API key | Yes |
| `SMTP_HOST` | SMTP server hostname | Yes |
| `SMTP_PORT` | SMTP server port | Yes |
| `SMTP_USER` | SMTP username | Yes |
| `SMTP_PASSWORD` | SMTP password | Yes |
| `SMTP_FROM` | From email address | Yes |
| `NEXT_PUBLIC_APP_URL` | Public app URL | Yes |
| `NEXT_PUBLIC_GA_ID` | Google Analytics measurement ID | No |

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test:db` | Test database connection |

## 🔒 Security Features

- **Secure Sessions** - Cookie-based authentication with HttpOnly cookies
- **Input Validation** - Server-side validation for all inputs
- **Environment Variables** - Sensitive data stored securely
- **CORS Protection** - Cross-origin resource sharing controls
- **Rate Limiting** - API rate limiting via Redis
- **Account Deletion** - Secure account removal with confirmation
- **Unsubscribe Tokens** - Secure email unsubscribe with token verification

## 📧 Email Features

### Email Templates
- **Welcome Email** - Personalized onboarding with Gemini AI
- **Daily News Summary** - Curated news based on watchlist
- **Unsubscribe** - One-click unsubscribe with token verification

### Email Schedule
- Daily news summaries sent at 12:00 UTC
- Welcome emails sent immediately upon signup

## ⚙️ Background Jobs (Inngest)

MarketPulse uses Inngest for event-driven background processing:

### Send Sign Up Email
Triggered when a new user creates an account. Generates a personalized welcome email using Google Gemini AI based on user's investment preferences (country, goals, risk tolerance, industry).

**Event:** `app/user.created`

### Send Daily News Summary
Runs daily at 12:00 UTC via cron job. Fetches news for all subscribed users' watchlist stocks, generates personalized content, and sends daily digest emails.

**Schedule:** `0 12 * * *` (Every day at 12:00 UTC)

**Process:**
1. Fetch all subscribed users
2. Collect unique symbols from user watchlists
3. Fetch news for each symbol (capped at 3 articles)
4. Cache news sections for efficiency
5. Generate personalized email content per user
6. Send daily digest emails

## 🗃️ Database Management

### Collections
- **user** - User accounts and preferences
- **watchlist** - User stock watchlists
- **session** - Authentication sessions

### Testing Database Connection

```bash
npm run test:db
```

This script tests connectivity to MongoDB and Redis.

## 🎨 UI Components

### Shadcn/ui Components
- Button, Input, Label, Select
- Dialog, Popover, Dropdown Menu
- Avatar, Table, Command
- Sonner (Toast notifications)

### Custom Components
- `SearchCommand` - Command palette for stock search with Cmd+K shortcut
- `TradingViewWidget` - Embedded TradingView charts
- `TradingViewMarketOverview` - Market indices and sector performance
- `AuthRightSection` - Auth page with ticker tape and hotlists
- `WatchlistTable` - Display user's watchlist stocks
- `ClientWatchlistTable` - Client-side watchlist with real-time updates
- `NotificationSettings` - Toggle email subscription
- `ProfilePictureSettings` - Custom profile avatar management
- `DeleteAccountSettings` - Secure account deletion with confirmation

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd+K` / `Ctrl+K` | Open stock search command palette |

## 🔄 Data Flow

### Watchlist → News → Email Pipeline
1. User adds stocks to watchlist
2. Daily cron job triggers at 12:00 UTC
3. System fetches news for all watchlist symbols
4. News content is cached in Redis
5. Personalized emails assembled per user
6. Nodemailer sends daily digest emails

### Authentication Flow
1. User signs up with email/password
2. Better-Auth creates session
3. User profile stored in MongoDB
4. Welcome email triggered via Inngest
5. User redirected to dashboard

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push

### Docker
```bash
docker build -t marketpulse .
docker run -p 3000:3000 marketpulse
```

### Manual
```bash
npm run build
npm start
```

## 📄 License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

> **Note:** This project was inspired by a [tutorial](https://www.youtube.com/watch?v=gu4pafNCXng) on JSMastery. MarketPulse adds new features on top such as watchlists, unsubscribe management, AI-powered emails, and more.

- [JSMastery](https://www.youtube.com/watch?v=gu4pafNCXng) - Tutorial Inspiration
- [Next.js](https://nextjs.org/) - The React Framework
- [TradingView](https://www.tradingview.com/) - Charting Library
- [Finnhub](https://finnhub.io/) - Stock Market Data
- [Better-Auth](https://www.better-auth.com/) - Authentication
- [Inngest](https://www.inngest.com/) - Background Jobs
- [Google Gemini](https://gemini.google.com/) - AI Processing
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Radix UI](https://www.radix-ui.com/) - UI Components
- [Shadcn/ui](https://ui.shadcn.com/) - Component Library
- [Vercel](https://vercel.com/) - Deployment Platform

