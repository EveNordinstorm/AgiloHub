import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/apiCore";
import type { IUser } from "../../types/interfaces/user";

export interface AuthState {
  user: IUser | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  loading: false,
  error: null,
};

// Async thunks
export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    data: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.post("/auth/register", data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error || "Registration failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || "Login failed");
    }
  }
);

// mobile uses token param
export const refreshAccessToken = createAsyncThunk(
  "auth/refresh",
  async (refreshToken?: string) => {
    if (refreshToken) {
      // mobile: send token explicitly
      const res = await api.post("/auth/refresh", { refreshToken });
      return res.data;
    } else {
      // web: cookie automatically sent
      const res = await api.post("/auth/refresh");
      return res.data;
    }
  }
);

export const fetchProfile = createAsyncThunk(
  "auth/profile",
  async (_, { rejectWithValue, dispatch, getState }) => {
    const state: any = getState();
    const token = state.auth.accessToken;

    // If there is no access token, skip
    if (!token) {
      return rejectWithValue("No access token");
    }

    try {
      const res = await api.get("/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (err: any) {
      // Handle expired token case
      if (err.response?.status === 401) {
        try {
          const refreshed = await dispatch(
            refreshAccessToken(undefined)
          ).unwrap();
          // retry profile fetch after refresh
          const retryRes = await api.get("/auth/profile", {
            headers: { Authorization: `Bearer ${refreshed.accessToken}` },
          });
          return retryRes.data;
        } catch {
          return rejectWithValue("Session expired. Please log in again.");
        }
      }

      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch profile"
      );
    }
  }
);

// Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.error = null;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
      })
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, setAccessToken, setUser } = authSlice.actions;
export default authSlice.reducer;
