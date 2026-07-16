# Smart Travel Planner

A full-stack trip planning platform — plan itineraries, track budgets, browse an interactive map, check the weather, and save favorites, all in one place.

Built as a graduation project with Next.js 15 (App Router), TypeScript, Tailwind CSS, Prisma, PostgreSQL, NextAuth, React Hook Form + Zod, TanStack Query, Recharts, dnd-kit, and Leaflet.

## AI assistance disclosure

This project was built with substantial assistance from Claude (Anthropic's AI assistant), which helped design the architecture, write most of the code, and debug issues across every feature. I worked through the project feature by feature, reviewed each part as it was built, and can explain and extend the code.

## Getting started

```bash
npm install
cp .env.example .env
```

Fill in `.env`:

| Variable | Required? | Notes |
|---|---|---|
| `DATABASE_URL` | Yes | Your local Postgres connection string |
| `NEXTAUTH_URL` | Yes | Must exactly match the port you run on, e.g. `http://localhost:3005` |
| `NEXTAUTH_SECRET` | Yes | Generate with `openssl rand -base64 32` |
| `WEATHER_API_KEY` | Optional | Free key from openweathermap.org — no card required. New keys can take ~2 hours to activate. Weather page shows a friendly fallback without it. |

Maps need no key at all — they use free OpenStreetMap tiles (Leaflet) and free Nominatim geocoding.

```bash
createdb smart_travel_planner    # skip if it already exists
npx prisma migrate dev --name init
npm run dev
```

Open the app at whatever port is printed (pinned to **3005** by default — see `package.json`). Register a new account, or sign in with the seeded demo account: `alex@example.com` / `password123`.

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start the dev server (port 3005) |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | Lint the codebase |
| `npm run typecheck` | Type-check without emitting output |
| `npm run prisma:generate` | Regenerate the Prisma client |
| `npm run prisma:migrate` | Create/apply a migration |
| `npm run prisma:studio` | Open Prisma's data browser |
| `npm run prisma:seed` | Re-run the (non-destructive) demo seed |

## Features

- **Auth** — register/login/logout with credentials, protected routes via middleware, session-aware redirects
- **Profile** — editable name/country/bio, avatar upload from device (saved to `public/uploads`) or by pasting a link, plus live stat cards (trips, upcoming, budget, visited, favorites) and a spending-by-category chart
- **Trips** — full CRUD, with country/city autocomplete (150+ countries, 330+ cities)
- **Itinerary** — one day per date in the trip's range, auto-generated; add/edit/delete/drag-to-reorder activities per day
- **Budget** — per-trip expenses across 6 categories, automatic total/remaining calculation, category breakdown chart
- **Map** — interactive map centered on the trip's destination (auto-geocoded on save), plus an opt-in "distance from me" using browser geolocation
- **Weather** — current conditions + 5-day forecast for the trip's destination
- **Favorites** — save destinations/attractions/restaurants, remove anytime, quick-save straight from a trip
- **Statistics** — trips created, countries visited, money spent, favorite destination, trips-by-month and trips-by-country charts
- **UI polish** — loading skeletons matched to each page's real layout, custom 404/error pages, dark/light mode, toast notifications, empty states throughout

## Known scope decisions (intentional, not bugs)

- **City list is curated, not exhaustive** (`src/lib/cities.ts`) — popular destinations only; any city can still be typed freely.
- **Map shows the destination only** — nearby attraction/hotel/restaurant markers would need a places-search API or reading from Favorites; a natural future extension, not implemented now.
- **Avatar upload writes to local disk** (`public/uploads/avatars`) — works great locally/self-hosted, but won't persist on serverless hosts with an ephemeral filesystem (e.g. Vercel). Swapping in Cloudinary/S3 later only touches `src/actions/upload.actions.ts`.
- **"Distance from me" is straight-line**, not a driving/walking route — this app isn't a turn-by-turn navigator.

## Design system

Colors, type, and spacing are defined once as CSS variables in `src/app/globals.css` and consumed through `tailwind.config.ts` (`primary`, `accent`, `success`, `danger`, `route`, etc.). Light/dark themes toggle via the `.dark` class (`next-themes`).

The recurring visual motif is a dashed "flight path" connecting waypoints — on the landing hero, and echoed in the itinerary's day-by-day structure.

## Folder structure

```
src/
├── app/            # routes (App Router)
│   ├── (auth)/       # login, register
│   └── (dashboard)/  # protected app shell: profile, trips, favorites, statistics
├── components/     # ui primitives + feature-grouped components
├── features/       # feature-scoped client components (auth forms)
├── actions/        # Server Actions (validated, auth-checked)
├── services/       # external API wrappers (weather, geocoding)
├── lib/            # prisma client, auth config, utils, zod schemas, static data
└── types/          # shared TypeScript types
prisma/
├── schema.prisma
└── seed.ts         # safe to re-run — only ever touches its own demo account
```

## Project status

All 15 planned features are complete.

- [x] 1. Project setup
- [x] 2. Database & Prisma setup
- [x] 3. Authentication
- [x] 4. Profile
- [x] 5. App shell (sidebar/navbar)
- [x] 6. Dashboard (merged into Profile)
- [x] 7. Trip management
- [x] 8. Daily itinerary
- [x] 9. Budget management
- [x] 10. Interactive maps
- [x] 11. Weather
- [x] 12. Favorites
- [x] 13. Statistics
- [x] 14. UI polish pass
- [x] 15. Final review
