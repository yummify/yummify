import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchSingleRestaurant = createAsyncThunk("singleRestaurant", async (restaurantId) => {
    try {
        const restaurantId = 'D1EEQluv6HmkAjs7Uvyv';
        //console.log("RestaurantId:", restaurantId);
        const restRef = doc(db, "restaurants", restaurantId);
        const docSnap = await getDoc(restRef);
        if (docSnap.exists()) {
            const restaurant = docSnap.data();

            return {...restaurant, restaurantId: docSnap.id};
        } else {
            console.log("No restaurant found");
        }
    } catch (err) {
        console.error(err)
    }
})

export const updateStatusRestaurantAsync = createAsyncThunk("updateStatusRestaurant", async (restId, newStatus) => {
    try {
        const restRef = doc(db, "restaurants", restId);
        const data = {status: newStatus};
        updateDoc(restRef, data).then((restRef) => console.log('rest updated'));
    } catch(err) {
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
    },
});

export const selectRestaurant = (state) => state.restaurant;

export default singleRestaurantSlice.reducer;

