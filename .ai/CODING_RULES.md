# CODING RULES — MANDATORY FOR ALL AI TASKS
# Violation of any rule = broken codebase. No exceptions.

## RULE 1: Shared components first
# Before creating ANY component, check @computer-store/ui package first.
# Command: ls node_modules/@computer-store/ui/src/components/
# If it exists in shared → import from "@computer-store/ui". DONE.
# If not → check src/components/ for local equivalent.
# Only create new component if neither shared nor local has it.

## RULE 2: TypeScript strict — zero "any"
# tsconfig.json has strict: true. Never use: any, as any, @ts-ignore
# All API responses → type from src/types/ (not inferred inline)
# All component props → explicit interface (ComponentNameProps)
# Type imports: import type { X } from "@/types/..."

## RULE 3: Design tokens only — never hardcode colors
# ✅ text-primary-600 | bg-success-50 | border-slate-200
# ❌ text-[#1D4ED8]   | bg-[#ECFDF5]  | style={{color:"#xxx"}}
# Tokens defined in @computer-store/ui/tailwind-preset.
# Run: cat node_modules/@computer-store/ui/tailwind-preset.ts for full list.

## RULE 4: Server Component is the default
# Do NOT add "use client" unless component needs:
# → useState, useEffect, useReducer
# → Browser APIs (window, document, localStorage)
# → Event handlers (onClick, onChange that cause re-renders)
# → Third-party client-only libraries

## RULE 5: No API calls in components
# API calls → src/services/{resource}.service.ts ONLY
# Server components → call service.ts directly (async/await)
# Client components → useQuery(service.fn, queryKey)
# NEVER: fetch() or axios inside a component body

## RULE 6: No hardcoded content
# No Vietnamese text in component JSX (use props)
# No hardcoded product data (use API/mock from services)
# No hardcoded route strings (use constants from @/lib/routes.ts)
# Currency: always use formatVND() from @/lib/formatters.ts

## RULE 7: Naming conventions
# Component files : ProductCard.tsx (PascalCase)
# Hook files       : useCart.ts (camelCase, "use" prefix)
# Service files    : product.service.ts (camelCase + .service)
# Type files       : product.types.ts (camelCase + .types)
# Store files      : cart.store.ts (camelCase + .store)
# Named exports ONLY: export function X() {} — no default exports

## RULE 8: Every page needs 3 files
# page.tsx     : the page component
# loading.tsx  : Skeleton placeholder (use Skeleton from shared)
# error.tsx    : Error boundary with friendly message

## RULE 9: Mobile-first responsive
# Start with mobile layout, add md: lg: xl: progressively
# Product grid: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
# Never break layout on screen width < 375px

## RULE 10: Barrel exports
# Every component folder has index.ts that re-exports all components
# Add new component to index.ts immediately after creation
