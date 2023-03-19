import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore";

export const addUserAsync = createAsyncThunk(
  "addUser",
  async ({ userId, name, email, phoneNumber, zipcode }) => {
    try {
      await setDoc(doc(db, "users", userId), {
        name,
        email,
        phoneNumber,
        zipcode,
        isAdmin: false,
      });
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
    builder.addCase(addUserAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectUser = (state) => state.user;
export default userSlice.reducer;
