import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  reauthenticateWithCredential,
  updatePassword,
  EmailAuthProvider,
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
      throw new Error(err.message);
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
      throw new Error(err.message);
    }
  }
);

export const resetPasswordAsync = createAsyncThunk(
  "resetpassword",
  async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      console.log(err);
    }
  }
);

export const reAuthenticateAsync = createAsyncThunk(
  "reAuthenticate",
  async ({ email, password }) => {
    try {
      const credential = EmailAuthProvider.credential(email, password);
      await reauthenticateWithCredential(auth.currentUser, credential);
    } catch (err) {
      throw new Error(err.message);
    }
  }
);

export const updatePasswordAsync = createAsyncThunk(
  "updatepassword",
  async (newPassword) => {
    try {
      await updatePassword(auth.currentUser, newPassword);
    } catch (err) {
      console.log(err);
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
      })
      .addCase(fetchSignUpAuthAsync.rejected, (state, action) => {
        console.log(action.error);
        return action.error;
      })
      .addCase(fetchLoginAuthAsync.rejected, (state, action) => {
        console.log(action.error);
        return action.error;
      })
      .addCase(reAuthenticateAsync.rejected, (state, action) => {
        return action.error;
      });
  },
});
export const selectAuth = (state) => state.authenticate;
export default authSlice.reducer;
