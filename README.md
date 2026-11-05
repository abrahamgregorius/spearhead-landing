This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Spearhead landing page

Dark cinematic landing page for Spearhead — an agentic AI marketing platform. Spec: `prompt/landing.md`.

```bash
npm run dev
```

## Waitlist database setup

The waitlist form persists submissions through `app/api/waitlist/route.ts` using a Supabase table over the REST API (no SDK dependency).

1. Create a project at [supabase.com](https://supabase.com).
2. Run this SQL in the Supabase SQL editor:

```sql
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  use_case_source text not null default 'general',
  signup_source text not null default 'general',
  created_at timestamptz not null default now()
);

-- No policies: Row Level Security blocks all anon access.
-- The API route uses the service role key (server-side only).
alter table public.waitlist enable row level security;
```

3. Copy `.env.example` to `.env.local` and fill in `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` (Project Settings → API).
4. Restart the dev server.

Until configured, the API responds `503 not_configured` and the form shows an error state — submissions are never faked. The route also performs server-side email validation, honeypot + minimum-interaction-time spam protection, IP rate limiting (5 per 15 min), duplicate detection (`You're already on the list.`), and attribution capture (`use_case_source`, `signup_source`).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
