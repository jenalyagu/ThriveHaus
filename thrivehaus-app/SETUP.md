# ThriveHaus MVP — Setup Guide

## Prerequisites
- Node.js 18+
- A [Supabase](https://supabase.com) project
- An [OpenAI](https://platform.openai.com) API key

## 1. Environment Variables

Copy `.env.local` and fill in your values:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
OPENAI_API_KEY=sk-...
```

## 2. Database Setup

In your Supabase project, go to **SQL Editor** and run the contents of:

```
supabase/schema.sql
```

This creates the `families`, `parents`, `children`, and `blueprints` tables with Row Level Security enabled.

## 3. Supabase Auth

In Supabase dashboard:
- Go to **Authentication → URL Configuration**
- Set **Site URL** to `http://localhost:3000` (or your production URL)
- Add `http://localhost:3000/auth/callback` to **Redirect URLs**

## 4. Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 5. User Flow

1. **Landing** → user sees the value prop
2. **Sign Up** → account created, email confirmation (or auto-login in dev)
3. **Intake** → 4-step questionnaire about their family
4. **Blueprint generation** → OpenAI GPT-4o generates personalized Family Blueprint
5. **Dashboard** → overview + blueprint summary
6. **Blueprint page** → full pillars, weekly rhythm, resources
7. **Settings** → profile + password management

## Architecture

```
app/
├── (auth)/         # Login, Signup (no dashboard shell)
│   ├── login/
│   └── signup/
├── (app)/          # Protected routes (with dashboard shell)
│   ├── intake/
│   ├── dashboard/
│   │   └── blueprint/
│   └── settings/
├── api/
│   └── intake/     # POST: creates family + triggers blueprint generation
└── auth/
    └── callback/   # Supabase email confirmation handler

components/
├── layout/         # Navbar, DashboardShell
└── ui/             # Logo, Spinner

lib/
├── supabase/       # client, server, middleware helpers
└── utils.ts

types/
├── database.ts     # Supabase table types
└── index.ts        # App-level types (IntakeData, BlueprintContent)
```

## Deployment (Vercel)

```bash
vercel --prod
```

Add the three environment variables in Vercel project settings.
Update your Supabase redirect URLs to include your production domain.
