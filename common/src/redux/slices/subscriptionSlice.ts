import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ISubscriptionTier } from "../../types/interfaces/subscriptionTiers";
import apiCore from "../../utils/apiCore";

// Async thunk: fetch all subscription tiers
export const fetchSubscriptionTiers = createAsyncThunk<ISubscriptionTier[]>(
  "subscription/fetchTiers",
  async (_, thunkAPI) => {
    try {
      const res = await apiCore.get("/subscriptions");
      return res.data as ISubscriptionTier[];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Failed to fetch tiers"
      );
    }
  }
);

export interface SubscriptionState {
  tiers: ISubscriptionTier[];
  loading: boolean;
  error: string | null;
}

const initialState: SubscriptionState = {
  tiers: [],
  loading: false,
  error: null,
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptionTiers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchSubscriptionTiers.fulfilled,
        (state, action: PayloadAction<ISubscriptionTier[]>) => {
          state.loading = false;
          state.tiers = action.payload;
        }
      )
      .addCase(fetchSubscriptionTiers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default subscriptionSlice.reducer;
