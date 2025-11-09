import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Weekday = "Mon" | "Tue" | "Wed" | "Thu" | "Fri";

export interface StreakState {
  daysChecked: Weekday[];
  lastLoginDate?: string;
  currentPoints: number;
}

const initialState: StreakState = {
  daysChecked: [],
  lastLoginDate: undefined,
  currentPoints: 0,
};

const dayPointsMap: Record<Weekday, number> = {
  Mon: 10,
  Tue: 20,
  Wed: 30,
  Thu: 40,
  Fri: 50,
};

const loginStreakSlice = createSlice({
  name: "streak",
  initialState,
  reducers: {
    resetWeek: () => initialState,
    markDayChecked(state, action: PayloadAction<Weekday>) {
      const day = action.payload;
      if (!state.daysChecked.includes(day)) {
        state.daysChecked.push(day);
        state.currentPoints = dayPointsMap[day];
        state.lastLoginDate = new Date().toISOString();
      }
    },
  },
});

export const { resetWeek, markDayChecked } = loginStreakSlice.actions;
export default loginStreakSlice.reducer;
