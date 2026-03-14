# UI DESIGN SYSTEM — computer-store-frontend
# Theme: Modern Tech Retail — Professional, Trustworthy, Clean
# Source: @computer-store/ui/tailwind-preset.ts

## COLOR TOKENS

# PRIMARY (Brand Blue) — CTAs, links, active states
primary-50 : #EFF6FF  → bg-primary-50   (light bg, hover bg)
primary-100: #DBEAFE  → bg-primary-100  (selected bg)
primary-500: #3B82F6  → text-primary-500 (secondary accent)
primary-600: #2563EB  → bg-primary-600   (★ main CTA button)
primary-700: #1D4ED8  → bg-primary-700   (hover state on CTA)
primary-800: #1E40AF  → text-primary-800 (dark links)

# SEMANTIC COLORS
success-50 : #ECFDF5  → bg-success-50   | success-700: #047857
success-500: #10B981  → text-success-500 (in stock, completed)
warning-50 : #FFFBEB  → bg-warning-50   | warning-700: #B45309
warning-500: #F59E0B  → text-warning-500 (low stock, pending)
error-50   : #FEF2F2  → bg-error-50     | error-700: #B91C1C
error-500  : #EF4444  → text-error-500   (out of stock, failed)
info-50    : #E0F2FE  → bg-info-50      | info-700: #0369A1
info-500   : #06B6D4  → text-info-500    (info banners, notes)

# NEUTRAL (Slate)
slate-50 : #F8FAFC  → bg-slate-50   (page background)
slate-100: #F1F5F9  → bg-slate-100  (card, section bg)
slate-200: #E2E8F0  → border-slate-200 (dividers, borders)
slate-400: #94A3B8  → text-slate-400 (placeholder, disabled)
slate-500: #64748B  → text-slate-500 (secondary text)
slate-700: #334155  → text-slate-700 (body text)
slate-900: #0F172A  → text-slate-900 (headings, important)

## TYPOGRAPHY
Font: 'Inter', sans-serif  (loaded in root layout from Google Fonts)
text-xs  : 12px/1.5 → metadata, timestamps, labels
text-sm  : 14px/1.5 → table cells, secondary info
text-base: 16px/1.6 → body text, descriptions
text-lg  : 18px/1.5 → subheadings, section labels
text-xl  : 20px/1.4 → product names, card titles
text-2xl : 24px/1.3 → prices (bold), page subtitles
text-3xl : 30px/1.2 → section headings, important numbers
text-4xl : 36px/1.1 → hero headings

# Special typography patterns:
Product name  : text-lg font-semibold text-slate-900 leading-tight
Current price : text-2xl font-bold text-primary-700
Original price: text-base text-slate-400 line-through
Discount badge: text-sm font-semibold text-error-700
Spec label    : text-xs font-medium text-slate-500 uppercase tracking-wide

## SPACING (4px base)
p-1:4  p-2:8  p-3:12  p-4:16  p-5:20  p-6:24
p-8:32  p-10:40  p-12:48  p-16:64  p-20:80  p-24:96
Section gap: py-16 (64px) between major page sections
Card padding: p-4 (mobile) → p-6 (desktop)
Form field gap: space-y-4

## BORDER RADIUS
rounded    : 6px  → inputs, small elements
rounded-lg : 8px  → ★ buttons (default)
rounded-xl : 12px → ★ product cards (default)
rounded-2xl: 16px → modals, drawers
rounded-full: 999px → avatars, pill badges

## SHADOWS
shadow-sm : subtle → ProductCard default
shadow-md : medium → ProductCard hover, dropdowns
shadow-lg : strong → modals, sticky header

## KEY COMPONENT PATTERNS
# CTA Button
bg-primary-600 hover:bg-primary-700 text-white font-semibold
rounded-lg px-6 py-3 transition-colors duration-200

# ProductCard
bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow
overflow-hidden cursor-pointer

# Input field
border border-slate-300 rounded-lg px-3 py-2
focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent

# Status badges
In Stock   : bg-success-50 text-success-700 rounded-full px-2.5 py-0.5 text-xs
Low Stock  : bg-warning-50 text-warning-700 rounded-full px-2.5 py-0.5 text-xs
Out of Stock: bg-error-50 text-error-700 rounded-full px-2.5 py-0.5 text-xs
