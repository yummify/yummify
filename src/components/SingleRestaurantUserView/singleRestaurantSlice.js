import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
// import { db } from "../firebase/config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSingleRestaurant } from "../../firebase/singleRestaurantMethod";

export const fetchSingleRestaurant = createAsyncThunk("singleRestaurant", async () => {
    try {
        const restaurant = await getSingleRestaurant();
        console.log(restaurant);
        return restaurant;
    } catch (err) {
        console.error(err)
    }
})

export const singleRestaurantSlice = createSlice({
    name: "restaurant",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSingleRestaurant.fulfilled, (state, action) => {
            return action.payload;
        })
    }
})

export const selectRestaurant = (state) => state.restaurant;

export default singleRestaurantSlice.reducer;

