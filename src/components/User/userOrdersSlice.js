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
    
        const ordersRef = collection(db, "orders");
        let orders = [];
        // let restaurantName = [];
        const q = query(ordersRef, where("userId", "==", userId));  
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((document) => {
          console.log("Document:",document.id,document.data());
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
        //console.log("Restaurant Name:", restaurantName);
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
  