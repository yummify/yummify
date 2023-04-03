import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/config";
import {
    collection,
    query,
    where,
    getDocs
  } from "firebase/firestore";

  // This thunk is used to handle fetch order history of the particular user based on userId
  export const fetchUserOrdersAsync = createAsyncThunk(
    "fetchorder",
    async (userId) => {
      try {
        const ordersRef = collection(db, "orders");
        let orders = [];
        const q = query(ordersRef, where("userId", "==", userId));  
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((document) => {
          
          const orderId = document.id;
          const order = document.data();
          let ord = {
            orderId,
            order
          }
          if(order.status === 'complete' || order.status === 'awaiting pickup'){
              orders.push(ord);
            }
        });
        
        return orders;
      } catch (err) {
        
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
  