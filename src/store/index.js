import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../components/Auth/authSlice";
import userSlice from "../components/User/userSlice";
export const store = configureStore({
  reducer: {
    authenticate: authSlice,
    user: userSlice,
  },
});
export default store;
export * from "../components/Auth/authSlice";
