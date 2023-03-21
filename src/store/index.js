import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../components/Auth/authSlice";
import userSlice from "../components/User/userSlice";
import usersSlice from "../components/Users/usersSlice";
import  restaurantsSlice  from "../components/AllRestaurants/allRestaurantsSlice";
//testing
import bagSlice from "../components/Bag/bagSlice";

export const store = configureStore({
  reducer: {
    authenticate: authSlice,
    user: userSlice,
    users: usersSlice,
    restaurants: restaurantsSlice,
    bag: bagSlice,
  },
});
export default store;
export * from "../components/Auth/authSlice";

