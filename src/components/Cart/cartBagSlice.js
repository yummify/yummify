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
  }) => {
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
        restaurantId,
        status: "shopping",
        userId,
      });
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchOrderByStatusAsync = createAsyncThunk(
  "cart",
  async (userId, status) => {
    try {
      //fetch based on userId and "shopping" status
      const ordersRef = collection(db, "orders");

      const q = query(
        ordersRef,
        where("userId", "==", userId),
        where("status", "==", "shopping")
      );

      const querySnapshot = await getDocs(q);
      const orders = [];
      querySnapshot.forEach((doc) => {
        orders.push({...doc.data(), id: doc.id})
      });

      return orders;
    } catch (err) {
      console.error(err);
    }
  }
);

// delete bag from cart
export const deleteOrderAsync = createAsyncThunk(
  "deleteOrder",
  async (orderId) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await deleteDoc(orderRef);
    } catch (err) {
      console.error(err);
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
      .addCase(fetchOrderByStatusAsync.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(deleteOrderAsync.fulfilled, (state, action) => {
        const orderId = action.payload;

        return state.filter((order) => order.id !== orderId);
      });
  },
});

export const selectCartBag = (state) => {
  //retrieve bag from state
  return state.cartBag;
};

export default cartBagSlice.reducer;
