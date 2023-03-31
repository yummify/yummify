import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/config";
import {
    doc,
    setDoc,
    getDoc,
    updateDoc,
    collection,
    query,
    where,
    getDocs
  } from "firebase/firestore";

  export const fetchUserOrdersAsync = createAsyncThunk(
    "fetchorder",
    async (userId) => {
      try {
        const orders = [];
        const ordersRef = collection(db, "orders");
        const q = query(ordersRef, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(doc => {
          orders.push({orderId : doc.id, data:doc.data()});
        })
        console.log("orders:",orders);
        return orders;
      } catch (err) {
        console.log(err);
      }
    }
  );

  const initialState = [];
  export const userOrdersSlice = createSlice({
    name: "userOrders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchUserOrdersAsync.fulfilled, (state, action) => {
          return action.payload;
        })
        
    },
  });
  
  export const selectOrders = (state) => state.userOrders;
  export default userOrdersSlice.reducer;
  