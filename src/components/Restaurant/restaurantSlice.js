import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/config";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
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
    open,
    close,
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
        open,
        close,
        website,
        EIN,
        role,
        status,
        phoneNumber,
        zipcode,
        terms,
      });
      console.log("after db insert for restaurant");
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchRestaurantAsync = createAsyncThunk(
  "fetchRestaurant",
  async (restaurantId) => {
    try {
      console.log("RestaurantId:", restaurantId);
      const restaurantRef = doc(db, "restaurants", restaurantId);
      const docSnap = await getDoc(restaurantRef);
      if (docSnap.exists()) {
        const restaurant = docSnap.data();

        return { ...restaurant, restaurantId: docSnap.id };
      } else {
        console.log("No such document");
      }
    } catch (err) {
      console.log(err);
    }
  }
);

export const editRestaurantImageAsync = createAsyncThunk(
  "editRestaurantImage",
  async ({ restaurantId, url }) => {
    try {
      console.log("restaurantId and url:", restaurantId, url);
      const restaurantsRef = doc(db, "restaurants", restaurantId);
      const data = { image: url };
      updateDoc(restaurantsRef, data).then((restaurantsRef) =>
        console.log("Value of document has been updated")
      );
    } catch (err) {
      console.log(err);
    }
  }
);

export const editRestaurantAsync = createAsyncThunk(
  "editRestaurant",
  async ({
    restaurantId,
    restaurantName,
    cuisine,
    description,
    address,
    open,
    close,
    website,
    EIN,
    phoneNumber,
    zipcode,
    status,
  }) => {
    try {
      console.log(
        "restaurantId and payload:",
        restaurantId,
        restaurantName,
        cuisine,
        description,
        address,
        open,
        close,
        website,
        EIN,
        phoneNumber,
        zipcode,
        status
      );
      const restaurantsRef = doc(db, "restaurants", restaurantId);
      const data = {
        restaurantId,
        restaurantName,
        cuisine,
        description,
        address,
        open,
        close,
        website,
        EIN,
        phoneNumber,
        zipcode,
        status,
      };
      updateDoc(restaurantsRef, data).then((restaurantsRef) =>
        console.log("Value of document has been updated")
      );
    } catch (err) {
      console.log(err);
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
        console.log("In addRes actionpayload:", action.payload);
        return action.payload;
      })
      .addCase(fetchRestaurantAsync.fulfilled, (state, action) => {
        console.log("In fetchRes actionpayload:", action.payload);
        return action.payload;
      });
  },
});

export const selectRestaurant = (state) => state.restaurant;
export default restaurantSlice.reducer;
