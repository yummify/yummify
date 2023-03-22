import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../components/Auth/authSlice";
import userSlice from "../components/User/userSlice";
import usersSlice from "../components/Users/usersSlice";
import restaurantsSlice from "../components/AllRestaurants/allRestaurantsSlice";
import restaurantSlice from "../components/Restaurant/restaurantSlice";
export const store = configureStore({
  reducer: {
    authenticate: authSlice,
    user: userSlice,
    users: usersSlice,
    restaurants: restaurantsSlice,
    restaurant: restaurantSlice,
  },
});
export default store;
export * from "../components/Auth/authSlice";
