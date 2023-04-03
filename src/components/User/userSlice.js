import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/config";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

// This thunk is used to add user document in the users collection
export const addUserAsync = createAsyncThunk(
  "addUser",
  async ({
    userId,
    name,
    email,
    image,
    phoneNumber,
    zipcode,
    isAdmin,
    isRestaurantOwner = false,
  }) => {
    try {
      await setDoc(doc(db, "users", userId), {
        name,
        email,
        image,
        phoneNumber,
        zipcode,
        isAdmin,
        isRestaurantOwner,
      });
      
    } catch (err) {
      
    }
  }
);

// This thunk is used to fetch user document by userId from the Users collection
export const fetchUserAsync = createAsyncThunk("fetchUser", async (userId) => {
  try {
    
    const usersRef = doc(db, "users", userId);
    const docSnap = await getDoc(usersRef);
    if (docSnap.exists()) {
      const user = docSnap.data();

      return { ...user, userId: docSnap.id };
    } else {
      
    }
  } catch (err) {
    
  }
});

// This thunk is used to handle image upload change of the User profile
export const editUserImageAsync = createAsyncThunk(
  "editUserImage",
  async ({ userId, url }) => {
    try {
      
      const usersRef = doc(db, "users", userId);
      const data = { image: url };
      updateDoc(usersRef, data).then(
        
      );
    } catch (err) {
      
    }
  }
);

// This thunk is used to handle edit changes of the User profile
export const editUserAsync = createAsyncThunk(
  "editUser",
  async ({ userId, name, phoneNumber, zipcode }) => {
    try {
      const usersRef = doc(db, "users", userId);
      
      const data = { name, phoneNumber, zipcode };
      updateDoc(usersRef, data).then(
      );
    } catch (err) {
      
    }
  }
);

// This thunk is used to handle edit user's status 
export const editUserStatusAsync = createAsyncThunk("editUserStatus", async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      status: 'suspended'
    })
  } catch(err) {
    console.error(err);
  }
})



const initialState = {};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUserAsync.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(fetchUserAsync.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(editUserAsync.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export const selectUser = (state) => state.user;
export default userSlice.reducer;
