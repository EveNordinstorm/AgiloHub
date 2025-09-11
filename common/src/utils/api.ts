import axios from "axios";
import {
  refreshAccessToken,
  logout,
  setAccessToken,
} from "../redux/slices/authSlice";

// Use a store reference setter
let storeRef: any = null;
export function setStore(s: any) {
  storeRef = s;
}

let refreshTokenGetter: (() => Promise<string | null>) | null = null;
export function setRefreshTokenGetter(fn: () => Promise<string | null>) {
  refreshTokenGetter = fn;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || process.env.API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = storeRef?.getState().auth.accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    const hasRefreshToken =
      refreshTokenGetter || document.cookie.includes("refreshToken");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      hasRefreshToken
    ) {
      originalRequest._retry = true;

      try {
        // Mobile: get refresh token from secure store if set
        let refreshToken: string | null = null;
        if (refreshTokenGetter) {
          refreshToken = await refreshTokenGetter();
        }

        // call thunk
        const result = await storeRef
          .dispatch(refreshAccessToken(refreshToken || undefined))
          .unwrap();

        storeRef.dispatch(setAccessToken(result.accessToken));

        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;
        return api(originalRequest);
      } catch {
        storeRef.dispatch(logout());
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);
export default api;
