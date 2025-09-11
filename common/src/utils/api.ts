import axios from "axios";
import {
  refreshAccessToken,
  logout,
  setAccessToken,
} from "../redux/slices/authSlice";

// store reference setter
let storeRef: any = null;
export function setStore(s: any) {
  storeRef = s;
}

let refreshTokenGetter: (() => Promise<string | null>) | null = null;
export function setRefreshTokenGetter(fn: () => Promise<string | null>) {
  refreshTokenGetter = fn;
}

const api = axios.create({
  baseURL: "http://localhost:5000",
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

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // mobile can still supply refresh token in body
        let refreshToken: string | undefined;
        if (refreshTokenGetter) {
          const token = await refreshTokenGetter();
          if (token) refreshToken = token;
        }

        const result = await storeRef
          .dispatch(refreshAccessToken(refreshToken))
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
