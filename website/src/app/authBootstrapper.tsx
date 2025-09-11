"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAccessToken, logout } from "common/redux/slices/authSlice";
import api from "common/utils/api";

export default function AuthBootstrapper() {
  const dispatch = useDispatch();

  useEffect(() => {
    const bootstrap = async () => {
      try {
        // Only attempt refresh if refresh cookie exists
        if (document.cookie.includes("refreshToken")) {
          const { data } = await api.post(
            "/auth/refresh",
            {},
            { withCredentials: true }
          );
          dispatch(setAccessToken(data.accessToken));
        }
      } catch {
        dispatch(logout());
      }
    };

    bootstrap();
  }, [dispatch]);

  return null;
}
