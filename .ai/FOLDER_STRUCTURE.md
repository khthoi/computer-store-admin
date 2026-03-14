computer-store-frontend/
├── .ai/                              # AI instruction files (10 .md files)
│   ├── README.md
│   ├── PROJECT_CONTEXT.md
│   ├── SYSTEM_ARCHITECTURE.md
│   ├── CODING_RULES.md
│   ├── UI_DESIGN_SYSTEM.md
│   ├── COMPONENT_GUIDELINES.md
│   ├── FEATURE_SPEC.md
│   ├── API_CONTRACT.md
│   ├── FOLDER_STRUCTURE.md
│   └── AI_DEVELOPMENT_GUIDE.md
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (storefront)/             # Public customer pages
│   │   │   ├── layout.tsx            # Navbar + Footer shell
│   │   │   ├── page.tsx              # Home — CS-01
│   │   │   ├── products/
│   │   │   │   ├── page.tsx          # Catalog — CS-02
│   │   │   │   └── [slug]/
│   │   │   │       ├── page.tsx      # Product detail — CS-03
│   │   │   │       └── loading.tsx
│   │   │   ├── compare/page.tsx      # Compare — CS-04
│   │   │   ├── build-pc/page.tsx     # Build PC — CS-05
│   │   │   ├── cart/page.tsx         # Cart — CS-06
│   │   │   ├── checkout/
│   │   │   │   ├── page.tsx          # Checkout wizard — CS-07
│   │   │   │   └── success/page.tsx  # Order success — CS-08
│   │   │   └── promotions/page.tsx   # Promotions — CS-19
│   │   ├── (auth)/
│   │   │   ├── layout.tsx
│   │   │   ├── login/page.tsx        # CS-10
│   │   │   ├── register/page.tsx     # CS-11
│   │   │   └── forgot-password/page.tsx # CS-12
│   │   ├── (account)/               # Protected — requires login
│   │   │   ├── layout.tsx            # Account sidebar nav
│   │   │   ├── profile/page.tsx      # CS-13
│   │   │   ├── orders/
│   │   │   │   ├── page.tsx          # Order history — CS-14
│   │   │   │   └── [id]/page.tsx     # Order detail — CS-09
│   │   │   ├── wishlist/page.tsx     # CS-15
│   │   │   ├── returns/new/page.tsx  # CS-16
│   │   │   └── support/
│   │   │       ├── page.tsx          # Ticket list — CS-18
│   │   │       └── [id]/page.tsx     # Ticket detail
│   │   ├── api/                      # Route Handlers (BFF proxy)
│   │   │   └── [...path]/route.ts
│   │   ├── globals.css
│   │   └── layout.tsx                # Root layout (fonts, providers)
│   ├── components/
│   │   ├── ui/                       # ★ FROM SHARED PACKAGE
│   │   │   └── [re-exported from @computer-store/ui]
│   │   ├── layout/
│   │   │   ├── Navbar.tsx            # Storefront top navigation
│   │   │   ├── MegaMenu.tsx          # Category mega dropdown
│   │   │   ├── Footer.tsx
│   │   │   ├── Breadcrumb.tsx
│   │   │   └── AccountSidebar.tsx    # Account page left nav
│   │   ├── navigation/
│   │   │   ├── Pagination.tsx
│   │   │   ├── FilterBar.tsx         # Active filter chips
│   │   │   └── SearchBar.tsx
│   │   ├── product/
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductCardSkeleton.tsx
│   │   │   ├── ProductImageGallery.tsx
│   │   │   ├── PriceTag.tsx
│   │   │   ├── VariantSelector.tsx
│   │   │   ├── StockBadge.tsx
│   │   │   ├── SpecTable.tsx
│   │   │   └── CompareBar.tsx        # Sticky compare selector
│   │   ├── commerce/
│   │   │   ├── CartItem.tsx
│   │   │   ├── CartSummary.tsx
│   │   │   ├── CouponInput.tsx
│   │   │   ├── CheckoutForm.tsx
│   │   │   ├── PaymentMethodPicker.tsx
│   │   │   ├── AddressCard.tsx
│   │   │   ├── OrderTimeline.tsx
│   │   │   └── OrderStatusBadge.tsx
│   │   ├── buildpc/
│   │   │   ├── PCPartSelector.tsx
│   │   │   ├── PCPartCard.tsx
│   │   │   ├── PCBuildSummary.tsx
│   │   │   └── CompatibilityAlert.tsx
│   │   ├── reviews/
│   │   │   ├── ReviewSection.tsx
│   │   │   ├── ReviewCard.tsx
│   │   │   └── ReviewForm.tsx
│   │   └── support/
│   │       ├── TicketCard.tsx
│   │       └── TicketThread.tsx
│   ├── hooks/
│   │   ├── useCart.ts
│   │   ├── useAuth.ts
│   │   ├── useWishlist.ts
│   │   ├── useBuildPC.ts
│   │   ├── useProductFilter.ts
│   │   └── useDebounce.ts
│   ├── lib/
│   │   ├── api.ts                    # Axios instance + interceptors
│   │   ├── auth.ts                   # NextAuth config
│   │   ├── formatters.ts             # VND, dates, slugs
│   │   └── validators.ts             # Zod schemas
│   ├── services/
│   │   ├── product.service.ts
│   │   ├── category.service.ts
│   │   ├── cart.service.ts
│   │   ├── order.service.ts
│   │   ├── review.service.ts
│   │   ├── ticket.service.ts
│   │   └── auth.service.ts
│   ├── stores/
│   │   ├── cart.store.ts             # Zustand — persisted
│   │   ├── auth.store.ts
│   │   └── buildpc.store.ts          # Zustand — useReducer pattern
│   └── types/
│       ├── product.types.ts
│       ├── order.types.ts
│       ├── cart.types.ts
│       ├── user.types.ts
│       └── api.types.ts
├── public/
│   └── images/
├── CLAUDE.md                         # Claude Code instruction entry point
├── .cursorrules                      # Cursor IDE instruction entry point
├── tailwind.config.ts                # Extends @computer-store/ui/tailwind
├── tsconfig.json
├── next.config.ts
├── .env.example
└── package.json

# PLACEMENT DECISION GUIDE

? New component needed
  → Does @computer-store/ui have it?  YES → import, stop.
  → Is it used in 2+ pages?           YES → src/components/{category}/
  → Is it page-specific?              YES → colocate in page folder

? New API integration
  → Always → src/services/{resource}.service.ts
  → Add types → src/types/{domain}.types.ts

? New state needed
  → Server data (from API) → React Query (useQuery/useMutation)
  → Client UI state (transient) → useState in component
  → Cross-page persistent state → src/stores/{domain}.store.ts (Zustand)

? New utility function
  → Formatting (VND, date) → src/lib/formatters.ts
  → Validation → src/lib/validators.ts (Zod schemas)
  → Route constants → src/lib/routes.ts
  → API client config → src/lib/api.ts
