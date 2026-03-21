import type {
  ShippingMethod,
  PaymentMethod,
  SavedAddress,
} from "@/src/store/checkout.store";
import type { CouponCode } from "@/src/store/cart.store";

// ─── Shipping methods ─────────────────────────────────────────────────────────

/**
 * Three tiers: free standard, paid express, paid same-day.
 * Prices are in VND; 0 = free.
 */
export const MOCK_SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: "standard",
    name: "Giao hàng tiêu chuẩn",
    description: "Giao hàng toàn quốc qua đối tác vận chuyển",
    price: 0,
    estimatedDays: "3–5 ngày làm việc",
  },
  {
    id: "express",
    name: "Giao hàng nhanh",
    description: "Ưu tiên xử lý, giao qua GHN Express",
    price: 30_000,
    estimatedDays: "1–2 ngày làm việc",
  },
  {
    id: "same-day",
    name: "Giao hàng trong ngày",
    description: "Đặt trước 12:00 — giao trong ngày (nội thành HN & HCM)",
    price: 50_000,
    estimatedDays: "Trong ngày",
  },
];

// ─── Payment methods ──────────────────────────────────────────────────────────

export const MOCK_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: "cod",
    name: "Thanh toán khi nhận hàng (COD)",
    description: "Trả tiền mặt khi nhận hàng — không cần thanh toán trước",
  },
  {
    id: "bank-transfer",
    name: "Chuyển khoản ngân hàng",
    description: "Hỗ trợ mọi ngân hàng tại Việt Nam qua QR Code",
  },
  {
    id: "momo",
    name: "Ví MoMo",
    description: "Quét mã QR hoặc nhập số điện thoại MoMo",
  },
  {
    id: "zalopay",
    name: "ZaloPay",
    description: "Thanh toán nhanh qua ứng dụng ZaloPay",
  },
];

// ─── Pre-applied coupon (demo) ────────────────────────────────────────────────

/**
 * Simulates a coupon the user already applied on /cart and carried over to
 * /checkout. CartProvider accepts this via `initialAppliedCoupon`.
 */
export const MOCK_APPLIED_COUPON: CouponCode = {
  code: "TECH10",
  type: "percent",
  value: 10,
};

// ─── Saved addresses (demo) ───────────────────────────────────────────────────

export const MOCK_SAVED_ADDRESSES: SavedAddress[] = [
  {
    id: "addr-1",
    fullName: "Nguyễn Văn An",
    phone: "0901234567",
    email: "nguyenvanan@example.com",
    province: "Hà Nội",
    district: "Cầu Giấy",
    ward: "Dịch Vọng",
    addressDetail: "Số 10, ngõ 5, đường Xuân Thủy",
    isDefault: true,
  },
  {
    id: "addr-2",
    fullName: "Nguyễn Văn An",
    phone: "0901234567",
    email: "nguyenvanan@example.com",
    province: "TP. Hồ Chí Minh",
    district: "Quận 1",
    ward: "Bến Nghé",
    addressDetail: "123 Lê Lợi, tầng 5",
    isDefault: false,
  },
];
