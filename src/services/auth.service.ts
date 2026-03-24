/**
 * auth.service.ts — Auth service layer (demo/stub).
 *
 * All functions simulate async API calls with artificial delays.
 * Replace the mock implementations with real Axios calls to the NestJS backend:
 *   POST /api/auth/login
 *   POST /api/auth/register
 *   POST /api/auth/forgot-password
 *   POST /api/auth/reset-password
 *   GET  /api/auth/oauth/:provider
 *   POST /api/auth/logout
 *   POST /api/auth/refresh
 */

import type {
  AuthResponse,
  AuthUser,
  LoginFormValues,
  OAuthProvider,
  RegisterFormValues,
} from "@/src/types/auth.types";

// ─── Mock data ─────────────────────────────────────────────────────────────────

const MOCK_USERS: Record<string, { user: AuthUser; password: string }> = {
  "demo@techstore.vn": {
    password: "Demo1234",
    user: {
      id: "user-001",
      email: "demo@techstore.vn",
      name: "Nguyễn Văn Demo",
      phone: "0912345678",
      role: "customer",
    },
  },
  "test@techstore.vn": {
    password: "Test1234",
    user: {
      id: "user-002",
      email: "test@techstore.vn",
      name: "Trần Thị Test",
      phone: "0987654321",
      role: "customer",
    },
  },
};

const MOCK_RESET_TOKENS = new Set(["valid-reset-token-abc123"]);

/** Simulate network delay */
function delay(ms = 800): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function makeMockToken(): string {
  return `mock-jwt-${Math.random().toString(36).slice(2)}`;
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const AuthService = {
  /**
   * Login with email + password.
   * TODO: POST /api/auth/login → returns { user, accessToken, expiresIn }
   */
  async login(values: LoginFormValues): Promise<AuthResponse> {
    await delay();

    const record = MOCK_USERS[values.email.trim().toLowerCase()];
    if (!record || record.password !== values.password) {
      throw new Error("Email hoặc mật khẩu không đúng. Vui lòng thử lại.");
    }

    return {
      user: record.user,
      accessToken: makeMockToken(),
      expiresIn: values.rememberMe ? 30 * 24 * 60 * 60 : 3600,
    };
  },

  /**
   * Register a new account.
   * TODO: POST /api/auth/register → returns { user, accessToken, expiresIn }
   */
  async register(values: RegisterFormValues): Promise<AuthResponse> {
    await delay(1000);

    if (MOCK_USERS[values.email.trim().toLowerCase()]) {
      throw new Error("Email này đã được đăng ký. Vui lòng dùng email khác hoặc đăng nhập.");
    }

    const newUser: AuthUser = {
      id: `user-${Date.now()}`,
      email: values.email.trim().toLowerCase(),
      name: values.name.trim(),
      phone: values.phone.trim() || undefined,
      role: "customer",
    };

    return {
      user: newUser,
      accessToken: makeMockToken(),
      expiresIn: 3600,
    };
  },

  /**
   * Send password reset email.
   * TODO: POST /api/auth/forgot-password → returns { message }
   */
  async forgotPassword(email: string): Promise<void> {
    await delay(800);
    // In real implementation, always succeeds (don't reveal if email exists).
    // The mock just resolves silently.
    void email;
  },

  /**
   * Validate a reset token (called on page load for ResetPassword page).
   * TODO: GET /api/auth/reset-password?token=... → 200 or 4xx
   */
  async validateResetToken(token: string): Promise<boolean> {
    await delay(600);
    return MOCK_RESET_TOKENS.has(token);
  },

  /**
   * Submit the new password with the reset token.
   * TODO: POST /api/auth/reset-password → returns { message } or { user, accessToken }
   */
  async resetPassword(token: string, password: string): Promise<void> {
    await delay(800);
    if (!MOCK_RESET_TOKENS.has(token)) {
      throw new Error("Link đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.");
    }
    void password; // In real impl, send to backend
  },

  /**
   * Initiate OAuth login flow.
   * TODO: Redirect to GET /api/auth/oauth/:provider or use NextAuth signIn()
   *
   * Mock: returns a demo user after a short delay.
   */
  async oauthLogin(provider: OAuthProvider): Promise<AuthResponse> {
    await delay(1200);

    // Mock OAuth always succeeds with a demo user.
    const oauthUser: AuthUser = {
      id: `oauth-${provider}-001`,
      email: `oauth.${provider}@techstore.vn`,
      name: provider === "google"
        ? "Google User"
        : provider === "facebook"
        ? "Facebook User"
        : "Zalo User",
      role: "customer",
    };

    return {
      user: oauthUser,
      accessToken: makeMockToken(),
      expiresIn: 3600,
    };
  },

  /**
   * Logout — invalidate refresh token on backend.
   * TODO: POST /api/auth/logout
   */
  async logout(): Promise<void> {
    await delay(300);
    // Backend clears refresh token from DB / Redis
  },
};
