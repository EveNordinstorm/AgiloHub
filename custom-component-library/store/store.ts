import { configureStore } from "@reduxjs/toolkit";
import accordionReducer from "../accordion/AccordionSlice";

export const store = configureStore({
  reducer: {
    accordion: accordionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
