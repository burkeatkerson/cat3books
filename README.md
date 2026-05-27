# Cat3 Books

The website for Cat3 Books, built with Next.js 14, TypeScript, and Tailwind CSS. Deployed on Vercel.

## Setup

### 1. Clone the repository

```bash
git clone <repo-url>
cd cat3books
```

### 2. Copy the environment file

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and fill in any values that differ from the defaults.

### 3. Install dependencies

```bash
npm install
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL — used for sitemap, robots.txt, canonical tags, and OG metadata |
| `NEXT_PUBLIC_BASE_URL` | Base URL for internal API calls or asset paths (usually the same as `NEXT_PUBLIC_SITE_URL`) |
| `NEXT_PUBLIC_SITE_NAME` | Human-readable site name used in metadata and the title template |

See `.env.local.example` for reference values.

## Deployment

This project deploys automatically to Vercel on push to `main`.

Before deploying, ensure the following environment variables are set in the Vercel project dashboard under **Settings → Environment Variables**:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_BASE_URL`
- `NEXT_PUBLIC_SITE_NAME`

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server locally |
| `npm run lint` | Run ESLint |
