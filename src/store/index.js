import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../components/Auth/authSlice";
import userSlice from "../components/User/userSlice";
import usersSlice from "../components/Users/usersSlice";
import  restaurantsSlice  from "../components/AllRestaurants/allRestaurantsSlice";
//testing
import bagSlice from "../components/Bag/bagSlice";
import singleRestaurantSlice from "../components/SingleRestaurantUserView/singleRestaurantSlice";

export const store = configureStore({
  reducer: {
    authenticate: authSlice,
    user: userSlice,
    users: usersSlice,
    restaurants: restaurantsSlice,
    bag: bagSlice,
    restaurant: singleRestaurantSlice
  },
});
export default store;
export * from "../components/Auth/authSlice";

