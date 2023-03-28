import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/config";
import { setDoc, getDocs, where, query, collection, doc, } from "firebase/firestore";

//post request - put bag in cart
//cart/order connects to User and Restaurant
export const placeBagInCartAsync = createAsyncThunk("placeBagInCart", async ({expiration, image, newPrice, originalPrice, pickup, quantity, type, restaurantId, status, userId}) => {
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
    }catch(err){
        console.log(err);
    }
})

export const fetchOrderByStatusAsync = createAsyncThunk("cart", async (userId, status) => {
    try {
    // pass in the userId, and then fetch all ORDERS with that specific userId.
        const ordersRef = collection(db, "orders")

        const q = query(ordersRef, where ("userId", "==", userId), where ("status", "==", "shopping"))
        console.log('q', q);

        const querySnapshot = await getDocs(q);
        const orders = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.data())
            orders.push(doc.data())});
        
        return orders;
        // const q = query(collection(db, "orders"), where("userId", "==", userId));
    //     const querySnap = await getDoc(q);
    //     console.log(querySnap);
    //     if (querySnap.exists()) {
    
    //         const order = querySnap.data();
    //             console.log('order', order)
    //             return {...order, orderId: querySnap.id};
    //     } else {
    //         console.log('No orders found.')
    //     }

    } catch(err) {
    console.error(err);
    }
    })



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
            .addCase(fetchOrderByStatusAsync.fulfilled, (state, action) =>{
                state.push(action.payload);
            })
    }
})

export const selectCartBag = (state) => {
    //retrieve bag from state
    return state.cartBag;
}

export default cartBagSlice.reducer;