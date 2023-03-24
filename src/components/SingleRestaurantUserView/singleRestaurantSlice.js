import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSingleRestaurant = createAsyncThunk("singleRestaurant", async (restaurantId) => {
    try {
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

export const singleRestaurantSlice = createSlice({
    name: "singleRestaurant",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSingleRestaurant.fulfilled, (state, action) => {
            return action.payload;
        })
    },
});

export const selectRestaurant = (state) => state.singleRestaurant;

export default singleRestaurantSlice.reducer;

