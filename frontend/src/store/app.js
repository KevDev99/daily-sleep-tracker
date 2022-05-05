import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import sleepReducer from "../features/sleep/sleepSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sleep: sleepReducer,
  },
});
