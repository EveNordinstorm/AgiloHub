import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionState {
  openIndex: number | null;
}

const initialState: AccordionState = {
  openIndex: null,
};

const accordionSlice = createSlice({
  name: "accordion",
  initialState,
  reducers: {
    toggle: (state, action: PayloadAction<number>) => {
      state.openIndex =
        state.openIndex === action.payload ? null : action.payload;
    },
  },
});

export const { toggle } = accordionSlice.actions;
export default accordionSlice.reducer;
