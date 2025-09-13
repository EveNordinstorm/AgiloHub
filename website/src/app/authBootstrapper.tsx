"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAccessToken, logout, setUser } from "common/redux/slices/authSlice";
import api from "common/utils/api";

export default function AuthBootstrapper() {
  const dispatch = useDispatch();

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const { data } = await api.post(
          "/auth/refresh",
          {},
          { withCredentials: true }
        );
        dispatch(setAccessToken(data.accessToken));
        dispatch(setUser(data.user));
      } catch {
        dispatch(logout());
      }
    };

    bootstrap();
  }, [dispatch]);

  return null;
}
