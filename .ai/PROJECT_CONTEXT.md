# PROJECT CONTEXT — computer-store-frontend

## System Type
B2C e-commerce. Single company sells computer hardware to many customers.
NOT a marketplace. One vendor, many buyers.

## Users of THIS repo (Customer Storefront)
Guest     : Browse, search, view products. Cannot purchase.
Customer  : Full shopping: cart, checkout, orders, reviews, tickets.

## Core Modules
AUTH         : Register (OTP), Login (email/pw), Forgot password, Profile
CATALOG      : Category tree, Product list, Search (full-text), Filter, Sort
PRODUCT      : Detail, Image gallery, Variants (RAM/SSD/color), Compare, Spec
BUILD_PC     : Part selection by category, Compatibility check real-time
CART         : Add/remove/qty, Coupon apply, Guest cart (localStorage)
CHECKOUT     : 3-step: Address → Payment → Confirm
PAYMENT      : COD, Bank transfer, E-wallet, Installment
ORDERS       : History, Detail, Timeline, Cancel, Return request
WISHLIST     : Save product, Notify on price drop
REVIEWS      : Write (verified purchase only), Rate 1-5, Photo upload
SUPPORT      : Create ticket, Message thread, Track status
PROMOTIONS   : Flash Sale, Voucher, Category deals, Loyalty points

## Critical Business Rules
1. Only customers who purchased can write reviews (check order history)
2. Guest cart lives in localStorage → syncs to server on login
3. Stock check: at add-to-cart, at checkout start, at payment confirm
4. Build PC compatibility: CPU.socket === Mainboard.socket
5. Build PC compatibility: RAM.ddrGen === Mainboard.supportedDDR
6. Cancel order: only when status === "pending" (Chờ xác nhận)
7. VND price format: 25,990,000₫ — use formatVND() from @/lib/formatters
8. Product URL: /products/{slug} — never use product ID in URL
9. Auth redirect: protected routes → /login?redirect=/original-path

## Screens (reference screen IDs from UI/UX doc)
CS-01 Home  | CS-02 Catalog  | CS-03 Product Detail | CS-04 Compare
CS-05 BuildPC | CS-06 Cart | CS-07 Checkout | CS-08 Order Success
CS-09 Order Tracking | CS-10 Login | CS-11 Register | CS-12 ForgotPw
CS-13 Profile | CS-14 Order History | CS-15 Wishlist | CS-16 Return
CS-17 Write Review | CS-18 Support | CS-19 Promotions | CS-20 Search
