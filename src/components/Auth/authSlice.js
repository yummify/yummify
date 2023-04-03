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

// This thunk is used to create authorized users in the firestore and fetch them to store in the redux state.
export const fetchSignUpAuthAsync = createAsyncThunk(
  "fetchSignUp",
  async ({ email, password }) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const authUser = {
        userId: res.user.uid,
        displayName: res.user.displayName,
        email: res.user.email,
        phoneNumber: res.user.phoneNumber,
        photoURL: res.user.photoURL,
      };
      return authUser;
    } catch (err) {
      throw new Error(err.message);
    }
  }
);

// This thunk is used to check authorized users in the firestore and store the authorized user in the redux state.
export const fetchLoginAuthAsync = createAsyncThunk(
  "fetchLogin",
  async ({ email, password }) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const authUser = {
        userId: res.user.uid,
        displayName: res.user.displayName,
        email: res.user.email,
        phoneNumber: res.user.phoneNumber,
        photoURL: res.user.photoURL,
      };
      return authUser;
    } catch (err) {
      throw new Error(err.message);
    }
  }
);

// This thunk is used to call reset password functionality of the firestore.
export const resetPasswordAsync = createAsyncThunk(
  "resetpassword",
  async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
    }
  }
);

// This thunk is used to reAuthenticate the user with the given credential in the firestore.
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

// This thunk is used to call update password functionality of the firestore.
export const updatePasswordAsync = createAsyncThunk(
  "updatepassword",
  async (newPassword) => {
    try {
      await updatePassword(auth.currentUser, newPassword);
    } catch (err) {
     
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
        return action.payload;
      })
      .addCase(fetchLoginAuthAsync.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(fetchSignUpAuthAsync.rejected, (state, action) => {
        return action.error;
      })
      .addCase(fetchLoginAuthAsync.rejected, (state, action) => {
        return action.error;
      })
      .addCase(reAuthenticateAsync.rejected, (state, action) => {
        return action.error;
      });
  },
});
export const selectAuth = (state) => state.authenticate;
export default authSlice.reducer;
