import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../components/Auth/authSlice";
import userSlice from "../components/User/userSlice";
import usersSlice from "../components/Users/usersSlice";
import restaurantsSlice from "../components/AllRestaurants/allRestaurantsSlice";
import restaurantSlice from "../components/Restaurant/restaurantSlice";
import singleRestaurantSlice from "../components/SingleRestaurantUserView/singleRestaurantSlice";
import bagSlice from "../components/Bag/bagSlice";
<<<<<<< HEAD
import cartBagSlice from "../components/Cart/cartBagSlice";
=======
import orderSlice  from "../components/Cart/cartBagSlice";
>>>>>>> 75f432f677227343c0fe57ea3c6afcccdccbc20e
import ordersSlice from "../components/Order/orderSlice";

export const store = configureStore({
  reducer: {
    authenticate: authSlice,
    user: userSlice,
    users: usersSlice,
    restaurants: restaurantsSlice,
    restaurant: restaurantSlice,
    singleRestaurant: singleRestaurantSlice,
    bag: bagSlice,
<<<<<<< HEAD
    cartBag: cartBagSlice,
=======
    order: orderSlice,
>>>>>>> 75f432f677227343c0fe57ea3c6afcccdccbc20e
    orders: ordersSlice
  },
});
export default store;
export * from "../components/Auth/authSlice";
