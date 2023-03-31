import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/config";
import {
  setDoc,
  getDocs,
  where,
  query,
  collection,
  doc,
  deleteDoc,
} from "firebase/firestore";

//post request - put bag in cart
//cart/order connects to User and Restaurant
export const placeBagInCartAsync = createAsyncThunk(
  "placeBagInCart",
  async ({
    expiration,
    image,
    newPrice,
    originalPrice,
    pickup,
    quantity,
    type,
    restaurantId,
    status,
    userId,
    id,
  }) => {
    try {
      const newOrder = doc(collection(db, "orders"));

      await setDoc(newOrder, {
        bagId: id,
        expiration,
        image,
        newPrice,
        originalPrice,
        pickup,
        quantity,
        type,
        restaurantId,
        status: "shopping",
        userId,
      });
    } catch (err) {
      console.log(err);
    }
  }
);



const initialState = [];
export const cartBagSlice = createSlice({
  name: "cartBag",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(placeBagInCartAsync.fulfilled, (state, action) => {
        return action.payload;
      })  
  },
});

export const selectCartBag = (state) => {
  //retrieve bag from state
  return state.cartBag;
};

export default cartBagSlice.reducer;
