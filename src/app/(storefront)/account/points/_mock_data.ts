// ─── Types ────────────────────────────────────────────────────────────────────

export type PointTransactionType = "earn" | "redeem" | "expire" | "adjust";

export type MemberTier = "Đồng" | "Bạc" | "Vàng" | "Bạch Kim";

export interface PointTransaction {
  id: string;
  type: PointTransactionType;
  description: string;
  /** Positive = earned / adjusted. Negative = redeemed / expired. */
  points: number;
  balanceAfter: number;
  createdAt: string; // ISO datetime
}

export interface PointsData {
  balance: number;
  tier: MemberTier;
  /** 0–100: how far through the current tier */
  tierProgressPercent: number;
  pointsToNextTier: number;
  nextTier: MemberTier | null;
  history: PointTransaction[];
}

// ─── Mock data ────────────────────────────────────────────────────────────────

export const MOCK_POINTS: PointsData = {
  balance: 6000,
  tier: "Bạch Kim",
  tierProgressPercent: 72,
  pointsToNextTier: 2000,
  nextTier: null,
  history: [
    {
      id: "pt-001",
      type: "earn",
      description: "Mua hàng đơn #DH-20512",
      points: 350,
      balanceAfter: 4_250,
      createdAt: "2026-03-18T14:30:00.000Z",
    },
    {
      id: "pt-002",
      type: "earn",
      description: "Mua hàng đơn #DH-20480",
      points: 580,
      balanceAfter: 3_900,
      createdAt: "2026-03-05T09:15:00.000Z",
    },
    {
      id: "pt-003",
      type: "redeem",
      description: "Đổi điểm giảm giá đơn #DH-20480",
      points: -200,
      balanceAfter: 3_320,
      createdAt: "2026-02-22T11:00:00.000Z",
    },
    {
      id: "pt-004",
      type: "earn",
      description: "Mua hàng đơn #DH-20390",
      points: 1_200,
      balanceAfter: 3_520,
      createdAt: "2026-02-10T16:45:00.000Z",
    },
    {
      id: "pt-005",
      type: "earn",
      description: "Thưởng sinh nhật",
      points: 500,
      balanceAfter: 2_320,
      createdAt: "2026-01-15T08:00:00.000Z",
    },
    {
      id: "pt-006",
      type: "expire",
      description: "Điểm hết hạn (hạn 31/12/2025)",
      points: -180,
      balanceAfter: 1_820,
      createdAt: "2026-01-01T00:00:00.000Z",
    },
    {
      id: "pt-007",
      type: "earn",
      description: "Mua hàng đơn #DH-20280",
      points: 820,
      balanceAfter: 2_000,
      createdAt: "2025-12-20T13:30:00.000Z",
    },
    {
      id: "pt-008",
      type: "adjust",
      description: "Điều chỉnh điểm từ CSKH",
      points: 100,
      balanceAfter: 1_180,
      createdAt: "2025-12-15T10:00:00.000Z",
    },
  ],
};
