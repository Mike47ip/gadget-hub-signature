# GadgetHub Signature 🛒⚡

A full-stack gadget e-commerce platform built with **Next.js 14**, **Tailwind CSS**, **Prisma**, and **SQLite** (swappable to PostgreSQL for production).

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + Google Fonts (Outfit) |
| Database ORM | Prisma |
| Database | SQLite (dev) / PostgreSQL (prod) |
| Language | JavaScript (ES2022) |

## Project Structure

```
src/
├── app/
│   ├── layout.js              # Root layout (font, global styles)
│   ├── page.js                # Home / product listing page
│   ├── deals/
│   │   └── page.js            # Deals page
│   ├── cart/
│   │   └── page.js            # Cart page
│   ├── checkout/
│   │   └── page.js            # Checkout page
│   ├── products/
│   │   └── [id]/page.js       # Product detail page
│   └── api/
│       ├── products/
│       │   └── route.js       # GET all products, POST create
│       ├── cart/
│       │   └── route.js       # GET cart, POST add, DELETE remove
│       └── orders/
│           └── route.js       # POST place order
├── components/
│   ├── layout/
│   │   ├── Navbar.js          # Top navigation
│   │   └── Footer.js          # Site footer
│   ├── shop/
│   │   ├── ProductCard.js     # Product card (home)
│   │   ├── DealCard.js        # Deal card with savings/stock bar
│   │   ├── ProductGrid.js     # Responsive product grid
│   │   ├── CategoryFilter.js  # Filter pill bar
│   │   ├── CartSidebar.js     # Sliding cart drawer
│   │   └── CountdownTimer.js  # Live countdown for deals
│   └── ui/
│       ├── Badge.js           # Reusable badge component
│       ├── Button.js          # Reusable button variants
│       ├── StockBar.js        # Stock progress bar
│       └── Toast.js           # Toast notification
├── hooks/
│   ├── useCart.js             # Cart state & logic
│   └── useCountdown.js        # Countdown timer hook
├── lib/
│   ├── db.js                  # Prisma client singleton
│   └── utils.js               # Shared helpers
└── types/
    └── index.js               # JSDoc type definitions
prisma/
├── schema.prisma              # DB schema
└── seed.js                    # Seed data
```

## Getting Started

### 1. Clone & install

```bash
git clone https://github.com/your-username/gadgethub-signature.git
cd gadgethub-signature
npm install
```

### 2. Set up environment

```bash
cp .env.example .env
# Edit .env — for local dev the default SQLite URL is fine
```

### 3. Set up the database

```bash
npm run db:generate   # generate Prisma client
npm run db:push       # push schema to DB (creates dev.db)
npm run db:seed       # seed with sample products
```

### 4. Run dev server

```bash
npm run dev
# Open http://localhost:3000
```

## Deploy to Vercel

1. Push to GitHub
2. Import repo in [Vercel](https://vercel.com)
3. Add `DATABASE_URL` (PostgreSQL) in Vercel environment variables
4. Update `prisma/schema.prisma` provider from `sqlite` → `postgresql`
5. Deploy ✅

## Database swap (SQLite → PostgreSQL)

In `prisma/schema.prisma` change:
```prisma
datasource db {
  provider = "postgresql"   // was "sqlite"
  url      = env("DATABASE_URL")
}
```

Then run `npm run db:migrate`.
