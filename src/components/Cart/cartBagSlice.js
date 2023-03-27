import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/config";
import { query,addDoc, setDoc, getDoc, getDocs, updateDoc, collection, doc, where, limit } from "firebase/firestore";

//post request - put bag in cart
//cart/order connects to User and Restaurant
export const placeBagInCartAsync = createAsyncThunk("placeBagInCart", async ({expiration, image, newPrice, originalPrice, pickup, quantity, type}) => {
    try {
        const newOrder = doc(collection(db, "orders"));

        await setDoc(newOrder, {
            expiration,
            image,
            newPrice,
            originalPrice,
            pickup,
            quantity,
            type,
            //restaurantId

        });
    }catch(err){
        console.log(err);
    }
})




const initialState = {};
export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(placeBagInCartAsync.fulfilled, (state, action) => {
                //add bag to state
                return action.payload;
            })
    }
})

export const selectOrder = (state) => {
    //retrieve bag from state
    return state.order;
}

export default orderSlice.reducer;