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
      
      const restaurantsRef = doc(db, "restaurants", restaurantId);
      const usersRef = doc(db,"users", restaurantId);
      const data = { image: url };
      updateDoc(restaurantsRef, data).then((restaurantsRef) =>
        console.log("Value of document has been updated")
      );
      updateDoc(usersRef,data).then((usersRef) => console.log("Value of document has been updated"));
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
    website,
    EIN,
    phoneNumber,
    zipcode,
  }) => {
    try {
      console.log(
        "restaurantId and payload:",
        restaurantId,
        restaurantName,
        cuisine,
        description,
        address,
        website,
        EIN,
        phoneNumber,
        zipcode
      );
      const restaurantsRef = doc(db, "restaurants", restaurantId);
      const usersRef = doc(db,"users", restaurantId);
      const data = {
        restaurantId,
        restaurantName,
        cuisine,
        description,
        address,
        website,
        EIN,
        phoneNumber,
        zipcode,
      };
      const userData = {
        restaurantId,
        name : restaurantName,
        phoneNumber,
        zipcode
      }
      updateDoc(restaurantsRef, data).then((restaurantsRef) =>
        console.log("Value of document has been updated")
      );
      updateDoc(usersRef,data).then((usersRef) => console.log("Value of document has been updated"));
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
        return action.payload;
      })
      .addCase(fetchRestaurantAsync.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export const selectRestaurant = (state) => state.restaurant;
export default restaurantSlice.reducer;
