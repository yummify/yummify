import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/config";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

export const addUserAsync = createAsyncThunk(
  "addUser",
  async ({ userId, name, email, image, phoneNumber, zipcode }) => {
    try {
      await setDoc(doc(db, "users", userId), {
        name,
        email,
        image,
        phoneNumber,
        zipcode,
        isAdmin: false,
      });
    } catch (err) {
      console.log(err);
    }
  }
);

export const fetchUserAsync = createAsyncThunk("fetchUser", async (userId) => {
  try {
    console.log("UserId:", userId);
    const usersRef = doc(db, "users", userId);
    const docSnap = await getDoc(usersRef);
    if (docSnap.exists()) {
      const user = docSnap.data();

      return { ...user, userId: docSnap.id };
    } else {
      console.log("No such document");
    }
  } catch (err) {
    console.log(err);
  }
});

export const editUserImageAsync = createAsyncThunk(
  "editUserImage",
  async ({ userId, url }) => {
    try {
      console.log("UserId and url:", userId, url);
      const usersRef = doc(db, "users", userId);
      const data = { image: url };
      updateDoc(usersRef, data).then((usersRef) =>
        console.log("Value of document has been updated")
      );
    } catch (err) {
      console.log(err);
    }
  }
);

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
      });
  },
});

export const selectUser = (state) => state.user;
export default userSlice.reducer;
