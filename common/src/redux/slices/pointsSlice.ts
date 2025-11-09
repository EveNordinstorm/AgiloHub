import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/apiCore";
import { PointsTransaction } from "../../types/interfaces/pointsTransaction";

type PointsState = {
  total: number;
  history: PointsTransaction[];
  loading: boolean;
  error?: string;
};

const initialState: PointsState = {
  total: 0,
  history: [],
  loading: false,
  error: undefined,
};

export const fetchPointsTotal = createAsyncThunk<number>(
  "points/fetchTotal",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/points/total");
      return res.data.total;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch total points"
      );
    }
  }
);

export const fetchPointsHistory = createAsyncThunk<PointsTransaction[]>(
  "points/fetchHistory",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/points/history");
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.error || "Failed to fetch points history"
      );
    }
  }
);

const pointsSlice = createSlice({
  name: "points",
  initialState,
  reducers: {
    setTotal(state, action: PayloadAction<number>) {
      state.total = action.payload;
    },
    setHistory(state, action: PayloadAction<PointsTransaction[]>) {
      state.history = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | undefined>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Total
      .addCase(fetchPointsTotal.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchPointsTotal.fulfilled, (state, action) => {
        state.loading = false;
        state.total = action.payload;
      })
      .addCase(fetchPointsTotal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // History
      .addCase(fetchPointsHistory.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(fetchPointsHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      })
      .addCase(fetchPointsHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setTotal, setHistory, setLoading, setError } =
  pointsSlice.actions;

export default pointsSlice.reducer;
