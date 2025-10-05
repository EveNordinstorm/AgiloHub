import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import subscriptionReducer from "./slices/subscriptionSlice";
import projectReducer from "./slices/projectSlice";
import methodologyReducer from "./slices/methodologySlice";
import taskReducer from "./slices/taskSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    subscription: subscriptionReducer,
    project: projectReducer,
    methodology: methodologyReducer,
    task: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
