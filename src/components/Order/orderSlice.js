import { getDocs, doc, query, collection, where, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// thunk to fetch every order that's been placed
export const fetchAllOrdersAsync = createAsyncThunk("orders", async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "orders"));
        const orders = [];
        querySnapshot.forEach((doc) => {
            orders.push({...doc.data(), id: doc.id});
        })
        return orders;
    } catch(err) {
        console.error(err)
    }
})

// thunk to fetch all the orders for a specific user
export const fetchUserOrdersAsync = createAsyncThunk("userOrders", async (userId) => {
    try {
        const q = query(collection(db, "orders"), where("userId", "==", userId));
        const querySnap = await getDocs(q);
        const orders = [];
        if (querySnap.empty) {
            console.error('No orders found.')  
        } 
        else {
            querySnap.forEach((doc) => {
            orders.push({...doc.data(), id: doc.id});
            }
        )}
        return orders;
    } catch(err) {
        console.error(err);
    }
});

// thunk to only fetch the orders of a specific user which haven't been confirmed yet (still shopping)
export const fetchOrderByStatusAsync = createAsyncThunk(
    "cart",
    async (userId) => {
      try {
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

// thunk to fetch all the orders for a specific restaurant
export const fetchAllOrdersForRestaurantAsync = createAsyncThunk("restaurantOrders", async (restaurantId) => {
    try {
        const q = query(collection(db, "orders"), where("restaurantId", "==", restaurantId));
        const querySnap = await getDocs(q)
        const restaurantOrders = [];
        querySnap.forEach((doc) => {
            restaurantOrders.push({...doc.data(), id: doc.id});
        })
        return restaurantOrders;
    } catch(err) {
        console.error(err)
    }
})

// thunk for restaurants to mark an order complete once it's been picked up
export const markComplete = createAsyncThunk("markComplete", async (orderId) => {
    try {
        const orderRef = doc(db, "orders", orderId);
        const time = new Date().toJSON();
        await updateDoc(orderRef, {
            status: 'awaiting pickup',
            updated: time,
        })
    } catch(err) {
        console.error(err)
    }
})

// thunk to delete an order
export const deleteOrderAsync = createAsyncThunk("deleteOrder", async (orderId) => {
    try{
    const orderRef = doc(db, "orders", orderId);
    await deleteDoc(orderRef);
    }catch(err){
        console.error(err);
    }

  });

export const ordersSlice = createSlice({
    name: "orders",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(fetchUserOrdersAsync.fulfilled, (state, action) => {
            return action.payload;
        })
        builder.addCase(fetchAllOrdersForRestaurantAsync.fulfilled, (state, action) => {
            return action.payload;
        })
        builder.addCase(fetchOrderByStatusAsync.fulfilled,(state,action)=>{
            return action.payload;
        })
        builder.addCase(deleteOrderAsync.fulfilled, (state, action) => {
            const orderId = action.payload;
            return state.filter((order) => order.id !== orderId);
        });
        
    }
});

export const selectOrders = (state) => state.orders;

export default ordersSlice.reducer;