# UK Setup Guide

Your complete companion for settling into UK life. Navigate visa requirements, avoid scams, and get personalized guidance tailored to your situation.

## Features

- 🗺️ **Personalized Roadmap** - Step-by-step tasks based on your visa type and location
- 🛡️ **Scam Shield** - Detect rental, job, and visa scams before they cost you
- 📝 **Ready Templates** - Professional email templates for landlords, banks, and more
- 📁 **Document Vault** - Secure storage with time-limited sharing links
- 📚 **Local Resources** - Curated directory of GPs, legal aid, and community support

## Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Database**: MongoDB Atlas + Mongoose
- **Auth**: NextAuth.js v5
- **UI**: shadcn/ui + Tailwind CSS
- **Payments**: Stripe
- **Email**: Resend

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB Atlas account

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.local` and fill in your values
   - Required: `MONGODB_URI`, `AUTH_SECRET`

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── (marketing)/     # Landing, pricing pages
│   ├── (auth)/          # Login, register
│   ├── (dashboard)/     # Protected user routes
│   ├── admin/           # Admin panel
│   └── api/             # API route handlers
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── shared/          # Reusable components
│   └── features/        # Feature-specific components
├── lib/
│   ├── db/              # MongoDB connection & models
│   ├── services/        # Business logic
│   └── utils/           # Helper functions
└── types/               # TypeScript type definitions
```

## Environment Variables

See `.env.local` for all required environment variables:

- `MONGODB_URI` - MongoDB connection string
- `AUTH_SECRET` - NextAuth.js secret (generate with `openssl rand -base64 32`)
- `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` - Google OAuth credentials
- `STRIPE_*` - Stripe API keys
- `RESEND_API_KEY` - Email service key

## License

Private - All rights reserved
