// prevent circular imports
import axios from "axios";

let getAccessToken: () => string | null = () => null;
export function setAccessTokenGetter(fn: () => string | null) {
  getAccessToken = fn;
}

let getRefreshToken: (() => Promise<string | null>) | null = null;
export function setRefreshTokenGetter(fn: () => Promise<string | null>) {
  getRefreshToken = fn;
}

let handleUnauthorized:
  | ((refreshToken?: string | null) => Promise<string | null>)
  | null = null;
export function setUnauthorizedHandler(
  fn: (refreshToken?: string | null) => Promise<string | null>
) {
  handleUnauthorized = fn;
}

const api = axios.create({
  baseURL:
    process.env.EXPO_PUBLIC_API_URL ||
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000",
  withCredentials: true,
});

// attach token on each request
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// handle 401 globally
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      handleUnauthorized
    ) {
      originalRequest._retry = true;

      try {
        // optional: get refresh token from mobile if needed
        const refreshToken = getRefreshToken ? await getRefreshToken() : null;

        const newToken = await handleUnauthorized(refreshToken);
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch {
        // handler threw or returned null
      }
    }

    return Promise.reject(error);
  }
);

export default api;
