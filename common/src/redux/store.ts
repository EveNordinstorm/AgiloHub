import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { setStore } from "../utils/api";

export const store = configureStore({
  reducer: { auth: authReducer },
});

setStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
