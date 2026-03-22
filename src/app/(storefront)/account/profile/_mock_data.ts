// ─── Types ────────────────────────────────────────────────────────────────────

export type Gender = "male" | "female" | "other";

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  emailVerified: boolean;
  phone: string;
  gender: Gender;
  dateOfBirth: string; // "YYYY-MM-DD"
  avatarSrc?: string;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

export const MOCK_PROFILE: UserProfile = {
  id: "user-001",
  fullName: "Nguyễn Văn An",
  email: "nguyenvanan@gmail.com",
  emailVerified: true,
  phone: "0912345678",
  gender: "male",
  dateOfBirth: "1995-06-15",
  avatarSrc: undefined,
};
