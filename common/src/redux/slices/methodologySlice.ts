import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Methodology } from "../../types/interfaces/methodology";
import apiCore from "../../utils/apiCore";

export const fetchMethodologies = createAsyncThunk<Methodology[]>(
  "methodologies/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await apiCore.get("/methodologies");
      return res.data as Methodology[];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data || "Failed to fetch methodologies"
      );
    }
  }
);

export interface MethodologyState {
  items: Methodology[];
  loading: boolean;
  error: string | null;
}

const initialState: MethodologyState = {
  items: [],
  loading: false,
  error: null,
};

const methodologySlice = createSlice({
  name: "methodologies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMethodologies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMethodologies.fulfilled,
        (state, action: PayloadAction<Methodology[]>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchMethodologies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default methodologySlice.reducer;
