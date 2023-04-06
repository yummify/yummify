import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//thunk to retrieve one restaurant based on ID
export const fetchSingleRestaurant = createAsyncThunk("singleRestaurant", async (restaurantId) => {
    try {

        const restRef = doc(db, "restaurants", restaurantId);
        const docSnap = await getDoc(restRef);
        if (docSnap.exists()) {
            const restaurant = docSnap.data();
            return {...restaurant, restaurantId: docSnap.id};
        } else {
        
        }
    } catch (err) {
        
    }
})

//thunk for Admin to update restaurant status to "approved"
export const approveStatusRestaurantAsync = createAsyncThunk("updateStatusRestaurant", async (restId) => {
    try {
        const docRef = doc(db, "restaurants", restId);
        await updateDoc(docRef, {
            status: 'approved'
        })
    } catch(err) {
    
    }
});

//thunk for Admin to update restaurant status to "suspended"
export const denyStatusRestaurantAsync = createAsyncThunk("updateStatusRestaurant", async (restId) => {
    try {
        const docRef = doc(db, "restaurants", restId);
        await updateDoc(docRef, {
            status: 'suspended'
        })
    } catch(err) {
       
    }
});

//thunk for Admin to delete restaurant from db
export const deleteRestaurantAsync = createAsyncThunk("deleteRestaurant", async (restId) => {
    try {
        const docRef = doc(db, "restaurants", restId);
        await deleteDoc(docRef);
    } catch(err) {
        
    }
})

//puts restaurant in state
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

//retrieves restaurant from state
export const selectRestaurant = (state) => state.singleRestaurant;

export default singleRestaurantSlice.reducer;

