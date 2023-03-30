import { getDocs, doc, query, collection, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// fetch all orders
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

// fetch all orders for a specific user
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
// pass in the userId, and then fetch all ORDERS with that specific userId.
    } catch(err) {
        console.error(err);
    }
});


// fetch all orders for a specific restaurant



// mark orders as complete

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
    }
});

export const selectOrders = (state) => state.orders;

export default ordersSlice.reducer;