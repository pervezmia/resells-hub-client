client/
├── app/
│   ├── (public)/
│   │   ├── layout.jsx
│   │   ├── page.jsx
│   │   ├── products/
│   │   │   ├── page.jsx
│   │   │   └── [id]/page.jsx
│   │   ├── categories/page.jsx
│   │   ├── about/page.jsx
│   │   ├── contact/page.jsx
│   │   └── seller/[id]/page.jsx
│   │
│   ├── (auth)/
│   │   ├── layout.jsx
│   │   ├── signin/page.jsx
│   │   └── signup/page.jsx
│   │
│   ├── dashboard/
│   │   ├── layout.jsx
│   │   ├── page.jsx
│   │   ├── buyer/
│   │   │   ├── page.jsx
│   │   │   ├── orders/page.jsx
│   │   │   ├── wishlist/page.jsx
│   │   │   ├── payments/page.jsx
│   │   │   └── profile/page.jsx
│   │   ├── seller/
│   │   │   ├── page.jsx
│   │   │   ├── add-product/page.jsx
│   │   │   ├── my-products/page.jsx
│   │   │   ├── manage-orders/page.jsx
│   │   │   └── analytics/page.jsx
│   │   └── admin/
│   │       ├── page.jsx
│   │       ├── manage-users/page.jsx
│   │       ├── manage-products/page.jsx
│   │       ├── manage-orders/page.jsx
│   │       └── analytics/page.jsx
│   │
│   ├── checkout/page.jsx
│   ├── payment-success/page.jsx
│   ├── loading.jsx
│   ├── not-found.jsx
│   └── layout.jsx                      # root layout (QueryProvider wrap)
│
├── components/
│   ├── ui/
│   ├── shared/                         # Navbar, Footer, Sidebar, ThemeSwitcher
│   ├── home/
│   ├── products/
│   ├── dashboard/
│   └── charts/
│
├── lib/
│   ├── actions/
│   │   ├── product.actions.js
│   │   ├── order.actions.js
│   │   ├── review.actions.js
│   │   ├── payment.actions.js
│   │   └── user.actions.js
│   │
│   ├── auth-client.js
│   └── utils.js
│
├── hooks/
│   └── useProducts.js
│
├── providers/
│   └── QueryProvider.jsx
│
├── middleware.js
└── .env.local