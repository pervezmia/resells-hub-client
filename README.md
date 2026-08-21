# ReSell Hub — Second-Hand Marketplace Platform

An online marketplace where users can safely and efficiently buy and sell pre-owned products. ReSell Hub helps reduce waste, promotes sustainable consumption, gives sellers a way to earn from items they no longer need, and helps buyers find affordable, quality products.

## Live URL

- **Client:** _(add your deployed client URL here)_
- **Server:** _(add your deployed server URL here)_

## Admin Credentials

- **Email:** _(add admin email here)_
- **Password:** _(add admin password here)_

## Key Features

### Authentication
- Register and login with email/password
- Register and login with Google
- JWT-based route and API protection with role-based authorization (buyer / seller / admin)

### Buyer
- Browse all products with search, category filter, sort (price low–high / high–low), and pagination
- View detailed product pages with image gallery and seller information
- Add products to a cart and wishlist
- Checkout with delivery information and secure Stripe payment
- View order history, cancel orders before shipment
- View payment/transaction history
- Dashboard overview with total orders, wishlist count, and recent purchases
- Update profile (name, profile image)

### Seller
- Add, edit, and delete product listings
- Manage incoming orders through the full status flow (pending → accepted → processing → shipped → delivered)
- Sales analytics dashboard: monthly sales trend, revenue by category, and top-selling products, calculated from real order data
- Dashboard overview with total products, total sales, total revenue, and pending orders
- Update profile (name, profile image)

### Admin
- Manage all users: search, filter by role, block/unblock, delete (with self-protection safeguards)
- Manage all product listings: approve, reject, delete, and search
- Manage all orders across the platform, including updating order status to resolve disputes
- Platform analytics: user growth, monthly orders, category performance, and top categories
- Dashboard overview with total users, total products, and total orders

### Home Page
- Hero banner with call-to-action and animated entrance (Motion)
- Dynamic featured products section, pulled from the database
- Dynamic popular categories section
- Marketplace statistics (total products, sellers, buyers, completed orders)
- Sustainability impact section
- Trusted sellers showcase (ranked by completed orders)
- Success stories

### General
- Fully responsive design across mobile, tablet, and desktop
- Custom loading skeletons and a custom 404 error page
- Backward-compatible REST API design (existing endpoints extended without breaking older consumers)

### Optional Features Implemented
- **Dark / Light Theme Toggle** — user can switch themes; the selection persists after reload
- _(add your second optional feature here, e.g. Recently Viewed Products, Advanced Product Filtering, Seller Public Profile Page)_

## Tech Stack

**Client:** Next.js (App Router), React, JavaScript, Tailwind CSS v4, HeroUI v3, Gravity UI Icons, Motion (Framer Motion), Recharts, Better Auth, Stripe.js

**Server:** Node.js, Express, MongoDB (native driver), Better Auth (MongoDB adapter), JWT verification via `jose`, Stripe

## NPM Packages Used

### Client
- `next`, `react`, `react-dom`
- `better-auth`
- `@heroui/react`
- `@gravity-ui/icons`
- `motion`
- `recharts`
- `react-hot-toast`
- `stripe`
- `tailwindcss`

### Server
- `express`
- `mongodb`
- `cors`
- `dotenv`
- `jose-cjs`

## Environment Variables

### Client (`.env`)
```
NEXT_PUBLIC_API_URL=
BETTER_AUTH_URL=
MONGO_DB_URI=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
```

### Server (`.env`)
```
PORT=
MONGO_DB_URI=
CLIENT_URL=
```

## Getting Started

```bash
# Client
cd resells-hub-client
npm install
npm run dev

# Server
cd resells-hub-server
npm install
npm run dev
```

## GitHub Repositories

- **Client:** _(add your client repo link here)_
- **Server:** _(add your server repo link here)_