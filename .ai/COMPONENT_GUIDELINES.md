# COMPONENT GUIDELINES — computer-store-frontend

## Decision: Shared vs Local Component?

QUESTION: Does this component exist in @computer-store/ui?
  YES → import from "@computer-store/ui". Do NOT recreate.
  NO  → Does a similar LOCAL component exist in src/components/?
           YES → extend with a new prop variant
           NO  → create new local component

## Shared package components (NEVER recreate these)
UI primitives : Button, Input, Textarea, Select, Checkbox, Radio, Toggle
Feedback      : Badge, Alert, Toast, Modal, Drawer, Tooltip, Popover
Loading       : Skeleton, Spinner, LoadingOverlay
Layout        : Tabs, Accordion, Avatar, Divider
Data          : DataTable, StatCard, ChartWidget, FileUpload

## Local component categories (this repo only)
layout/   : Storefront-specific shell (Navbar with MegaMenu, Footer)
navigation/: Storefront pagination, FilterBar, SearchBar
product/  : Business domain — ProductCard, Gallery, PriceTag
commerce/ : Transaction domain — Cart, Checkout, Orders
buildpc/  : Feature-specific — PCPartSelector, CompatibilityAlert
reviews/  : Feature-specific — ReviewCard, ReviewForm
support/  : Feature-specific — TicketCard, TicketThread

## Standard Component Template

// src/components/product/ProductCard.tsx
import type { Product } from '@/types/product.types';
import { Badge, Skeleton } from '@computer-store/ui';  // shared
import { PriceTag } from '@/components/product/PriceTag';  // local

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact' | 'horizontal';
  isLoading?: boolean;
  onAddToCart?: (variantId: string) => void;
  className?: string;
}

export function ProductCard({
  product, variant = 'default', isLoading, onAddToCart, className
}: ProductCardProps) {
  if (isLoading) return <ProductCardSkeleton />;
  // ... implementation using only shared tokens
}

## Naming Conventions
Component  : PascalCase → ProductCard, CartSummary
Props type : {Name}Props → ProductCardProps
Event props: on + Action → onAddToCart, onQuantityChange
Bool props : is/has + adj → isLoading, hasError, isSelected

## Export Rules
1. Named exports ONLY (no default export)
2. Add to category barrel: src/components/product/index.ts
3. Re-export from root: src/components/index.ts

## What to put in each local category
layout/   : Components that contain routing logic (Link, useRouter)
navigation/: Components with URL state (searchParams, router.push)
product/  : READ-ONLY display of product data (no mutations)
commerce/ : WRITE operations (cart add, order create, payment)
feature/  : Isolated feature with complex state (buildPC, reviews)
