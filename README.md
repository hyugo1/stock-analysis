# MarketPulse

A modern, full-featured stock analysis and monitoring platform built with Next.js 16.1.1. MarketPulse provides real-time stock data, interactive charts, personalized watchlists, and AI-powered news summaries delivered directly to your inbox.

## ✨ Features

### 📊 Dashboard & Charts
- **Interactive TradingView Widgets** - Professional-grade stock charts with multiple view options
- **Market Overview** - Real-time visualization of major market indices
- **Stock Heatmap** - Visual representation of market performance by sector
- **Technical Analysis** - Built-in technical indicators and analysis tools

### 🔔 Watchlist Management
- **Personal Watchlists** - Create and manage custom stock watchlists
- **Real-time Price Updates** - Live stock prices with change percentages
- **Key Metrics Display** - Market cap, P/E ratios, and custom alerts
- **Quick Actions** - Buy/Sell quick links to TradingView

### 🔍 Stock Search
- **Smart Search** - Quick search for stocks, ETFs, and crypto
- **Popular Stocks** - Browse top-traded stocks across categories
- **Company Profiles** - Detailed company information and financials

### 📧 Email Notifications
- **Daily News Summaries** - Personalized news based on your watchlist
- **AI-Powered Content** - Gemini-generated insights tailored to your preferences
- **Welcome Emails** - Personalized onboarding with investment tips
- **Unsubscribe Management** - Easy email subscription management

### 👤 User Features
- **Secure Authentication** - Email/password login with better-auth
- **Subscription Management** - Toggle email preferences
- **User Profiles** - Store investment preferences and goals
- **Responsive Design** - Works seamlessly on all devices

## 🛠 Tech Stack

### Framework & Core
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Node.js** - Runtime environment

### Database & Caching
- **MongoDB** - Primary database with Mongoose ODM
- **Redis** - Caching and session management via ioredis

### Authentication
- **Better-Auth** - Secure authentication with MongoDB adapter
- **Session Management** - Secure cookie-based sessions

### UI & Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible UI components
- **Shadcn/ui** - Beautiful, reusable component library
- **Lucide React** - Consistent icon library

### Charts & Data
- **TradingView Widgets** - Professional financial charts
- **Finnhub API** - Real-time stock market data

### Background Processing
- **Inngest** - Event-driven background jobs
- **Scheduled Tasks** - Daily news digest at 12:00 UTC

### Email Services
- **Nodemailer** - Email sending infrastructure
- **HTML Templates** - Responsive, styled email templates

### AI Integration
- **Google Gemini API** - AI-powered content generation

## 📁 Project Structure

```
stock-analysis/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── inngest/       # Inngest webhooks
│   │   ├── subscribe/     # Subscription management
│   │   └── unsubscribe/   # Unsubscribe handler
│   ├── (auth)/            # Authentication pages
│   ├── (root)/            # Main application pages
│   ├── unsubscribe/       # Unsubscribe page
│   └── global.css    # Global styles
├── components/            # React components
│   ├── ui/               # UI primitives (Shadcn/ui)
│   ├── forms/            # Form components
│   ├── ClientWatchlistTable.tsx
│   ├── Header.tsx
│   ├── NavItems.tsx
│   ├── NotificationSettings.tsx
│   ├── SearchCommand.tsx
│   ├── TradingViewWidget.tsx
│   ├── UserDropdown.tsx
│   ├── WatchlistButton.tsx
│   └── WatchlistTable.tsx
├── context/              # React context providers
├── database/             # Database configuration
│   ├── mongoose.ts       # MongoDB connection
│   └── models/           # Mongoose models
│       └── watchlist.model.ts
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
├── public/               # Static assets
├── scripts/              # Utility scripts
├── types/                # TypeScript types
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
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
   
   Fill in your `.env` file:
   ```env
   # MongoDB
   MONGODB_URI=mongodb://localhost:27017/marketpulse

   # Redis
   REDIS_URL=redis://localhost:6379

   # Authentication
   BETTER_AUTH_SECRET=your-secret-key
   BETTER_AUTH_URL=http://localhost:3000

   # Finnhub API
   FINNHUB_API_KEY=your-finnhub-api-key
   NEXT_PUBLIC_FINNHUB_API_KEY=your-finnhub-api-key
   FINNHUB_BASE_URL=https://finnhub.io/api/v1

   # Google Gemini
   GOOGLE_GEMINI_KEY=your-gemini-api-key

   # Email (SMTP)
   SMTP_HOST=smtp.example.com
   SMTP_PORT=587
   SMTP_USER=your-email@example.com
   SMTP_PASSWORD=your-email-password
   SMTP_FROM=noreply@marketpulse.com

   # App
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
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

## 📧 Email Features

### Email Templates
- **Welcome Email** - Personalized onboarding with Gemini AI
- **Daily News Summary** - Curated news based on watchlist
- **Unsubscribe** - One-click unsubscribe with token verification

### Email Schedule
- Daily news summaries sent at 12:00 UTC
- Welcome emails sent immediately upon signup

## 📄 License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

> **Note:** This project was inspired by a [tutorial](https://www.youtube.com/watch?v=gu4pafNCXng) on JSMastery. MarketPulse adds new features on top such as watchlists and unsubscribe management.

- [JSMastery](https://www.youtube.com/watch?v=gu4pafNCXng) - Tutorial Inspiration
- [Next.js](https://nextjs.org/) - The React Framework
- [TradingView](https://www.tradingview.com/) - Charting Library
- [Finnhub](https://finnhub.io/) - Stock Market Data
- [Better-Auth](https://www.better-auth.com/) - Authentication
- [Inngest](https://www.inngest.com/) - Background Jobs
- [Google Gemini](https://gemini.google.com/) - AI Processing
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Radix UI](https://www.radix-ui.com/) - UI Components
- [Vercel](https://vercel.com/) - Deployment Platform
