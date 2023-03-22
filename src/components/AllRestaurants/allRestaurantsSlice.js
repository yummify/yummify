import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const updateUser = async () => {
// const usersRef = collection(db, "users");
// const q = query(usersRef, where("email", "==", "dummy3@aol.com"));
// const querySnapshot = await getDocs(q);
// querySnapshot.forEach((doc) => {
// // doc.data() is never undefined for query doc snapshots
// console.log(doc.id, " => ", doc.data());
// });
// };
// updateUser();

export const fetchAllRestaurants = createAsyncThunk("allRestaurants", async () => {
    try {
        const q = query(collection(db, 'restaurants'));
        const querySnapshot = await getDocs(q);
        let restaurants = [];
        querySnapshot.forEach((query) => {
            restaurants.push(query.data());
        })
        return restaurants;
    } catch (err) {
        console.error(err)
    }
})

// export default updateUser;

// export const fetchPendingRestaurants = createAsyncThunk("restaurants/pending", async() => {
//     try {
//         const q = query(collection(db, 'restaurants'), where("status", "===", "pending"))
//         const querySnapshot = await getDocs(q);
//         let pendingRestaurants = [];
//         querySnapshot.forEach((query) => {
//             pendingRestaurants.push(query.data());
//         })
//         console.log(pendingRestaurants);
//         return pendingRestaurants;
//     } catch(err) {
//         console.error(err)
//     }
// })


export const restaurantsSlice = createSlice({
    name: "restaurants",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllRestaurants.fulfilled, (state, action) => {
            return action.payload;
        });
    }
})

export const selectRestaurants = (state) => state.restaurants;

export default restaurantsSlice.reducer;

/* DELETE THUNK: 
- 
    import { doc, deleteDoc } from "firebase/firestore";
    await deleteDoc(doc(db, "cities", "DC"));

- 
    import { doc, updateDoc, deleteField } from "firebase/firestore";
    const cityRef = doc(db, 'cities', 'BJ');

    // Remove the 'capital' field from the document
    await updateDoc(cityRef, {
    capital: deleteField()
});
*/

/* ADD THUNK: 
-   either addDoc

    import { collection, addDoc } from "firebase/firestore"; 

    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "cities"), {
        name: "Tokyo",
        country: "Japan"
    });
    console.log("Document written with ID: ", docRef.id);

-   or setDoc

    import { doc, setDoc } from "firebase/firestore"; 

    // Add a new document in collection "cities"
    await setDoc(doc(db, "cities", "LA"), {
        name: "Los Angeles",
        state: "CA",
        country: "USA"
    });
 */