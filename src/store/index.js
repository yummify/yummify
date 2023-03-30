import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../components/Auth/authSlice";
import userSlice from "../components/User/userSlice";
import usersSlice from "../components/Users/usersSlice";
import restaurantsSlice from "../components/AllRestaurants/allRestaurantsSlice";
import restaurantSlice from "../components/Restaurant/restaurantSlice";
import singleRestaurantSlice from "../components/SingleRestaurantUserView/singleRestaurantSlice";
import bagSlice from "../components/Bag/bagSlice";
import userOrdersSlice from "../components/User/userOrdersSlice";

export const store = configureStore({
  reducer: {
    authenticate: authSlice,
    user: userSlice,
    users: usersSlice,
    restaurants: restaurantsSlice,
    restaurant: restaurantSlice,
    singleRestaurant: singleRestaurantSlice,
    bag: bagSlice,
    userOrders : userOrdersSlice
  },
});
export default store;
export * from "../components/Auth/authSlice";
