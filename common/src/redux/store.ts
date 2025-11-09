import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import subscriptionReducer from "./slices/subscriptionSlice";
import projectReducer from "./slices/projectSlice";
import methodologyReducer from "./slices/methodologySlice";
import taskReducer from "./slices/taskSlice";
import pointsReducer from "./slices/pointsSlice";
import loginStreakReducer from "./slices/loginStreakSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    subscription: subscriptionReducer,
    project: projectReducer,
    methodology: methodologyReducer,
    task: taskReducer,
    points: pointsReducer,
    streak: loginStreakReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
