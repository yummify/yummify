import { configureStore } from "@reduxjs/toolkit";
import { restaurantsSlice } from "../components/AllRestaurants/allRestaurantsSlice";

const store = configureStore({
    reducer: {
        restaurants: restaurantsSlice
    }
});

export default store;