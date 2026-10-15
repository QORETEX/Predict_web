# Predict - Ghana's Free-to-Play Prediction Platform

**Predict** is a free-to-play prediction platform designed for Ghana's next generation. Users can make predictions on NSMQ (National Science & Maths Quiz), football, basketball, tennis, and other sports, earning tokens (TKN) and XP to climb leaderboards and unlock rewards.

> **Important**: Tokens (TKN) have **no cash value**. This is a completely free-to-play platform focused on community engagement and friendly competition.

## Features

### Core Functionality
- **Live Events** - Real-time predictions with live multipliers
- **Upcoming Events** - Plan picks ahead of time with higher multipliers
- **Sport Categories** - NSMQ, Football, Basketball, Tennis, Other Sports
- **My Picks** - Track predictions, view results, manage active and settled picks
- **Wallet** - Token management, transaction history, and top-up packages

### Community & Competition
- **Leaderboards** - Compete across multiple categories (Overall, NSMQ, Football, etc.)
- **Squads** - Create or join teams, complete challenges together
- **School Rankings** - Represent your school in NSMQ competitions
- **Badges & Achievements** - Earn rewards for milestones

### Account & Rewards
- **User Profiles** - Manage account, track stats, level progression
- **Daily Rewards** - Log in daily to claim free tokens
- **Referral Program** - Invite friends and earn bonus tokens
- **XP System** - Level up by making predictions and winning

## Tech Stack

- **Framework**: Next.js 16.4.1 with App Router and Turbopack
- **Authentication**: Clerk v7.9.16 (Google & Apple OAuth)
- **Styling**: Tailwind CSS v4 with custom theme
- **UI Components**: Radix UI primitives with CVA (Class Variance Authority)
- **Language**: TypeScript
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/QORETEX/Predict_web.git
cd predict-web
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
predict-web/
├── src/
│   ├── app/
│   │   ├── (landing)/          # Landing page
│   │   ├── (auth)/             # Authentication pages (login, signup, etc.)
│   │   ├── (app)/              # Protected app routes
│   │   │   ├── dashboard/      # Main dashboard
│   │   │   ├── live/           # Live events
│   │   │   ├── upcoming/       # Upcoming events
│   │   │   ├── nsmq/           # NSMQ predictions
│   │   │   ├── football/       # Football predictions
│   │   │   ├── basketball/     # Basketball predictions
│   │   │   ├── tennis/         # Tennis predictions
│   │   │   ├── other-sports/   # Other sports
│   │   │   ├── picks/          # My Picks
│   │   │   ├── wallet/         # Wallet & tokens
│   │   │   ├── leaderboards/   # Leaderboards
│   │   │   ├── squads/         # Squads & teams
│   │   │   └── more/           # More features
│   │   ├── globals.css         # Global styles
│   │   └── layout.tsx          # Root layout
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   ├── dashboard/          # Dashboard-specific components
│   │   └── landing/            # Landing page components
│   ├── lib/
│   │   └── utils.ts            # Utility functions
│   └── middleware.ts           # Auth middleware
├── public/
│   ├── icons/                  # App icons
│   ├── images/                 # Hero images
│   ├── illustrations/          # Sport illustrations
│   └── mockups/                # Design mockups
└── package.json
```

## Key Pages

### Public Pages
- `/` - Landing page with hero, features, testimonials, FAQ
- `/login` - Sign in with email/password or Google/Apple OAuth
- `/signup` - Create new account

### Protected Pages
- `/dashboard` - Main dashboard with welcome banner, featured competitions, events
- `/live` - Live events with real-time multipliers
- `/upcoming` - Scheduled events to plan picks ahead
- `/nsmq`, `/football`, `/basketball`, `/tennis`, `/other-sports` - Sport-specific pages
- `/picks` - Active and settled picks
- `/wallet` - Token balance, transactions, packages
- `/leaderboards` - Rankings across all categories
- `/squads` - Team management and challenges
- `/more` - Additional features and settings

## Design Principles

- **Token Economy**: Free-to-play with TKN tokens (no cash value)
- **Age Restricted**: 15+ with Ghana Card verification
- **Mobile-First**: Responsive design for all screen sizes
- **Dark Theme**: Custom color palette with `#603BFF` primary color
- **Minimal Borders**: Uses background contrast instead of heavy borders
- **Solid Buttons**: No gradients on action buttons (`rounded-lg`, not `rounded-full`)

## Authentication Flow

1. User signs up via email/password or OAuth (Google/Apple)
2. Email verification required for email/password signups
3. After successful authentication, user is redirected to `/dashboard`
4. Protected routes check authentication via Clerk middleware

## Contributing

This project is currently in development. Contributions, issues, and feature requests are welcome.

## License

[Add your license here]

## Acknowledgments

- Built for Ghana's next generation
- NSMQ logo courtesy of Primetime Limited
- Football crests from crests.football-data.org

---

**Remember**: Free to play. Tokens have no cash value. 15+ Age. Ghana Card verification. Community driven.
