import { collection, getDocs, query, where, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllRestaurants = createAsyncThunk("allRestaurants", async () => {
    try {
        const q = query(collection(db, 'restaurants'));
        const querySnapshot = await getDocs(q);
        let restaurants = [];
        querySnapshot.forEach((query) => {
            restaurants.push({...query.data(), id: query.id});
        })
        return restaurants;
    } catch (err) {
        console.error(err)
    }
})


export const restaurantsSlice = createSlice({
    name: "restaurants",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllRestaurants.fulfilled, (state, action) => {
            return action.payload;
        });
    }
})

export const selectRestaurants = (state) => state.restaurants;

export default restaurantsSlice.reducer;