import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const fetchSignUpAuthAsync = createAsyncThunk(
  "fetchSignUp",
  async ({ email, password }) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      console.log("In slice:", res);
      const authUser = {
        userId: res.user.uid,
        displayName: res.user.displayName,
        email: res.user.email,
        phoneNumber: res.user.phoneNumber,
        photoURL: res.user.photoURL,
      };
      console.log("AuthUser:", authUser);
      return authUser;
    } catch (err) {
      console.error(err);
    }
  }
);

export const fetchLoginAuthAsync = createAsyncThunk(
  "fetchLogin",
  async ({ email, password }) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      console.log("In slice:", res);
      const authUser = {
        userId: res.user.uid,
        displayName: res.user.displayName,
        email: res.user.email,
        phoneNumber: res.user.phoneNumber,
        photoURL: res.user.photoURL,
      };
      console.log("AuthUser:", authUser);
      return authUser;
    } catch (err) {
      console.error(err);
    }
  }
);

const initialState = {};
export const authSlice = createSlice({
  name: "authenticate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignUpAuthAsync.fulfilled, (state, action) => {
        console.log("In action payload:", action.payload);
        return action.payload;
      })
      .addCase(fetchLoginAuthAsync.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});
export const selectAuth = (state) => state.authenticate;
export default authSlice.reducer;
