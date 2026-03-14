# SYSTEM ARCHITECTURE — computer-store-frontend

## Architecture Overview
Pattern   : Presentation Layer (Next.js) → API Layer (NestJS Backend)
Rendering : Server Components default + Client Components for interactivity
State     : Server state via React Query | Client state via Zustand
Auth      : NextAuth.js with JWT strategy

## Layer Diagram

┌──────────────────────────────────────────────────────────┐
│                    BROWSER (Client)                       │
│  Zustand stores (cart, auth, buildpc)                     │
│  React Query cache (product data, order data)             │
└────────────────────┬─────────────────────────────────────┘
                     │ HTTPS
┌────────────────────▼─────────────────────────────────────┐
│              NEXT.JS APP (Presentation Layer)             │
│                                                           │
│  Server Components      Client Components                 │
│  ─────────────────      ──────────────────                │
│  Page data fetching     useState / useEffect              │
│  SEO metadata           Event handlers                    │
│  Static content         Form interactions                 │
│  Layout shells          Cart operations                   │
│                                                           │
│  Route Groups:                                            │
│  (storefront) → public pages                              │
│  (auth)       → login/register                            │
│  (account)    → protected pages                           │
│  api/         → Route Handlers (BFF proxy)                │
└────────────────────┬─────────────────────────────────────┘
                     │ REST API (HTTPS)
┌────────────────────▼─────────────────────────────────────┐
│         NESTJS BACKEND (Application Layer)                │
│  Port: 4000 | Auth: JWT Bearer                            │
│  Modules: Auth, Product, Order, Cart, Review, Ticket...   │
└────────────────────┬─────────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────────┐
│  DATA LAYER: PostgreSQL | Redis (cache) | MinIO (media)   │
└──────────────────────────────────────────────────────────┘

## Component Architecture

┌─────────────────────────────────────────────────────────┐
│              @computer-store/ui (SHARED PACKAGE)         │
│  Button, Input, Modal, Badge, Alert, Toast, DataTable     │
│  Skeleton, Spinner, Tabs, Accordion, Tooltip, Avatar      │
│  Design tokens (colors, typography, spacing, radius)      │
└────────────────┬────────────────────────────────────────┘
                 │ imported by both repos
┌────────────────▼────────────────────────────────────────┐
│         computer-store-frontend LOCAL COMPONENTS          │
│  layout/   : Navbar, MegaMenu, Footer, Breadcrumb        │
│  product/  : ProductCard, Gallery, PriceTag, Variants     │
│  commerce/ : CartItem, CartSummary, CheckoutForm          │
│  buildpc/  : PCPartSelector, CompatibilityAlert           │
│  reviews/  : ReviewSection, ReviewCard, ReviewForm        │
│  support/  : TicketCard, TicketThread                     │
└─────────────────────────────────────────────────────────┘

## Data Flow Patterns

### Pattern A: Server Component with data (most pages)
  Page (Server) → calls service.ts → Backend API
                → passes data as props to Client Components

### Pattern B: Client Component with React Query (interactive)
  Client Component → useQuery(service.fn) → Backend API
  Example: Cart page, Wishlist, filter-heavy catalog

### Pattern C: Zustand (client-side persistent state)
  cartStore  : cart items, count, total (persisted localStorage)
  authStore  : user session, access token
  buildpcStore: selected PC parts, compatibility state

## Routing Strategy
Static routes   : Home, Catalog, Promotions → ISR revalidate: 3600
Dynamic routes  : Product detail → ISR revalidate: 1800
Protected routes: /account/* → middleware.ts checks JWT
Search/Filter   : /products?q=&brand=&price=... → searchParams

## Key Technical Decisions
1. App Router (not Pages Router) — Server Components by default
2. React Query for ALL server data (not SWR, not useEffect fetch)
3. Zustand for client state that persists across navigation
4. No Redux — too heavy for this scope
5. No CSS Modules — TailwindCSS only, using shared design tokens
6. NextAuth for auth — JWT stored in httpOnly cookie
7. Zod for all form validation (+ API response validation)

## Performance Strategy
Image optimization : next/image with sizes prop always set
Bundle splitting   : dynamic() import for heavy components (Gallery, Map)
Route prefetch     : Link prefetch enabled on visible viewport
ISR               : Product pages cached, revalidated on data change
Skeleton loading  : every page has loading.tsx with Skeleton components
