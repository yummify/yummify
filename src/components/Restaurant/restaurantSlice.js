import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/config";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

// This thunk is used to add restaurant document in the restaurants collection
export const addRestaurantAsync = createAsyncThunk(
  "addRestaurant",
  async ({
    restaurantId,
    restaurantName,
    email,
    image,
    cuisine,
    description,
    address,
    website,
    EIN,
    role,
    status,
    phoneNumber,
    zipcode,
    terms,
  }) => {
    try {
      await setDoc(doc(db, "restaurants", restaurantId), {
        restaurantName,
        email,
        image,
        cuisine,
        description,
        address,
        website,
        EIN,
        role,
        status,
        phoneNumber,
        zipcode,
        terms,
      });
      
    } catch (err) {
      
    }
  }
);

// This thunk is used to fetch restaurant document by restaurantId from the Restaurants collection
export const fetchRestaurantAsync = createAsyncThunk(
  "fetchRestaurant",
  async (restaurantId) => {
    try {
      
      const restaurantRef = doc(db, "restaurants", restaurantId);
      const docSnap = await getDoc(restaurantRef);
      if (docSnap.exists()) {
        const restaurant = docSnap.data();

        return { ...restaurant, restaurantId: docSnap.id };
      } else {
        
      }
    } catch (err) {
      
    }
  }
);

// This thunk is used to handle image upload change of the Restaurant profile
export const editRestaurantImageAsync = createAsyncThunk(
  "editRestaurantImage",
  async ({ restaurantId, url }) => {
    try {
      
      const restaurantsRef = doc(db, "restaurants", restaurantId);
      const usersRef = doc(db,"users", restaurantId);
      const data = { image: [url] };
      updateDoc(restaurantsRef, data).then(
      );
      updateDoc(usersRef,data).then();
    } catch (err) {
      
    }
  }
);

// This thunk is used to handle edit changes of the Restaurant profile
export const editRestaurantAsync = createAsyncThunk(
  "editRestaurant",
  async ({
    restaurantId,
   
    description,
    
    website,
   
    phoneNumber,
   
  }) => {
    try {
      
      const restaurantsRef = doc(db, "restaurants", restaurantId);
      const usersRef = doc(db,"users", restaurantId);
      const data = {
        restaurantId,
        
        description,
        
        website,
       
        phoneNumber,
       
      };
      const userData = {
        restaurantId,
        phoneNumber,
      }
      updateDoc(restaurantsRef, data).then(
      );
      updateDoc(usersRef,data).then();
    } catch (err) {
      
    }
  }
);

const initialState = {};
export const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addRestaurantAsync.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(fetchRestaurantAsync.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export const selectRestaurant = (state) => state.restaurant;
export default restaurantSlice.reducer;
