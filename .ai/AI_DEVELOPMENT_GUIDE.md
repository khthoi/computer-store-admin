# AI DEVELOPMENT GUIDE — computer-store-frontend
# Follow this EXACT workflow for every single task.

## MANDATORY PRE-TASK CHECKLIST (run before writing code)
□ Read .ai/CODING_RULES.md — know the rules
□ Read .ai/FEATURE_SPEC.md — find spec for this feature
□ Run: ls node_modules/@computer-store/ui/src/components/
□ Run: find src/components -name "*.tsx" | sort
□ Run: find src/types -name "*.ts"

## STEP-BY-STEP WORKFLOW

### Step 1: Understand the task
  - Find the feature in FEATURE_SPEC.md (e.g., CS-02)
  - Note: required components, API endpoints, business rules
  - Identify: Server Component or Client Component?

### Step 2: Check shared package
  - ls node_modules/@computer-store/ui/src/components/
  - Import anything available from "@computer-store/ui"
  - STOP — do not create what already exists

### Step 3: Check local components
  - find src/components -name "*.tsx" | grep -i <name>
  - If found → import and use (add variant prop if needed)

### Step 4: Plan file structure
  Types first  → src/types/{domain}.types.ts
  Service      → src/services/{resource}.service.ts
  Hook (if SC) → src/hooks/use{Feature}.ts
  Component(s) → src/components/{category}/{Name}.tsx
  Page         → src/app/(group)/route/page.tsx
  Loading      → src/app/(group)/route/loading.tsx

### Step 5: Implement in order
  1. Type interfaces
  2. Service functions (with proper error handling)
  3. Custom hook if needed
  4. Child components (smallest first)
  5. Page component (compose children)
  6. loading.tsx (Skeleton layout)

### Step 6: Self-review
  □ Zero "any" types
  □ No hardcoded colors (no text-[#hex])
  □ No Vietnamese text hardcoded in JSX
  □ Loading + error + empty states covered
  □ Mobile responsive (check mobile view)
  □ New components added to index.ts barrel
  □ "use client" only where truly needed

## COMMON TASK RECIPES

# RECIPE: Add new page
  1. Find spec in FEATURE_SPEC.md
  2. Create page.tsx + loading.tsx + error.tsx
  3. Server Component: fetch data, pass as props
  4. Compose from shared + local components

# RECIPE: Add new API endpoint integration
  1. Check API_CONTRACT.md for endpoint
  2. Add type to src/types/
  3. Add function to src/services/
  4. Use with useQuery in component

# RECIPE: Build PC compatibility check
  1. Update buildpc.store.ts with new part
  2. Call GET /compatibility/check?parts=
  3. Show CompatibilityAlert if conflict
  4. Filter next selector list based on result

## ANTI-PATTERNS (immediate code review rejection)
  ✗ Creating Button.tsx when @computer-store/ui has Button
  ✗ import { Button } from "@/components/ui/Button" — use shared
  ✗ fetch() inside a React component
  ✗ const color = "#1D4ED8" — use Tailwind token
  ✗ type ApiData = any
  ✗ No loading.tsx for a new page
  ✗ Storing API response in Zustand (use React Query)
