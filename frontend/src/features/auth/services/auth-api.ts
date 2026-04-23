import { apiClient } from "@/lib/api-client";
import { API_ENDPOINTS } from "@/lib/api-endpoints";

export type RegisterPayload = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthResponse = {
  user: {
    id: number;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    role: string;
  };
  accessToken: string;
  refreshToken: string;
};

export function register(payload: RegisterPayload) {
  return apiClient<AuthResponse>(API_ENDPOINTS.auth.register, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function login(payload: LoginPayload) {
  return apiClient<AuthResponse>(API_ENDPOINTS.auth.login, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function refreshToken(refreshToken: string) {
  return apiClient<{ accessToken: string; refreshToken: string }>(
    API_ENDPOINTS.auth.refresh,
    {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    }
  );
}

export function logout(token: string) {
  return apiClient<{ message: string }>(API_ENDPOINTS.auth.logout, {
    method: "POST",
    token,
  });
}