"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import type {
  CompareProduct,
  ProductCategory,
} from "@/src/components/compare-ui/types";

// ─── Toast ────────────────────────────────────────────────────────────────────

export interface CompareToast {
  id: string;
  message: string;
  type: "success" | "error";
}

// ─── State ────────────────────────────────────────────────────────────────────

interface CompareState {
  compareList: CompareProduct[];
  activeCategory: ProductCategory | null;
  isDrawerOpen: boolean;
  toasts: CompareToast[];
}

const INITIAL_STATE: CompareState = {
  compareList: [],
  activeCategory: null,
  isDrawerOpen: false,
  toasts: [],
};

// ─── Actions ──────────────────────────────────────────────────────────────────

type CompareAction =
  | { type: "ADD_PRODUCT"; payload: CompareProduct }
  | { type: "REMOVE_PRODUCT"; payload: string }
  | { type: "CLEAR_ALL" }
  | { type: "OPEN_DRAWER" }
  | { type: "CLOSE_DRAWER" }
  | { type: "ADD_TOAST"; payload: CompareToast }
  | { type: "REMOVE_TOAST"; payload: string }
  | {
      type: "HYDRATE";
      payload: Pick<CompareState, "compareList" | "activeCategory">;
    };

// ─── Reducer ──────────────────────────────────────────────────────────────────

function compareReducer(
  state: CompareState,
  action: CompareAction
): CompareState {
  switch (action.type) {
    case "ADD_PRODUCT": {
      const p = action.payload;
      if (state.compareList.some((x) => x.id === p.id)) return state;
      if (state.compareList.length >= 4) return state;
      if (state.activeCategory && p.category !== state.activeCategory)
        return state;
      return {
        ...state,
        compareList: [...state.compareList, p],
        activeCategory: state.activeCategory ?? p.category,
      };
    }
    case "REMOVE_PRODUCT": {
      const next = state.compareList.filter((p) => p.id !== action.payload);
      return {
        ...state,
        compareList: next,
        activeCategory: next.length === 0 ? null : state.activeCategory,
      };
    }
    case "CLEAR_ALL":
      return { ...state, compareList: [], activeCategory: null };
    case "OPEN_DRAWER":
      return { ...state, isDrawerOpen: true };
    case "CLOSE_DRAWER":
      return { ...state, isDrawerOpen: false };
    case "ADD_TOAST":
      return { ...state, toasts: [...state.toasts, action.payload] };
    case "REMOVE_TOAST":
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.payload),
      };
    case "HYDRATE":
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

export interface CompareContextValue {
  state: CompareState;
  addProduct: (product: CompareProduct) => void;
  removeProduct: (id: string) => void;
  clearAll: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CompareContext = createContext<CompareContextValue | null>(null);

const LS_KEY = "compare_list";

// ─── Provider ─────────────────────────────────────────────────────────────────

export function CompareProvider({
  children,
  initialProducts = [],
  productCatalogue = [],
}: {
  children: ReactNode;
  /** Pre-populate on first load (used by the demo page when localStorage is empty) */
  initialProducts?: CompareProduct[];
  /**
   * Full spec-rich product list used as a lookup table.
   *
   * Problem it solves: the drawer adds products with `specGroups: []` (because
   * CatalogueProduct has no spec data). If a product is removed and then
   * re-added via the drawer, its spec data is permanently lost — even after a
   * page refresh (because the empty-specs object is also written to
   * localStorage). Passing the authoritative spec data here lets every `addProduct`
   * call and every localStorage hydration restore full spec data automatically.
   */
  productCatalogue?: CompareProduct[];
}) {
  const [state, dispatch] = useReducer(compareReducer, INITIAL_STATE);
  const toastCounter = useRef(0);

  // Stable lookup: product ID → full CompareProduct with specGroups.
  // Stored in a ref so it never triggers re-renders and is always current.
  const catalogueMap = useRef(
    new Map(productCatalogue.map((p) => [p.id, p]))
  );

  // Hydrate from localStorage on mount; fall back to initialProducts.
  // In both paths we enrich every product from catalogueMap so that specs
  // lost from a previous remove-then-re-add cycle are silently restored.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Pick<
          CompareState,
          "compareList" | "activeCategory"
        >;
        if (Array.isArray(parsed.compareList) && parsed.compareList.length > 0) {
          const enriched = parsed.compareList.map(
            (p) => catalogueMap.current.get(p.id) ?? p
          );
          dispatch({
            type: "HYDRATE",
            payload: { ...parsed, compareList: enriched },
          });
          return;
        }
      }
    } catch {
      // ignore parse errors
    }
    // Nothing in localStorage — use demo data
    if (initialProducts.length > 0) {
      dispatch({
        type: "HYDRATE",
        payload: {
          compareList: initialProducts,
          activeCategory: initialProducts[0]?.category ?? null,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally empty — runs once on mount

  // Persist to localStorage whenever the compare list changes
  useEffect(() => {
    try {
      localStorage.setItem(
        LS_KEY,
        JSON.stringify({
          compareList: state.compareList,
          activeCategory: state.activeCategory,
        })
      );
    } catch {
      // ignore storage errors
    }
  }, [state.compareList, state.activeCategory]);

  // ── Toast helper ──────────────────────────────────────────────────────────

  const showToast = useCallback(
    (message: string, type: CompareToast["type"]) => {
      const id = String(++toastCounter.current);
      dispatch({ type: "ADD_TOAST", payload: { id, message, type } });
      setTimeout(
        () => dispatch({ type: "REMOVE_TOAST", payload: id }),
        3500
      );
    },
    []
  );

  // ── Actions ───────────────────────────────────────────────────────────────

  const addProduct = useCallback(
    (product: CompareProduct) => {
      // Always prefer the spec-rich version from the catalogue.
      // This is the key fix for the remove-then-re-add data loss: the drawer
      // creates products with specGroups:[] from CatalogueProduct, but the
      // catalogue map holds the authoritative full version.
      const fullProduct = catalogueMap.current.get(product.id) ?? product;

      if (state.compareList.some((p) => p.id === fullProduct.id)) return;
      if (state.compareList.length >= 4) {
        showToast("Tối đa 4 sản phẩm", "error");
        return;
      }
      if (
        state.activeCategory &&
        fullProduct.category !== state.activeCategory
      ) {
        showToast("Chỉ có thể so sánh sản phẩm cùng loại", "error");
        return;
      }
      dispatch({ type: "ADD_PRODUCT", payload: fullProduct });
      showToast(
        `Đã thêm "${fullProduct.name.slice(0, 28)}…" vào danh sách so sánh`,
        "success"
      );
    },
    [state.compareList, state.activeCategory, showToast]
  );

  const removeProduct = useCallback((id: string) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: id });
  }, []);

  const clearAll = useCallback(() => {
    dispatch({ type: "CLEAR_ALL" });
  }, []);

  const openDrawer = useCallback(() => {
    dispatch({ type: "OPEN_DRAWER" });
  }, []);

  const closeDrawer = useCallback(() => {
    dispatch({ type: "CLOSE_DRAWER" });
  }, []);

  return (
    <CompareContext.Provider
      value={{ state, addProduct, removeProduct, clearAll, openDrawer, closeDrawer }}
    >
      {children}

      {/* ── Toast stack (fixed top-right) ── */}
      <div
        className="pointer-events-none fixed top-6 right-6 z-[60] flex flex-col gap-2"
        role="region"
        aria-live="polite"
        aria-label="So sánh thông báo"
      >
        <AnimatePresence>
          {state.toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={[
                "pointer-events-auto flex items-center gap-2 rounded-xl px-4 py-3",
                "text-sm font-medium text-white shadow-xl",
                t.type === "success" ? "bg-success-600" : "bg-error-600",
              ].join(" ")}
            >
              {t.type === "success" ? (
                <CheckCircleIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
              ) : (
                <ExclamationCircleIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
              )}
              {t.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </CompareContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCompare(): CompareContextValue {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used inside <CompareProvider>");
  return ctx;
}
