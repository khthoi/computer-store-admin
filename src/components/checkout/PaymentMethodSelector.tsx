"use client";

import Image from "next/image";
import { BuildingLibraryIcon } from "@heroicons/react/24/outline";
import { MethodCard } from "@/src/components/checkout/ShippingMethodSelector";
import type { PaymentMethod } from "@/src/store/checkout.store";

// ─── Icons map ────────────────────────────────────────────────────────────────
//
// Keys must match the `id` values in MOCK_PAYMENT_METHODS exactly:
//   cod | bank-transfer | momo | zalopay

const ICON: Record<string, React.ReactNode> = {
  cod: (
    <Image
      src="/svg/payment-method-cash-on-delivery.svg"
      alt="Cash on Delivery"
      width={45}
      height={45}
      className="object-contain"
    />
  ),
  // key was "bank" — corrected to match method.id "bank-transfer"
  "bank-transfer": (
    <Image
      src="/svg/payment-method-creditcard.svg"
      alt="Bank Transfer"
      width={45}
      height={45}
      className="object-contain"
    />
  ),
  momo: (
    <Image
      src="/svg/payment-method-MOMO.svg"
      alt="MoMo"
      width={45}
      height={45}
      className="object-contain"
    />
  ),
  zalopay: (
    <Image
      src="/svg/payment-method-ZaloPay.svg"
      alt="ZaloPay"
      width={45}
      height={45}
      className="object-contain"
    />
  ),
};

// Fallback for any method.id not present in the ICON map.
const FALLBACK_ICON = (
  <BuildingLibraryIcon className="h-5 w-5 text-secondary-400" aria-hidden="true" />
);

// ─── Component ────────────────────────────────────────────────────────────────

export interface PaymentMethodSelectorProps {
  options: PaymentMethod[];
  selectedId: string | null;
  onChange: (id: string) => void;
}

export function PaymentMethodSelector({
  options,
  selectedId,
  onChange,
}: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-secondary-900">
        Phương thức thanh toán
      </h2>

      <fieldset>
        <legend className="sr-only">Chọn phương thức thanh toán</legend>
        <div className="space-y-2">
          {options.map((method) => (
            <MethodCard
              key={method.id}
              id={`payment-${method.id}`}
              groupName="payment"
              title={method.name}
              description={method.description}
              selected={selectedId === method.id}
              onChange={() => onChange(method.id)}
              trailing={ICON[method.id] ?? FALLBACK_ICON}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
}
