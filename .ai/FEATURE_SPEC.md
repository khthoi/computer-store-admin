# FEATURE SPECIFICATIONS — computer-store-frontend

## CS-02: Product Catalog
Route: /products  | Layout: sidebar + grid
URL params: ?category=&brand=&minPrice=&maxPrice=&sort=&page=
Components: SearchBar, FilterBar, FilterSidebar (local), ProductCard,
            ProductCardSkeleton, Pagination, Tabs(sort)
Shared: Badge, Skeleton, Spinner, Accordion (for filter groups)
API: GET /products | GET /categories
Rules: Default sort=best_selling | Out-of-stock shown with StockBadge

## CS-03: Product Detail
Route: /products/[slug]  | SSR + ISR revalidate:1800
Components: Breadcrumb, ProductImageGallery, PriceTag, VariantSelector,
            StockBadge, RatingStars, SpecTable, ReviewSection, CompareBar
Shared: Button, Badge, Tabs, Skeleton
API: GET /products/:slug | GET /products/:id/reviews
     POST /cart/items | POST /wishlist/:productId (toggle)
Sections (Tabs): [Mô tả] [Thông số] [Đánh giá (N)]

## CS-05: Build PC
Route: /build-pc  | Client Component (complex state)
State: useReducer + Zustand + localStorage persistence
Parts order: CPU → Mainboard → RAM → Storage → GPU → Case → PSU → Cooler
Components: PCPartSelector, PCPartCard, PCBuildSummary, CompatibilityAlert
API: GET /products?category={part} | GET /compatibility/check
     POST /build-pc/save (auth required)
Rules: Filter next part list based on compatibility with selected parts

## CS-06: Cart
Route: /cart  | Client Component
State: cartStore (Zustand, persisted)
Components: CartItem, CartSummary, CouponInput
Shared: Button, Badge, Modal (remove confirm)
API: GET /cart | PUT /cart/items/:id | DELETE /cart/items/:id
     POST /vouchers/validate
Empty state: illustration + button to /products

## CS-07: Checkout (3-step wizard)
Route: /checkout  | Client Component (multi-step state)
Step 1 — Địa chỉ: AddressCard list, add new address modal
Step 2 — Thanh toán: PaymentMethodPicker
Step 3 — Xác nhận: order summary + CartSummary + place order
Components: CheckoutForm, AddressCard, PaymentMethodPicker, CartSummary
API: GET /addresses | POST /addresses | POST /orders | POST /payments/initiate

## CS-14: Order History
Route: /account/orders  | Server Component
Tabs: Tất cả | Đang xử lý | Đang giao | Đã giao | Đã hủy | Đổi/Trả
Components: OrderStatusBadge, OrderTimeline (detail page)
API: GET /orders?status=&page=

## CS-18: Support Tickets
Route: /account/support | /account/support/[id]
Components: TicketCard, TicketThread, FileUpload (shared)
Shared: Badge (status), Button, Tabs
API: GET /tickets | POST /tickets | POST /tickets/:id/messages
